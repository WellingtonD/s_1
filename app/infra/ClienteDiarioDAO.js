function ClienteDiarioDAO(connection){
	this._connection = connection;
	this.libSQL = require('./../js/SqlCustom.js');	
	this.pkFields = ["pk"];
	this.fields = ["fk_cliente", "data", "texto"];
	this.objSQL = new this.libSQL.SqlCustom();
	this.objSQL._pkFields = this.pkFields;
	this.objSQL._fields = this.fields;	
}

ClienteDiarioDAO.prototype.lista = function(callback, clienteId){	
	this._connection.query(`SELECT ${ this.objSQL.getSelectFields() } FROM cliente_diario where fk_cliente = ? order by data desc `, clienteId,  callback);
}

ClienteDiarioDAO.prototype.busca = function(clienteDiarioId, callback){	
	this._connection.query(`SELECT ${ this.objSQL.getSelectFields() } FROM cliente_diario WHERE pk = ? `, clienteDiarioId, callback);
}

ClienteDiarioDAO.prototype.salva = function(clienteDiario, callback){
	if (clienteDiario.pk){		
		let bindUpdate = [];			
		this.fields.concat(this.pkFields).map(e => bindUpdate.push(clienteDiario[e]));							
		this._connection.query(`UPDATE cliente_diario SET ${ this.objSQL.getUpdateFields() } WHERE pk = ?`, bindUpdate, callback);
	}
	else {
		let bindInsert = [];	
		this.fields.map(e => bindInsert.push(clienteDiario[e]));			
		this._connection.query(`insert into cliente_diario (${ this.objSQL.getInsertFields() }) values (${ bindInsert.map((e, i) => { return ` ? `}).join() }) `, bindInsert, callback);		
	}
}

ClienteDiarioDAO.prototype.remove = function(clienteDiarioId, callback){
	this._connection.query(`delete from cliente_diario where pk = ? `, clienteDiarioId, callback);
}

module.exports = function(){
	return ClienteDiarioDAO;
}