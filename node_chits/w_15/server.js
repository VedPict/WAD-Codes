const express = require('express');
const fs = require('fs');

const app = express();

const PORT = 3000;
const FILE = 'data.json';

app.use(express.static(__dirname));

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/products', (req,res) => {
fs.readFile(FILE, 'utf-8', (err,data) => {
    if(err){
        return res.status(500).send("Data error");
    }
    else{
        res.json(JSON.parse(data));
    }
})

});


app.listen(PORT, () => console.log(`Port Listening on http://localhost:${PORT}`));