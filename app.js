const habitInput = document.getElementById('habit-input');
const addBtn = document.getElementById('add-btn');
const trackerSection = document.getElementById('tracker-section');


// load habits fromLocalStorage 
function loadHabits() {
  let saved = localStorage.getItem('habits');
  if (saved) {
    habits = JSON.parse(saved);
  }
}

// save in LocalStorage 
function saveHabits() {
  localStorage.setItem('habits', JSON.stringify(habits));
}

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
    saveHabits();
    renderHabits();
});

//  function to show habits in screen 
 function renderHabits() {
    trackerSection.innerHTML = '';
     updateWeekLabel();

    if (habits.length === 0) {
        trackerSection.innerHTML = '<p id="empty-msg"> No habit yet - add one above </p>'
        return;
    }

    // Table 
  let table = document.createElement('table');
  table.id = 'habit-table';

  // Header row  — name of days
  let headerRow = document.createElement('tr');
  let weekDates = getWeekDates(currentWeekOffset);

  
  headerRow.innerHTML = '<th>Habit</th>';

  // add 7 days in header
  weekDates.forEach(function(date) {
    let th = document.createElement('th');
    th.textContent = formatDay(date);

    //  highlight today column 
    if (isToday(date)) {
      th.className = 'today-col';
    }
    headerRow.appendChild(th);
  });

   // Streak header
  headerRow.innerHTML += '<th>Streak</th><th>Actions</th>';
  table.appendChild(headerRow);

  
  habits.forEach(function(habit) {
    let row = document.createElement('tr');

    // Habit  name
    let nameCell = document.createElement('td');
    nameCell.textContent = habit.name;
    nameCell.className = 'habit-name-cell';
    row.appendChild(nameCell);

    // checkboxes for 7 days
    weekDates.forEach(function(date) {
      let td = document.createElement('td');
      if (isToday(date)) {
        td.className = 'today-col';
      }

      let checkbox = document.createElement('input');
      checkbox.type = 'checkbox';

      // Date check boxes — eg "2024-5-21"
      let dateKey = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();

      // if tick then show checked
      if (habit.checks && habit.checks[dateKey]) {
        checkbox.checked = true;
      }

      // save Checkbox on tick 
      checkbox.addEventListener('change', function() {
        if (!habit.checks) habit.checks = {};
        habit.checks[dateKey] = checkbox.checked;
        updateStreak(habit);
         saveHabits();
        renderHabits();
      });

      td.appendChild(checkbox);
      row.appendChild(td);
    });

    // Streak cell
    let streakCell = document.createElement('td');
    streakCell.textContent = ' ' + (habit.streak || 0);
    streakCell.className = 'streak-cell';
    row.appendChild(streakCell);

    // Delete button
    let actionCell = document.createElement('td');
    actionCell.innerHTML = `<button class="delete-btn" onclick="deleteHabit(${habit.id})">Delete</button>`;
    row.appendChild(actionCell);

    table.appendChild(row);
  });

  trackerSection.appendChild(table);
}
    

// function to delete habits
function deleteHabit(id) {
  habits = habits.filter(function(habit) {
    return habit.id !== id;
  });
   saveHabits();
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


// streak function 
function updateStreak(habit) {
  let streak = 0;
  let today = new Date();

  // 
  for (let i = 0; i < 365; i++) {
    let date = new Date(today);
    date.setDate(today.getDate() - i);
    let dateKey = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();

    if (habit.checks && habit.checks[dateKey]) {
      streak++;
    } else {
      break; 
    }
  }

  habit.streak = streak;
}


loadHabits();
renderHabits();