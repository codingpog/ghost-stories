import http from "node:http";
import serveStatic from "./utils/serveStatic.js";

const PORT = 8000;

const __dirname = import.meta.dirname;

const server = http.createServer(async (req, res) => {
  await serveStatic(__dirname, res, req);
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
