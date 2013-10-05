// Express is the web framework 
var express = require('express');
var app = express();
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};

app.configure(function () {
  app.use(allowCrossDomain);
});


app.use(express.bodyParser());

var product = require("./product.js");
var Product = product.Product;

var productList = new Array(
	// Product(id, name, model, description, price, photo, brand, username, quantity, inStorage)
	new Product("La Llamarada", "Enrique Laguerre", "New 2010", "25", "photo", "Book", "JammyVM", "5", "3"),
	new Product("La Charca", "Manuel Zeno Gandia", "Used 2009", "10", "photo",  "Book", "JammyVM", "6", "4"),
	new Product("Physics 2nd Ed", "Giancoli", "Used 1990", "3", "photo",  "Book", "JammyVM", "1", "1"),
	new Product("Calculus 7th Ed", "James Stewart", "Used 1999", "7", "photo",  "Book", "JammyVM", "6", "4"),
	new Product("Data Structures 2nd Ed", "Manuel Perez", "Used 2001", "10", "photo",  "Book", "JammyVM", "6", "4")	
);


/////////////////////////////////////////////////////////////////////
//users
var user = require("./user.js");
var User = user.User;
var userList = new Array(
	//(username, password, firstname, lastname, email, rating)
	new User("Pathwalker", "123", "Jose", "Ocasio", "jose.ocasio1@upr.edu", "5"),
	new User("JammyVm", "123", "Jammy", "Velez", "jammy.velez@upr.edu", "4"),
	new User("Heisenberg", "123", "Walter", "White", "walter.white@upr.edu", "5")
);
///////////////////////////////////////////////////////////////////////////////


//bid
var bid = require("./bid.js");
var Bid = bid.Bid;
var bidList = new Array(
	new Bid("La Llamarada", "Pathwalker", "10"),
	new Bid("La Charca", "Pathwalker", "20")
);
// //////////////////////////////////////////////////////////////////////////
// //regular user
// var regularuser = require("./regularuser.js");
// var RegularUser = regularuser.RegularUser;
// var regularUserList = new Array(
	// ////// ("username", "rank")
	// new RegularUser("Pathwalker", "5"),
	// new RegularUser("JammyVM", "5")
// );
// //////////////////////////////////////////////////////////////////////////////
// 
// //////////////////////////////////////////////////////////////////////////////
// //admin
// var administrator = require("./administrator.js");
// var Administrator = administrator.Administrator;
// var administratorList = new Array(
	// new Administrator("Pathwalker", "admin")
// );
// /////////////////////////////////////////////////////////////////////////
// 
// ////////////////////////////////////////////////////////////////////////
// //invoice
// var invoice = require("./invoice.js");
// var Invoice = invoice.Invoice;
// var invoiceList = new Array(
	// //("id", "buyer username", "seller user name", "product price", "product id", "amount", "total price")
	// new Invoice("1", "Pathwalker", "JammyVM", "25", "La Llamarada", "1", "25")
// );
// /////////////////////////////////////////////////////////////////////
// 
// ////////////////////////////////////////////////////////////////////
//address
var address = require("./address.js");
var Address = address.Address;
var addressList = new Array(
	//("address", "city", "country", "zip code", "username")
	new Address ("4008 Calle Medina Gonzales", "Mayaguez", "Puerto Rico", "00669", "Pathwalker"),
	new Address ("4008 Calle Medina Gonzales", "Mayaguez", "Puerto Rico", "00680", "Jammyvm"),
	new Address ("Meth Lab 003", "Del Paso", "Texas", "08682", "Heisenberg")
);
/////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////
//credit card
var ccard = require("./ccard.js");
var Ccard = ccard.Ccard;
var ccardList = new Array(
	//("card number", "username", "exp date mes/year", "brand, "security code)
	new Ccard("454951400788555", "Pathwalker", "06/18", "Visa", "777")
);
//////////////////////////////////////////////////////////////////////////

