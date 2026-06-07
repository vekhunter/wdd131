const form = document.querySelector("#fsyForm");
const travelRange = document.querySelector("#travelRange");
const notesContainer = document.querySelector("#notesContainer");
const notes = document.querySelector("#notes");
const output = document.querySelector("#output");
const campusBoxes = document.querySelectorAll('input[name="campus"]');
const availableDate = document.querySelector("#availableDate");

function getTomorrow() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().slice(0, 10);
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

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
  output.focus();
}

travelRange.addEventListener("change", updateNotesField);
availableDate.min = getTomorrow();
updateNotesField();

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const firstName = form.firstName.value.trim();
  const lastName = form.lastName.value.trim();
  const email = form.email.value.trim();
  const type = form.travelRange.value;
  const startDate = form.availableDate.value;
  const selectedCampuses = getSelectedCampuses();
  const note = form.notes.value.trim();

  if (!firstName || !lastName || !email || !type || !startDate) {
    showMessage("Please complete all required fields.", "error");

    if (!firstName) {
      form.firstName.focus();
    } else if (!lastName) {
      form.lastName.focus();
    } else if (!email) {
      form.email.focus();
    } else if (!type) {
      form.travelRange.focus();
    } else {
      form.availableDate.focus();
    }

    return;
  }

  if (!isValidEmail(email)) {
    showMessage("Please enter a valid email address.", "error");
    form.email.focus();
    return;
  }

  if (selectedCampuses.length === 0) {
    showMessage("Please select at least one campus.", "error");
    campusBoxes[0].focus();
    return;
  }

  if (type === "many" && selectedCampuses.length < 2) {
    showMessage("Please choose at least two campuses for the two-or-more option.", "error");
    campusBoxes[0].focus();
    return;
  }

  if (type === "many" && !note) {
    showMessage("Please add a travel note when choosing two or more campuses.", "error");
    form.notes.focus();
    return;
  }

  if (isPastDate(startDate)) {
    showMessage("Please choose a later date.", "error");
    form.availableDate.focus();
    return;
  }

  output.className = "success";
  output.innerHTML = `
    <h2>Preference Submitted</h2>
    <p>${firstName} ${lastName}</p>
    <p>Email: ${email}</p>
    <p>Availability: ${startDate}</p>
    <p>Campuses: ${selectedCampuses.join(", ")}</p>
    <p>Preference Level: ${type === "many" ? "Two or more campuses" : "One campus"}</p>
    ${note ? `<p>Travel Notes: ${note}</p>` : ""}
  `;
  output.focus();

  form.reset();
  updateNotesField();
});