const urlApi = "https://pokeapi.co/api/v2/pokemon";
const formulario = document.getElementById("frm");
const resposta = document.getElementById("resposta");
const imagem = document.getElementById("imagem");

let pokemonId;
let pokemonImg;
let pokemonType1;
let pokemonType2;

formulario.inPokemon.focus();

formulario.addEventListener("submit", function (e) {
	e.preventDefault();
	const nomePokemon = document.getElementById("inPokemon").value;
	buscarPokemonApi(nomePokemon);
});

function proximoPokemon() {
	const proximoPokemonId = pokemonId + 1;
	buscarPokemonApi(proximoPokemonId)
	document.getElementById("inPokemon").value = proximoPokemonId;
}

function pokemonAnterior() {
	const pokemonAnteriorId = pokemonId - 1
	buscarPokemonApi(pokemonAnteriorId)
	document.getElementById("inPokemon").value = pokemonAnteriorId;
}

function buscarPokemonApi(nameOrId) {
	fetch(`${urlApi}/${nameOrId}`)
		.then(response => response.json())
		.then(pokemon => {
			pokemonId = pokemon.id;
			pokemonImg = pokemon.sprites.front_default;
			pokemonType1 = pokemon.types[0].type.name;
			if (pokemon.types.length == 2) {
				pokemonType2 = pokemon.types[1].type.name;
				resposta.innerText = `ID: ${pokemonId}\nNome: ${pokemon.name}\nTipo: ${pokemonType1} / ${pokemonType2}`;
			} else {
				resposta.innerText = `ID: ${pokemonId}\nNome: ${pokemon.name}\nTipo: ${pokemonType1}`;
			}
			imagem.src = pokemonImg;
		});
}

