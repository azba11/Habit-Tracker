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