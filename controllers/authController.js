"use strict";

const { User} = require("../models/index");
const thisDay = (_) => new Date().toISOString().slice(0, 10);
const { buildAccessToken, buildRefreshToken } = require("../services/tokens");

module.exports.login = async (req, reply) => {
  try {
    const user = await User.login(req.body.email, req.body.password);
    if (user === null) return reply.notFound();
    if (user.blocked) return reply.forbidden();
    await User.update(
      {
        last_login_ip: req.headers["x-real-ip"] || req.socket.remoteAddress,
        last_device: req.headers["user-agent"] || "",
        last_login_type: "email",
        last_login: thisDay(),
        is_active: true,
      },
      { where: { id: user.id } }
    );
    return {
      user,
      accessToken: buildAccessToken(user),
      refreshToken: buildRefreshToken(user),
    };
  } catch (err) {
    console.log(err);
  }
  return reply.forbidden();
};

module.exports.refreshToken = async (req, reply) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (user === null) return reply.notFound();
    if (user.blocked) return reply.forbidden();
    await User.update(
      {
        last_login_ip: req.headers["x-real-ip"] || req.socket.remoteAddress,
        last_login: thisDay(),
        is_active: true,
      },
      { where: { id: user.id } }
    );

    return {
      accessToken: buildAccessToken(user),
      refreshToken: buildRefreshToken(user),
    };
  } catch (err) {
    console.log(err);
  }
  return reply.forbidden();
};

