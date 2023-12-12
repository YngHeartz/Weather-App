function getWeather() {
    const apiKey = '31599c86c9bbaf0199c446af849f68fc';
    const city = document.getElementById('city').value;

    if (!city) {
        alert('Please enter a city');
        return;
    }

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;

    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching current weather data:', error);
            alert('Error fetching current weather data. Please try again.');
        });

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            displayHourlyForecast(data.list);
        });

    function displayWeather(data) {
        const weatherInfoDiv = document.getElementById('weather-info');
        const tempDivInfo = document.getElementById('temp-div');
        const weatherIcon = document.getElementById('weather-icon');

        if (data.cod === '404') {
            weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
        } else {
            const cityName = data.name;
            const temperature = Math.round(data.main.temp);
            const description = data.weather[0].description;
            const iconCode = data.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

            const temperatureHTML = `<p>${temperature}&deg;F</p>`;
            const weatherHTML = `<p>${cityName}</p> <p>${description}</p>`;

            weatherInfoDiv.innerHTML = weatherHTML;
            tempDivInfo.innerHTML = temperatureHTML;
            weatherIcon.src = iconUrl;
        }
    }

    function displayHourlyForecast(hourlyData) {
        const hourlyForecastDiv = document.getElementById('hourly-forecast');
        const next24Hours = hourlyData.slice(0, 8);
    
        next24Hours.forEach(item => {
            const dateTime = new Date(item.dt * 1000);
            
            // Convert hours to 12-hour format
            const hour = dateTime.getHours() % 12 || 12;
    
            // Determine whether it's AM or PM
            const ampm = dateTime.getHours() >= 12 ? 'PM' : 'AM';
    
            const temperature = Math.round(item.main.temp);
            const iconCode = item.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
    
            const hourlyItemHtml = `
                <div class="hourly-item">
                    <span>${hour}:00 ${ampm}</span>
                    <img src="${iconUrl}" alt="Hourly Weather Icon">
                    <span>${temperature}&deg;F</span>
                </div>`;
            hourlyForecastDiv.innerHTML += hourlyItemHtml;
        });
    
        // Enable scrolling for the hourly forecast
        hourlyForecastDiv.style.overflowX = 'auto';
        hourlyForecastDiv.style.whiteSpace = 'nowrap';
    }
    

    function showImage() {
        const weatherIcon = document.getElementById('weather-icon');
        weatherIcon.style.display = 'block';
    }
}
function updateCityList() {
    const cityInput = document.getElementById('city');
    const datalist = document.getElementById('citiesList');

    // Clear existing options
    datalist.innerHTML = '';

    // Get the value entered by the user
    const inputText = cityInput.value.trim().toLowerCase();

    if (!inputText) {
        return;
    }

    // Use a set to store unique suggestions
    const uniqueCities = new Set();

    // You can fetch the list of cities from an API or use a predefined array
    // For example, using a predefined array for demonstration purposes
    const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Miami', 'San Francisco'];

    // Filter cities based on the user input
    const filteredCities = cities.filter(city => city.toLowerCase().includes(inputText));

    // Add the filtered cities to the datalist
    filteredCities.forEach(city => {
        const option = document.createElement('option');
        option.value = city;
        datalist.appendChild(option);
    });
}
    let availableKeyWords = [
        'United States', 'New York',
        'Los Angeles',
        'Chicago',
        'Houston',
        'Miami',
        'San Francisco',
        'United Kingdom', 'London',
        'Manchester',
        'Paris',
        'France', 'Marseille',
        'Berlin',
        'Germany', 'Munich',
        'Rome',
        'Italy', 'Milan',
        'Madrid',
        'Spain', 'Barcelona',
        'Toronto',
        'Canada', 'Vancouver',
        'Sydney',
        'Australia', 'Melbourne',
        'Tokyo',
        'Japan', 'Osaka',
        'Beijing',
        'China', 'Shanghai',
        'New Delhi',
        'India', 'Mumbai',
        'Sao Paulo',
        'Brazil', 'Rio de Janeiro',
        'Johannesburg',
        'South Africa', 'Cape Town',
        'Moscow',
        'Russia', 'Saint Petersburg',
        'Seoul',
        'South Korea', 'Busan',
        'Mexico City',
        'Mexico', 'Guadalajara',
        'Buenos Aires',
        'Argentina', 'Cordoba',
        'Zurich',
        'Switzerland', 'Geneva',
        'Sweden', 'Stockholm',
        'Gothenburg',
        'Netherlands', 'Amsterdam',
        'Rotterdam',
        'Norway', 'Oslo',
        'Bergen',
        'Copenhagen',
        'Denmark', 'Aarhus',
        'Helsinki',
        'Finland', 'Tampere',
        'Singapore', 'Singapore City',
        'Malaysia', 'Kuala Lumpur',
        'Thailand', 'Bangkok',
        'Thailand', 'Chiang Mai',
        'Vietnam', 'Hanoi',
        'Ho Chi Minh City',
]
const resultBox = document.querySelector(".result-box");
const inputBox = document.getElementById("city");

inputBox.onkeyup = function name(params) {
    let result = [];
    let input = inputBox.value;
    if (input.length) {
        result = availableKeyWords.filter((keyword => {
            return keyword.toLocaleLowerCase().includes(input.toLocaleLowerCase());
        }));
        console.log(result);
    }
    display(result);
}

function display(result) {
    const content = result.map((list)=>{
        return "<li onclick=selectInput(this)>" + list + "</li>";
    });
    resultBox.innerHTML = "<ul>" + content.join('') + "</ul>";
}
function selectInput(list) {
    inputBox.value = list.innerHTML;
    resultBox.innerHTML = '';
}