import {postList} from './data/postData.js';

App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    /*
    wx.setStorage({
      key: 'postList',
      data: postData.postList,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
    */
    /*
    let postList = wx.getStorageSync('postList');
    if (!postList) {
      wx.clearStorageSync();
      wx.setStorageSync('postList', postData.postList);
    }
    */
    // 设置浏览历史
    wx.setStorageSync('browse_history', []);
    // 强制更新缓存数据  
    wx.setStorageSync('postList', postList);
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    console.log('show');
    console.log(options);
    // 获取设备信息
    wx.getSystemInfo({
      success: function(res) {
        // console.log(res);
      },
    })
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    console.log('hide');
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {
    console.log('app err');
  }
})
