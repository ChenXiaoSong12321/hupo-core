import { addPage } from '../BaseTree'
export default {
  beforeCreate() {
    addPage(this)
  }
}
