# Budget Tracker — Project Requirements (Live Document)
> Vanilla HTML, CSS, and JavaScript only. No frameworks, no libraries, no build tools.

---

## Completion Criteria
A requirement is **fulfilled** when it works correctly in the browser without errors in the console, is visually coherent, and persists correctly (where applicable).

---

## R1 — Project Structure
- [x] Project lives in a folder with at least three separate files: `index.html`, `style.css`, `app.js`
- [x] `style.css` is linked via `<link>` in the `<head>`
- [x] `app.js` is loaded via `<script defer src="app.js">` at the end of `<head>` or before `</body>`
- [x] No inline styles or inline `<script>` tags in the HTML file

---

## R2 — Add a Transaction
- [ ] A form exists with the following fields:
  - [x] Description (text input, required)
  - [ ] Amount (number input, required, must reject 0 or negative values)
  - [ ] Type (select or radio: **Income** or **Expense**)
  - [x] Category (select with at least 5 options, e.g. Food, Rent, Salary, Entertainment, Other)
  - [ ] Date (date input, defaults to today)
- [ ] Submitting the form adds the transaction to the list without reloading the page (prevent default)
- [ ] The form clears itself after a successful submission
- [ ] Invalid submissions show a visible inline error message (no `alert()` calls)

---

## R3 — Transaction List
- [ ] All transactions are rendered in a list/table showing: description, category, date, and amount
- [ ] Income amounts are displayed in **green**, expense amounts in **red**
- [ ] Each transaction has a **Delete** button that removes it from the list immediately
- [ ] If there are no transactions, a friendly empty-state message is shown (e.g. "No transactions yet. Add one above.")
- [ ] The list is sorted by date, most recent first

---

## R4 — Summary Dashboard
- [ ] Displays three summary cards at the top of the page:
  - **Total Balance** (income − expenses)
  - **Total Income**
  - **Total Expenses**
- [ ] All three values update in real time whenever a transaction is added or deleted
- [ ] Balance card changes color: green when positive, red when negative, neutral when zero

---

## R5 — Filtering & Search
- [ ] A text search input filters the transaction list by description in real time (on every keystroke)
- [ ] A category dropdown filters the list to show only transactions of that category
- [ ] A type filter (All / Income / Expense) is available
- [ ] All three filters can work simultaneously (they are AND-combined)
- [ ] Clearing all filters restores the full list

---

## R6 — Persistence with localStorage
- [ ] Transactions are saved to `localStorage` on every add and delete
- [ ] On page load, any previously saved transactions are read from `localStorage` and rendered
- [ ] Refreshing the page does not lose any data
- [ ] Clearing localStorage (or a "Reset All Data" button) wipes the list

---

## R7 — Data Visualization (Canvas Chart)
- [ ] A bar chart or pie chart is drawn using the **Canvas API** (no chart libraries)
- [ ] The chart displays spending broken down by category
- [ ] The chart updates whenever transactions change
- [ ] Chart has labeled axes or a legend

---

## R8 — UI & Styling
- [ ] Layout is built using **CSS Flexbox or Grid** (no CSS frameworks like Bootstrap)
- [ ] The app is **responsive**: usable on both a 375px mobile viewport and a 1280px desktop viewport
- [ ] A **dark/light mode toggle** exists and the preference is saved to `localStorage`
- [ ] CSS custom properties (`--variables`) are used for the color palette (minimum: background, surface, text, accent, danger, success)
- [ ] Transitions or animations are used tastefully in at least two places (e.g. form appearing, card value updating)

---

## R9 — Code Quality
- [ ] JavaScript uses `const` and `let` only — no `var`
- [ ] All DOM manipulation goes through a dedicated `render()` function that re-draws the list and summary from a single source-of-truth array
- [ ] No direct DOM manipulation is scattered across unrelated functions
- [ ] At least one reusable utility function exists (e.g. `formatCurrency(amount)`, `formatDate(dateStr)`)
- [ ] Code is free of `console.log` statements in the final version

---

## Stretch Goals *(optional but encouraged)*
- [ ] Export transactions to a `.csv` file using the Blob API
- [ ] Add an **Edit** button that repopulates the form with a transaction's data for in-place editing
- [ ] Animate the summary card numbers counting up when they change
- [ ] Add a monthly view: a dropdown to filter by month/year
- [ ] Add keyboard accessibility: form submits on Enter, delete confirms on a custom modal (not `window.confirm`)