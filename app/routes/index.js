var path = require('path');
 
module.exports = function(app){  
    app.get('/prontuarios', function(req, res) {        
        res.sendFile(path.resolve('app/index.html'));
    });
    app.get('/prontuarios/new', function(req, res) {        
        res.sendFile(path.resolve('app/index.html'));
    });
    app.get('/prontuarios/edit/:prontuarioId', function(req, res) {        
        res.sendFile(path.resolve('app/index.html'));
    });    


    app.get('/clientes', function(req, res) {        
        res.sendFile(path.resolve('app/index.html'));
    });
    app.get('/clientes/new', function(req, res) {        
        res.sendFile(path.resolve('app/index.html'));
    });
    app.get('/clientes/edit/:clienteId', function(req, res) {        
        res.sendFile(path.resolve('app/index.html'));
    }); 

}