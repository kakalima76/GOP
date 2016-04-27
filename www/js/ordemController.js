angular.module('ordem.controller', [])
.controller('ordemCtrl', ['$scope', 'ordemFactory', 'retornaService', 'agentesService', function($scope, ordemFactory, retornaService, agentesService){
	ordemFactory.setNumero();
	$scope.fases = ['', 'chefe', 'equipe', 'ação', 'vtr', 'agentes', 'salvar']
	$scope.horas = ['','00:00', '00:30', '01:00', '01:30', '02:00', '02:30', '03:00', '03:30', '04:00', '04:30', '05:00', '05:30', '06:00', '06:30', '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30'];
	$scope.showChefe = false;
	$scope.showAcao = false;
	$scope.showVtr = false;
	$scope.showEquipe = false;
	$scope.showAgentes = false;
	$scope.showSalvar = false;

	$scope.selecionar = function(){
		
		if(document.getElementById('fase').value === 'chefe'){
			$scope.showChefe = true;
			$scope.showAcao = false;
			$scope.showVtr = false;
			$scope.showEquipe = false;
			$scope.showAgentes = false;
			$scope.showSalvar = false;
		}else if(document.getElementById('fase').value === 'ação'){
			$scope.showChefe = false;
			$scope.showAcao = true;
			$scope.showVtr = false;
			$scope.showEquipe = false;
			$scope.showAgentes = false;
			$scope.showSalvar = false;
		}else if(document.getElementById('fase').value === 'vtr'){
			$scope.showChefe = false;
			$scope.showAcao = false;
			$scope.showVtr = true;
			$scope.showEquipe = false;
			$scope.showAgentes = false;
			$scope.showSalvar = false;
		}else if(document.getElementById('fase').value === 'equipe'){
			$scope.showChefe = false;
			$scope.showAcao = false;
			$scope.showVtr = false;
			$scope.showEquipe = true;
			$scope.showAgentes = false;
			$scope.showSalvar = false;
		}else if(document.getElementById('fase').value === 'agentes'){
			$scope.showChefe = false;
			$scope.showAcao = false;
			$scope.showVtr = false;
			$scope.showEquipe = false;
			$scope.showAgentes = true;
			$scope.showSalvar = false;
		}else if(document.getElementById('fase').value === 'salvar'){
			$scope.showChefe = false;
			$scope.showAcao = false;
			$scope.showVtr = false;
			$scope.showEquipe = false;
			$scope.showAgentes = false;
			$scope.showSalvar = true;
		}
	}

	$scope.abrirChefe = function(){
		if(document.getElementById('data').value){
			retornaService.formaData(document.getElementById('data').value);
			retornaService.abrirPagina('chefe');
		}else{
			alert('Defina uma data.');
		}
		
	}

	$scope.abrirAcao = function(){
		retornaService.abrirPagina('acao');
	}

	$scope.abrirViatura = function(){
		retornaService.abrirPagina('vtr');
	}

	$scope.abrirEquipe = function(){
		retornaService.abrirPagina('equipe');
	}

	$scope.abrirAgentes = function(){
		retornaService.formaData(document.getElementById('data').value)
		retornaService.abrirPagina('agente');
	}


	function limpaObj(){
			$scope.chefias  = [];
			$scope.equipes  = [];
			$scope.acaos  = [];
			$scope.viaturas  = [];
			$scope.agentes  = [];
		
	}

	$scope.salvar = function(){
		//retornaService.abrirPagina('ordem');
		var inicio = document.getElementById('apresentacao').value;
		var fim = document.getElementById('termino').value;
		ordemFactory.setHorarios(inicio, fim)
		limpaObj();
	}

	$scope.clicar = function(){

		var obj = ordemFactory.get();

		if(obj.chefe){
			var array1 = obj.chefe.split(',');
			$scope.chefias  = array1;
		}

		if(obj.equipe){
			var array2 = obj.equipe.split(',');
			$scope.equipes  = array2;
		}

		if(obj.acao){
			var array3 = obj.acao.split(',');
			$scope.acaos  = array3;
		}


		if(obj.viatura){
			var array4 = obj.viatura.split(',');
			$scope.viaturas  = array4;
		}

		if(obj.agentes){
			var array5 = obj.agentes.split(',');
			$scope.agentes  = array5;
		}
	}


}])