// /////////////////////////////////////////////////////////////////////////
// //Bid
// var bid = require("./bid.js");
// var Bid = bid.Bid;
// var bidList = new Array(
	// //("id", "product", "username", "bid amount", "time limit hours", "winner username")
	// new Bid("001", "La Llamarada", "Pathwalker", "10", "5", "Pathwalker")
// );
// ///////////////////////////////////////////////////////////////////////////
// 
// ///////////////////////////////////////////////////////////////////////////
// //shipping
// var shipping = require("./shipping.js");
// var Shipping = shipping.Shipping;
// var shippingList = new Array(
	// //("shipping id", "from", "to", "username", "product", "shipping cost" "shipping method")
	// new Shipping ("07", "New York", "Puerto Rico", "Pathwalker", "La Llamarada", "3", "UPS")
// );
// ///////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////
//items


var item = require("./item.js");
var Item = item.Item;
var itemList = new Array(
	new Item("Stripes Shirt", "Volcom", "Medium", "14.99", "",  "Volcom", "JammyVM", "10", "5")

);


app.get('/BitmartServer/items', function(req, res) {
	console.log("GET");
	//var tom = {"title" : "Ford", "author" : "Escape", "year" : "2013", "description" : "V4 engine, 30mpg, Gray", "price" : "$18,000"};
	//var tom = new Car("Ford", "Escape", "2013", "V4 engine, 30mpg, Gray", "$18,000");
	//console.log("tom: " + JSON.stringify(tom));
	var response = {"items" : itemList};
	res.json(response);
});


 var itemNextId = 0;
 
for (var i=0; i < itemList.length;++i){
	itemList[i].id = itemNextId++;
}




// REST Operation - HTTP GET to read an item based on its id
app.get('/BitmartServer/items/:id', function(req, res) {
	var id = req.params.id;
		console.log("GET item: " + id);

	if ((id < 0) || (id >= itemNextId)){
		// not found
		res.statusCode = 404;
		res.send("Item not found.");
	}
	else {
		var target = -1;
		for (var i=0; i < itemList.length; ++i){
			if (itemList[i].id == id){
				target = i;
				break;	
			}
		}
		if (target == -1){
			res.statusCode = 404;
			res.send("Item not found.");
		}
		else {
			var response = {"items" : itemList[target]};
  			res.json(response);	
  		}	
	}
});


// REST Operation - HTTP POST to add a new item
app.post('/BitmartServer/items', function(req, res) {
	console.log("POST");

if(!req.body.hasOwnProperty('name') || !req.body.hasOwnProperty('model')
  	|| !req.body.hasOwnProperty('description') || !req.body.hasOwnProperty('price') ||/* !req.body.hasOwnProperty('photo')
  	||  !req.body.hasOwnProperty('brand') || */ !req.body.hasOwnProperty('username') ||  !req.body.hasOwnProperty('quantity')
  	||  !req.body.hasOwnProperty('instorage')) {
    	res.statusCode = 400;
    	return res.send('Error: Missing fields for product.');
  	}

  	var newItem = new Item(req.body.name, req.body.model, req.body.description, req.body.price, "","",req.body.username
  	, req.body.quantity, req.body.instorage);
  	console.log("New Item: " + JSON.stringify(newItem));
  	newItem.id = itemNextId++;
  	itemList.push(newItem);
  	res.json(true);
});



//end items
//////////////////////////////////////////////////////////////////////
 var productNextId = 0;
 
for (var i=0; i < productList.length;++i){
	productList[i].id = productNextId++;
}
// REST Operations
// Idea: Data is created, read, updated, or deleted through a URL that 
// identifies the resource to be created, read, updated, or deleted.
// The URL and any other input data is sent over standard HTTP requests.
// Mapping of HTTP with REST 
// a) POST - Created a new object. (Database create operation)
// b) GET - Read an individual object, collection of object, or simple values (Database read Operation)
// c) PUT - Update an individual object, or collection  (Database update operation)
// d) DELETE - Remove an individual object, or collection (Database delete operation)

