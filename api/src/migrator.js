const mm = require('mongodb-migrations');
const pathResolve = require('path').resolve;

module.exports.runMigrations = function(url) {
    const migrator = new mm.Migrator({ url });

    return new Promise((resolve, reject) => {
        const dir = pathResolve('src/migrations');
        migrator.runFromDir(
            dir,
            (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            },
            (id, result) => { console.info(`done running ${id}`, result); }
        );
    });
};
