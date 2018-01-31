//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello Small WeChat',
    userInfo: {},
    code:'',
    iv:'',
    cryptData:''
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../mycenter/mycenter'
    })
  },
  onLoad: function () {
    var that = this;

    // 授权
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          wx.authorize({
            scope: 'scope.userInfo',
            success() {
              // 用户已经同意授权，后续调用 wx.startRecord 接口不会弹窗询问
              wx.startRecord()
            }
          })
        }
      }
    });

    // 获取code
    wx.login({
      success: function (res) {
        // 获取code之后调用获取用户信息
        var code = res.code;
        that.setData({code:code});
        console.log(code)

        // 获取
        wx.getUserInfo({
          withCredentials: true,
          lang: 'zh_CN',
          success: function (res) {
            var iv = res.iv;
            var cryptData = res.encryptedData;
            var code = that.data.code;
            console.log(123);
            console.log(code);
            var userInfo = res.userInfo;

            var nickName = userInfo.nickName
            var avatarUrl = userInfo.avatarUrl
            var gender = userInfo.gender //性别 0：未知、1：男、2：女
            var province = userInfo.province
            var city = userInfo.city
            var country = userInfo.country

            that.setData({
              userInfo: userInfo
            });
            var url = app.globalData.api_url + '/api/login/login';
            // 请求接口注册
            wx.request({
              url: url,
              data: { code: code, iv: iv, cryptData: cryptData },
              method: 'post',
              header: { 'content-type': 'applicatio/json' },
              success: function (res) {
                console.log(res)
              }
            })
          },
          fail: function (res) {
            //console.log(res)
            wx.openSetting()
            // wx.showModal({
            //   title: '提示',
            //   content: '请重新授权！'
            // })
          }
        });
      }
    });
  }
})
