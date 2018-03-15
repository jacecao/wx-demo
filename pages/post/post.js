import {DBpost} from '../../db/DBpost.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  onTapToDetail: (event) => {
    let postId = event.currentTarget.dataset.postid;
    if (postId) {
      wx.navigateTo({
        url: `/pages/post-detail/post-detail?id=${postId}`,
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let dbpost = new DBpost();
    let getdata = dbpost.getAllPostData();
    if (getdata.errno == '0') {
      this.setData({
        postList: getdata.data
      });
    } else {
      console.log('post data not found');
    }
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('onshow yes');
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('onhide yes');
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('onUNload yes');
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log('push down');
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('touch bottom');
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})