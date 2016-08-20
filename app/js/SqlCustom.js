///http://stackoverflow.com/questions/3225251/how-can-i-share-code-between-node-js-and-the-browser/3226739

(   
    function(exports){
       
        exports.SqlCustom = function() {    
            this._limit = null;
            this._offset = null;
            this._whereAnd = [];         
            this._whereOr = []; 
            this._orderBy = [];   
            this._bindings = [];
            this._pkFields = [];
            this._fields = [];
            this.operators = [">", "<", "<>", "=", ">=", "<=", "is", "is not", "like"];

            this.addWhereAnd = function (whereAnd) {
                this._whereAnd.push(whereAnd);
            }     
            this.addWhereOr = function(whereOr) {        
                this._whereOr.push(whereOr);        
            }        
            this.addOrderBy = function(orderBy) {                
                this._orderBy.push(orderBy);                
            }
            this.getSelectFields = function() {
                ///pega os campos da tabela para montar o sql                                                      
                return this._pkFields.concat(this._fields).join();                                    
            }
            this.getInsertFields = function() {
                ///pega os campos da tabela para montar o sql                
                return this._fields.join();
            }
            this.getUpdateFields = function() {
                ///pega os campos da tabela para montar o sql
                let strFields = ``;  
                this._fields.map((e, i) => {                	
                    strFields += ` ${ e } = ? ${ this._fields.length-1 !== i ? `, ` : `` } `;
                });
                return strFields;                    
            }    
            this.getSql = function(obj, strConcatBefore){
                let _sqlCustom = null;	
                let _bWhereAnd = false;
                let _bWhereOr = false;                	
                let _sSql = ``;                 
                this._bindings = [];  
                                     
                _sqlCustom = obj;                             
                if (_sqlCustom){			
                    if (_sqlCustom._whereAnd) {
                        let _sSqlWhereAnd = ``;
                        _sqlCustom._whereAnd.map((e, i) => {				
                            _bWhereAnd = true;
                            _sSqlWhereAnd += ` ${e.field} ${e.operator} ? `;
                            this._bindings.push(e.value);
                            _bWhereAnd += (_sqlCustom._whereAnd.length-1 !== i) ? ` and ` : ``;
                        });
                        _sSql += _bWhereAnd ? `(${_sSqlWhereAnd})` : ``;			
                    }
                    
                    if (_sqlCustom._whereOr)  {			 
                        let _sSqlWhereOr = ``;
                        _sqlCustom._whereOr.map((e, i) => {				
                            _bWhereOr = true;
                            _sSqlWhereOr += ` ${e.field} ${e.operator} ? `;
                            this._bindings.push(e.value);
                            _sSqlWhereOr += (_sqlCustom._whereOr.length-1 !== i) ? ` or ` : ``;
                        });			
                        _sSql += (_bWhereOr && _bWhereAnd) ? ` or ` : ``;
                        _sSql += (_bWhereOr) ? ` (${_sSqlWhereOr}) ` : ``;		
                    }			
                    _sSql = (_bWhereOr || _bWhereAnd) ? ` ${strConcatBefore} ${_sSql} ` : ``;
                        
                    if (_sqlCustom._orderBy)  {	
                        let _aItensOrderBy = [];
                        let _allFields = this._fields.concat(this._pkFields);                    
                        _sqlCustom._orderBy.map((e, i) => {
                            if (_sqlCustom._orderBy.map(function(e) { return e.field; }).indexOf(e.field) >= 0) {                            
                                _aItensOrderBy.push(` ${e.field} ${e.type} `);
                            }
                        });
                        _sSql += (_aItensOrderBy.length > 0) ? ` order by ${ _aItensOrderBy.join() } ` : ``;                                             	                        		
                    }
                    _sSql += (_sqlCustom._limit) ? ` limit ${_sqlCustom._limit} ` : ``;						
                    _sSql += (_sqlCustom._limit && _sqlCustom._offset) ? ` offset ${_sqlCustom._offset} ` : ``;             
                }
                return _sSql;         
            }
            return this;      
        }         
    }
    (typeof exports === 'undefined' ? this.share = {} : exports)
);