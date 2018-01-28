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
    var box_url = event.currentTarget.id;
    console.log(app)

    const backgroundAudioManager = wx.getBackgroundAudioManager()
    var star_type = backgroundAudioManager.paused
    console.log(backgroundAudioManager.paused)
    var name = this.data.music_list[box_url]['name']
    var author = this.data.music_list[box_url]['author']
    var music_url = this.data.music_list[box_url]['urls']
    
    backgroundAudioManager.title = name
    backgroundAudioManager.epname = name
    backgroundAudioManager.singer = author
    backgroundAudioManager.coverImgUrl = this.data.music_list[box_url]['img']
    console.log(backgroundAudioManager.title)
    if (star_type == true || star_type == undefined) {
      backgroundAudioManager.play()
      wx.setStorageSync("curr_music", name);
      backgroundAudioManager.src = music_url // 设置了 src 之后会自动播放
    } else if (star_type == false) {
      var now_muc = wx.getStorageSync("curr_music")
      if (now_muc != name) {
        backgroundAudioManager.play()
        backgroundAudioManager.src = music_url // 设置了 src 之后会自动播放
      } else {
        backgroundAudioManager.stop()
      }
    }

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
    });

    
  }
})  