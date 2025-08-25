import path from "path";
import fs from "node:fs/promises";
import { sendResponse } from "./sendResponse.js";
import { getContentType } from "./getContentType.js";

export default async function serveStatic(dirname, res, req) {
  const publicPath = path.join(dirname, "public");
  const requestedPath = path.join(
    publicPath,
    req.url === "/" ? "index.html" : req.url
  );
  const ext = path.extname(requestedPath);
  const contentType = getContentType(ext);
  try {
    const content = await fs.readFile(requestedPath);
    sendResponse(res, 200, content, contentType);
  } catch (err) {
    if (err.code === "ENOENT") {
      const notFoundPath = path.join(publicPath, "404.html");
      const content = await fs.readFile(notFoundPath);
      sendResponse(res, 404, content, "text/html");
    } else {
      sendResponse(
        res,
        500,
        `<html><h1>Server Error: ${err.code}</h1></html>`,
        "text/html"
      );
    }
  }
}
