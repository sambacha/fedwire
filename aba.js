console.log(Function('"use strict";function validate_aba1to2(theValue) {
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
	}));