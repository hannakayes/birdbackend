const fs = require("fs");

// Input text with birds and countries
const inputText = `
Common Pheasant
Found in: United Kingdom, Ireland, France, Germany, Belgium, Netherlands, Luxembourg, Denmark, Switzerland, Austria, Italy, Spain, Portugal, Norway, Sweden, Finland, Estonia, Latvia, Lithuania, Poland, Czech Republic, Slovakia, Hungary, Slovenia, Croatia, Bosnia and Herzegovina, Serbia, Montenegro, Kosovo, Albania, North Macedonia, Greece, Bulgaria, Romania, Moldova, Ukraine, Belarus, Russia.

Eurasian Wren
Found in: United Kingdom, Ireland, France, Belgium, Netherlands, Luxembourg, Denmark, Switzerland, Austria, Germany, Poland, Czech Republic, Slovakia, Hungary, Slovenia, Croatia, Bosnia and Herzegovina, Serbia, Montenegro, Kosovo, Albania, North Macedonia, Greece, Bulgaria, Romania, Moldova, Ukraine, Belarus, Russia.

European Robin
Found in: United Kingdom, Ireland, France, Belgium, Netherlands, Luxembourg, Denmark, Switzerland, Austria, Germany, Poland, Czech Republic, Slovakia, Hungary, Slovenia, Croatia, Bosnia and Herzegovina, Serbia, Montenegro, Kosovo, Albania, North Macedonia, Greece, Bulgaria, Romania, Moldova, Ukraine, Belarus, Russia.

Common Pheasant
Found in: United Kingdom, Ireland, France, Germany, Belgium, Netherlands, Luxembourg, Denmark, Switzerland, Austria, Italy, Spain, Portugal.
`;

// Initialize an empty object to store bird countries
const birdCountries = {};

// Split input text by lines
const lines = inputText.trim().split("\n");

// Initialize variables to store current bird name and countries
let currentBird = "";
let currentCountries = [];

// Process each line of input text
lines.forEach((line) => {
  // Check if the line contains a bird name
  if (!line.startsWith("Found in:")) {
    // If currentBird is not empty, it means we are starting a new bird entry
    if (currentBird !== "") {
      // Assign countries to the bird in the object
      birdCountries[currentBird] = [...new Set(currentCountries)]; // Use Set to remove duplicates
      // Reset variables for the next bird
      currentBird = "";
      currentCountries = [];
    }
    // Extract bird name from the line
    currentBird = line.trim();
  } else {
    // Extract countries from the line
    const countries = line
      .replace("Found in:", "")
      .trim()
      .split(",")
      .map((country) => country.trim());
    currentCountries = currentCountries.concat(countries);

    // Check if it's the last line for the current bird
    if (line.endsWith(".")) {
      // Assign countries to the bird in the object
      birdCountries[currentBird] = [...new Set(currentCountries)]; // Use Set to remove duplicates
      // Reset variables for the next bird
      currentBird = "";
      currentCountries = [];
    }
  }
});

// Convert the birdCountries object to JSON string
const birdCountriesJson = JSON.stringify(birdCountries, null, 2);

// Write the JSON string to a new file
fs.writeFile("birdCountries.json", birdCountriesJson, "utf8", (err) => {
  if (err) {
    console.error("Error writing birdCountries.json:", err);
  } else {
    console.log("birdCountries.json has been created successfully!");
  }
});
