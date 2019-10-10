import Event from '../Event.js'
import global from '@hupo/core-global'
const getViewId = instance => instance._uid ? instance._uid : (instance.__wxWebviewId__ || instance.getPageId())
export default {
  beforeDestroy() {
    this._off()
    delete this._event
  },
  methods: {
    _getCurrentPageComponents(componentName) {
      const viewId = getViewId(this)
      const page = global._baseTree.pages[viewId]
      return (page && page._children) ? page._children[componentName] : []
    },
    _on(event, handler) {
      if (!this._event) this._event = new Event()
      this._event.on(event, handler)
    },
    _off(...arg) {
      this._event && this._event.off(...arg)
    },
    _emit(...arg) {
      this._event && this._event.emit(...arg)
    },
    _emitCache(...arg) {
      this._event && this._event.emitCache(...arg)
    },
    _broadcast(componentName, ...arg) {
      const components = this._getCurrentPageComponents(componentName)
      components.forEach(item => {
        item._event.emit(...arg)
      })
    }
  }
}
