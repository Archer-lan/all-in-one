Page({
    data: {
      purchase: {
        name: '',
        price: '',
        quantity: '',
        purchaseDate: '',
        person: '',
      },
    },
  
    // 输入框绑定事件
    onInputChange(e) {
      const field = e.currentTarget.dataset.field;
      this.setData({
        [`purchase.${field}`]: e.detail.value,
      });
    },
  
    // 日期选择绑定事件
    onDateChange(e) {
      this.setData({
        'purchase.purchaseDate': e.detail.value,
      });
    },
  
    // 提交采购信息
    submitPurchase() {
      const { name, price, quantity, purchaseDate, person } = this.data.purchase;
      if (!name || !price || !quantity || !purchaseDate || !person) {
        wx.showToast({
          title: '请完整填写采购信息',
          icon: 'none',
        });
        return;
      }
  
      // 模拟保存数据（实际可调用后端接口）
      console.log('采购信息提交成功:', this.data.purchase);
      wx.showToast({
        title: '提交成功',
        icon: 'success',
      });
  
      // 清空表单数据
      this.setData({
        purchase: {
          name: '',
          price: '',
          quantity: '',
          purchaseDate: '',
          person: '',
        },
      });
    },
  });
  