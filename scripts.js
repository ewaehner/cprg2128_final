const url = `https://api.thecatapi.com/v1/breeds`;
//const api_key = "__API_KEY__";
const api_key = "live_toKCmM3tpOhqSozSqx9jYF6C6OxCN311fzOP4YwHEYgIBiRHkaCeFgQZ70SAh0Ux";
let catBreeds = [];

async function fetchCatBreeds() {
  try {
    const response = await fetch(url, {
      headers: { "x-api-key": api_key },
    });
    let data = await response.json();

    // Filter out breeds without images
    data = data.filter((breed) => breed.image?.url);
    console.log("Fetched Breeds:", data); // Debugging line

    // Store breed data
    catBreeds = data;

    // Populate the dropdown with breeds
    populateBreedSelector(catBreeds);

    // Show images for the first breed by default
    fetchAndShowBreedImages(0);
  } catch (error) {
    console.error("Error fetching cat breeds:", error);
  }
}

function populateBreedSelector(breeds) {
  const selector = document.getElementById("breed_selector");
  breeds.forEach((breed, index) => {
    let option = document.createElement("option");
    option.value = index;
    option.innerHTML = breed.name;
    selector.appendChild(option);
  });

  // Debug: Check if options were correctly added
  console.log("Dropdown options:", selector.innerHTML);

  selector.addEventListener("change", function () {
    fetchAndShowBreedImages(this.value);
  });
}

async function fetchAndShowBreedImages(index) {
  const breedId = catBreeds[index].id;
  const imageUrl = `https://api.thecatapi.com/v1/images/search?breed_id=${breedId}&limit=3`; // Fetch 3 images for the breed

  try {
    const response = await fetch(imageUrl, {
      headers: { "x-api-key": api_key },
    });
    const images = await response.json();
    console.log("Fetched Images:", images); // Debugging line

    displayImages(images);
  } catch (error) {
    console.error("Error fetching breed images:", error);
  }
}

function displayImages(images) {
  const container = document.getElementById("image_container");
  container.innerHTML = ""; // Clear any previous images

  images.forEach((image) => {
    let imgElement = document.createElement("img");
    imgElement.src = image.url;
    imgElement.alt = "Cat image";
    imgElement.style.width = "200px"; // You can adjust the size as needed
    imgElement.style.margin = "10px";
    container.appendChild(imgElement);
  });

  // Debug: Check if images were correctly added
  console.log("Image Container:", container.innerHTML);
}

// Initialize the app
fetchCatBreeds();
