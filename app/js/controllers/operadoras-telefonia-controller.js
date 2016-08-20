angular.module('estoque').controller('OperadorasTelefoniaController', function($scope, recursoOperadoraTelefonia, $routeParams, cadastroDeOperadorasTelefonia, $timeout, $location){  
    $scope.mensagem = '';
    $scope.operadorasTelefonia = [];
    $scope.operadoraTelefonia = {};
    $scope.showMensagem = false;
    $scope.titulo = `${$routeParams.operadoraTelefoniaId ? `Alterar` : `Nova`} Operadora`;
 
    ///mostrar mensagem por 2 seegundos
    doMensagem = function(msg) {
       $scope.mensagem = msg; 
       $scope.showMensagem = true;
       $timeout(function(){
          $scope.showMensagem = false;
       }, 2000);
    };   
    
    ///metodo listar
    $scope.listar = function(){       
        recursoOperadoraTelefonia.query(function(operadorasTelefonia){                            
                $scope.operadorasTelefonia = operadorasTelefonia;    	
            }, function(erro) {    
                console.log(erro);            
                doMensagem(erro);
            }
        );
    };
    

    ///metodo remover, recebe como parametro o objeto produto
    $scope.remover = function(operadoraTelefonia){
        if (confirm('Confirmar Exclusão do Telefone?')) {
            recursoOperadoraTelefonia.delete({operadoraTelefoniaId: operadoraTelefonia.pk}, function(ret){                
                ////
            }, function(erro){
                console.log(erro);
                doMensagem(erro);
            });
        } 
    };

    ///metodo submeter, disparado quando clicado no botao salvar
    $scope.submeter = function() {
        if ($scope.formulario.$valid) {
            cadastroDeClienteTelefones.cadastrar($scope.operadoraTelefonia)
                .then(function(dados) {
                   $scope.operadoraTelefonia = {};                                 
                })
                .catch(function(erro) {
                    $scope.operadoraTelefonia = {};
                    doMensagem(erro.mensagem);
                });
        }
    };
});