angular.module('escala.controller', [])

.controller('telaescalaCtrl', ['$scope', '$http', function($scope, $http){
	$scope.agentes = ['', 'nieraldo', 'aurélio'];
	$scope.agentes.sort();
	$scope.servico = ['', 'expediente', 'folga', 'plantao', '24horas', 'extra', 'complemento', 'férias', 'bim', 'sobreaviso', 'dispensa', 'licença', 'feira']
	$scope.folgas = ['',1,2,3,4,5];
	$scope.visiblePeriodo = true;
	$scope.visible = false;
	
	
	function dias(val, val2){

		if((val === 1) || (val === 3) || (val === 5) || (val === 7) || (val === 8) || (val === 10) || (val === 12)){
			return 31;
		}else if(val === 2){
		//inicio do método para descobrir se é bissexto
			return (val2 % 4 == 0 && (val2 % 100 != 0 || val2 % 400 == 0)) ? 29 :  28;
		}else{
			return 30;
		}
	}

	function retornaPeriodo(){
		var data  = document.getElementById("mes").value;
		var mes = parseInt(data.substring(5,7));
		var ano = parseInt(data.substring(0,4));
		var array = [];
		for(var i = 1; i<=dias(mes, ano); i++){
			array.push(i);
		}

		return array;

	}

	function zeros(num){
		return (num < 10) ? '0' + num : num;
	}

	function limpar(){
		document.getElementById('status').selectedIndex = 0;
		document.getElementById('agente').selectedIndex = 0;
		document.getElementById('passo').selectedIndex = 0;
		document.getElementById('inicio').selectedIndex = 0;
		document.getElementById('fim').selectedIndex = 0;
		document.getElementById("mes").value = null;

	}

	function retornaMes(value){
		var meses = ['JANEIRO', 'FEVEREIRO', 'MARÇO', 'ABRIL', 'MAIO', 'JUNHO', 'JULHO', 'AGOSTO', 'SETEMBRO', 'OUTUBRO', 'NOVEMBRO', 'DEZEMBRO']
		return meses[value - 1];
	}



	$scope.escalar = function(){
		var data = document.getElementById("mes").value
		var mes = parseInt(data.substring(5,7))
			if(data){
				$scope.visiblePeriodo = false;
				$scope.visible = true;
				$scope.dias = retornaPeriodo()
				$scope.nomeMes = retornaMes(mes);
			}
	}

	$scope.selecionar = function(){
		$scope.visiblePeriodo = true;
		$scope.visible = false;
		limpar();
	}
	
	$scope.salvar = function(){
		var data = (document.getElementById("mes").value || '');
		var mes = parseInt(data.substring(5,7))
		var ano = parseInt(data.substring(0,4))
		var inicio = document.getElementById("inicio").value;
		var fim = document.getElementById("fim").value;
		var passo = document.getElementById("passo").value;
		var agente = document.getElementById("agente").value;
		var status = document.getElementById("status").value;


		
		for(var i = parseInt(inicio); i <= parseInt(fim); i+=parseInt(passo)){
			var body = 
			{
			nome: agente,
			data: zeros(i)+zeros(mes)+ano,
			ordem: '0',
			status: status
			}

			console.log(i);


			var promise = $http.put('http://ccuanexos.herokuapp.com/agentes/escala', body);
			if(i === parseInt(fim)){
				promise.then(alert('Concluído.'));
			}
						
		}

		
	
	}
	
}])
.controller('ordemCtrl', [function(){

}])

