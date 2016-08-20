function OperadoraTelefoniaDAO(connection){
	this._connection = connection;
	this.libSQL = require('./../js/SqlCustom.js');
	this.pkFields = ["pk"];
	this.fields = ["nome"];
	this.objSQL = new this.libSQL.SqlCustom();
	this.objSQL._pkFields = this.pkFields;
	this.objSQL._fields = this.fields;	
}

OperadoraTelefoniaDAO.prototype.lista = function(callback){			
	this._connection.query(`SELECT ${ this.objSQL.getSelectFields() } FROM operadora_telefonia `,  callback);
}

OperadoraTelefoniaDAO.prototype.busca = function(operadoraTelefoniaId, callback){	
	this._connection.query(`SELECT ${ this.objSQL.getSelectFields() } FROM operadora_telefonia WHERE pk = ? `, operadoraTelefoniaId, callback);
}

OperadoraTelefoniaDAO.prototype.salva = function(operadoraTelefonia, callback){
	if (operadoraTelefonia.pk){		
		let bindUpdate = [];			
		this.fields.concat(this.pkFields).map(e => bindUpdate.push(operadoraTelefonia[e]));							
		this._connection.query(`UPDATE operadora_telefonia SET ${ this.objSQL.getUpdateFields() } WHERE pk = ?`, bindUpdate, callback);
	}
	else {
		let bindInsert = [];	
		this.fields.map(e => bindInsert.push(operadoraTelefonia[e]));			
		this._connection.query(`insert into operadora_telefonia (${ this.objSQL.getInsertFields() }) values (${ bindInsert.map((e, i) => { return ` ? `}).join() }) `, bindInsert, callback);		
	}
}

OperadoraTelefoniaDAO.prototype.remove = function(operadoraTelefoniaId, callback){
	this._connection.query(`delete from operadora_telefonia where pk = ? `, operadoraTelefoniaId, callback);
}

module.exports = function(){
	return OperadoraTelefoniaDAO;
}