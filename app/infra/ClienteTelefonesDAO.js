
function ClienteTelefonesDAO(connection){
	this._connection = connection;
	this.libSQL = require('./../js/SqlCustom.js');
	this.pkFields = ["pk"];
	this.fields = ["fk_cliente", "ddd", "telefone", "fk_operadora"];
	this.objSQL = new this.libSQL.SqlCustom();
	this.objSQL._pkFields = this.pkFields;
	this.objSQL._fields = this.fields;	
}

ClienteTelefonesDAO.prototype.lista = function(callback, clienteId){			
	this._connection.query(`SELECT ${ this.objSQL.getSelectFields() } FROM cliente_telefone where fk_cliente = ? `, clienteId,  callback);
}

ClienteTelefonesDAO.prototype.busca = function(clienteTelefoneId, callback){	
	this._connection.query(`SELECT ${ this.objSQL.getSelectFields() } FROM cliente_telefone WHERE pk = ? `, clienteTelefoneId, callback);
}

ClienteTelefonesDAO.prototype.salva = function(clienteTelefone, callback){
	if (clienteTelefone.pk){		
		let bindUpdate = [];			
		this.fields.concat(this.pkFields).map(e => bindUpdate.push(clienteTelefone[e]));							
		this._connection.query(`UPDATE cliente_telefone SET ${ this.objSQL.getUpdateFields() } WHERE pk = ?`, bindUpdate, callback);
	}
	else {
		let bindInsert = [];	
		this.fields.map(e => bindInsert.push(clienteTelefone[e]));			
		this._connection.query(`insert into cliente_telefone (${ this.objSQL.getInsertFields() }) values (${ bindInsert.map((e, i) => { return ` ? `}).join() }) `, bindInsert, callback);		
	}
}

ClienteTelefonesDAO.prototype.remove = function(clienteTelefoneId, callback){
	this._connection.query(`delete from cliente_telefone where pk = ? `, clienteTelefoneId, callback);
}

module.exports = function(){
	return ClienteTelefonesDAO;
}