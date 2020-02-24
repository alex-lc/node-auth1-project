
exports.up = function (knex) {
    return knex.schema.createTable('users', tbl => {
        // primary id for users
        tbl.increments();

        // username
        tbl.string('username', 128)
            .notNullable()
            .unique();

        // password
        tbl.string('password', 128)
            .notNullable()
            .unique();
    })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('users');
};
