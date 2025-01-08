Page({
    data: {
      driverVehicleList: [
        { id: 1, driver: '张三', vehicleModel: '宝马 X5', licensePlate: '浙A12345', mileage: 12000 },
        { id: 2, driver: '李四', vehicleModel: '奥迪 Q7', licensePlate: '浙A67890', mileage: 15000 },
      ],
    },
  
    // 添加司机与车辆
    addDriverVehicle() {
      wx.navigateTo({
        url: '/pages/addDriverVehicle/addDriverVehicle',
      });
    },
  
    // 编辑司机与车辆
    editDriverVehicle(e) {
      const id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: `/pages/editDriverVehicle/editDriverVehicle?id=${id}`,
      });
    },
  
    // 删除司机与车辆
    deleteDriverVehicle(e) {
      const id = e.currentTarget.dataset.id;
  
      wx.showModal({
        title: '确认删除',
        content: '确定删除该司机与车辆信息？',
        success: (res) => {
          if (res.confirm) {
            this.setData({
              driverVehicleList: this.data.driverVehicleList.filter((item) => item.id !== id),
            });
            wx.showToast({
              title: '删除成功',
              icon: 'success',
            });
          }
        },
      });
    },
  });
  