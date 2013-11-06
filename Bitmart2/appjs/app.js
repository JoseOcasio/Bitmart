

$(document).on('pagebeforeshow', "#menus", function( event, ui ) {
	console.log("Jose");
	$.ajax({
		url : "http://localhost:3412/Bitmart2Srv/categories",
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var categoryList = data.categories;
			var len = categoryList.length;
			var list = $("#menus-list");
			list.empty();
			var category;
			for (var i=0; i < len; ++i){
				if(categoryList[i].catsubmenu == "Menu" ){
					category = categoryList[i];
					if(category.catchild > 0){
						list.append("<li><a onclick=GetCategory(" + category.cid + ")>" + 
							"<h2>" + category.catname +  "</h2>" +
							"<h2>" + category.cid +  "</h2>" +
							"</a></li>");
					}
					if(category.catchild == 0){
						list.append("<li><a onclick=GetCategory2(" + category.cid + ")>" + 
							"<h2>" + category.catname +  "</h2>" +
							"<h2>" + category.cid +  "</h2>" +
							"</a></li>");
					}
				}
				
				
			}
			list.listview("refresh");	
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			alert("Data not found!");
		}
	});
});

$(document).on('pagebeforeshow', "#submenus", function( event, ui ) {
console.log("Jose");
	$.ajax({
		url : "http://localhost:3412/Bitmart2Srv/categories",
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var categoryList = data.categories;
			var len = categoryList.length;
			var list = $("#submenus-list");
			list.empty();
			var category;
			for (var i=0; i < len; ++i){
				if(categoryList[i].catsubmenu == currentsubmenu ){
					category = categoryList[i];
					if(category.catchild > 0){
						list.append("<li><a onclick=GetCategory3(" + category.cid + ")>" + 
							"<h2>" + category.catname +  "</h2>" +
							"<h2>" + category.cid +  "</h2>" +
							"</a></li>");
					}
					if(category.catchild == 0){
						list.append("<li><a onclick=GetCategory2(" + category.cid + ")>" + 
							"<h2>" + category.catname +  "</h2>" +
							"<h2>" + category.cid +  "</h2>" +
							"</a></li>");
					}
				}
				
			}
			list.listview("refresh");	
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			alert("Data not found!");
		}
	});
});
$(document).on('pagebeforeshow', "#submenus2", function( event, ui ) {
console.log("Jose");
	$.ajax({
		url : "http://localhost:3412/Bitmart2Srv/categories",
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var categoryList = data.categories;
			var len = categoryList.length;
			var list = $("#submenus2-list");
			list.empty();
			var category;
			for (var i=0; i < len; ++i){
				if(categoryList[i].catsubmenu == currentsubmenu ){
					category = categoryList[i];
					
						list.append("<li><a onclick=GetCategory2(" + category.cid + ")>" + 
							"<h2>" + category.catname +  "</h2>" +
							"<h2>" + category.cid +  "</h2>" +
							"</a></li>");
					
				}
				
			}
			list.listview("refresh");	
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			alert("Data not found!");
		}
	});
});



$(document).on('pagebeforeshow', "#itemmenus", function( event, ui ) {
	console.log("Jose");
	$.ajax({
		url : "http://localhost:3412/Bitmart2Srv/products",
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var productList = data.products;
			var len = productList.length;
			var list = $("#itemmenus-list");
			list.empty();
			var product;
			var counter = 0;
			for (var i=0; i < len; ++i){
				
				if(productList[i].pbrand == currentCategory.catname){
					product = productList[i];
					list.append("<li><a onclick=GetProduct(" + product.pid + ")>" +  
					"<p> " + product.pname + "</p>" +
					"<p>"  + product.pmodel +  "</p>" +
					//"<p> Description: " + product.description + "</p>" + 
					"<p class=\"ui-li-aside\">" + accounting.formatMoney(product.pprice) + "</p>" +
					"<p> Bid:" + accounting.formatMoney(product.pbidprice) + "</p>" +
					"<p> Seller: " + product.uid + "</p>" + 
					"<p> Quantity: " + product.pquantity + "</p>" + 
					"<p> In Storage: " + product.pinstorage + "</p>" + 
					"</a></li>");
					counter++;
					
				}
				
				
			}
			if(counter < 1){
				
				list.append("<li> There are no items in this category</li>");
			}
			list.listview("refresh");	
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			alert("Data not found!");
		}
	});
});

var buyproductid = -1;
var buyproductname = ""; 
var	buyproductprice = ""; 

$(document).on('pagebeforeshow', "#product-view", function( event, ui ) {
	// currentProduct has been set at this point
	buyproductid = currentProduct.pid;
	buyproductname = currentProduct.pname;
	buyproductprice = currentProduct.pprice;
	$("#upd-name").val(currentProduct.pname);
	$("#upd-model").val(currentProduct.pmodel);
	$("#upd-description").val(currentProduct.pdescription);
	$("#upd-price").val(currentProduct.pprice);
	$("#upd-bidprice").val(currentProduct.pbidprice);
	$("#upd-seller").val(currentProduct.uid);
	$("#upd-quantity").val(currentProduct.pquantity);
	$("#upd-instorage").val(currentProduct.pinstorage);
	
		
});


$(document).on('pagebeforeshow', "#add-product", function( event, ui ) {
	$.ajax({
		url : "http://localhost:3412/Bitmart2Srv/categories",
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var categoryList = data.categories;
			var len = categoryList.length;
			var select = $("#new-brand");
			select.empty();
			var category;
			for (var i=0; i < len; ++i){
				if(categoryList[i].catchild == 0 ){
					category = categoryList[i];
					
						select.append("<option>" + category.catname + "</option>");
					
				}
				select.selectview(refresh);
				
			}
			
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			alert("Data not found!");
		}
	});

	
});

////////////////////////////////////////////////////////////////////////////////////////////////
/// Functions Called Directly from Buttons ///////////////////////

function ConverToJSON(formData){
	var result = {};
	$.each(formData, 
		function(i, o){
			result[o.name] = o.value;
	});
	return result;
}

var currentsubmenu = 'Books';
var currentCategory = {};

// function GetCategory(cid){
// 	
	// $.mobile.loading("show");
	// $.ajax({
		// url : "http://localhost:3412/Bitmart2Srv/categories/" + cid,
		// method: 'get',
		// contentType: "application/json",
		// dataType:"json",
		// success : function(data, textStatus, jqXHR){
			// currentCategory = data.category;
			// currentsubmenu = currentCategory.catname;
			// $.mobile.loading("hide");
			// $.mobile.navigate("#submenus");
// 			
		// },
		// error: function(data, textStatus, jqXHR){
			// console.log("textStatus: " + textStatus);
			// $.mobile.loading("hide");
			// if (data.status == 404){
				// alert("Category not found.");
			// }
			// else {
				// alert("Internal Server Error.");
			// }
		// }
	// });
