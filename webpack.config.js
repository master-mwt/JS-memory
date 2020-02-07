module.exports = {
    mode: 'production',
    watch: true,
    watchOptions: {
        aggregateTimeout: 600,
        ignored: '/node_modules/',
        poll: 2000,
    },
};
// command: webpack --watch --info-verbosity verbose OR npx webpack