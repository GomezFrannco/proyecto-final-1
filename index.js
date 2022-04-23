import 'dotenv/config';
//  server class import
import { Server } from "./src/server/app.js";
//  server class instance
const app = new Server();
//  running server
app.listen(process.env.PORT || 8080);