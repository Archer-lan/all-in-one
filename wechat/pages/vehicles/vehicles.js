Page({
    data: {},
  
    // 车辆使用与归还
    handleVehicleUse() {
      wx.navigateTo({ url: '/pages/vehicleUse/vehicleUse' });
    },
    handleVehicleReturn() {
      wx.navigateTo({ url: '/pages/vehicleReturn/vehicleReturn' });
    },
  
    // 车辆加油
    handleRefuel() {
      wx.navigateTo({ url: '/pages/refuel/refuel' });
    },
    handleReimbursement() {
      wx.navigateTo({ url: '/pages/reimbursement/reimbursement' });
    },
  
    // 维修管理
    handleRepairLog() {
      wx.navigateTo({ url: '/pages/repairLog/repairLog' });
    },
    handleRepairReport() {
      wx.navigateTo({ url: '/pages/repairReport/repairReport' });
    },
  
    // 违章管理
    handleViolationQuery() {
      wx.navigateTo({ url: '/pages/violationQuery/violationQuery' });
    },
  
    // 车辆查询
    handleMileageFuel() {
      wx.navigateTo({ url: '/pages/mileageFuel/mileageFuel' });
    },
    handleUserMileage() {
      wx.navigateTo({ url: '/pages/userMileage/userMileage' });
    },
    handleRepairFeeQuery() {
      wx.navigateTo({ url: '/pages/repairFeeQuery/repairFeeQuery' });
    },
  
    // 系统设置
    handleSystemSettings() {
      wx.navigateTo({ url: '/pages/systemSettings/systemSettings' });
    },
  });
  