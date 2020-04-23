export default function createSounds(document, soundsContainer) {
    const sounds = {}

    function registerSound(command) {
        sounds[command.name] = {src: command.src};
    }

    function play(command) {
        const sound = sounds[command.sound]
        soundsContainer.innerHTML = ''
        const soundElement = document.createElement('audio')
        soundElement.src = sound.src
        soundElement.style.display = 'none';
        soundsContainer.appendChild(soundElement)
        soundElement.play()
    }

    return {
        sounds,
        registerSound,
        play
    }
}