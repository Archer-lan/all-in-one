Page({
    data: {
      refuelRecords: [
        { id: 1, licensePlate: '浙A12345', mileage: 1200, refuelPerson: '张三' },
        { id: 2, licensePlate: '浙A67890', mileage: 1500, refuelPerson: '李四' },
      ], // 模拟加油记录数据
    },
  
    // 生成报销单
    generateReimbursement() {
      wx.showLoading({
        title: '生成中...',
      });
  
      // 模拟接口请求生成报销单
      setTimeout(() => {
        wx.hideLoading();
  
        // 模拟生成的报销单 PDF 文件链接
        const pdfUrl = 'https://example.com/reimbursement.pdf';
  
        wx.showModal({
          title: '报销单生成成功',
          content: '点击确认下载报销单',
          success: (res) => {
            if (res.confirm) {
              wx.downloadFile({
                url: pdfUrl,
                success: (res) => {
                  const filePath = res.tempFilePath;
                  wx.openDocument({
                    filePath,
                    fileType: 'pdf',
                    success: () => {
                      wx.showToast({
                        title: '打开成功',
                        icon: 'success',
                      });
                    },
                    fail: () => {
                      wx.showToast({
                        title: '打开失败',
                        icon: 'none',
                      });
                    },
                  });
                },
                fail: () => {
                  wx.showToast({
                    title: '下载失败',
                    icon: 'none',
                  });
                },
              });
            }
          },
        });
      }, 2000); // 模拟生成时间
    },
  });
  