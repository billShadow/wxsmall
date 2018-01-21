var app = getApp()
Page({
  data: {
    movies: [
      { url: 'http://img04.tooopen.com/images/20130712/tooopen_17270713.jpg' },
      { url: 'http://img04.tooopen.com/images/20130617/tooopen_21241404.jpg' },
      { url: 'http://img04.tooopen.com/images/20130701/tooopen_20083555.jpg' },
      { url: 'http://img02.tooopen.com/images/20141231/sy_78327074576.jpg' }
    ],
    lists: [
      {
        url: '../../images/fy1-img.jpg', tit: '整租 · 南竹杆胡同1居室-南' },
      { url: '../../images/fy2-img.jpg', tit: '整租 · 海特花园小区2居室-南北' },
      { url: '../../images/fy3-img.jpg', tit: '整租 · 未来661居室-南' },
      { url: '../../images/fy1-img.jpg', tit: '整租 · 南竹杆胡同1居室-南' }
    ],
    lgImg: [
      { url: '../../images/lg1.png' },
      { url: '../../images/lg1.png' },
      { url: '../../images/lg1.png' },
      { url: '../../images/lg1.png' }
    ],
    array: [{
      mode: 'scaleToFill',
      text: 'scaleToFill：不保持纵横比缩放图片，使图片完全适应'
    }]
  },
  onLoad: function () {
  }
});