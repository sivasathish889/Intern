const express = require("express");
const Router = express.Router();
const LoginController = require("./controllers/LoginController");
const HomeController = require("./controllers/HomeController");
const TicketPostController = require("./controllers/TicketController");
const Webauthn_Intial_Register = require("./controllers/Webauthn_Register/webauthn_Intial_Register");
const Verify_RegisterController = require("./controllers/Webauthn_Register/Verify_RegisterController");
const Webauthn_Intial_Login = require("./controllers/Webauthn_Login/Webauthn_inital_Login")
const Verify_loginController = require("./controllers/Webauthn_Login/Verify_loginController")

Router.get("/", HomeController);
Router.post("/login", LoginController);
Router.post("/", TicketPostController);
Router.post("/init-register", Webauthn_Intial_Register);
Router.post("/verify-register", Verify_RegisterController);
Router.get("/init-login", Webauthn_Intial_Login)
Router.post("/verify-login", Verify_loginController)


module.exports = Router;
