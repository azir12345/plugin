// alipay_rewrite.js
const url = $request.url;
const encoded = encodeURIComponent(url);
const target = `alipays://platformapi/startapp?saId=10000007&qrcode=${encoded}`;
$done({ response: { status: 307, headers: { Location: target } } });
