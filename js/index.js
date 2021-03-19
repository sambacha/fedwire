// Setup initial event handlers for the page and form.
// Context/Scope for this code is the global object, Window.

// Disable form validation until full page is completely loaded.
window.formValidation = false;
window.onload = function () {
  // alert( "Window has loaded." );
  window.formValidation = true;
};
// Disable form validation when user switches away from the browser window ...
window.onblur = function () {
  // WARNING! Do NOT issue alert() from an onBlur handler.
  window.formValidation = false;
};
// ... and re-enable it when they switch back.
window.onfocus = function () {
  // WARNING! Do NOT issue alert() from an onfocus() handler when onblur() is also defined.
  // alert() blurs the issuer, which triggers onblur().
  window.formValidation = true;
};

//=---------------------------------------------------------------=//

/*  VERIFY_NUMERIC  */
function verify_numeric(checkStr) {
  var checkOK = "0123456789";
  var allValid = true;
  for (i = 0; i < checkStr.length; i++) {
    ch = checkStr.charAt(i);
    for (j = 0; j < checkOK.length; j++) if (ch == checkOK.charAt(j)) break; // j loop
    if (j == checkOK.length) {
      allValid = false; // bad character
      break; // i loop
    }
  } // end verify all digits
  return allValid;
} // end verify_numeric

// 2001.03.27-gen:  no need to verify characters, CBAF says all characters are acceptable.
//=- VERIFY_ALPHA =-//
function verify_alpha(checkStr) {
  var checkOK =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz \t\r\n\f1234567890";
  // 2000.01.03-cgk: Expand list of special characters to include everything from results.cfm
  // oleg eliminate expantion 05/07/2008
  //checkOK = checkOK + ".,'&/";
  // oleg expand list of special characters 05/08/08
  checkOK = checkOK + "&";
  // 2000.03.30-gen: add * to list of special characters.
  // 2000.03.02-gen: Expand list of special characters to include all valid characters.
  //checkOK = checkOK + "<()\$\;\-\?\@#!\%_\\:>~|\"\*=+";
  //checkOK = checkOK + "<()\$\;\-\?\@#!\%\_\\:>~|\"\*=\^+";

  var allValid = true;
  for (i = 0; i < checkStr.length; i++) {
    ch = checkStr.charAt(i);
    for (j = 0; j < checkOK.length; j++) if (ch == checkOK.charAt(j)) break; // j loop
    if (j == checkOK.length) {
      allValid = false; // bad character
      break; // i loop
    }
  } // end verify all alpha
  return allValid;
} // end verify_alpha

/*
1999.06.09-cgk: Add URLEncode to support blanks in search by Name
*/

//=- URL_ENCODE =-//
function url_encode(fromStr) {
  var toStr = escape(fromStr);
  return toStr;
} // end url_encode

//=---------------------------------------------------------------=//

//=- VALIDATE_STATE =-//
function validate_state(theField) {
  if (theField.selectedIndex <= 0) {
    alert("Please select a State or Territory.");
    theField.focus();
    return false;
  }
  return true;
} // end validate_state

//=- VALIDATE_CITY =-//
function validate_city(theField) {
  // city can be a selection list or fill-in
  if (theField.type == "text") {
    // validate text field contents
    var checkStr = theField.value;
    if (checkStr.length > 40) {
      alert('Please enter at most 40 characters in the "City" field.');
      theField.focus();
      return false;
    }
    if (!verify_alpha(checkStr)) {
      alert('Please enter only letters and spaces in the "City" field.');
      theField.focus();
      return false;
    }
  } // end, validate text field contents
  return true;
} // end validate_city

//=- VALIDATE_NAME =-//
function validate_name(theField) {
  var checkStr = theField.value;
  if (checkStr.length > 36) {
    alert('Please enter at most 36 characters in the "Bank name" field.');
    theField.focus();
    return false;
  }
  // oleg set up Bank name validation by Pen test request 05/07/08
  if (!verify_alpha(checkStr)) {
    alert('Please enter only letters and spaces in the "Bank name" field.');
    theField.focus();
    return false;
  }
  return true;
} // end validate_name

//=- VALIDATE ABA =-//

