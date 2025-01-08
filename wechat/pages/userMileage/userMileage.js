Page({
    data: {
      user: '',
      usageData: null,
    },
  
    onInputChange(e) {
      this.setData({
        user: e.detail.value,
      });
    },
  
    searchUsageStats() {
      const { user } = this.data;
  
      if (!user) {
        wx.showToast({
          title: '请输入使用人姓名',
          icon: 'none',
        });
        return;
      }
  
      // 模拟数据查询
      const usageData = {
        times: 10,
        totalMileage: 2500,
        records: [
          { id: 1, date: '2024-12-01', mileage: 120, reason: '商务用车' },
          { id: 2, date: '2024-12-03', mileage: 200, reason: '外出调研' },
        ],
      };
  
      this.setData({ usageData });
    },
  
    generateUsageReport() {
      wx.showToast({
        title: '报表生成成功',
        icon: 'success',
      });
  
      console.log('生成用车统计报表');
    },
  });
  