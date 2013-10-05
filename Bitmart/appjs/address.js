function Address(mailAddress, city, country, zipcode, username){
	this.id = "";
	this.mailAddress = mailAddress;
	this.city = city;
	this.country = country;
	this.zipcode = zipcode;
	this.username = username;
	this.toJSON = toJSON;
}
