angular.module('ordem.controller', [])
.controller('ordemCtrl', ['$ionicLoading','$http', '$q', '$state','$scope', 'ordemFactory', 'retornaService', function($ionicLoading, $http, $q, $state, $scope, ordemFactory, retornaService){
	//ordemFactory.setNumero();
	$scope.fases = ['', 'chefe', 'equipe', 'ação', 'vtr', 'agentes', 'salvar', 'escalar', 'sair', 'os']
	$scope.horas = ['','00:00', '00:30', '01:00', '01:30', '02:00', '02:30', '03:00', '03:30', '04:00', '04:30', '05:00', '05:30', '06:00', '06:30', '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30'];
	$scope.showChefe = false;
	$scope.showAcao = false;
	$scope.showVtr = false;
	$scope.showEquipe = false;
	$scope.showAgentes = false;
	$scope.showSalvar = false;
	$scope.showEscalar = false;
	$scope.showSair = false;
	$scope.showVer = false;
	//seta a visibilidade do botão chefia
	$scope.disabledChefia = false;


	var setNumero = function(){
	
			return $q(function(resolve, reject){
	
				var promise = $http.get('http://ccuanexos.herokuapp.com/ordem/ultimo')
				promise.then(function(data){
				ordemFactory.setNumero(data.data[0].numero + 1)
				var ordem = ordemFactory.get();
				//ordem.numero = data.data[0].numero + 1;
				resolve(ordem.numero);
				document.getElementById("numOrdem").innerHTML = ordem.numero;
	
				});
	
				promise.then(function(){
					$scope.$broadcast('scroll.refreshComplete');
				});
	
				promise.catch(function(err){
					reject(err);
				});
		})	
	}

	$scope.doRefresh = function(){
		var promise = setNumero();
		promise
		.then(function(data){
		})
		.then($scope.disabledChefia = false);
	}

	$scope.selecionar = function(){
		
		if(document.getElementById('fase').value === 'chefe'){
			$scope.showChefe = true;
			$scope.showAcao = false;
			$scope.showVtr = false;
			$scope.showEquipe = false;
			$scope.showAgentes = false;
			$scope.showSalvar = false;
			$scope.showEscalar = false;
			$scope.showSair = false;
			$scope.showVer = false;
		}else if(document.getElementById('fase').value === 'ação'){
			$scope.showChefe = false;
			$scope.showAcao = true;
			$scope.showVtr = false;
			$scope.showEquipe = false;
			$scope.showAgentes = false;
			$scope.showSalvar = false;
			$scope.showEscalar = false;
			$scope.showSair = false;
			$scope.showVer = false;
		}else if(document.getElementById('fase').value === 'vtr'){
			$scope.showChefe = false;
			$scope.showAcao = false;
			$scope.showVtr = true;
			$scope.showEquipe = false;
			$scope.showAgentes = false;
			$scope.showSalvar = false;
			$scope.showEscalar = false;
			$scope.showSair = false;
			$scope.showVer = false;
		}else if(document.getElementById('fase').value === 'equipe'){
			$scope.showChefe = false;
			$scope.showAcao = false;
			$scope.showVtr = false;
			$scope.showEquipe = true;
			$scope.showAgentes = false;
			$scope.showSalvar = false;
			$scope.showEscalar = false;
			$scope.showSair = false;
			$scope.showVer = false;
		}else if(document.getElementById('fase').value === 'agentes'){
			$scope.showChefe = false;
			$scope.showAcao = false;
			$scope.showVtr = false;
			$scope.showEquipe = false;
			$scope.showAgentes = true;
			$scope.showSalvar = false;
			$scope.showEscalar = false;
			$scope.showSair = false;
			$scope.showVer = false;
		}else if(document.getElementById('fase').value === 'salvar'){
			$scope.showChefe = false;
			$scope.showAcao = false;
			$scope.showVtr = false;
			$scope.showEquipe = false;
			$scope.showAgentes = false;
			$scope.showSalvar = true;
			$scope.showEscalar = false;
			$scope.showSair = false;
			$scope.showVer = false;
		}else if(document.getElementById('fase').value === 'escalar'){
			$scope.showChefe = false;
			$scope.showAcao = false;
			$scope.showVtr = false;
			$scope.showEquipe = false;
			$scope.showAgentes = false;
			$scope.showSalvar = false;
			$scope.showEscalar = true;
			$scope.showSair = false;
			$scope.showVer = false;
		}else if(document.getElementById('fase').value === 'sair'){
			$scope.showChefe = false;
			$scope.showAcao = false;
			$scope.showVtr = false;
			$scope.showEquipe = false;
			$scope.showAgentes = false;
			$scope.showSalvar = false;
			$scope.showEscalar = false;
			$scope.showSair = true;
			$scope.showVer = false;
		}else{
			$scope.showChefe = false;
			$scope.showAcao = false;
			$scope.showVtr = false;
			$scope.showEquipe = false;
			$scope.showAgentes = false;
			$scope.showSalvar = false;
			$scope.showEscalar = false;
			$scope.showSair = false;
			$scope.showVer = true;
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
			$scope.disabledChefia = true;
			ordemFactory.destruir();
			document.getElementById('data').value = '';
			document.getElementById('apresentacao').selectedIndex = 0;
			document.getElementById('termino').selectedIndex = 0;
			document.getElementById("numOrdem").innerHTML = null;	
	}


	function criaOrdem(){
		var inicio = document.getElementById('apresentacao').value;
		var fim = document.getElementById('termino').value;
		var dia = retornaService.getData();
		ordemFactory.setHorarios(inicio, fim, dia);

		return $q(function(resolve, reject){
			var obj = ordemFactory.get();
			var count = 0;

			//itera o objeto para contar os atributos
			for (i in obj){
			count++;
			}

			function inserir(){
				body = ordemFactory.get();
				$http.post('http://ccuanexos.herokuapp.com/ordem', body);
			}

			if(count === 10){
				resolve(inserir());
			}else{
				alert('OS incompleta.');
			}

		})

	}

	function atualizaEscala(){
		return $q(function(resolve, reject){
			var obj = ordemFactory.get();
			var ordem = obj.numero;
			var dia = obj.data;
			var chefes = obj.chefe.split(',');
			
			var agentes = obj.agentes.split(',');
			var tamVetor = agentes.length;
			var count = 0;
			chefes.forEach(function(value){
				agentes.push(value);
			})

			agentes.forEach(function(value){
				count++;

				var body =
				{
					nome: value.substring(3).trim(),
					data: dia,
					status: 'escalado',
					ordem: ordem
				}

			var promise = $http.put('http://ccuanexos.herokuapp.com/agentes/escala', body);
			$ionicLoading.show({template: 'Carregando...'});
  		
			promise.catch(function(err){
				$ionicLoading.hide();
				return reject(err);
			});

				if(tamVetor === count){
					promise.then(function(){
					$ionicLoading.hide();
					limpaObj();
					});
				}
			})
		});
	}

	$scope.salvar = function(){
		//retornaService.abrirPagina('ordem');
		
		var promise = criaOrdem();

		promise
		.then(atualizaEscala)
		.then(limpaObj)
		
	}

	$scope.clicar = function(){

		if(ordemFactory.get()){
			if(ordemFactory.get() !== undefined){
				var obj = ordemFactory.get();
			}
			
		}

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

	$scope.escalar = function(){
		$state.go('telaescala');
	}

	$scope.verOS = function(){
		$state.go('numero');
	}

	$scope.sair = function(){
        return navigator.app.exitApp()
    }


}])


.controller('chefeCtrl', ['$ionicLoading', '$q', '$http', '$scope', 'retornaService', 'ordemFactory', function($ionicLoading, $q, $http, $scope, retornaService, ordemFactory){
	$scope.selBotao = false;
	$scope.selChefe = true;
	$scope.chefes = [];
	
	if(retornaService.retornaArray()){
		retornaService.reseta();
	}

	var filtrarChefe = function(value){
		if(value.data == retornaService.getData() && value.chefe == true && value.status == 'plantão'){
			return true;
		}
	}

	//Em futuras versões criar um serviço genérico para esse carregamento
	function popula(){
		var agentes = {};
		agentes.escala = []
		return $q(function(resolve, reject){
			var promise = $http.get('http://ccuanexos.herokuapp.com/agentes/');

				$ionicLoading.show({template: 'Carregando...'});
  
    				
					promise.then
					(
						function(data)
						{
						$ionicLoading.hide();
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
							$ionicLoading.hide();
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
			$scope.chefes = ['']
			data.forEach(function(value){
				$scope.chefes.push(value);
			})
		})	
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

.controller('agenteCtrl', ['$ionicLoading','$q', '$http', '$scope', 'retornaService',  'ordemFactory', function($ionicLoading, $q, $http, $scope, retornaService, ordemFactory){
	$scope.selBotao = false;
	$scope.selChefe = true;
	$scope.chefes = [];
	
	if(retornaService.retornaArray()){
		retornaService.reseta();
	}

	var filtrarAgente = function(value){
		if(value.data == retornaService.getData() && value.chefe == false && value.status == 'plantão'){
			return true;
		}
	}

	//Em futuras versões criar um serviço genérico para esse carregamento
	function popula(){
		var agentes = {};
		agentes.escala = []
		return $q(function(resolve, reject){
			var promise = $http.get('http://ccuanexos.herokuapp.com/agentes/');
				$ionicLoading.show({template: 'Carregando...'});

					promise.then
					(
						function(data)
						{
						$ionicLoading.hide();
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
							$ionicLoading.hide();
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

.controller('numeroCtrl', ['$scope', '$http', '$q', '$ionicLoading', '$state', function($scope, $http, $q, $ionicLoading, $state){
	$scope.numero = 0;
	$scope.showMostrar = false;

	function busca(){
		return $q(function(resolve, reject){
			var numero = document.getElementById('numero').value;
			if(numero){
			var body = {numero: numero}

						var promise = $http.post('http://ccuanexos.herokuapp.com/ordem/numero', body)
						$ionicLoading.show({template: 'Carregando...'});
						promise.then(function(data){
							$ionicLoading.hide();
							resolve(data)
						})
						.catch(function(err){
							$ionicLoading.hide();
							reject('Número inexistente');
						})
			}else{
				reject('Informe um número.');
			}
		})
	};

				function dataExtenso(data){
					var dia = data.substring(0,2);
					var mes = parseInt(data.substring(2,4));
					var ano = data.substring(4);
					var meses = ['', 'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro']
					return dia +' de '+ meses[mes] + ' de ' + ano;
				} 


				function preenche(obj){
					$scope.status = obj.status;
					$scope.data = dataExtenso(obj.data);
					$scope.apresentacao = obj.apresentacao;
					$scope.termino = obj.termino;
					$scope.chefias = obj.chefe;
					$scope.equipes = obj.equipe;
					$scope.acaos = obj.acao;
					$scope.viaturas = obj.viatura;
					$scope.agentes = obj.agentes;
					$scope.showMostrar = true;
				}

				$scope.buscar = function(){
					var promise = busca();
					promise.then(function(data){
					var obj = data.data[0];
						if(obj){
							preenche(obj);
							
						}else{
							alert('Número inválido');
						}
					});		


					promise.catch(function(err){
					alert(err);
					})
				}

				$scope.doRefresh = function(){
					$state.go('ordem');
				}

				$scope.cancelar = function(){
					$state.go('cancela');
				}

	
}])

.controller('cancelaCtrl', ['$scope', '$http', '$q', '$ionicLoading', '$state', function($scope, $http, $q, $ionicLoading, $state){	
	$scope.numero = 0;
	$scope.showMostrar = false;

	function desescalar(obj){
		var cancelados = []
		var data = obj.data;

		obj.chefe.forEach(function(value){
			//console.log(value.substring(3));
			cancelados.push(value.substring(4));
		})

		obj.agentes.forEach(function(value){
			//console.log(value.substring(3))
			cancelados.push(value.substring(4));
		})

		cancelados.forEach(function(value){
			var body = {nome: value, data: data, status: 'plantão', ordem: ''}
			var promise = $http.put('http://ccuanexos.herokuapp.com/agentes/escala', body)
			$ionicLoading.show({template: 'Carregando...'});
			promise.then($ionicLoading.hide()).catch($ionicLoading.hide());
		})

	}

	function atualiza(){

			var numero = document.getElementById('numcancela').value;
			var body = {numero: numero, status: 'cancelada'}
			$ionicLoading.show({template: 'Carregando...'});
			var promise = $http.put('http://ccuanexos.herokuapp.com/ordem/escala', body);
			promise.then($ionicLoading.hide());
			promise.catch($ionicLoading.hide());
	}		

	function busca(){
		return $q(function(resolve, reject){
			var numero = document.getElementById('numcancela').value;
			
			var body = {numero: numero}

					var promise = $http.post('http://ccuanexos.herokuapp.com/ordem/numero', body)
					$ionicLoading.show({template: 'Carregando...'});
					promise.then(function(data){
					$ionicLoading.hide();
					atualiza();
					resolve(data)
					})
					.catch(function(err){
					$ionicLoading.hide();
					reject('Número inexistente');
					})
			
		})
	};
				

				$scope.cancelar = function(){
					var promise = busca();
					promise.then(function(data){
					var obj = data.data[0];
						if(obj){
							desescalar(obj);
							
						}else{
							alert('Número inválido');
					}
				
				});		


					promise.catch(function(err){
					alert(err);
					})
				}

				$scope.doRefresh = function(){
					$state.go('ordem');
				}

				$scope.trocar = function(){
					$state.go('troca');
				}

	
}])

.controller('trocaCtrl', ['$scope', '$q', '$http', '$ionicLoading', 'dataFactory', '$state', function($scope, $q, $http, $ionicLoading, dataFactory, $state){
$scope.posicoes = ['','chefe','agentes']
$scope.opcoes = ['', 'trocar', 'tirar', 'inserir']
$scope.showTrocar = false;
$scope.showTirar = false;
$scope.showInserir = false;
$scope.showOpcao = false;
var dataOrdem = '';

var obj = {}
obj.chefe = 'nieraldo';
obj.agentes = 'fulano';

	
	var filtrar = function(value){
		var chefe = document.getElementById('posicao').value;

		if(chefe){
			if(chefe === 'chefe'){
				var flag = true;
			}else{
				var flag = false;
			}
		}

		if(value.data == dataFactory.get() && value.chefe == flag && value.status == 'plantão'){
			return true;
		}
	}


	function busca(){
		return $q(function(resolve, reject){
			var numero = document.getElementById('num').value || '';
			var posicao = document.getElementById('posicao').value || '';
			var body = {numero: numero}

						var promise = $http.post('http://ccuanexos.herokuapp.com/ordem/numero', body)
						if(!numero){
							reject('Defina um numero')
						}else if(!posicao){
							reject('Defina chefia!')
						}
						$ionicLoading.show({template: 'Carregando...'});
						promise.then(function(data){
							$ionicLoading.hide();
							var obj = data.data[0];			
							if(obj){
								if(obj.status === 'ativa'){
									dataFactory.set(obj.data);
									dataFactory.setNumero(obj.numero);
									dataFactory.setEscalados(obj[posicao]);//seta a string que será utilizada para ver quem está escalado
									var str = dataFactory.getEscalados()
									resolve(obj[posicao]);
								}else{
									reject('OS cancelada');
								}					

							}else{
								reject('Obj inexistente');
							}
							
						})
						.catch(function(err){
							$ionicLoading.hide();
							reject(err);
						})
		})
	};

	function localiza(){
		var body = {data: dataFactory.get(), status: 'plantão' }
		return $q(function(resolve, reject){
			$ionicLoading.show({template: 'Carregando...'});
			var promise = $http.post('http://ccuanexos.herokuapp.com/agentes/localiza', body)
			.then(function(data){
				$ionicLoading.hide();
				resolve(data)
			})
			.catch(function(err){
				$ionicLoading.hide();
				resolve(err);
			})
		})
	}

	

	$scope.buscar = function(){
		$scope.entrada = [];
		$scope.saida = [];
		var promise = busca();
		promise.then(function(value){
			$scope.saida = [];
			value.forEach(function(value){
				$scope.saida.push(value.substring(4));
			})
		}).then(function(){
			var promise = localiza();
			promise.then(function(data){
				var transferencia = data.data.filter(filtrar);
				$scope.entrada = [];
				transferencia.forEach(function(value){
					$scope.entrada.push(value.nome);
				})
				$scope.showOpcao = true;
			})
		})

		promise.catch(function(err){
			alert(err);
		});
	}


	function atualiza(valor){
		var numero = document.getElementById('num').value;
		var chefia = document.getElementById('posicao').value;
		var body = {}
		body['numero'] = numero;
		body[chefia] = valor;
		if(chefia === 'chefe'){
		$ionicLoading.show({template: 'Carregando...'});
			$http.put('http://ccuanexos.herokuapp.com/ordem/atualChefe', body)
			.then(function(value){
				$ionicLoading.hide();
			})
			.catch($ionicLoading.hide());
		}else{
		$ionicLoading.show({template: 'Carregando...'});
			$http.put('http://ccuanexos.herokuapp.com/ordem/atualAgente', body)
			.then(function(value){
				$ionicLoading.hide();
			})
			.catch($ionicLoading.hide());	
		}
	}


	function entraStatus(){
		var obj = {}
		var nome = document.getElementById('entra').value;
			if(nome){
				obj['nome']		= nome;
				obj['data'] 	= dataFactory.get();
				obj['status'] 	= 'escalado'
				obj['ordem'] 	= dataFactory.getNumero().toString();
				$ionicLoading.show({template: 'Carregando...'});
				$http.put('http://ccuanexos.herokuapp.com/agentes/escala', obj)
				.then($ionicLoading.hide())
				.catch($ionicLoading.hide())
		}
	}

	function saiStatus(){
		var obj = {}
		var nome = document.getElementById('sai').value;
			if(nome){
				obj['nome']		= nome;
				obj['data'] 	= dataFactory.get();
				obj['status'] 	= 'plantão';
				obj['ordem'] 	= '0';
				$ionicLoading.show({template: 'Carregando...'});
				$http.put('http://ccuanexos.herokuapp.com/agentes/escala', obj)
				.then($ionicLoading.hide())
				.catch($ionicLoading.hide())
		}
	}

	function reseta(){
		$scope.entrada = [''];
		$scope.saida = [''];
	}

	$scope.trocar = function(){
		var array = [];
		var entra = document.getElementById('entra').value;
		var sai = document.getElementById('sai').value;
		var chefia = document.getElementById('posicao').value;

		dataFactory.getEscalados().forEach(function(value){
			array.push(value.substring(4).trim());
		});

		str = array.toString();
		var nova = str.replace(sai, entra);
		var count = 0;
		novoArray = nova.split(',');
		strArray = []

		novoArray.forEach(function(value){
			count++;
			if(count < 10){
				var pre = '0' + count + ') ';
			}else{
				var pre = count + ') ';
			}

			strArray.push(pre + value)
		})

		atualiza(strArray.toString());
		entraStatus();
		saiStatus();
		reseta();
		esconder();
	}

	function filter(value){
		var sai = document.getElementById('sai').value;
		if(value === sai){
			return false;
		}
	}

	function esconder(){
		document.getElementById('opcao').selectedIndex = 0;
		$scope.showTrocar = false;
		$scope.showTirar = false;
		$scope.showInserir = false;
		$scope.showOpcao = false;

	}

	$scope.mostrar = function(){
		var valor = document.getElementById('opcao').value;
		if(valor === 'trocar'){
			$scope.showTrocar = true;
			$scope.showTirar = false;
			$scope.showInserir = false;
		}else if(valor === 'tirar'){
			$scope.showTrocar = false;
			$scope.showTirar = true;
			$scope.showInserir = false;
		}else if(valor === 'inserir'){
			$scope.showTrocar = false;
			$scope.showTirar = false;
			$scope.showInserir = true;
		}else{
			$scope.showTrocar = false;
			$scope.showTirar = false;
			$scope.showInserir = false;
		}

	}

	$scope.tirar =  function(){
		var array = [];
		var entra = document.getElementById('entra').value;
		var sai = document.getElementById('sai').value;
		var chefia = document.getElementById('posicao').value;

		dataFactory.getEscalados().forEach(function(value){
			array.push(value.substring(4).trim());
		});

		var editado = array.filter(filter);

		str = editado.toString();
		var count = 0;
		novoArray = str.split(',');
		strArray = []

		novoArray.forEach(function(value){
			count++;
			if(count < 10){
				var pre = '0' + count + ') ';
			}else{
				var pre = count + ') ';
			}

			strArray.push(pre + value)
		})

		if(strArray.toString().length === 4){
			strArray = [''];
		}

		atualiza(strArray.toString());
		saiStatus();
		reseta();
		esconder();
	}

	$scope.inserir = function(){
		var array = [];
		var entra = document.getElementById('entra').value;
		var chefia = document.getElementById('posicao').value;

		dataFactory.getEscalados().forEach(function(value){
			array.push(value.substring(4).trim());
		});

		array.push(entra);
		str = array.toString();
		var count = 0;
		novoArray = str.split(',');
		strArray = []

		novoArray.forEach(function(value){
			count++;
			if(count < 10){
				var pre = '0' + count + ') ';
			}else{
				var pre = count + ') ';
			}

			strArray.push(pre + value)
		})

		atualiza(strArray.toString());
		entraStatus();
		reseta();
		esconder();
	}

	$scope.doRefresh = function(){
		$state.go('ordem');
	}


}])



