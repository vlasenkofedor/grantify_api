"use strict";

const monday = require("monday-sdk-js")();
monday.setToken(process.env.mondayToken);

module.exports.list = async (req, reply) => {
    try {
        const query = '{ boards (limit: 1000) { name id }}';
        const {data} = await monday.api(query);
        return data.boards
    } catch (err) {
        console.log(err);
    }
    return reply.notFound();
};

