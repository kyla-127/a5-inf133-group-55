// TASKS SECTION
const taskInput = document.getElementById('task-input');
const saveTasksButton = document.getElementById('save-tasks');
const taskOutput = document.getElementById('task-output');
const tasksList = document.createElement('ul'); // container to stack the tasks
tasksList.style.listStyleType = "none";
taskOutput.appendChild(tasksList);

// load saved tasks from localStorage on page load
document.addEventListener('DOMContentLoaded', () => {
  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  savedTasks.forEach(task => addTaskToDOM(task));
});

// save task function
saveTasksButton.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (taskText) {
    addTaskToDOM(taskText);
    saveTaskToLocalStorage(taskText); // Save to localStorage
    taskInput.value = ''; // Clear the input 
  }
});

// saving the task to the localstorage
function saveTaskToLocalStorage(taskText) {
  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  savedTasks.push(taskText);
  localStorage.setItem('tasks', JSON.stringify(savedTasks));
}

// adding tak to DOM
function addTaskToDOM(taskText) {
  const taskItem = document.createElement('li');
  taskItem.textContent = taskText;

  // adding completed button
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Completed';
  deleteButton.style.marginLeft = '10px';
  deleteButton.addEventListener('click', () => {
    deleteTask(taskText, taskItem);
  });

  taskItem.appendChild(deleteButton);
  tasksList.appendChild(taskItem);
}

//delete task funciton, but still does not work
function deleteTask(taskText, taskItem) {
  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const updatedTasks = savedTasks.filter(task => task !== taskText);
  localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  tasksList.removeChild(taskItem);
}

// NOTES SECTION
const notesArea = document.getElementById('notes-area');
const saveNotesButton = document.getElementById('save-notes');

// save note function
saveNotesButton.addEventListener('click', () => {
  const noteText = notesArea.value.trim();
  localStorage.setItem('note', noteText);
  alert('Note saved!'); // pop up that the note has been saved
});

// Load the single saved note on page load
document.addEventListener('DOMContentLoaded', () => {
  const savedNote = localStorage.getItem('note');
  if (savedNote) {
    notesArea.value = savedNote;
  }
});

// this function is to display the clock and weather api
const clockDisplay = document.getElementById('clock-display');

function updateClock() {
  const now = new Date();

  const date = now.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const time = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  clockDisplay.textContent = `${date}, ${time}`;
}

setInterval(updateClock, 1000);
updateClock();


const weatherDisplay = document.getElementById('weather-display');
const apiKey = "891528aca01aedf1f09469fd71f6109a"; 

async function fetchWeather() {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Irvine,US&appid=${apiKey}&units=metric`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
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
    `;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    weatherDisplay.innerHTML = `<p>Failed to fetch weather data: ${error.message}</p>`;
  }
}


fetchWeather();

// this segment is used to call the random dog image generator api
const fetchDogButton = document.getElementById('fetch-dog');
const dogImage = document.getElementById('dog-image');

fetchDogButton.addEventListener('click', async () => {
  try {
    const response = await fetch('https://dog.ceo/api/breeds/image/random');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    dogImage.src = data.message;
    dogImage.style.display = 'block';
  } catch (error) {
    console.error('Error fetching dog image:', error);
    alert('Failed to fetch a dog image. Please try again later.');
  }
});
