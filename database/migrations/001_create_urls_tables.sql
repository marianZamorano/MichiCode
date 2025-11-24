import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('urls', (table) => {
    table.increments('id').primary();
    table.string('short_code', 10).unique().notNullable();
    table.text('original_url').notNullable();
    table.text('short_url').unique().notNullable();
    table.integer('clicks').defaultTo(0).notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
    table.timestamp('updated_at').defaultTo(knex.fn.now()).notNullable();
    table.index('short_code');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('urls');
}