// }
// 
// 
// function GetCategory2(cid){
// 	
	// $.mobile.loading("show");
	// $.ajax({
		// url : "http://localhost:3412/Bitmart2Srv/categories/" + cid,
		// method: 'get',
		// contentType: "application/json",
		// dataType:"json",
		// success : function(data, textStatus, jqXHR){
			// currentCategory = data.category;
			// currentsubmenu = currentCategory.catname;
			// $.mobile.loading("hide");
			// $.mobile.navigate("#itemmenus");
// 			
		// },
		// error: function(data, textStatus, jqXHR){
			// console.log("textStatus: " + textStatus);
			// $.mobile.loading("hide");
			// if (data.status == 404){
				// alert("Category not found.");
			// }
			// else {
				// alert("Internal Server Error.");
			// }
		// }
	// });
// }
// 
// function GetCategory3(cid){
// 	
	// $.mobile.loading("show");
	// $.ajax({
		// url : "http://localhost:3412/Bitmart2Srv/categories/" + cid,
		// method: 'get',
		// contentType: "application/json",
		// dataType:"json",
		// success : function(data, textStatus, jqXHR){
			// currentCategory = data.category;
			// currentsubmenu = currentCategory.catname;
			// $.mobile.loading("hide");
			// $.mobile.navigate("#submenus2");
// 			
		// },
		// error: function(data, textStatus, jqXHR){
			// console.log("textStatus: " + textStatus);
			// $.mobile.loading("hide");
			// if (data.status == 404){
				// alert("Category not found.");
			// }
			// else {
				// alter("Internal Server Error.");
			// }
		// }
	// });
// }


var currentProduct = {};

// function GetProduct(pid){
	// $.mobile.loading("show");
	// $.ajax({
		// url : "http://localhost:3412/Bitmart2Srv/products/" + pid,
		// method: 'get',
		// contentType: "application/json",
		// dataType:"json",
		// success : function(data, textStatus, jqXHR){
			// currentProduct = data.product;
			// $.mobile.loading("hide");
			// $.mobile.navigate("#product-view");
		// },
		// error: function(data, textStatus, jqXHR){
			// console.log("textStatus: " + textStatus);
			// $.mobile.loading("hide");
			// if (data.status == 404){
				// alert("Product not found.");
			// }
			// else {
				// alter("Internal Server Error.");
			// }
		// }
	// });
// }



 function SaveProduct(){
       $.mobile.loading("show");
       var form = $("#product-form");
       var formData = form.serializeArray();
       console.log("form Data: " + formData);
       var newProduct = ConverToJSON(formData);
       newProduct.uid = currentUser.uid;
       newProduct.cid = sellcid;
       newProduct.pbrand = sellcname;
       console.log("New Product: " + JSON.stringify(newProduct));
       var newProductJSON = JSON.stringify(newProduct);
       $.ajax({
               url : "http://localhost:3412/Bitmart2Srv/products",
               method: 'post',
               data : newProductJSON,
               contentType: "application/json",
               dataType:"json",
               success : function(data, textStatus, jqXHR){
                       $.mobile.loading("hide");
                       $.mobile.navigate("#menus");
               },
               error: function(data, textStatus, jqXHR){
                       console.log("textStatus: " + textStatus);
                       $.mobile.loading("hide");
                       alert("Data could not be added!");
                       $.mobile.navigate("#menus");
               }
       });
       $.mobile.navigate("#menus");

}

function UpdateProduct(){
	$.mobile.loading("show");
	var form = $("#product-view-form");
	var formData = form.serializeArray();
	console.log("form Data: " + formData);
	var updProduct = ConverToJSON(formData);
	updProduct.pid = currentProduct.pid;
	updProduct.pbrand = currentProduct.pbrand;
	updProduct.pphoto = "photo";
	updProduct.cid = 2;
	
	console.log("Updated Product: " + JSON.stringify(updProduct));
	var updProductJSON = JSON.stringify(updProduct);
	$.ajax({
		url : "http://localhost:3412/Bitmart2Srv/products/" + updProduct.pid,
		method: 'put',
		data : updProductJSON,
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			$.mobile.loading("hide");
			$.mobile.navigate("#itemmenus");
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			if (data.status == 404){
				alert("Data could not be updated!");
			}
			else {
				alert("Internal Error.");		
			}
		}
	});
}

function DeleteProduct(){
	$.mobile.loading("show");
	var pid = currentProduct.pid;
	$.ajax({
		url : "http://localhost:3412/Bitmart2Svr/products/" + pid,
		method: 'delete',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			$.mobile.loading("hide");
			$.mobile.navigate("#itemmenus");
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			if (data.status == 404){
				alert("Product not found.");
			}
			else {
				alter("Internal Server Error.");
			}
		}
	});
}



//////////////////////////////////////////////////////////////////

function convertContainsProducts(dbModel){
	var cliModel = {};
	
	cliModel.pid = dbModel.pid;
	cliModel.scid = dbModel.scid;
	return cliModel;
}



$(document).on('pagebeforeshow', "#cart", function( event, ui ) {
	console.log("Jose");
	$.ajax({
		url : "http://localhost:3412/Bitmart2Srv/containsProducts2/" + useridlis,
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var cartList = data.containsProducts; ////////////////////////////////NOTA
			var len = cartList.length;
			var list = $("#cart-list");
			list.empty();
			var item;
			for (var i=0; i < len; ++i){
				//<img src="http://jqfaq.com/wp-content/uploads/logo_v1.png">
				item = cartList[i];
				list.append("<li><a><p> "  +  item.pid + "</p>" +
				"<p>" + item.pname + "</p>" +  
				"<p>" + item.pprice + "</p>" + 
				"</a></li>");
			}
			list.listview("refresh");	
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			alert("Data not found!");
		}
	});
});

////////bid beg
$(document).on('pagebeforeshow', "#bid", function( event, ui ) {
	console.log("Jose");
	$.ajax({
		url : "http://localhost:3412/Bitmart2Srv/bids",
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var bidList = data.bids;
			var len = bidList.length;
			var list = $("#bids-list");
			list.empty();
			var bid;
			for (var i=0; i < len; ++i){
				//<img src="http://jqfaq.com/wp-content/uploads/logo_v1.png">
				bid = bidList[i];
				list.append("<li>  <a onclick=Getproduct(" + bid.bid + ")>" +
					"<h2> "  +  bid.pid + "</h2>" +
					"<img src =http://jqfaq.com/wp-content/uploads/logo_v1.png>"+
					"<p><strong>"  + bid.uid +  "</strong></p>" +					
					"<p class=\"ui-li-aside\">" + accounting.formatMoney(bid.bamount) + "</p>" +					
					"</a></li>");
			}
			list.listview("refresh");	
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			alert("Data not found!");
		}
	});
});
function UpdateBid(){
	$.mobile.loading("show");
	var form = $("#bid-view-form");
	var formData = form.serializeArray();
	console.log("form Data: " + formData);
	var updBid = ConverToJSON(formData);
	updBid.id = currentBid.id;
	console.log("Updated Bid: " + JSON.stringify(updBid));
	var updBidJSON = JSON.stringify(updBid);
	$.ajax({
		url : "http://localhost:3412/Bitmart2Srv/bids/" + updBid.bid,
		method: 'put',
		data : updBidJSON,
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			$.mobile.loading("hide");
			$.mobile.navigate("#bid");
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			if (data.status == 404){
				alert("Data could not be updated!");
			}
			else {
				alert("Internal Error.");		
			}
		}
	});
}


