Page({
    data: {
      returnForm: {
        returnDate: '',
        endMileage: '',
      },
    },
  
    // 归还时间选择
    onReturnDateChange(e) {
      this.setData({
        'returnForm.returnDate': e.detail.value,
      });
    },
  
    // 输入框事件
    onInputChange(e) {
      const field = e.currentTarget.dataset.field;
      this.setData({
        [`returnForm.${field}`]: e.detail.value,
      });
    },
  
    // 提交归还信息
    submitReturnForm() {
      const { returnDate, endMileage } = this.data.returnForm;
      if (!returnDate || !endMileage) {
        wx.showToast({
          title: '请完整填写归还信息',
          icon: 'none',
        });
        return;
      }
  
      // 模拟提交
      console.log('归还信息提交成功:', this.data.returnForm);
      wx.showToast({
        title: '提交成功',
        icon: 'success',
      });
  
      // 清空表单
      this.setData({
        returnForm: {
          returnDate: '',
          endMileage: '',
        },
      });
    },
  });
  