// REST Operation - HTTP GET to read all cars
app.get('/BitmartServer/products', function(req, res) {
	console.log("GET");
	//var tom = {"title" : "Ford", "author" : "Escape", "year" : "2013", "description" : "V4 engine, 30mpg, Gray", "price" : "$18,000"};
	//var tom = new Car("Ford", "Escape", "2013", "V4 engine, 30mpg, Gray", "$18,000");
	//console.log("tom: " + JSON.stringify(tom));
	var response = {"products" : productList};
  	res.json(response);
});

// REST Operation - HTTP GET to read a car based on its id
app.get('/BitmartServer/products/:id', function(req, res) {
	var id = req.params.id;
		console.log("GET product: " + id);

	if ((id < 0) || (id >= productNextId)){
		// not found
		res.statusCode = 404;
		res.send("Product not found.");
	}
	else {
		var target = -1;
		for (var i=0; i < productList.length; ++i){
			if (productList[i].id == id){
				target = i;
				break;	
			}
		}
		if (target == -1){
			res.statusCode = 404;
			res.send("Product not found.");
		}
		else {
			var response = {"product" : productList[target]};
  			res.json(response);	
  		}	
	}
});

// REST Operation - HTTP PUT to updated a car based on its id
app.put('/BitmartServer/products/:id', function(req, res) {
	var id = req.params.id;
		console.log("PUT product: " + id);

	if ((id < 0) || (id >= productNextId)){
		// not found
		res.statusCode = 404;
		res.send("Product not found.");
	}
	// Remember comment
	else if(!req.body.hasOwnProperty('name') || !req.body.hasOwnProperty('model')
  	|| !req.body.hasOwnProperty('description') || !req.body.hasOwnProperty('price') /*|| !req.body.hasOwnProperty('photo')
  	||  !req.body.hasOwnProperty('brand') */||  !req.body.hasOwnProperty('username') ||  !req.body.hasOwnProperty('quantity')
  	||  !req.body.hasOwnProperty('instorage')) {
    	res.statusCode = 400;
    	return res.send('Error: Missing fields for product.');
  	}
	else {
		var target = -1;
		for (var i=0; i < productList.length; ++i){
			if (productList[i].id == id){
				target = i;
				break;	
			}
		}
		if (target == -1){
			res.statusCode = 404;
			res.send("Product not found.");			
		}	
		else {
			var theProduct = productList[target];
			theProduct.name = req.body.name;
			theProduct.model = req.body.model;
			theProduct.description = req.body.description;
			theProduct.price = req.body.price;
			theProduct.photo = "req.body.photo";
			theProduct.brand = "req.body.brand";
			theProduct.username = req.body.username;
			theProduct.quantity = req.body.quantity;
			theProduct.instorage = req.body.instorage;
			var response = {"product" : theProduct};
  			res.json(response);		
  		}
	}
});

// REST Operation - HTTP DELETE to delete a car based on its id
app.del('/BitmartServer/products/:id', function(req, res) {
	var id = req.params.id;
		console.log("DELETE product: " + id);

	if ((id < 0) || (id >= productNextId)){
		// not found
		res.statusCode = 404;
		res.send("Product not found.");
	}
	else {
		var target = -1;
		for (var i=0; i < productList.length; ++i){
			if (productList[i].id == id){
				target = i;
				break;	
			}
		}
		if (target == -1){
			res.statusCode = 404;
			res.send("Product not found.");			
		}	
		else {
			productList.splice(target, 1);
  			res.json(true);
  		}		
	}
});

// REST Operation - HTTP POST to add a new a car
app.post('/BitmartServer/products', function(req, res) {
	console.log("POST");
// Remember comment
  	if(!req.body.hasOwnProperty('name') || !req.body.hasOwnProperty('model')
  	|| !req.body.hasOwnProperty('description') || !req.body.hasOwnProperty('price') ||/* !req.body.hasOwnProperty('photo')
  	||  !req.body.hasOwnProperty('brand') || */ !req.body.hasOwnProperty('username') ||  !req.body.hasOwnProperty('quantity')
  	||  !req.body.hasOwnProperty('instorage')) {
  		
    	res.statusCode = 400;
    	return res.send('Error: Missing fields for product.');
  	}

  	var newProduct = new Product(req.body.name, req.body.model, req.body.description, req.body.price, "req.body.photo",
  		"req.body.brand", req.body.username, req.body.quantity, req.body.instorage);
  	console.log("New Product: " + JSON.stringify(newProduct));
  	newProduct.id = productNextId++;
  	productList.push(newProduct);
  	res.json(true);
});





