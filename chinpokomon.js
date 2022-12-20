const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque');
const sectionReiniciar = document.getElementById('reiniciar');
sectionReiniciar.style.display = 'none';
const botonMascotaJugador = document.getElementById('boton-mascota');
const botonFuego = document.getElementById('boton-fuego');
const botonAgua = document.getElementById('boton-agua');
const botonTierra = document.getElementById('boton-tierra');
const botonReiniciar = document.getElementById('boton-reiniciar');

const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota');
const spanMascotaJugador = document.getElementById('mascota-jugador');
const spanMascotaEnemigo = document.getElementById('mascota-enemigo');
const spanVidasJugador = document.getElementById('vidas-jugador');
const spanVidasEnemigo = document.getElementById('vidas-enemigo');
const sectionMensajes = document.getElementById('resultado');
const ataquesDelJugador = document.getElementById('ataques-del-jugador');
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo');
const contenedorTarjetas = document.getElementById('contenedorTarjetas');

let chinpokomones = []
let ataqueJugador
let ataqueEnemigo
let opcionDeChinpokomones
let inputGatolanudo
let inputCarnerotron
let inputZapato
let vidasJugador = 3
let vidasEnemigo = 3

class Chinpokomon {
    constructor(nombre, foto, vida) {
        this.nombre = nombre;
        this.foto = foto;
        this.vida = vida;
        this.ataques = [];
    }
}

let gatolanudo = new Chinpokomon('Gatolanudo', './assets/Furrycat.webp', 5);

let carnerotron = new Chinpokomon('Carnerotron', './assets/Lambtron.webp', 5);

let zapato = new Chinpokomon('Zapato', './assets/Shoe.webp', 5);

gatolanudo.ataques.push(
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🌱', id: 'boton-tierra' },
)

carnerotron.ataques.push(
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
)

zapato.ataques.push(
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🌱', id: 'boton-tierra' },
)

chinpokomones.push(gatolanudo, carnerotron, zapato);

function iniciarJuego() {
    
    sectionSeleccionarAtaque.style.display = 'none';

    chinpokomones.forEach( (chinpokomon) => {
        opcionDeChinpokomones = `
        <input type="radio" name="mascota" id=${chinpokomon.nombre} />
        <label class="tarjeta-de-chinpokomon" for=${chinpokomon.nombre}>
            <p>${chinpokomon.nombre}</p>
            <img src=${chinpokomon.foto} alt=${chinpokomon.nombre}>
        </label>
        `
        contenedorTarjetas.innerHTML += opcionDeChinpokomones;
         inputGatolanudo = document.getElementById('Gatolanudo');
         inputCarnerotron = document.getElementById('Carnerotron');
         inputZapato = document.getElementById('Zapato');

    } )
   
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador);
    
    botonFuego.addEventListener('click', ataqueFuego);
    
    botonAgua.addEventListener('click', ataqueAgua);
    
    botonTierra.addEventListener('click', ataqueTierra);
    
    botonReiniciar.addEventListener('click', reiniciarJuego);
}

function seleccionarMascotaJugador(){
    
    sectionSeleccionarMascota.style.display = 'none';
    
    sectionSeleccionarAtaque.style.display = 'flex';
    
    if (inputGatolanudo.checked) {
        spanMascotaJugador.innerHTML = "Gatolanudo";
    } else if (inputCarnerotron.checked) {
        spanMascotaJugador.innerHTML = "Carnerotron";
    } else if (inputZapato.checked) {
        spanMascotaJugador.innerHTML = "Zapato";
    } else {
        alert('Por favor selecciona tu mascota para poder jugar');
    }
    seleccionarMascotaEnemigo();
}

function seleccionarMascotaEnemigo() {
    let mascotaAleatoria = aleatorio(1,3);
    
    if (mascotaAleatoria == 1) {
        spanMascotaEnemigo.innerHTML = 'Gatolanudo';
    } else if (mascotaAleatoria == 2){
        spanMascotaEnemigo.innerHTML = 'Carnerotron';
    } else {
        spanMascotaEnemigo.innerHTML = 'Zapato';
    }
}

function ataqueFuego() {
    ataqueJugador = 'FUEGO';
    ataqueAleatorioEnemigo();
}
function ataqueAgua() {
    ataqueJugador = 'AGUA';
    ataqueAleatorioEnemigo();
}
function ataqueTierra() {
    ataqueJugador = 'TIERRA';
    ataqueAleatorioEnemigo();
}

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(1,3);

    if (ataqueAleatorio == 1){
        ataqueEnemigo = 'FUEGO';
    }  else if (ataqueAleatorio == 2){
        ataqueEnemigo = 'AGUA';
    }  else {
        ataqueEnemigo = 'TIERRA';
    }
    combate();
}

function combate() {
      
    if (ataqueEnemigo == ataqueJugador){
        crearMensaje("EMPATE 😐");
    } else if (ataqueJugador == 'FUEGO' && ataqueEnemigo == 'TIERRA') {
        crearMensaje("GANASTE 😎");
        vidasEnemigo--;
        spanVidasEnemigo.innerHTML = vidasEnemigo;
    } else if (ataqueJugador == 'AGUA' && ataqueEnemigo == 'FUEGO') {
        crearMensaje("GANASTE 😎");
        vidasEnemigo--;
        spanVidasEnemigo.innerHTML = vidasEnemigo;
    } else if (ataqueJugador == 'TIERRA' && ataqueEnemigo == 'AGUA') {
        crearMensaje("GANASTE 😎");
        vidasEnemigo--;
        spanVidasEnemigo.innerHTML = vidasEnemigo;
    } else {
        crearMensaje("PERDISTE 😭");
        vidasJugador--;
        spanVidasJugador.innerHTML = vidasJugador;
    }
    revisarVidas();
}

function revisarVidas() {
    if (vidasEnemigo == 0) {
        crearMensajeFinal("FELICITACIONES PARCERITO!!!!! Ganaste!!!!! 😎");
    } else if (vidasJugador == 0) {
        crearMensajeFinal("Pailas parcerito... Perdiste 😭")
    }
}

function crearMensaje(resultado) {   
    
    let nuevoAtaqueDelJugador = document.createElement('p');
    let nuevoAtaqueDelEnemigo = document.createElement('p');

    sectionMensajes.innerHTML = resultado;
    nuevoAtaqueDelJugador.innerHTML = ataqueJugador;
    nuevoAtaqueDelEnemigo.innerHTML = ataqueEnemigo;

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador);
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo);
}

function crearMensajeFinal(resultadoFinal) {
    
    sectionMensajes.innerHTML = resultadoFinal;
    
    botonFuego.disabled = true;
    
    botonAgua.disabled = true;
    
    botonTierra.disabled = true;
    
    sectionReiniciar.style.display = 'block';
}

function reiniciarJuego() {
    location.reload();
}

function aleatorio(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

window.addEventListener('load', iniciarJuego);