"use strict";

const {port, host, logger} = process.env,
    routes = require("./routes/index"),
    {sequelize} = require("./models/index"),
    ajvPlugin = (ajv) => {
        ajv["addKeyword"]({
            keyword: "isFileType",
            compile: (schema, parent) => {
                parent.type = "file";
                delete parent.isFileType;
                return () => true;
            },
        });
        return ajv;
    };

const fastify = require("fastify")({
    /*http2: true,
            https: {
                key: fs.readFileSync(path.join(__dirname, '../test/https/fastify.key')),
                cert: fs.readFileSync(path.join(__dirname, '../test/https/fastify.cert'))
            },*/
    logger,
    ajv: {
        useDefaults: true,
        coerceTypes: true,
        $data: true,
        extendRefs: true,
        plugins: [ajvPlugin],
    },
});

require("./events/index")();
fastify.register(require("@fastify/sensible"));
fastify.register(require("@fastify/multipart"), {
    addToBody: true,
    attachFieldsToBody: true,
});
fastify.register(require("@now-ims/fastify-firebase"));
/*fastify.register(require("fastify-raw-body"), {
  field: "rawBody", // change the default request.rawBody property name
  global: false, // add the rawBody to every request. **Default true**
  encoding: "utf8", // set it to false. to set rawBody as a Buffer **Default utf8**
  runFirst: true, // get the body before any preParsing hook change/uncompress it. **Default false**
});*/

fastify.register(require("@fastify/swagger"), {
    routePrefix: "/api",
    swagger: {
        info: {
            title: "API request",
            description: "Testing the api request",
            version: "0.0.1",
        },
        securityDefinitions: {
            bearerAuth: {
                description: "",
                type: "apiKey",
                name: "Authorization",
                in: "header",
            },
        },
        host: 'admin-monday.devxqa.com',
        schemes: ["https"],
        consumes: ["application/json"],
        produces: ["application/json"],
        tags: [
            {name: "Auth", description: "User Auth related end-points"},
            {name: "Board", description: "Boards commands"},
            {name: "User", description: "Users commands"},
        ],
        uiConfig: {
            layout: "BaseLayout",
        },
        staticCSP: true,
        exposeRoute: true,
    },
    hiddenTag: "X-HIDDEN",
    exposeRoute: true,
});

fastify.register(
    (app, _, done) => {
        routes.forEach(route => app.route(route));
        done();
    },
    {prefix: "/api"}
);

sequelize.authenticate().then(_ => {
    fastify.log.info('++++++++++++++++++++++++++ DB START +++++++++++++++++++++++++');
    fastify.listen({port, host}, (err, address) => {
         if (err) throw err;
        fastify.log.info(`++++++++++++++++++++++++++ Fastify START ${address}`);
        // Server is now listening on ${address}
    })
}).catch(err => {
    fastify.log.error('++++++++++++++++++++++++++ ERROR +++++++++++++++++++++++++');
    fastify.log.error(err);
    fastify.log.error('++++++++++++++++++++++++++ ERROR +++++++++++++++++++++++++');
    process.exit(1);
});
