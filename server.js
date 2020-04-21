import express from 'express'
import http from 'http'
import createGame from './public/js/game.js'
import socketio from 'socket.io'

const app = express()
const server = http.createServer(app)
const sockets = socketio(server)

app.use(express.static('public'))

const stage = {
    width: 20,
    height: 20
}

const game = createGame(stage)
game.start()

game.subscribe((command) => {
    sockets.emit(command.type, command)
})

sockets.on('connection', (socket) => {
    const playerId = socket.id
    console.log('Player connected: ' + playerId)
    
    game.addPlayer({playerId})

    socket.emit('setup', game.state)

    socket.on('disconnect', () => {
        game.removePlayer({playerId})
        console.log('Player disconnected: ' + playerId)
    })

    socket.on('move-player', (command) => {
        command.playerId = playerId
        command.type = 'move-player'
        game.movePlayer(command)
    })
})

server.listen(8080, () => {
    console.log('Server listening on 8080')
})