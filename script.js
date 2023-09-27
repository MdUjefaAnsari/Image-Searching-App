// Set your Unsplash API access key
const accessKey = "qrLUDMFR8zhNfV2coVTf0tbAsjC7OHmYC5l13MHz47I"

// Get references to HTML elements
const formElement = document.querySelector("form"); // Get the <form> element
const inputElement = document.getElementById("search-input"); // Get the input element
const searchResults = document.querySelector(".search-results"); // Get the element with class "search-results"
const showMore = document.getElementById("show-more-button"); // Get the "Show More" button

// Initialize variables
let inputData = ""; // To store the user's input
let page = 1; // To keep track of the current page

// Function to search for images
async function searchImages() {
    // Get the user's input from the input field
    inputData = inputElement.value;

    // Construct the URL to fetch images from Unsplash
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}` 

    // Fetch data from the Unsplash API
    const response = await fetch(url);
    const data = await response.json();
    const results = data.results;

    // Clear the search results if it's the first page
    if (page === 1) {
        searchResults.innerHTML = "";
    }

    // Loop through the search results and display them
    results.forEach((result) => {
        // Create elements to display each image
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add("search-result");
        const image = document.createElement("img");
        image.src = result.urls.small; // Set the image source
        image.alt = result.alt_description; // Set the image alt text
        const imageLink = document.createElement('a');
        imageLink.href = result.links.html; // Set the link to the image's page
        imageLink.target = "_blank"; // Open the link in a new tab
        imageLink.textContent = result.alt_description; // Set link text

        // Append the image and link to the search results
        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);
    });


    // Increment the page number
    page++;

    // Show the "Show More" button when there are more pages
    if (page > 1) {
        showMore.style.display = "block";
    }
}


// Add an event listener to the form for when it's submitted

formElement.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent the form from submitting
    page = 1; // Reset the page number to 1
    searchImages(); // Perform a new image search
});


// Add an event listener to the "Show More" button
showMore.addEventListener("click", () => {
    searchImages(); // Perform another image search when the button is clicked
})


// -----------------Scroll button-------------------
// Select the element with class "to-top"
const toTop = document.querySelector(".scrollButton");

// Add a scroll event listener
window.addEventListener("scroll", () => {
  // Check if the user has scrolled more than 100 pixels
  if (window.pageYOffset > 200) {
    // If scrolled more than 100 pixels, add the "active" class
    toTop.classList.add("active");
  } else {
    // If scrolled 100 pixels or less, remove the "active" class
    toTop.classList.remove("active");
  }
});
