//costructor para seguro
class Seguro {
    constructor(marca, anio, tipo) {
        this.marca = marca;
        this.anio = anio;
        this.tipo = tipo;
    }

    cotizarSeguro() {
        /*
            1 = americano 1.15
            2 = asiatico 1.05
            3 = europeo 1.35
        */
        let cantidad;
        const base = 2000;

        switch (this.marca) {
            case '1':
                cantidad = base * 1.15;
                break;
            case '2':
                cantidad = base * 1.05;
                break;
            case '3':
                cantidad = base * 1.35;
                break;
        }
        //leer el año
        const diferencia = new Date().getFullYear() - this.anio;
        // a cada año estra reducir 3% de su valor

        cantidad -= ((diferencia * 3) * cantidad) / 100;
        //cantidad -= ((diferencia * .03) * cantidad);
        // si el seguro es basico se  se multiplica por 30% mas
        // si el seguro es completo se multiplica por 50% mas

        if (this.tipo === 'basico') {
            cantidad *= 1.30;
        } else {
            cantidad *= 1.50;
        }

        return cantidad;

        //console.log(cantidad);
    }
}



// todo lo que se muestra xd
class Interfaz {
    //mensaje que se imprime en el html
    mostrarMensaje(mensaje, tipo) {
        const div = document.createElement('div');
        if (tipo === 'error') {
            div.classList.add('mensaje', 'error');
        } else {
            div.classList.add('mensaje', 'correcto');
        }

        div.innerHTML = `${mensaje}`;
        //Before toma 2 valores, en objeto a insertar y antes de que objeto
        //se desea insertar
        formulario.insertBefore(div, document.querySelector('.form-group'));

        setTimeout(function() {
            document.querySelector('.mensaje').remove();
        }, 1300);

    }

    //imprime la cotizacion del seguro
    mostrarResultado(seguro, total) {
        const resultado = document.getElementById('resultado');
        let marca;
        switch (seguro.marca) {

            case '1':
                marca = 'Americano';
                break;
            case '2':
                marca = 'Asiatico';
                break;
            case '3':
                marca = 'Europeo';
                break;

        }
        // crear un div
        const div = document.createElement('div');
        //agregar la informacion
        div.innerHTML = `
        <p class='header'>Tu Resumen:</p>
        <p>Marca: ${marca}</p>
        <p>año: ${seguro.anio}</p>
        <p>Tipo: ${seguro.tipo}</p>
        <p>Total: ${total}</p>
    `;
        const spinner = document.querySelector('#cargando img');
        spinner.style.display = 'block';

        setTimeout(function() {
            spinner.style.display = 'none';
            resultado.appendChild(div);
        }, 1300)


    }

}






//eventListeners
const formulario = document.getElementById('cotizar-seguro');

formulario.addEventListener('submit', function(e) {
    e.preventDefault();
    //leer la marca selecciona del select
    const marca = document.getElementById('marca');
    const marcaSelecionada = marca.options[marca.selectedIndex].value;

    //leer el año seleccionado del select
    const anio = document.getElementById('anio');
    const anioSelecionado = anio.options[anio.selectedIndex].value;
    //lee el valor del radioBuuton
    const tipo = document.querySelector('input[name="tipo"]:checked').value;
    //crear instancia de interfaz
    const interfaz = new Interfaz();
    //revisamos que los campos no esten vasios
    if (marcaSelecionada === '' || anioSelecionado === '' || tipo === '') {

        interfaz.mostrarMensaje('Faltan datos, revisar el formulario y prueva de nuevo', 'error')
    } else {
        //limpiar resultados anteriores
        const resultados = document.querySelector('#resultado div');
        if (resultados != null) {
            resultados.remove();
        }

        //intanciar seguro y mostrar interfaz
        const seguro = new Seguro(marcaSelecionada, anioSelecionado, tipo);
        //console.log(seguro);
        //cotizar el seguro

        const cantidad = seguro.cotizarSeguro();
        //mostrar el resultado
        interfaz.mostrarResultado(seguro, cantidad);
        interfaz.mostrarMensaje('Cotizando...', 'exito')
    }

})


const max = new Date().getFullYear(),
    min = max - 20;

const selectAnios = document.getElementById('anio');

for (let i = max; i > min; i--) {
    let option = document.createElement('option');
    option.value = i;
    option.innerHTML = i;
    selectAnios.appendChild(option);
}