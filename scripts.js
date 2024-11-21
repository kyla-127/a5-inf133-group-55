// Task Manager
const taskInput = document.getElementById('task-input');
const taskOutput = document.getElementById('task-output');
const saveTasksButton = document.getElementById('save-tasks');

// Save and Load Tasks
saveTasksButton.addEventListener('click', () => {
  localStorage.setItem('tasks', taskInput.value);
  taskOutput.textContent = taskInput.value;
});

taskOutput.textContent = localStorage.getItem('tasks') || '';

// Notes Section
const notesArea = document.getElementById('notes-area');
const saveNotesButton = document.getElementById('save-notes');

saveNotesButton.addEventListener('click', () => {
  localStorage.setItem('notes', notesArea.value);
  alert('Notes saved!');
});

notesArea.value = localStorage.getItem('notes') || '';

// Clock Section
const clockDisplay = document.getElementById('clock-display');

function updateClock() {
  const now = new Date();

  // Format the date
  const date = now.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Format the time
  const time = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  // Combine date and time
  clockDisplay.textContent = `${date}, ${time}`;
}

setInterval(updateClock, 1000);
updateClock();

// Weather Section
const weatherDisplay = document.getElementById('weather-display');
const getWeatherButton = document.getElementById('get-weather-button');

const apiKey = a88b28ccf510cea22d2d66650451d6 // Replace with your OpenWeatherMap API key

// Function to fetch weather data for Irvine, California
async function fetchWeather() {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Irvine,US&appid=${apiKey}&units=metric`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }

    const data = await response.json();
    
    const temperature = data.main.temp;
    const weatherDescription = data.weather[0].description;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;

    weatherDisplay.innerHTML = `
      <h3>Weather in Irvine, CA</h3>
      <p>Temperature: ${temperature}°C</p>
      <p>Description: ${weatherDescription}</p>
      <p>Humidity: ${humidity}%</p>
      <p>Wind Speed: ${windSpeed} m/s</p>
    `;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    weatherDisplay.innerHTML = 'Failed to fetch weather data. Try again.';
  }
}

getWeatherButton.addEventListener('click', fetchWeather);