function validate_aba1to2(theValue) {
  if (
    !(
      (theValue >= "01" && theValue <= "12") ||
      (theValue >= "21" && theValue <= "32") ||
      (theValue >= "61" && theValue <= "72")
    )
  ) {
    alert(
      "The first two digits of the routing number - " +
        theValue +
        " - must be in the range 01-12, 21-32, or 61-72."
    );
    return false;
  }

  return true;
} // end validate_aba1to2

// 1999.01.08-cgk: C#%%% Remove references to old fields aba1to4 and aba5to8.

// 1998.12.16-cgk: C#@@@ Single 8-9-digit routing number field

function validate_aba() {
  // alert( "window.formValidation=" + window.formValidation );
  // if (!window.formValidation) {return false;}

  theField = this.document.SearchForm.routingNumber;
  theValue = theField.value;
  if (theValue != null && theValue != "") {
    // Validate user input

    // Strip internal hyphens, if present, from routing number for validation
    // Note: If we were JavaScript 1.2, we could use regular experssions
    iHyph = theValue.indexOf("-");
    if (iHyph > 0) {
      theValue = theValue.substr(0, iHyph) + theValue.substr(iHyph + 1);
      iHyph = theValue.indexOf("-");
      if (iHyph > 0) {
        theValue = theValue.substr(0, iHyph) + theValue.substr(iHyph + 1);
      }
    }
    // alert( "value=" + theValue );

    if (!verify_numeric(theValue)) {
      alert(
        '"' + theValue + '" is not numeric. Please re-enter the routing number.'
      );
      theField.value = "";
      theField.focus();
      return false;
    }

    if (theValue.length < 2) {
      alert(
        '"' +
          theValue +
          '" is not long enough. Please enter at least the first two digits of the routing number.'
      );
      theField.focus();
      return false;
    }

    if (theValue.length > 9) {
      alert(
        '"' +
          theValue +
          '" is too long. Please re-enter no more than nine digits for the routing number.'
      );
      theField.focus();
      return false;
    }

    // Validate the first two digits of the routing number
    aba1to2 = theValue.substr(0, 2);
    if (!validate_aba1to2(aba1to2)) {
      theField.focus();
      return false;
    }

    // If 9-digit, verify checkdigit
    if (theValue.length == 9) {
      // Define digit weights
      var weights = new Array(3, 7, 1, 3, 7, 1, 3, 7);
      // calculate digit sum
      weightedSum = 0;
      for (var i = 0; i < weights.length; i++) {
        weightedSum = weightedSum + theValue.charAt(i) * weights[i];
      } // end for i
      checkDigit = theValue.charAt(8);

      // sum of weightedSum and checkDigit must end in zero
      checkSum = weightedSum + checkDigit * 1;
      // alert( "value=" + theValue + ", weightedSum=" + weightedSum + ", checkDigit=" + checkDigit + ", checkSum=" + checkSum );
      checkStr = new String(checkSum);
      if (checkStr.charAt(checkStr.length - 1) != "0") {
        alert(
          theValue +
            " is not a valid routing number. Please verify the number and correct it, or enter a new routing number."
        );
        theField.focus();
        return false;
      }
      // Check Digit verified
    }
  } // end value is not null

  return true;
} // end validate_aba

//=- NEWPAGE =-//

