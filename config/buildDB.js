'use strict';

require('dotenv').config({
    path: 'config/.env'
});

const bcrypt = require('bcrypt');
const prod = process.env.NODE_ENV === 'production';

let host = prod ? process.env.DB_HOST_PROD : process.env.DB_HOST;
let user = prod ? process.env.DB_USER_PROD : process.env.DB_USER;
let database = prod ? process.env.DB_NAME_PROD : process.env.DB_NAME;
let password = prod ? process.env.DB_PASSWORD_PROD : (process.env.DB_PASSWORD || '');

let cfg = {
    client: 'mysql',
    connection: {
        host, user, database, password,
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
            table.string('bio', 120).nullable();
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
            table.string('body').notNullable();
            table.integer('comments_count').notNullable().defaultTo(0);
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
            table.integer('id').primary();
            table.string('value').notNullable();
        });
        await knex.schema.dropTableIfExists('pnw2_friendship_statuses');
        await knex.schema.createTable('pnw2_friendship_statuses', table => {
            table.integer('id').primary();
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
        await knex.schema.dropTableIfExists('pnw2_private_messages');
        await knex.schema.createTable('pnw2_private_messages', table => {
            table.increments().primary();
            table.integer('target_id').notNullable();
            table.integer('sender_id').notNullable();
            table.text('body').notNullable();
            table.boolean('is_read').defaultTo(0);

            table.timestamps(false, true);
        });

        await knex('pnw2_user_roles').insert({id: 1, value: 'USER'});
        await knex('pnw2_user_roles').insert({id: 2, value: 'DEVELOPER'});
        await knex('pnw2_user_roles').insert({id: 3, value: 'ADMIN'});
        await knex('pnw2_friendship_statuses').insert({id: 1, value: 'PENDING'});
        await knex('pnw2_friendship_statuses').insert({id: 2, value: 'ACCEPTED'});
        await knex('pnw2_friendship_statuses').insert({id: 3, value: 'DECLINED'});

        await knex('pnw2_users').insert({
            username: 'Daria',
            email: 'dadaria@gmail.com',
            password : await bcrypt.hash('azerty', 10),
            profile_picture_url: 'popnetwork/me.jpg',
            bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris libero erat, varius id rhoncus amet.'
        });
        await knex('pnw2_users').insert({
            username: 'Lovies',
            email: 'lovies@gmail.com',
            password : await bcrypt.hash('azerty', 10)
        });
        await knex('pnw2_users').insert({
            username: 'Dinolino',
            email: 'dinolino@gmail.com',
            password : await bcrypt.hash('azerty', 10)
        });
        await knex('pnw2_users').insert({
            username: 'Karz',
            email: 'karz62@gmail.com',
            password : await bcrypt.hash('azerty', 10)
        });
        await knex('pnw2_users').insert({
            username: 'Bouchachoss',
            email: 'bouchachoss@gmail.com',
            password : await bcrypt.hash('azerty', 10)
        });
        await knex('pnw2_users').insert({
            username: 'Heather',
            email: 'heather@gmail.com',
            password : await bcrypt.hash('azerty', 10)
        });
        await knex('pnw2_users').insert({
            username: 'JunMiyagi',
            email: 'junmiyagi@gmail.com',
            password : await bcrypt.hash('azerty', 10)
        });

        // We need to change the ids in production because ClearDB increments auto-increment fields by 10
        const id = id => prod ? parseInt(id -1 + '1') : id;

        await knex('pnw2_friendships').insert({sender_id: 1, sendee_id: id(2), friendship_status_id: 2});
        await knex('pnw2_friendships').insert({sender_id: 1, sendee_id: id(3), friendship_status_id: 2});
        await knex('pnw2_friendships').insert({sender_id: 1, sendee_id: id(4), friendship_status_id: 1});
        await knex('pnw2_friendships').insert({sender_id: 1, sendee_id: id(5), friendship_status_id: 3});
        await knex('pnw2_friendships').insert({sender_id: 1, sendee_id: id(6), friendship_status_id: 1});
        await knex('pnw2_friendships').insert({sender_id: 1, sendee_id: id(7), friendship_status_id: 1});
        await knex('pnw2_friendships').insert({sender_id: id(2), sendee_id: id(3), friendship_status_id: 2});
        await knex('pnw2_friendships').insert({sender_id: id(2), sendee_id: id(4), friendship_status_id: 1});
        await knex('pnw2_friendships').insert({sender_id: id(2), sendee_id: id(5), friendship_status_id: 2});
        await knex('pnw2_friendships').insert({sender_id: id(6), sendee_id: id(7), friendship_status_id: 3});

        await knex('pnw2_publications').insert({
            user_id: 1,
            body: 'This is publication 1 by Daria',
            created_at: new Date('July 06, 2018 11:13:00')
        });
        await knex('pnw2_publications').insert({
            user_id: 1,
            body: 'This is publication 2 by Daria',
            created_at: new Date('July 02, 2018 09:30:00')
        });
        await knex('pnw2_publications').insert({
            user_id: 1,
            body: 'This is private publication 1 by Daria',
            private: true,
            created_at: new Date('July 04, 2018 17:13:00')
        });
        await knex('pnw2_publications').insert({
            user_id: 1,
            body: 'This is private publication 2 by Daria',
            private: true
        });
        await knex('pnw2_publications').insert({
            user_id: id(2),
            body: 'This is publication 1 by Lovies',
            created_at: new Date('July 01, 2018 15:27:00')
        });
        await knex('pnw2_publications').insert({
            user_id: id(2),
            body: 'This is publication 3 by Lovies',
            created_at: new Date('July 06, 2018 10:45:00')
        });

    } catch(error) {
        console.log(error);
    } finally {
        process.exit(0);
    }
})();
