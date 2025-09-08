let auth = $persistentStore.read("auth_token");
let body = $persistentStore.read("last_body");
let interval = $argument.interval ? parseInt($argument.interval) : 500;

if (!auth || !body) {
  console.log("未找到保存的请求信息，请先在有效时段拦截一次请求");
  $done();
}

let url = "http://zhcg.cpu.edu.cn/post/saveYuyue";

function sendReq() {
  let req = {
    url: url,
    method: "POST",
    headers: {
      "Authorization": auth,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: body
  };

  $httpClient.post(req, function (error, response, data) {
    if (error) {
      console.log("请求出错: " + error);
      $done();
      return;
    }
    console.log("响应: " + data);

    if (data.includes("请在预约开放时间内提交预约！")) {
      // 继续重放
      setTimeout(sendReq, interval);
    } else {
      console.log("成功或已进入预约时间，停止重放");
      $done();
    }
  });
}

// 从 11:59:59 第一次执行
sendReq();
