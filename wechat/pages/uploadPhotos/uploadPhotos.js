Page({
    data: {
      photos: [], // 照片列表
    },
  
    // 选择照片
    chooseImage() {
      wx.chooseImage({
        count: 1, // 每次只允许上传一张照片
        sizeType: ['original', 'compressed'], // 支持原图和压缩图
        sourceType: ['album', 'camera'], // 支持从相册或拍照选择
        success: (res) => {
          const tempFilePaths = res.tempFilePaths;
  
          // 模拟生成照片数据，实际需要将图片上传到服务器并获取 URL
          const newPhoto = {
            id: new Date().getTime(), // 用时间戳模拟唯一 ID
            url: tempFilePaths[0], // 图片临时路径
          };
  
          this.setData({
            photos: [...this.data.photos, newPhoto],
          });
  
          wx.showToast({
            title: '上传成功',
            icon: 'success',
          });
        },
        fail: () => {
          wx.showToast({
            title: '上传失败，请重试',
            icon: 'none',
          });
        },
      });
    },
  
    // 删除照片
    deletePhoto(e) {
      const id = e.currentTarget.dataset.id;
  
      wx.showModal({
        title: '确认删除',
        content: '确定删除这张照片吗？',
        success: (res) => {
          if (res.confirm) {
            this.setData({
              photos: this.data.photos.filter((photo) => photo.id !== id),
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
  