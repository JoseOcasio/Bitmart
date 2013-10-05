module.exports =  { 
	User : function (username, password, firstname, lastname, email, rating){
		this.id = "";
		this.username = username;
		this.password = password;
		this.firstname = firstname;
		this.lastname = lastname;
		this.email = email;
		this.rating = rating;
	}
}