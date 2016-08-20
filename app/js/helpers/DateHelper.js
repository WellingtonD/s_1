class DateHelper {    
    constructor() {
        ///faz com que o programador utilize apenas os metodos estaticos desta classe
        throw new Error('Esta classe não pode ser instanciada');
    }
    
    static dataParaTexto(data) {        
        data = new Date(data);
        return `${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()}`;
    }
    
    static textoParaData(texto) {
        ///verifica se o texto esta no formato da RegExpression
        if(!/\d{4}-\d{2}-\d{2}/.test(texto)) 
            throw new Error('Deve estar no formato aaaa-mm-dd');
        ///exemplo de arrow function e de passagem de itens do array como parametro utilizando o operado "..."
        return new Date(...texto.split('-').map((item, indice) => item - indice % 2));
    }    
}

///tornar classe compativel com o NodeJs
///verifica se exports existe
if (typeof exports !== 'undefined') {
    ///se sim export na Class    
    exports.DateHelper = DateHelper;
}
