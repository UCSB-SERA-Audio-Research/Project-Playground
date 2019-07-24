var express = require('express'),
    app = express();

app.use("/",express.static("./"));

app.listen(8000);
console.log("Running server at port 8000!");