const notes = [{
    id: 1,
    note: 'Test'
}, {
    id: 2,
    note: 'Note number 2'
}];

module.exports = function (app) {
    app.get('/js/routes/getNoteItems', function (req, res) {
        res.send({ notes: notes });
    });
};