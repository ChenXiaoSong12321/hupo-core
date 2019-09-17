import global from '@hupo/core-global'
import Event from './Event'
global._eventbus = new Event()
export { default as componentEventMixin } from './mixins/component'
export { default as pageEventMixin } from './mixins/page'
export {
  Event
}
