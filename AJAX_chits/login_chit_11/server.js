// Write a JavaScript Program to create a login(username, password) and 
// registration form(name, email, mobile number, dob, city, address) and push to an 
// array/local storage with the AJAX POST method and a data list in a new page. 
// Add proper validations for each form element.



const express = require('express');
const fs = require('fs');

const app = express();

let users = [];
app.use(express.json())
app.use(express.static(__dirname));

const PORT = 3000;

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/index.html');
})

app.post('/register', (req,res) => {
    console.log("Hit Register");
    const data = req.body;

    users.push(data);

    res.json({message:"Registration successful"});
});

// To Login
app.post('/login', (req,res) => {
    console.log("Hit Login");
    const {username, password} = req.body;

    const found = users.find(
        user => user.email === username && user.password === password
    );

    if(found){
        res.json({message:"Login Successfull"});
    }
    else{
        res.json({message:"User not Found"});
    }
});


app.get('/users', (req,res) => {
    res.json(users);
})


app.listen(PORT, () => console.log(`App running on http://localhost:${PORT}`));