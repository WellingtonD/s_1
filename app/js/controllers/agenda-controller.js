angular.module('estoque').controller('AgendaController', function($scope, $routeParams, $timeout, $location){ 
    
    $scope.tiposAtendimento = [
        {
            id: 0,
            nome: "Consulta",
            cor: "label-success"
        },
        {
            id: 1,
            nome: "Retorno",
            cor: "label-danger"
        },
        {
            id: 2,
            nome: "Exame",
            cor: "label-warning"
        }
    ];

    $scope.agendamento = {};

    $scope.agendaHorarios = [
        {
            hora : "08:00",
            agendamentos : [
                {
                    nomeCliente: "Derci Gonçalves", 
                    tipoAtendimento: 0 
                },
                {
                    nomeCliente: "Toni Ramos", 
                    tipoAtendimento: 2
                },
                {
                    nomeCliente: "João Cana Brava", 
                    tipoAtendimento: 1
                }
            ]
        },
        {
            hora : "08:30",
            agendamentos : []
        },
        {
            hora : "09:00",
            agendamentos : [
                {
                    nomeCliente: "Wellington A. C. Dias",
                    tipoAtendimento: 0
                },
                {
                    nomeCliente: "Daniele de Marins",
                    tipoAtendimento: 0
                }
            ]
        },
        {
            hora : "09:30",
            agendamentos : [
                {
                    nomeCliente: "Tiririca",
                    tipoAtendimento: 0
                }
            ]
        },
        {
            hora : "10:00",
            agendamentos : []
        },
        {
            hora : "10:30",
            agendamentos : [
                {
                    nomeCliente: "Inez Basil",
                    tipoAtendimento: 2
                }
            ]
        },
        {
            hora : "11:00",
            agendamentos : [
                {
                    nomeCliente: "Chico Bento",
                    tipoAtendimento: 1
                },
                {
                    nomeCliente: "Presidente Dilma",
                    tipoAtendimento: 0
                }
            ]
        },
        {
            hora : "11:30",
            agendamentos : []
        },


        {
            hora : "12:00",
            agendamentos : []
        },
        {
            hora : "12:30",
            agendamentos : []
        },
        {
            hora : "13:00",
            agendamentos : []
        },
        {
            hora : "13:30",
            agendamentos : []
        },
        {
            hora : "14:00",
            agendamentos : []
        },
        {
            hora : "14:30",
            agendamentos : []
        },
        {
            hora : "15:00",
            agendamentos : []
        },
        {
            hora : "15:30",
            agendamentos : []
        }

    ];

    $scope.alterarAgendamento = function(a){
        $scope.agendamento = a;
    }
});