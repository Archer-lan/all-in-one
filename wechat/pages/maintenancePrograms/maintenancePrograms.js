Page({
    data: {
      plans: [
        { id: 1, name: '空调维护', date: '2024-12-01' },
        { id: 2, name: '电梯检查', date: '2024-12-10' },
      ],
    },
  
    addPlan() {
        wx.navigateTo({ url: '/pages/addMaintenancePlan/addMaintenancePlan' });
    },
  
    editPlan(e) {
      const id = e.currentTarget.dataset.id;
      wx.showToast({
        title: `编辑计划 ${id}`,
        icon: 'none',
      });
    },
  
    deletePlan(e) {
      const id = e.currentTarget.dataset.id;
      wx.showModal({
        title: '确认删除',
        content: '确定删除该维护计划？',
        success: (res) => {
          if (res.confirm) {
            this.setData({
              plans: this.data.plans.filter((plan) => plan.id !== id),
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
  