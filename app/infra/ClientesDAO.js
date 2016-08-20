
function ClientesDAO(connection){
	this._connection = connection;
	this.libSQL = require('./../js/SqlCustom.js');
	this.pkFields = ["pk"];
	this.fields = ["nome","endereco","bairro","numero","complemento","cidade","email","facebook","observacoes"];
	this.objSQL = new this.libSQL.SqlCustom();
	this.objSQL._pkFields = this.pkFields;
	this.objSQL._fields = this.fields;
}

ClientesDAO.prototype.lista = function(callback, sqlCustom){
	let _sqlCustom = JSON.parse(sqlCustom);		
	this._connection.query(`SELECT ${ this.objSQL.getSelectFields() } FROM cliente ${ this.objSQL.getSql(_sqlCustom, ` where `) } `,this.objSQL._bindings, callback);
}

ClientesDAO.prototype.busca = function(clienteId, callback){	
	this._connection.query(`SELECT ${ this.objSQL.getSelectFields() } FROM cliente WHERE pk = ? `, clienteId, callback);
}

ClientesDAO.prototype.salva = function(cliente, callback){
	if (cliente.pk){		
		let bindUpdate = [];			
		this.fields.concat(this.pkFields).map(e => bindUpdate.push(cliente[e]));							
		this._connection.query(`UPDATE cliente SET ${ this.objSQL.getUpdateFields() } WHERE pk = ?`, bindUpdate, callback);
	}
	else {
		let bindInsert = [];	
		this.fields.map(e => bindInsert.push(cliente[e]));			
		this._connection.query(`insert into cliente (${ this.objSQL.getInsertFields() }) values (${ bindInsert.map((e, i) => { return ` ? `}).join() }) `, bindInsert, callback);		
	}
}

ClientesDAO.prototype.remove = function(clienteId, callback){
	this._connection.query(`delete from cliente where pk = ? `, clienteId, callback);
}

module.exports = function(){
	return ClientesDAO;
}