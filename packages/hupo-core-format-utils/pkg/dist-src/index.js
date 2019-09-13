export const formatMoney = money => {
  if (!money) return "0";
  let f = parseFloat(money);

  if (isNaN(f)) {
    return "0";
  }

  f = Math.round(money) / 100;
  const s = parseFloat(f);
  return s;
};
export const formatDistance = distance => {
  const onehundred = "100";
  if (distance === null) return "";
  var f = parseFloat(distance);
  if (isNaN(f) || f < 100) return "100m以内";
  if (f < 10 * parseInt(onehundred)) return `${f}m`;
  const kilometers = Math.floor(f / 10) / 100;
  if (f < 5 * parseInt(onehundred) * 10 * parseInt(onehundred)) return `${kilometers.toFixed(1)}km`;
  return "500km以外";
};
export const compareVersion = (min, max) => {
  min = min.split(".");
  max = max.split(".");
  var len = Math.max(min.length, max.length);
  min.length < len && min.push("0");
  max.length < len && max.push("0");

  for (var i = 0; i < len; i++) {
    var num1 = parseInt(min[i]);
    var num2 = parseInt(max[i]);

    if (num1 > num2) {
      return true;
    } else if (num1 < num2) {
      return false;
    }
  }

  return true;
};

function rad(d) {
  return d * Math.PI / 180.0; // 经纬度转换成三角函数中度分表形式。
}

export const calcDistance = (LatLng1, LatLng2) => {
  const radLat1 = rad(LatLng1.latitude);
  const radLat2 = rad(LatLng2.latitude);
  const a = radLat1 - radLat2;
  const b = rad(LatLng1.longitude) - rad(LatLng2.longitude);
  let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
  s = s * 6378.137; // EARTH_RADIUS;

  s = Math.round(s * 10000) / 10; // 输出为米

  return s;
};