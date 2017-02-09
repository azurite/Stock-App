require("dotenv").config({ path: "config/.env" });
const path = require("path");
const express = require("express");
const app = express();

const routes = require("./app/routes");
const db = require("./app/redis");
const configureSocket = require("./app/socket");

const redis = require("redis");
const client = redis.createClient(process.env.REDIS_URL);

app.set("port", process.env.PORT || 8124);
app.set("view engine", "pug");
app.set("views", path.join(process.cwd(), "client"));

app.use(express.static(path.join(process.cwd(), "build", "client")));
app.use(express.static(path.join(process.cwd(), "client")));

app.use(db(client));
app.use(routes());

const server = require("http").Server(app);
const io = require("socket.io")(server);

configureSocket(io, client);

server.listen(app.get("port"));
