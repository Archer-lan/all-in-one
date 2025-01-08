Page({
    data: {},
  
    // 人员管理功能
    handleStaffManagement() {
      wx.navigateTo({ url: '/pages/personneInfoManagement/personneInfoManagement' });
    },
  
    // 采购管理功能
    handlePurchaseEntry() {
      wx.navigateTo({ url: '/pages/enteringPurchaseInformation/enteringPurchaseInformation' });
    },
  
    handlePurchaseReport() {
      wx.navigateTo({ url: '/pages/generateProcurementReports/generateProcurementReports' });
    },
  
    // 菜单管理功能
    handleTodayMenu() {
      wx.navigateTo({ url: '/pages/menuOfTheDay/menuOfTheDay' });
    },
  
    handleWeeklyMenu() {
      wx.navigateTo({ url: '/pages/weeklyMenu/weeklyMenu' });
    },
  
    // 餐费管理功能
    handleConsumptionRecord() {
      wx.navigateTo({ url: '/pages/consumptionRecordInquiry/consumptionRecordInquiry' });
    },
  
    // 资产管理功能
    handleAssetCheck() {
      wx.navigateTo({ url: '/pages/assetCheck/assetCheck' });
    },
  
    handleAssetReport() {
      wx.navigateTo({ url: '/pages/assetReport/assetReport' });
    },
  
    // 卫生管理功能
    handleUploadPhotos() {
      wx.navigateTo({ url: '/pages/uploadPhotos/uploadPhotos' });
    },
  });
  