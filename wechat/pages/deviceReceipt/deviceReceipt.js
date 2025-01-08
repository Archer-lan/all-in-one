Page({
    data: {
      currentDate: '',
      department: '',
      user: '',
      deviceName: '',
      quantity: '',
    },
  
    onLoad() {
      const currentDate = new Date().toISOString().split('T')[0];
      this.setData({ currentDate });
    },
  
    // 处理输入
    onInput(e) {
      const { field } = e.currentTarget.dataset;
      this.setData({
        [field]: e.detail.value,
      });
    },
  
    // 提交出库信息
    submitForm() {
      const { department, user, deviceName, quantity, currentDate } = this.data;
  
      if (!department || !user || !deviceName || !quantity) {
        wx.showToast({
          title: '请完整填写信息',
          icon: 'none',
        });
        return;
      }
  
      // 模拟保存数据
      const data = {
        department,
        user,
        deviceName,
        quantity,
        date: currentDate,
      };
  
      console.log('提交出库信息:', data);
  
      wx.showToast({
        title: '出库成功',
        icon: 'success',
      });
  
      // 清空表单数据
      this.setData({
        department: '',
        user: '',
        deviceName: '',
        quantity: '',
      });
    },
  });
  