.controller('chefeCtrl', ['$q', '$http', '$scope', 'retornaService', 'agentesService', 'ordemFactory', function($q, $http, $scope, retornaService, agentesService, ordemFactory){
	$scope.selBotao = false;
	$scope.selChefe = true;
	$scope.chefes = [];
	
	if(retornaService.retornaArray()){
		retornaService.reseta();
	}

	var filtrarChefe = function(value){
		if(value.data == retornaService.getData() && value.chefe == true && value.status == 'folga'){
			return true;
		}
	}

	//Em futuras versões criar um serviço genérico para esse carregamento
	function popula(){
		var agentes = {};
		agentes.escala = []
		return $q(function(resolve, reject){
			var promise = $http.get('http://ccuanexos.herokuapp.com/agentes/');
			var node = document.createElement('h5');
			var texto = document.createTextNode('caregando...');
			node.appendChild(texto);
			document.getElementById('carregar').appendChild(node);

					promise.then
					(
						function(data)
						{
						document.getElementById('carregar').removeChild(node);
						var response = data.data.filter(filtrarChefe);
						var map = response.map(function(value){
							return value.nome;
						})
						resolve(map)
						}
					);

					promise.catch
					(
						function(err){
							reject(err);
						}
					)

		})//fim do serviço $q		
	}

	$scope.carregar = function(){

		var promise = popula();
		promise.then(function(data){
			$scope.selBotao = true;
			$scope.selChefe = false;
			$scope.chefes = data.sort();
		})
		/*agentesService.setAgentes();
		$scope.chefes = agentesService.getChefes();
		$scope.selBotao = true;
		$scope.selChefe = false;*/

		

	}

	


	$scope.limpar = function(){
		retornaService.reseta();
		$scope.selecionados = retornaService.retornaArray();
	}

	$scope.confirmar = function(){
		var rg = /(,)*(;)*/ig;
		var str = document.getElementById('chefe').value
		retornaService.guarda(str.replace(rg,''));
		$scope.selecionados = retornaService.retornaArray();
		document.getElementById('chefe').value = null;
	}

	$scope.salvar = function(){
		ordemFactory.setChefe($scope.selecionados)
		retornaService.reseta();
		$scope.selecionados = retornaService.retornaArray();
		$scope.chefes = retornaService.retornaArray();
		retornaService.abrirPagina('ordem');
		$scope.selBotao = false;
		$scope.selChefe = true;
	}
	
}])


.controller('vtrCtrl', ['$scope', 'retornaService', 'ordemFactory', function($scope, retornaService, ordemFactory){
	$scope.viaturas = ['', 'amarok 01', 'amarok 02']
	$scope.selecionados = []
	if(retornaService.retornaArray()){
		retornaService.reseta();
	}


	$scope.limpar = function(){
		retornaService.reseta();
		$scope.selecionados = retornaService.retornaArray();
	}

	$scope.confirmar = function(){
		var rg = /(,)*(;)*/ig;
		var str = document.getElementById('vtr').value
		retornaService.guarda(str.replace(rg,''));
		//coloquei ambos retornando retornaService.retornaArray() pois retorna um array vazio
		$scope.selecionados = retornaService.retornaArray();
		$scope.chefes = retornaService.retornaArray();
		document.getElementById('vtr').value = null;
	}
	$scope.salvar = function(){
		ordemFactory.setViatura($scope.selecionados);
		retornaService.stateGo();
		
	}
}])


