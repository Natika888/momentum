// DOM Elements
const time = document.querySelector('.time'),
  greeting = document.querySelector('.greeting'),
  name = document.querySelector('.name'),
  focus = document.querySelector('.focus');

// Options
const showAmPm = true;

// Show Time
function showTime() {
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();

  // Set AM or PM
  const amPm = hour >= 12 ? 'PM' : 'AM';

  // 12hr Format
  hour = hour % 12 || 12;

  // Output Time
  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(
    sec
  )} ${showAmPm ? amPm : ''}`;

  setTimeout(showTime, 1000);
}

// Add Zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// Set Background and Greeting
function setBgGreet() {
  let today = new Date(),
    hour = today.getHours();

  if  (hour < 6) { 
    //night
    document.body.style.backgroundImage =
      "url('./assets/images/night/01.jpg')";
    greeting.textContent = 'Good Night, ';
    document.body.style.color = 'white';
  } else if (hour < 12) {
    // Morning
    document.body.style.backgroundImage =
      "url('./assets/images/morning/01.jpg')";
    greeting.textContent = 'Good Morning, ';
  } else if (hour < 18) {
    // Afternoon
    document.body.style.backgroundImage =
      "url('./assets/images/day/01.jpg')";
    greeting.textContent = 'Good Afternoon, ';
  } else {
    // Evening
    document.body.style.backgroundImage =
      "url('./assets/images/evening/01.jpg')";
    greeting.textContent = 'Good Evening, ';
    document.body.style.color = 'white';
  }
}

// Get Name
function getName() {
  if (localStorage.getItem('name') === null) {
    name.textContent = '[Enter Name]';
  } else {
    name.textContent = localStorage.getItem('name');
  }
}

// Set Name
function setName(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('name', e.target.innerText);
      name.blur();
    }
  } else {
    localStorage.setItem('name', e.target.innerText);
  }
}

// Get Focus
function getFocus() {
  if (localStorage.getItem('focus') === null) {
    focus.textContent = '[Enter Focus]';
  } else {
    focus.textContent = localStorage.getItem('focus');
  }
}

// Set Focus
function setFocus(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('focus', e.target.innerText);
      focus.blur();
    }
  } else {
    localStorage.setItem('focus', e.target.innerText);
  }
}

// Change bg
let base = './assets/images/night/';
const images = ['01.jpg', '02.jpg', '03.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];
let i = 0;

function viewBgImage(data) {
  const body = document.querySelector('body');
  const src = data;
  const img = document.createElement('img');
  img.src = src;
  img.onload = () => {      
    body.style.backgroundImage = `url(${src})`;
  }; 
}
function getImage() {
  // let base = './assets/images/night/';
  const index = i % images.length;
  // const imageSrc = base + images[index];
  //******************************* */
  let today = new Date(),
    hour = today.getHours();
    // let base;
    if  (hour < 6) {
      base = './assets/images/night/';
    } 
  else if  (hour < 12) {
    base = './assets/images/morning/';
  }
    else if  (hour < 18) {
    base = './assets/images/day/';
  }
    else if  (hour < 24) {
    base = './assets/images/evening/';
  }
  // imageSrc = base + images[index];
  const imageSrc = base + images[index];
  //******************************* */
  viewBgImage(imageSrc);
  i++;
  btn.disabled = true;
  
  setTimeout(function() { btn.disabled = false }, 1000);
} 
const btn = document.querySelector('.btn');
btn.addEventListener('click', getImage);
name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);

//weather 

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');


document.addEventListener('DOMContentLoaded', getWeather);
  city.addEventListener('keypress', setCity);


async function getWeather() {  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=ru&appid=9b2d45b6b864ad5eb9f6dc20afc26c3a&units=metric`;
  const res = await fetch(url);
  const data = await res.json(); 
    
  weatherIcon.className = 'weather-icon owf';
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${data.main.temp}°C`;
  weatherDescription.textContent = data.weather[0].description;
}

function setCity(event) {
  if (event.code === 'Enter') {
    getWeather();
    city.blur();
  }

}



// Run
showTime();
setBgGreet();
getName();
getFocus();
getWeather();