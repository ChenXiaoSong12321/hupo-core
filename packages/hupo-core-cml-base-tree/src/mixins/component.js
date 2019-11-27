import { addComponent, removeComponent } from '../BaseTree'
export default {
  mounted() {
    addComponent(this)
  },
  beforeDestroy() {
    removeComponent(this)
  }
}
