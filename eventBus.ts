/**
 *
 * @param v 判断是否为空
 * @returns
 */

 const isEmpty = (v: unknown) => {
  if (v instanceof Array) {
    return !v.length
  }
  return !v
}
type FnType = 'once' | 'delete' | 'normal'

type EventBusPool = {
  [key: string]: {
    fn: Function
    type: FnType
  }[]
}

/**
 * 事件总线、发布订阅
 * 1. 实现on注册事件
 * 2. 实现emit触发事件
 * 3. 实现off注销事件、注销事件避免副作用
 * 4. 实现once一次性事件
 */
class EventBus {
  private eventPool: EventBusPool = {}

  constructor() {
    this.eventPool = {}
  }

  on(eventName: string, fn: Function, type: FnType = 'normal') {
    if (isEmpty(this.eventPool[eventName])) {
      this.eventPool[eventName] = []
    }
    this.eventPool[eventName].push({ fn, type })
  }

  emit(eventName: string) {
    const eventList = this.eventPool[eventName] || []
    eventList.forEach(item => {
      if (item.type === 'delete') {
        return
      }
      if (item.type === 'once') {
        this.off(eventName, item.fn)
      }
      item.fn()
    })
    // 筛掉delete事件
    this.eventPool[eventName] = this.eventPool[eventName].filter(
      item => item.type !== 'delete',
    )
  }

  off(eventName: string, targetFn: Function) {
    const eventList = this.eventPool[eventName] || []
    this.eventPool[eventName] = eventList.map(item => {
      // 将删掉的事件标记为null，下一次执行时清除，防止数组塌陷造成问题
      if (item.fn === targetFn) {
        item.type = 'delete'
        return item
      }
      return item
    })
  }

  once(eventName: string, fn: Function) {
    this.on(eventName, fn, 'once')
  }
}

const eventBus = new EventBus()

const test3 = () => {
  console.log('test3')
}
const testOnce = () => {
  console.log('testOnce')
}
eventBus.on('test1', () => {
  console.log('test1.1')
})
eventBus.on('test1', () => {
  console.log('test1.2')
})
eventBus.on('test2', () => {
  console.log('test2.1')
})
eventBus.emit('test1')
eventBus.emit('test2')

eventBus.on('test3', test3)
eventBus.emit('test3')
eventBus.off('test3', test3)
eventBus.emit('test3')
eventBus.once('testOnce', testOnce)
eventBus.emit('testOnce')
eventBus.emit('testOnce')
