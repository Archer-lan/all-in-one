Page({
    data: {
      userInfo: {
        name: '', // 从用户信息接口获取
        avatar: '/images/default-avatar.png'
      }
    },
  
    onLoad() {
      // 模拟获取用户信息，可以通过 wx.getUserProfile 或接口调用
      this.getUserInfo();
    },
  
    getUserInfo() {
      const userInfo = wx.getStorageSync('userInfo') || {
        name: '微信用户',
        avatar: '/images/default-avatar.png'
      };
      this.setData({ userInfo });
    },
  
    editProfile() {
      wx.navigateTo({
        url: '/pages/editProfile/editProfile'
      });
    }
  });
  