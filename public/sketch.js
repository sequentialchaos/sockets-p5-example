let socket
let x = null
let y = null
let prevX = null
let prevY = null

function setup() {
  createCanvas(400, 400)
  background(50)

  socket = io.connect('http://localhost:3000')
  socket.on('mouse', newDrawing)
}

function newDrawing(data) {
  stroke(220, 50, 100)
  strokeWeight(3)
  x = data.x
  y = data.y

  if (x != null && y != null && prevX != null && prevY != null) {
    line(x, y, prevX, prevY)
  }

  prevX = data.prevX
  prevY = data.prevY
  console.log(`received: ${data.x}, ${data.y} -> ${data.prevX}, ${data.prevY}`)
}

function mouseDragged() {
  stroke(220)
  strokeWeight(3)
  x = mouseX
  y = mouseY
  if (x != null && y != null && prevX != null && prevY != null) {
    line(x, y, prevX, prevY)
  }
  let data = {
    x: x,
    y: y,
    prevX: prevX,
    prevY: prevY
  }
  console.log(`sending: ${x}, ${y} -> ${prevX}, ${prevY}`)

  prevX = x
  prevY = y
  socket.emit('mouse', data)
}

function mouseReleased() {
  x = null
  y = null
  prevX = null
  prevY = null
  let data = {
    x: x,
    y: y,
    prevX: prevX,
    prevY: prevY
  }
  console.log(`reset`)
  socket.emit('mouse', data)
}

function draw() {}
