import global from '@hupo/core-global'
export default {
  mounted() {
    global._baseTree.addComponent(this)
  },
  beforeDestroy() {
    global._baseTree.removeComponent(this)
  }
}
