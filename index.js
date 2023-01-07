const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const reactorHelper = require("./utils/reactorHelper");
reactorHelper.startInterval(() => {
  io.emit("refresh");
});

const config = require("./utils/config");
const pilotsRouter = require("./routes/pilotsRouter");

app.set("view engine", "ejs");

// routes
app.get("/", (_req, res) => {
  res.render("index");
});
app.use("/api/pilots", pilotsRouter);
app.use(express.static("public"));

server.listen(config.PORT, () => {
  console.log(`listening on ${config.PORT}`);
});
