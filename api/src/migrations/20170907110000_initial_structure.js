module.exports.id = '20170907110000_initial_structure';

module.exports.up = async function (done) {
    const coll = await this.db.createCollection('traces');

    coll.createIndex({ correlationId: 1 }, { background: true, name: 'quick lookup' });
    coll.createIndex({ at: 1 }, { background: true, name: 'searching' });

    done();
};

module.exports.down = async function (done) {
    const coll = this.db.collection('traces');
    await coll.drop();
    done();
};