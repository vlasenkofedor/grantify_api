"use strict";

const jwt = require("jsonwebtoken"),
    {accessTokenTime, refreshTokenTime, accessTokenSecret, refreshTokenSecret} = process.env,
    checkToken = (request, reply, done, secret) => {
        const header = request.raw.headers.authorization;
        if (!header || header.length < 7) {
            request.log.error("unauthorized: missing authorization header");
            reply.unauthorized('No authorization token');
            return;
        }
        const token = header.substring(6).trim();
        jwt.verify(token, secret, (err, decoded) => {
            if (err) return reply.unauthorized('Bad token');
            request.user = { id: decoded.sub, groups: decoded.groups };
            done();
        });
    },
    verifyToken = (token) => {
        try {
            const decoded = jwt.verify(token, accessTokenSecret);
            return {
                id: decoded.sub,
                groups: decoded.groups ? decoded.groups : [2],
            };
        } catch (_) {
            return false;
        }
    },
    buildAToken = (user, time, secret) =>
        jwt.sign(
            {
                sub: user.id,
                iat: Math.floor(Date.now() / 1000),
                exp: Math.floor(Date.now() / 1000 + time),
                groups: user.groups,
            },
            secret
        ),
    buildRToken = (user, time, secret) =>
        jwt.sign(
            {
                sub: user.id,
                iat: Math.floor(Date.now() / 1000),
                exp: Math.floor(Date.now() / 1000 + time),
            },
            secret
        );

module.exports = {
    buildAccessToken: (user) =>
        buildAToken(user, +accessTokenTime, accessTokenSecret),
    buildRefreshToken: (user) =>
        buildRToken(user, +refreshTokenTime, refreshTokenSecret),
    checkAccessToken: (request, reply, done) =>
        checkToken(request, reply, done, accessTokenSecret),
    checkRefreshToken: (request, reply, done) =>
        checkToken(request, reply, done, refreshTokenSecret),
    verifyToken,
};
