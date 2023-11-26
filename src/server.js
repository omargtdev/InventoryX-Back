import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import { SERVER_PORT } from "./config/env.js";
import router from "./routes/index.js";
import utilMiddleware from "./middlewares/util.middleware.js";

const server = express();

// Variables
server.set('PORT', SERVER_PORT);

// Middlewares
server.use(cors({
	origin: ["http://localhost:5500", "https://omargtdev.github.io"]
}));
server.use(bodyParser.json());
server.use(utilMiddleware.cleanBodyStringsExcept(["password"]))

// Router
server.use(router);

// Custom
server.start = function() {

	const listeningMessage = () => {
		console.log(`App listening on port ${SERVER_PORT}`);
	};
	this.listen(SERVER_PORT, listeningMessage);

}

export default server;
