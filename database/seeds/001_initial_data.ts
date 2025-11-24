import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('urls').del();
  await knex('urls').insert([
    {
      short_code: 'abc123',
      original_url: 'https://www.youtube.com',
      short_url: 'http://localhost:5000/abc123',
      clicks: 0,
    },
    {
      short_code: 'test99',
      original_url: 'https://github.com',
      short_url: 'http://localhost:5000/test99',
      clicks: 27,
    },
  ]);
}