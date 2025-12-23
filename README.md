# NodeJS API Assignment Project
## Overview

This project is an API integration application that fetches and displays information about a random user and their country. It integrates the following APIs:

1. **Random User API** – fetches random user data including name, age, gender, address, and profile picture.
2. **REST Countries API** – fetches information about the user's country, including capital, language, currency, and flag.
3. **Exchange Rate API** – fetches exchange rates for the user's currency against USD and KZT.
4. **News API** – fetches recent news headlines related to the user's country.

All API requests are made **server-side** in `server.js` (the core JS file), and the frontend displays the cleaned and structured data.

## Project Structure
nodejsass2/
├─ public/
│ ├─ index.html # Frontend HTML
│ ├─ script.js # Frontend logic to display data
│ └─ style.css # Styles
├─ server.js # Core server and API logic
├─ package.json # Dependencies and scripts
├─ .env.example # Example environment variables (keys)
└─ README.md # Project documentation

API Usage Details
Random User API
Endpoint: https://randomuser.me/api/
Returns a random user with personal details and location.

REST Countries API
Endpoint: https://restcountries.com/v3.1/name/{countryName}
Returns structured country data (capital, languages, currency, flag).
No API key is required.

Exchange Rate API
Endpoint: https://v6.exchangerate-api.com/v6/{API_KEY}/latest/{currency}
Returns currency conversion rates.
Requires EXCHANGE_API_KEY.

News API
Endpoint: https://newsapi.org/v2/everything?q={country}&language=en&pageSize=5&apiKey={API_KEY}
Returns latest news headlines for the user’s country.
Requires NEWS_API_KEY.

Key Design Decisions
Server-Side API Calls: All API calls are done in server.js, keeping frontend logic clean and secure.
Data Validation & Fallbacks: Optional chaining and default values ensure the app does not crash if some data is missing.
Frontend: Simple and responsive design using cards to display user, country, exchange rates, and news.
Security: API keys are stored in .env and never exposed in frontend code.

