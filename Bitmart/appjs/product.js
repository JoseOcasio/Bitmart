function Product(name, model, description, price, photo, brand, username, quantity, instorage){
	this.id = "";
	this.name = name;
	this.model = model;
	this.description= description;
	this.price = price;
	this.photo = photo;
	this.brand = brand;
	this.username = username;
	this.quantity = quantity;
	this.instorage = instorage;
	this.toJSON = toJSON;
}