$(document).on('pagebeforeshow', "#bid-view", function( event, ui ) {
	// currentProduct has been set at this point
	$("#upd-bidproduct").val(currentBid.pid);
	$("#upd-bidusername").val(currentBid.uid);
	$("#upd-bidamount").val(currentBid.bamount);	
});


function SaveBid(){
	$.mobile.loading("show");
	var form = $("#bid-view-form");   //el add to cart
	var formData = form.serializeArray();
	console.log("form Data: " + formData);
	var newBid = ConverToJSON(formData);
	console.log("New Bid: " + JSON.stringify(newBid));
	var newBidJSON = JSON.stringify(newBid);
	$.ajax({
		url : "http://localhost:3412/Bitmart2Srv/bids",
		method: 'post',
		data : newBidJSON,
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			$.mobile.loading("hide");
			$.mobile.navigate("#bid");
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			alert("Data could not be added!");
		}
	});


}
var currentUser = {};
var useridlis = -1;
var islog = 0;
var currentCart = {};


function loginVerification(){
	$.mobile.loading("show");
	var username = document.getElementById("usernameLogin").value;
	var password = document.getElementById("passwordLogin").value;
	$.ajax({
		url : "http://localhost:3412/Bitmart2Srv/users/",
		method: 'get',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			var loginList = data.users;
			var len = loginList.length;
			var log;
			
			for (var i=0; i < len; ++i){
				log = loginList[i];
				if(username == log.username){
					if(password == log.upassword){
						currentUser = log;
						useridlis = log.uid;
						islog = 1;
						
						break;
					}
				}
			}
			if(islog == 0){
				alert("Wrong Username or Password!");
				$.mobile.loading("hide");
				
			}
			else{///////////////////////
	if(useridlis >=0){
	$.ajax({
		
		url : "http://localhost:3412/Bitmart2Srv/shoppingCarts/",
		method: 'get',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			var shoppingCartList = data.shoppingCarts;
			var len = shoppingCartList.length;
			var logi;
			for (var i=0; i < len; ++i){
				logi = shoppingCartList[i];
				if(logi.uid == useridlis){
					currentCart = logi;
					break;
				}
			}
			
				
			$.mobile.loading("hide");
			$.mobile.navigate("#menus");
			
		
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			if (data.status == 404){
				alert("user not found.");
			}
			else {
				alter("Internal Server Error.");
			}
		}
	});
	}
	//////////////////////
			}
		
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			if (data.status == 404){
				alert("user not found.");
			}
			else {
				alter("Internal Server Error.");
			}
		}
	});
}
var sctp = 0.00;
var countuid = 0;
function register(){
	$.mobile.loading("show");
	var username = document.getElementById("regusername").value;
	var email = document.getElementById("regemail").value;
	$.ajax({
		url : "http://localhost:3412/Bitmart2Srv/users/",
		method: 'get',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			var loginList = data.users;
			var len = loginList.length;
			var log;
			var count=0;
			countuid = len + 1;
			
			for (var i=0; i < len; ++i){
				log = loginList[i];
				if(username == log.username){
					alert("username already exist");
					count =1;
					break;
				}
				if(email == log.uemail){
					alert("email already exist");
					count=1;
					break;					
				}
			}
			if(count == 0){
				var form = $("#register-form");  
				var formData = form.serializeArray();
				console.log("form Data: " + formData);
				var newUser = ConverToJSON(formData);
				newUser.urating = 3;
				console.log("New User: " + JSON.stringify(newUser));
				var newUserJSON = JSON.stringify(newUser);
				$.ajax({
					url : "http://localhost:3412/Bitmart2Srv/users",
					method: 'post',
					data : newUserJSON,
					contentType: "application/json",
					dataType:"json",
					success : function(data, textStatus, jqXHR){
					alert(username +" was sucesfully added");
					
					//$.mobile.loading("hide");
					//$.mobile.navigate("#login");
					/////////////
				var newShoppingcart = {};
				newShoppingcart.sctotalprice = 0;
				newShoppingcart.uid = 0;
				newShoppingcart.sctotalprice = sctp;
				newShoppingcart.uid = countuid;
				console.log("New Cart Item: " + JSON.stringify(newShoppingcart));
				var newShoppingcartJSON = JSON.stringify(newShoppingcart);
				$.ajax({
					url : "http://localhost:3412/Bitmart2Srv/shoppingCarts",
					method: 'post',
					data : newShoppingcartJSON,
					contentType: "application/json",
					dataType:"json",
					success : function(data, textStatus, jqXHR){
						$.mobile.loading("hide");
						$.mobile.navigate("#login");
					},
					error: function(data, textStatus, jqXHR){
						console.log("textStatus: " + textStatus);
						$.mobile.loading("hide");
						alert("Data could not be added!");
					}
				});
					
					
					},
					error: function(data, textStatus, jqXHR){
						console.log("textStatus: " + textStatus);
						$.mobile.loading("hide");
						alert("Data could not be added!");
					}
				});
				
				
				
			}
			
			
			
			
			$.mobile.loading("hide");
			
			
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			if (data.status == 404){
				alert("user not found.");
			}
			else {
				alter("Internal Server Error.");
			}
		}
	});
}


///////////////////////////////////////////////////////////////credit cards

//lista credit card
var currentCcard = {};

// 
// function GetCcard(ccid){
	// $.mobile.loading("show");
	// $.ajax({
		// url : "http://localhost:3412/Bitmart2Srv/ccards/" + ccid,
		// method: 'get',
		// contentType: "application/json",
		// dataType:"json",
		// success : function(data, textStatus, jqXHR){
			// currentCcard = data.ccard;
			// $.mobile.loading("hide");
			// $.mobile.navigate("#ccard-view");
		// },
		// error: function(data, textStatus, jqXHR){
			// console.log("textStatus: " + textStatus);
			// $.mobile.loading("hide");
			// if (data.status == 404){
				// alert("Ccard not found.");
			// }
			// else {
				// alter("Internal Server Error.");
			// }
		// }
	// });
