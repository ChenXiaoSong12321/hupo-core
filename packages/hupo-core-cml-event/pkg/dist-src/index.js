import global from '@hupo/core-global';
import Event from "./Event.js";
global._eventbus = new Event();
export { default as componentEventMixin } from "./mixins/component.js";
export { default as pageEventMixin } from "./mixins/page.js";
export { Event };