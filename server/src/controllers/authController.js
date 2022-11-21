const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { createToken } = require('../utils/jwtToken');

module.exports = {
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

            user.token = 'Bearer ' + await createToken({ username: user.username });
            user.password = undefined;

            console.log(user);

            return response.json(user);
        } catch (error) {
            console.log(error);
            
            return response.sendStatus(500)
        }
    }
}