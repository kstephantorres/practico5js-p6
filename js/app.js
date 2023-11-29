const dosDigitos=(numero)=> numero<10? '0'+numero:numero

const btnIniciar = document.getElementById('btnIniciar')
const btnPausar = document.getElementById('btnPausar')
const btnReset = document.getElementById('btnReset')

const formulario = document.querySelector('form')

let id=''
const alarmaAudio = new Audio('../assets/audio/bell.mp3');



const reloj= {
    hora: 0,
    minuto: 0,
    segundo:0,
    mostrar(){
        return [this.hora,this.minuto,this.segundo]
    },
    iniciar(hora,minuto,segundo){
        this.hora = hora
        this.minuto = minuto
        this.segundo = segundo
    },
    actualizarHora(){
        this.hora--
    },
    actualizarMinuto(){
        this.minuto--
    },
    actualizarSegundo(){
        this.segundo--
    }
    ,
    resetMinuto(){
        this.minuto= 59
    },
    resetSegundo(){
        this.segundo = 59
    }
}

const relojInputs= document.querySelectorAll('input')

formulario.addEventListener('submit',(event)=>{

    event.preventDefault();

    const inputHora = document.getElementById('inputHora')
    const inputMinuto =document.getElementById('inputMinuto')
    const inputSegundo = document.getElementById('inputSegundo')

    const hora= Math.trunc(parseInt(inputHora.value))
    const minuto = Math.trunc(parseInt(inputMinuto.value))
    const segundo = Math.trunc(parseInt(inputSegundo.value))

    if(hora >= 0 && hora<=59 && minuto >= 0 && minuto<=59 && segundo >= 0 && segundo<=59 )
    {
        reloj.iniciar(hora,minuto,segundo)
        inputHora.disabled=true
        inputMinuto.disabled=true
        inputSegundo.disabled=true
        
        btnIniciar.disabled = true

        id= setInterval(()=>{
            const datos = reloj.mostrar()
            inputHora.value = dosDigitos(datos[0])
            inputMinuto.value = dosDigitos(datos[1])
            inputSegundo.value = dosDigitos(datos[2])
            console.log(datos)
           
            if(reloj.hora===0 && reloj.minuto===0 && reloj.segundo===0)
            { 
                reloj.iniciar(0,0,0)
                clearInterval(id)
                btnIniciar.disabled = false
                inputHora.disabled=false
                inputMinuto.disabled=false
                inputSegundo.disabled=false
                alarmaAudio.play();

            }
            reloj.actualizarSegundo()
            if(reloj.segundo===-1){
                reloj.resetSegundo()
                reloj.actualizarMinuto()
            }
            if(reloj.minuto===-1){
                reloj.resetMinuto()
                reloj.actualizarHora()
            }
        },1000)
    }
})

btnPausar.addEventListener('click',()=>{
    btnIniciar.disabled = false
    clearInterval(id)
})

btnReset.addEventListener('click',()=>{
    btnIniciar.disabled = false
    clearInterval(id)

    reloj.iniciar(0,0,0)
    inputHora.disabled=false
    inputMinuto.disabled=false
    inputSegundo.disabled=false
    btnIniciar.disabled = false
    inputHora.value = dosDigitos(0)
    inputMinuto.value = dosDigitos(0)
    inputSegundo.value = dosDigitos(0)
})