function newPage(elem) {
  // 1998.11.25-cgk: Include ColdFusion client identifiers
  // newLoc = "search.cfm?state=" + state;
  theForm = elem.form;
  // 1999.05.25-cgk: Restore ColdFusion client identifiers
  newLoc = "search?";
  if (theForm.CFID != null) {
    cfid = theForm.CFID.value;
    cftoken = theForm.CFTOKEN.value;
    newLoc = newLoc + "CFID=" + cfid + "&CFTOKEN=" + cftoken;
  }

  // Transfer other form fields to new page

  // Append name ...
  if (theForm.bankName != null) {
    value = theForm.bankName.value;
    if (value != "") {
      // 1999.06.09-cgk: Name must be escaped to preserve blanks
      // newLoc = newLoc + "&name=" + value;
      newLoc = newLoc + "&bank=" + url_encode(value);
    }
    // alert("newLoc=" + newLoc);
  }

  if (theForm.fedAchStateMenu != null) {
    // Append state/territory ...
    index = theForm.fedAchStateMenu.selectedIndex;
    option = theForm.fedAchStateMenu.options[index];
    value = option.value;
    alert("State selectedIndex = " + index + ", value = " + value);
    newLoc = newLoc + "&state=" + value;
    // alert("newLoc=" + newLoc);

    // 1998.12.10-cgk: If state deselected, restore initial City prompt
    if (index === 0) {
      reset_city(theForm);
    }
    // Append city ...
    else if (theForm.city != null) {
      index = theForm.city.selectedIndex;
      option = theForm.city.options[index];
      value = option.value;
      newLoc = newLoc + "&city=" + value;
    }

    // alert("newLoc=" + newLoc);
  } // end Append state/territory

  // Append routing number ...
  if (theForm.aba != null) {
    value = theForm.aba.value;
    if (value != "") {
      newLoc = newLoc + "&aba=" + value;
    }
  }

  // 1995.05.25-cgk: Test CHECKED property instead of VALUE for Funds and Securities checkboxes
  // 1995.05.14-cgk: Implement missing eligibility support!
  // alert("newLoc=" + newLoc);

  // Append Securities eligibility selection ...
  if (theForm.secs != null) {
    // value = theForm.secs.value;
    // if ( value != "") {
    if (theForm.secs.checked) {
      newLoc = newLoc + "&secs=" + value;
    }
  }

  // Append Funds eligibility selection ...
  if (theForm.funds != null) {
    // value = theForm.funds.value;
    // if ( value != "") {
    if (theForm.funds.checked) {
      newLoc = newLoc + "&funds=" + value;
    }
  }
  // alert("newLoc=" + newLoc);

  // Load the new URL
  window.location = newLoc;
} // end newPage

//=- VALIDATE_SEARCHFORM =-//

function validate_SearchForm(theForm) {
  // The user pressed the [Search] button
  // User must specify at least one of: Name, Location, Number
  if (
    theForm.name.value == "" &&
    theForm.state.selectedIndex <= 0 &&
    theForm.aba != null &&
    theForm.aba.value == ""
  ) {
    alert(
      "Please specify the name, location or routing number you want to search for."
    );
    return false;
  }

  // validate Bank Name field
  theField = theForm.name;
  if (theField.value != "") {
    if (!validate_name(theField)) {
      return false;
    }
  }

  // validate Location fields
  if (theForm.state.selectedIndex > 0) {
    if (!validate_state(theForm.state)) {
      return false;
    }
    if (!validate_city(theForm.city)) {
      return false;
    }
  }

  // validate search by routing number fields
  if (theForm.aba != null) {
    theField = theForm.aba;
    if (theField.value != "") {
      if (!validate_aba(theField)) {
        return false;
      }
    }
  }

  return true;
} // end validate_SearchForm

//=- RESET_CITY =-//

function reset_city(theForm) {
  if (theForm.city != null) {
    // alert( "Resetting city field ..." );
    // Empty the City selection list
    theForm.city.length = 1;
    // Set the initial value to prompt the user
    theForm.city.options[0].value = "";
    theForm.city.options[0].text =
      "[Select a state or territory to list cities]";
    theForm.city.selectedIndex = 0;
  }
} // end reset_city

// =- RESET_FORM -=
// 1999.05.26-cgk: We must always clear session variables to reset the form
// 2002.03.06-gen: added reset_Form_ach

function reset_Form_ach(theForm) {
  // The user pressed the [Reset] or [Start over] button

  // Re-load the page with a flag to clear session variables
  // alert( "About to reload search page ..." );
  newLoc = "search?submit=reset";
  window.location = newLoc;
  return false;
} // end reset_Form_ach

function reset_Form(theForm) {
  // The user pressed the [Reset] or [Start over] button

  // Re-load the page with a flag to clear session variables
  // alert( "About to reload search page ..." );
  newLoc = "search?submit=reset";
  window.location = newLoc;
  return false;

  /*
	// The user pressed the [Reset] or [Start over] button; restore all form fields to their default values.
	theForm.name.value = "";
	theForm.state.selectedIndex = 0;
	reset_city(theForm);
	
	// 1999.05.18-cgk: Also need to reset routing number and eligibility flags
	theForm.aba.value = "";
	theForm.secs.checked = false;
	theForm.funds.checked = false;
	
	// Now re-load the page with a flag
	return false;
	*/
} // end reset_Form
