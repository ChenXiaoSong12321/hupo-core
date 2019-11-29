import { addPage } from '../baseTree/index'
export const pageBaseTreeMixin = {
  beforeCreate() {
    addPage(this)
  }
}