// }

$(document).on('pagebeforeshow', "#ccard-view", function( event, ui ) {
	// currentProduct has been set at this point
	$("#upd-cc-cardNumber").val(currentCcard.ccnumber);
	$("#upd-cc-expDate").val(currentCcard.ccexpirationdate);
	$("#upd-cc-brand").val(currentCcard.ccbrand);
	$("#upd-cc-secCode").val(currentCcard.ccsecuritycode);
});

function UpdateCcard(){
	$.mobile.loading("show");
	var form = $("#ccard-view-form");
	var formData = form.serializeArray();
	console.log("form Data: " + formData);
	var updCcard = ConverToJSON(formData);
	updCcard.ccid = currentCcard.ccid;
	updCcard.uid = currentUser.uid;
	console.log("Updated Ccard: " + JSON.stringify(updCcard));
	var updCcardJSON = JSON.stringify(updCcard);
	$.ajax({
		url : "http://localhost:3412/Bitmart2Srv/ccards/" + updCcard.ccid,
		method: 'put',
		data : updCcardJSON,
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			$.mobile.loading("hide");
			$.mobile.navigate("#creditcard");
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			if (data.status == 404){
				alert("Data could not be updated!");
			}
			else if(data.status == 400){
				alert("Missing field");
			}
			else {
				alert("Internal Error.");		
			}
		}
	});
}

///////////save ccard beg
function SaveCcard(){
	$.mobile.loading("show");
	var form = $("#ccard-form");
	var formData = form.serializeArray();
	console.log("form Data: " + formData);
	var newCcard = ConverToJSON(formData);
	newCcard.uid = currentUser.uid;
	console.log("New Ccard: " + JSON.stringify(newCcard));
	var newCcardJSON = JSON.stringify(newCcard);
	$.ajax({
		url : "http://localhost:3412/Bitmart2Srv/ccards",
		method: 'post',
		data : newCcardJSON,
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			$.mobile.loading("hide");
			$.mobile.navigate("#creditcard");
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			alert("Data could not be added!");
		}
	});
}


function DeleteCcard(){
	$.mobile.loading("show");
	var ccid = currentCcard.ccid;
	$.ajax({
		url : "http://localhost:3412/Bitmart2Srv/ccards/" + ccid,
		method: 'delete',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			$.mobile.loading("hide");
			$.mobile.navigate("#creditcard");
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			if (data.status == 404){
				alert("Ccard not found.");
			}
			else {
				alter("Internal Server Error.");
			}
		}
	});
}

$(document).on('pagebeforeshow', "#creditcard", function( event, ui ) {
	console.log("Jose");
	$.ajax({
		url : "http://localhost:3412/Bitmart2Srv/ccards2/" + useridlis,
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var ccardList = data.ccards;
			var len = ccardList.length;
			var list = $("#ccards-list");
			list.empty();
			var ccard;
			for (var i=0; i < len; ++i){
				
				ccard = ccardList[i];
				list.append("<li><a onclick=GetCcard(" + ccard.ccid + ")>" +  
					"<h2> Card Number: " + ccard.ccnumber + "</h2>" +
					"<p><strong> UserId: "  + ccard.uid +  "</strong></p>" +
					"<p> Expiration Date:  " + ccard.ccexpirationdate + "</p>" + 
					"<p> Brand: " + ccard.ccbrand + "</p>" +
					"<p> Security Code: " + ccard.ccsecuritycode + "</p>" +
					"</a></li>");
			}
			list.listview("refresh");	
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			alert("Data not found!");
		}
	});
});




//end credit cards

/////////////////////////////////////////////////////////////////////////
//get things of user
var currentUser1 = {};

function searchUser(){
	if(islog >= 1){
	GetUser(currentUser.uid);
	$.mobile.navigate("#account");
	}
	else{
		alert("You have to be logged in");
	}
	
}

///////////////////////////////////////GET VERDADERO
// function GetUser(uid){
	// $.mobile.loading("show");
	// $.ajax({
		// url : "http://localhost:3412/Bitmart2Srv/users/" + uid,
		// method: 'get',
		// contentType: "application/json",
		// dataType:"json",
		// success : function(data, textStatus, jqXHR){
			// currentUser1 = data.user;
			// $.mobile.loading("hide");
			// $.mobile.navigate("#account");
// 							
		// },
		// error: function(data, textStatus, jqXHR){
			// console.log("textStatus: " + textStatus);
			// $.mobile.loading("hide");
			// if (data.status == 404){
				// alert("User not found.");
			// }
			// else {
				// alter("Internal Server Error.");
			// }
		// }
	// });
// }
// 
// 


$(document).on('pagebeforeshow', "#account-info", function( event, ui ) {
		
	$("#upd-am-username").val(currentUser1.username);
	$("#upd-am-password").val(currentUser1.upassword);
	$("#upd-am-firstname").val(currentUser1.ufirstname);
	$("#upd-am-lastname").val(currentUser1.ulastname);
	$("#upd-am-email").val(currentUser1.uemail);
	$("#upd-am-rating").val(currentUser1.urating);

	
});

function UpdateUser(){
	$.mobile.loading("show");
	var form = $("#user-viewnew-form");
	var formData = form.serializeArray();
	console.log("form Data: " + formData);
	var updUser = ConverToJSON(formData);
	updUser.uid = currentUser1.uid;
	console.log("Updated User: " + JSON.stringify(updUser));
	var updUserJSON = JSON.stringify(updUser);
	$.ajax({
		url : "http://localhost:3412/Bitmart2Srv/users/" + updUser.uid,
		method: 'put',
		data : updUserJSON,
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			$.mobile.loading("hide");
			$.mobile.navigate("#account");
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			if (data.status == 404){
				alert("Data could not be updated!");
			}
			else {
				alert("Internal Error.");		
			}
		}
	});
}

//end user
///////////////////////////////////////////////////////////////////





/////////////////////////////////////////////////////////////////////////////
//address

var currentAddress = {};




// function GetAddress(aid){
	// $.mobile.loading("show");
	// $.ajax({
		// url : "http://localhost:3412/Bitmart2Srv/addresses/" + aid,
		// method: 'get',
		// contentType: "application/json",
		// dataType:"json",
		// success : function(data, textStatus, jqXHR){
			// currentAddress = data.address;
			// $.mobile.loading("hide");
			// $.mobile.navigate("#address-view");
		// },
		// error: function(data, textStatus, jqXHR){
			// console.log("textStatus: " + textStatus);
			// $.mobile.loading("hide");
			// if (data.status == 404){
				// alert("Address not found.");
			// }
			// else {
				// alter("Internal Server Error.");
			// }
		// }
	// });
// }

