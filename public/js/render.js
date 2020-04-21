export default function render(stage, game, requestAnimationFrame, currentPlayerId) {

    const context = stage.getContext('2d')
    context.fillStyle = '#130f40'
    context.clearRect(0, 0, stage.width, stage.height)

    for(playerId in game.state.players) {
        const player = game.state.players[playerId]
        context.fillStyle = '#eee'
        context.fillRect(player.x, player.y, 1, 1);
    }

    for(fruitId in game.state.fruits) {
        const fruit = game.state.fruits[fruitId]
        context.fillStyle = '#badc58'
        context.fillRect(fruit.x, fruit.y, 1, 1)
    }

    const currentPlayer = game.state.players[currentPlayerId]
    if(currentPlayer) {
        context.fillStyle = '#f9ca24'
        context.fillRect(currentPlayer.x, currentPlayer.y, 1, 1)
    }

    requestAnimationFrame(() => {
        render(stage, game, requestAnimationFrame, currentPlayerId)
    })
}