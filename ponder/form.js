const form = document.querySelector("#fsyForm");
const travelRange = document.querySelector("#travelRange");
const notesContainer = document.querySelector("#notesContainer");
const notes = document.querySelector("#notes");
const output = document.querySelector("#output");
const campusBoxes = document.querySelectorAll('input[name="campus"]');

function updateNotesField() {
  const needsNotes = travelRange.value === "many";

  notesContainer.hidden = !needsNotes;
  notes.required = needsNotes;

  if (!needsNotes) {
    notes.value = "";
  }
}

function isPastDate(value) {
  const chosen = new Date(`${value}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return chosen <= today;
}

function getSelectedCampuses() {
  return Array.from(campusBoxes)
    .filter((box) => box.checked)
    .map((box) => box.value);
}

function showMessage(message, type) {
  output.className = type;
  output.textContent = message;
}

travelRange.addEventListener("change", updateNotesField);
updateNotesField();

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const firstName = form.firstName.value.trim();
  const lastName = form.lastName.value.trim();
  const email = form.email.value.trim();
  const type = form.travelRange.value;
  const availableDate = form.availableDate.value;
  const selectedCampuses = getSelectedCampuses();
  const note = form.notes.value.trim();

  if (!firstName || !lastName || !email || !type || !availableDate) {
    showMessage("Please complete all required fields.", "error");
    return;
  }

  if (selectedCampuses.length === 0) {
    showMessage("Please select at least one campus.", "error");
    return;
  }

  if (type === "many" && selectedCampuses.length < 2) {
    showMessage("Please choose at least two campuses for the two-or-more option.", "error");
    return;
  }

  if (type === "many" && !note) {
    showMessage("Please add a travel note when choosing two or more campuses.", "error");
    return;
  }

  if (isPastDate(availableDate)) {
    showMessage("Please choose a later date.", "error");
    return;
  }

  output.className = "success";
  output.innerHTML = `
    <h2>Preference Submitted</h2>
    <p>${firstName} ${lastName}</p>
    <p>Email: ${email}</p>
    <p>Availability: ${availableDate}</p>
    <p>Campuses: ${selectedCampuses.join(", ")}</p>
    <p>Preference Level: ${type === "many" ? "Two or more campuses" : "One campus"}</p>
    ${note ? `<p>Travel Notes: ${note}</p>` : ""}
  `;

  form.reset();
  updateNotesField();
});