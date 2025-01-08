Page({
    data: {
      deviceName: '', // 设备名称
      faultDescription: '', // 故障描述
      repairProcess: '', // 维修过程
      repairCost: '', // 维修费用
      repairDate: '', // 维修日期
    },
  
    // 输入框事件处理
    onInputChange(e) {
      const field = e.currentTarget.dataset.field;
      this.setData({
        [field]: e.detail.value,
      });
    },
  
    // 时间选择器事件处理
    onDateChange(e) {
      this.setData({
        repairDate: e.detail.value,
      });
    },
  
    // 提交维修记录
    submitRepairRecord() {
      const { deviceName, faultDescription, repairProcess, repairCost, repairDate } = this.data;
  
      // 数据校验
      if (!deviceName || !faultDescription || !repairProcess || !repairCost || !repairDate) {
        wx.showToast({
          title: '请完整填写维修记录信息',
          icon: 'none',
        });
        return;
      }
  
      // 模拟保存数据（实际需要调用接口提交数据到后台）
      console.log('维修记录提交成功：', {
        deviceName,
        faultDescription,
        repairProcess,
        repairCost,
        repairDate,
      });
  
      wx.showToast({
        title: '提交成功',
        icon: 'success',
      });
  
      // 清空表单
      this.setData({
        deviceName: '',
        faultDescription: '',
        repairProcess: '',
        repairCost: '',
        repairDate: '',
      });
  
      // 返回上一个页面
      wx.navigateBack();
    },
  });
  