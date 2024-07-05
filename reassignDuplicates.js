const fs = require("fs");

// Read db.json
fs.readFile("db.json", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading db.json:", err);
    return;
  }

  try {
    const birdsData = JSON.parse(data);
    let birds = birdsData.birds;

    // Reassign IDs based on the current array length
    birds = birds.map((bird, index) => {
      bird.id = index + 1; // Assigning new ID
      return bird;
    });

    // Prepare updated data
    const updatedData = { birds };
    const dbJson = JSON.stringify(updatedData, null, 2);

    // Write back to db.json
    fs.writeFile("db.json", dbJson, (err) => {
      if (err) throw err;
      console.log("IDs have been reassigned in db.json.");
    });
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }
});
