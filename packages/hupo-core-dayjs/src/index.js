import dayjs from 'dayjs'
import dayjsPluginUTC from 'dayjs-plugin-utc' // load on demand
import 'dayjs/locale/zh-cn'

dayjs.locale('zh-cn')
dayjs.extend(dayjsPluginUTC) // use plugin

dayjs.formatDate = (time, type) => {
  if (isNaN(time)) return time
  return dayjs.utc(parseInt(time)).utcOffset(480).format(type)
}

export default dayjs