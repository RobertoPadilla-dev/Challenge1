const textoIngresado = document.querySelector("#textoIngresado"),
      btnEncriptar = document.querySelector(".btnEncriptar"),
      btnDesencriptar = document.querySelector(".btnDesencriptar"),
      btnCopiar = document.querySelector(".btnCopiar"),
      cajaResultado = document.querySelector(".caja-resultado"),
      mensajeError = document.querySelector(".mensaje-error"),
      darkLight = document.querySelector(".toggle")

      let getMode = localStorage.getItem("encriptadorTema")
      if(getMode === "dark"){
            document.body.classList.toggle("dark")
      }


const recursos = {
    expresion: /^[a-z\s]+$/,
    texto: false
}

const encriptarDesencriptar = (llaves, expresion) => {
    let textoEncriptado = document.querySelector(".encriptadoDesencriptado")
    if (!textoEncriptado) {
        textoEncriptado = document.createElement("p")
        textoEncriptado.classList.add("encriptadoDesencriptado")
        textoEncriptado.style.color = "#0A3871"
        textoEncriptado.style.fontSize = "20px"
        cajaResultado.insertAdjacentElement("afterbegin", textoEncriptado)
    }


    textoEncriptado.textContent = textoIngresado.value.replace(expresion, (coincidencia) => llaves[coincidencia])

    document.querySelector(".caja-resultado2").style.visibility = "hidden"
    btnCopiar.classList.add("active")

    textoIngresado.value = ""
    recursos.texto = false
}


textoIngresado.addEventListener("keyup", () => {

    if(recursos.expresion.test(textoIngresado.value)){
        mensajeError.classList.remove("active")
        recursos.texto = true
    }else{
        mensajeError.classList.add("active")
        recursos.texto = false
    }
})


document.addEventListener("click", (e) => {
    
    
    if(e.target === btnEncriptar){
        if(recursos.texto){
            const llaves = {
                a: "ai",
                e: "enter",
                i: "imes",
                o: "ober",
                u: "ufat"
            }
            const expresion = /[a,e,i,o,u]/gi

            encriptarDesencriptar(llaves, expresion)

        }else{
            mensajeError.innerHTML = `<i class='bx bxs-error-circle'></i>Ingrese texto`
            mensajeError.classList.add("active")
            setTimeout(() => {
                mensajeError.innerHTML = `<i class='bx bxs-error-circle'></i>Solo letras minusculas y sin acentos`
                mensajeError.classList.remove("active")
            }, 700)
        }
    }

    if(e.target === btnDesencriptar){
        if(recursos.texto){
            const llaves = {
                ai: "a",
                enter: "e",
                imes: "i",
                ober: "o",
                ufat: "u"
            }
            const expresion = /(ai|enter|imes|ober|ufat)/gi

            encriptarDesencriptar(llaves, expresion)
        }else{
            mensajeError.innerHTML = `<i class='bx bxs-error-circle'></i>Copie y pegue el texto encriptado`
            mensajeError.classList.add("active")
            setTimeout(() => {
                mensajeError.innerHTML = `<i class='bx bxs-error-circle'></i>Solo letras minusculas y sin acentos`
                mensajeError.classList.remove("active")
            }, 1500)
        }

    }

    if(e.target === btnCopiar){
        navigator.clipboard.writeText(document.querySelector(".encriptadoDesencriptado").textContent).then(() => {
            btnCopiar.textContent = "Copiado"
            setTimeout(() => btnCopiar.textContent = "Copiar", 1000)
        }).catch(() => alert("Error al copiar"))

    }

    if(e.target === darkLight || e.target.matches(".icon")){
        document.body.classList.toggle("dark")

       
        if(document.body.classList.contains("dark")){
            localStorage.setItem("encriptadorTema","dark")
        }else{
            localStorage.setItem("encriptadorTema","light")
        }
    }
})