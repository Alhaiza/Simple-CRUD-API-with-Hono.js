import { Client, config } from "../deps.ts";

const env = config(); // membaca .env

export const client = await new Client().connect({
  hostname: env.DB_HOST,
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  db: env.DB_NAME,
  port: Number(env.DB_PORT) || 3306,
});
