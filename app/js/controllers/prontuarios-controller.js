angular.module('estoque').controller('ProntuariosController', function($scope, recursoProntuario, $routeParams, cadastroDeProntuarios, $timeout, $location){  
    $scope.prontuarios = [];
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

    if($routeParams.prontuarioId) {
        recursoProntuario.get({prontuarioId: $routeParams.prontuarioId}, function(ret){          
            $scope.prontuario = ret;            
        }, function(erro){
            console.log(erro);            
            doMensagem(erro);
        });
    }

    $scope.alterarProntuario = function(prontuario) {
        $location.path(`/prontuarios/edit/${ prontuario.id }`);
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
        recursoProntuario.query({sqlCustom:_sqlCustom}, function(prontuarios){    	        
                $scope.removidos = 0;
                $scope.prontuarios = prontuarios;    	
            }, function(erro) {                
                doMensagem(erro);
            }
        );
    };
});