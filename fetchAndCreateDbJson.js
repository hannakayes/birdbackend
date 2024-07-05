const axios = require("axios");
const fs = require("fs");
const cheerio = require("cheerio");

const AVIBASE_URL = "https://avibase.bsc-eoc.org";
const AVIBASE_CHECKLIST_URL =
  "https://avibase.bsc-eoc.org/checklist.jsp?region=EUR";

axios
  .get(AVIBASE_CHECKLIST_URL)
  .then((response) => {
    const html = response.data;
    const birdList = [];

    const $ = cheerio.load(html);
    const birdRows = $("table tbody tr");

    // Helper function to fetch bird profile data
    const fetchBirdProfile = async (url) => {
      try {
        const profileResponse = await axios.get(url);
        const profileHtml = profileResponse.data;
        const $profile = cheerio.load(profileHtml);

        // Extract additional details
        const englishName = $profile(".speciesBar h1").text().trim();
        const latinName = $profile(".speciesBar i").text().trim();
        const order = $profile(".speciesBar .genus").text().trim();
        const family = $profile(".speciesBar .family").text().trim();
        const description = $profile(".descriptionBox").text().trim();
        const habitat = $profile(".habitatBox").text().trim();
        const image = AVIBASE_URL + $profile(".imagesBox img").attr("src");
        const sound =
          AVIBASE_URL + $profile(".soundsBox audio source").attr("src");

        return {
          englishName,
          latinName,
          order,
          family,
          description,
          habitat,
          image,
          sound,
        };
      } catch (error) {
        console.error("Error fetching profile data:", error);
        return null;
      }
    };

    // Process each bird row in the checklist
    birdRows.each(async (index, element) => {
      const $element = $(element);
      const profileUrl = $element.find("a").attr("href");

      // Fetch profile data for each bird
      const birdProfile = await fetchBirdProfile(AVIBASE_URL + profileUrl);

      if (birdProfile) {
        const id = index + 1;
        const scientificName = $element.find("td:nth-child(2)").text().trim();
        const commonName = $element.find("td:nth-child(3)").text().trim();

        // Construct bird object with all details
        const birdData = {
          id,
          scientificName,
          commonName,
          ...birdProfile,
        };

        birdList.push(birdData);

        // Write to db.json after fetching all bird profiles
        if (birdList.length === birdRows.length) {
          const dbJson = JSON.stringify({ birds: birdList }, null, 2);
          fs.writeFile("db.json", dbJson, (err) => {
            if (err) throw err;
            console.log(
              "db.json file has been updated with bird profile data."
            );
          });
        }
      }
    });
  })
  .catch((error) => {
    console.error("Error fetching checklist data:", error);
  });
