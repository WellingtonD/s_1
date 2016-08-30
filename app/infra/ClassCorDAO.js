function ClassCorDAO(connection){
	this._connection = connection;
	this.libSQL = require('./../js/SqlCustom.js');
	this.pkFields = ["pk"];
	this.fields = ["descricao", "class"];
	this.objSQL = new this.libSQL.SqlCustom();
	this.objSQL._pkFields = this.pkFields;
	this.objSQL._fields = this.fields;	
}

ClassCorDAO.prototype.lista = function(callback){			
	this._connection.query(`SELECT ${ this.objSQL.getSelectFields() } FROM class_cor `,  callback);
}

ClassCorDAO.prototype.busca = function(classCorId, callback){	
	this._connection.query(`SELECT ${ this.objSQL.getSelectFields() } FROM class_cor WHERE pk = ? `, classCorId, callback);
}

ClassCorDAO.prototype.salva = function(classCor, callback){
	if (classCor.pk){		
		let bindUpdate = [];			
		this.fields.concat(this.pkFields).map(e => bindUpdate.push(classCor[e]));							
		this._connection.query(`UPDATE class_cor SET ${ this.objSQL.getUpdateFields() } WHERE pk = ?`, bindUpdate, callback);
	}
	else {
		let bindInsert = [];	
		this.fields.map(e => bindInsert.push(classCor[e]));			
		this._connection.query(`insert into class_cor (${ this.objSQL.getInsertFields() }) values (${ bindInsert.map((e, i) => { return ` ? `}).join() }) `, bindInsert, callback);		
	}
}

ClassCorDAO.prototype.remove = function(classCorId, callback){
	this._connection.query(`delete from class_cor where pk = ? `, classCorId, callback);
}

module.exports = function(){
	return ClassCorDAO;
}