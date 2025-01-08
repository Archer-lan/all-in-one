Page({
    data: {
      licensePlate: '',
      mileageData: null,
    },
  
    onInputChange(e) {
      this.setData({
        licensePlate: e.detail.value,
      });
    },
  
    searchMileageAndFuel() {
      const { licensePlate } = this.data;
  
      if (!licensePlate) {
        wx.showToast({
          title: '请输入车牌号',
          icon: 'none',
        });
        return;
      }
  
      // 模拟数据查询
      const mileageData = {
        totalMileage: 12000,
        totalFuel: 1200,
        avgFuelConsumption: (1200 / 12000 * 100).toFixed(2),
      };
  
      this.setData({ mileageData });
    },
  });
  