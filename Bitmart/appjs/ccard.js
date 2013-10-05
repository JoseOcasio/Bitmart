function Ccard(cardNumber, username, expDate, brand, secCode){
	this.id = "";
	this.cardNumber = cardNumber;
	this.username = username;
	this.expDate = expDate;
	this.brand = brand;
	this.secCode = secCode;
	this.toJSON = toJSON;
}
