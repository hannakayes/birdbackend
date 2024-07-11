const fs = require("fs");

// Read birdCountries.json to get the bird countries data
fs.readFile("birdCountries.json", "utf8", (err, birdCountriesData) => {
  if (err) {
    console.error("Error reading birdCountries.json:", err);
    return;
  }

  try {
    // Parse birdCountries data
    const birdCountries = JSON.parse(birdCountriesData);

    // Read db.json to get the bird objects
    fs.readFile("db.json", "utf8", (err, dbData) => {
      if (err) {
        console.error("Error reading db.json:", err);
        return;
      }

      try {
        // Parse db.json data
        const db = JSON.parse(dbData);

        // Ensure db.birds exists and is an array
        if (!db || !Array.isArray(db.birds)) {
          console.error('Invalid format in db.json. Expected "birds" array.');
          return;
        }

        // Update each bird object with countries if available
        const updatedBirds = db.birds.map((bird) => {
          // Check if bird name exists in birdCountries
          if (bird.name in birdCountries) {
            // Only update countries if bird name is found in birdCountries
            bird.countries = birdCountries[bird.name];
          } else {
            // Leave bird.countries unchanged if bird name is not found
            console.warn(`No country data found for bird: ${bird.name}`);
          }
          return bird;
        });

        // Update db object with modified birds array
        db.birds = updatedBirds;

        // Convert updated db object back to JSON string
        const updatedJson = JSON.stringify(db, null, 2);

        // Write updated data back to db.json
        fs.writeFile("db.json", updatedJson, "utf8", (err) => {
          if (err) {
            console.error("Error writing to db.json:", err);
          } else {
            console.log("Countries added to db.json successfully!");
          }
        });
      } catch (error) {
        console.error("Error parsing JSON data from db.json:", error);
      }
    });
  } catch (error) {
    console.error("Error parsing JSON data from birdCountries.json:", error);
  }
});
