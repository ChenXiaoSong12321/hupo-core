import { addPage } from "../baseTree/index.js";
export const pageBaseTreeMixin = {
  beforeCreate() {
    addPage(this);
  }

};