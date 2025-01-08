Page({
    data: {
      startDate: '',
      endDate: '',
      licensePlate: '',
      repairRecords: [],
      loading: false,
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
  
    onInputChange(e) {
      const field = e.currentTarget.dataset.field;
      this.setData({
        [field]: e.detail.value,
      });
    },
  
    searchRepairCosts() {
      const { startDate, endDate, licensePlate } = this.data;
  
      if (!startDate || !endDate || !licensePlate) {
        wx.showToast({
          title: '请完整填写查询条件',
          icon: 'none',
        });
        return;
      }
  
      this.setData({ loading: true });
  
      // 模拟数据查询
      setTimeout(() => {
        const repairRecords = [
          { id: 1, date: '2024-12-01', cost: 500, content: '更换刹车片' },
          { id: 2, date: '2024-12-05', cost: 800, content: '发动机保养' },
        ];
  
        this.setData({ repairRecords, loading: false });
      }, 1000);
    },
  });
  