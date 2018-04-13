import { user } from '../data/userData.js';

// 通过symbol值设定私有方法
let execSetStorageSync = Symbol();
let updateCollectionList = Symbol();

class DBuser {
  constructor() {
    // 初始设定缓存key
    this.storageName = 'user';
    this.user = wx.getStorageSync(this.storageName);
    if (!this.user) {
      this[execSetStorageSync](user);
      this.user = wx.getStorageSync(this.storageName);
    }
  }
  // 获取所有收藏的文章
  getAllcollections () {
    return this.user.collectedPost;
  }
  // 获取所有喜欢的文章
  getAllEnjoyPost () {
    return this.user.enjoyPost;
  }
  // 检查当前文章是否收藏
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
  // 检查当前文章是否喜欢
  checkEnjoy(post_id) {
    let obj = {
      status: false,
      index: undefined
    };
    let enjoy_arr = this.getAllEnjoyPost();
    enjoy_arr.forEach((enjoy, index) => {
      if (enjoy.postId == parseInt(post_id)) {
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
    this[execSetStorageSync](this.user);
    return status;
  }
  // 更新喜欢数据
  // 传入对象
  // 对象包含2个属性，postId: 需要收藏的id, postUrl: 文章地址;
  updateEnjoy(obj) {
    let result = this.checkEnjoy(obj.postId);
    let enjoy_arr = this.getAllEnjoyPost();
    let status = false;
    if (result.status) {
      enjoy_arr.splice(result.index, 1);
    } else {
      enjoy_arr.push(obj);
      status = true;
    }
    this[execSetStorageSync](this.user);
    return status;
  }

  // 缓存数据
  [execSetStorageSync](data) {
    wx.setStorageSync(this.storageName, data)
  }
}

export { DBuser };