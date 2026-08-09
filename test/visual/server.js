// A static file server for the visual tests, so index.html can be loaded
// over http rather than from a file:// URL. The page reads localStorage
// before first paint to apply a saved theme, and file:// origins are opaque
// enough that browsers refuse that.
//
// Written by hand rather than pulled in as a dependency: it serves one
// directory to one browser on one machine, and the repository has enough
// build tooling already.

const http = require("http");
const path = require("path");
const { createReadStream } = require("fs");
const { stat } = require("fs").promises;

const ROOT = path.resolve(__dirname, "..", "..");

const TYPES = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".map": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".ttf": "font/ttf",
  ".woff": "font/woff",
  ".woff2": "font/woff2"
};

// The fonts are content hashed and the tests reload the page a lot, but a
// stale bundle would be reported as a rendering change, which is a bad way
// to find out that the server cached it.
const NO_STORE = "no-store, no-cache, must-revalidate";

function resolve(url) {
  const pathname = decodeURIComponent(new URL(url, "http://localhost").pathname);
  const target = path.join(ROOT, pathname === "/" ? "/index.html" : pathname);

  // Anything that climbs out of the repository is a bug in a test rather
  // than a request worth serving.
  const resolved = path.resolve(target);
  return resolved === ROOT || resolved.startsWith(ROOT + path.sep)
    ? resolved
    : null;
}

const server = http.createServer((req, res) => {
  const file = resolve(req.url || "/");
  if (!file) {
    res.writeHead(403).end("Forbidden");
    return;
  }

  stat(file)
    .then(stats => {
      if (!stats.isFile()) {
        throw new Error("not a file");
      }
      res.writeHead(200, {
        "Cache-Control": NO_STORE,
        "Content-Length": stats.size,
        "Content-Type":
          TYPES[path.extname(file).toLowerCase()] || "application/octet-stream"
      });
      createReadStream(file).pipe(res);
    })
    .catch(() => {
      res.writeHead(404, { "Cache-Control": NO_STORE }).end("Not Found");
    });
});

const port = Number(process.env.PORT) || 4173;
server.listen(port, "127.0.0.1", () => {
  console.log(`serving ${ROOT} on http://127.0.0.1:${port}/`);
});
