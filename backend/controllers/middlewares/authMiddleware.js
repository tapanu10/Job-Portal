const JWT = require('jsonwebtoken');

const userAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(401).send({
            success: false,
            message: 'Auth failed'
        });
    }
    
    const token = authHeader.split(' ')[1]; // Corrected typo here

    try {
        const payload = JWT.verify(token, process.env.JWT_SECRET);
        req.user = { userId: payload.userId };
        next();
    } catch (error) {
        return res.status(401).send({
            success: false,
            message: 'Invalid token'
        });
    }
};

module.exports = userAuth;
