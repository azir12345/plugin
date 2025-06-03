// redirect-alipay-scheme.js

let url = $request.url;

// 提取 scheme 参数部分
let schemeMatch = url.match(/[?&]scheme=([^&]+)/);

if (schemeMatch && schemeMatch[1]) {
  // 解码 URL 中的 scheme 参数值
  let decodedScheme = decodeURIComponent(schemeMatch[1]);

  // 返回 302 重定向到该 scheme
  $done({ status: 307, headers: { Location: decodedScheme } });
} else {
  // 不匹配则正常继续
  $done({});
}
