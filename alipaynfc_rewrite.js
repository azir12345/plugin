// alipaynfc_rewrite.js
let url = $request.url;
let decoded = decodeURIComponent(url);

// 提取 scheme 参数中的 alipay 开头的部分
let match = decoded.match(/scheme=(alipay:\/\/[^\s]+)/);

if (match && match[1]) {
  let redirectURL = match[1];
  $done({ status: 302, headers: { Location: redirectURL } });
} else {
  $done({});
}
