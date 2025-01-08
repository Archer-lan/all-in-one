Page({
    data: {
      personnel: [
        { id: 1, name: '张三', job: '厨师', healthCert: true },
        { id: 2, name: '李四', job: '管理员', healthCert: false },
      ],
    },
  
    addPerson() {
        wx.navigateTo({ url: '/pages/addPerson/addPerson' });
    },
  
    editPerson(e) {
      const id = e.currentTarget.dataset.id;
      wx.showToast({
        title: `编辑人员 ${id}`,
        icon: 'none',
      });
    },
  
    deletePerson(e) {
      const id = e.currentTarget.dataset.id;
      wx.showModal({
        title: '确认删除',
        content: '确定删除该人员信息？',
        success: (res) => {
          if (res.confirm) {
            this.setData({
              personnel: this.data.personnel.filter((person) => person.id !== id),
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
  