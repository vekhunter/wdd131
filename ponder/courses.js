const aCourse = {
  code: "CSE121b",
  name: "Javascript Language",
  logo: "images/js-logo.png",
  sections: [
    {
      sectionNum: 1,
      roomNum: "STC 353",
      enrolled: 26,
      days: "TTh",
      instructor: "Bro T"
    },
    {
      sectionNum: 2,
      roomNum: "STC 347",
      enrolled: 28,
      days: "TTh",
      instructor: "Sis A"
    }
  ],
  enrollStudent: function (sectionNum) {
    const sectionIndex = this.sections.findIndex(
      (section) => section.sectionNum === sectionNum
    );

    if (sectionIndex >= 0) {
      this.sections[sectionIndex].enrolled++;
      renderSections(this.sections);
      return true;
    }

    return false;
  }
};

function setCourseInfo(course) {
  document.querySelector("#courseName").textContent = course.name;
  document.querySelector("#courseCode").textContent = course.code;
}

function sectionTemplate(section) {
  return `<tr>
      <td>${section.sectionNum}</td>
      <td>${section.roomNum}</td>
      <td>${section.enrolled}</td>
      <td>${section.days}</td>
      <td>${section.instructor}</td>
    </tr>`;
}

function renderSections(sections) {
  const html = sections.map(sectionTemplate);
  document.querySelector("#sections").innerHTML = html.join("");
}

setCourseInfo(aCourse);
renderSections(aCourse.sections);

function showStatus(message, isError) {
  const statusEl = document.querySelector("#enrollStatus");
  statusEl.textContent = message;
  statusEl.className = isError ? "error" : "success";
}

function handleEnrollment() {
  const inputEl = document.querySelector("#sectionNumber");
  const sectionNum = Number.parseInt(inputEl.value, 10);

  if (!Number.isInteger(sectionNum)) {
    showStatus("Enter a valid section number.", true);
    return;
  }

  const enrolled = aCourse.enrollStudent(sectionNum);
  if (enrolled) {
    showStatus(`Student enrolled in section ${sectionNum}.`, false);
    inputEl.value = "";
    inputEl.focus();
    return;
  }

  showStatus(`Section ${sectionNum} was not found.`, true);
}

document.querySelector("#enrollStudent").addEventListener("click", handleEnrollment);

document.querySelector("#sectionNumber").addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    handleEnrollment();
  }
});
