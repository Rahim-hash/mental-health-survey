// wait for the page to load
document.addEventListener("DOMContentLoaded", function () {

  var form = document.getElementById("surveyForm");
  var resultsSection = document.getElementById("resultsSection");
  var resultsContent = document.getElementById("resultsContent");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var isValid = true;

    // validate full name
    var fullName = document.getElementById("fullName");
    var fullNameField = fullName.closest(".field");

    if (fullName.value.trim() === "") {
      fullNameField.classList.add("invalid");
      isValid = false;
    } else {
      fullNameField.classList.remove("invalid");
    }

    // validate sex (radio buttons)
    var sexOptions = document.getElementsByName("sex");
    var sexChecked = false;
    var sexValue = "";
    for (var i = 0; i < sexOptions.length; i++) {
      if (sexOptions[i].checked) {
        sexChecked = true;
        sexValue = sexOptions[i].value;
      }
    }
    var sexField = sexOptions[0].closest(".field");

    if (!sexChecked) {
      sexField.classList.add("invalid");
      isValid = false;
    } else {
      sexField.classList.remove("invalid");
    }

    // validate age group
    var ageGroup = document.getElementById("ageGroup");
    var ageGroupField = ageGroup.closest(".field");

    if (ageGroup.value === "") {
      ageGroupField.classList.add("invalid");
      isValid = false;
    } else {
      ageGroupField.classList.remove("invalid");
    }

    // validate state
    var state = document.getElementById("state");
    var stateField = state.closest(".field");

    if (state.value === "") {
      stateField.classList.add("invalid");
      isValid = false;
    } else {
      stateField.classList.remove("invalid");
    }

    // validate email
    var email = document.getElementById("email");
    var emailField = email.closest(".field");
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email.value.trim())) {
      emailField.classList.add("invalid");
      isValid = false;
    } else {
      emailField.classList.remove("invalid");
    }

    // validate mobile phone
    var phone = document.getElementById("phone");
    var phoneField = phone.closest(".field");
    var phonePattern = /^04[\d]{2}[\s]?[\d]{3}[\s]?[\d]{3}$/;

    if (!phonePattern.test(phone.value.trim())) {
      phoneField.classList.add("invalid");
      isValid = false;
    } else {
      phoneField.classList.remove("invalid");
    }

    // if everything is valid, display the results
    if (isValid) {

      var html = "<table class='results-table'>";
      html += "<tr><th>Full Name</th><td>" + fullName.value + "</td></tr>";
      html += "<tr><th>Sex</th><td>" + sexValue + "</td></tr>";
      html += "<tr><th>Age Group</th><td>" + ageGroup.value + "</td></tr>";
      html += "<tr><th>State</th><td>" + state.value + "</td></tr>";
      html += "<tr><th>Email</th><td>" + email.value + "</td></tr>";
      html += "<tr><th>Mobile Phone</th><td>" + phone.value + "</td></tr>";
      html += "</table>";

      resultsContent.innerHTML = html;

      form.style.display = "none";
      resultsSection.style.display = "block";
    }

  });

});
