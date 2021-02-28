var api = require('../../../config/api.js');
var util = require('../../../utils/util.js');
var user = require('../../../utils/user.js');

var app = getApp();
Page({
  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
    // 页面渲染完成
//首次设置语言
var that = this
var app = getApp()
this.setData({
  languageMap:app.globalData.languageMap
})
wx.setNavigationBarTitle({
  title: app.globalData.languageMap['登录'],
})

  },
  onReady: function() {

  },
  onShow: function() {
    // 页面显示
  },
  onHide: function() {
    // 页面隐藏

  },
  onUnload: function() {
    // 页面关闭

  },
  wxLogin: function(e) {
    if (e.detail.userInfo == undefined) {
     app.globalData.hasLogin = false;
       util.showErrorToast(this.data.languageMap['微信登录失败']);
      return;
    }
    wx.showToast({
      title: this.data.languageMap['正在登录中...'],
      image:'../../../static/images/loading.gif ',
      mask:true
    })
    user.checkLogin().catch(() => {

      user.loginByWeixin(e.detail.userInfo).then(res => {
        app.globalData.hasLogin = true;
        wx.navigateBack({
          delta: 1
        })
        
      }).catch((err) => {
        app.globalData.hasLogin = false;
        util.showErrorToast(this.data.languageMapp['微信登录失败']);
      });
    });
    
  },
  accountLogin: function() {
    wx.navigateTo({
      url: "/pages/auth/accountLogin/accountLogin"
    });
  }
})