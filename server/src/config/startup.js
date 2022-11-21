const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { ADMIN_PASSWORD } = process.env;

module.exports = {
    async createAdminUser() {
        try {
            if (await User.exists({ username: 'admin' })) {
                console.log('admin already exists');
                return;
            }

            const admin = { username: 'admin', password: ADMIN_PASSWORD };

            await User.create(admin);

            console.log('admin user created');
        } catch (error) {
            console.log(error);
        }
    }
}