Page({
    data: {
      warehouse: '全部', // 默认仓库选项
      category: '全部', // 默认分类选项
      filterZeroStock: false, // 是否过滤零库存
    },
  
    // 返回按钮事件
    onBack() {
      wx.navigateBack();
    },
  
    // 保存按钮事件
    onSave() {
      const { warehouse, category, filterZeroStock } = this.data;
      // 模拟保存功能
      console.log('保存设置：', { warehouse, category, filterZeroStock });
      wx.showToast({
        title: '保存成功',
        icon: 'success',
      });
      // 返回上一页
      wx.navigateBack();
    },
  
    // 选择仓库事件
    onSelectWarehouse() {
      wx.showActionSheet({
        itemList: ['全部', '仓库A', '仓库B', '仓库C'],
        success: (res) => {
          const warehouses = ['全部', '仓库A', '仓库B', '仓库C'];
          this.setData({
            warehouse: warehouses[res.tapIndex],
          });
        },
      });
    },
  
    // 选择商品分类事件
    onSelectCategory() {
      wx.showActionSheet({
        itemList: ['全部', '分类A', '分类B', '分类C'],
        success: (res) => {
          const categories = ['全部', '分类A', '分类B', '分类C'];
          this.setData({
            category: categories[res.tapIndex],
          });
        },
      });
    },
  
    // 过滤零库存开关
    onSwitchChange(e) {
      this.setData({
        filterZeroStock: e.detail.value,
      });
    },
  });
  