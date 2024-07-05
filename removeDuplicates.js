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

    // Filter out duplicates based on latin_name
    birds = birds.reduce((uniqueBirds, currentBird) => {
      // Check if there is already a bird with the same latin_name
      const isDuplicate = uniqueBirds.some(
        (bird) => bird.latin_name === currentBird.latin_name
      );

      // If not a duplicate, add to uniqueBirds
      if (!isDuplicate) {
        uniqueBirds.push(currentBird);
      }

      return uniqueBirds;
    }, []);

    // Prepare updated data
    const updatedData = { birds };
    const dbJson = JSON.stringify(updatedData, null, 2);

    // Write back to db.json
    fs.writeFile("db.json", dbJson, (err) => {
      if (err) throw err;
      console.log("Duplicates removed and db.json has been updated.");
    });
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }
});
