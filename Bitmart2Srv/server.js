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

////////////////////////Categorias///////////////////////////////
////////////////////////////////////////////////////////////////

var bankaccount = require("./bankaccount.js");
var Bankaccount = bankaccount.Bankaccount;
var bankaccountList = new Array(
	//( "bankaccountnumber", "bankname")
	new Bankaccount ("7", "PayPal", 1)
	
);
var category = require("./category.js");
var Category = category.Category;

var categoryList = new Array(
	new Category("Books", "Menu", 4, 0),
	new Category("Electronics", "Menu", 5, 0),
	new Category("Computer", "Menu", 4, 0),
	new Category("Clothing", "Menu", 3, 0),
	new Category("Shoes", "Menu", 3, 0),
	new Category("Sports", "Menu", 5, 0),
	
	new Category("Children", "Books", 0, 1),
	new Category("Fiction", "Books", 0, 1),
	new Category("Technology", "Books", 0, 1),
	new Category("Business", "Books", 0, 1),

	new Category("TV", "Electronics", 0, 1),
	new Category("Audio", "Electronics", 0, 1),
	new Category("Phones", "Electronics", 0, 1),
	new Category("Cameras", "Electronics", 0, 1),
	new Category("Video", "Electronics", 0, 1),
	
	new Category("Laptops", "Computer", 0, 1),
	new Category("Desktops", "Computer", 0, 1),
	new Category("Tablets", "Computer", 0, 1),
	new Category("Printers", "Computer", 0, 1),
	
	new Category("Child Clothes", "Clothing", 0, 1),
	new Category("Men Clothes" , "Clothing", 3, 1),
	new Category("Women Clothes", "Clothing", 3, 1),
	
	new Category("Men Shirts", "Men", 0, 2),
	new Category("Men Pants", "Men", 0, 2),
	new Category("Men Socks", "Men", 0, 2),

	new Category("Women Shirts", "Women", 0, 2),
	new Category("Women Pants", "Women", 0, 2),
	new Category("Women Dresses", "Women", 0, 2),

	new Category("Child Shoes", "Shoes", 0, 1),
	new Category("Women Shoes", "Shoes", 0, 1),
	new Category("Men Shoes", "Shoes", 0, 1),


	new Category("Bicycles", "Sports", 4, 1),
	new Category("Fishing", "Sports", 0, 1),
	new Category("Baseball", "Sports", 0, 1),
	new Category("Golf", "Sports", 0, 1),
	new Category("Basketball", "Sports", 0, 1),

	new Category("Frames", "Bicycles", 0, 2),
	new Category("Wheels", "Bicycles", 0, 2),
	new Category("Helmet", "Bicycles", 0, 2),
	new Category("Parts", "Bicycles", 0, 2)

	
);
	

 var categoryNextId = 0;
 
for (var i=0; i < categoryList.length;++i){
	categoryList[i].cid = categoryNextId++;
}

////////////////////////Productos////////////////////////////////
////////////////////////////////////////////////////////////////

var products = require("./products.js");
var Products = products.Products;

var productList = new Array(
	// Product(uid, cid, pname, pmodel, pdescription, pprice, pbidprice, pphoto, pbrand, pquantity, pinstorage)
	new Products(1,2, "La Llamarada", "Enrique Laguerre", "New 2010", "25", "5" ,"photo", "Fiction", "5", "3"),
	new Products(1,2,"La Charca", "Manuel Zeno Gandia", "Used 2009", "10", "3", "photo",  "Fiction", "6", "4"),
	new Products(1,2,"Physics 2nd Ed", "Giancoli", "Used 1990", "3", "3", "photo",  "Children", "1", "1"),
	new Products(1,2,"Calculus 7th Ed", "James Stewart", "Used 1999", "7", "3", "photo",  "Children", "6", "4"),
	new Products(1,2,"Data Structures 2nd Ed", "Manuel Perez", "Used 2001", "10", "3", "photo",  "Fiction", "6", "4")
);

var productNextId = 0;
 
for (var i=0; i < productList.length;++i){
	productList[i].pid = productNextId++;
}
// app.get('/Bitmart2Srv/products', function(req, res) {
	// console.log("GET");
	// var response = {"products" : productList};
  	// res.json(response);
// });
// 
// 
// app.get('/Bitmart2Srv/products/:pid', function(req, res) {
	// var pid = req.params.pid;
		// console.log("GET product: " + pid);
// 
	// if ((pid < 0) || (pid >= productNextId)){
		// // not found
		// res.statusCode = 404;
		// res.send("Product not found.");
	// }
	// else {
		// var target = -1;
		// for (var i=0; i < productList.length; ++i){
			// if (productList[i].pid == pid){
				// target = i;
				// break;	
			// }
		// }
		// if (target == -1){
			// res.statusCode = 404;
			// res.send("Product not found.");
		// }
		// else {
			// var response = {"product" : productList[target]};
  			// res.json(response);	
  		// }	
	// }
// 	
// });

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
// app.get('/Bitmart2Srv/categories', function(req, res) {
	// console.log("GET");
	// //var tom = {"make" : "Ford", "model" : "Escape", "year" : "2013", "description" : "V4 engine, 30mpg, Gray", "price" : "$18,000"};
	// //var tom = new Car("Ford", "Escape", "2013", "V4 engine, 30mpg, Gray", "$18,000");
	// //console.log("tom: " + JSON.stringify(tom));
	// var response = {"categories" : categoryList};
  	// res.json(response);
// });
// 
// // REST Operation - HTTP GET to read a car based on its id
// app.get('/Bitmart2Srv/categories/:cid', function(req, res) {
	// var cid = req.params.cid;
		// console.log("GET category: " + cid);
// 
	// if ((cid < 0) || (cid >= categoryNextId)){
		// // not found
		// res.statusCode = 404;
		// res.send("Category not found.");
	// }
	// else {
		// var target = -1;
		// for (var i=0; i < categoryList.length; ++i){
			// if (categoryList[i].cid == cid){
				// target = i;
				// break;	
			// }
		// }
		// if (target == -1){
			// res.statusCode = 404;
			// res.send("Category not found.");
		// }
		// else {
			// var response = {"category" : categoryList[target]};
  			// res.json(response);	
  		// }	
	// }
// });

// REST Operation - HTTP PUT to updated a car based on its id
app.put('/Bitmart2Srv/categories/:cid', function(req, res) {
	var id = req.params.cid;
		console.log("PUT category: " + cid);

	if ((cid < 0) || (cid >= categoryNextId)){
		// not found
		res.statusCode = 404;
		res.send("Category not found.");
	}
	else if(!req.body.hasOwnProperty('catname') || !req.body.hasOwnProperty('catsubmenu'|| !req.body.hasOwnProperty('catchild')
  	|| !req.body.hasOwnProperty('catdepth'))
  	 ) {
    	res.statusCode = 400;
    	return res.send('Error: Missing fields for category.');
  	}
	else {
		var target = -1;
		for (var i=0; i < categoryList.length; ++i){
			if (categoryList[i].cid == cid){
				target = i;
				break;	
			}
		}
		if (target == -1){
			res.statusCode = 404;
			res.send("Category not found.");			
		}	
		else {
			var theCategory= categoryList[target];
			theCategory.catname = req.body.catname;
			theCategory.catsubmenu = req.body.catsubmenu;
			theCategory.catchild = req.body.catchild;
			theCategory.catdepth = req.body.catdepth;
			var response = {"category" : theCategory};
  			res.json(response);		
  		}
	}
});

