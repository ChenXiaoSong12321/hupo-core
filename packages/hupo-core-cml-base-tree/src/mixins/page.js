import global from '@hupo/core-global'
export default {
  beforeCreate() {
    global._baseTree.addPage(this)
  },
  beforeDestroy() {
    global._baseTree.removePage(this)
  }
}
