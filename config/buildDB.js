'use strict';

require('dotenv').config({
    path: 'config/.env'
});

let cfg = {
    client: 'mysql',
    connection: {
        host : process.env.DB_HOST,
        user : process.env.DB_USER,
        database : process.env.DB_NAME,
        password : process.env.DB_PASSWORD || '',
        charset  : 'utf8'
    }
};

const knex = require('knex')(cfg);

(async () => {
    try{
        await knex.schema.dropTableIfExists('pnw2_users');
        await knex.schema.createTable('pnw2_users', table => {
            table.increments().primary();
            table.string('email').notNullable();
            table.string('username').notNullable();
            table.string('password').notNullable();
            table.string('profile_picture_url').nullable();
            table.string('role_id').notNullable().defaultTo(1);
            table.integer('friends_count').nullable().defaultTo(0);

            table.timestamps(false, true);
            table.unique('email');
            table.index(['email']);
            table.index(['username']);
        });
        await knex.schema.dropTableIfExists('pnw2_publications');
        await knex.schema.createTable('pnw2_publications', table => {
            table.increments().primary();
            table.integer('user_id').notNullable();
            table.integer('likes_count').notNullable();
            table.integer('comments_count').notNullable();
            table.string('body').notNullable();
            table.boolean('private').defaultTo(false);

            table.timestamps(false, true);
            table.index(['user_id']);
        });
        await knex.schema.dropTableIfExists('pnw2_friendships');
        await knex.schema.createTable('pnw2_friendships', table => {
            table.increments().primary();
            table.integer('sender_id').notNullable();
            table.integer('sendee_id').notNullable();
            table.integer('friendship_status_id').notNullable().defaultTo(1);

            table.timestamps(false, true);
            table.index(['sender_id']);
            table.index(['sendee_id']);
        });
        await knex.schema.dropTableIfExists('pnw2_user_roles');
        await knex.schema.createTable('pnw2_user_roles', table => {
            table.increments().primary();
            table.string('value').notNullable();
        });
        await knex.schema.dropTableIfExists('pnw2_friendship_statuses');
        await knex.schema.createTable('pnw2_friendship_statuses', table => {
            table.increments().primary();
            table.string('value').notNullable();
        });
        await knex.schema.dropTableIfExists('pnw2_comment_comments');
        await knex.schema.createTable('pnw2_comment_comments', table => {
            table.increments().primary();
            table.integer('comment_id').notNullable();
            table.integer('user_id').notNullable();
            table.integer('comments_count').notNullable().defaultTo(0);
            table.string('body').notNullable();

            table.timestamps(false, true);
        });
        await knex.schema.dropTableIfExists('pnw2_publication_comments');
        await knex.schema.createTable('pnw2_publication_comments', table => {
            table.increments().primary();
            table.integer('comment_id').notNullable();
            table.integer('user_id').notNullable();
            table.integer('comments_count').notNullable().defaultTo(0);
            table.string('body').notNullable();

            table.timestamps(false, true);
        });

        await knex('pnw2_user_roles').insert({value: 'USER'});
        await knex('pnw2_user_roles').insert({value: 'DEVELOPER'});
        await knex('pnw2_user_roles').insert({value: 'ADMIN'});
        await knex('pnw2_friendship_statuses').insert({value: 'PENDING'});
        await knex('pnw2_friendship_statuses').insert({value: 'ACCEPTED'});
        await knex('pnw2_friendship_statuses').insert({value: 'DECLINED'});

    } catch(error) {
        console.log(error);
    } finally {
        process.exit(0);
    }
})();
