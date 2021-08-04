// 下载指令
export const download = {
  inserted: (el, binding) => {
    el.style.cssText = 'cursor: pointer;'
    el.addEventListener('click', () => {
      const link = document.createElement('a')
      const url = binding.value
      // tslint:disable-next-line: no-floating-promises
      fetch(url).then(res => res.blob()).then(blob => {
        link.href = URL.createObjectURL(blob)
        link.download = ''
        document.body.appendChild(link)
        link.click()
        URL.revokeObjectURL(link.href)
        document.body.removeChild(link)
      })
    })
  }
}
