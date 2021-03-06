// pages/mine/mine.js
const store = require('../../redux/index.js')


Page({

    /**
     * 页面的初始数据
     */
    data: {
        avatarUrl: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({avatarUrl: store.getState().userInfo.avatarUrl});
    },
    
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },
    toQrcode: function () {
        wx.navigateTo({
          url: './qrcode/qrcode',
        })
    },
    toDevice: function () {
        wx.showToast({
          title: '功能正在开发中...',
          icon: "none"
        })
    },
    toSetting: function () {
        wx.showToast({
            title: '功能正在开发中...',
            icon: "none"
        })
    },
    toHelp: function () {
        wx.navigateTo({
          url: './help/help',
        })
    },
    toAbout: function () {
        wx.navigateTo({
          url: './about/about',
        })
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})