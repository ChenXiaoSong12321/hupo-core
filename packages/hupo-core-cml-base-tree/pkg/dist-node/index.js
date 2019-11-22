'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var global = _interopDefault(require('@hupo/core-global'));

const getViewId = instance => instance._uid ? instance._uid : instance.__wxWebviewId__ || instance.getPageId();
const getComponentName = instance => instance.__cml_originOptions__ ? instance.__cml_originOptions__.name : instance.$options.name;

class BaseTree {
  constructor() {
    this.initialize();
  }

  initialize() {
    this.pages = {};
  }

  addPage(page) {
    const viewId = getViewId(page);
    page._children = {};
    if (!this.pages[viewId]) this.pages[viewId] = page;
  }

  removePage(page) {
    const viewId = getViewId(page);
    delete this.pages[viewId];
  }

  addComponent(component) {
    const name = getComponentName(component);

    if (!name) {
      console.warn('you have to add name of component', component);
      return;
    }

    const instance = component.$route ? component.$route.matched[0].instances.default : component;
    const viewId = getViewId(instance);
    const page = this.pages[viewId];
    component._page = page;
    if (!page._children[name]) page._children[name] = [];

    page._children[name].push(component);
  }

  removeComponent(component) {
    const name = getComponentName(component);

    if (!name) {
      console.warn('you have to add name of component', component);
      return;
    }

    Object.keys(this.pages).forEach(key => {
      const page = this.pages[key];

      if (page && page._children[name]) {
        page._children[name].splice(page._children[name].indexOf(component) >>> 0, 1);
      }
    });
  }

}

var component = {
  mounted() {
    global._baseTree.addComponent(this);
  },

  beforeDestroy() {
    global._baseTree.removeComponent(this);
  }

};

var page = {
  beforeCreate() {
    global._baseTree.addPage(this);
  },

  beforeDestroy() {
    global._baseTree.removePage(this);
  }

};

global._baseTree = new BaseTree();

exports.componentBaseTreeMixin = component;
exports.pageBaseTreeMixin = page;
//# sourceMappingURL=index.js.map
