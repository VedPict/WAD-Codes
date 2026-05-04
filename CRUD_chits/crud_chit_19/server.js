// Import the express framework to create the web server
const express = require('express'); 
// Import mongoose to interact with the MongoDB database
const mongoose = require('mongoose'); 

// Initialize the express application
const app = express(); 
// Middleware to parse incoming JSON requests (essential for POST/PUT)
app.use(express.json()); 
// Middleware to serve static files (like HTML/CSS) from a folder named 'public'
app.use(express.static('public')); 

// ✅ a) Create DB "student"
// Connects to a local MongoDB instance and a database named 'student'
mongoose.connect("mongodb://127.0.0.1:27017/student", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));




// ✅ b) Create Collection "studentmarks"
// Defines the "shape" of documents within the collection (data types and field names)
const studentSchema = new mongoose.Schema({
    Name: String,
    Roll_No: Number,
    WAD_Marks: Number,
    CC_Marks: Number,
    DSBDA_Marks: Number,
    CNS_Marks: Number,
    AI_Marks: Number
});


// Creates a model named 'Student' which maps to the 'studentmarks' collection in MongoDB
const Student = mongoose.model('studentmarks', studentSchema);


// ✅ c) Insert multiple documents
// Defines a route that, when visited, inserts an array of objects into the DB
app.get('/insert', async (req,res)=>{
    // insertMany is a mongoose method to add multiple records at once
    await Student.insertMany([
        {Name:"ABC", Roll_No:111, WAD_Marks:25, CC_Marks:25, DSBDA_Marks:25, CNS_Marks:25, AI_Marks:25},
        {Name:"XYZ", Roll_No:112, WAD_Marks:30, CC_Marks:20, DSBDA_Marks:22, CNS_Marks:28, AI_Marks:26},
        {Name:"PQR", Roll_No:113, WAD_Marks:10, CC_Marks:15, DSBDA_Marks:18, CNS_Marks:12, AI_Marks:20}
    ]);
    res.send("Data Inserted"); // Sends a confirmation message to the browser
});

// ✅ d) Count + Display all
app.get('/all', async (req,res)=>{
    const data = await Student.find(); // Fetches every single document in the collection
    const count = await Student.countDocuments(); // Gets the total number of records
    res.json({count, data}); // Sends back a JSON object containing both the count and the list
});

// ✅ e) DSBDA > 20
app.get('/dsbda', async (req,res)=>{
    // $gt is the "Greater Than" operator. {Name:1, _id:0} tells Mongo to ONLY show names
    const data = await Student.find({DSBDA_Marks: {$gt:20}}, {Name:1,_id:0});
    res.json(data);
});

// ✅ f) Update marks by +10
app.get('/update', async (req,res)=>{
    // updateMany({}) matches all documents. $inc increments numerical values
    await Student.updateMany({}, {
        $inc: {
            WAD_Marks:10,
            CC_Marks:10,
            DSBDA_Marks:10,
            CNS_Marks:10,
            AI_Marks:10
        }
    });
    res.send("Marks Updated");
});

// ✅ g) All subjects >25
app.get('/above25', async (req,res)=>{
    // Multiple conditions inside find() act like an 'AND' operation
    const data = await Student.find({
        WAD_Marks:{$gt:25},
        CC_Marks:{$gt:25},
        DSBDA_Marks:{$gt:25},
        CNS_Marks:{$gt:25},
        AI_Marks:{$gt:25}
    },{Name:1,_id:0});
    res.json(data);
});

// ✅ h) <40 in Maths & Science (WAD & CNS assumed)
app.get('/lessthan40', async (req,res)=>{
    // $lt is the "Less Than" operator
    const data = await Student.find({
        WAD_Marks:{$lt:40},
        CNS_Marks:{$lt:40}
    },{Name:1,_id:0});
    res.json(data);
});

// ✅ i) Delete student
// :name is a dynamic route parameter (URL variable)
app.get('/delete/:name', async (req,res)=>{
    // req.params.name captures the value from the URL (e.g., /delete/ABC)
    await Student.deleteOne({Name:req.params.name});
    res.send("Deleted");
});

// Start server
// Tells the application to listen for requests on port 3000
app.listen(3000, ()=>console.log("Server running on http://localhost:3000"));