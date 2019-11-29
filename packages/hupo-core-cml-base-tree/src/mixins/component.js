import { addComponent, removeComponent } from '../baseTree/index'
export const componentBaseTreeMixin = {
  mounted() {
    addComponent(this)
  },
  beforeDestroy() {
    removeComponent(this)
  }
}
