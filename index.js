// Require the framework and instantiate it
const fastify = require("fastify")();
const path = require("path");

fastify.register(require("fastify-static"), {
  root: path.join(__dirname, "routes"),
  prefix: '/routes/'
});

fastify.get("/", function (req, reply) {
  return reply.sendFile("index.html"); // serving path.join(__dirname, 'public', 'myHtml.html') directly
});

// Run the server!
const start = async () => {
  try {
    await fastify.listen(3000);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
