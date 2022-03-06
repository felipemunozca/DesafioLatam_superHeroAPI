//declaro mis variables globales.
const btnBuscarHero = document.querySelector('#btnBuscarHero');
const inputNumeroHero = document.querySelector('#inputNumeroHero');

//evento al presionar el boton Buscar.
btnBuscarHero.addEventListener('click', (event) => {

    //preventDefault(): prevención de evento del formulario para que no se recargue la página nuevamente.
    event.preventDefault();

    //expresion regular para solo permitir numeros.
    let soloNumeros = new RegExp('^[0-9]{1,9}$');

    //condicion que compara si lo que escribo en el input es un numero o no. Si es un numero ejecuta el ajax(). En caso contrario, dispara una alerta con un mensaje.
    if (soloNumeros.test(inputNumeroHero.value)) {

        $.ajax({
            type: "get",
            //url de la API. + .php + token + id recogido desde el input.
            url: `https://www.superheroapi.com/api.php/3525635500807579/${inputNumeroHero.value}`,
            dataType: "json",
            success: function (heroe) {

                //llamo a mis funciones
                crearTarjeta(heroe);
            }
        });

    } else {
        alert('¡¡Error!! Solo se pueden ingresar numeros.');
    };

});


const crearTarjeta = (heroeRecibido) => {
    
    //informacion que estoy solicitando a la API.
    let imagen = heroeRecibido.image.url;
    let nombre = heroeRecibido.name;
    let conexiones = heroeRecibido.connections["group-affiliation"]; //esta es la forma en que se declaran los nombres de objetos con guion.
    let publicado = heroeRecibido.biography.publisher;
    let ocupacion = heroeRecibido.work.occupation;
    let primeraAparacion = heroeRecibido.biography["first-appearance"];
    let altura = heroeRecibido.appearance.height;
    let peso = heroeRecibido.appearance.weight;
    let alianza = heroeRecibido.biography.aliases;

    //recibo la imagen desde la API a mi html.
    $('#imagenTarjeta').html(`
        <img src="${imagen}">
    `);
    
    //agrego la informacion que recibi de la API y la declaro en el card.
    $('#cuerpoTarjeta').html(`
        <h5 class="card-title">Nombre: ${nombre}</h5>
        <p class="card-text">Conexiones: ${conexiones}</p>
        <p class="card-text">Publicado por: ${publicado}</p>
        <p class="card-text">Ocupación: ${ocupacion}</p>
        <p class="card-text">Primera Aparación: ${primeraAparacion}</p>
        <p class="card-text">Altura: ${altura}</p>
        <p class="card-text">Peso: ${peso}</p>
        <p class="card-text">Alianzas: ${alianza}</p>
    `);
};