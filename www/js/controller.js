angular.module('app.controller', [])

.controller('solicitacaoCtrl', ['$scope','$state', 'apoioFactory', function($scope, $state, apoioFactory){
	$scope.hora = ['','00:00', '00:30', '01:00', '01:30', '02:00', '02:30', '03:00', '03:30', '04:00', '04:30', '05:00', '05:30', '06:00', '06:30', '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30'];
	$scope.bairros = ['','Abolição', 'Acari',' Água Santa', 'Alto da Boa Vista', 'Anchieta', 'Andaraí', 'Anil', 'Bancários', 'Bangu', 'Barra da Tijuca', 'Barra de Guaratiba', 'Barros Filho', 'Benfica', 'Bento Ribeiro', 'Bonsucesso', 'Botafogo', 'Brás de Pina', 'Cachambi', 'Cacuia', 'Caju','Camorim', 'Campinho', 'Campo dos Afonsos', 'Campo Grande', 'Cascadura', 'Catete', 'Catumbi', 'Cavalcanti', 'Centro', 'Cidade de Deus', 'Cidade Nova', 'Cidade Universitária', 'Cocotá', 'Coelho Neto', 'Colégio', 'Complexo do Alemão', 'Copacabana', 'Cordovil', 'Cosme Velho', 'Cosmos', 'Costa Barros', 'Curicica', 'Del Castilho', 'Deodoro', 'Encantado', 'Engenheiro Leal', 'Engenho da Rainha', 'Engenho de Dentro', 'Engenho Novo', 'Estácio', 'Flamengo', 'Freguesia - IG', 'Freguesia - JPG', 'Galeão', 'Gamboa', 'Gardênia Azul', 'Gávea', 'Gericinó', 'Glória', 'Grajaú', 'Grumari', 'Guadalupe', 'Guaratiba', 'Higienópolis', 'Honório Gurgel', 'Humaitá', 'Inhaúma', 'Inhoaíba', 'Ipanema', 'Irajá', 'Itanhangá', 'Jacaré', 'Jacarepaguá', 'Jacarezinho', 'Jardim América', 'Jardim Botânico', 'Jardim Carioca', 'Jardim Guanabara', 'Jardim Sulacap', 'Joá', 'kosmos', 'Lagoa', 'Lapa', 'Laranjeiras', 'Leblon', 'Leme', 'Lins de Vasconcelos', 'Madureira', 'Magalhães Bastos', 'Mangueira', 'Manguinhos', 'Maracanã', 'Maré', 'Marechal Hermes', 'Maria da Graça', 'Méier', 'Moneró', 'Olaria', 'Oswaldo Cruz', 'Paciência', 'Padre Miguel', 'Paquetá', 'Parada de Lucas', 'Parque Anchieta', 'Parque Columbia', 'Pavuna', 'Pechincha', 'Pedra de Guaratiba', 'Penha', 'Penha Circular', 'Piedade', 'Pilares', 'Pitangueiras', 'Portuguesa', 'Praça da Bandeira', 'Praça Seca', 'Praia da Bandeira', 'Quintino Bocaiúva', 'Ramos', 'Realengo', 'Recreio dos Bandeirantes', 'Riachuelo', 'Ribeira', 'Ricardo de Albuquerque', 'Rio Comprido', 'Rocha', 'Rocha Miranda', 'Rocinha', 'Sampaio', 'Santa Cruz', 'Santa Teresa', 'Santíssimo', 'Santo Cristo', 'São Conrado', 'São Cristóvão', 'São Francisco Xavier', 'Saúde', 'Senador Camará', 'Senador Vasconcelos', 'Sepetiba', 'Tanque', 'Taquara', 'Tauá', 'Tijuca', 'Todos os Santos', 'Tomás Coelho', 'Turiaçu', 'Urca', 'Vargem Grande', 'Vargem Pequena', 'Vasco da Gama', 'Vaz Lobo', 'Vicente de Carvalho', 'Vidigal', 'Vigário Geral', 'Vila Cosmos', 'Vila da Penha', 'Vila Isabel', 'Vila Militar', 'Vila Valqueire', 'Vista Alegre', 'Zumbi']
	$scope.motivos = ['', 'Notificação', 'Multa', 'Fisc. Autorizados', 'Desocupação', 'Ret. Equipametos']

	function limpar(){
		document.getElementById('hora').selectedIndex = 0;
		document.getElementById('bairro').selectedIndex = 0;
		document.getElementById('motivo').selectedIndex = 0;
		document.getElementById('data').value = null;
		document.getElementById('ponto').value = null;
	}

	$scope.limpar = function(){
		limpar();
	}

	$scope.apoiar = function(){
		$state.go('apoio')
		apoioFactory.zeraPosicao();
	}

	//document.getElementById('artigo').selectedIndex = 0;

}]).

controller('apoioCtrl', ['$scope', 'apoioFactory', '$state', function($scope, apoioFactory, $state){
	$scope.apoio = ['', 'AGENTE(S) GM', 'EQUIPE(S) GET', 'EQUIPE(S) GOE', 'PATRULHA(S) DA PMERJ', 'CAMINHÃO(ÕES) COMLURB + TRABALHADORES', 'EQUIPE(S) SECONSEVA + TRABALHADORES', 'RETROESCAVADEIRA(S)', 'EQUIPE(S) RIO-LUZ', 'EQUIPE(S) LIGTH', 'CAMINHÃO(ÕES) BAÚ', 'CAMINHÃO MUNCK', 'REBOQUE(S)', 'FAE(S)'];
	$scope.solicitacao = [];

	function limpar(){
		$scope.solicitacao = [];
	}

	function limpaBox(){
		document.getElementById('orgao').selectedIndex = 0;
		document.getElementById('quantidade').value = null;
	}
	
	$scope.add = function(){

		var apoio = document.getElementById("orgao").value
		var quantidade = document.getElementById('quantidade').value;
		if(apoio && quantidade){
			apoioFactory.setPosicao();
			var posicao = apoioFactory.getPosicao();
			$scope.solicitacao.push('0' + posicao + ') ' + quantidade + ' ' + apoio);
			apoioFactory.setApoio($scope.solicitacao.toString());
			console.log(apoioFactory.getApoio());
		}
		limpaBox();
		
	}

	$scope.clear = function(){
		limpar();
		limpaBox();
		apoioFactory.zeraPosicao();
	}

	$scope.save = function(){
		$state.go('solicitacao');
		limpar();
	}
	
	
}]).

factory('apoioFactory', [function(){
	var solicitacao = {};
	solicitacao.posicao = 0;


	var setApoio = function(value){
		return solicitacao.apoio = value;
	}

	var getApoio = function(){
		return solicitacao.apoio;
	}

	var setPosicao = function(){
		return solicitacao.posicao += 1; 
	}

	var getPosicao = function(){
		return solicitacao.posicao;
	}

	var zeraPosicao = function(){
		return solicitacao.posicao = 0;
	}



	return {
		setApoio: setApoio,
		getApoio: getApoio,
		setPosicao: setPosicao,
		getPosicao: getPosicao,
		zeraPosicao: zeraPosicao
	}

}])

