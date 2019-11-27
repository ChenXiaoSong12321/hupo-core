'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

// 初始化 page id，判断组件和page是否在同一个page
function initInstance(instance) {
  Object.defineProperty(instance, '__page__id__', {
    get() {
      return this.__wxWebviewId__ || this.getPageId();
    },

    configurable: false,
    enumerable: false
  });
}

function addPage(page) {
  initInstance(page);
  page._children = {};
}
function addComponent(component) {
  initInstance(component); // 添加componentName

  Object.defineProperty(component, 'componentName', {
    get() {
      return this.__cml_originOptions__.name;
    },

    configurable: false,
    enumerable: false
  }); // 添加_page，可直接使用this._page获取到当前page

  Object.defineProperty(component, '_page', {
    get() {
      return getCurrentPages().find(item => item.__page__id__ === this.__page__id__);
    },

    configurable: false,
    enumerable: false
  });

  if (!component.componentName) {
    console.warn('you have to add name of component', component);
    return;
  }

  if (!component._page._children[component.componentName]) component._page._children[component.componentName] = [];

  component._page._children[component.componentName].push(component);
}
function removeComponent(component) {
  if (component && component.componentName && component._page && component._page._children[component.componentName]) {
    const index = component._page._children[component.componentName].indexOf(component);

    if (index > -1) {
      component._page._children[component.componentName].splice(index, 1);
    }
  }
}

var component = {
  mounted() {
    addComponent(this);
  },

  beforeDestroy() {
    removeComponent(this);
  }

};

var page = {
  beforeCreate() {
    addPage(this);
  }

};

exports.componentBaseTreeMixin = component;
exports.pageBaseTreeMixin = page;
//# sourceMappingURL=index.js.map