$(document).on('pagebeforeshow', "#address-view", function( event, ui ) {
	// currentProduct has been set at this point
	$("#upd-ad-mailAddress").val(currentAddress.amailaddress);
	$("#upd-ad-city").val(currentAddress.acity);
	$("#upd-ad-country").val(currentAddress.acountry);
	$("#upd-ad-zipcode").val(currentAddress.azipcode);
	
});



///////////save address beg
function SaveAddress(){
	$.mobile.loading("show");
	var form = $("#address-form");
	var formData = form.serializeArray();
	console.log("form Data: " + formData);
	var newAddress = ConverToJSON(formData);
	console.log("New Address: " + JSON.stringify(newAddress));
	var newAddressJSON = JSON.stringify(newAddress);
	$.ajax({
		url : "http://localhost:3412/Bitmart2Srv/addresses",
		method: 'post',
		data : newAddressJSON,
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			$.mobile.loading("hide");
			$.mobile.navigate("#address-menu");
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			alert("Data could not be added!");
		}
	});
}
/////save address end



function DeleteAddress(){
	$.mobile.loading("show");
	var aid = currentAddress.aid;
	$.ajax({
		url : "http://localhost:3412/Bitmart2Srv/addresses/" + aid,
		method: 'delete',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			$.mobile.loading("hide");
			$.mobile.navigate("#address-menu");
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			if (data.status == 404){
				alert("Ccard not found.");
			}
			else {
				alter("Internal Server Error.");
			}
		}
	});
}
////update address begg
function UpdateAddress(){
	$.mobile.loading("show");
	var form = $("#address-view-form");
	var formData = form.serializeArray();
	console.log("form Data: " + formData);
	var updAddress = ConverToJSON(formData);
	updAddress.aid = currentAddress.aid;
	console.log("Updated Address: " + JSON.stringify(updAddress));
	var updAddressJSON = JSON.stringify(updAddress);
	$.ajax({
		url : "http://localhost:3412/Bitmart2Srv/addresses/" + updAddress.aid,
		method: 'put',
		data : updAddressJSON,
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			$.mobile.loading("hide");
			$.mobile.navigate("#address-menu");
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			if (data.status == 404){
				alert("Data could not be updated!");
			}
			else {
				alert("Internal Error.");		
			}
		}
	});
}
/////update address end




$(document).on('pagebeforeshow', "#address-menu", function( event, ui ) {
	console.log("Jose");
	$.ajax({
		url : "http://localhost:3412/Bitmart2Srv/addresses2/" + useridlis,
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var addressList = data.addresses;
			var len = addressList.length;
			var list = $("#addresses-list");
			list.empty();
			var address;
			for (var i=0; i < len; ++i){
				
				address = addressList[i];
				list.append("<li><a onclick=GetAddress(" + address.aid + ")>" +  
					"<h2>" + address.amailaddress + "</h2>" +
					"<p><strong>"  + address.acity +  "</strong></p>" +
					"<p> " + address.acountry + "</p>" + 
					"<p>" + address.azipcode + "</p>" +
					"</a></li>");
			}
			list.listview("refresh");	
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			alert("Data not found!");
		}
	});
});

/////////////bid event///////////
$(document).on('pagebeforeshow', "#bidevent", function( event, ui ) {
	console.log("Jose");
	$.ajax({
		url : "http://localhost:3412/Bitmart2Srv/bids",
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var bidList = data.bids;
			var len = bidList.length;
			var list = $("#bidevent-list");
			list.empty();
			var bid;
			for (var i=0; i < len; ++i){
				//<img src="http://jqfaq.com/wp-content/uploads/logo_v1.png">
				bid = bidList[i];
				list.append("<li>  <a onclick=Getproduct(" + bid.bid + ")>" +
					"<h2> "  +  bid.pid + "</h2>" +
					// "<img src =http://jqfaq.com/wp-content/uploads/logo_v1.png>"+
					// "<p><strong>"  + bid.userid +  "</strong></p>" +					
					"<p class=\"ui-li-aside\">" + accounting.formatMoney(bid.bamount) + "</p>" +					
					"</a></li>");
			}
			list.listview("refresh");	
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			alert("Data not found!");
		}
	});
});

/////////////add category//////////

function addcategory(){
	$.mobile.loading("show");
	var Name = document.getElementById("addcatname").value;
	var Submenu = document.getElementById("addcatsubmenu").value;
	$.ajax({
		url : "http://localhost:3412/Bitmart2Srv/categories/",
		method: 'get',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			var catList = data.categories;
			var len = catList.length;
			var category;
			var count=0;
			var exist=0;
			
			for (var i=0; i < len; ++i){
				category = catList[i];
				if(Name == category.catname){
					alert("Category already exist");
					count =1;
					
				}
				if(Submenu == category.catsubmenu){
					exist = 1;
				}
				if(Submenu == category.catname){
					exist =  1;
				}
			}
			if(exist == 0){
				alert("Category Parrent don't exist");
			}
			if((count == 0) && (exist >=0)){
				var form = $("#category-form");  
				var formData = form.serializeArray();
				console.log("form Data: " + formData);
				var newCategory = ConverToJSON(formData);
				newCategory.catchild = 0;
				newCategory.catdepth = 1;
				console.log("New Category: " + JSON.stringify(newCategory));
				var newCategoryJSON = JSON.stringify(newCategory);
				$.ajax({
					url : "http://localhost:3412/Bitmart2Srv/categories",
					method: 'post',
					data : newCategoryJSON,
					contentType: "application/json",
					dataType:"json",
					success : function(data, textStatus, jqXHR){
					alert(Name +" was sucesfully added");
					
					$.mobile.loading("hide");
					$.mobile.navigate("#adminOptions-menu");
			
					},
					error: function(data, textStatus, jqXHR){
						console.log("textStatus: " + textStatus);
						$.mobile.loading("hide");
						alert("Data could not be added!");
					}
				});
			}
			
			$.mobile.loading("hide");
			
			
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			if (data.status == 404){
				alert("category not found.");
			}
			else {
				alter("Internal Server Error.");
			}
		}
	});
	$("#addcatname").val("");
	$("#addcatsubmenu").val("");
	
}

$(document).on('pagebeforeshow', "#deletecategory", function( event, ui ) {
console.log("Jose");
	$.ajax({
		url : "http://localhost:3412/Bitmart2Srv/categories",
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var categoryList = data.categories;
			var len = categoryList.length;
			var list = $("#deletecategory-list");
			list.empty();
			var category;
			for (var i=0; i < len; ++i){
				
					category = categoryList[i];
					
						list.append("<li><a onclick=deleteCategory(" + category.cid + ")>" + 
							"<h2>" + category.catname +  "</h2>" +
							
							"</a></li>");
					
				
				
			}
			list.listview("refresh");	
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			alert("Data not found!");
		}
	});
});

