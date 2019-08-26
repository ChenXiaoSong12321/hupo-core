export default {
  methods: {
    _getCurrentPageComponents(componentName){
      return this._children[componentName] || []
    },
    _broadcast(componentName, ...arg){
      const components = this._getCurrentPageComponents(componentName)
      components.forEach(item => {
        item._event.emit(...arg)
      })
    }
  }
}