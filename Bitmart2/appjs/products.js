function Products(uid, cid, pname, pmodel, pdescription, pprice, pbidprice, pphoto, pbrand, pquantity, pinstorage){
		this.pid = "";
		this.uid = uid;
		this.cid = cid;
		this.pname = pname;
		this.pmodel = pmodel;
		this.pdescription= pdescription;
		this.pprice = pprice;
		this.pbidprice = pbidprice;
		this.pphoto = pphoto;
		this.pbrand = pbrand;
		this.pquantity = pquantity;
		this.pinstorage = pinstorage;
	this.toJSON = toJSON;
}
