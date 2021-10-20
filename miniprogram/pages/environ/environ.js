// pages/env.js
const store = require('../../redux/index.js')
const { subscribeStore } = require('../../libs/store-subscribe');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        environmentList: [
        {
            name: '室温',
            key: 'tempreture',
            value: 60,
            iconUrl: './asset/temperature.png'
        },
        {
            name: '光照',
            key: 'light',
            value: 60,
            iconUrl: './asset/light.png'
        },
        {
            name: '土壤湿度',
            key: 'turang',
            value: 60,
            iconUrl: './asset/humidity.png'
        }
     ],
        deviceDataMap: {},
        dataTemplateProperties: [],
        shareDeviceList: [],
        deviceStatusMap: {},
        inited: false,
        userId: '',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.unsubscribeAll = subscribeStore([
            'deviceDataMap',
          ].map(key => ({
            selector: state => state[key],
            onChange: value => this.setData({ [key]: value }),
          })));
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        setTimeout(() => {
            console.log("deviceDataMap:",this.data.deviceDataMap['CZRJVSUX4E/t1']);
        }, 3000);
    },
    
    onLoginReady: function () {

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

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})