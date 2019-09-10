import global from '@hupo/core-global';
import BaseTree from "./BaseTree.js";
export { default as componentBaseTreeMixin } from "./mixins/component.js";
export { default as pageBaseTreeMixin } from "./mixins/page.js";
global._baseTree = new BaseTree();