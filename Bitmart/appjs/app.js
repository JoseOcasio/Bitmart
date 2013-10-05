

$(document).on('pagebeforeshow', "#books", function( event, ui ) {
	console.log("Jose");
	$.ajax({
		url : "http://localhost:3412/BitmartServer/products",
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var productList = data.products;
			var len = productList.length;
			var list = $("#books-list");
			list.empty();
			var product;
			for (var i=0; i < len; ++i){
				
				product = productList[i];
				list.append("<li><a onclick=GetProduct(" + product.id + ")>" +  
					"<h2> " + product.name + "</h2>" +
					"<p><strong>"  + product.model +  "</strong></p>" +
					"<p> Description: " + product.description + "</p>" + 
					"<p class=\"ui-li-aside\">" + accounting.formatMoney(product.price) + "</p>" +
					"<p> Seller: " + product.username + "</p>" + 
					"<p> Quantity: " + product.quantity + "</p>" + 
					"<p> In Storage: " + product.instorage + "</p>" + 
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

$(document).on('pagebeforeshow', "#book-view", function( event, ui ) {
	// currentProduct has been set at this point
	$("#upd-name").val(currentProduct.name);
	$("#upd-model").val(currentProduct.model);
	$("#upd-description").val(currentProduct.description);
	$("#upd-price").val(currentProduct.price);
	$("#upd-username").val(currentProduct.username);
	$("#upd-quantity").val(currentProduct.quantity);
	$("#upd-instorage").val(currentProduct.instorage);

	
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

function SaveProduct(){
	$.mobile.loading("show");
	var form = $("#book-form");
	var formData = form.serializeArray();
	console.log("form Data: " + formData);
	var newProduct = ConverToJSON(formData);
	console.log("New Product: " + JSON.stringify(newProduct));
	var newProductJSON = JSON.stringify(newProduct);
	$.ajax({
		url : "http://localhost:3412/BitmartServer/products",
		method: 'post',
		data : newProductJSON,
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			$.mobile.loading("hide");
			$.mobile.navigate("#book");
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			alert("Data could not be added!");
		}
	});


}

var currentProduct = {};

function GetProduct(id){
	$.mobile.loading("show");
	$.ajax({
		url : "http://localhost:3412/BitmartServer/products/" + id,
		method: 'get',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			currentProduct = data.product;
			$.mobile.loading("hide");
			$.mobile.navigate("#book-view");
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

function UpdateProduct(){
	$.mobile.loading("show");
	var form = $("#book-view-form");
	var formData = form.serializeArray();
	console.log("form Data: " + formData);
	var updProduct = ConverToJSON(formData);
	updProduct.id = currentProduct.id;
	console.log("Updated Product: " + JSON.stringify(updProduct));
	var updProductJSON = JSON.stringify(updProduct);
	$.ajax({
		url : "http://localhost:3412/BitmartServer/products/" + updProduct.id,
		method: 'put',
		data : updProductJSON,
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			$.mobile.loading("hide");
			$.mobile.navigate("#books");
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
	var id = currentProduct.id;
	$.ajax({
		url : "http://localhost:3412/BitmartServer/products/" + id,
		method: 'delete',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			$.mobile.loading("hide");
			$.mobile.navigate("#books");
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

// 
// ////////////////////////////////////////Not used for now
// function ShoppingCart(){
	// $.mobile.loading("show");
	// var id = currentItem.id;
	// $.ajax({
		// url : "http://localhost:3412/BitmartServer/items/" + id,
		// method: 'post',
		// contentType: "application/json",
		// dataType:"json",
		// success : function(data, textStatus, jqXHR){
			// $.mobile.loading("hide");
			// $.mobile.navigate("#cart");
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




//////////////////////////////////////////////////////////////////
$(document).on('pagebeforeshow', "#cart", function( event, ui ) {
	console.log("Jose");
	$.ajax({
		url : "http://localhost:3412/BitmartServer/items",
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var itemList = data.items;
			var len = itemList.length;
			var list = $("#items-list");
			list.empty();
			var item;
			for (var i=0; i < len; ++i){
				//<img src="http://jqfaq.com/wp-content/uploads/logo_v1.png">
				item = itemList[i];
				list.append("<li>  <a onclick=GetItem(" + item.id + ")>" +
					"<h2> "  +  item.name + "</h2>" +
					"<img src =http://jqfaq.com/wp-content/uploads/logo_v1.png>"+
					"<p><strong>"  + item.model +  "</strong></p>" +
					"<p> Description: " + item.description + "</p>" +
					"<p class=\"ui-li-aside\">" + accounting.formatMoney(item.price) + "</p>" +
					"<p> Seller: " + item.username + "</p>" +
					"<p> Quantity: " + item.quantity + "</p>" +
					"<p> In Storage: " + item.instorage + "</p>" +
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

function UpdateItem(){
	$.mobile.loading("show");
	var form = $("#item-view-form");
	var formData = form.serializeArray();
	console.log("form Data: " + formData);
	var updItem = ConverToJSON(formData);
	updItem.id = currentItem.id;
	console.log("Updated Item: " + JSON.stringify(updItem));
	var updItemJSON = JSON.stringify(updItem);
	$.ajax({
		url : "http://localhost:3412/BitmartServer/items/" + updItem.id,
		method: 'put',
		data : updItemJSON,
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			$.mobile.loading("hide");
			$.mobile.navigate("#cart");
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


$(document).on('pagebeforeshow', "#item-view", function( event, ui ) {
	// currentProduct has been set at this point
	$("#upd-nameI").val(currentItem.name);
	$("#upd-modelI").val(currentItem.model);
	$("#upd-descriptionI").val(currentItem.description);
	$("#upd-priceI").val(currentItem.price);
	$("#upd-usernameI").val(currentItem.username);
	$("#upd-quantityI").val(currentItem.quantity);
	$("#upd-instorageI").val(currentItem.instorage);

	
});


function SaveItem(){
	$.mobile.loading("show");
	var form = $("#book-view-form");   //el add to cart
	var formData = form.serializeArray();
	console.log("form Data: " + formData);
	var newItem = ConverToJSON(formData);
	console.log("New Item: " + JSON.stringify(newItem));
	var newItemJSON = JSON.stringify(newItem);
	$.ajax({
		url : "http://localhost:3412/BitmartServer/items",
		method: 'post',
		data : newItemJSON,
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


}

////////bid beg
$(document).on('pagebeforeshow', "#bid", function( event, ui ) {
	console.log("Jose");
	$.ajax({
		url : "http://localhost:3412/BitmartServer/bids",
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
				list.append("<li>  <a onclick=GetItem(" + bid.id + ")>" +
					"<h2> "  +  bid.bidproduct + "</h2>" +
					"<img src =http://jqfaq.com/wp-content/uploads/logo_v1.png>"+
					"<p><strong>"  + bid.bidusername +  "</strong></p>" +					
					"<p class=\"ui-li-aside\">" + accounting.formatMoney(bid.bidamount) + "</p>" +					
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
		url : "http://localhost:3412/BitmartServer/bids/" + updBid.id,
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
	$("#upd-bidproduct").val(currentBid.bidproduct);
	$("#upd-bidusername").val(currentBid.bidusername);
	$("#upd-bidamount").val(currentBid.bidamount);	
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
		url : "http://localhost:3412/BitmartServer/bids",
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
////////bid end
// //sorting no funciona aun
// $('.link-sort-list').click(function(e) {
    // var $sort = this;
    // var $list = $('#book-view-form');
    // var $listLi = $('li',$list);
    // $listLi.sort(function(a, b){
        // var keyA = $(a).text();
        // var keyB = $(b).text();
        // if(jQuery(sort).hasClass('asc')){
 // return (keyA > keyB) ? 1 : -1;
 // } else {
 // return (keyA < keyB) ? 1 : -1;
 // }
    // });
    // $.each($listLi, function(index, row){
        // $list.append(row);
    // });
    // e.preventDefault();
// });


function loginVerification(){
var username = document.getElementById('username');
var password = document.getElementById('password');
	if((username.value == "jose") && (password.value =="123")){
		$.mobile.navigate("#menu");
	}
	else{
		alert("Error");
		}			
	
		//alert("You entered: " + myTextField.value)
	
	
}




//lista credit card
$(document).on('pagebeforeshow', "#creditcard", function( event, ui ) {
	console.log("Jose");
	$.ajax({
		url : "http://localhost:3412/BitmartServer/ccards",
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var ccardList = data.ccards;
			var len = ccardList.length;
			var list = $("#ccards-list");
			list.empty();
			var ccard;
			for (var i=0; i < len; ++i){
				
				ccard = ccardList[i];
				list.append("<li><a onclick=GetCcard(" + ccard.id + ")>" + 
					"<h2>CardNumber: " + ccard.cardNumber + "</h2>" +
					"<p><strong>Username: "  + ccard.username +  "</strong></p>" +
					"<p> Expiration Date: " + ccard.expDate + "</p>" + 
					"<p> Brand: " + ccard.brand + "</p>" +
					"<p> Security Code: " + ccard.secCode + "</p>" +
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

var currentItem = {};

function GetItem(id){
	$.mobile.loading("show");
	$.ajax({
		url : "http://localhost:3412/BitmartServer/items/" + id,
		method: 'get',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			currentItem = data.items;
			$.mobile.loading("hide");
			$.mobile.navigate("#item-view");
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

function SaveItem(){
	$.mobile.loading("show");
	var form = $("#book-view-form");   //el add to cart
	var formData = form.serializeArray();
	console.log("form Data: " + formData);
	var newItem = ConverToJSON(formData);
	console.log("New Item: " + JSON.stringify(newItem));
	var newItemJSON = JSON.stringify(newItem);
	$.ajax({
		url : "http://localhost:3412/BitmartServer/items",
		method: 'post',
		data : newItemJSON,
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


}
//end credit card
///////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////
//get things of user
var currentUser = {};
// function searchUser(){
	// GetUser(0);
// 	
// }
function GetUser(id){
	$.mobile.loading("show");
	$.ajax({
		url : "http://localhost:3412/BitmartServer/users/" + id,
		method: 'get',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			currentUser = data.user;
			$.mobile.loading("hide");
			$.mobile.navigate("#account-info");
							
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


$(document).on('pagebeforeshow', "#account-info", function( event, ui ) {
	// currentCar has been set at this point
	
	$("#upd-am-username").val(currentUser.username);
	$("#upd-am-password").val(currentUser.password);
	$("#upd-am-firstname").val(currentUser.firstname);
	$("#upd-am-lastname").val(currentUser.lastname);
	$("#upd-am-email").val(currentUser.email);
	$("#upd-am-rating").val(currentUser.rating);

	
});

function UpdateUser(){
	$.mobile.loading("show");
	var form = $("#user-view-form");
	var formData = form.serializeArray();
	console.log("form Data: " + formData);
	var updUser = ConverToJSON(formData);
	updUser.id = currentUser.id;
	console.log("Updated User: " + JSON.stringify(updUser));
	var updUserJSON = JSON.stringify(updUser);
	$.ajax({
		url : "http://localhost:3412/BitmartServer/users/" + updUser.id,
		method: 'put',
		data : updUserJSON,
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			$.mobile.loading("hide");
			//$.mobile.navigate("#books");
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




function GetAddress(id){
	$.mobile.loading("show");
	$.ajax({
		url : "http://localhost:3412/BitmartServer/addresses/" + id,
		method: 'get',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			currentAddress = data.address;
			$.mobile.loading("hide");
			$.mobile.navigate("#address-view");
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			if (data.status == 404){
				alert("Addrdfdfdfess not found.");
			}
			else {
				alter("Internal Server Error.");
			}
		}
	});
}

$(document).on('pagebeforeshow', "#address-view", function( event, ui ) {
	// currentProduct has been set at this point
	$("#upd-ad-mailAddress").val(currentAddress.mailAddress);
	$("#upd-ad-city").val(currentAddress.city);
	$("#upd-ad-country").val(currentAddress.country);
	$("#upd-ad-zipcode").val(currentAddress.zipcode);
	$("#upd-ad-username").val(currentAddress.username);
});



function UpdateAddress(){
	$.mobile.loading("show");
	var form = $("#address-view-form");
	var formData = form.serializeArray();
	console.log("form Data: " + formData);
	var updAddress = ConverToJSON(formData);
	updAddress.id = currentAddress.id;
	console.log("Updated Address: " + JSON.stringify(updAddress));
	var updAddressJSON = JSON.stringify(updAddress);
	$.ajax({
		url : "http://localhost:3412/BitmartServer/addresses/" + updAddress.id,
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





$(document).on('pagebeforeshow', "#address-menu", function( event, ui ) {
	console.log("Jose");
	$.ajax({
		url : "http://localhost:3412/BitmartServer/addresses",
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var addressList = data.addresses;
			var len = addressList.length;
			var list = $("#addresses-list");
			list.empty();
			var address;
			for (var i=0; i < len; ++i){
				
				address = addressList[i];
				list.append("<li><a onclick=GetAddress(" + address.id + ")>" +  
					"<h2>" + address.mailAddress + "</h2>" +
					"<p><strong>"  + address.city +  "</strong></p>" +
					"<p> Year: " + address.country + "</p>" + 
					"<p>" + address.zipcode + "</p>" +
					"<p>" + address.username + "</p>" +
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



//sorting

(function($) {

    $.fn.listSorter = function(options) {
        var that = this;
        var settings = {
            order: 'asc'
        };
        options = $.extend(settings, options);

        var cosas = $('li', that).get();
        var filtered = '';

        switch (options.order) {
        case 'asc':
        case 'desc':
            break;
        default:
            return new Error('Invalid option');
        }

        return that.each(function() {

            if (options.order == 'asc') {

                var asc = cosas.sort(function(a, b) {

                    var $text1 = $(a).text();
                    var $text2 = $(b).text();

                    return $text1[0].toLowerCase() > $text2[0].toLowerCase();

                });


                for (var i = 0; i < asc.length; i++) {

                    filtered += '<li>' + $(asc[i]).text() + '</li>';

                }

                $(that).html(filtered);

            } else {

                var desc = cosas.sort(function(a, b) {

                    var $text1 = $(a).text();
                    var $text2 = $(b).text();

                    return $text1[0].toLowerCase() < $text2[0].toLowerCase();

                });


                for (var j = 0; j < desc.length; j++) {

                    filtered += '<li>' + $(desc[j]).text() + '</li>';

                }

                $(that).html(filtered);

            }

        });
    };

})(jQuery);


$('#asc').click(function(e) {
    e.preventDefault();
    $('#books-list').listSorter();
});
$('#desc').click(function(e) {
    e.preventDefault();
    $('#books-list').listSorter({
        order: 'desc'
    });
});