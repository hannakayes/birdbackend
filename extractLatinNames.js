const fs = require("fs");

// Read db.json
fs.readFile("db.json", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading db.json:", err);
    return;
  }

  try {
    const birdsData = JSON.parse(data);
    const birds = birdsData.birds;

    // Extract latin names
    const latinNames = birds.map((bird) => bird.latin_name);

    // Write latin names to a new file
    const outputFileName = "latin_names.txt";
    fs.writeFile(outputFileName, latinNames.join("\n"), (err) => {
      if (err) throw err;
      console.log(`Latin names have been written to ${outputFileName}.`);
    });
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }
});
