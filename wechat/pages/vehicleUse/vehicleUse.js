Page({
    data: {
      dispatchForm: {
        user: '',
        driver: '',
        startMileage: '',
        reason: '',
        useDate: '',
      },
    },
  
    // 输入框事件
    onInputChange(e) {
      const field = e.currentTarget.dataset.field;
      this.setData({
        [`dispatchForm.${field}`]: e.detail.value,
      });
    },
  
    // 用车时间选择
    onDateChange(e) {
      this.setData({
        'dispatchForm.useDate': e.detail.value,
      });
    },
  
    // 提交派车单
    submitDispatchForm() {
      const { user, driver, startMileage, reason, useDate } = this.data.dispatchForm;
      if (!user || !driver || !startMileage || !reason || !useDate) {
        wx.showToast({
          title: '请完整填写派车单信息',
          icon: 'none',
        });
        return;
      }
  
      // 模拟提交
      console.log('派车单提交成功:', this.data.dispatchForm);
      wx.showToast({
        title: '提交成功',
        icon: 'success',
      });
  
      // 清空表单
      this.setData({
        dispatchForm: {
          user: '',
          driver: '',
          startMileage: '',
          reason: '',
          useDate: '',
        },
      });
    },
  });
  