Page({
    data: {
      assets: [
        { id: 1, name: '餐桌', quantity: 10, value: 5000, condition: '完好' },
        { id: 2, name: '电饭煲', quantity: 5, value: 2000, condition: '需维修' },
      ],
    },
  
    // 添加资产
    addAsset() {
      wx.showToast({
        title: '添加资产功能开发中',
        icon: 'none',
      });
    },
  
    // 编辑资产
    editAsset(e) {
      const id = e.currentTarget.dataset.id;
      wx.showToast({
        title: `编辑资产 ${id}`,
        icon: 'none',
      });
    },
  
    // 删除资产
    deleteAsset(e) {
      const id = e.currentTarget.dataset.id;
      wx.showModal({
        title: '确认删除',
        content: '确定删除该资产？',
        success: (res) => {
          if (res.confirm) {
            this.setData({
              assets: this.data.assets.filter((asset) => asset.id !== id),
            });
            wx.showToast({
              title: '删除成功',
              icon: 'success',
            });
          }
        },
      });
    },
  });
  