function deleteCategory(){
	alert("Category Deleted");
	$.mobile.navigate("#adminOptions-menu");
	
}
///////////////////////
///////////////////////
////////Buy now////////

function buynow(){
	if(islog >= 1){
	//GetUser(currentUser.uid);
	$.mobile.navigate("#selectad");
	}
	else{
		alert("You have to be logged in");
		$.mobile.navigate("#login");
	}
}
$(document).on('pagebeforeshow', "#selectad", function( event, ui ) {
	console.log("Jose");
	$.ajax({
		url : "http://localhost:3412/Bitmart2Srv/addresses2/" + useridlis,
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var addressList = data.addresses;
			var len = addressList.length;
			var list = $("#buyaddresses-list");
			list.empty();
			var address;
			for (var i=0; i < len; ++i){
				
				address = addressList[i];
				list.append("<li><a onclick=GetAddress2(" + address.aid + ")>" +  
					"<h2>" + address.amailaddress + "</h2>" +
					"<p><strong>"  + address.acity +  "</strong></p>" +
					"<p> " + address.acountry + "</p>" + 
					"<p>" + address.azipcode + "</p>" +
					"</a></li>");
			}
			list.listview("refresh");	
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			alert("Data not found!");
		}
	});
});
var buyaddressid = 0;

var buyccid =0;
var buyproductid = 0;
var buyamailaddress = "";
var buyccnumber = "";
function GetAddress2(aid){
	buyaddressid = aid;
	$.mobile.loading("show");
	$.ajax({
		url : "http://localhost:3412/Bitmart2Srv/addresses/" + aid,
		method: 'get',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			var curadd = convertAddress(data.address);
			buyamailaddress = curadd.amailaddress;
			
			$.mobile.loading("hide");
			$.mobile.navigate("#selectcc");
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			if (data.status == 404){
				alert("Address not found.");
			}
			else {
				alter("Internal Server Error.");
			}
		}
	});

}


$(document).on('pagebeforeshow', "#selectcc", function( event, ui ) {
	console.log("Jose");
	$.ajax({
		url : "http://localhost:3412/Bitmart2Srv/ccards2/" + useridlis,
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			
			var ccardList = data.ccards;
			var len = ccardList.length;
			var list = $("#buycreditcard-list");
			list.empty();
			var ccard;
			for (var i=0; i < len; ++i){
				
				ccard = ccardList[i];
				list.append("<li><a onclick=GetCcard2(" + ccard.ccid + ")>" +  
					"<h2> Card Number: " + ccard.ccnumber + "</h2>" +
					"<p> Expiration Date:  " + ccard.ccexpirationdate + "</p>" + 
					"<p> Brand: " + ccard.ccbrand + "</p>" +
					"<p> Security Code: " + ccard.ccsecuritycode + "</p>" +
					"</a></li>");
			}
			list.listview("refresh");	
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			alert("Data not found!");
		}
	});
});
function GetCcard2(ccid){
	buyccid = ccid;
	$.mobile.loading("show");
	$.ajax({
		url : "http://localhost:3412/Bitmart2Srv/ccards/" + ccid,
		method: 'get',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			var cCcard = convertCreditCard(data.ccard);
			buyccnumber = cCcard.ccnumber;
			$.mobile.loading("hide");
			$.mobile.navigate("#confirm");
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			if (data.status == 404){
				alert("Ccard not found.");
			}
			else {
				alter("Internal Server Error.");
			}
		}
	});

}
$(document).on('pagebeforeshow', "#confirm", function( event, ui ) {
	
	$("#confirmpname").val(buyproductid);
	$("#confirmpprice").val(buyproductname);
	$("#confirmpseller").val(buyproductprice);
	 $("#confirmccid").val(buyccnumber);
	 $("#confirmaid").val(buyamailaddress);
	 	 $("#confirmaid").val(buyamailaddress); // aqui

	

	
});
/////////////////////////////
/////////////Joseph////////
////////////Shopping Cart///
function verifyIfLoggedIn(){
	if(islog == 0){
		alert("You have to be logged in");
		$.mobile.navigate("#login");
	}
}

function SaveItem(){
	
	if(islog == 0){
		alert("You have to be logged in");
		$.mobile.navigate("#login");
	}
	else{
	
	$.mobile.loading("show");
	
	var newContainsproducts = {};
	newContainsproducts.pid = buyproductid;
	newContainsproducts.scid = currentCart.scid;
	
	console.log("New Cart Item: " + JSON.stringify(newContainsproducts));
	var newContainsproductsJSON = JSON.stringify(newContainsproducts);
	
	$.ajax({
		url : "http://localhost:3412/Bitmart2Srv/containsProducts",
		method: 'post',
		data : newContainsproductsJSON,
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			$.mobile.loading("hide");
			$.mobile.navigate("#cart");
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			alert("Data could not be added!");
		}
	});
	$.mobile.navigate("#cart");
	}
}



////////Administrator////

var currentAdmin = {};
var adminidlis = -1;
var adminlog = 0;

function adminverification(){
       $.mobile.loading("show");
       var username = document.getElementById("adminusername").value;
       var password = document.getElementById("adminpassword").value;
       $.ajax({
               url : "http://localhost:3412/Bitmart2Srv/administrators/",
               method: 'get',
               contentType: "application/json",
               dataType:"json",
               success : function(data, textStatus, jqXHR){
                       var loginList = data.administrators;
                       var len = loginList.length;
                       var log;
                       
                       for (var i=0; i < len; ++i){
                               log = loginList[i];
                               if(username == log.username){
                                       if(password == log.upassword){
                                               currentAdmin = log;
                                               adminidlis = log.adminid;
                                               adminlog = 1;
                                               
                                               break;
                                       }
                               }
                       }
                       if(adminlog == 0){
                               alert("Wrong Username or Password!");
                               $.mobile.loading("hide");
                               
                       }
                       else{///////////////////////
       
                       $.mobile.loading("hide");
                       $.mobile.navigate("#adminOptions-menu");
                       
                       }
               
               },
               error: function(data, textStatus, jqXHR){
                       console.log("textStatus: " + textStatus);
                       $.mobile.loading("hide");
                       if (data.status == 404){
                               alert("admin not found.");
                       }
                       else {
                               alter("Internal Server Error.");
                       }
               }
       });
}
function admin(){
       if(adminlog == 0){
               alert("You have to be logged in");
               $.mobile.navigate("#login");
       }
       else{
               $.mobile.navigate("#adminOptions-menu");
       }
}
 
