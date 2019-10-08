import { getViewId, getComponentName } from './utils'
export default class BaseTree {
  constructor() {
    this.initialize()
  }
  initialize() {
    this.pages = {}
  }
  addPage(page) {
    const viewId = getViewId(page)
    page._children = {}
    if (!this.pages[viewId]) this.pages[viewId] = page
  }
  removePage(page) {
    const viewId = getViewId(page)
    delete this.pages[viewId]
  }
  addComponent(component) {
    const name = getComponentName(component)
    if (!name) {
      console.warn('you have to add name of component', component)
      return
    }
    const instance = component.$route ? component.$route.matched[0].instances.default : component
    const viewId = getViewId(instance)
    const page = this.pages[viewId]
    component._page = page
    if (!page._children[name])page._children[name] = []
    page._children[name].push(component)
  }
  removeComponent(component) {
    const name = getComponentName(component)
    if (!name) {
      console.warn('you have to add name of component', component)
      return
    }
    const viewId = getViewId(component._page)
    const page = this.pages[viewId]
    if (page && page._children[name]) {
      page._children[name].splice(page._children[name].indexOf(component) >>> 0, 1)
    }
  }
}
