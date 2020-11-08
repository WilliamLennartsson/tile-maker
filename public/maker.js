
const canvas = document.getElementById("tileCanvas")
const ctx = canvas.getContext("2d")

const WIDTH = window.innerWidth - 50
const HEIGHT = window.innerHeight - 50

const imageScaleFactor = 4

const ROWS = 3
const COLS = 5

canvas.setAttribute('style', 'border: 5px solid #000000')
canvas.setAttribute('width', WIDTH)
canvas.setAttribute('height', HEIGHT)

window.onload = () => {
    const img = new Image()
    img.addEventListener('load', function () {
        const width = img.width / imageScaleFactor
        const height = img.height / imageScaleFactor
        // ctx.drawImage(img, 0, 0)
        // ctx.drawImage(img, 0, 0, width, height)
        // flipImage(img, false, true, width, height, 0, 0)
        // createTile(img, width, height, 0, 0)
        createGrid(img, width, height)
    }, false)
    img.src = '../assets/tile_input.png'
}

function createGrid(img, width, height) {
    for (let i = 0; i < COLS; i++) {
        for (let j = 0; j < ROWS; j++) {
            createTile(img, width, height, (i * width) * 2, (j * height) * 2)
        }
    }
}

function createTile(inputImage, width, height, offsetX, offsetY) {
    flipImage(inputImage, false, false, width, height, offsetX, offsetY)
    flipImage(inputImage, false, true, width, height, offsetX, offsetY)
    flipImage(inputImage, true, false, width, height, offsetX, offsetY)
    flipImage(inputImage, true, true, width, height, offsetX, offsetY)
}

function flipImage(image, flipH, flipV, w, h, offsetX, offsetY) {
    const scaleH = flipH ? -1 : 1
    const scaleV = flipV ? -1 : 1
    const posX = flipH ? ((w * 2) * -1) - offsetX : 0 + offsetX
    const posY = flipV ? ((h * 2) * -1) - offsetY : 0 + offsetY
    // flipH ? posX -= offsetX : posX += offsetX
    // flipV ? posY -= offsetY : posY += offsetY
    ctx.save()
    ctx.scale(scaleH, scaleV)
    ctx.drawImage(image, posX, posY, w, h)
    ctx.restore()
}
