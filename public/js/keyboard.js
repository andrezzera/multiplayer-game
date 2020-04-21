export default function createKeyBorardListener(document) {

    const state = {
        playerId: null,
        observers: []
    }

    function setCurrentPlayerId(playerId) {
        state.playerId = playerId
    }

    function subscribe(observerFunction) {
        state.observers.push(observerFunction)
    }

    function notifyAll(command) {
        for(const observerFunction of state.observers) {            
            observerFunction(command)
        }
    }

    document.addEventListener('keydown', handleKeyDown)

    function handleKeyDown(event) {
        const keyPressed = event.key
        const command = {
            command: 'move-player',
            playerId: state.playerId,
            keyPressed
        }
        notifyAll(command)
    }

    return {
        subscribe,
        setCurrentPlayerId
    }
}