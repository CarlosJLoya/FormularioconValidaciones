// const inputNacimiento = document.querySelector("#birth");
// inputNacimiento.addEventListener("blur", (evento) => {
//     validaNacimiento(evento.target);
// });

export function valida(input) {
    const tipoDeInput = input.dataset.tipo;
    if (validadores[tipoDeInput]) {
        validadores[tipoDeInput](input);
    }

    if (input.validity.valid) {
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
    } else {
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeError(tipoDeInput, input);
    }

}

const tipoErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
];

const mensajeError = {
    nombre: {
        valueMissing: "Este campo no puede estar vacio"
    },
    email: {
        valueMissing: "Este campo no puede estar vacio",
        typeMismatch: "El correo no es valido"
    },
    password: {
        valueMissing: "Este campo no puede estar vacio",
        patterMismatch: "Al menos 6 caracteres, maximo 12, debe contener una letra minuscula, una mayuscula, un numero y no puede tener caracteres esoeciales."
    },
    nacimiento: {
        valueMissing: "Este campo no puede estar vacio",
        customError: "Debes tener al menos 18 años"
    },
    numero: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "El formato requerido es XXXXXXXXXX 10 numeros"
    },
    direccion: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "Minimo 10 caracteres maximo 40"
    },
    ciudad: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "Minimo 10 caracteres maximo 40"
    },
    estado: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "Minimo 10 caracteres maximo 40"
    },
};


const validadores = {
    nacimiento: (input) => validaNacimiento(input),
};

function mostrarMensajeError(tipoDeInput, input) {
    let mensaje = ""
    tipoErrores.forEach((error) => {
        if (input.validity[error]) {
            console.log(tipoDeInput, error);
            console.log(input.validity[error]);
            console.log(mensajeError[tipoDeInput][error]);
            mensaje = mensajeError[tipoDeInput][error];
        }
    });
    return mensaje;
}


function validaNacimiento(input) {
    const fechaCaptura = new Date(input.value);
    let mensaje = "";
    if (!mayorEdad(fechaCaptura)) {
        mensaje = "Debes tener al menos 18 años"
    };

    input.setCustomValidity(mensaje)
}

function mayorEdad(fechaCaptura) {
    const fechahoy = new Date();
    const diferenciaFechas = new Date(
        fechaCaptura.getUTCFullYear() + 18,
        fechaCaptura.getUTCMonth(),
        fechaCaptura.getUTCDate());
    return (fechahoy > diferenciaFechas)
}