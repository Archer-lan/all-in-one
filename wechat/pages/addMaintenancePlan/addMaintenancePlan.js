Page({
    data: {
      deviceName: '', // 设备名称
      maintenanceContent: '', // 维护内容
      maintenanceDate: '', // 维护时间
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
        maintenanceDate: e.detail.value,
      });
    },
  
    // 提交维护计划
    submitMaintenancePlan() {
      const { deviceName, maintenanceContent, maintenanceDate } = this.data;
  
      // 数据校验
      if (!deviceName || !maintenanceContent || !maintenanceDate) {
        wx.showToast({
          title: '请完整填写维护计划信息',
          icon: 'none',
        });
        return;
      }
  
      // 模拟保存数据（实际需要调用接口提交数据到后台）
      console.log('维护计划提交成功：', {
        deviceName,
        maintenanceContent,
        maintenanceDate,
      });
  
      wx.showToast({
        title: '提交成功',
        icon: 'success',
      });
  
      // 清空表单
      this.setData({
        deviceName: '',
        maintenanceContent: '',
        maintenanceDate: '',
      });
  
      // 返回上一个页面
      wx.navigateBack();
    },
  });
  