var sellcid = 0;
var sellcname = "";
function Gotoform(cid){
       sellcid = cid;
       $.mobile.loading("show");
       $.ajax({
               url : "http://localhost:3412/Bitmart2Srv/categories/" + cid,
               method: 'get',
               contentType: "application/json",
               dataType:"json",
               success : function(data, textStatus, jqXHR){
                       var sellCategory = data.category;
                       sellcname = sellCategory.catname;
                       
                       $.mobile.loading("hide");
                       $.mobile.navigate("#add-product");
                       
               },
               error: function(data, textStatus, jqXHR){
                       console.log("textStatus: " + textStatus);
                       $.mobile.loading("hide");
                       if (data.status == 404){
                               alert("Category not found.");
                       }
                       else {
                               alert("Internal Server Error.");
                       }
               }
       });
       
       
       
}
 
 
 ///////////////////////selling//////////////////
  //////////////////////////
//////Sell a product//////
function sellingver(){
       
       if(islog == 0){
               alert("Must be Logged In");
               $.mobile.navigate("#login");
       }
       else{
               $.mobile.navigate("#selling");
       }
}


$(document).on('pagebeforeshow', "#selling", function( event, ui ) {
       console.log("Jose");
       
       $.ajax({
               url : "http://localhost:3412/Bitmart2Srv/categories",
               contentType: "application/json",
               success : function(data, textStatus, jqXHR){
                       var categoryList = data.categories;
                       var len = categoryList.length;
                       var list = $("#pbrand-list");
                       list.empty();
                       var category;
                       for (var i=0; i < len; ++i){
                               category = categoryList[i];
                               if(category.catchild == 0 ){
                                               list.append("<li><a onclick=Gotoform(" + category.cid + ")>" + 
                                                       "<p>" + "Parent: " + category.catsubmenu +   "</p>" +
                                                       "<h2>" + "Menu: " + category.catname +  "</h2>" +
                                                       
                                                       "</a></li>");
                                       
                               }
                               
                               
                       }
                       list.listview("refresh");        
               },
               error: function(data, textStatus, jqXHR){
                       console.log("textStatus: " + textStatus);
                       alert("Data not found!");
               }
       });
       
       
});



var sellcid = 0;
var sellcname = "";
function Gotoform(cid){
       sellcid = cid;
       $.mobile.loading("show");
       $.ajax({
               url : "http://localhost:3412/Bitmart2Srv/categories/" + cid,
               method: 'get',
               contentType: "application/json",
               dataType:"json",
               success : function(data, textStatus, jqXHR){
                       var sellCategory = data.category;
                       sellcname = sellCategory.catname;
                       
                       $.mobile.loading("hide");
                       $.mobile.navigate("#add-product");
                       
               },
               error: function(data, textStatus, jqXHR){
                       console.log("textStatus: " + textStatus);
                       $.mobile.loading("hide");
                       if (data.status == 404){
                               alert("Category not found.");
                       }
                       else {
                               alert("Internal Server Error.");
                       }
               }
       });
       
       
       
}
 
 ////////////end selling/////////////////////////////



///////////////////////////////////////////////////////////////
////////////////////////////////////fase 2 products
function convertProducts(dbModel){
	var cliModel = {};
	
	cliModel.pid = dbModel.pid;
	cliModel.uid = dbModel.uid;
	cliModel.cid = dbModel.cid;
	cliModel.pname = dbModel.pname;
	cliModel.pmodel = dbModel.pmodel;
	cliModel.pdescription = dbModel.pdescription;
	cliModel.pprice = dbModel.pprice;
	cliModel.pbidprice = dbModel.pbidprice;
	cliModel.pphoto = dbModel.pphoto;
	cliModel.pbrand = dbModel.pbrand;
	cliModel.pquantity = dbModel.pquantity;
	cliModel.pinstorage = dbModel.pinstorage;
	cliModel.psold = dbModel.psold;
	return cliModel;
}



function GetProduct(pid){
	$.mobile.loading("show");
	$.ajax({
		url : "http://localhost:3412/Bitmart2Srv/products/" + pid,
		method: 'get',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			currentProduct = convertProducts(data.product);
			$.mobile.loading("hide");
			$.mobile.navigate("#product-view");
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			if (data.status == 404){
				alert("Product not found!");
			}
			else {
				alter("Internal Server Error.");
			}
		}
	});
}



//////////////////end products/////////////




///////////address/////////////////
function convertAddress(dbModel){
	var cliModel = {};
	
	cliModel.aid = dbModel.aid;
	cliModel.amailaddress = dbModel.amailaddress;
	cliModel.acity = dbModel.acity;
	cliModel.acountry = dbModel.acountry;
	cliModel.azipcode = dbModel.azipcode;
	return cliModel;
}



function GetAddress(aid){
	$.mobile.loading("show");
	$.ajax({
		url : "http://localhost:3412/Bitmart2Srv/addresses/" + aid,
		method: 'get',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			currentAddress = convertAddress(data.address);
			$.mobile.loading("hide");
			$.mobile.navigate("#address-view");
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			if (data.status == 404){
				alert("Address not found.");
			}
			else {
				alter("Internal Server Error.");
			}
		}
	});
}


//////////////end address

////////////////////////users//////////////////////
function convertUsers(dbModel){
	var cliModel = {};
	
	cliModel.uid = dbModel.uid;
	cliModel.username = dbModel.username;
	cliModel.upassword = dbModel.upassword;
	cliModel.ufirstname = dbModel.ufirstname;
	cliModel.ulastname = dbModel.ulastname;
	cliModel.uemail = dbModel.uemail;
	cliModel.urating = dbModel.urating;

	return cliModel;
}


function GetUser(uid){
	$.mobile.loading("show");
	$.ajax({
		url : "http://localhost:3412/Bitmart2Srv/users/" + uid,
		method: 'get',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			currentUser1 = convertUsers(data.user);
			$.mobile.loading("hide");
			$.mobile.navigate("#account");
							
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			if (data.status == 404){
				alert("User not found.");
			}
			else {
				alter("Internal Server Error.");
			}
		}
	});
}



//////////////end users/////////////////////////////////





///////////////////credit card/////////////////////////////
function convertCreditCard(dbModel){
	var cliModel = {};
	
	cliModel.ccid = dbModel.ccid;
	cliModel.ccnumber = dbModel.ccnumber;
	cliModel.ccexpirationdate = dbModel.ccexpirationdate;
	cliModel.ccbrand = dbModel.ccbrand;
	cliModel.ccsecuritycode = dbModel.ccsecuritycode;
	cliModel.uid = dbModel.uid;
	return cliModel;
}

function GetCcard(ccid){
	$.mobile.loading("show");
	$.ajax({
		url : "http://localhost:3412/Bitmart2Srv/ccards/" + ccid,
		method: 'get',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			currentCcard = convertCreditCard(data.ccard);
			$.mobile.loading("hide");
			$.mobile.navigate("#ccard-view");
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			if (data.status == 404){
				alert("Ccard not found.");
			}
			else {
				alter("Internal Server Error.");
			}
		}
	});
}
////////////end credit card/////////////////////////////




