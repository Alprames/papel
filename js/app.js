const opciones = document.querySelectorAll('.manos div');
const contador = document.querySelector('#contador h3');

let mensaje = document.querySelector('.mensaje p');
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
    e.preventDefault(); // evita que se redirija la página

    // si se acaba el juego
    if (userScore > 5 || cpuScore > 5) {
        finDelJuego();
        return;
    }
    // Outcomes de cada ronda
    let resultado = {
        ganas() {
            userScore++;
            setTimeout(setCounter, 200);
            setTimeout(() => mensaje.textContent = `Bravo, usaste ${seleccion} contra ${CPU.id} y te llevas un punto`, 200)
        },
        pierdes() {
            cpuScore++;
            setTimeout(setCounter, 200);
            setTimeout(() => mensaje.textContent = `La máquina se lleva un punto, te gana con ${CPU.id}`, 200);
        },
        empatas() {
            setTimeout(setCounter, 200);
            setTimeout(() => mensaje.textContent = `Ambos empatan con ${seleccion}`, 200);
        }
    }


    // ganar o perder
    const seleccion = e.target.alt;
    const CPU = juegaCPU();
    if (seleccion === 'piedra' && CPU.id === 'tijera' ||
        seleccion === 'papel' && CPU.id === 'piedra' ||
        seleccion === 'tijera' && CPU.id === 'papel') {
        resultado.ganas();
    } else if (seleccion === CPU.id) {
        resultado.empatas();
    } else {
        resultado.pierdes();
    }
    // animaciones
    e.target.classList.add('user');
    setTimeout(() => e.target.classList.remove('user'), 500);
    CPU.classList.add('cpu');
    setTimeout(() => CPU.classList.remove('cpu'), 500);
}

function juegaCPU() {
    return opciones[Math.floor(Math.random() * opciones.length)];
}

function setScreen() {
    setCounter();
    setMensaje();
}
function setCounter() {
    contador.textContent = `${userScore} - ${cpuScore}`;
}


function finDelJuego() {
    if (userScore > cpuScore) {
        setTimeout(() => mensaje.textContent = 'Felicitaciones, has ganado esta partida contra la máquina', 200)
    } else {
        setTimeout(() => mensaje.textContent = 'Esta vez no ganaste, pero puedes seguir intentándolo', 200)
    }

    setTimeout(() => {
        cpuScore = 0;
        userScore = 0;
        mensaje.textContent = 'Cuando quieras...';
        setCounter();
    }, 5000);
}
