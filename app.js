const habitInput = document.getElementById('habit-input');
const addBtn = document.getElementById('add-btn');
const trackerSection = document.getElementById('tracker-section');

// to store habits 
let habits = [];


addBtn.addEventListener('click', function() {

    let habitName = habitInput.value.trim();

    if (habitName === '') {
        alert('write something ');
        return;
    }

    let newHabit = {
        id: Date.now(),
        name: habitName
    };
// to add habits in array
    habits.push(newHabit);

    // to clean input box
    habitInput.value = '';


// to show habits in screen or updated screen
    renderHabits();
});

//  function to show habits in screen 
 function renderHabits() {
    trackerSection.innerHTML = '';

    if (habits.length === 0) {
        trackerSection.innerHTML = '<p id="empty-msg"> No habit - add habits </p>'
        return;
    }

    // row for each habit 
    habits.forEach(function(habit) {

        let habitRow = document.createElement('div');
        habitRow.className = 'habit-row';

         habitRow.innerHTML = `
      <span class="habit-name">${habit.name}</span>
      <button class="delete-btn" onclick="deleteHabit(${habit.id})">Delete</button>
    `;

    trackerSection.appendChild(habitRow);
    });
}
// function to delete habits
function deleteHabit(id) {
  habits = habits.filter(function(habit) {
    return habit.id !== id;
  });
  renderHabits();
}

// to track week
let currentWeekOffset = 0;

function getWeekDates(offset) {
    let today = new Date();
    let dayOfWeek = today.getDay();

    let monday = new Date(today);
    monday.setDate(today.getDate() - dayOfWeek +1 + (offset * 7));

    let weekDates = [];
    for (let i = 0; i<7; i++) {
        let day = new Date(monday);
        day.setDate(monday.getDate() + i);
        weekDates.push(day);
    }
    return weekDates;
}

function formatDay(date) {
    let days = ['Sun' , 'Mon' , 'Tue' , 'Wed' , 'Thu' , 'Fri' , 'Sat'];
    let dayName = days[date.getDay()];
   let dateNum = date.getDate();
  return dayName + ' ' + dateNum;
}
 // fun to check today date 
function isToday(date) {
  let today = new Date();
  return date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();
}

// Prev button
document.getElementById('prev-btn').addEventListener('click', function() {
  currentWeekOffset--;
  renderHabits();
});

// Next button
document.getElementById('next-btn').addEventListener('click', function() {
  currentWeekOffset++;
  renderHabits();
});

// Today button
document.getElementById('today-btn').addEventListener('click', function() {
  currentWeekOffset = 0;
  renderHabits();
});

// Week label update 
function updateWeekLabel() {
  let dates = getWeekDates(currentWeekOffset);
  let firstDay = dates[0];
  let lastDay = dates[6];
  
  let months = ['Jan','Feb','Mar','Apr','May','Jun',
                 'Jul','Aug','Sep','Oct','Nov','Dec'];

  let label = firstDay.getDate() + ' ' + months[firstDay.getMonth()] 
            + ' - ' + lastDay.getDate() + ' ' + months[lastDay.getMonth()];

  if (currentWeekOffset === 0) {
    label = 'This Week: ' + label;
  } else if (currentWeekOffset === -1) {
    label = 'Last Week: ' + label;
  } else {
    label = label;
  }

  document.getElementById('week-label').textContent = label;
}