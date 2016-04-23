angular.module('app.controller', [])

.controller('telaescalaCtrl', ['$scope', '$http', function($scope, $http){
	$scope.agentes = ['', 'nieraldo', 'aurélio'];
	$scope.agentes.sort();
	$scope.servico = ['', 'folga', 'plantao', '24horas', 'extra', 'complemento', 'férias', 'bim', 'sobreaviso', 'dispensa', 'licença']
	$scope.folgas = ['',1,2,3,4,5];
	$scope.dias = ['',1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28];
	var x  = document.getElementById("inicio").value;
	
	function dias(val, val2){

		if((val === 1) || (val === 3) || (val === 5) || (val === 7) || (val === 8) || (val === 10) || (val === 12)){
			return 31;
		}else if(val === 2){
		//início do método para descobrir se é bissexto
			return (val2 % 4 == 0 && (val2 % 100 != 0 || val2 % 400 == 0)) ? 29 :  28;
		}else{
			return 30;
		}
	}

	function zeros(num){
		return (num < 10) ? '0' + num : num;
	}

	
	$scope.escalar = function(){
		var data = document.getElementById("mes").value;
		var mes = parseInt(data.substring(5,7))
		var ano = parseInt(data.substring(0,4))
		var inicio = document.getElementById("inicio").value;
		var passo = document.getElementById("passo").value;
		var agente = document.getElementById("agente").value;
		var status = document.getElementById("status").value;


		for(var i = parseInt(inicio); i <= dias(mes, ano); i+=parseInt(passo)){
			var body = 
			{
			nome: agente,
			data: zeros(i)+zeros(mes)+ano,
			ordem: '0',
			status: status
			}

			var promise = $http.put('http://localhost:3000/agentes/escala', body)
						
		}

	}
	
}])

