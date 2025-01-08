Page({
    data: {
      records: [
        { id: 1, name: '空调维修', description: '不制冷', date: '2024-12-05', cost: 300 },
        { id: 2, name: '电梯维修', description: '无法运行', date: '2024-12-12', cost: 1500 },
      ],
    },
  
    addRecord() {
        wx.navigateTo({ url: '/pages/addMaintenanceRecords/addMaintenanceRecords' });
    },
  });
  