// REST Operation - HTTP DELETE to delete a car based on its id
app.del('/Bitmart2Srv/categories/:cid', function(req, res) {
	var cid = req.params.cid;
		console.log("DELETE category: " + cid);

	if ((cid < 0) || (cid >= categoryNextId)){
		// not found
		res.statusCode = 404;
		res.send("Category not found.");
	}
	else {
		var target = -1;
		for (var i=0; i < categoryList.length; ++i){
			if (categoryList[i].cid == cid){
				target = i;
				break;	
			}
		}
		if (target == -1){
			res.statusCode = 404;
			res.send("Category not found.");			
		}	
		else {
			categoryList.splice(target, 1);
  			res.json(true);
  		}		
	}
});

// REST Operation - HTTP POST to add a new a car
app.post('/Bitmart2Srv/categories', function(req, res) {
	console.log("POST");

  	if(!req.body.hasOwnProperty('catname') || !req.body.hasOwnProperty('catsubmenu')|| !req.body.hasOwnProperty('catchild')
  	|| !req.body.hasOwnProperty('catdepth')) {
    	res.statusCode = 400;
    	return res.send('Error: Missing fields for category.');
  	}

  	var newCategory = new Category(req.body.catname, req.body.catsubmenu, req.body.catchild, req.body.catdepth);
  	console.log("New Category: " + JSON.stringify(newCategory));
  	newCategory.cid = categoryNextId++;
  	categoryList.push(newCategory);
  	res.json(true);
});
/////////////////////////////////////////////////////////////////////
//users
var regularuser = require("./regularuser.js");
var Regularuser = regularuser.Regularuser;
var userList = new Array(
	//(username, upassword, ufirstname, ulastname, uemail, urating)
	new Regularuser("Pathwalker", "123", "Jose", "Ocasio", "jose.ocasio1@upr.edu", 5),
	new Regularuser("JammyVm", "123", "Jammy", "Velez", "jammy.velez@upr.edu", 4),
	new Regularuser("Heisenberg", "123", "Walter", "White", "walter.white@upr.edu", 5)
);



///////////////////////////////////////////////////////////////////////////////


//bid
var bid = require("./bid.js");
var Bid = bid.Bid;
var bidList = new Array(
	//(bamount, uid, eid, pid)
	new Bid(5, 1, 1, 3),
	new Bid(6, 1, 1, 3),
	new Bid(7, 1, 1, 3),
	new Bid(8, 1, 1, 3)
);
//address
var address = require("./address.js");
var Address = address.Address;
var addressList = new Array(
	//(amailaddress, acity, acountry, azipcode)
	new Address ("4008 Calle Medina Gonzales", "Mayaguez", "Puerto Rico", 00669),
	new Address ("4008 Calle Medina Gonzales", "Mayaguez", "Puerto Rico", 00680),
	new Address ("Meth Lab 003", "Del Paso", "Texas", 08682)
);
/////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////
//credit card
var creditcard = require("./creditcard.js");
var Creditcard = creditcard.Creditcard;
var ccardList = new Array(
	//(ccnumber, ccexpirationdate, ccbrand, ccsecuritycode, uid)
	new Creditcard(454951400788555, "06/18", "Visa", 777, 1),
	new Creditcard(454963745342611, "12/19", "Visa", 346, 1)
);

