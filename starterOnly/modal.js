const globalRegex = new RegExp(/^[a-zA-Z-]{2,}/);
const mailRegex = new RegExp(
   /^[a-zA-Z0-9.\-_]+[@]{1}[a-zA-Z0-9.\-_]+[.]{1}[a-z]{2,}$/
);
const quantityRegex = new RegExp(/^[0-9]/);

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const form = document.querySelector("form");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelector(".close");
const inputText = document.querySelectorAll(".text-control");
const modalBody = document.querySelector(".modal-body");
const nav = document.querySelector(".secondary-navbar");
const x = document.getElementById("myTopnav");

function editNav() {
   if (x.className === "topnav") {
      x.className += " responsive";
      nav.previousElementSibling.className += " open";
   } else {
      x.className = "topnav";
      nav.previousElementSibling.className = "icon";
   }
   nav.classList.toggle("hidden");
}
// added an event listener to reset menu when window resizing
window.addEventListener("resize", () => {
   window.innerWidth >= 768 && nav.classList.add("hidden");
   window.innerWidth >= 768 &&
      nav.previousElementSibling.classList.remove("open");
   x.classList.remove("responsive");
});

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

//added an evnt listener to handle the form submit
form.addEventListener("submit", (e) => {
   e.preventDefault();
   resetMsgError();
   validateForm();
});

closeBtn.addEventListener("click", () => {
   closeModal();
});

// launch form modal
function launchModal() {
   modalbg.style.display = "flex";
}

// Reset all message error
function resetMsgError() {
   const inputList = document.querySelectorAll("input");
   inputList.forEach((input) => {
      const inputContainer = input.parentElement;
      inputContainer.dataset.error = "";
      inputContainer.setAttribute("data-error-visible", "false");
   });
}

// Check form validity
function validateForm() {
   const cgu = document.querySelector("#checkbox1");
   let isFormValid = true;

   // skimm through all input text to check if value is correct
   for (let input of inputText) {
      isFormValid &= checkFieldValidity(input);
      if (!checkFieldValidity(input)) {
         displayErrorMessage(input);
      }
   }
   // if no location is checked, display an error
   if (isFormValid && !checkLocation()) {
      const radioContainer =
         document.querySelector("input[type=radio]").parentElement;
      radioContainer.dataset.error = "Veuillez selectionner une ville";

      radioContainer.setAttribute("data-error-visible", "true");
      isFormValid = false;
   }
   //if cgu isn't checked, display an error
   else if (isFormValid && !cgu.checked) {
      const cguContainer = cgu.parentElement;
      isFormValid = false;
      cguContainer.dataset.error = "Vous devez accepter les CGU !";
      cguContainer.setAttribute("data-error-visible", "true");
   }
   // if form is valid, display confirmation modal
   else if (isFormValid) {
      modalBody.classList.add("hidden");
      createDomConfirmation();
   }
}

// check field validity with regex
function checkFieldValidity(input) {
   if (input.id === "email") {
      return mailRegex.test(input.value);
   } else if (input.id === "birthdate") {
      if (input.value != "") return true;
      else return false;
   } else if (input.id === "quantity") {
      return quantityRegex.test(input.value);
   } else {
      return globalRegex.test(input.value);
   }
}

// Display message error in texts input
function displayErrorMessage(input) {
   const inputContainer = input.parentElement;
   switch (input.id) {
      case "first":
         inputContainer.dataset.error = "Veuillez renseigner votre prénom";
         inputContainer.setAttribute("data-error-visible", "true");
         break;
      case "last":
         inputContainer.dataset.error =
            "Veuillez renseigner votre nom de famille";
         inputContainer.setAttribute("data-error-visible", "true");
         break;
      case "email":
         inputContainer.dataset.error =
            "Veuillez renseigner votre email, celui-ci doit être valide";
         inputContainer.setAttribute("data-error-visible", "true");
         break;
      case "birthdate":
         inputContainer.dataset.error =
            "Êtes vous sûr que c'est votre date de naissance ?";
         inputContainer.setAttribute("data-error-visible", "true");
         break;
      case "quantity":
         inputContainer.dataset.error =
            "Veuillez entrer un nombre entre 0 et 100";
         inputContainer.setAttribute("data-error-visible", "true");
         break;
      default:
         break;
   }
}

// Check if one location is choosen
function checkLocation() {
   const inputs = document.querySelectorAll("input[type=radio]");
   for (const input of inputs) {
      if (input.checked) return true;
   }
   return false;
}

// Create necessary dom elements for confirmation modale
function createDomConfirmation() {
   const container = document.querySelector(".content");

   const confirmModalBody = document.createElement("div");
   confirmModalBody.setAttribute("class", "confirmModal");
   container.appendChild(confirmModalBody);

   const close = document.createElement("span");
   close.setAttribute("class", "close");
   confirmModalBody.appendChild(close);

   const message = document.createElement("h2");
   message.innerText = "Merci pour votre inscription";
   confirmModalBody.appendChild(message);

   const button = document.createElement("button");
   button.setAttribute("class", "btn-submit");
   button.innerText = "Fermer";
   confirmModalBody.append(button);

   const closeElement = [close, button];
   closeElement.forEach((element) => {
      element.addEventListener("click", () => closeModal());
   });
}

// close Form modal
function closeModal() {
   modalbg.style.display = "none";
   resetModale();
}

// reset modale
function resetModale() {
   const confirmModalBody = document.querySelector(".confirmModal");
   confirmModalBody && confirmModalBody.remove();
   modalBody.classList.remove("hidden");
   resetMsgError();
   form.reset();
}
