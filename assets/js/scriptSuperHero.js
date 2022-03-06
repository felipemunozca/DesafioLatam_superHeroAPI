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
                crearGrafico(heroe);
                limpiarInput();
                $('.superheroe-section').show(1000);
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


const crearGrafico = (heroeRecibido) => {

    let inteligencia = heroeRecibido.powerstats.intelligence;
    let fuerza = heroeRecibido.powerstats.strength;
    let velocidad = heroeRecibido.powerstats.speed;
    let resistencia = heroeRecibido.powerstats.durability;
    let poder = heroeRecibido.powerstats.power;
    let combate = heroeRecibido.powerstats.combat;

    //creo una condicion if para comparar si es alguno de los valores de powerstats viene vacio. Mostrara una alerta en pantalla.
    if (inteligencia == "null" || fuerza == "null" || velocidad == "null" || resistencia == "null" || poder == "null" || combate == "null" ) {
        alert('¡¡Error!! Uno o más valores del Super Heroe no se encuentran disponibles, así que el grafico puede que no se muestre.');
    }

    //codigo para imprimir el grafico.
    let grafico = new CanvasJS.Chart("contenedorGrafico", {
        animationEnabled: true,	
        title:{
            text: `Estadisticas de poder para ${heroeRecibido.name}`,
        },
        legend:{
            cursor: "pointer",
            itemclick: explodePie
        },
        data: [{
            type: "pie",
            showInLegend: true,
            toolTipContent: "{name}: <strong>{y}%</strong>",
            indexLabel: "{name} - {y}%",
            dataPoints: [
                //imprimo las respuestas directamente ya que no pude hacerlo con ciclo for.
                { y: inteligencia, name: "Intelligence" },
                { y: fuerza, name: "Strength" },
                { y: velocidad, name: "Speed" },
                { y: resistencia, name: "Durability" },
                { y: poder, name: "Power" },
                { y: combate, name: "Combat"}
            ]
        }]
    });
    grafico.render();
};

//codigo que es parte de canvasJS.
function explodePie (e) {
    if(typeof (e.dataSeries.dataPoints[e.dataPointIndex].exploded) === "undefined" || !e.dataSeries.dataPoints[e.dataPointIndex].exploded) {
        e.dataSeries.dataPoints[e.dataPointIndex].exploded = true;
    } else {
        e.dataSeries.dataPoints[e.dataPointIndex].exploded = false;
    }
}


//funcion para limpiar el input cuando el codigo se ejecute correctamente.
function limpiarInput(){
    document.getElementById("inputNumeroHero").value = "";
}