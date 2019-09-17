import global from '@hupo/core-global';
export { default as componentEventMixin } from "./mixins/component.js";
export { default as pageEventMixin } from "./mixins/page.js";
export { default as Event } from "./Event.js";
global._eventbus = new Event();