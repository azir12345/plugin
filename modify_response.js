if ($response.body) {
  try {
    let obj = JSON.parse($response.body);

    if (obj.backdate) {
      // backdate 转换为时间戳
      let backdate = new Date(obj.backdate).getTime();
      let now = Date.now();

      let diff = now - backdate; // 毫秒差值
      let diffSec = (diff / 1000).toFixed(3); // 秒，保留3位小数

      obj.Msg = `请求保存完成，与真实时间差为 ${diffSec} 秒`;

      // 返回修改后的 body
      $done({ body: JSON.stringify(obj) });
    } else {
      $done({});
    }
  } catch (e) {
    console.log("解析响应失败: " + e);
    $done({});
  }
} else {
  $done({});
}