//get all cards
//cards


app.get('/BitmartServer/ccards', function(req, res) {
	console.log("GET");
	var response = {"ccards" : ccardList};
	res.json(response);
});


 var ccardNextId = 0;
 
for (var i=0; i < ccardList.length;++i){
	ccardList[i].id = ccardNextId++;
}




// REST Operation - HTTP GET to read an item based on its id
app.get('/BitmartServer/ccards/:id', function(req, res) {
	var id = req.params.id;
		console.log("GET ccard: " + id);

	if ((id < 0) || (id >= ccardNextId)){
		// not found
		res.statusCode = 404;
		res.send("Ccard not found.");
	}
	else {
		var target = -1;
		for (var i=0; i < ccardList.length; ++i){
			if (ccardList[i].id == id){
				target = i;
				break;	
			}
		}
		if (target == -1){
			res.statusCode = 404;
			res.send("Ccard not found.");
		}
		else {
			var response = {"ccards" : ccardList[target]};
  			res.json(response);	
  		}	
	}
});


// REST Operation - HTTP POST to add a new ccard
app.post('/BitmartServer/ccards', function(req, res) {
	console.log("POST");

  	if(!req.body.hasOwnProperty('cardNumber') || !req.body.hasOwnProperty('username')
  	|| !req.body.hasOwnProperty('expDate') || !req.body.hasOwnProperty('brand') || !req.body.hasOwnProperty('secCode')) {
    	res.statusCode = 400;
    	return res.send('Error: Missing fields for ccards.');
  	}

  	var newCcard = new Ccard(req.body.cardNumber, req.body.useraneme, req.body.expDate, req.body.brand, req.body.secCode);
  	console.log("New Ccard: " + JSON.stringify(newCcard));
  	newCcard.id = ccardNextId++;
  	ccardList.push(newCcard);
  	res.json(true);
});


//end card
////////////////////////////////////////////////



//////////////////////////////////////////////////////
//get of user


app.get('/BitmartServer/users', function(req, res) {
	console.log("GET");
	var response = {"users" : userList};
	res.json(response);
});


 var userNextId = 0;
 
for (var i=0; i < userList.length;++i){
	userList[i].id = userNextId++;
}




// REST Operation - HTTP GET to read an user based on its id
app.get('/BitmartServer/users/:id', function(req, res) {
	var id = req.params.id;
		console.log("GET user: " + id);

	if ((id < 0) || (id >= userNextId)){
		// not found
		res.statusCode = 404;
		res.send("User not found.");
	}
	else {
		var target = -1;
		for (var i=0; i < userList.length; ++i){
			if (userList[i].id == id){
				target = i;
				break;	
			}
		}
		if (target == -1){
			res.statusCode = 404;
			res.send("user not found.");
		}
		else {
			var response = {"users" : userList[target]};
  			res.json(response);	
  		}	
	}
});

////other methods of user
app.put('/BitmartServer/users/:id', function(req, res) {
	var id = req.params.id;
		console.log("PUT user: " + id);

	if ((id < 0) || (id >= userNextId)){
		// not found
		res.statusCode = 404;
		res.send("user not found.");
	}
	// Remember comment
	else if(!req.body.hasOwnProperty('username') || !req.body.hasOwnProperty('password')
  	|| !req.body.hasOwnProperty('firstname') || !req.body.hasOwnProperty('lastname') 
  	||  !req.body.hasOwnProperty('email')) {
    	res.statusCode = 400;
    	return res.send('Error: Missing fields for user.');
  	}
	else {
		var target = -1;
		for (var i=0; i < userList.length; ++i){
			if (userList[i].id == id){
				target = i;
				break;	
			}
		}
		if (target == -1){
			res.statusCode = 404;
			res.send("User not found.");			
		}	
		else {
			var theUser = userList[target];
			theUser.username = req.body.username;
			theUser.password = req.body.password;
			theUser.firstname = req.body.firstname;
			theUser.lastname = req.body.lastname;
			theUser.email = req.body.email;
			res.json(response);		
  		}
	}
});

