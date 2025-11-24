import type { Knex } from 'knex';
import 'dotenv/config';

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL || {
      host: 'localhost',
      port: 5432,
      user: 'michi',
      password: 'michi123',
      database: 'michicode',
    },
    migrations: { directory: './migrations' },
    seeds: { directory: './seeds' },
  },
};

export default config;