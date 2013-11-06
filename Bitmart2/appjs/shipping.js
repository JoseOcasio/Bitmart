function Shipping(sfrom, sto, scost, smethod, pid){
	this.sid = "";
	this.sfrom = sfrom;
	this.sto = sto;
	this.scost = scost;
	this.smethod = smethod;
	this.pid = pid;
	this.toJSON = toJSON;
}
