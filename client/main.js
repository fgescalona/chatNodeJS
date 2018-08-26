/**
 * Este es el cliente
 */

/**
 * variable socket se le pasa la url, El forceNew : true indica que la conexion se fuerce 
 *  
 */

var socket = io.connect('ip:puerto', {'forceNew': true});

/**
 * El cliente recibe el mensaje
 */

socket.on('messages', function(data) {
	console.log(data);
	render(data);
});

/**
 * Funcion para poder pintar el array de objeto con los mensajes, le paso los datos y creo una variable html
 * el metodo map(), permite recorrer el contenido de data
 */

function render(data) {
	var html = data.map(function(message, index) {
		/* Las comillas invertidas son una caracteristica de ES6 que permite interpolar los datos
		 * escribir codigo en varias lineas y escribir dentro de esa cadena variables.
		 * Con el join concatenamos y metemos un espacio entre elemento y elemento
		 */
		return (`
			<div class="message">
				<strong>${message.nickname}</strong> dice: 
				<p>${message.text}</p>
			</div>
			`);

	}).join(' ');

	var divMensajes = document.getElementById('mensajes');

	divMensajes.innerHTML = html;

	/* Para mantener el scroll abajo */
	divMensajes.scrollTop = divMensajes.scrollHeight;
}

function addMessage(e) {
	var message = {
		nickname: document.getElementById('nickname').value,
		text: document.getElementById('text').value
	};

	document.getElementById('nickname').style.display = 'none';
	document.getElementById('text').value = '';
	socket.emit('add-message', message);

	return false;
}