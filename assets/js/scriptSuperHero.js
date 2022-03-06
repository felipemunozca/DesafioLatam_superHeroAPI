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
                console.log(heroe.name);
                console.log(heroe.connections["group-affiliation"]);
                console.log(heroe.biography.publisher);
            }
        });

    } else {
        alert('¡¡Error!! Solo se pueden ingresar numeros.');
    };

});