const body = document.querySelector('.body')
const face = document.querySelector('.face')
const eyebrow1 = document.querySelector('.eyebrow-1')
const eyebrow2 = document.querySelector('.eyebrow-2')
const eye = document.querySelector(".eye")
const eye1 = document.querySelector(".eye-1")
const iris = document.querySelector(".iris")
const iris1 = document.querySelector(".iris-1")
const boxStar = document.querySelector('.box-star')
const boxStar1 = document.querySelector('.box-star-1')
const mouth = document.querySelector('.mouth')

function faceAnimation() {
    // Obtém as medidas do corpo
    const eyeMeasurements = body.getBoundingClientRect()
    const eyeWidth = eyeMeasurements.width
    const eyeHeight = eyeMeasurements.height

    // Calcula as posições máximas que a rosto pode alcançar dentro do corpo
    const maxX = eyeWidth - face.offsetWidth
    const maxY = eyeHeight - face.offsetHeight

    // Gera posições aleatórias para a rosto dentro dos limites calculados
    const randomX = Math.floor(Math.random() * (maxX + 1))
    const randomY = Math.floor(Math.random() * (maxY + 1))

    // Movimenta o rosto de acordo com o resultado do calculo aleatório
    face.style.transform = `translate(${randomX}px, ${randomY}px)`
}

function irisAnimation() {
    const eyeMeasurements = eye.getBoundingClientRect()
    const eyeWidth = eyeMeasurements.width
    const eyeHeight = eyeMeasurements.height

    const maxX = eyeWidth - iris.offsetWidth
    const maxY = eyeHeight - iris.offsetHeight

    const randomX = Math.floor(Math.random() * (maxX + 1))
    const randomY = Math.floor(Math.random() * (maxY + 1))

    iris.style.transform = `translate(${randomX}px, ${randomY}px)`
    iris1.style.transform = `translate(${randomX}px, ${randomY}px)`
}

function moveEyebrow(mouthClasses) {
    // Remover a classe 'eyebrow-wow' independentemente do caso
    iris.classList.remove('iris-smile')
    iris1.classList.remove('iris-smile')
    eyebrow1.classList.remove('eyebrow-wow')
    eyebrow2.classList.remove('eyebrow-wow')
    boxStar.style.display = 'none'
    boxStar1.style.display = 'none'

    // Variáveis comuns
    let rotationValue1 = '0deg'
    let rotationValue2 = '0deg'

    let clipPathValue = ''

    if (mouthClasses === 'mouth-smile') {
        iris.classList.add('iris-smile')
        iris1.classList.add('iris-smile')

        boxStar.style.display = 'block'
        boxStar1.style.display = 'block'

    } else if (mouthClasses === 'mouth-wow') {
        iris.classList.add('iris-smile')
        iris1.classList.add('iris-smile')

        eyebrow1.classList.add('eyebrow-wow')
        eyebrow2.classList.add('eyebrow-wow')

    } else if (mouthClasses === 'mouth-sad') {
        rotationValue1 = '-15deg'
        rotationValue2 = '15deg'

        clipPathValue = 'ellipse(50% 40% at 50% 50%)'

    } else if (mouthClasses === 'mouth-upset') {
        rotationValue1 = '15deg'
        rotationValue2 = '-15deg'
    }

    // Aplicar as transformações
    eyebrow1.style.transform = `rotate(${rotationValue1})`
    eyebrow2.style.transform = `rotate(${rotationValue2})`

    eye.style.clipPath = clipPathValue
    eye1.style.clipPath = clipPathValue
}

function mouthAndEyebrowAnimation() {
    let mouthClasses = ['mouth-u', 'mouth-wow', 'mouth-smile', 'mouth-upset', 'mouth-sad']

    // Encontrar a classe atual da boca
    let currentClassIndex = mouthClasses.findIndex(function (className) {
        return mouth.classList.contains(className)
    })

    // Adicionar a próxima classe
    let nextClassIndex = (currentClassIndex + 1) % mouthClasses.length
    mouth.classList.add(mouthClasses[nextClassIndex])

    // Move a sobrancelha de acordo com a classe da boca
    moveEyebrow(mouthClasses[nextClassIndex])

    // Remover a classe atual
    if (currentClassIndex !== -1) {
        mouth.classList.remove(mouthClasses[currentClassIndex])
    }
}

function animate() {
    setInterval(function () {
        faceAnimation()
        irisAnimation()
        mouthAndEyebrowAnimation()
    }, 2000)
}

animate()