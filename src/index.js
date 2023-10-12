import loadArrayExtensions from "./polyfill/array.js";
import loadObjectExtensions from "./polyfill/object.js";
import server from "./server.js";

// Add custom functionalities
loadArrayExtensions();
loadObjectExtensions();

server.start();
