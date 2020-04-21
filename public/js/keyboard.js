export default function createKeyBorardListener(document) {

    const state = {
        playerId: null,
        observers: []
    }

    function setPlayerId(playerId) {
        state.playerId = playerId
    }

    function subscribe(observerFunction) {
        state.observers.push(observerFunction)
    }

    function notifyAll(command) {
        for(const observerFunction in state.observers) {            
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
        setPlayerId
    }
}