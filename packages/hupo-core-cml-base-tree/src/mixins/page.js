export default {
  created() {
    global._baseTree.addPage(this)
  },
  beforeDestroy() {
    global._baseTree.removePage(this)
  }
}
