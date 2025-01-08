Page({
    data: {
      menu: {
        breakfast: '',
        lunch: '',
        dinner: '',
      },
    },
  
    // 输入框绑定事件
    onInputChange(e) {
      const field = e.currentTarget.dataset.field;
      this.setData({
        [`menu.${field}`]: e.detail.value,
      });
    },
  
    // 提交当日菜单
    submitDailyMenu() {
      const { breakfast, lunch, dinner } = this.data.menu;
      if (!breakfast || !lunch || !dinner) {
        wx.showToast({
          title: '请完整填写菜单信息',
          icon: 'none',
        });
        return;
      }
  
      // 模拟保存菜单信息
      console.log('当日菜单提交成功:', this.data.menu);
      wx.showToast({
        title: '提交成功',
        icon: 'success',
      });
  
      // 清空表单
      this.setData({
        menu: {
          breakfast: '',
          lunch: '',
          dinner: '',
        },
      });
    },
  });
  