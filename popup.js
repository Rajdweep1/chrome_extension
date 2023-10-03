const QUOTE_STORAGE_KEY = 'motivational_quote';
const FETCH_INTERVAL = 24 * 60 * 60 * 1000; // in milliseconds

const quoteElement = document.getElementById('quote');

const apiKey = "7+9w4lPnj7aeSVCzV79L+w==EdLbvu4fdyzeXmql";

const options = {
  method: "GET",
  headers: {
    "X-Api-Key": apiKey,
  },
  
};

const apiURL = "https://api.api-ninjas.com/v1/quotes?limit=1";

async function getNewQuote() {
    try {
        const response = await fetch(apiURL, options);
        const data = await response.json();
        // Update the quote element with the new quote
        quoteElement.innerText = data[0].quote;
        // Save the new quote and current time in localStorage
        localStorage.setItem(QUOTE_STORAGE_KEY, data[0].quote);
        localStorage.setItem('lastFetchedTime', Date.now());
    } catch (error) {
        quoteElement.innerText = "An error happened, try again later";
        console.error(error);
    }
}

function fetchQuote() {
    const lastFetchedTime = localStorage.getItem('lastFetchedTime');
    const currentTime = Date.now();

    // Check if the quote was fetched within the last 5 hours
    if (!lastFetchedTime || currentTime - lastFetchedTime > FETCH_INTERVAL) {
        // Fetch a new quote if it's been more than 5 hours
        getNewQuote();
    } else {
        // Use the previously fetched quote from localStorage
        const storedQuote = localStorage.getItem(QUOTE_STORAGE_KEY);
        if (storedQuote) {
            quoteElement.innerText = storedQuote;
        } else {
            // Handle the case when there's no stored quote (optional)
            quoteElement.innerText = "No quote available. Click to fetch.";
        }
    }
}
// Call fetchQuote when the popup is opened
fetchQuote();