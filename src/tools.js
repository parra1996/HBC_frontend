export const checkError = (type, value) => {


    switch (type) {

        case 'email':

            if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value)) {

                return "Introduce a valid email";
            } else {
                return "ok";
            };


        case 'nombre':

            if (!/[a-z][\D]/gi.test(value)) {
                return "Introduce a valid name";
            } else {
                return "ok";
            };

        case 'contrasena':
            if (! /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/.test(value)) {
                return "La contraseña debe contener almenos 6 caracteres, una letra mayuscula, una minuscula, un numero y un caracter especial";
            } else {
                return "ok";
            };

        case 'contrasena2':
                if (! /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/.test(value)) {
        
                return "the password must contain At least 6 characters and no more than 10, one digit and one lower case character"
            } else {
                return "ok";
            };
            
        case "sexo":
            if (value !== "hombre" && value !== "mujer") {
                return "Introduce un sexo valido";
            }

        case 'apellido':

            if (!/[a-z][\D]/gi.test(value)) {
                return "Introduce a valid surname";
            } else {
                return "ok";
            };

        default:
            return "ok";


    }
};