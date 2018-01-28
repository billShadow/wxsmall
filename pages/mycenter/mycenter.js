//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello Small WeChat',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../mycenter/mycenter'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this

    // 授权
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          wx.authorize({
            scope: 'scope.userInfo',
            success() {
              // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
              wx.startRecord()
            }
          })
        }
      }
    })

    // 获取
    wx.getUserInfo({
      withCredentials: true,
      lang: 'zh_CN',
      success: function (res) {
        var userInfo = res.userInfo
        var nickName = userInfo.nickName
        var avatarUrl = userInfo.avatarUrl
        var gender = userInfo.gender //性别 0：未知、1：男、2：女
        var province = userInfo.province
        var city = userInfo.city
        var country = userInfo.country
        console.log(userInfo)

        that.setData({
          userInfo: userInfo
        })
      },
      fail:function(res) {
        //console.log(res)
        wx.openSetting()
        // wx.showModal({
        //   title: '提示',
        //   content: '请重新授权！'
        // })
      }
    })

    // 获取code
    wx.login({
      success: function (res) {
        console.log(res.code)
        // 获取code之后调用获取用户信息
      }
    });

    
  }
})
