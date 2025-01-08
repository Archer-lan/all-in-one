Page({
    data: {},
  
    // 库存管理功能
    handleStockEntry() {
      wx.navigateTo({ url: '/pages/entryInfo/entryInfo' });
    },
  
    handleStockUsage() {
      wx.navigateTo({ url: '/pages/outputInfo/outputInfo' });
    },
  
    handleStockCheck() {
      wx.navigateTo({ url: '/pages/stockTaking/stockTaking' });
    },
  
    // 维护与维修管理功能
    handleMaintenancePlan() {
      wx.navigateTo({ url: '/pages/maintenancePrograms/maintenancePrograms' });
    },
  
    handleRepairRecord() {
      wx.navigateTo({ url: '/pages/maintenanceRecords/maintenanceRecords' });
    },
  
    handleReport() {
      wx.navigateTo({ url: '/pages/generateReports/generateReports' });
    },
  });
  