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

    if (isValid) {
      console.log("full name is valid");
    }

  });

});
