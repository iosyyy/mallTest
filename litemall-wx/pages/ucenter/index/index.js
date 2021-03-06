var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var user = require('../../../utils/user.js');
var app = getApp();

Page({
  data: {

    order: {
      unpaid: 0,
      unship: 0,
      unrecv: 0,
      uncomment: 0
    },
    hasLogin: false,
    actionSheetHidden: true,
    typeArray: ['简体中文', 'English','日本語','Pусский','한국어']
  },
  onLoad: function (options) {
    //首次设置语言
    var that = this
    var app = getApp()
    this.setData({
      languageMap: app.globalData.languageMap
    })
    wx.setNavigationBarTitle({
      title: app.globalData.languageMap['个人中心'],
    })
    console.log("Hello");
    
    this.setData({
      userInfo: {
        nickName: app.globalData.languageMap['点击登录'],
        avatarUrl: '/static/images/my.png'
      },
    })
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function () {

  },
  onShow: function () {
    var that = this
    var app = getApp()
    this.setData({
      languageMap: app.globalData.languageMap
    })
    //获取用户的登录信息
    if (app.globalData.hasLogin) {
      let userInfo = wx.getStorageSync('userInfo');
      this.setData({
        userInfo: userInfo,
        hasLogin: true
      });

      let that = this;
      util.request(api.UserIndex).then(function (res) {
        if (res.errno === 0) {
          that.setData({
            order: res.data.order
          });
        }
      });
    }

  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭
  },
  goLogin() {
    if (!this.data.hasLogin) {
      wx.navigateTo({
        url: "/pages/auth/login/login"
      });
    }
  },
  goOrder() {
    if (this.data.hasLogin) {
      try {
        wx.setStorageSync('tab', 0);
      } catch (e) {

      }
      wx.navigateTo({
        url: "/pages/ucenter/order/order"
      });
    } else {
      wx.navigateTo({
        url: "/pages/auth/login/login"
      });
    }
  },
  goOrderIndex(e) {
    if (this.data.hasLogin) {
      let tab = e.currentTarget.dataset.index
      let route = e.currentTarget.dataset.route
      try {
        wx.setStorageSync('tab', tab);
      } catch (e) {

      }
      wx.navigateTo({
        url: route,
        success: function (res) {},
        fail: function (res) {},
        complete: function (res) {},
      })
    } else {
      wx.navigateTo({
        url: "/pages/auth/login/login"
      });
    };
  },
  goGroupon() {
    if (this.data.hasLogin) {
      wx.navigateTo({
        url: "/pages/groupon/myGroupon/myGroupon"
      });
    } else {
      wx.navigateTo({
        url: "/pages/auth/login/login"
      });
    };
  },
  goCollect() {
    if (this.data.hasLogin) {
      wx.navigateTo({
        url: "/pages/ucenter/collect/collect"
      });
    } else {
      wx.navigateTo({
        url: "/pages/auth/login/login"
      });
    };
  },
  goFeedback(e) {
    if (this.data.hasLogin) {
      wx.navigateTo({
        url: "/pages/ucenter/feedback/feedback"
      });
    } else {
      wx.navigateTo({
        url: "/pages/auth/login/login"
      });
    };
  },
  goFootprint() {
    if (this.data.hasLogin) {
      wx.navigateTo({
        url: "/pages/ucenter/footprint/footprint"
      });
    } else {
      wx.navigateTo({
        url: "/pages/auth/login/login"
      });
    };
  },
  goAddress() {
    if (this.data.hasLogin) {
      wx.navigateTo({
        url: "/pages/ucenter/address/address"
      });
    } else {
      wx.navigateTo({
        url: "/pages/auth/login/login"
      });
    };
  },
  bindPhoneNumber: function (e) {
    if (e.detail.errMsg !== "getPhoneNumber:ok") {
      // 拒绝授权
      return;
    }

    if (!this.data.hasLogin) {
      wx.showToast({
        title: this.data.languageMap['绑定失败：请先登录'],
        icon: 'none',
        duration: 2000
      });
      return;
    }

    util.request(api.AuthBindPhone, {
      iv: e.detail.iv,
      encryptedData: e.detail.encryptedData
    }, 'POST').then(function (res) {
      if (res.errno === 0) {
        wx.showToast({
          title: this.data.languageMap['绑定手机号码成功'],
          icon: 'success',
          duration: 2000
        });
      }
    });
  },
  goAfterSale: function () {
    if (this.data.hasLogin) {
      wx.navigateTo({
        url: "/pages/ucenter/aftersaleList/aftersaleList"
      });
    } else {
      wx.navigateTo({
        url: "/pages/auth/login/login"
      });
    };
  },
  aboutUs: function () {
    wx.navigateTo({
      url: '/pages/about/about'
    });
  },
  goHelp: function () {
    wx.navigateTo({
      url: '/pages/help/help'
    });
  },
  exitLogin: function () {
    
    wx.showModal({
      title: '',
      confirmColor: '#b4282d',
      content: this.data.languageMap['退出登录？'],
      cancelText:this.data.languageMap['取消'],
      confirmText:this.data.languageMap['确定'],	
      cancelColor:'#808080',
      success: function (res) {
        if (!res.confirm) {
          return;
        }

        util.request(api.AuthLogout, {}, 'POST');
        app.globalData.hasLogin = false;
        wx.removeStorageSync('token');
        wx.removeStorageSync('userInfo');
        
        wx.reLaunch({
          url: '/pages/index/index'
        });
      }
    })

  },
  goSwitch() {
    this.setData({
      actionSheetHidden: false
    })

  },
  listenerActionSheet() {
    this.setData({
      actionSheetHidden: true
    })
  },
  changeLanguage(e) {
    var index = e.target.dataset.index
    console.log("index:" + index);
    util.changeLanguage(index)
    var app = getApp()
    this.setData({
      languageMap: app.globalData.languageMap
    })
    wx.setNavigationBarTitle({
      title: app.globalData.languageMap['个人中心'],
    })
    if(!this.data.hasLogin){
      this.setData({
        'userInfo.nickName':app.globalData.languageMap['点击登录']
      })
    }
    this.setData({
      actionSheetHidden: true
    })
  }
})