.controller('acaoCtrl', ['ordemFactory', '$scope', 'retornaService', function(ordemFactory, $scope, retornaService){
	$scope.selecionados = []
	if(retornaService.retornaArray()){
		retornaService.reseta();
	}

	
	$scope.limpar = function(){
		retornaService.reseta();
		$scope.selecionados = retornaService.retornaArray();
	}

	$scope.confirmar = function(){
		
		var rg = /(,)*(;)*/ig;
		var str = document.getElementById('acao').value
		retornaService.guarda(str.replace(rg,''));
		$scope.selecionados = retornaService.retornaArray();
		document.getElementById('acao').value = null;
	}

	$scope.salvar = function(){
		ordemFactory.setAcao($scope.selecionados);
		retornaService.stateGo();
		
	}


}])

.controller('agenteCtrl', ['$q', '$http', '$scope', 'retornaService', 'agentesService', 'ordemFactory', function($q, $http, $scope, retornaService, agentesService, ordemFactory){
	$scope.selBotao = false;
	$scope.selChefe = true;
	$scope.chefes = [];
	
	if(retornaService.retornaArray()){
		retornaService.reseta();
	}

	var filtrarAgente = function(value){
		if(value.data == retornaService.getData() && value.chefe == false && value.status == 'folga'){
			return true;
		}
	}

	//Em futuras versões criar um serviço genérico para esse carregamento
	function popula(){
		var agentes = {};
		agentes.escala = []
		return $q(function(resolve, reject){
			var promise = $http.get('http://ccuanexos.herokuapp.com/agentes/');
			var node = document.createElement('h5');
			var texto = document.createTextNode('caregando...');
			node.appendChild(texto);
			document.getElementById('carregar').appendChild(node);

					promise.then
					(
						function(data)
						{
						document.getElementById('carregar').removeChild(node);
						var response = data.data.filter(filtrarAgente);
						var map = response.map(function(value){
							return value.nome;
						})
						resolve(map)
						}
					);

					promise.catch
					(
						function(err){
							reject(err);
						}
					)

		})//fim do serviço $q		
	}

	$scope.carregar = function(){

		var promise = popula();
		promise.then(function(data){
			$scope.selBotao = true;
			$scope.selChefe = false;
			$scope.chefes = data.sort();
		})
		/*agentesService.setAgentes();
		$scope.chefes = agentesService.getChefes();
		$scope.selBotao = true;
		$scope.selChefe = false;*/

		

	}

	


	$scope.limpar = function(){
		retornaService.reseta();
		$scope.selecionados = retornaService.retornaArray();
	}

	$scope.confirmar = function(){
		var rg = /(,)*(;)*/ig;
		var str = document.getElementById('chefe').value
		retornaService.guarda(str.replace(rg,''));
		$scope.selecionados = retornaService.retornaArray();
		document.getElementById('chefe').value = null;
	}

	$scope.salvar = function(){
		ordemFactory.setAgentes($scope.selecionados)
		retornaService.reseta();
		$scope.selecionados = retornaService.retornaArray();
		$scope.chefes = retornaService.retornaArray();
		retornaService.abrirPagina('ordem');
		$scope.selBotao = false;
		$scope.selChefe = true;
	}
	
}])

.controller('equipeCtrl', ['$scope', 'retornaService', 'ordemFactory', function($scope, retornaService, ordemFactory){
	$scope.equipes = ['','PAF01','PAF02','PAF03','PAF04','PAF05','PAF06','PAF07','PAF08','PAF09','NEP'];
	$scope.selecionados = retornaService.retornaArray();


	$scope.limpar = function(){
		retornaService.reseta();
		$scope.selecionados = retornaService.retornaArray();
	}

	$scope.confirmar = function(){
		retornaService.guarda(document.getElementById('equipe').value);
	}

	$scope.salvar = function(){
		ordemFactory.setEquipe($scope.selecionados)
		retornaService.stateGo();
	}

}])


