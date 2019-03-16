const notes =[{
    id : 1,
    note : 'Thanks for visiting'
},
];

module.exports = function (app) {
    app.get('/js/routes/getNoteItems',function (req,res) {
        res.send({notes:notes});
    });
}
