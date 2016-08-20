angular.module('estoque').controller('ClienteDiarioController', function($scope, recursoClienteDiario, $routeParams, cadastroDeClienteDiarios, $timeout, $location){  
    $scope.mensagem = '';
    $scope.clienteDiarios = [];
    $scope.clienteDiario = {};
    $scope.showMensagem = false;    
    
    ///mostrar mensagem por 2 seegundos
    doMensagem = msg => {
       $scope.mensagem = msg; 
       $scope.showMensagem = true;
       $timeout(() => {
          $scope.showMensagem = false;
       }, 2000);
    };   
    
    ///evento nas variavel pk
    $scope.$watch("clienteDiario.pk", () =>  
        $scope.titulo = `${$scope.clienteDiario.pk ? `Alterar` : `Novo`}`    
    ); 

    ///monitora quando o evento clienteGet é disparado, ou seja, quando 
    ///é aberto o cadastro de um cliente 
    $scope.$on("clienteGet", (event, args) => {         
        $scope.listar(args.clienteId) 
    });

    ///pegar o o valor de um campo do item do array pelo valor de outro campo
    $scope.getFieldByValue = (val, valIdx, arr, retIdx) => {           
        if (arr.length > 0) {    
            return arr[arr.findIndex(e => e[valIdx] === val)][retIdx];
        }        
    }
        
    $scope.novo = idCliente => {
        $scope.clienteDiario = {};  
        $scope.clienteDiario.fk_cliente = idCliente;
        $scope.clienteDiario.data = new Date();   
    }

    ///metodo listar
    $scope.listar = clienteId => {        
        recursoClienteDiario.query({clienteId:clienteId}, clienteDiarios => {                         
                clienteDiarios.map((e, i) => {
                    ///converter a data para o formato de exibição DD/MM/YYYY                    
                    e.data = DateHelper.dataParaTexto(e.data);                    
                });               
                $scope.clienteDiarios = clienteDiarios;                           
            }, erro => doMensagem(erro)
        );
    };

    ///pegar o telefone por id
    $scope.getByID = clienteDiario => {                  
        recursoClienteDiario.get({clienteDiarioId: clienteDiario.pk}, ret => {          
            $scope.clienteDiario = ret;                               
        }, erro => {
            console.log(erro);            
            doMensagem(erro);
        });
    };

    ///metodo remover, recebe como parametro o objeto produto
    $scope.remover = clienteDiario => {
        if (confirm('Confirmar Exclusão do Diario?')) {
            recursoClienteDiario.delete({clienteDiarioId: clienteDiario.pk}, ret => {                
                $scope.clienteDiarios.splice($scope.clienteDiarios.findIndex(e => e["pk"] === clienteDiario.pk), 1);
            }, erro => {
                console.log(erro);
                doMensagem(erro);
            });
        } 
    };

    ///metodo submeter, disparado quando clicado no botao salvar
    $scope.submeter = idCliente => {                    
        cadastroDeClienteDiarios.cadastrar($scope.clienteDiario)
            .then(dados => {                   
                $scope.clienteDiario = {};
                if (idCliente){
                    $scope.listar(idCliente);    
                }                                  
            })
            .catch(erro => {
                $scope.clienteDiario = {};
                doMensagem(erro.mensagem);
            });
        
    };
});