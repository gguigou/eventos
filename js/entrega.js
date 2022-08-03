const IVA = 0.22;

class Persona {
    constructor(nombre, apellido, direccion, documento, contrasenia){
        this.nombre = nombre;
        this.apellido = apellido;
        this.direccion = direccion;
        this.documento = documento;
        this.contrasenia = contrasenia;
    }
    descripcion(){
        alert("Nombre: " + this.nombre + " Apellido: " + this.apellido + " Direccion: " + this.direccion);
    }
}
let usuarioEnLinea;
const clientes = [];
clientes[0] = new Persona("Gabriel", "Guigou", "Piedra Alta 614", 40215548, "desafio");
clientes.push(new Persona("Dario", "Guigou", "Paul Harris 52", 12345678, "padre"));
function hayUsuario(nroDocumento){
    let usuario = clientes.find(clienteEsta=> clienteEsta.documento==nroDocumento);
    return (usuario!= undefined);
}

function validarContrasenia(nroDocumento,contraseniaValidar){
    let usuario = clientes.find(clienteEsta=> clienteEsta.documento==usuario);
    console.log (usuario);
    return (usuario.documento==contraseniaValidar);
    
}
function ingresar(usuarioDocumento,usuarioContrasenia){
    alert("INGRESAR ");
    let usuarioIngresado = clientes.find(clienteEsta=> clienteEsta.documento==usuarioDocumento);
    console.log(usuarioIngresado);
    if (usuarioIngresado != undefined){
        if(usuarioIngresado.contrasenia==usuarioContrasenia){
            alert("Bienvenido " + usuarioIngresado.nombre + " " + usuarioIngresado.apellido);
            return usuarioIngresado;
            
        }
        else {
            alert("Contraseña no es valida");
            return undefined;
        }
    }
    else {
        alert("Usuario no existe "+usuarioDocumento+" "+usuarioContrasenia);
        return undefined;
    }
}
function registrarUsuario(nombre,apellido,direccion,documento,contrasenia){
    clientes.push(new Persona(nombre, apellido, direccion, documento, contrasenia));
}


class Producto {
    constructor(codigo, descripcion, valor, talle){
        this.codigo=codigo;
        this.descripcion=descripcion;
        this.valor=valor;
        this.talle=talle;
    }
    valorSinIva = () => (this.valor/(1+IVA));
    ivaDelValorFinal = function() { return (this.valor - (this.valor/(1+IVA)))}
    describir() {
        alert(this.descripcion + " " + this.talle + " " + this.valor);
    }
}

const stock = [new Producto(1, "Jumper", 1000, "XS" ),
                new Producto(2, "Pollera", 700, "XS" ),
                new Producto(3, "Remera", 950, "XS" )];
stock.push(new Producto(4,"Short", 550, "L"));
const carrito =[];



function vender(){
    let productoCliente = prompt("Ingrese el codigo del producto:(1-4), ESC para salir");
    while(productoCliente.toUpperCase()!="ESC"){
        
        if(encontrado = stock.find(productoStock=> productoStock.codigo == parseInt(productoCliente))){
            encontrado.describir();
            alert("Valor del IVA: "+ encontrado.ivaDelValorFinal()+ " valor sin IVA: "+ encontrado.valorSinIva());
            carrito.push(encontrado);
        }
        else
            alert("Producto no encontrado");
        productoCliente = prompt("Ingrese el codigo del producto:(1-4), ESC para salir");
    }
}

function describirCarrito(){
    let tabla = document.createElement("table");
    let tablaBody = document.createElement("tbody")
    for (const productosEnCarrito of carrito){
        let fila = document.createElement("tr");
        fila.innerHTML = `<td> ${productosEnCarrito.descripcion}</td>
                            <td>${productosEnCarrito.talle}</td>
                            <td>$ ${productosEnCarrito.valor}</td>`;
    tablaBody.appendChild(fila);
    }
    tabla.appendChild(tablaBody);
    let articuloTabla = document.getElementById("tablaCarrito");
    let tituloTabla = document.createElement("h2");
    tituloTabla.innerHTML = "<h2> SU CARRITO ES</h2>";
    articuloTabla.appendChild(tituloTabla);
    articuloTabla.appendChild(tabla);
}

//EVENTOS
//Formulario para registrar nuevo usuario
let formRegistro = document.getElementById("formularioRegistro");
formRegistro.addEventListener("submit", validarRegistro);
let nombreR = document.getElementById("nombre");
let apellidoR = document.getElementById("apellido");
let direccionR = document.getElementById("direccion");
let nroDocumentoR = document.getElementById("nroDocumento");
let contraseniaR = document.getElementById("contrasenia");

function validarRegistro(e){
    if ((nombreR.value=="") || (apellidoR.value=="") || (direccionR.value=="") || isNaN(nroDocumentoR.value) || (contraseniaR.value=="")) {
        e.preventDefault();
        alert("Falto un campo o documento no valido");
    }
    else clientes.push(new Persona(nombreR.value, apellidoR.value, direccionR.value, nroDocumentoR.value, contraseniaR.value));
        // registrarUsuario(nombreR.value,apellidoR.value,direccionR.value,nroDocumentoR.value,contraseniaR.value);

}
//Ingresar con un usuario ya creado

let formIngreso = document.getElementById("formularioIngreso");
formIngreso.addEventListener("submit",validarIngreso);

function validarIngreso(e){
    // e.preventDefault();
    let formulario = e.target;
    let documentoI = formulario.children[0].value;
    let contraseniaI = formulario.children[1].value;
    if (isNaN(documentoI) || (contraseniaI=="")){
        e.preventDefault();
        alert("Los campos son invalidos");
    }
    else {
        let usuario = ingresar(documentoI,contraseniaI);
        if (usuario==undefined){
            e.preventDefault();
        }
        else{
            usuarioEnLinea = usuario;
        }
    }

    // if (isNaN(documentoI) || (contraseniaI=="")){
    //     e.preventDefault();
    //     alert("Los campos son invalidos");
    // }
    // else if (hayUsuario(documentoI)){
    //     if(contraseniaValidar(documentoI)){
    //         ingresa
    //     }
    //     alert("Usuario document " + documentoI);
    // }
    console.log(documentoI + " " + contraseniaI);
}


// let boton = prompt("Ingrese una accion: I=Ingresar, R=registrar, V=vender,ESC= salir");
// while (boton.toUpperCase()!="ESC"){
//     switch (boton.toUpperCase()){
//         case "I":
//             usuarioEnLinea=ingresar();

//             // Si el usuario existe, desplega un parrafo de bienvenida-

//             if (usuarioEnLinea!=undefined){
//                 let divUsuario = document.getElementById("saludo");//saludo
//                 parrafoSaludo = document.createElement("p");
//                 parrafoSaludo.innerHTML ="<p>" +"Bienvenido a nuestra tienda " + usuarioEnLinea.nombre + " "+ usuarioEnLinea.apellido + "</p>";
//                 divUsuario.appendChild(parrafoSaludo);
//             }        
//             break;
//         case "R":
//             registrarUsuario();
//             break;
//         case "V":
//             vender();
//             describirCarrito();
//             break;
//         default:
//             alert("Accion no valida");
//     }
//     boton = prompt("Ingrese una accion: I=Ingresar, R=registrar, V=vender,ESC= salir");
// }

