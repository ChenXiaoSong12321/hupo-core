import Event from '../Event.js'
export default {
  beforeDestroy() {
    this._off()
    delete this._event
  },
  methods: {
    _getCurrentPageComponents(componentName) {
      return (this._page && this._page._children) ? this._page._children[componentName] : []
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
