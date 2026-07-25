// wait for the page to load
document.addEventListener("DOMContentLoaded", function () {

  var form = document.getElementById("surveyForm");

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
    for (var i = 0; i < sexOptions.length; i++) {
      if (sexOptions[i].checked) {
        sexChecked = true;
      }
    }
    var sexField = sexOptions[0].closest(".field");

    if (!sexChecked) {
      sexField.classList.add("invalid");
      isValid = false;
    } else {
      sexField.classList.remove("invalid");
    }

    if (isValid) {
      console.log("full name and sex are valid");
    }

  });

});
