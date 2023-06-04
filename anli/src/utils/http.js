export const http = {
  baseUrl: 'http://your.api.endpoint',
  // 请求拦截器
  requestInterceptor: (options) => {
    // 在请求发送之前添加请求头
    options.header = {
      ...options.header,
      'Authorization': 'Bearer token123',
    };
    return options;
  },
  // 响应拦截器
  responseInterceptor: (response) => {
    // 在响应处理之前做一些处理
    if (response.statusCode === 200 && response.data.code !== 0) {
      uni.showToast({
        title: response.data.msg,
        icon: 'none',
      });
    }
    return response;
  },
  // 发送请求
  request: function(options) {
    const { url, data, method } = options;

    return new Promise((resolve, reject) => {
      uni.request({
        url: this.baseUrl + url,
        data: data,
        method: method.toUpperCase(),
        header: options.header || {},
        success: (res) => {
          resolve(this.responseInterceptor(res));
        },
        fail: (err) => {
          reject(err);
        },
      })
    }).then((response) => {
      return response.data;
    }).catch((error) => {
      console.log(error);
    });
  },
};
