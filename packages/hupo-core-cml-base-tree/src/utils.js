export const getViewId = instance => instance.__wxWebviewId__ || instance._uid
export const getComponentName = instance => instance.__cml_originOptions__ ? instance.__cml_originOptions__.name : instance.$options.name
