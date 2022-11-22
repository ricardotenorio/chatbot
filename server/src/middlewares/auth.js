const jwt = require('jsonwebtoken');

const config = process.env;

const verifyToken = (request, response, next) => {
    const authHeader = request.headers.token;

    if (!authHeader)
        return response.status(403).json('login required');

    const parts = authHeader.split(' ');

    if (parts.length !== 2)
        return response.sendStatus(400);

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme))
        return response.sendStatus(400);

    jwt.verify(token, config.TOKEN_KEY, (error, decoded) => {
        if (error)
            return response.status(401).json('invalid token');

        request.authId = decoded.params.id;
        request.username = decoded.params.username;

        return next();
    }
    );
};

module.exports = verifyToken;