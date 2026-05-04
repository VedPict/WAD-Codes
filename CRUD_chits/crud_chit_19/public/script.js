// Function to trigger a record insertion on the server
function insert(){
    // Sends a GET request to the '/insert' endpoint
    fetch('/insert')
    // Once the request finishes, show a browser alert to the user
    .then(()=>alert("Inserted"));
    loadAll();
}


// Function to fetch all student records and display them in an HTML table
function loadAll(){
    // Sends a GET request to the '/all' endpoint
    fetch('/all')
    // Converts the raw HTTP response into a usable JSON object
    .then(res=>res.json())
    // Uses the parsed data to update the UI
    .then(data => {
        // Selects the <tbody> element from the HTML document to display data
        const tbody = document.getElementById("table-body");
        // Clears any existing rows in the table to prevent duplicates
        tbody.innerHTML="";

        // Loops through the 'data' array inside the returned JSON object
        data.data.forEach(s => {
            // Appends a new table row (tr) for each student using template literals
            tbody.innerHTML += `
            <tr>
                <td>${s.Name}</td>
                <td>${s.Roll_No}</td>
                <td>${s.WAD_Marks}</td>
                <td>${s.DSBDA_Marks}</td>
                <td>${s.CNS_Marks}</td>
                <td>${s.CC_Marks}</td>
                <td>${s.AI_Marks}</td>
            </tr>`;
        });

        // Displays the total number of records returned by the server in an alert
        alert("Total Count: "+data.count);
    });
}

// Function to fetch specific data related to the DSBDA subject
function dsbda(){
    // Sends a request to the '/dsbda' endpoint
    fetch('/dsbda')
    // Parses the response as JSON
    .then(res=>res.json())
    // Converts the JSON object to a string and displays it in an alert box
    .then(data => alert(JSON.stringify(data)));
}



// Function to trigger a data update on the server
function update(){
    // Sends a GET request to the '/update' endpoint
    fetch('/update')
    // Notifies the user once the update process is complete
    .then(()=>alert("Updated"));
    loadAll();
}

// Function to fetch students who scored above 25 marks
function above25(){
    // Sends a request to the '/above25' endpoint
    fetch('/above25')
    // Parses the response as JSON
    .then(res=>res.json())
    // Displays the resulting data as a string in an alert
    .then(data=>alert(JSON.stringify(data)));
}

// Function to fetch students who scored less than 40 marks
function less40(){
    // Sends a request to the '/lessthan40' endpoint
    fetch('/lessthan40')
    // Parses the response as JSON
    .then(res=>res.json())
    // Displays the resulting data as a string in an alert
    .then(data=>alert(JSON.stringify(data)));
}