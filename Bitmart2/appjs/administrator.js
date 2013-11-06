function Administrator(username, upassword, ufirstname, ulastname, uemail){
	this.adminid = "";
	this.username = username;
	this.upassword = upassword;
	this.ufirstname = ufirstname;
	this.ulastname = ulastname;
	this.uemail = uemail;
	this.toJSON = toJSON;
}