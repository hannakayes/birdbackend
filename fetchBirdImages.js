const axios = require("axios");
const fs = require("fs");

const birds = [
  "Common Pheasant",
  "Eurasian Wren",
  "European Robin",
  // Add more birds as needed
];

const apiKey = "AIzaSyA3j4HGjvabpfMLH5AgHvHJZdX3N8d19pg";
const cx = "0177ce3fae3a7463d";
const results = {};

const searchImage = async (query) => {
  try {
    const response = await axios.get(
      "https://www.googleapis.com/customsearch/v1",
      {
        params: {
          q: query,
          searchType: "image",
          key: apiKey,
          cx: cx,
        },
      }
    );

    const items = response.data.items;
    if (items && items.length > 0) {
      return items[0].link; // Get the first image link from search results
    } else {
      console.log(`No image found for: ${query}`);
      return null;
    }
  } catch (error) {
    console.error(`Error fetching image for ${query}:`, error);
    return null;
  }
};

const main = async () => {
  for (const bird of birds) {
    const imageUrl = await searchImage(bird);
    if (imageUrl) {
      results[bird] = imageUrl;
      console.log(`${bird}: ${imageUrl}`);
    } else {
      results[bird] = "No image found";
    }
  }

  fs.writeFileSync("bird_images.json", JSON.stringify(results, null, 2));
  console.log("Images saved to bird_images.json");
};

main();
