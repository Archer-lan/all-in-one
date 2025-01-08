Page({
    data: {
      searchQuery: '',
      items: [], // 列表数据
      totalStock: 0,
      totalAmount: 0,
    },
    onFilter() {
        wx.navigateTo({ url: '/pages/selectWarehouse/selectWarehouse' });
    },
    onLoad() {
      // 模拟数据
      const items = [
        {
          id: 1,
          name: '全向麦克风',
          spec: '华为VPM220',
          brand: '华为',
          unit: '台',
          location: '七楼',
          stock: 10,
          costPrice: 1500,
          wholesalePrice: 0,
          retailPrice: 0,
        },
        {
          id: 2,
          name: '一平方电线',
          spec: '插',
          brand: '',
          unit: '卷',
          location: '货架6-11',
          stock: 2,
          costPrice: 0,
          wholesalePrice: 0,
          retailPrice: 0,
        },
        {
          id: 3,
          name: '蔚豹四口USB 2.0',
          spec: '',
          brand: '',
          unit: '件',
          location: '货架5-5',
          stock: 10,
          costPrice: 0,
          wholesalePrice: 0,
          retailPrice: 0,
        },
        {
            id: 4,
            name: '蔚豹四口USB 2.0',
            spec: '',
            brand: '',
            unit: '件',
            location: '货架5-5',
            stock: 10,
            costPrice: 0,
            wholesalePrice: 0,
            retailPrice: 0,
          },
          {
            id: 5,
            name: '蔚豹四口USB 2.0',
            spec: '',
            brand: '',
            unit: '件',
            location: '货架5-5',
            stock: 10,
            costPrice: 0,
            wholesalePrice: 0,
            retailPrice: 0,
          },
          {
            id: 6,
            name: '蔚豹四口USB 2.0',
            spec: '',
            brand: '',
            unit: '件',
            location: '货架5-5',
            stock: 10,
            costPrice: 0,
            wholesalePrice: 0,
            retailPrice: 0,
          },
          {
            id: 7,
            name: '蔚豹四口USB 2.0',
            spec: '',
            brand: '',
            unit: '件',
            location: '货架5-5',
            stock: 10,
            costPrice: 0,
            wholesalePrice: 0,
            retailPrice: 0,
          },
      ];
  
      this.setData({ items }, this.calculateTotals);
    },
  
    onSearchInput(e) {
      this.setData({ searchQuery: e.detail.value });
    },
  
    onSearch() {
      const query = this.data.searchQuery.toLowerCase();
      const filteredItems = this.data.items.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.spec.toLowerCase().includes(query)
      );
  
      this.setData({ items: filteredItems }, this.calculateTotals);
    },
  
    calculateTotals() {
      const { items } = this.data;
      let totalStock = 0;
      let totalAmount = 0;
  
      items.forEach((item) => {
        totalStock += item.stock;
        totalAmount += item.stock * item.costPrice;
      });
  
      this.setData({ totalStock, totalAmount });
    },
  });
  