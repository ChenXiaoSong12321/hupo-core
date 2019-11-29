import { addComponent, removeComponent } from "../baseTree/index.js";
export const componentBaseTreeMixin = {
  mounted() {
    addComponent(this);
  },

  beforeDestroy() {
    removeComponent(this);
  }

};