// 水印默认配置
const DEFAULT_SETTINGS = {
  id: 'water_mark_id', // 水印id
  text: '水印文本', // 水印的内容
  color: '#333', // 颜色
  opacity: 0.1, // 透明度
  fontSize: 20, // 字体
  width: 200, // 单个水印宽度
  height: 200, // 单个水印长度
  left: 0, // 水印整体左边距离
  top: 0, // 水印整体顶边距离
  right: 0, // 水印整体右边距离
  bottom: 0, // 水印整体顶边距离
  slope: -15, // 水印倾斜度数
  parentId: null // 水印插件挂载的父元素id,默认挂在body上
}

// 判断文本是否超出canvas的宽度，超出则换行
const canvasTextAutoLine = (parameterObj: any) => {
  const { str, ctx, initX, lineHeight, canvasWidth } = parameterObj
  let { initY } = parameterObj
  let lineWidth = 0
  let lastSubStrIndex = 0
  for (let i = 0; i < str.length; i++) {
    lineWidth += ctx.measureText(str[i]).width
    if (lineWidth > canvasWidth - 50) {
      ctx.fillText(str.slice(lastSubStrIndex, i), initX, initY)
      initY += lineHeight
      lineWidth = 0
      lastSubStrIndex = i
    }
    if (i === str.length - 1) {
      ctx.fillText(str.substring(lastSubStrIndex, i + 1), initX, initY)
    }
  }
}

// 加载水印
const renderMark = (settings: any) => {
  const newSettings = { ...DEFAULT_SETTINGS, ...settings }

  // 设置水印的容器
  let watermarkParentNode = null
  if (newSettings.parentId) {
    watermarkParentNode = document.getElementById(newSettings.parentId)
    if (watermarkParentNode === null) {
      return
    }
    watermarkParentNode.style.position = 'relative'
  } else {
    watermarkParentNode = document.body
  }

  const wmDom = document.getElementById(newSettings.id)
  // 已经有全局水印则不需要重新生成
  if (wmDom) {
    return
  }

  const canvas = document.createElement('canvas')
  const maskDiv = document.createElement('div')
  const ctx = canvas.getContext('2d')
  const angle = (newSettings.slope * Math.PI) / 180
  canvas.id = 'watermarkCanvasId'
  canvas.width = newSettings.width // 单个水印的宽度
  canvas.height = newSettings.height // 单个水印的高度
  ctx.font = `normal ${newSettings.fontSize}px 'Microsoft Yahei','serif','sans-serif'` // 设置字体样式
  ctx.globalAlpha = newSettings.opacity
  ctx.fillStyle = newSettings.color // 水印字体颜色
  ctx.translate(canvas.width / 2, canvas.height / 2)
  ctx.rotate(angle) // 水印偏转角度
  ctx.translate(-canvas.width / 2, -canvas.height / 2)
  ctx.textAlign = 'center'

  // 水印换行的情况下计算行高
  const lineHeight = newSettings.fontSize + 5
  // 计算水印在y轴上的初始位置(考虑间隙加上5)
  const initY = Math.ceil(Math.abs(Math.sin(angle) * newSettings.height)) + 5
  // 水印文字太长则换行显示
  const parameterObj = {
    str: newSettings.text,
    ctx,
    initX: newSettings.width / 2,
    initY,
    lineHeight,
    canvasWidth: newSettings.width
  }
  canvasTextAutoLine(parameterObj)
  const imgSrc = canvas.toDataURL('image/png')
  maskDiv.id = newSettings.id
  maskDiv.style.position = 'absolute'
  maskDiv.style.zIndex = '9999'
  maskDiv.style.top = `${newSettings.top}px`
  maskDiv.style.right = `${newSettings.right}px`
  maskDiv.style.bottom = `${newSettings.bottom}px`
  maskDiv.style.left = `${newSettings.left}px`
  maskDiv.style.pointerEvents = 'none'
  maskDiv.style.backgroundImage = 'URL(' + imgSrc + ')'
  // 水印节点挂载
  watermarkParentNode.appendChild(maskDiv)
}

// 加载水印-添加浏览器窗口监听事件
const watermark = (settings = {}) => {
  renderMark(settings)
  // 添加浏览器窗口监听事件
  let timeout: any = null
  window.addEventListener('resize', () => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      renderMark(settings)
    }, 300)
  })
}

export default watermark
