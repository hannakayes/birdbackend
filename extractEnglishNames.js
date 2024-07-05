const fs = require("fs");

// Read the db.json file
fs.readFile("db.json", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading db.json:", err);
    return;
  }

  // Parse the JSON data
  const db = JSON.parse(data);

  // Extract the English names
  const englishNames = db.birds.map((bird) => bird.name);

  // Convert the names array to JSON format
  const namesJson = JSON.stringify(englishNames, null, 2);

  // Write the English names to a new file
  fs.writeFile("english_names.json", namesJson, "utf8", (err) => {
    if (err) {
      console.error("Error writing english_names.json:", err);
      return;
    }

    console.log("English names have been extracted to english_names.json");
  });
});
