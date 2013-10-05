module.exports =  { 
	Ccard : function (cardNumber, username, expDate, brand, secCode){
		this.id = "";
		this.cardNumber = cardNumber;
		this.username = username;
		this.expDate = expDate;
		this.brand = brand;
		this.secCode = secCode;
	}
}
