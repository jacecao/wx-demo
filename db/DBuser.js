import { user } from '../data/userData.js';

// 通过symbol值设定私有方法
let execSetStorageSync = Symbol();
let updateCollectionList = Symbol();

class DBuser {
  constructor() {
    // 初始设定缓存key
    this.storageName = 'user';
    this.Collections = user.savedPost;
    // 初始输出对象
    this.msg = {
      errno: '404',
      errmsg: 'not found',
      data: '',
      index: ''
    };
  }
  
  // 获取用户收藏列表
  checkCollection (post_id) {
    let obj = {
      status: false,
      index: undefined
    };
    this.Collections.forEach((collection,index) => {
      if (collection.postId === parseInt(post_id)) {
        obj.status = true,
        obj.index = index;
      }
    });
    return obj;
  }

  // 更新收藏列表
  // 传入对象
  // 对象包含2个属性，postId: 需要收藏的id, postUrl: 文章地址;
  updateCollection (obj) {
    let result = this.checkCollection(obj.postId);
    if (result.status) {
      this.Collections.splice(result.index, 1);
    } else {
      this.Collections.push(obj);
    }
    this[execSetStorageSync](this.Collections);
  }

  // 缓存数据
  [execSetStorageSync](data) {
    wx.setStorageSync(this.storageName, data)
  }
}

export { DBuser };