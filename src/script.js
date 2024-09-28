const apiKey = 'QCStfBADCgUfROJuwwK6ZG3GIMWuxnyg'; // Ensure this is correct
let carouselIndex = 0;
let carouselImages = [];

// Burger menu toggle functionality
const burger = document.getElementById('burger');
const navLinks = document.getElementById('nav-links');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('show');
});

// Function to fetch news from the New York Times API (Home Section)
function fetchNews() {
    const url = `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${apiKey}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const newsGrid = document.getElementById('news-grid');
            const carousel = document.getElementById('carousel');
            newsGrid.innerHTML = ''; // Clear previous news
            carousel.innerHTML = ''; // Clear previous carousel images
            carouselImages = []; // Reset carousel images

            data.results.forEach((news, index) => {
                // Create news card
                const newsCard = document.createElement('div');
                newsCard.className = 'news-card';
                newsCard.innerHTML = `
                    <a href="${news.url}" target="_blank">
                        <img src="${news.multimedia.length > 0 ? news.multimedia[0].url : 'placeholder-image-url.jpg'}" alt="${news.title}">
                    </a>
                    <h3>${news.title}</h3>
                    <p>${news.abstract}</p>
                `;
                newsGrid.appendChild(newsCard);

                // Add to carousel images, limit to 5
                if (index < 5) {
                    carouselImages.push(news.multimedia[0]?.url || 'placeholder-image-url.jpg');
                }
            });

            startCarousel(); // Start carousel after loading images
        })
        .catch(error => console.error('Error fetching news:', error));
}

// Function to start the carousel
function startCarousel() {
    const carousel = document.getElementById('carousel');
    carouselImages.forEach((image, index) => {
        const img = document.createElement('img');
        img.src = image;
        img.style.display = index === 0 ? 'block' : 'none'; // Show the first image
        carousel.appendChild(img);
    });

    setInterval(() => {
        carousel.children[carouselIndex].style.display = 'none'; // Hide current image
        carouselIndex = (carouselIndex + 1) % carouselImages.length; // Update index
        carousel.children[carouselIndex].style.display = 'block'; // Show next image
    }, 2000); // Change every 2 seconds
}

// Fetch news on page load
document.addEventListener('DOMContentLoaded', () => {
    fetchNews();

    // Set up event listeners for navigation links
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const section = event.target.getAttribute('data-section');
            fetchTopStoriesBySection(section); // Fetch stories for the selected section
        });
    });
});

// Function to fetch top stories by section
function fetchTopStoriesBySection(section) {
    const url = `https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const newsGrid = document.getElementById('news-grid');
            newsGrid.innerHTML = ''; // Clear previous news

            data.results.forEach(news => {
                // Create news card
                const newsCard = document.createElement('div');
                newsCard.className = 'news-card';
                newsCard.innerHTML = `
                    <a href="${news.url}" target="_blank">
                        <img src="${news.multimedia.length > 0 ? news.multimedia[0].url : 'placeholder-image-url.jpg'}" alt="${news.title}">
                    </a>
                    <h3>${news.title}</h3>
                    <p>${news.abstract}</p>
                `;
                newsGrid.appendChild(newsCard);
            });
        })
        .catch(error => console.error('Error fetching section news:', error));
}

// Fetch opinion articles for the sidebar
function fetchOpinion() {
    const url = `https://api.nytimes.com/svc/topstories/v2/opinion.json?api-key=${apiKey}`; // Use opinion section

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const opinionSidebar = document.getElementById('opinion-sidebar');
            opinionSidebar.innerHTML = `<h2>Opinion</h2>`; // Add title
            data.results.forEach(opinion => {
                const opinionItem = document.createElement('div');
                opinionItem.className = 'opinion-item';
                opinionItem.innerHTML = `
                    <h3>${opinion.title}</h3>
                    <p>${opinion.abstract}</p>
                `;
                opinionSidebar.appendChild(opinionItem);
            });
        })
        .catch(error => console.error('Error fetching opinion articles:', error));
}

// Call fetchOpinion on page load
document.addEventListener('DOMContentLoaded', fetchOpinion);