///////////////categoria////////////////////////////



function convertCategory(dbModel){
	var cliModel = {};
	
	cliModel.cid = dbModel.cid;
	cliModel.catname = dbModel.catname;
	cliModel.catsubmenu = dbModel.catsubmenu;
	cliModel.catchild = dbModel.catchild;
	cliModel.catdepth = dbModel.catdepth;

	return cliModel;
}


function GetCategory(cid){
	
	$.mobile.loading("show");
	$.ajax({
		url : "http://localhost:3412/Bitmart2Srv/categories/" + cid,
		method: 'get',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			currentCategory = convertCategory(data.category);
			currentsubmenu = currentCategory.catname;
			$.mobile.loading("hide");
			$.mobile.navigate("#submenus");
			
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			if (data.status == 404){
				alert("Category not found.");
			}
			else {
				alter("Internal Server Error.");
			}
		}
	});
}


function GetCategory2(cid){
	
	$.mobile.loading("show");
	$.ajax({
		url : "http://localhost:3412/Bitmart2Srv/categories/" + cid,
		method: 'get',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			currentCategory = convertCategory(data.category);
			currentsubmenu = currentCategory.catname;
			$.mobile.loading("hide");
			$.mobile.navigate("#itemmenus");
			
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			if (data.status == 404){
				alert("Category not found.");
			}
			else {
				alter("Internal Server Error.");
			}
		}
	});
}

function GetCategory3(cid){
	
	$.mobile.loading("show");
	$.ajax({
		url : "http://localhost:3412/Bitmart2Srv/categories/" + cid,
		method: 'get',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			currentCategory = convertCategory(data.category);
			currentsubmenu = currentCategory.catname;
			$.mobile.loading("hide");
			$.mobile.navigate("#submenus2");
			
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			if (data.status == 404){
				alert("Category not found.");
			}
			else {
				alter("Internal Server Error.");
			}
		}
	});
}

///////////////end categoria/////////////////////




///////////////////app
var currentBankaccount = {};



function convertBankAccount(dbModel){
	var cliModel = {};
	
	cliModel.bankid = dbModel.bankid;
	cliModel.bankaccountnumber = dbModel.bankaccountnumber;
	cliModel.bankname = dbModel.bankname;
	cliModel.uid = dbModel.uid;
	return cliModel;
}



function GetBankaccount(bankid){
	$.mobile.loading("show");
	$.ajax({
		url : "http://localhost:3412/Bitmart2Srv/bankaccounts/" + bankid,
		method: 'get',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			currentBankaccount = convertBankAccount(data.bankaccount);
			$.mobile.loading("hide");
			$.mobile.navigate("#bankaccount-view");
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			if (data.status == 404){
				alert("Bankaccount not found.");
			}
			else {
				alter("Internal Server Error.");
			}
		}
	});
}

$(document).on('pagebeforeshow', "#bankaccount-view", function( event, ui ) {
	// currentProduct has been set at this point
	$("#upd-ad-bankaccountnumber").val(currentBankaccount.bankaccountnumber);
	$("#upd-ad-bankname").val(currentBankaccount.bankname);
	
});


function SaveBankaccount(){
	$.mobile.loading("show");
	var form = $("#bankaccount-form");
	var formData = form.serializeArray();
	console.log("form Data: " + formData);
	var newBankaccount = ConverToJSON(formData);
	console.log("New Bankaccount: " + JSON.stringify(newBankaccount));
	var newBankaccountJSON = JSON.stringify(newBankaccount);
	$.ajax({
		url : "http://localhost:3412/Bitmart2Srv/bankaccounts",
		method: 'post',
		data : newBankaccountJSON,
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			$.mobile.loading("hide");
			$.mobile.navigate("#bankaccount-menu");
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			alert("Data could not be added!");
		}
	});
}




function DeleteBankaccount(){
	$.mobile.loading("show");
	var bankid = currentBankaccount.bankid;
	$.ajax({
		url : "http://localhost:3412/Bitmart2Srv/bankaccounts/" + bankid,
		method: 'delete',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			$.mobile.loading("hide");
			$.mobile.navigate("#bankaccount-menu");
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			if (data.status == 404){
				alert("Ccard not found.");
			}
			else {
				alter("Internal Server Error.");
			}
		}
	});
}

function UpdateBankaccount(){
	$.mobile.loading("show");
	var form = $("#bankaccount-view-form");
	var formData = form.serializeArray();
	console.log("form Data: " + formData);
	var updBankaccount = ConverToJSON(formData);
	updBankaccount.bankid = currentBankaccount.bankid;
	console.log("Updated Bankaccount: " + JSON.stringify(updBankaccount));
	var updBankaccountJSON = JSON.stringify(updBankaccount);
	$.ajax({
		url : "http://localhost:3412/Bitmart2Srv/bankaccounts/" + updbankaccount.bankid,
		method: 'put',
		data : updBankaccountJSON,
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			$.mobile.loading("hide");
			$.mobile.navigate("#bankaccount-menu");
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			if (data.status == 404){
				alert("Data could not be updated!");
			}
			else {
				alert("Internal Error.");		
			}
		}
	});
}





$(document).on('pagebeforeshow', "#bankaccount-menu", function( event, ui ) {
	console.log("Jose");
	$.ajax({
		url : "http://localhost:3412/Bitmart2Srv/bankaccounts2/" + useridlis,
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var bankaccountList = data.bankaccounts;
			var len = bankaccountList.length;
			var list = $("#bankaccounts-list");
			list.empty();
			var bankaccount;
			for (var i=0; i < len; ++i){
				bankaccount = bankaccountList[i];
				list.append("<li><a onclick=GetBankaccount(" + bankaccount.bankid + ")>" +  
					"<h2>" + bankaccount.bankaccountnumber + "</h2>" +
					"<p><strong>"  + bankaccount.bankname +  "</strong></p>" +
					// "<p> " + bankaccount.uid + "</p>" + 					
					"</a></li>");
			}
			list.listview("refresh");	
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			alert("Data not found!");
		}
	});
});
/////////////////////////////fin app

///////////////////////////////invoie//////////////////////////////////////////


function GetInvoice(iid){
	invoicevar = iid;
	$.mobile.loading("show");
	$.ajax({
		url : "http://localhost:3412/Bitmart2Srv/invoices/" + ccid,
		method: 'get',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			var cCcard = convertInvoice(data.ccard);
			buyccnumber = cCcard.ccnumber;
			$.mobile.loading("hide");
			$.mobile.navigate("#confirm");
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			if (data.status == 404){
				alert("Ccard not found.");
			}
			else {
				alter("Internal Server Error.");
			}
		}
	});

}