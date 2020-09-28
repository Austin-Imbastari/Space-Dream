// loacl storage is a database that is local to the browser. Which means it is available across the pages.
var mission = window.localStorage.getItem('mission');
document.getElementById('mission-brief').innerText = mission;
