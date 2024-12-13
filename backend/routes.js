const express = require("express");
const Router = express.Router();

const db = require("./db");
const LoginController = require("./controllers/LoginController");
const HomeController = require("./controllers/HomeController");
const TicketPostController = require("./controllers/TicketController");
require("dotenv").config()



Router.get("/", HomeController)
Router.post("/login", LoginController);
Router.post("/",TicketPostController)


module.exports = Router;
