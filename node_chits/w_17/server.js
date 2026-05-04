const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 3000;
app.use(express.json());
const FILE = 'data.json';


app.use(express.static(__dirname));

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/index.html');
})


app.get('/users', (req,res) => {

    let data = JSON.parse(fs.readFileSync(FILE));
    res.json(data);
    
})




app.listen(PORT, () => console.log(`App listening on http://localhost:${PORT}`));