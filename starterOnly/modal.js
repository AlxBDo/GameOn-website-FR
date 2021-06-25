function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const closeBtn = document.querySelectorAll(".close");
const formData = document.querySelectorAll(".formData");
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const modalSubmit = document.querySelector("form > .btn-submit");

// object

/**
 * object composed of static methods allowing the display of error messages
 */
class errorDisplay {

  /**
   * create in the parent element of the input a "p" element containing the error message
   * @param {object} errorObj : javascript object 
   * @returns {boolean} false : for stop focus
   */
  static createErrorReturnBox(errorObj, elementFocus = true){
    // check existence of a "infoBox" element
    if(!errorDisplay.getInfoBox(errorObj.element)){
      let infoBox = document.createElement("p");
      infoBox.setAttribute("id", errorDisplay.getIdInfoBox(errorObj.element));
      infoBox.innerHTML = errorObj.msg;
      infoBox.classList.add("error-info");
      errorObj.element.parentNode.appendChild(infoBox);
      if(elementFocus) { errorObj.element.focus(); }
      return false;
    } 
  }

  /**
   * create DOM element to display error message
   * @param {object} elementDomObj javascript object of DOM element
   * @returns {object} javascript object of DOM element p.error-info
   */
  static getInfoBox(elementDomObj){
    return document.getElementById(errorDisplay.getIdInfoBox(elementDomObj));
  }

  /**
   * create the InfoBox html id with the input name passed as a parameter
   * @param {object} elementDomObj javascript object of DOM element
   * @returns {sting} : infoBox id html
   */
  static getIdInfoBox(elementDomObj){
    return "infoBox-"+elementDomObj.getAttribute("name");
  }

  /**
   * checks if infoBox exists and removes the DOM element if it does
   * @param {object} elementDomObj javascript object of DOM element
   */
  static initInfoBox(elementDomObj){
    let infoBox = errorDisplay.getInfoBox(elementDomObj);
    if(infoBox){
      elementDomObj.parentNode.removeChild(infoBox);
    }
  } 

  /**
   * displays the errors collected by errorHandler object
   * @param {object} errHdlrObj : class errorHandler
   */
  static print(errHdlrObj){
    if(errHdlrObj instanceof errorHandler){
      let elementFocus = true;
      errHdlrObj.getErrors().forEach(function(err){
        elementFocus = errorDisplay.createErrorReturnBox(err, elementFocus);
      });
    }
  }
}


class errorHandler {

  checkedLocationRadioButton = document.querySelectorAll('input[name="location"]:checked');
  errors = [];
  openFields = document.querySelectorAll(
                  "input[type = text], input[type = email], input[type = number], input[type = date]"
                );
  termsAndConditionCheckbox = document.getElementById("checkbox1");
  

  /**
    * collect form entry errors
   * @param {object} inputObject : javascript object of a DOM input element
   * @param {string} message : error return message for the user
   * @param {boolean} addClassError : true = the class "err" is added to the input
   */
  addError(inputObject, message, addClassError = false){
    if(addClassError){ this.addErrorClassHtml(inputObject); }
    this.addErrorMessage(inputObject, message);
  }

  /**
   * add ".err" class in html input element
   * @param {object} inputObject 
   */
  addErrorClassHtml(inputObject){
    inputObject.classList.add("err");
  }

  /**
   * adds an entry in the "errors" attribute array
   * @param {string} elementObj javascript object of DOM input element
   * @param {string} message error return message for the user
   */
  addErrorMessage(elementObj, message){
    this.errors.push( { element: elementObj, msg: message } );
  }

  /**
   * check if errors found
   * @returns {boolean} : true if errors found
   */
  errorFind(){
    return this.errors.length > 0 ? true : false;
  }

  getErrors(){
    return this.errors;
  }

  /**
   * checks that the open fields are not empty
   * @param {object} input 
   * @return {boolean} true = empty
   */
  isEmpty(input){
    if(input.value === ""){
      this.addError(
        input, 
        "Ce champ doit être renseigné",
        true
      )
      return true;
    }
    return false;
  }

  /**
   * checks inputs text, email, number and date are correctly filled in
   * @returns {boolean} : true = error find
   */
  openFieldValidation(){
    for(let ipt of this.openFields){
      // if input value is empty -> error
      if(!this.isEmpty(ipt)){
        // otherwise, check that the first and last name contain at least 2 characters
        let nameIpt = ipt.getAttribute("name");
        if( (nameIpt === "first" || nameIpt === "last") && (ipt.value.length < 2) ){
          this.addError(
            ipt, 
            "Votre "+ nameIpt === "first" ? "prénom" : "nom" +" doit comporter au moins 2 lettres."
          );
        }
      } 
    }
    return this.errorFind();
  }

  /**
   * checks if any of the radio buttons are checked
   * @returns {boolean} : true = error find
   */
  radioValidation(){
    if(this.checkedLocationRadioButton.length === 0){
      this.addErrorMessage(document.getElementById("location1"), "Vous devez choisir une ville.");
    }
    return this.errorFind();
  }

  /**
   * checks if terms and conditions (checkbox1) are checked
   * @returns {boolean} : true = error find
   */
  termsAndConditionsValidation(){
    if(!this.termsAndConditionCheckbox.checked){
      this.addErrorMessage(document.getElementById("checkbox1"), "Merci de valider les conditions générales.");
      this.addErrorClassHtml(document.querySelector("label[for=checkbox1] > span"));
    }
    return this.errorFind();
  }

}

// close modal event
closeBtn.forEach((btn) => btn.addEventListener("click", closeModal));

// close modal form
function closeModal(){
  modalbg.style.display = "none";
}

// Submit modal form
function submitModal(event){
  let errorHdlr = new errorHandler;
  if(!errorHdlr.openFieldValidation()){
    // checks that the closed fields
      // radio
    if(!errorHdlr.radioValidation()){
      // checkbox1
      if(!errorHdlr.termsAndConditionsValidation()){
        alert('VALIDE !!!');
        return true;
      }
    }
  }
  errorDisplay.print(errorHdlr);
  event.preventDefault();
}

// input modal event
document.querySelectorAll("input").forEach(function(ipt){
  ipt.addEventListener("change", function(){
    errorDisplay.initInfoBox(ipt);
  });
});

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// submit modal event
 modalSubmit.addEventListener('click', submitModal);


