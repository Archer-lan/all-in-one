Page({
    data: {
      records: [], // 消费记录
      searchQuery: '', // 搜索内容
      page: 1, // 当前页码
      pageSize: 10, // 每页加载数量
      loading: false, // 是否加载中
      noMoreData: false, // 是否没有更多数据
    },
  
    onLoad() {
      // 初始化加载消费记录
      this.loadRecords();
    },
  
    // 输入搜索内容
    onSearchInput(e) {
      this.setData({
        searchQuery: e.detail.value,
      });
    },
  
    // 搜索消费记录
    searchRecords() {
      this.setData(
        {
          records: [],
          page: 1,
          noMoreData: false,
        },
        () => {
          this.loadRecords();
        }
      );
    },
  
    // 加载消费记录
    loadRecords() {
      if (this.data.loading || this.data.noMoreData) {
        return;
      }
  
      this.setData({ loading: true });
  
      // 模拟请求接口
      setTimeout(() => {
        // 模拟接口返回数据
        const { page, pageSize, searchQuery } = this.data;
        const allRecords = [
          { id: 1, name: '张三', date: '2024-12-01', amount: 20, detail: '早餐' },
          { id: 2, name: '李四', date: '2024-12-01', amount: 30, detail: '午餐' },
          { id: 3, name: '张三', date: '2024-12-02', amount: 25, detail: '晚餐' },
          { id: 4, name: '王五', date: '2024-12-02', amount: 40, detail: '午餐' },
          { id: 5, name: '赵六', date: '2024-12-03', amount: 15, detail: '早餐' },
        ];
  
        // 模拟筛选
        const filteredRecords = allRecords.filter(
          (item) =>
            item.name.includes(searchQuery) || item.date.includes(searchQuery)
        );
  
        // 分页数据
        const records = filteredRecords.slice(
          (page - 1) * pageSize,
          page * pageSize
        );
  
        // 判断是否还有更多数据
        const noMoreData = records.length < pageSize;
  
        this.setData({
          records: [...this.data.records, ...records],
          page: this.data.page + 1,
          loading: false,
          noMoreData,
        });
      }, 1000);
    },
  
    // 滚动到底部加载更多
    loadMoreRecords() {
      this.loadRecords();
    },
  });
  