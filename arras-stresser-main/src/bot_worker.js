const { WebSocket, ProxyAgent } = require('undici');
const { workerData: [wss_url, modules_per_worker, proxies_list, first_packet_msg_verify, public_key, create_runner_delay] } = require('worker_threads');
const { socksDispatcher } = require('fetch-socks');

let handshake_packet = new Uint8Array(first_packet_msg_verify);
let public_key_packet = new Uint8Array(public_key);

function runner_instance(index, target, proxies) {
    let agent = new ProxyAgent("http://" + proxies[index % proxies.length]);
    /*let [host, port, user, pass] = proxies[index % proxies.length].split(':');
    let agent_options = {
        type: 5,
        host: host,
        port: parseInt(port, 10) || 1080
    };
    if (user && pass) {
        agent_options.userId = user;
        agent_options.password = pass;
    };
    let agent = socksDispatcher(agent_options);*/
    let ws_headers = {
        headers: {
            'Host': `${target}`,
            'User-Agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
            'Origin': 'https://arras.io',
            'Pragma': 'no-cache',
            'Cache-Control': 'no-cache',
        },
        protocols: ['arras.io#v1.4+sls+et0', 'arras.io'],
        dispatcher: agent
    };

    let ws = new WebSocket(target, ws_headers);
    ws.binaryType = "arraybuffer"; 

    let handshake_completed = false;

    let open = () => {
        ws.send(handshake_packet);
        console.log("SOCKET OPENED");
        ws.removeEventListener('open', open);
    };

    ws.addEventListener('open', open);

    let close = () => {
        if (!handshake_completed) create_socket_runner(index + 1, target, proxies);
        ws.removeEventListener('close', close);
    };

    ws.addEventListener('close', close);

    let message = (event) => {
        let data = event.data;
        if (!handshake_completed && data.byteLength == 96) {
            handshake_completed = true;
                
            ws.send(public_key_packet);
            
            ws.removeEventListener('message', message);
            create_socket_runner(index + 1, target, proxies);
            return;
        }
    };

    ws.addEventListener('message', message);

    /*let error = (e) => {
        console.log(e);
        ws.removeEventListener('error', error);
    };

    ws.addEventListener('error', error);*/
}

function create_socket_runner(index, target, proxies) {
    if (create_runner_delay != 0) {
        setTimeout(() => {
            runner_instance(index, target, proxies);
        }, create_runner_delay);
    } else {
        runner_instance(index, target, proxies);
    }
}

let proxy_list_jump = Math.floor(proxies_list.length / modules_per_worker);
for (let module = 0; module < modules_per_worker; module += 1) {
    create_socket_runner(module * proxy_list_jump, wss_url, proxies_list);
};
