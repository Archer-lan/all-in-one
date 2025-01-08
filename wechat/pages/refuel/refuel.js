Page({
    data: {
      refuelInfo: {
        mileage: '',
        licensePlate: '',
        refuelPerson: '',
      },
    },
  
    // 输入框事件
    onInputChange(e) {
      const field = e.currentTarget.dataset.field;
      this.setData({
        [`refuelInfo.${field}`]: e.detail.value,
      });
    },
  
    // 提交加油信息
    submitRefuelInfo() {
      const { mileage, licensePlate, refuelPerson } = this.data.refuelInfo;
      if (!mileage || !licensePlate || !refuelPerson) {
        wx.showToast({
          title: '请完整填写加油信息',
          icon: 'none',
        });
        return;
      }
  
      // 模拟保存数据
      console.log('加油信息提交成功:', this.data.refuelInfo);
      wx.showToast({
        title: '提交成功',
        icon: 'success',
      });
  
      // 清空表单
      this.setData({
        refuelInfo: {
          mileage: '',
          licensePlate: '',
          refuelPerson: '',
        },
      });
    },
  });
  