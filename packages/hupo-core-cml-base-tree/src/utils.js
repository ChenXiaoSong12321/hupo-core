export const getViewId = instance => instance._uid ? instance._uid : (instance.__wxWebviewId__ || instance.getPageId())
export const getComponentName = instance => instance.__cml_originOptions__ ? instance.__cml_originOptions__.name : instance.$options.name
