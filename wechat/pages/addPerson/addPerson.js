Page({
    data: {
      name: '', // 人员姓名
      position: '', // 岗位
      healthCertificateUrl: '', // 健康证图片 URL
    },
  
    // 输入框事件处理
    onInputChange(e) {
      const field = e.currentTarget.dataset.field;
      this.setData({
        [field]: e.detail.value,
      });
    },
  
    // 上传健康证
    uploadHealthCertificate() {
      wx.chooseImage({
        count: 1, // 每次只允许上传一张图片
        sizeType: ['original', 'compressed'], // 支持原图和压缩图
        sourceType: ['album', 'camera'], // 支持从相册或拍照选择
        success: (res) => {
          const tempFilePath = res.tempFilePaths[0];
          // 模拟上传图片到服务器，实际可用 wx.uploadFile 接口
          this.setData({
            healthCertificateUrl: tempFilePath,
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
  
    // 提交人员信息
    submitPersonnelInfo() {
      const { name, position, healthCertificateUrl } = this.data;
  
      // 数据校验
      if (!name || !position || !healthCertificateUrl) {
        wx.showToast({
          title: '请完整填写人员信息',
          icon: 'none',
        });
        return;
      }
  
      // 模拟提交数据到服务器
      console.log('人员信息提交成功：', {
        name,
        position,
        healthCertificateUrl,
      });
  
      wx.showToast({
        title: '提交成功',
        icon: 'success',
      });
  
      // 清空表单
      this.setData({
        name: '',
        position: '',
        healthCertificateUrl: '',
      });
  
      // 返回上一个页面
      wx.navigateBack();
    },
  });
  