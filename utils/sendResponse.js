export function sendResponse(res, statusCode, content, contentType) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", contentType);
  res.end(content);
}
