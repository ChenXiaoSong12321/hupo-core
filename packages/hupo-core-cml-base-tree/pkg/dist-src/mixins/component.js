import { addComponent, removeComponent } from "../BaseTree.js";
export default {
  mounted() {
    addComponent(this);
  },

  beforeDestroy() {
    removeComponent(this);
  }

};