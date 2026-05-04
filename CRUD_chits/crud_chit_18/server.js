const express = require('express');
const app = express();

app.use(express.json());
// app.use(express.static('/index.html'));

const mongoose = require('mongoose');

const song = mongoose.Schema({
    song_name: String,
    film_name: String,
    music_director: String,
    singer_name: String,
    actor_name: String,
    actress_name: String
});

const music = mongoose.model("music_collection", song);

try{
    await mongoose.connect("mongodb://localhost:27017/music_db");
    console.log("Mongo DB connected");
}
catch(err){
    console.log(err);
}



const PORT = 3000;



app.get('/all', async (req,res) => {
    const data = await music.find();
    console.log(data);
    const count = await music.countDocuments();
    res.json({count,data});
})

app.post('/insert', async (req,res) => {

    const to_be_inserted = [
    {song_name:"Gone Gone Gone", film_name:"Spider-Man", music_director:"Tobey Maguire", singer_name:"The Weekend", actor_name:"Andrew Garfield", actress_name:"Emma Stone"},
    {song_name:"Sunflower", film_name:"Into the Spider-Verse", music_director:"Post Malone", singer_name:"Swae Lee", actor_name:"Shameik Moore", actress_name:"Hailee Steinfeld"},
    {song_name:"Vindicated", film_name:"Spider-Man 2", music_director:"Danny Elfman", singer_name:"Dashboard Confessional", actor_name:"Tobey Maguire", actress_name:"Kirsten Dunst"},
    {song_name:"Calling", film_name:"Across the Spider-Verse", music_director:"Metro Boomin", singer_name:"Swae Lee & Nav", actor_name:"Oscar Isaac", actress_name:"Issa Rae"},
    {song_name:"Hero", film_name:"Spider-Man", music_director:"Chad Kroeger", singer_name:"Josey Scott", actor_name:"Tom Holland", actress_name:"Zendaya"}
    ];

    await music.insertMany(to_be_inserted);

    const data = await music.find();

    res.status(200).json(data);
})


app.get('/search/director/:mongo_id', async (req,res) => {
    const song_id = req.params.mongo_id;
    
    const data = await music.find({ _id: song_id });

    res.json(data);
});


app.get('/search/directorsinger/', async (req,res) => {
    const director = req.query.director;
    const singer = req.query.singer;

    const data = await music.find({music_director: director, singer_name: singer});

    res.json(data);
});


app.delete('/delete', async (req, res) => {
    const song = req.query.name;

    await music.deleteMany({song_name: song});

    res.status(200).send("Deleted");
})






app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`));


