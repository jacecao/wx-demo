import {postList} from '../data/postData.js';

// 通过symbol值设定私有方法
let execSetStorageSync = Symbol();

class DBpost {
  constructor () {
    // 初始设定缓存key
    this.storageName = 'postList';
  }
  // 获取所有的文章信息
  getAllPostData () {
    let res = wx.getStorageSync(this.storageName);
    let obj = new Object();
    if (!res) {
      res = postList;
      this[execSetStorageSync](res);
    }
    // 组装输出数据
    obj.data = res;
    obj.errno = '0';
    obj.errmsg = '';
    return obj;
  }
  // 获取指定id的文章信息
  getPostById (id) {
    let postData = this.getAllPostData().data;
    let obj = new Object();
    postData.forEach((post, index) => {
      if (post.postId == id) {
        // 组装输出数据
        obj.data = post;
        obj.errno = '0';
        obj.errmsg = '';
        obj.index = index;
      }
    });
    return obj;
  }
  
  
  // 更新当前读取文章信息
  // 传入对象
  // 对象包含2个属性，category: 需要更新的标签，id: 当前文章id, status: 布尔值需要更改状态;
  updatePostStatus (obj) {
    let postId = obj.id;
    let status = obj.status;
    let category = obj.category;
    // 获取指定的ID文章的数据信息
    let post = this.getPostById(postId);
    // 获取所有文章
    let allPost = this.getAllPostData().data;
    // 操作数据
    switch (category) {
      case 'saved':
        // 处理收藏
        if (status) {
          post.data.savedNum ++;
          // console.log(post.data.savedNum);
        } else {
          post.data.savedNum --;
          // console.log(post.data.savedNum);
        }
        break;
    }
    // 更新数据
    allPost[post.index] = post.data;
    this[execSetStorageSync](allPost);
    // 返回更新后的数据
    return post.data;
  }

  // 缓存数据
  [execSetStorageSync] (data) {
    wx.setStorageSync(this.storageName, data)
  }
}

export {DBpost};