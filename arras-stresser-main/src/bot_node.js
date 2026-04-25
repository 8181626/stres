const fs = require('fs').promises;
const path = require('path');
const { Worker } = require('worker_threads');

let src_dir = __dirname;

(async () => {
    let config_path = path.join(src_dir, 'bot_config.js');
    let config_eval = eval(await fs.readFile(config_path, "utf8"));
    
    let proxies = config_eval[0];
    let t = config_eval[10];
    let b = config_eval[11];
    let first_packet_msg_verify = config_eval[12];
    let public_key = config_eval[13];

    let args = process.argv.slice(2);
    let target = args[0];
    let proxy_start = parseInt(args[1]);
    let proxy_end = parseInt(args[2]);
    let creation_delay = parseInt(args[3]);
    let modules_per_worker = parseInt(args[4]);
    let sliced_proxies = proxies.slice(proxy_start, proxy_end);
    let workers_per_node = sliced_proxies.length;

    console.log(`wss://${target}?a=3&b=${b}&t=${t} ${modules_per_worker} ${creation_delay}`);

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