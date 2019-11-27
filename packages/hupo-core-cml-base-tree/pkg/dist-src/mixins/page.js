import { addPage } from "../BaseTree.js";
export default {
  beforeCreate() {
    addPage(this);
  }

};