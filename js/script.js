// escape special characters so user input can't break the results markup
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

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

      // group 1: personal details
      var html = "<h3>Personal Details</h3>";
      html += "<table class='results-table'>";
      html += "<tr><th>Full Name</th><td>" + escapeHtml(fullName.value) + "</td></tr>";
      html += "<tr><th>Sex</th><td>" + escapeHtml(sexValue) + "</td></tr>";
      html += "<tr><th>Age Group</th><td>" + escapeHtml(ageGroup.value) + "</td></tr>";
      html += "<tr><th>State</th><td>" + escapeHtml(state.value) + "</td></tr>";
      html += "<tr><th>Email</th><td>" + escapeHtml(email.value) + "</td></tr>";
      html += "<tr><th>Mobile Phone</th><td>" + escapeHtml(phone.value) + "</td></tr>";
      html += "</table>";

      // group 2: digital habits and work
      var q1 = document.getElementById("q1");

      var platforms = document.getElementsByName("platforms");
      var platformValues = [];
      for (var p = 0; p < platforms.length; p++) {
        if (platforms[p].checked) {
          platformValues.push(platforms[p].value);
        }
      }

      var workType = document.getElementsByName("workType");
      var workTypeValue = "";
      for (var w = 0; w < workType.length; w++) {
        if (workType[w].checked) {
          workTypeValue = workType[w].value;
        }
      }

      var q4 = document.getElementById("q4");
      var q7 = document.getElementById("q7");

      html += "<h3>Digital Habits & Work</h3>";
      html += "<table class='results-table'>";
      html += "<tr><th>Social Media Hours/Day</th><td>" + escapeHtml(q1.value) + "</td></tr>";
      html += "<tr><th>Platforms Used</th><td>" + escapeHtml(platformValues.join(", ")) + "</td></tr>";
      html += "<tr><th>Work Arrangement</th><td>" + escapeHtml(workTypeValue) + "</td></tr>";
      html += "<tr><th>Job Title</th><td>" + escapeHtml(q4.value) + "</td></tr>";
      html += "<tr><th>Screen Break Frequency</th><td>" + escapeHtml(q7.value) + "</td></tr>";
      html += "</table>";

      // group 3: mental wellbeing
      var moodEffect = document.getElementsByName("moodEffect");
      var moodValue = "";
      for (var m = 0; m < moodEffect.length; m++) {
        if (moodEffect[m].checked) {
          moodValue = moodEffect[m].value;
        }
      }

      var symptoms = document.getElementsByName("symptoms");
      var symptomValues = [];
      for (var s = 0; s < symptoms.length; s++) {
        if (symptoms[s].checked) {
          symptomValues.push(symptoms[s].value);
        }
      }

      var q9 = document.getElementById("q9");

      var soughtSupport = document.getElementsByName("soughtSupport");
      var supportValue = "";
      for (var sp = 0; sp < soughtSupport.length; sp++) {
        if (soughtSupport[sp].checked) {
          supportValue = soughtSupport[sp].value;
        }
      }

      var q11 = document.getElementById("q11");
      var q12 = document.getElementById("q12");

      html += "<h3>Mental Wellbeing</h3>";
      html += "<table class='results-table'>";
      html += "<tr><th>Social Media Mood Effect</th><td>" + escapeHtml(moodValue) + "</td></tr>";
      html += "<tr><th>Stress Symptoms</th><td>" + escapeHtml(symptomValues.join(", ")) + "</td></tr>";
      html += "<tr><th>Wellbeing Rating (1-10)</th><td>" + escapeHtml(q9.value) + "</td></tr>";
      html += "<tr><th>Sought Professional Support</th><td>" + escapeHtml(supportValue) + "</td></tr>";
      html += "<tr><th>Coping Strategies</th><td>" + escapeHtml(q11.value) + "</td></tr>";
      html += "<tr><th>Additional Comments</th><td>" + escapeHtml(q12.value) + "</td></tr>";
      html += "</table>";

      // group 4: your experience (likert statements)
      var likertNames = ["likert_connected", "likert_compare", "likert_remote", "likert_disconnect"];
      var likertLabels = [
        "Feels connected via social media",
        "Feels pressure to compare online",
        "Remote work improved balance",
        "Hard to disconnect from work"
      ];

      html += "<h3>Your Experience</h3>";
      html += "<table class='results-table'>";
      for (var l = 0; l < likertNames.length; l++) {
        var options = document.getElementsByName(likertNames[l]);
        var chosen = "";
        for (var o = 0; o < options.length; o++) {
          if (options[o].checked) {
            chosen = options[o].value;
          }
        }
        html += "<tr><th>" + likertLabels[l] + "</th><td>" + escapeHtml(chosen) + "</td></tr>";
      }
      html += "</table>";

      resultsContent.innerHTML = html;

      form.style.display = "none";
      resultsSection.style.display = "block";
    }

  });

});