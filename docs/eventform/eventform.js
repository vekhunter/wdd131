const form = document.querySelector("#eventForm");
const attendeeType = document.querySelector("#attendeeType");
const typeDetails = document.querySelector("#typeDetails");
const typeLabel = document.querySelector("#typeLabel");
const typeInput = document.querySelector("#typeInput");
const typeHelper = document.querySelector("#typeHelper");
const eventDate = document.querySelector("#eventDate");
const messages = document.querySelector("#messages");
const ticket = document.querySelector("#ticket");

function getTomorrow() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().slice(0, 10);
}

function isFutureDate(value) {
  const chosen = new Date(`${value}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return chosen > today;
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function updateTypeField() {
  const value = attendeeType.value;
  const isStudent = value === "student";
  const isGuest = value === "guest";

  typeDetails.hidden = !(isStudent || isGuest);
  typeInput.required = isStudent || isGuest;
  typeInput.value = "";

  if (isStudent) {
    typeLabel.textContent = "Student I#";
    typeInput.inputMode = "numeric";
    typeInput.placeholder = "123456789";
    typeHelper.textContent = "Enter your 9 digit student I number.";
  }

  if (isGuest) {
    typeLabel.textContent = "Access Code";
    typeInput.inputMode = "text";
    typeInput.placeholder = "EVENT131";
    typeHelper.textContent = "Enter the guest event code EVENT131.";
  }
}

function showErrors(errors) {
  messages.className = "messages error";
  messages.innerHTML = `
    <h2>Please fix the following:</h2>
    ${errors.map((error) => `<p>${error}</p>`).join("")}
  `;
  ticket.className = "ticket";
  ticket.innerHTML = "";
  messages.focus();
}

function showTicket(details) {
  messages.className = "messages";
  messages.innerHTML = "";
  ticket.className = "ticket success";
  ticket.innerHTML = `
    <h2>Ticket Confirmed</h2>
    <p>Name: ${details.firstName} ${details.lastName}</p>
    <p>Email: ${details.email}</p>
    <p>Date: ${details.eventDate}</p>
    <p>Type: ${details.attendeeType === "student" ? "Student" : "Guest"}</p>
    <p>${details.attendeeType === "student" ? "Student I#" : "Access Code"}: ${details.typeValue}</p>
    <p>Ticket ID: EVT-${details.lastName.slice(0, 3).toUpperCase()}-${details.eventDate.replaceAll("-", "")}</p>
  `;
}

attendeeType.addEventListener("change", updateTypeField);
eventDate.min = getTomorrow();
updateTypeField();

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const details = {
    firstName: form.firstName.value.trim(),
    lastName: form.lastName.value.trim(),
    email: form.email.value.trim(),
    eventDate: form.eventDate.value,
    attendeeType: form.attendeeType.value,
    typeValue: form.typeInput.value.trim()
  };

  const errors = [];

  if (!details.firstName || !details.lastName || !details.email || !details.eventDate || !details.attendeeType) {
    errors.push("Complete all required fields before submitting.");
  }

  if (details.email && !isValidEmail(details.email)) {
    errors.push("Enter a valid email address.");
  }

  if (details.eventDate && !isFutureDate(details.eventDate)) {
    errors.push("Choose a date later than the current date.");
  }

  if (details.attendeeType === "student" && !/^\d{9}$/.test(details.typeValue)) {
    errors.push("Student I# must be exactly 9 digits.");
  }

  if (details.attendeeType === "guest" && details.typeValue !== "EVENT131") {
    errors.push("Guest access code must be EVENT131.");
  }

  if (errors.length > 0) {
    showErrors(errors);
    return;
  }

  showTicket(details);
  form.reset();
  updateTypeField();
});