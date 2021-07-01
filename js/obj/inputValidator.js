/**
 * class composed of static methods allowing to check input's values
 */
 export default class inputValidator {

  static checkedLocationRadioButton = document.querySelectorAll('input[name="location"]:checked');
  static openFields = document.querySelectorAll(
                  "input[type = text], input[type = email], input[type = number], input[type = date]"
                );


  /**
   * birthdate validation
   * @param {string} birthdateToValidate (yyyy-mm-dd)
   * @returns {boolean} true = is correct
   */
  static checkBirthdate(birthdateToValidate){
    let today = new Date();  
    let todayFormatted = today.getFullYear() 
      + "" + (today.getMonth() < 10 ? "0"+(today.getMonth() +1) : (today.getMonth() +1))
      + "" + (today.getDay() < 10 ? "0"+(today.getDay() +1) : (today.getDay() +1))
      ;
    let bTVFomatted = birthdateToValidate.split("-").join(""); 
    return /(^[0-9]{4}-{1}[0-9]{2}-{1}[0-9]{2}$)/.test(birthdateToValidate) 
            && (bTVFomatted < (parseInt(todayFormatted) - 119969) 
            && bTVFomatted > (parseInt(todayFormatted) - 1200000)) 
            ? true : false;
  }

  /**
   * check if one of the location buttons is checked
   * @returns {boolean} : true = is checked
   */
  static checkLocation(){
    return document.querySelectorAll('input[name="location"]:checked').length === 0 ? false : true;
  }

  /**
   * email verification
   * @param {string} emailToValidate 
   * @returns {boolean} true = email is correct
   */
  static checkMail(emailToValidate){
    return /([\w-\.]+@[\w\.]+\.{1}[\w]+)/.test(emailToValidate) ? true : false;
  }

  /**
   * first name or last name verification
   * @param {string} nameToValidate 
   * @returns {boolean} true = email is correct
   */
  static checkName(nameToValidate){
    return nameToValidate.length < 2 
          || !isNaN(nameToValidate) 
          || /[@:./\\_\{\}\[\]\(\)\|\%\*\$\£\?\!\&\~\#\`µ0-9]/.test(nameToValidate) 
          ? false : true;
  }

  /**
   * check if input paramater is number
   * @param {number} qtyToValidate 
   * @returns {boolean} true = is number
   */
  static checkQuantity(qtyToValidate){
    return isNaN(qtyToValidate) || qtyToValidate === "" ? false : true;
  }

  /**
   * check if input paramater is empty
   * @param {string} inputToTest 
   * @return {boolean} true = empty
   */
   static isEmpty(inputToTest){
    return inputToTest === "" ? true : false;
  }

}