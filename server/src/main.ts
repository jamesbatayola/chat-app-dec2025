import express from "express";
import { createServer } from "http";
import dotenv from "dotenv";
import cors from "cors";

import k from "kleur";

dotenv.config();

const app = express();

app.use(cors());

const httpServer = createServer(app);

const PORT = process.env.SERVER_PORT as string;

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${k.bgYellow(PORT)}`);
});
