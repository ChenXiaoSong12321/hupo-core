export { default as global} from "@hupo/core-global";
export { default as promise} from "@hupo/core-promise";
export { default as wxTools} from "@hupo/core-wx-app-tools";

export const autoRequire2object = modulesFiles => {
  const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
    const value = modulesFiles(modulePath)
    modules[moduleName] = value.default
    return modules
  }, {})
  return modules
}
export const autoRequire2array = modulesFiles => {
  const modules = modulesFiles.keys().map(item => modulesFiles(item).default)
  return modules
}
