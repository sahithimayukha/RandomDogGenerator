document.addEventListener('DOMContentLoaded', function () {
    const breedsDropdown = document.getElementById('breeds');
    const searchBtn = document.getElementById('searchBtn');
    const surpriseBtn = document.getElementById('surpriseBtn');
    const dogImagesContainer = document.getElementById('dogImages');
    const paginationContainer = document.getElementById('pagination');
  let currentPage = 1;

    fetch('https://dog.ceo/api/breeds/list/all')
        .then(response => response.json())
        .then(data => {
            const breeds = Object.keys(data.message);
            populateBreedsDropdown(breeds);
        })
        .catch(error => console.error('Error fetching dog breeds:', error));

    function populateBreedsDropdown(breeds) {
        breeds.forEach(breed => {
            const option = document.createElement('option');
            option.value = breed;
            option.textContent = breed;
            breedsDropdown.appendChild(option);
        });
    }

    searchBtn.addEventListener('click', function () {
        const selectedBreed = breedsDropdown.value;
        fetchAndDisplayDogImage(selectedBreed);
    });

    surpriseBtn.addEventListener('click', function () {
        fetchAndDisplayRandomDogImages();
    });

    function fetchAndDisplayRandomDogImages() {
        fetch('https://dog.ceo/api/breeds/image/random')
            .then(response => response.json())
            .then(data => {
                const dogImage = document.createElement('img');
                dogImage.src = data.message;
                dogImagesContainer.innerHTML = '';
                dogImagesContainer.appendChild(dogImage);
            })
            .catch(error => console.error('Error fetching dog image:', error));
    }

    function fetchAndDisplayDogImage(breed) {
        fetch(`https://dog.ceo/api/breed/${breed}/images?page=${currentPage}&limit=5`)        
            .then(response => response.json())
            .then(data => {
                const dogImages = data.message.map(imageUrl => {
                    const img = document.createElement('img');
                    img.src = imageUrl;
                    return img;
                });

                dogImagesContainer.innerHTML = '';
                dogImages.forEach(img => dogImagesContainer.appendChild(img));
                displayPagination([data.message]);
                showPagination();
            })
            .catch(error => console.error('Error fetching random dog images:', error));
    }

    function displayPagination(images) {
        paginationContainer.innerHTML = '';
    
        const totalPages = Math.ceil(images.length / 6);
    
        for (let i = 1; i <= totalPages; i++) {
          const button = document.createElement('button');
          button.textContent = i;
          button.onclick = () => {
            currentPage = i;
            fetchAndDisplayDogImage(breedsDropdown.value);
          };
          paginationContainer.appendChild(button);
        }
      }
    
      function showPagination() {
        paginationContainer.style.display = 'block';
      }
});