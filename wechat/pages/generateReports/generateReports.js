Page({
    data: {
      startDate: '2024-12-01',
      endDate: '2024-12-31',
    },
  
    onStartDateChange(e) {
      this.setData({
        startDate: e.detail.value,
      });
    },
  
    onEndDateChange(e) {
      this.setData({
        endDate: e.detail.value,
      });
    },
  
    generateReport() {
      wx.showToast({
        title: `生成报表: ${this.data.startDate} 至 ${this.data.endDate}`,
        icon: 'success',
      });
    },
  });
  