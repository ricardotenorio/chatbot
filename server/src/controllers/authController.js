const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { createToken } = require('../utils/jwtToken');

module.exports = {
    async verifyAuth(request, response) {
        try {
            const user = { id: request.authId, username: request.username, }

            return response.json(user);
        } catch (error) {
            console.log(error);
            
            return response.sendStatus(500);
        }
    },

    async login(request, response) {
        try {
            const { password } = request.body;

            if (!password) {
                return response.sendStatus(400);
            }

            const user = await User.findOne({ username: 'admin'}).select('+password');

            if (!user || !(await bcrypt.compare(password, user.password))) {
                return response.status(401).json('Invalid password');
            }

            const token = 'Bearer ' + await createToken({ id: user._id, username: user.username });
            user.password = undefined;

            return response.json({ user, token });
        } catch (error) {
            console.log(error);
            
            return response.sendStatus(500);
        }
    }
}