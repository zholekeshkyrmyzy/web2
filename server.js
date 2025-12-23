const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = 3000;

app.use(express.static("public"));

app.get("/user", async (req, res) => {
  try {

    // RANDOM USER API
    const userResponse = await axios.get("https://randomuser.me/api/");
    const user = userResponse.data.results[0];

    const userData = {
      firstName: user.name.first,
      lastName: user.name.last,
      gender: user.gender,
      age: user.dob.age,
      dob: user.dob.date.split("T")[0],
      photo: user.picture.large,
      city: user.location.city,
      country: user.location.country,
      address: `${user.location.street.name} ${user.location.street.number}`
    };


    // REST COUNTRIES API
    let countryData = {};
    try {
      const countryResponse = await axios.get(
        `https://restcountries.com/v3.1/name/${encodeURIComponent(userData.country)}`
      );
      const country = countryResponse.data[0];

      countryData = {
        name: country.name.common || "N/A",
        capital: country.capital ? country.capital[0] : "N/A",
        language: country.languages
          ? Object.values(country.languages).join(", ")
          : "N/A",
        currency: country.currencies
          ? Object.keys(country.currencies)[0]
          : "N/A",
        flag: country.flags?.png || ""
      };
    } catch (err) {
      console.warn("Country API error:", err.message);
      countryData = {
        name: userData.country,
        capital: "N/A",
        language: "N/A",
        currency: "N/A",
        flag: ""
      };
    }

    // EXCHANGE RATE API
    let exchangeData = { usd: "N/A", kzt: "N/A" };
    if (countryData.currency && countryData.currency !== "N/A") {
      try {
        const exchangeResponse = await axios.get(
          `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_API_KEY}/latest/${countryData.currency}`
        );
        const rates = exchangeResponse.data.conversion_rates;
        exchangeData = {
          usd: rates.USD.toFixed(2),
          kzt: rates.KZT.toFixed(2)
        };
      } catch (err) {
        console.warn("Exchange API error:", err.message);
      }
    }

    // NEWS API
    let newsData = [];
    try {
      const newsResponse = await axios.get(
        `https://newsapi.org/v2/everything?q=${encodeURIComponent(userData.country)}&language=en&pageSize=5&apiKey=${process.env.NEWS_API_KEY}`
      );
      newsData = newsResponse.data.articles.map(article => ({
        title: article.title,
        description: article.description || "",
        image: article.urlToImage || "",
        url: article.url
      }));

    } catch (err) {
      console.warn("News API error:", err.message);
    }

    // SEND RESPONSE
    res.json({
      user: userData,
      country: countryData,
      exchange: exchangeData,
      news: newsData
    });

  } catch (error) {
    console.error("Server error:", error.message);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
