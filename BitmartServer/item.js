module.exports =  { 
	Item : function (name, model, description, price, bidprice, photo, brand, username, quantity, instorage){
		this.id = "";
		this.name = name;
		this.model = model;
		this.description= description;
		this.price = price;
		this.bidprice = bidprice;
		this.photo = photo;
		this.brand = brand;
		this.username = username;
		this.quantity = quantity;
		this.instorage = instorage;
	}
}
