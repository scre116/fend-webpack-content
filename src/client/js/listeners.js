document.getElementById('results').addEventListener('change', updateWeather);

function updateWeather() {
    console.log('updateWeather');
    fetch('http://localhost:8080/weather')
        .then(res => res.json())
        .then(function (res) {
            console.log(res);
            document.getElementById('weather').innerHTML = res.weather[0].description;
        })
}

// Select the element to observe
const targetElement = document.getElementById('results');

// Create a MutationObserver instance and provide a callback function
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        console.log('results has changed. Update weather');
        updateWeather();
    });
});

// Specify the configuration options for the observer
const config = { attributes: false, childList: true, subtree: false };

// Start observing the target element
observer.observe(targetElement, config);