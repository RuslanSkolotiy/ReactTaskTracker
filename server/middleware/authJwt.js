const jwt = require("jsonwebtoken");
const config = require("../config/config.json");

verifyToken = (req, res, next) => {
    let authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(403).send({ message: "No token provided!" });
    }
    const token = authHeader.split(" ")[1];

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
        }
        req.userId = decoded._id;
        next();
    });
};

verifyRefreshToken = (req, res, next) => {
    let refreshToken = req.body.refreshToken;

    if (!refreshToken) {
        return res.status(403).send({ message: "No token provided!" });
    }

    jwt.verify(refreshToken, config.refreshTokenSecret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
        }
        req.userId = decoded._id;
        next();
    });
};

const authJwt = {
    verifyToken,
    verifyRefreshToken,
};
module.exports = authJwt;
