
const express = require("express");
const app = express();

app.use('/',(req, res, next) => {
    console.log("always run 1");
    next(); // Allows the request to continue to the next middleware in line
}
);

app.use('/users',(req, res, next) => {
  console.log("Middleware 1");
  res.send('<h1>Hello from Users!</h1>');
//    next(); // Allows the request to continue to the next middleware in line

});
app.use('/',(req, res, next) => {
    console.log("Middleware 2");
    res.send('<h1>Hello from Home!</h1>');
  //    next(); // Allows the request to continue to the next middleware in line
  
  });


app.listen(3000);
