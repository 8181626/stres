const fs = require('fs').promises;
const path = require('path');
const { Worker } = require('worker_threads');
const { ProxyAgent } = require('undici');

let src_dir = __dirname;

(async () => {
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

    let config_path = path.join(src_dir, 'bot_config.js');
    let config_eval = eval(await fs.readFile(config_path, "utf8"));
    
    let proxies = config_eval[0];
    let fetch_proxy = config_eval[2];
    let user_agent = config_eval[6];
    let t = config_eval[10];
    let b = config_eval[11];
    let first_packet_msg_verify = config_eval[12];
    let public_key = config_eval[13];

    let fetch_agent = fetch_proxy != "" ? new ProxyAgent("http://" + fetch_proxy) : "";

    let args = process.argv.slice(2);
    let target_hash = args[0];

    let servers = await (await safe_fetch("https://qrp6ujau11f36bnm-c.uvwx.xyz:8443/2222/status", fetch_proxy != "" ? fetch_agent : null)).json();
    let uptime = servers.status[target_hash].uptime;
    setInterval(async () => {
        servers = (await (await safe_fetch("https://qrp6ujau11f36bnm-c.uvwx.xyz:8443/2222/status", fetch_proxy != "" ? fetch_agent : null)).json());
        if ((servers.status[target_hash].uptime ?? 0) < (uptime ?? 30)) {
            console.log("Server detected as restarted. Exiting crash.");
            process.exit(0);
        }
    }, 15000);

    let target = servers.status[target_hash].host;
    let proxy_count = args[1];
    let sliced_proxies = proxies.slice(0, proxy_count);
    let creation_delay = args[2];
    let workers_per_node = args[3];
    let modules_per_worker = args[4];

    console.log(`wss://${target}?a=3&b=${b}&t=${t} ${proxy_count} ${creation_delay} ${workers_per_node} ${modules_per_worker}`);

    for (let worker = 0; worker < workers_per_node; worker += 1) {
        new Worker(path.resolve(__dirname, './bot_worker.js'), {
            workerData: [
                `wss://${target}?a=3&b=${b}&t=${t}`,
                modules_per_worker,
                sliced_proxies,
                first_packet_msg_verify,
                public_key,
                creation_delay
            ] 
        }); 
    }
})();