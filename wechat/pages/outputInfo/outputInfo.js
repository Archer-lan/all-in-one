Page({
    data: {
      startDate: '2024-11-23', // 默认开始日期
      endDate: '2024-12-23',   // 默认结束日期
      searchQuery: '',         // 搜索关键字
      sales: [                 // 示例销售数据
        {
          customerName: '墨竹工卡县政府',
          orderDate: '2024-12-16',
          orderId: 'XSD202412163025',
          products: '电源时序器(1: 550)',
          status: '已付款',
          amount: 550.00
        },
        {
          customerName: '陈欢',
          orderDate: '2024-12-15',
          orderId: 'XSD202412159024',
          products: '电源线(双绞线)(1: 0), HDMI线-5米(1: 0)',
          status: '已付款',
          amount: 0.00
        },
        {
          customerName: '网络销售',
          orderDate: '2024-12-11',
          orderId: 'XSD202412116023',
          products: '红黑电源插座(1: 150)',
          status: '已付款',
          amount: 150.00
        },
        {
          customerName: '网络销售',
          orderDate: '2024-12-08',
          orderId: 'XSD202412083022',
          products: '会议摄像头支架(1: 70)',
          status: '已付款',
          amount: 70.00
        }
      ]
    },
  
    // 返回上一页
    goBack() {
      wx.navigateBack();
    },
    
    onAdd() {
        wx.navigateTo({ url: '/pages/deviceReceipt/deviceReceipt' });
    },

    // 搜索输入框内容变化
    onSearchInput(e) {
      this.setData({ searchQuery: e.detail.value });
    },
  
    // 搜索按钮点击
    onSearch() {
      wx.showToast({
        title: '搜索功能未实现',
        icon: 'none'
      });
    },
  
    // 修改开始日期
    onStartDateChange(e) {
      this.setData({ startDate: e.detail.value });
    },
  
    // 修改结束日期
    onEndDateChange(e) {
      this.setData({ endDate: e.detail.value });
    },
  
    // 筛选按钮点击
    onFilter() {
      wx.showToast({
        title: '筛选功能未实现',
        icon: 'none'
      });
    }
  });
  