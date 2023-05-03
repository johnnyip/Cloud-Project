const axios = require('axios');

// Define the function to fetch data from the URL
async function fetchData(url) {
    try {
        let response = await axios.get(url);

        response.data.date = new Date()
        console.log(response.data);
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}

// Call the fetchData function every 5 seconds
const urlToFetch = 'https://data.weather.gov.hk/weatherAPI/smart-lamppost/smart-lamppost.php?pi=DF1020&di=04';
setInterval(() => {
    fetchData(urlToFetch);
}, 5000);
