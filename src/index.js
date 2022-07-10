"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const app_js_1 = __importDefault(require("./app.js"));
dotenv_1.default.config({ path: "./config.env" });
const connectionUrl = process.env.DATABASE_URL;
mongoose_1.default.
    connect(connectionUrl)
    .then(() => console.log("DB connection successful"))
    .catch((e) => console.log(`error connecting to Database ${e}`));
const port = process.env.PORT || 4000;
const mode = process.env.NODE_ENV || "development";
const server = app_js_1.default.listen(port, () => {
    console.log(`App running on ${mode} mode on port ${port}...  `);
});
process.on("unhandledRejection", (err) => {
    console.log("unhandled rejection, Shutting down...");
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});
