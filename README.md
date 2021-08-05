# typescript-tools-simple

> A tools project

## 工具类

```js
import tools from 'demo-simple-tools'
// 页面DOM加载完毕之后调用
tools.watermark({})
```

or

```js
import { watermark } from 'demo-simple-tools'
// 页面DOM加载完毕之后调用
watermark({})
```

- 配置项

```js
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
```

## 自定义指令

```js
  import { directives } from 'demo-simple-tools'
  import Vue from 'vue'

  const directivesKey = Object.keys(directives)
  directivesKey.map((item) => {
    Vue.directive(item, directives[item])
  })
```
