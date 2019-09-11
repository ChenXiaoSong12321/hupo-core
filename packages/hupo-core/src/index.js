import { request as requestWeb$request, initialize as requestWeb$initialize } from "@hupo/core-request-web";
import { request as requestWxapp$request, initialize as requestWxapp$initialize } from "@hupo/core-request-wx-app";
export { default as global} from "@hupo/core-global";
export { default as promise} from "@hupo/core-promise";
export { default as wxTools} from "@hupo/core-wx-app-tools";
export { componentBaseTreeMixin, pageBaseTreeMixin} from "@hupo/core-cml-base-tree";
export { Event, componentEventMixin, pageEventMixin} from "@hupo/core-cml-event";
export { default as dayjs} from "@hupo/core-dayjs";
export { default as timer} from "@hupo/core-timer";
export { default as url} from "@hupo/core-url";
export { default as requestBase} from "@hupo/core-request-base";
export const requestWxapp = {
  request: requestWxapp$request,
  initialize: requestWxapp$initialize,
}
export const requestWeb = {
  request: requestWeb$request,
  initialize: requestWeb$initialize,
}