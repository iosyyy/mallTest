var util = require('./utils/util.js');
var api = require('./config/api.js');
var user = require('./utils/user.js');
App({
  onLaunch: function() {
    const updateManager = wx.getUpdateManager();
    wx.getUpdateManager().onUpdateReady(function() {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })
  },
  onShow: function(options) {
    user.checkLogin().then(res => {
      this.globalData.hasLogin = true;
    }).catch(() => {
      this.globalData.hasLogin = false;
    });
  },
  globalData: {
    hasLogin: false,
    languageMap:null
  },
  languageMapChange:function(callBack){
    var obj = this.globalData;
    Object.defineProperty(obj,"languageMap", {
      configurable: true,
      enumerable: true,
      set: function (value) {
        // value就是被新赋予的值，通过回调函数，把这值回调出去
        callBack(value);
      },
      get:function(){
      // 可以在这里打印一些东西，然后在其他界面调用getApp().globalData.name的时候，这里就会执行。
        return this._name
      }
    })
  },
})