// REST Operation - HTTP DELETE to delete a car based on its id
app.del('/BitmartServer/users/:id', function(req, res) {
	var id = req.params.id;
		console.log("DELETE user: " + id);

	if ((id < 0) || (id >= userNextId)){
		// not found
		res.statusCode = 404;
		res.send("user not found.");
	}
	else {
		var target = -1;
		for (var i=0; i < userList.length; ++i){
			if (userList[i].id == id){
				target = i;
				break;	
			}
		}
		if (target == -1){
			res.statusCode = 404;
			res.send("user not found.");			
		}	
		else {
			userList.splice(target, 1);
  			res.json(true);
  		}		
	}
});

// REST Operation - HTTP POST to add a new a car
app.post('/BitmartServer/users', function(req, res) {
	console.log("POST");
// Remember comment
  	if(!req.body.hasOwnProperty('username') || !req.body.hasOwnProperty('password')
  	|| !req.body.hasOwnProperty('firstname') || !req.body.hasOwnProperty('lastname') ||
  	 !req.body.hasOwnProperty('email') ) {
  		
    	res.statusCode = 400;
    	return res.send('Error: Missing fields for user.');
  	}

  	var newuser = new User(req.body.username, req.body.password, req.body.firstname, req.body.lastname,
  		 req.body.email);
  	console.log("New User: " + JSON.stringify(newUser));
  	newUser.id = userNextId++;
  	userList.push(newUser);
  	res.json(true);
});




//end user
//////////////////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////////////////
//address













/////////////////////////////////////////////////////////////////////////////////////
//address

 var addressNextId = 0;
 
for (var i=0; i < addressList.length;++i){
	addressList[i].id = addressNextId++;
}
app.get('/BitmartServer/addresses', function(req, res) {
	console.log("GET");
	
	var response = {"addresses" : addressList};
  	res.json(response);
});
// REST Operation - HTTP GET to read a car based on its id
app.get('/BitmartServer/addresses/:id', function(req, res) {
	var id = req.params.id;
		console.log("GET address: " + id);
	if ((id < 0) || (id >= addressNextId)){
		// not found
		res.statusCode = 404;
		res.send("Car not found.");
	}
	else {
		var target = -1;
		for (var i=0; i < addressList.length; ++i){
			if (addressList[i].id == id){
				target = i;
				break;	
			}
		}
		if (target == -1){
			res.statusCode = 404;
			res.send("address not found.");
		}
		else {
			var response = {"address" : addressList[target]};
  			res.json(response);	
  		}	
	}
});
// REST Operation - HTTP PUT to updated a car based on its id
app.put('/BitmartServer/addresses/:id', function(req, res) {
	var id = req.params.id;
		console.log("PUT address: " + id);
	if ((id < 0) || (id >= addressNextId)){
		// not found
		res.statusCode = 404;
		res.send("Address not found.");
	}
	else if(!req.body.hasOwnProperty('mailAddress') || !req.body.hasOwnProperty('city')
  	|| !req.body.hasOwnProperty('country') || !req.body.hasOwnProperty('zipcode') || !req.body.hasOwnProperty('username')) {
    	res.statusCode = 400;
    	return res.send('Error: Missing fields for address.');
  	}
	else {
		var target = -1;
		for (var i=0; i < addressList.length; ++i){
			if (addressList[i].id == id){
				target = i;
				break;	
			}
		}
		if (target == -1){
			res.statusCode = 404;
			res.send("Address not found.");			
		}	
		else {
			var theAddress= addressList[target];
			theAddress.mailAddress = req.body.mailAddress;
			theAddress.city = req.body.city;
			theAddress.country = req.body.country;
			theAddress.zipcode = req.body.zipcode;
			theAddress.username = req.body.username;
			var response = {"Address" : theAddress};
  			res.json(response);		
  		}
	}
});
// REST Operation - HTTP DELETE to delete a car based on its id
app.del('/BitmartServer/addresses/:id', function(req, res) {
	var id = req.params.id;
		console.log("DELETE address: " + id);
	if ((id < 0) || (id >= addressNextId)){
		// not found
		res.statusCode = 404;
		res.send("Address not found.");
	}
	else {
		var target = -1;
		for (var i=0; i < addressList.length; ++i){
			if (addressList[i].id == id){
				target = i;
				break;	
			}
		}
		if (target == -1){
			res.statusCode = 404;
			res.send("Address not found.");			
		}	
		else {
			addressList.splice(target, 1);
  			res.json(true);
  		}		
	}
});
// REST Operation - HTTP POST to add a new a car
app.post('/BitmartServer/addresses', function(req, res) {
	console.log("POST");
  	if(!req.body.hasOwnProperty('mailAddress') || !req.body.hasOwnProperty('city')
  	|| !req.body.hasOwnProperty('country') || !req.body.hasOwnProperty('zipcode') || !req.body.hasOwnProperty('username')) {
    	res.statusCode = 400;
    	return res.send('Error: Missing fields for address.');
  	}
  	var newAddress = new Address(req.body.mailAddress, req.body.city, req.body.country, req.body.zipcode, req.body.username);
  	console.log("New Address: " + JSON.stringify(newAddress));
  	newAddress.id = addressNextId++;
  	addressList.push(newAddress);
  	res.json(true);
});



                                    
/////////////////////////////////////////
///bid beggining
var bid = require("./bid.js");
var Bid = bid.Bid;
var bidList = new Array(
	new Bid("La Llamarada", "Pathwalker", "5.00")

);


