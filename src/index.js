import loadArrayExtensions from "./polyfill/array.js";
import server from "./server.js";

// Add custom functionalities
loadArrayExtensions();

server.start();
