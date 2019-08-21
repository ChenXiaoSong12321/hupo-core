// hupo
const getGlobal = () => {
  if(typeof window === 'undefined'){
    if(!global.$mall)global.$mall = {}
    return global.$mall
  }else{
    if(!window.$mall)window.$mall = {}
    return window.$mall
  }
}
console.log(1)
export const _global = getGlobal()
export default _global
