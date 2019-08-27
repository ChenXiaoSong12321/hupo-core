/*!
 * @hupo/core-dayjs 0.0.2 
 * Copyright 2019 . All Rights Reserved
 */

import dayjs from 'dayjs';
import dayjsPluginUTC from 'dayjs-plugin-utc';
import 'dayjs/locale/zh-cn';

dayjs.locale('zh-cn');
dayjs.extend(dayjsPluginUTC); // use plugin

dayjs.formatDate = function (time, type) {
  if (isNaN(time)) return time;
  return dayjs.utc(parseInt(time)).utcOffset(480).format(type);
};

export default dayjs;
