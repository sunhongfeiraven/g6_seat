const Util = G6.Util

let data = {
  nodes: []
}

for (let i = 0; i < 5; i++) {
  for (let j = 0; j < 5; j++) {
    if (i === 0 && j === 0) {
      //假设1-1不是座位
    } else {
      data.nodes.push({
        id: `node${i + 1}-${j + 1}`,
        x: i * 50, //50为rect 默认高宽
        y: j * 50, //50为rect 默认高宽
        color: 'green' //暂定绿色为未选中座位，红色为选中座位，暂不考虑其他人已选中及此位置非座位情况
      })
    }
  }
}

const net = new G6.Net({
  id: 'mountNode', // 容器ID
  mode: 'default', // 编辑模式
  modes: {
    // 模式集
    // 默认模式
    default: ['clickBlankClearActive', 'wheelZoom'],
    // 编辑模式
    edit: ['clickBlankClearActive', 'multiSelect', 'shortcut', 'wheelZoom']
  },
  grid: null, //是否显示网格
  fitView: 'tl',
  height: window.innerHeight // 画布高
})

net.source(data.nodes)

net.render()

net.on('itemclick', ev => {
  // 用作选座位事件
  const item = ev.item
  const color = item.get('model').color
  let newColor = null
  console.log('击中' + item.get('model').id + '!')
  if (color === 'red') {
    newColor = 'green'
  } else {
    newColor = 'red'
  }
  net.update(item, { color: newColor })
  net.refresh()
})

$('#defaultModle').on('click', () => {
  net.changeMode('default')
})

$('#editModle').on('click', () => {
  net.changeMode('edit')
})

$('#save').on('click', () => {
  const saveData = net.save()
  const json = JSON.stringify(saveData, null, 2)
  console.log(saveData, json) // eslint-disable-line no-console
})
