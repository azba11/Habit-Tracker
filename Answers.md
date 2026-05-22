

## 1. How to Run

No installation or build step needed — this is plain HTML/CSS/JS.

**To run locally:**
1. Clone the repo:
   git clone https://github.com/azba11/Habit-Tracker
2. Open the project folder
3. Open `index.html` in any browser (Chrome, Firefox, Edge)

**Deployed URL:**
 https://habit-tracker-khaki-ten-87.vercel.app/

## 2. Stack & Design Choices

I chose HTML, CSS, and Vanilla JavaScript because I am most
familiar with these as compared to others 

**Two specific design decisions:**

- **Today's column is highlighted** with a distinct background
color so the user can instantly see where they are in the week
without reading every date label.

- **I picked a table over a list** because a habit tracker
needs two dimensions — habits on one axis and days on the
other. A list can only show habits in a single column with
no way to see weekly progress at a glance. The table lets
the user scan left to right across one habit to see their
whole week, or top to bottom on one day to see all habits
at once. This affects the main tracker section of the app.

## 3. Responsive & Accessibility

On a narrow phone (360px), the table scrolls horizontally
inside its container so no data is cut off or broken. The
add-habit input and buttons stack naturally and remain usable.
On a wide laptop (1440px), the grid has full breathing room
and all columns are visible without scrolling.

**Accessibility I handled:** The habit input field has a clear
placeholder text ("Enter habit name...") so the user knows
exactly what to type. The Add Habit button has visible focus
styling via the browser default so keyboard users can tab to it.

**Accessibility I skipped:** I did not add aria-label attributes
to the checkboxes — a screen reader user would not know which
habit or which day a checkbox belongs to. 


## 4. AI Usage

I used Claude AI and chatgpt as a guide throughout this project:

- **Understanding the assessment:** Asked Claude ang chatgpt to explain
  what the assessment required and break it into steps
- **Concept explanations:** Asked  to explain localStorage,
  streak logic, event listeners, and how Date() works in JS
- **Debugging:** Shared my code when I got errors and asked
   to help find what was wrong

**One specific change I made:** Claude's explanation used
`ariaValueMax` to read the input field value. I changed it
to `.value` because `.value` is the correct property to read
what a user has typed into an input field. `ariaValueMax` is
for accessibility attributes and would return null here.

## 5. Honest Gap

The UI is functional but not very polished visually. The
biggest missing feature is **rename/edit** — if a user makes
a typo in a habit name they have to delete it and re-add it,
losing all their historical checkmark data.

With more time I would add an inline edit button next to
each habit name. Clicking it would turn the habit name into
an editable input field, and pressing Enter would save the
new name while keeping all existing checkmark data intact.