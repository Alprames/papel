const opciones = document.querySelectorAll('.manos div');
const contador = document.querySelector('#contador h3');
let cpuScore = 0;
let userScore = 0;
setCounter();


eventListeners();
function eventListeners() {
    opciones.forEach(opcion => {
        opcion.addEventListener('click', juegaRonda);
    })
}

function juegaRonda(e) {
    e.preventDefault();
    const seleccion = e.target.alt;
    const CPU = juegaCPU();
    if (seleccion === 'piedra' && CPU === 'tijera' ||
        seleccion === 'papel' && CPU === 'piedra' ||
        seleccion === 'tijera' && CPU === 'papel') {
        resultado.ganas();
    } else if (seleccion === CPU) {
        resultado.empatas();
    } else {
        resultado.pierdes();
    }
    if(userScore > 5 || cpuScore > 5) {
        finDelJuego();
    }
}

function juegaCPU() {
    return opciones[Math.floor(Math.random() * opciones.length)].id;
}

function setCounter() {
    contador.textContent = `${userScore} - ${cpuScore}`;
}
let resultado = {
    ganas() {
        userScore++;
        setCounter();
    },
    pierdes() {
        cpuScore++;
        setCounter();
    },
    empatas() {
        setCounter();
    }
}

function finDelJuego() {
    cpuScore = 0;
    userScore = 0;
    setCounter();
}