import express from "express";

const dev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 8080;

  const server = express();

  if (!dev) {
    server.use(compression());
  }


  server.get("*", async (req, res) => {
    return nextRequestHandler(req, res, req.url);
  });

  server.listen(port, (err) => {
    if (err) {
      throw err;
    }

    console.log(`[ server ]: http://localhost:${port}`);
});
