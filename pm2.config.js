module.exports = {
    apps: [{
        name: 'Admin-API',
        instances: 1,
        exec_mode: 'fork', // cluster or fork
        watch_delay: 1000,
        script: '/var/www/admin_api/index.js',
        watch: ['/var/www/admin_api'],
        ignore_watch: ['node_modules', 'logs', 'public', '.idea', '.git'],
        watch_options: {
            followSymlinks: false,
        },
        env: {
            logger: true,
            port: 8888,
            host: '127.0.0.1',
            accessTokenTime: 30000,
            refreshTokenTime: 86400,
            accessTokenSecret: 'Alo8wnlnDesi7t30baZqP20Dm5byU',
            refreshTokenSecret: 'Alo8wnFohdTwaQqi7t30baZqP20Dm5byU',
            mondayToken: 'eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjY0MDg4MDA4LCJ1aWQiOjEzODYwMDQyLCJpYWQiOiIyMDIwLTA3LTI5VDExOjM4OjEyLjAwMFoiLCJwZXIiOiJtZTp3cml0ZSIsImFjdGlkIjo2MTU3MDQ5LCJyZ24iOiJ1c2UxIn0.5JLnUtQxb41YixKMgNyI9ESYHfuxfR5O_B98Fmx99wg',
            dbUserName: 'grantify_user',
            dbPassword: 'rtYw2oapl!bUx',
            dbDatabase: 'grantify',
            dbHost: '127.0.0.1',
            dbPort: '3306',
            dbDialect: 'mysql',
            dbBenchmark: true,
            dbLogQueryParameters: true,
            publicFolder: '/var/www/admin_api/public'
        },
        max_memory_restart: '1G'
    }]
}
