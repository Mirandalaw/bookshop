const createServerConfig = require("./serverConfig");

const config = require("./config/serverConfig");

console.log(config);

const server = createServerConfig(config);

server.start();
