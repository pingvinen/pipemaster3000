module.exports.id = '20170907110700_add_simple_test_trace';

module.exports.up = async function (done) {
    const coll = this.db.collection('traces');

    await coll.insertMany([
        {
            sender: "A",
            action: "sent",
            path: ["A"],
            correlationId: "1",
            payload: "<yay>from A</yay>",
            at: new Date("2017-09-07T11:00:00.000Z")
        },
        {
            sender: "B",
            action: "received",
            path: ["A", "B"],
            correlationId: "1",
            payload: "<yay>from A</yay>",
            at: new Date("2017-09-07T11:00:00.111Z")
        },
        {
            sender: "B",
            action: "sent",
            path: ["A", "B"],
            correlationId: "1",
            payload: "<yay>from A with mods by B</yay>",
            at: new Date("2017-09-07T11:00:07.123Z")
        },
        {
            sender: "C",
            action: "received",
            path: ["A", "B", "C"],
            correlationId: "1",
            payload: "<yay>from A with mods by B</yay>",
            at: new Date("2017-09-07T11:00:07.666Z")
        },
    ]);

    done();
};

module.exports.down = function (done) {
    this.log('not implemented');
    done();
};