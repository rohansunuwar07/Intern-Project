import { config } from "dotenv";

config();

export let port = process.env.PORT;
export let dbPath = process.env.DB_URL;
