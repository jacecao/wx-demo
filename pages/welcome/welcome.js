Page({
  onTapJump (event) {
    wx.navigateTo({
      url: '../post/post',
      success: () => console.log('jump success'),
      fail: () => console.log('jump faile'),
      complete: () => console.log('jump complete')
    })
  }
})