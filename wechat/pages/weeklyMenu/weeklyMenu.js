Page({
    data: {
      weekDays: [
        { day: '周一', content: '' },
        { day: '周二', content: '' },
        { day: '周三', content: '' },
        { day: '周四', content: '' },
        { day: '周五', content: '' },
        { day: '周六', content: '' },
        { day: '周日', content: '' },
      ],
    },
  
    // 输入框绑定事件
    onInputChange(e) {
      const day = e.currentTarget.dataset.day;
      const value = e.detail.value;
  
      // 更新对应天的菜单内容
      this.setData({
        weekDays: this.data.weekDays.map((item) =>
          item.day === day ? { ...item, content: value } : item
        ),
      });
    },
  
    // 提交周菜单
    submitWeeklyMenu() {
      const incomplete = this.data.weekDays.some((item) => !item.content);
  
      if (incomplete) {
        wx.showToast({
          title: '请填写完整周菜单',
          icon: 'none',
        });
        return;
      }
  
      // 模拟保存周菜单
      console.log('周菜单提交成功:', this.data.weekDays);
      wx.showToast({
        title: '提交成功',
        icon: 'success',
      });
  
      // 清空表单
      this.setData({
        weekDays: this.data.weekDays.map((item) => ({ ...item, content: '' })),
      });
    },
  });
  