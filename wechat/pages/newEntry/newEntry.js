Page({
    data: {
      currentDate: '',
      supplier: '',
      deviceName: '',
      quantity: '',
      price: '',
    },
  
    onLoad() {
      const currentDate = new Date().toISOString().split('T')[0];
      this.setData({ currentDate });
    },
  
    // 选择供应商
    chooseSupplier() {
      // 示例：模拟选择供应商
      wx.showActionSheet({
        itemList: ['供应商A', '供应商B', '供应商C'],
        success: (res) => {
          const supplierList = ['供应商A', '供应商B', '供应商C'];
          this.setData({ supplier: supplierList[res.tapIndex] });
        },
        fail: () => {
          wx.showToast({
            title: '未选择供应商',
            icon: 'none',
          });
        },
      });
    },
  
    // 处理输入
    onInput(e) {
      const { field } = e.currentTarget.dataset;
      this.setData({
        [field]: e.detail.value,
      });
    },
  
    // 提交入库信息
    submitForm() {
      const { supplier, deviceName, quantity, price, currentDate } = this.data;
  
      if (!supplier || !deviceName || !quantity || !price) {
        wx.showToast({
          title: '请完整填写信息',
          icon: 'none',
        });
        return;
      }
  
      // 模拟保存数据
      const data = {
        supplier,
        deviceName,
        quantity,
        price,
        date: currentDate,
      };
  
      console.log('提交入库信息:', data);
  
      wx.showToast({
        title: '入库成功',
        icon: 'success',
      });
  
      // 清空表单数据
      this.setData({
        supplier: '',
        deviceName: '',
        quantity: '',
        price: '',
      });
    },
  });
  