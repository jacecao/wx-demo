import {DBpost} from '../../db/DBpost.js';
import {DBuser} from '../../db/DBuser.js';
// pages/post-detail/post-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  // 收藏和取消收藏
  onCollection () {
    if (this.data.collection) {
      this.setData({collection: false});
      this.dbpost.updatePostStatus({
        id: this.id,
        status: false,
        category: 'saved'
      });
    } else {
      this.setData({ collection: true });
      this.dbpost.updatePostStatus({
        id: this.id,
        status: true,
        category: 'saved'
      });
    }
    // this.dbuser.updateCollection({
    //   postId: this.id,
    //   postUrl: `/pages/post-detail/post-detail?id=${this.id}`
    // });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.id = options.id;
    this.dbpost = new DBpost();
    this.dbuser = new DBuser();
    this.post = this.dbpost.getPostById(options.id).data;
    let _result = this.dbuser.checkCollection(options.id);
    this.setData({
      post: this.post,
      collection: _result.status
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let title = this.post.title;
    if (title.length > 12) {
      title = title.substr(0, 12) + '......';
    }
    wx.setNavigationBarTitle({
      title
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})