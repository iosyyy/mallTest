var util = require('../../utils/util.js');
var api = require('../../config/api.js');
var app = getApp();
Page({
  data: {
    brandList: [],
    page: 1,
    limit: 10,
    totalPages: 1
  },
  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.getBrandList();
    //首次设置语言
    var that = this
    var app = getApp()
    this.setData({
      languageMap:app.globalData.languageMap
    })
    wx.setNavigationBarTitle({
      title: app.globalData.languageMap['品牌'],
    })
  },
  getBrandList: function() {
    wx.showLoading({
      title: languageMap['加载中...'],
    });
    let that = this;
    util.request(api.BrandList, {
      page: that.data.page,
      limit: that.data.limit
    }).then(function(res) {
      if (res.errno === 0) {
        that.setData({
          brandList: that.data.brandList.concat(res.data.list),
          totalPages: res.data.pages
        });
      }
      wx.hideLoading();
    });
  },
  onReachBottom() {
    if (this.data.totalPages > this.data.page) {
      this.setData({
        page: this.data.page + 1
      });
    } else {
      return false;
    }

    this.getBrandList();
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

  }
})