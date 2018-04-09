import { user } from '../data/userData.js';

// 通过symbol值设定私有方法
let execSetStorageSync = Symbol();
let updateCollectionList = Symbol();

class DBuser {
  constructor() {
    // 初始设定缓存key
    this.storageName = 'user';
    this.Collections = user.collectedPost;
  }
  getAllcollections () {
    let collections = wx.getStorageSync(this.storageName);
    if (!collections) {
      collections = this.Collections;
    }
    return collections;
  }
  // 获取用户收藏列表
  checkCollection (post_id) {
    let obj = {
      status: false,
      index: undefined
    };
    let collections = this.getAllcollections();
    collections.forEach((collection,index) => {
      if (collection.postId == parseInt(post_id)) {
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
    let collections = this.getAllcollections();
    let status = false;
    if (result.status) {
      collections.splice(result.index, 1);
    } else {
      collections.push(obj);
      status = true;
    }
    this[execSetStorageSync](collections);
    return status;
  }

  // 缓存数据
  [execSetStorageSync](data) {
    wx.setStorageSync(this.storageName, data)
  }
}

export { DBuser };