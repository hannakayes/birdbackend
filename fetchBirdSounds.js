const fs = require("fs").promises;

// Dynamic import of node-fetch
const fetch = async (url) => {
  const { default: fetch } = await import("node-fetch");
  return fetch(url);
};

// Load bird data from db.json
const loadBirdData = async () => {
  try {
    const data = await fs.readFile("db.json", "utf-8");
    const parsedData = JSON.parse(data);
    if (!Array.isArray(parsedData.birds)) {
      throw new Error("Data is not an array");
    }
    return parsedData.birds;
  } catch (error) {
    console.error("Error reading db.json:", error);
    return [];
  }
};

// Save bird data to db.json
const saveBirdData = async (birds) => {
  try {
    const dataToSave = { birds: birds };
    await fs.writeFile("db.json", JSON.stringify(dataToSave, null, 2));
    console.log("Bird data saved successfully.");
  } catch (error) {
    console.error("Error saving db.json:", error);
  }
};

// Fetch sound URL from xeno-canto
const fetchSoundURL = async (latinName) => {
  const baseURL = "https://www.xeno-canto.org/api/2/recordings?query=";
  const response = await fetch(`${baseURL}${latinName}`);

  if (response.ok) {
    const data = await response.json();
    if (data.recordings && data.recordings.length > 0) {
      return data.recordings[0].file;
    } else {
      console.log(`No recordings found for ${latinName}`);
    }
  } else {
    console.log(`Failed to fetch data for ${latinName}`);
  }
  return null;
};

// Main function to update bird sounds
const updateBirdSounds = async () => {
  const birds = await loadBirdData();

  if (!Array.isArray(birds)) {
    console.error("Bird data is not an array. Check the contents of db.json.");
    return;
  }

  for (const bird of birds) {
    const soundURL = await fetchSoundURL(bird.latin_name);
    if (soundURL) {
      bird.sound = soundURL;
      console.log(`Fetched sound for ${bird.name}: ${soundURL}`);
    }
  }

  await saveBirdData(birds);
  console.log("Updated db.json with bird sounds");
};

// Run the script
updateBirdSounds();
