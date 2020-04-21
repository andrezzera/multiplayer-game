export default function createGame(stage) {

    const state = {
        players: {},
        fruits: {}
    }

    const observers = []

    function subscribe(observerFunction) {
        observers.push(observerFunction)
    }

    function notifyAll(command) {
        for(const observerFunction of observers) {
            observerFunction(command)
        }
    }

    function setState(newState) {
        Object.assign(state, newState)
    }

    function start() {
        const frequency = 3000
        setInterval(addFruit, frequency)
    }

    function addPlayer(command) {
        const playerId = command.playerId
        const playerX = 'playerX' in command ? command.playerX : Math.floor(Math.random() * stage.width)
        const playerY = 'playerY' in command ? command.playerY : Math.floor(Math.random() * stage.height)

        state.players[playerId] = {
            x: playerX,
            y: playerY
        }

        notifyAll({
            type: 'add-player',
            playerId,
            playerX,
            playerY
        })
    }

    function removePlayer(command) {
        const playerId = command.playerId
        delete state.players[playerId]
        notifyAll({
            type: 'remove-player',
            playerId
        })
    }

    function addFruit(command) {
        const fruitId = command ? command.fruitId : Math.floor(Math.random() * 10000000)
        const fruitX = command ? command.fruitX : Math.floor(Math.random() * stage.width)
        const fruitY = command ? command.fruitY : Math.floor(Math.random() * stage.height)

        state.fruits[fruitId] = {
            x: fruitX,
            y: fruitY
        }

        notifyAll({
            type: 'add-fruit',
            fruitId: fruitId,
            fruitX: fruitX,
            fruitY: fruitY
        })
    }

    function removeFruit(command) {
        const fruitId = command.fruitId
        delete state.fruits[fruitId]
        notifyAll({
            type: 'remove-fruit',
            fruitId 
        })
    }

    function movePlayer (command) {

        notifyAll(command)

        const acceptedMoves = {
            ArrowUp(player) {
                if(player.y - 1 >= 0) {
                    player.y = player.y - 1
                }
            },

            ArrowDown(player) {
                if(player.y + 1 < stage.height) {
                    player.y = player.y + 1
                }
            },

            ArrowLeft(player) {
                if(player.x - 1 >= 0) {
                    player.x = player.x - 1
                }
            },

            ArrowRight(player) {
                if(player.x + 1 < stage.width) {
                    player.x = player.x + 1
                }
            }
        }

        const keyPressed = command.keyPressed
        const playerId = command.playerId
        const player = state.players[playerId]
        const moveFunction = acceptedMoves[keyPressed]

        if(player && moveFunction) {
            moveFunction(player)
            checkFruitColision(playerId)
        }
    }

    function checkFruitColision(playerId) {
        const player = state.players[playerId]
        for(const fruitId in state.fruits) {
            const fruit = state.fruits[fruitId]
            if(player.x === fruit.x && player.y === fruit.y) {
                removeFruit({fruitId})
            }
        }
    }

    return {
        subscribe,
        setState,
        start,
        addPlayer,
        removePlayer,
        addFruit,
        removeFruit,
        state,
        movePlayer
    }
}