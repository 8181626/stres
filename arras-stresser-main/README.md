# arras-stresser
Please note that the code structure is very stitched and pieced together, as I wanted to push the method I currently use out very quickly. So I pieced this from an arras bot (which spawned tanks) I formerly created.

To use -> 
If you own vps servers, you may put those into the configuration and run "bot.js" using the vpses.

However, even if you do not own any vpses, you can still run the stresser on your own device, with dos.js.

To run "dos.js", first install anything required of course. Then, simply run the command:

`node dos [server code WITHOUT hash (ex. "wa")] [amount of proxies from list (only matters if you are not using rotating proxies)] [reconnect cooldown (typically leave as 0, only if your device is lower end and struggling may you want to increase this)] [workers (i.e. number of threads)] [modules (concurrent socket runner instances per worker)]`

For example, ```node dos wa 1000 0 16 15``` stresses server "wa" using a list of 1000 proxies, 0 cooldown between connections, 16 threads, and 15 socket runner modules.

Note, the base proxies already provided are rotating proxies. So, the proxy list size really doesn't matter for that specific case. 

Again, the discord bot is also provided but requires servers to be run on it. If you have those, you may use it. If not, simply use the dos technique.