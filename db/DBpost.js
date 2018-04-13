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
  // 对象包含3个属性，
  // category: 需要更新的标签[必须]，
  // id: 当前文章id [必须],
  // status: 布尔值需要更改状态 [更改收藏和点赞时必须传入];
  updatePostStatus (obj) {
    let postId = obj.id;
    let status = obj.status;
    let category = obj.category;
    // 获取指定的ID文章的数据信息
    let post = this.getPostById(postId);
    // 获取所有文章
    let allPost = this.getAllPostData().data;
    // 检查参数是否正确传入 TODO
    /**********************/ 
    // 操作数据
    switch (category) {
      // 收藏
      case 'collected':
        // 处理收藏
        if (status) {
          post.data.collectedNum ++;
          // console.log(post.data.savedNum);
        } else {
          post.data.collectedNum --;
          // console.log(post.data.savedNum);
        }
        break;
      // 阅读数量 
      case 'viewed':
        // 获取浏览器数据
        let browse_history = wx.getStorageSync('browse_history');
        // 检索是否已经浏览
        let _res = browse_history.filter((value) => {
          return value == postId;
        });
        if (!_res || _res.length == 0) {
          browse_history.push(postId);
          post.data.viewedNum ++;
          wx.setStorageSync('browse_history', browse_history)
        }
        break;
      // 点击喜欢 
      case 'enjoy':
        if (status) {
          post.data.enjoyNum++;
        } else {
          post.data.enjoyNum--;
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