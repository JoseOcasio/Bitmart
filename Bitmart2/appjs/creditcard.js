function Creditcard(ccnumber, ccexpirationdate, ccbrand, ccsecuritycode, uid){
	this.ccid = "";
	this.ccnumber = ccnumber;
	this.ccexpirationdate = ccexpirationdate;
	this.ccbrand = ccbrand;
	this.ccsecuritycode = ccsecuritycode;
	this.uid = uid;
	this.toJSON = toJSON;
}
