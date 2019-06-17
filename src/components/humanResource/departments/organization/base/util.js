import * as colorUtil from './color-util.js'
function text(context, text, x, y,maxWidth, lineHeight, fontSize, fontColor) {
  context.font = 'bold 16px Arial'
  context.fillStyle = fontColor
  context.textAlign = 'center';
  let words = text.split(' ')
  let line = ''
  for (let n = 0; n < words.length; n++) {
    let testLine = line + words[n] + ' '
    let metrics = context.measureText(testLine)
    let testWidth = metrics.width
    if (testWidth > maxWidth && n > 0) {
      context.fillText(line, x, y)
      line = words[n] + ' '
      y += lineHeight
    } else {
      line = testLine
    }
  }
  context.fillText(line, x, y)
}

function wrapText(context, text, x, y, maxWidth, lineHeight, fontColor) {
  context.font = '12px Arial'
  context.fillStyle = fontColor
  let words = text.split(' ')
  let line = ''
  for (let n = 0; n < words.length; n++) {
    let testLine = line + words[n] + ' '
    let metrics = context.measureText(testLine)
    let testWidth = metrics.width
    if (testWidth > maxWidth && n > 0) {
      context.fillText(line, x, y)
      line = words[n] + ' '
      y += lineHeight
    } else {
      line = testLine
    }
  }
  context.fillText(line, x, y)
}

function roundRect(context, x, y, width, height, radius, fill, stroke) {
  if (typeof stroke === 'undefined') {
    stroke = true
  }
  if (typeof radius === 'undefined') {
    radius = 5
  }
  if (typeof radius === 'number') {
    radius = { tl: radius, tr: radius, br: radius, bl: radius }
  } else {
    let defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 }
    for (let side in defaultRadius) {
      radius[side] = radius[side] || defaultRadius[side]
    }
  }
  context.strokeStyle = '#c0c0c0';//连接线的颜色
  context.beginPath()
  context.moveTo(x + radius.tl, y)
  context.lineTo(x + width - radius.tr, y)
  context.quadraticCurveTo(x + width, y, x + width, y + radius.tr)
  context.lineTo(x + width, y + height - radius.br)
  context.quadraticCurveTo(
    x + width,
    y + height,
    x + width - radius.br,
    y + height
  )
  context.lineTo(x + radius.bl, y + height)
  context.quadraticCurveTo(x, y + height, x, y + height - radius.bl)
  context.lineTo(x, y + radius.tl)
  context.quadraticCurveTo(x, y, x + radius.tl, y)
  context.closePath()
  if (fill) {
    context.fill()
  }
  if (stroke) {
    context.stroke()
  }
}
export default {
  ...colorUtil,
  text,
  wrapText,
  roundRect
}
