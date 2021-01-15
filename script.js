document.addEventListener('DOMContentLoaded', () => {
    start()
})

// App Timer
let appTimer
let appSelect = 0
let appImgs = [
    '1-app-home.png',
    '2-sell-add-product.png',
    '3-add-product.png',
    '4-register-sell.png',
    '5-move-sell.png'
]

// Image Element
let appImg

// Nombre de Imagen Element
let appImgName

// Saber si una opción fue clickeada.
// Cancelar la acción siguiente del timer.
let Optionclicked

const msgNotification = text => {

    const n = document.querySelector('.notification')
    n.innerHTML = `<p>${text}</p>`
    n.classList.add('active')

    setTimeout(() => {
        n.classList.remove('active')
    }, 5000)
}

const start = () => {

    // Elemento nombre de la imagen.
    appImgName = document.querySelector('.appImgName')

    // Contenedor appImg
    appImgContainer = document.querySelector('.appImg')

    // Obtener la imagen del producto.
    appImg = document.querySelector('.appImg > img')

    // Cada 5 segundos, cambiar de imagen.
    if (appImgContainer) {

        appTimer = setInterval(() => {
            if (Optionclicked) {
                Optionclicked = false
                return
            }
            appSelect += 1
            
            if (appSelect > 4) appSelect = 0
            appImgContainer.classList.add('complete')
            setTimeout(() => {
                appImgContainer.classList.remove('complete')
            }, 750)
    
            appImg.src = "./assets/img/"+appImgs[appSelect]
            changeOption()
        }, 7000)
    }

    const options = document.querySelectorAll('.options > .option')

    if (options.length > 0) {

        options.forEach(e => {
            e.addEventListener('click', () => {
                Optionclicked = true
                
                switch (e.classList[1]) {
                    case '_0':appSelect = 0;break
                    case '_1':appSelect = 1;break
                    case '_2':appSelect = 2;break
                    case '_3':appSelect = 3;break
                    case '_4':appSelect = 4;break
    
                    default:
                        Optionclicked = false
                        break
                }
    
                changeOption()
            })
        })
    }

    // Se descarga la versión Demo.
    const downDemo = document.querySelector('.downloadDemo')

    if (downDemo) {

        downDemo.addEventListener('click', e => {
            if (downDemo.classList.contains('disabled')) {
                e.preventDefault()
                return
            }
            let href = downDemo.href
    
            downDemo.classList.add('disabled')
            
            msgNotification('Su descarga ha empezado.')
            downDemo.href = '#!'
    
            // Al terminar la notificación:
            setTimeout(() => {
                downDemo.href = href
                downDemo.classList.remove('disabled')
            }, 4500)
        })
    }

    // Iniciar la prueba gratuita.
    const fM = document.querySelectorAll('.freeModal')
    fM.forEach(fm => {
        fm.addEventListener('click', () => {
            openFree()
        })
    })

    // Cerrar la modal de prueba gratuita.
    const cM = document.querySelector('.modalClose')
    cM.addEventListener('click', () => {
        closeModal()
    })
}

const changeOption = () => {
    const options = document.querySelectorAll('.options > .option')

    options.forEach(e => {
        e.classList.remove('active')
        if (e.classList.contains('_'+appSelect.toString())) {
            e.classList.add('active')
            appImgName.textContent = e.textContent
        }
    })

    appImg.src = "./assets/img/"+appImgs[appSelect]
}

// Modals

let modal = document.querySelector('.modal')

const closeModal = () => {
    modal.classList.remove('active')
}

// Abrir modal de prueba gratuita.

const openFree = () => {
    modal.classList.add('active')
}