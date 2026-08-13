import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";

const root = process.cwd();
const portIndex = process.argv.indexOf("--port");
const port = Number(portIndex >= 0 ? process.argv[portIndex + 1] : process.env.PORT || 4173);
const hostIndex = process.argv.indexOf("--host");
const host = hostIndex >= 0 ? process.argv[hostIndex + 1] : "127.0.0.1";

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
};

createServer(async (request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, "http://local").pathname);
  let requested = path.join(root, pathname.replace(/^\/+/, ""));

  try {
    const info = await stat(requested);
    if (info.isDirectory()) requested = path.join(requested, "index.html");
  } catch {
    if (!path.extname(requested)) requested = path.join(requested, "index.html");
  }

  if (!requested.startsWith(root)) {
    response.writeHead(403).end("Forbidden");
    return;
  }

  try {
    const info = await stat(requested);
    if (!info.isFile()) throw new Error("not a file");
    response.writeHead(200, {
      "content-type": mimeTypes[path.extname(requested)] || "application/octet-stream",
      "content-length": info.size,
    });
    createReadStream(requested).pipe(response);
  } catch {
    response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    response.end("Not Found");
  }
}).listen(port, host, () => {
  console.log(`No Bull Home Services mirror running at http://${host}:${port}`);
});
