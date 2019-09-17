import global from '@hupo/core-global'
export { default as componentEventMixin } from './mixins/component'
export { default as pageEventMixin } from './mixins/page'
export { default as Event } from './Event'
global._eventbus = new Event()
