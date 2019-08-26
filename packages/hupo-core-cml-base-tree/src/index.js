import global from '@hupo/core-global'
import BaseTree from './BaseTree'

export {default as componentBaseTreeMixin}  from './mixins/component'
export {default as pageBaseTreeMixin}  from './mixins/page'

global._baseTree = new BaseTree()
