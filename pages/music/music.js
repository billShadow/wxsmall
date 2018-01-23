var app = getApp()
var urls = "http://sc1.111ttt.cn/2015/1/02/23/95230619282.mp3";
var http_url = "http://i.gtimg.cn/music/photo/mid_album_90/a/F/";
//console.log(api_url);
Page({
  data: {
    musci: [
      { name: "我们不一样", author: "群星", "urls": urls, img: http_url+'000QgFcm0v8WaF.jpg'},
      { "name": "凉凉", "author": "发姐", "urls": "http://vip.baidu190.com/uploads/2017/20170207ff925ef6f268a5563f0552c3ba141f.mp3", img: http_url + '000QgFcm0v8WaF.jpg'}
      ]
  },
  star_mus:function(event){
    console.log(event);
    console.log(event.currentTarget.id);
    var box_url = event.currentTarget.id;
    wx.playBackgroundAudio({
      dataUrl: box_url,
      title: '薛之谦',
      //图片地址地址  
      coverImgUrl: http_url + '000QgFcm0v8WaF.jpg'

    })
  }
  ,
  //播放  
  listenerButtonPlay: function () {
    wx.playBackgroundAudio({
      dataUrl: urls,
      title: '薛之谦',
      //图片地址地址  
      coverImgUrl: http_url + '000QgFcm0v8WaF.jpg'

    })
  },
  //监听button暂停按钮  
  listenerButtonPause: function () {
    wx.pauseBackgroundAudio({
    });
    console.log('暂停播放')
  },
  /**  
   * 播放状态  
   */
  listenerButtonGetPlayState: function () {
    wx.getBackgroundAudioPlayerState({
      success: function (res) {
        // success  
        //duration  选定音频的长度（单位：s），只有在当前有音乐播放时返回  
        console.log('duration:' + res.duration)
        console.log('currentPosition:' + res.currentPosition)
        //status    播放状态（2：没有音乐在播放，1：播放中，0：暂停中）  
        console.log('status:' + res.status)
        console.log('downloadPercent:' + res.downloadPercent)
        //dataUrl   歌曲数据链接，只有在当前有音乐播放时返回   
        console.log('dataUrl:' + res.dataUrl)
      },
      fail: function () {
        // fail  
      },
      complete: function () {
        // complete  
      }
    })
  },
  /**  
   * 设置进度  
   */
  listenerButtonSeek: function () {
    wx.seekBackgroundAudio({
      position: 40
    })
  },
  /**  
   * 停止播放  
   */
  listenerButtonStop: function () {
    wx.stopBackgroundAudio({
    })
    console.log('停止播放')
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数  
    var url = app.globalData.api_url +'/api/music/musiclist';
    var that = this;
    wx.request({
      url: url,
      method: 'post',
      header : {'content-type':'applicatio/json'},
      success : function (res) {
        
        console.log(111)
        console.log(res.data)
        if (res.data.code == 200) {
          that.setData({
            music_list: res.data.data
          });
        } else {
          console.log('404');
        }
      }
    })

    /**   
     * 监听音乐播放   
     */
    wx.onBackgroundAudioPlay(function () {
      // callback  
      console.log('onBackgroundAudioPlay')
    })
    /**  
     * 监听音乐暂停  
     */
    wx.onBackgroundAudioPause(function () {
      // callback  
      console.log('onBackgroundAudioPause')
    })
    /**  
     * 监听音乐停止  
     */
    wx.onBackgroundAudioStop(function () {
      // callback  
      console.log('onBackgroundAudioStop')
    })
  }
})  