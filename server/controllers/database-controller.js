
module.exports = function(app) {
// respond with "hello world" when a GET request is made to the homepage
console.log("getting here?");
    app.get('/hello-world', function (req, res) {
        try {
           return res.send('hello world')
        } catch (e) {
            res.json({error: e.message});
        }


    })

}
