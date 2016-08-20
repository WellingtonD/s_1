angular.module('estoque').controller('ClientesController', function($scope, recursoCliente, $routeParams, cadastroDeClientes, $timeout, $location){  
    $scope.clientes = [];
    $scope.filtro = '';
    $scope.mensagem = '';
    $scope.showMensagem = false;
    $scope.pagina = 1;
    $scope.registrosPorPagina = 10;
    $scope.removidos = 0;
 
    ///mostrar mensagem por 2 seegundos
    doMensagem = function(msg) {
       $scope.mensagem = msg; 
       $scope.showMensagem = true;
       $timeout(function(){
          $scope.showMensagem = false;
       }, 2000);
    };   

    if($routeParams.clienteId) {
        recursoCliente.get({clienteId: $routeParams.clienteId}, function(ret){          
            $scope.cliente = ret;            
        }, function(erro){
            console.log(erro);            
            doMensagem(erro);
        });
    }

    $scope.alterarCliente = function(cliente) {
        $location.path(`/clientes/edit/${ cliente.pk }`);
    };

    ///mudar paginação
    $scope.mudarPagina = function(inc){
        if (($scope.pagina + inc) > 0){    
            $scope.pagina += inc;
            $scope.listar();
        }    
    };

    ///evento nas variaveis de filtro
    $scope.$watch("filtro", () => { 
        $scope.pagina = 1;
        $scope.listar(); 
    });    
    
    ///metodo listar
    $scope.listar = function() {
        let _sqlCustom = new share.SqlCustom(); 
        _sqlCustom.addWhereAnd({ field: "nome", operator: "like", value: $scope.filtro+"%" });            
        _sqlCustom.addOrderBy({ field: "nome", type: "asc" });
        _sqlCustom._limit = $scope.registrosPorPagina;
        _sqlCustom._offset = ($scope.registrosPorPagina * $scope.pagina) - $scope.registrosPorPagina;
        recursoCliente.query({sqlCustom:_sqlCustom}, function(clientes){    	        
                $scope.removidos = 0;
                $scope.clientes = clientes;    	
            }, function(erro) {                
                doMensagem(erro);
            }
        );
    };
});