app.get('/BitmartServer/bids', function(req, res) {
	console.log("GET");
	//var tom = {"title" : "Ford", "author" : "Escape", "year" : "2013", "description" : "V4 engine, 30mpg, Gray", "price" : "$18,000"};
	//var tom = new Car("Ford", "Escape", "2013", "V4 engine, 30mpg, Gray", "$18,000");
	//console.log("tom: " + JSON.stringify(tom));
	var response = {"bids" : bidList};
	res.json(response);
});


 var bidNextId = 0;
 
for (var i=0; i < bidList.length;++i){
	bidList[i].id = bidNextId++;
}




// REST Operation - HTTP GET to read an item based on its id
app.get('/BitmartServer/bids/:id', function(req, res) {
	var id = req.params.id;
		console.log("GET bid: " + id);

	if ((id < 0) || (id >= bidNextId)){
		// not found
		res.statusCode = 404;
		res.send("Bid not found.");
	}
	else {
		var target = -1;
		for (var i=0; i < bidList.length; ++i){
			if (bidList[i].id == id){
				target = i;
				break;	
			}
		}
		if (target == -1){
			res.statusCode = 404;
			res.send("Bids not found.");
		}
		else {
			var response = {"bids" : bidList[target]};
  			res.json(response);	
  		}	
	}
});


// REST Operation - HTTP POST to add a new bid
app.post('/BitmartServer/bids', function(req, res) {
	console.log("POST");

if(!req.body.hasOwnProperty('bidproduct') || !req.body.hasOwnProperty('bidusernamne')
  	|| !req.body.hasOwnProperty('bitamount')) {
    	res.statusCode = 400;
    	return res.send('Error: Missing fields for product.');
  	}

  	var newBid = new Bid(req.body.product, req.body.username, req.body.bidamount,"","");
  	console.log("New Bid: " + JSON.stringify(newBid));
  	newBid.id = bidNextId++;
  	bidList.push(newBid);
  	res.json(true);
});
//////bid end
////////////////////////////////

// Server starts running when listen is called.
app.listen(process.env.PORT || 3412);
console.log("server listening");
