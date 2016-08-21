class ClienteTelefone {    
    constructor(pk, data, texto, fk_cliente) {            
        this._pk = pk;
        this._data = data;        
        this._texto = texto;
        this._fk_cliente = fk_cliente;
    }    

    get pk() { return this._pk; }
    set pk(v) { this._pk = v; }
        
    get data() { return this._data; }
    set data(v) { this._data = v; }
    
    get texto() { return this._texto; }
    set texto(v) { this._texto = v; }

    get fk_cliente() { return this._fk_cliente; }
    set fk_cliente(v) { this._fk_cliente = v; }
}

///tornar classe compativel com o NodeJs
///verifica se exports existe
if (typeof exports !== 'undefined') {
    ///se sim export na Class    
    exports.ClienteTelefone = ClienteTelefone;
}
