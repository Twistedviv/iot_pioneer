const addDeviceByQrCode = require('./qrCode');

module.exports = (redirect = false) => {
  wx.showActionSheet({
    itemList: ['扫码绑定设备'],
    success: ({ tapIndex }) => {
      addDeviceByQrCode();
    },
  });
};
