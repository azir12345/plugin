// 获取当前时间（时分）
let now = new Date();
let hour = now.getHours();
let minute = now.getMinutes();

// 仅在 11:59–12:00 之间才拦截并保存
if (
  $request.method === "POST" &&
  $request.headers["Authorization"] &&
  hour === 11 &&
  minute === 59
) {
  $persistentStore.write($request.headers["Authorization"], "auth_token");
  $persistentStore.write($request.body, "last_body");
  console.log("已保存请求 Authorization 和 body");
} else {
  console.log("非有效时间段，放行请求");
}

$done({});
