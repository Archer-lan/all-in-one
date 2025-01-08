Page({
    data: {
      repairInfo: {
        licensePlate: '',
        repairContent: '',
        repairCost: '',
        repairPerson: '',
        repairDate: '',
      },
    },
  
    // 输入框事件
    onInputChange(e) {
      const field = e.currentTarget.dataset.field;
      this.setData({
        [`repairInfo.${field}`]: e.detail.value,
      });
    },
  
    // 维修时间选择
    onDateChange(e) {
      this.setData({
        'repairInfo.repairDate': e.detail.value,
      });
    },
  
    // 提交维修信息
    submitRepairInfo() {
      const { licensePlate, repairContent, repairCost, repairPerson, repairDate } = this.data.repairInfo;
      if (!licensePlate || !repairContent || !repairCost || !repairPerson || !repairDate) {
        wx.showToast({
          title: '请完整填写维修信息',
          icon: 'none',
        });
        return;
      }
  
      // 模拟保存数据
      console.log('维修信息提交成功:', this.data.repairInfo);
      wx.showToast({
        title: '提交成功',
        icon: 'success',
      });
  
      // 清空表单
      this.setData({
        repairInfo: {
          licensePlate: '',
          repairContent: '',
          repairCost: '',
          repairPerson: '',
          repairDate: '',
        },
      });
    },
  });
  