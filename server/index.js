var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

/**
 * Middleware de express para cargar una vista
 */

app.use(express.static('client'));

app.get('/', function(req, res){
	res.status(200).send('Hola mundo desde una ruta');
});

/**
 * Array de mensajes, le voy a enviar o emitir (emit) un mensaje al cliente
 */

var messages = [{
	id: 1,
	text: 'Bienvenido al chat privado de socket.io y node.js de Fides Escalona',
	nickname: 'Bot - Fides Escalona'
}];


/**
 * Abrir una conexion al socket, el metodo on permite
 * lanzar eventos, en este caso el evento connection,
 * se lo vamos a enviar a los clientes, va a recibir las 
 * conexiones de los clientes.
 * El parametro socket que recibe la funcion de callback,
 * que lleva toda la informacion del socket y mas funciones
 * La funcion va a recibir las conexiones de los clientes
 * 
 */
io.on('connection', function(socket){
	console.log("El nodo con IP: " + socket.handshake.address + " se ha conectado");

	socket.emit('messages', messages);

	/**
	 * Recojo el evento cuando un usuario envia un mensaje con socket.on()
	 * Le agrego el objeto al array de mensajes con push()
	 * 
	 */
	
	socket.on('add-message', function(data) {
		messages.push(data);

		/** Emito a todos los clientes conectados el mensaje */

		io.sockets.emit('messages', messages);
	});
});

server.listen(6677, function(){
	console.log('Servidor está funcionando en http://localhost:6677');
});