// REST Operation - HTTP PUT to updated a car based on its id
app.put('/Bitmart2Srv/products/:pid', function(req, res) {
	var pid = req.params.pid;
		console.log("PUT product: " + pid);

	if ((pid < 0) || (pid >= productNextId)){
		// not found
		res.statusCode = 404;
		res.send("Product not found.");
	}
	// Remember comment
	//(uid, cid, pname, pmodel, pdescription, pprice, pbidprice, pphoto, pbrand, pquantity, pinstorage)
	else if(!req.body.hasOwnProperty('uid') || !req.body.hasOwnProperty('cid')
  	|| !req.body.hasOwnProperty('pname') || !req.body.hasOwnProperty('pmodel') || !req.body.hasOwnProperty('pdescription') || !req.body.hasOwnProperty('pprice')
  	||  !req.body.hasOwnProperty('pbidprice') ||  !req.body.hasOwnProperty('pphoto') ||  !req.body.hasOwnProperty('pbrand')
  	||  !req.body.hasOwnProperty('pquantity')||  !req.body.hasOwnProperty('pinstorage')) {
    	res.statusCode = 400;
    	return res.send('Error: Missing fields for product.');
  	}
	else {
		var target = -1;
		for (var i=0; i < productList.length; ++i){
			if (productList[i].pid == pid){
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
			theProduct.uid = req.body.uid;
			theProduct.cid = req.body.cid;
			theProduct.pname = req.body.pname;
			theProduct.pmodel = req.body.pmodel;
			theProduct.pdescription = req.body.pdescription;
			theProduct.pprice = req.body.pprice;
			theProduct.pbidprice = req.body.pbidprice;
			theProduct.pphoto = req.body.pphoto;
			theProduct.pbrand = req.body.pbrand;
			theProduct.pquantity = req.body.pquantity;
			theProduct.pinstorage = req.body.pinstorage;
			var response = {"product" : theProduct};
  			res.json(response);
  		}
	}
});

// REST Operation - HTTP DELETE to delete a car based on its id
app.del('/Bitmart2Srv/products/:pid', function(req, res) {
	var pid = req.params.pid;
		console.log("DELETE product: " + pid);

	if ((pid < 0) || (pid >= productNextId)){
		// not found
		res.statusCode = 404;
		res.send("Product not found.");
	}
	else {
		var target = -1;
		for (var i=0; i < productList.length; ++i){
			if (productList[i].pid == pid){
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
app.post('/Bitmart2Srv/products', function(req, res) {
	console.log("POST");
// Remember comment
  	if(!req.body.hasOwnProperty('uid') || !req.body.hasOwnProperty('cid')
  	|| !req.body.hasOwnProperty('pname') || !req.body.hasOwnProperty('pmodel') || !req.body.hasOwnProperty('pdescription') || !req.body.hasOwnProperty('pprice')
  	||  !req.body.hasOwnProperty('pbidprice') ||  !req.body.hasOwnProperty('pphoto') ||  !req.body.hasOwnProperty('pbrand')
  	||  !req.body.hasOwnProperty('pquantity')||  !req.body.hasOwnProperty('pinstorage')) {
  		
    	res.statusCode = 400;
    	return res.send('Error: Missing fields for product.');
  	}

  	var newProduct = new Product(req.body.uid, req.body.cid, req.body.pname, req.body.pmodel, req.body.pdescription, req.body.pprice, req.body.pbidprice,
  		req.body.pphoto,req.body.pbrand, req.body.pquantity, req.body.pinstorage);
  	console.log("New Product: " + JSON.stringify(newProduct));
  	newProduct.pid = productNextId++;
  	productList.push(newProduct);
  	res.json(true);
});





//Credit card
///////////////////////////////////////////////////////////////////cards


 var ccardNextId = 0;
 
for (var i=0; i < ccardList.length;++i){
	ccardList[i].ccid = ccardNextId++;
}
// app.get('/Bitmart2Srv/ccards', function(req, res) {
	// console.log("GET");
// 	
	// var response = {"ccards" : ccardList};
  	// res.json(response);
// });
// // REST Operation - HTTP GET to read a car based on its id
// app.get('/Bitmart2Srv/ccards/:ccid', function(req, res) {
	// var ccid = req.params.ccid;
		// console.log("GET ccard: " + ccid);
	// if ((ccid < 0) || (ccid >= ccardNextId)){
		// // not found
		// res.statusCode = 404;
		// res.send("Ccard not found.");
	// }
	// else {
		// var target = -1;
		// for (var i=0; i < ccardList.length; ++i){
			// if (ccardList[i].ccid == ccid){
				// target = i;
				// break;	
			// }
		// }
		// if (target == -1){
			// res.statusCode = 404;
			// res.send("ccard not found.");
		// }
		// else {
			// var response = {"ccard" : ccardList[target]};
  			// res.json(response);	
  		// }	
	// }
// });


app.post('/Bitmart2Srv/ccards', function(req, res) {
	console.log("POST");
// Remember comment
//(ccnumber, ccexpirationdate, ccbrand, ccsecuritycode, uid)
  	if(!req.body.hasOwnProperty('ccnumber') || !req.body.hasOwnProperty('ccexpirationdate') 
  	|| !req.body.hasOwnProperty('ccbrand') || !req.body.hasOwnProperty('ccsecurityCode')|| !req.body.hasOwnProperty('uid')) {
  		
    	res.statusCode = 400;
    	return res.send('Error: Missing fields for product.');
  	}
  	var newCreditcard = new Creditcard(req.body.ccnumber, req.body.ccexpirationdate, req.body.ccbrand, req.body.ccsecuritycode, req.body.uid);
  	console.log("New Ccard: " + JSON.stringify(newCreditcard));
  	newCreditcard.id = ccardNextId++;
  	ccardList.push(newCreditcard);
  	res.json(true);
});

app.put('/Bitmart2Srv/ccards/:ccid', function(req, res) {
	var ccid = req.params.ccid;
		console.log("PUT ccard: " + ccid);
	if ((ccid < 0) || (ccid >= ccardNextId)){
		// not found
		res.statusCode = 404;
		res.send("Ccard not found.");
	}
	else if(!req.body.hasOwnProperty('ccnumber') || !req.body.hasOwnProperty('ccexpirationdate') 
  	|| !req.body.hasOwnProperty('ccbrand') || !req.body.hasOwnProperty('ccsecurityCode')|| !req.body.hasOwnProperty('uid')
  	) {
    	res.statusCode = 400;
    	return res.send('Error: Missing fields for ccard.');
  	}
	else {
		var target = -1;
		for (var i=0; i < ccardList.length; ++i){
			if (ccardList[i].ccid == ccid){
				target = i;
				break;	
			}
		}
		if (target == -1){
			res.statusCode = 404;
			res.send("Ccard not found.");			
		}	
		else {
			var theCcard= ccardList[target];
			theCcard.ccnumber = req.body.ccnumber;
			theCcard.ccexpirationdate = req.body.ccexpirationdate;
			theCcard.ccbrand = req.body.ccbrand;
			theCcard.ccsecuritycode = req.body.ccsecuritycode;
			theCcard.uid = req.body.uid;
			var response = {"Ccard" : theCcard};
  			res.json(response);		
  		}
	}
});
////////end put ccard
// REST Operation - HTTP DELETE to delete a car based on its id
app.del('/Bitmart2Srv/ccards/:ccid', function(req, res) {
	var ccid = req.params.ccid;
		console.log("DELETE ccard: " + ccid);
	if ((ccid < 0) || (ccid >= ccardNextId)){
		// not found
		res.statusCode = 404;
		res.send("Ccard not found.");
	}
	else {
		var target = -1;
		for (var i=0; i < ccardList.length; ++i){
			if (ccardList[i].ccid == ccid){
				target = i;
				break;	
			}
		}
		if (target == -1){
			res.statusCode = 404;
			res.send("Ccard not found.");			
		}	
		else {
			ccardList.splice(target, 1);
  			res.json(true);
  		}		
	}
});


 var userNextId = 0;
 
for (var i=0; i < userList.length;++i){
	userList[i].uid = userNextId++;
}

// app.get('/Bitmart2Srv/users', function(req, res) {
	// console.log("GET users");
	// var response = {"users" : userList};
	// res.json(response);
// });
// 
// 
// 
// // REST Operation - HTTP GET to read an user based on its id
// app.get('/Bitmart2Srv/users/:uid', function(req, res) {
	// var uid = req.params.uid;
		// console.log("GET user: " + uid);
// 
	// if ((uid < 0) || (uid >= userNextId)){
		// // not found
		// res.statusCode = 404;
		// res.send("User not found.");
	// }
	// else {
		// var target = -1;
		// for (var i=0; i < userList.length; ++i){
			// if (userList[i].uid == uid){
				// target = i;
				// break;	
			// }
		// }
		// if (target == -1){
			// res.statusCode = 404;
			// res.send("user not found.");
		// }
		// else {
			// var response = {"user" : userList[target]};
  			// res.json(response);	
  		// }	
	// }
// });

////other methods of user
app.put('/Bitmart2Srv/users/:uid', function(req, res) {
	var uid = req.params.uid;
		console.log("PUT user: " + uid);

	if ((uid < 0) || (uid >= userNextId)){
		// not found
		res.statusCode = 404;
		res.send("user not found.");
	}
	// Remember comment
	else if(!req.body.hasOwnProperty('username') || !req.body.hasOwnProperty('upassword')
  	|| !req.body.hasOwnProperty('ufirstname') || !req.body.hasOwnProperty('ulastname') 
  	||  !req.body.hasOwnProperty('uemail') ||  !req.body.hasOwnProperty('urating')) {
    	res.statusCode = 400;
    	return res.send('Error: Missing fields for user.');
  	}
	else {
		var target = -1;
		for (var i=0; i < userList.length; ++i){
			if (userList[i].uid == uid){
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
			theUser.upassword = req.body.upassword;
			theUser.ufirstname = req.body.ufirstname;
			theUser.ulastname = req.body.ulastname;
			theUser.uemail = req.body.uemail;
			theUser.urating = req.body.urating;
			var response = {"User" : theUser};
			res.json(response);		
  		}
	}
});

// REST Operation - HTTP DELETE to delete a car based on its id
app.del('/Bitmart2Srv/users/:uid', function(req, res) {
	var uid = req.params.uid;
		console.log("DELETE user: " + uid);

	if ((uid < 0) || (uid >= userNextId)){
		// not found
		res.statusCode = 404;
		res.send("user not found.");
	}
	else {
		var target = -1;
		for (var i=0; i < userList.length; ++i){
			if (userList[i].uid == uid){
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
app.post('/Bitmart2Srv/users', function(req, res) {
	console.log("POST");
// Remember comment
  	if(!req.body.hasOwnProperty('username') || !req.body.hasOwnProperty('upassword')
  	|| !req.body.hasOwnProperty('ufirstname') || !req.body.hasOwnProperty('ulastname') ||
  	 !req.body.hasOwnProperty('uemail') ||  !req.body.hasOwnProperty('urating')) {
  		
    	res.statusCode = 400;
    	return res.send('Error: Missing fields for user.');
  	}

  	var newUser = new Regularuser(req.body.username, req.body.upassword, req.body.ufirstname, req.body.ulastname,
  		 req.body.uemail, req.body.urating);
  	console.log("New User: " + JSON.stringify(newUser));
  	newUser.uid = userNextId++;
  	userList.push(newUser);
  	res.json(true);
});




//end user
//////////////////////////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////////////////////////
//address

 var addressNextId = 0;
 
for (var i=0; i < addressList.length;++i){
	addressList[i].aid = addressNextId++;
}
// app.get('/Bitmart2Srv/addresses', function(req, res) {
	// console.log("GET");
// 	
	// var response = {"addresses" : addressList};
  	// res.json(response);
// });
// // REST Operation - HTTP GET to read a car based on its id
// app.get('/Bitmart2Srv/addresses/:aid', function(req, res) {
	// var aid = req.params.aid;
		// console.log("GET address: " + aid);
	// if ((aid < 0) || (aid >= addressNextId)){
		// // not found
		// res.statusCode = 404;
		// res.send("Car not found.");
	// }
	// else {
		// var target = -1;
		// for (var i=0; i < addressList.length; ++i){
			// if (addressList[i].aid == aid){
				// target = i;
				// break;	
			// }
		// }
		// if (target == -1){
			// res.statusCode = 404;
			// res.send("address not found.");
		// }
		// else {
			// var response = {"address" : addressList[target]};
  			// res.json(response);	
  		// }	
	// }
// });
// REST Operation - HTTP PUT to updated a car based on its id
app.put('/Bitmart2Srv/addresses/:aid', function(req, res) {
	var aid = req.params.aid;
		console.log("PUT address: " + aid);
	if ((aid < 0) || (aid >= addressNextId)){
		// not found
		res.statusCode = 404;
		res.send("Address not found.");
	}
	//amailaddress, acity, acountry, azipcode
	else if(!req.body.hasOwnProperty('amailaddress') || !req.body.hasOwnProperty('acity')
  	|| !req.body.hasOwnProperty('acountry') || !req.body.hasOwnProperty('azipcode')) {
    	res.statusCode = 400;
    	return res.send('Error: Missing fields for address.');
  	}
	else {
		var target = -1;
		for (var i=0; i < addressList.length; ++i){
			if (addressList[i].aid == aid){
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
			theAddress.amailAddress = req.body.amailaddress;
			theAddress.acity = req.body.acity;
			theAddress.acountry = req.body.acountry;
			theAddress.azipcode = req.body.azipcode;
			var response = {"Address" : theAddress};
  			res.json(response);		
  		}
	}
});
// REST Operation - HTTP DELETE to delete a car based on its id
app.del('/Bitmart2Srv/addresses/:aid', function(req, res) {
	var aid = req.params.aid;
		console.log("DELETE address: " + aid);
	if ((aid < 0) || (aid >= addressNextId)){
		// not found
		res.statusCode = 404;
		res.send("Address not found.");
	}
	else {
		var target = -1;
		for (var i=0; i < addressList.length; ++i){
			if (addressList[i].aid == aid){
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
app.post('/Bitmart2Srv/addresses', function(req, res) {
	console.log("POST");
  	if(!req.body.hasOwnProperty('amailaddress') || !req.body.hasOwnProperty('acity')
  	|| !req.body.hasOwnProperty('acountry') || !req.body.hasOwnProperty('azipcode')) {
    	res.statusCode = 400;
    	return res.send('Error: Missing fields for address.');
  	}
  	var newAddress = new Address(req.body.amailaddress, req.body.acity, req.body.acountry, req.body.azipcode);
  	console.log("New Address: " + JSON.stringify(newAddress));
  	newAddress.aid = addressNextId++;
  	addressList.push(newAddress);
  	res.json(true);
});



                                    
/////////////////////////////////////////
///bid beggining

app.get('/Bitmart2Srv/bids', function(req, res) {
	console.log("GET");
	//var tom = {"title" : "Ford", "author" : "Escape", "year" : "2013", "description" : "V4 engine, 30mpg, Gray", "price" : "$18,000"};
	//var tom = new Car("Ford", "Escape", "2013", "V4 engine, 30mpg, Gray", "$18,000");
	//console.log("tom: " + JSON.stringify(tom));
	var response = {"bids" : bidList};
	res.json(response);
});


 var bidNextId = 0;
 
for (var i=0; i < bidList.length;++i){
	bidList[i].bid = bidNextId++;
}




// REST Operation - HTTP GET to read an item based on its id
app.get('/Bitmart2Srv/bids/:bid', function(req, res) {
	var bid = req.params.bid;
		console.log("GET bid: " + bid);

	if ((bid < 0) || (bid >= bidNextId)){
		// not found
		res.statusCode = 404;
		res.send("Bid not found.");
	}
	else {
		var target = -1;
		for (var i=0; i < bidList.length; ++i){
			if (bidList[i].bid == bid){
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
app.post('/Bitmart2Srv/bids', function(req, res) {
	console.log("POST");
////bamount, uid, eid, pid
if(!req.body.hasOwnProperty('bamount') || !req.body.hasOwnProperty('uid')
  	|| !req.body.hasOwnProperty('eid') || !req.body.hasOwnProperty('pid')) {
    	res.statusCode = 400;
    	return res.send('Error: Missing fields for product.');
  	}

  	var newBid = new Bid(req.body.bamount, req.body.uid, req.body.eid,req.body.pid);
  	console.log("New Bid: " + JSON.stringify(newBid));
  	newBid.bid = bidNextId++;
  	bidList.push(newBid);
  	res.json(true);
});
//////bid end
///////////
///////////Invoice/////////
var invoice = require("./invoice.js");
var Invoice = invoice.Invoice;

var invoiceList = new Array(
	///(iamount, itotalprice, pid, uid, ccid, bankid)
	new Invoice(2, 5.00, 4, 1, 1, 2),
	new Invoice(1, 8.00, 2, 1, 1, 2),
	new Invoice(1, 3.50, 6, 0, 0, 2));
 var invoiceNextId = 0;
 
for (var i=0; i < invoiceList.length;++i){
	invoiceList[i].iid = invoiceNextId++;
}
app.get('/Bitmart2Srv/invoices', function(req, res) {
  	console.log("SELECT * from invoice");
	
	var client = new pg.Client(conString);
	client.connect();

	var query = client.query("SELECT * from invoice");
	
	query.on("row", function (row, result) {
    	result.addRow(row);
	});
	query.on("end", function (result) {
		var response = {"invoices" : result.rows};
		client.end();
  		res.json(response);
 	});
});


app.get('/Bitmart2Srv/invoices2/:iid', function(req, res) {
	// var iid = req.params.iid;
		// console.log("GET invoice: " + iid);
// 
	// if ((iid < 0) || (iid >= invoiceNextId)){
		// // not found
		// res.statusCode = 404;
		// res.send("Invoice not found.");
	// }
	// else {
		// var target = -1;
		// for (var i=0; i < invoiceList.length; ++i){
			// if (invoiceList[i].iid == iid){
				// target = i;
				// break;	
			// }
		// }
		// if (target == -1){
			// res.statusCode = 404;
			// res.send("Invoice not found.");
		// }
		// else {
			// var response = {"invoice" : invoiceList[target]};
  			// res.json(response);	
  		// }	
	// }
	
	var id = req.params.bankid;
	console.log("SELECT * from invoice where iid = $1 " + id);
	
	var client = new pg.Client(conString);
	client.connect();

	var query = client.query("SELECT * from invoice where iid = $1", [id]);
	
	query.on("row", function (row, result) {
    	result.addRow(row);
	});
	query.on("end", function (result) {
		var len = result.rows.length;
		if (len == 0){
			res.statusCode = 404;
			res.send("Invoice not found.");
		}
		else {	
  			var response = {"invoice" : result.rows[0]};
			client.end();
  			res.json(response);
  		}
 	});
	
});

app.put('/Bitmart2Srv/invoices/:iid', function(req, res) {
	var iid = req.params.iid;
		console.log("PUT invoice: " + iid);

	if ((iid < 0) || (iid >= invoiceNextId)){
		// not found
		res.statusCode = 404;
		res.send("Invoice not found.");
	}
	// Remember comment
	//(iamount, itotalprice, pid, uid, ccid, bankid)
	else if(!req.body.hasOwnProperty('iid') || !req.body.hasOwnProperty('itotalprice')
  	|| !req.body.hasOwnProperty('pid') || !req.body.hasOwnProperty('uid') || !req.body.hasOwnProperty('ccid') || !req.body.hasOwnProperty('bankid')
  	) {
    	res.statusCode = 400;
    	return res.send('Error: Missing fields for invoice.');
  	}
	else {
		var target = -1;
		for (var i=0; i < invoiceList.length; ++i){
			if (invoiceList[i].iid == iid){
				target = i;
				break;	
			}
		}
		if (target == -1){
			res.statusCode = 404;
			res.send("Invoice not found.");			
		}	
		else {
			var theInvoice = invoiceList[target];
			theInvoice.iid = req.body.iid;
			theInvoice.itotalprice = req.body.itotalprice;
			theInvoice.pid = req.body.pid;
			theInvoice.uid = req.body.uid;
			theInvoice.ccid = req.body.ccid;
			theInvoice.bankid = req.body.bankid;
			var response = {"product" : theInvoice};
  			res.json(response);
  		}
	}
});

// REST Operation - HTTP DELETE to delete a car based on its id
app.del('/Bitmart2Srv/invoices/:iid', function(req, res) {
	var iid = req.params.iid;
		console.log("DELETE product: " + iid);

	if ((iid < 0) || (iid >= InvoiceNextId)){
		// not found
		res.statusCode = 404;
		res.send("Invoice not found.");
	}
	else {
		var target = -1;
		for (var i=0; i < invoiceList.length; ++i){
			if (invoiceList[i].iid == iid){
				target = i;
				break;	
			}
		}
		if (target == -1){
			res.statusCode = 404;
			res.send("Invoice not found.");			
		}	
		else {
			invoiceList.splice(target, 1);
  			res.json(true);
  		}		
	}
});

// REST Operation - HTTP POST to add a new a car
app.post('/Bitmart2Srv/invoices', function(req, res) {
	console.log("POST");
// Remember comment
  	if(!req.body.hasOwnProperty('iid') || !req.body.hasOwnProperty('itotalprice')
  	|| !req.body.hasOwnProperty('pid') || !req.body.hasOwnProperty('uid') || !req.body.hasOwnProperty('ccid') || !req.body.hasOwnProperty('bankid')
  	) {
  		
    	res.statusCode = 400;
    	return res.send('Error: Missing fields for invoice.');
  	}

  	var newInvoice = new Invoice(req.body.iid, req.body.itotalprice, req.body.pid, req.body.uid, req.body.ccid, req.body.bankid);
  	console.log("New Invoice: " + JSON.stringify(newInvoice));
  	newInvoice.iid = invoiceNextId++;
  	invoiceList.push(newInvoice);
  	res.json(true);
});

/////////////////////////////////shopping cart
/////////////////////////////////////////////////
var shoppingcart = require("./shoppingcart.js");
var ShoppingCart = shoppingcart.Shoppingcart;

var shoppingCartList = new Array(
	//Shoppingcart(sctotalprice, uid, ccid)
	new ShoppingCart ("190", 0),
	new ShoppingCart ("12", 1)
);

var shoppingCartNextId = 0;
 
for (var i=0; i < shoppingCartList.length;++i){
	shoppingCartList[i].scid = shoppingCartNextId++;
}
app.get('/Bitmart2Srv/shoppingCarts', function(req, res) {
	// console.log("GET");
	// var response = {"shoppingCart" : shoppingCartList};
  	// res.json(response);
  	
  	console.log("SELECT * from shoppingcart");
	
	var client = new pg.Client(conString);
	client.connect();

	var query = client.query("SELECT * from shoppingcart");
	
	query.on("row", function (row, result) {
    	result.addRow(row);
	});
	query.on("end", function (result) {
		var response = {"shoppingCarts" : result.rows};
		client.end();
  		res.json(response);
 	});
});


app.get('/Bitmart2Srv/shoppingCarts/:scid', function(req, res) {
var id = req.params.cid;
	console.log("GET shoppingCart: " + id);
	
	var client = new pg.Client(conString);
	client.connect();

	var query = client.query("SELECT * from shoppingcart where scid = $1", [id]);
	
	query.on("row", function (row, result) {
    	result.addRow(row);
	});
	query.on("end", function (result) {
		var len = result.rows.length;
		if (len == 0){
			res.statusCode = 404;
			res.send("SC not found.");
		}
		else {	
  			var response = {"shoppingCart" : result.rows[0]};
			client.end();
  			res.json(response);
  		}
 	});
	
});


app.put('/Bitmart2Srv/shoppingCarts/:scid', function(req, res) {
	var scid = req.params.scid;
		console.log("PUT shoppingCart: " + scid);

	if ((scid < 0) || (scid >= shoppingCartNextId)){
		// not found
		res.statusCode = 404;
		res.send("SC not found.");
	}
	else if(!req.body.hasOwnProperty('sctotalprice') || !req.body.hasOwnProperty('uid')
  	 ) {
    	res.statusCode = 400;
    	return res.send('Error: Missing fields for SC.');
  	}
	else {
		var target = -1;
		for (var i=0; i < shoppingCartList.length; ++i){
			if (shoppingCartList[i].scid == scid){
				target = i;
				break;	
			}
		}
		if (target == -1){
			res.statusCode = 404;
			res.send("Shopping Cart not found.");			
		}	
		else {
			var theShoppingCart= shoppingCartList[target];
			theShoppingCart.sctotalprice = req.body.sctotalprice;
			theShoppingCart.uid = req.body.uid;
			var response = {"shoppingCart" : theShoppingCart};
  			res.json(response);		
  		}
	}
});

// REST Operation - HTTP DELETE to delete a car based on its id
app.del('/Bitmart2Srv/shoppingCarts/:scid', function(req, res) {
	var scid = req.params.scid;
		console.log("DELETE shoppingCart: " + scid);

	if ((scid < 0) || (scid >= shoppingCartNextId)){
		// not found
		res.statusCode = 404;
		res.send("SC not found.");
	}
	else {
		var target = -1;
		for (var i=0; i < shoppingCartList.length; ++i){
			if (shoppingCartList[i].scid == scid){
				target = i;
				break;	
			}
		}
		if (target == -1){
			res.statusCode = 404;
			res.send("SC not found.");			
		}	
		else {
			shoppingCartList.splice(target, 1);
  			res.json(true);
  		}		
	}
});

// REST Operation - HTTP POST to add a new a car
app.post('/Bitmart2Srv/shoppingCarts', function(req, res) {
	console.log("POST");

  	if(!req.body.hasOwnProperty('sctotalprice') || !req.body.hasOwnProperty('uid')) {
    	res.statusCode = 400;
    	return res.send('Error: Missing fields for category.');
  	}

  	var newShoppingCart = new ShoppingCart(req.body.sctotalprice, req.body.uid);
  	console.log("New ShoppingCart: " + JSON.stringify(newShoppingCart));
  	newShoppingCart.scid = shoppingCartNextId++;
  	shoppingCartList.push(newShoppingCart);
  	res.json(true);
});


///////////////////////////////////contains products////////////////////

/////////////////////////////////////////////////
var containsproducts = require("./containsproducts.js");
var ContainsProducts = containsproducts.Containsproducts;

var containsProductsList = new Array(
	//(pid, scid)
	new ContainsProducts (1, 1),
	new ContainsProducts (2, 1)
);



/////////////////////aqui
app.get('/Bitmart2Srv/containsProducts2/:useridlis', function(req, res) {
	console.log("SELECT * from containsproducts natural join products where uid = " + userid);
	var userid =0;
	 userid = req.params.useridlis;
	
	var client = new pg.Client(conString);
	client.connect();

	var query = client.query("SELECT * from containsproducts natural join products where uid = $1", [userid]);
	
	query.on("row", function (row, result) {
    	result.addRow(row);
	});
	query.on("end", function (result) {
		var response = {"containsProducts" : result.rows};
		client.end();
  		res.json(response);
 	});
});


app.get('/Bitmart2Srv/containsProducts/:pid', function(req, res) {
	console.log("SELECT * from containsproducts where cid = " + id);
	
	var client = new pg.Client(conString);
	client.connect();

	var query = client.query("SELECT * from containsproducts where cid = $1", [id]);
	
	query.on("row", function (row, result) {
    	result.addRow(row);
	});
	query.on("end", function (result) {
		var len = result.rows.length;
		if (len == 0){
			res.statusCode = 404;
			res.send("CP not found.");
		}
		else {	
  			var response = {"containsProduct" : result.rows[0]};
			client.end();
  			res.json(response);
  		}
 	});
	
});


app.put('/Bitmart2Srv/containsProducts/:pid', function(req, res) {
	var id = req.params.pid;
		console.log("PUT containsProducts: " + pid);

	if ((pid < 0) || (pid >= containsProductsNextId)){
		// not found
		res.statusCode = 404;
		res.send("SC not found.");
	}
	else if(!req.body.hasOwnProperty('pid') || !req.body.hasOwnProperty('scid'))
  	  {
    	res.statusCode = 400;
    	return res.send('Error: Missing fields for containsProducts.');
  	}
	else {
		var target = -1;
		for (var i=0; i < containsProductsList.length; ++i){
			if (containsProductsList[i].scid == pid){
				target = i;
				break;	
			}
		}
		if (target == -1){
			res.statusCode = 404;
			res.send("containsProducts not found.");			
		}	
		else {
			var theContainsProducts= containsProductsList[target];
			theContainsProducts.pid = req.body.pid;
			theContainsProducts.scid = req.body.scid;

			var response = {"containsProducts" : theContainsProducts};
  			res.json(response);		
  		}
	}
});

// REST Operation - HTTP DELETE to delete a car based on its id
app.del('/Bitmart2Srv/containsProducts/:pid', function(req, res) {
	var pid = req.params.scid;
		console.log("DELETE containsProducts: " + pid);

	if ((pid < 0) || (pid >= containsProductsNextId)){
		// not found
		res.statusCode = 404;
		res.send("containsProducts not found.");
	}
	else {
		var target = -1;
		for (var i=0; i < containsProductsList.length; ++i){
			if (containsProductsList[i].pid == pid){
				target = i;
				break;	
			}
		}
		if (target == -1){
			res.statusCode = 404;
			res.send("containsProducts not found.");			
		}	
		else {
			containsProductsList.splice(target, 1);
  			res.json(true);
  		}		
	}
});

// REST Operation - HTTP POST to add a new a car
app.post('/Bitmart2Srv/containsProducts', function(req, res) {
	console.log("POST");

  	if(!req.body.hasOwnProperty('pid') || !req.body.hasOwnProperty('scid')) {
    	res.statusCode = 400;
    	return res.send('Error: Missing fields for containsProducts.');
  	}

  	var newContainsProducts = new ContainsProducts (req.body.pid, req.body.scid);
  	console.log("New ContainsProducts: " + JSON.stringify(newContainsProducts));
  	
  	containsProductsList.push(newContainsProducts);
  	res.json(true);
}); 
/////////////////////end contains




//////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////// fase 2 products////////////////////////////////////
var pg = require('pg');
var conString = "pg://postgres:admin@localhost:5432/bitmartDB";

app.get('/Bitmart2Srv/products', function(req, res) {
	console.log("SELECT * from products where psold = 'No'");
	
	var client = new pg.Client(conString);
	client.connect();

	var query = client.query("SELECT * from products where psold = 'No' ");
	
	query.on("row", function (row, result) {
    	result.addRow(row);
	});
	query.on("end", function (result) {
		var response = {"products" : result.rows};
		client.end();
  		res.json(response);
 	});
});

app.get('/Bitmart2Srv/products/:pid', function(req, res) {
	var id = req.params.pid;
	console.log("SELECT * from products where pid = " + id);
	
	var client = new pg.Client(conString);
	client.connect();

	var query = client.query("SELECT * from products where pid = $1", [id]);
	
	query.on("row", function (row, result) {
    	result.addRow(row);
	});
	query.on("end", function (result) {
		var len = result.rows.length;
		if (len == 0){
			res.statusCode = 404;
			res.send("Product not found.");
		}
		else {	
  			var response = {"product" : result.rows[0]};
			client.end();
  			res.json(response);
  		}
 	});

});
//////////////////end products/////////////////////////

///////////////////////address////////////////////////////

app.get('/Bitmart2Srv/addresses2/:useridlis', function(req, res) {
	var userid =0;
	
	 userid = req.params.useridlis;
	
	var client = new pg.Client(conString);
	client.connect();

	var query = client.query("SELECT * from address natural join hasaddress natural join regularuser where uid = $1", [userid]);
	console.log("SELECT * from address natural join hasaddress natural join regularuser where uid = " + userid);

	query.on("row", function (row, result) {
    	result.addRow(row);
	});
	query.on("end", function (result) {
		var response = {"addresses" : result.rows};
		client.end();
  		res.json(response);
 	});
});

app.get('/Bitmart2Srv/addresses/:aid', function(req, res) {
	var id = req.params.aid;
	console.log("SELECT * from address where aid = " + id);
	
	var client = new pg.Client(conString);
	client.connect();

	var query = client.query("SELECT * from address where aid = $1", [id]);
	
	query.on("row", function (row, result) {
    	result.addRow(row);
	});
	query.on("end", function (result) {
		var len = result.rows.length;
		if (len == 0){
			res.statusCode = 404;
			res.send("Address not found.");
		}
		else {	
  			var response = {"address" : result.rows[0]};
			client.end();
  			res.json(response);
  		}
 	});

});
///////////////end address//////////////

///////////////////users//////////////////////////
app.get('/Bitmart2Srv/users', function(req, res) {
	console.log("SELECT * from regularuser");
	
	var client = new pg.Client(conString);
	client.connect();

	var query = client.query("SELECT * from regularuser");
	
	query.on("row", function (row, result) {
    	result.addRow(row);
	});
	query.on("end", function (result) {
		var response = {"users" : result.rows};
		client.end();
  		res.json(response);
 	});
});

app.get('/Bitmart2Srv/users/:uid', function(req, res) {
	var id = req.params.uid;
	console.log("SELECT * from regularuser where uid = " + id);
	
	var client = new pg.Client(conString);
	client.connect();

	var query = client.query("SELECT * from regularuser where uid = $1", [id]);
	
	query.on("row", function (row, result) {
    	result.addRow(row);
	});
	query.on("end", function (result) {
		var len = result.rows.length;
		if (len == 0){
			res.statusCode = 404;
			res.send("User not found.");
		}
		else {	
  			var response = {"user" : result.rows[0]};
			client.end();
  			res.json(response);
  		}
 	});

});

/////////////////////end users/////////////////



//////////////credit card//////////////////

app.get('/Bitmart2Srv/ccards2/:useridlis', function(req, res) {
	var userid =0;
	 userid = req.params.useridlis;
	
	var client = new pg.Client(conString);
	client.connect();

	console.log("SELECT * from creditcard natural join regularuser where uid = " + userid);
	var query = client.query("SELECT * from creditcard natural join regularuser where uid = $1", [userid]);
	
	query.on("row", function (row, result) {
    	result.addRow(row);
	});
	query.on("end", function (result) {
		var response = {"ccards" : result.rows};
		client.end();
  		res.json(response);
 	});
});

app.get('/Bitmart2Srv/ccards/:ccid', function(req, res) {
	var id = req.params.ccid;
	console.log("SELECT * from creditcard where ccid = " + id);
	
	var client = new pg.Client(conString);
	client.connect();

	var query = client.query("SELECT * from creditcard where ccid = $1", [id]);
	
	query.on("row", function (row, result) {
    	result.addRow(row);
	});
	query.on("end", function (result) {
		var len = result.rows.length;
		if (len == 0){
			res.statusCode = 404;
			res.send("Credit Card not found.");
		}
		else {	
  			var response = {"ccard" : result.rows[0]};
			client.end();
  			res.json(response);
  		}
 	});

});

/////////////////end creditcard/////////////

/////admin////////////////////////


///////////////end admin////////////////////////
var administrator = require("./administrator.js");
var Administrator = administrator.Administrator;
var administratorList = new Array(
       //(username, upassword, ufirstname, ulastname, uemail)
       new Administrator("Pathwalker", "123", "Jose", "Ocasio", "jose.ocasio1@upr.edu"),
       new Administrator("JammyVm", "123", "Jammy", "Velez", "jammy.velez@upr.edu"),
       new Administrator("Heisenberg", "123", "Walter", "White", "walter.white@upr.edu")
);


var administratorNextId = 0;

for (var i=0; i < administratorList.length;++i){
       administratorList[i].adminid = administratorNextId++;
}

app.get('/Bitmart2Srv/administrators', function(req, res) {
       	console.log("SELECT * from administrator");
	
	var client = new pg.Client(conString);
	client.connect();

	var query = client.query("SELECT * from administrator");
	
	query.on("row", function (row, result) {
    	result.addRow(row);
	});
	query.on("end", function (result) {
		var response = {"administrators" : result.rows};
		client.end();
  		res.json(response);
 	});
});



// REST Operation - HTTP GET to read an user based on its id
app.get('/Bitmart2Srv/administrators/:adminid', function(req, res) {
	console.log("SELECT * from administrator where adminid = " + id);
	
	var client = new pg.Client(conString);
	client.connect();

	var query = client.query("SELECT * from administrator where adminid = $1", [id]);
	
	query.on("row", function (row, result) {
    	result.addRow(row);
	});
	query.on("end", function (result) {
		var len = result.rows.length;
		if (len == 0){
			res.statusCode = 404;
			res.send("Admin not found.");
		}
		else {	
  			var response = {"administrator" : result.rows[0]};
			client.end();
  			res.json(response);
  		}
 	});
});
 
 
 ////other methods of user
app.put('/Bitmart2Srv/administrators/:adminid', function(req, res) {
       var adminid = req.params.adminid;
               console.log("PUT administrator: " + adminid);

       if ((adminid < 0) || (adminid >= administratorNextId)){
               // not found
               res.statusCode = 404;
               res.send("administrator not found.");
       }
       // Remember comment
       else if(!req.body.hasOwnProperty('username') || !req.body.hasOwnProperty('upassword')
         || !req.body.hasOwnProperty('ufirstname') || !req.body.hasOwnProperty('ulastname') 
         ||  !req.body.hasOwnProperty('uemail') ) {
           res.statusCode = 400;
           return res.send('Error: Missing fields for administrator.');
         }
       else {
               var target = -1;
               for (var i=0; i < administratorList.length; ++i){
                       if (administratorList[i].adminid == adminid){
                               target = i;
                               break;        
                       }
               }
               if (target == -1){
                       res.statusCode = 404;
                       res.send("administrator not found.");                        
               }        
               else {
                       var theAdministrator = administratorList[target];
                       theAdministrator.username = req.body.username;
                       theAdministrator.upassword = req.body.upassword;
                       theAdministrator.ufirstname = req.body.ufirstname;
                       theAdministrator.ulastname = req.body.ulastname;
                       theAdministrator.uemail = req.body.uemail;
                       var response = {"Administrator" : theAdministrator};
                       res.json(response);                
                 }
       }
});

// REST Operation - HTTP DELETE to delete a car based on its id
app.del('/Bitmart2Srv/administrators/:adminid', function(req, res) {
       var adminid = req.params.adminid;
               console.log("DELETE administrator: " + adminid);

       if ((adminid < 0) || (adminid >= administratorNextId)){
               // not found
               res.statusCode = 404;
               res.send("administrator not found.");
       }
       else {
               var target = -1;
               for (var i=0; i < administratorList.length; ++i){
                       if (administratorList[i].uid == uid){
                               target = i;
                               break;        
                       }
               }
               if (target == -1){
                       res.statusCode = 404;
                       res.send("administrator not found.");                        
               }        
               else {
                       administratorList.splice(target, 1);
                         res.json(true);
                 }                
       }
});

// REST Operation - HTTP POST to add a new a car
app.post('/Bitmart2Srv/administrators', function(req, res) {
       console.log("POST");
// Remember comment
         if(!req.body.hasOwnProperty('username') || !req.body.hasOwnProperty('upassword')
         || !req.body.hasOwnProperty('ufirstname') || !req.body.hasOwnProperty('ulastname') ||
          !req.body.hasOwnProperty('uemail') ) {
                 
           res.statusCode = 400;
           return res.send('Error: Missing fields for administrator.');
         }

         var newAdministrator= new Administrator(req.body.username, req.body.upassword, req.body.ufirstname, req.body.ulastname,
                  req.body.uemail);
         console.log("New Administrator: " + JSON.stringify(newAdministrator));
         newAdministrator.adminid = administratorNextId++;
         administratorList.push(newAdministrator);
         res.json(true);
});
//////////////////bank account/////////////////////

app.get('/Bitmart2Srv/bankaccounts2/:useridlis', function(req, res) {
	var userid =0;
	 userid = req.params.useridlis;
	
	var client = new pg.Client(conString);
	client.connect();

	var query = client.query("SELECT * from bankaccount natural join regularuser where uid = $1", [userid]);
	console.log("SELECT * from bankaccount natural join regularuser where uid = " + userid);

	
	query.on("row", function (row, result) {
    	result.addRow(row);
	});
	query.on("end", function (result) {
		var response = {"bankaccounts" : result.rows};
		client.end();
  		res.json(response);
 	});
});


app.get('/Bitmart2Srv/bankaccounts/:bankid', function(req, res) {
	var id = req.params.bankid;
	console.log("SELECT * from bankaccount where bankid = " + id);
	
	var client = new pg.Client(conString);
	client.connect();

	var query = client.query("SELECT * from bankaccount where bankid = $1", [id]);
	
	query.on("row", function (row, result) {
    	result.addRow(row);
	});
	query.on("end", function (result) {
		var len = result.rows.length;
		if (len == 0){
			res.statusCode = 404;
			res.send("BAccount not found.");
		}
		else {	
  			var response = {"bankaccount" : result.rows[0]};
			client.end();
  			res.json(response);
  		}
 	});

});


////////////////end bank account/////////////////




///////////////////category//////////////////////
app.get('/Bitmart2Srv/categories', function(req, res) {
	// console.log("GET");
	// //var tom = {"make" : "Ford", "model" : "Escape", "year" : "2013", "description" : "V4 engine, 30mpg, Gray", "price" : "$18,000"};
	// //var tom = new Car("Ford", "Escape", "2013", "V4 engine, 30mpg, Gray", "$18,000");
	// //console.log("tom: " + JSON.stringify(tom));
	// var response = {"categories" : categoryList};
  	// res.json(response);
  	
  	console.log("SELECT * from category");
	
	var client = new pg.Client(conString);
	client.connect();

	var query = client.query("SELECT * from category");
	
	query.on("row", function (row, result) {
    	result.addRow(row);
	});
	query.on("end", function (result) {
		var response = {"categories" : result.rows};
		client.end();
  		res.json(response);
 	});
});

// REST Operation - HTTP GET to read a car based on its id
app.get('/Bitmart2Srv/categories/:cid', function(req, res) {
var id = req.params.cid;
	console.log("SELECT * from category where cid = " + id);
	
	var client = new pg.Client(conString);
	client.connect();

	var query = client.query("SELECT * from category where cid = $1", [id]);
	
	query.on("row", function (row, result) {
    	result.addRow(row);
	});
	query.on("end", function (result) {
		var len = result.rows.length;
		if (len == 0){
			res.statusCode = 404;
			res.send("Category not found.");
		}
		else {	
  			var response = {"category" : result.rows[0]};
			client.end();
  			res.json(response);
  		}
 	});
});

/////////////////end category///////////////



/////////////////////Server
 var bankaccountNextId = 0;
 
for (var i=0; i < bankaccountList.length;++i){
	bankaccountList[i].bankid = bankaccountNextId++;
}

app.put('/Bitmart2Srv/bankaccounts/:bankid', function(req, res) {
	var bankid = req.params.bankid;
		console.log("PUT bankaccount: " + bankid);
	if ((bankid < 0) || (bankid >= bankaccountNextId)){
		// not found
		res.statusCode = 404;
		res.send("Bankaccount not found.");
	}
	else if(!req.body.hasOwnProperty('bankaccountnumber') || !req.body.hasOwnProperty('bankname')) {
    	res.statusCode = 400;
    	return res.send('Error: Missing fields for bankaccount.');
  	}
	else {
		var target = -1;
		for (var i=0; i < bankaccountList.length; ++i){
			if (bankaccountList[i].bankid == bankid){
				target = i;
				break;	
			}
		}
		if (target == -1){
			res.statusCode = 404;
			res.send("Bankaccount not found.");			
		}	
		else {
			var theBankaccount= bankaccountList[target];
			theBankaccount.bankaccountnumber = req.body.bankaccountnumber;
			theBankaccount.bankname = req.body.bankname;
			// theBankaccount.uid = req.body.uid;
			var response = {"Bankaccount" : thebankaccount};
  			res.json(response);		
  		}
	}
});
// REST Operation - HTTP DELETE to delete a car based on its id
app.del('/Bitmart2Srv/bankaccounts/:bankid', function(req, res) {
	var bankid = req.params.bankid;
		console.log("DELETE bankaccount: " + bankid);
	if ((bankid < 0) || (bankid >= bankaccountNextId)){
		// not found
		res.statusCode = 404;
		res.send("Bankaccount not found.");
	}
	else {
		var target = -1;
		for (var i=0; i < bankaccountList.length; ++i){
			if (bankaccountList[i].bankid == bankid){
				target = i;
				break;	
			}
		}
		if (target == -1){
			res.statusCode = 404;
			res.send("Bankaccount not found.");			
		}	
		else {
			bankaccountList.splice(target, 1);
  			res.json(true);
  		}		
	}
});
// REST Operation - HTTP POST to add a new a car
app.post('/Bitmart2Srv/bankaccounts', function(req, res) {
	console.log("POST");
  	if(!req.body.hasOwnProperty('bankaccountnumber') || !req.body.hasOwnProperty('bankname')) {
    	res.statusCode = 400;
    	return res.send('Error: Missing fields for address.');
  	}
  	var newBankaccount = new Bankaccount(req.body.bankaccountnumber, req.body.bankname);
  	console.log("New Bankaccount: " + JSON.stringify(newBankaccount));
  	newBankaccount.bankid = bankaccountNextId++;
  	bankaccountList.push(newBankaccount);
  	res.json(true);
});
/////////////////////////////fin server



// Server starts running when listen is called.
app.listen(process.env.PORT || 3412);
console.log("server listening");
