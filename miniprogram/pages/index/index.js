const actions = require('../../redux/actions');
const { subscribeStore } = require('../../libs/store-subscribe');
const showWifiConfTypeMenu = require('../add-device/wifiConfTypeMenu');
const app = getApp();

Page({
  data: {
    deviceList: [],
    shareDeviceList: [],
    deviceStatusMap: {},
    inited: false,
    userId: '',
    userName: 'XXX',
  },

  onLoad() {
    this.setData({userName: app.globalData.userInfo.nickName})
    this.requestWeather();
    this.unsubscribeAll = subscribeStore([
      'deviceList',
      'shareDeviceList',
      'deviceStatusMap',
    ].map(key => ({
      selector: state => state[key],
      onChange: value => this.setData({ [key]: value }),
    })));
  },

  onUnload() {
    this.unsubscribeAll && this.unsubscribeAll();
  },

  onLoginReady() {
    this.setData({
      userId: app.sdk.uin,
    });
    this.fetchData();
  },

  onTapItem({ currentTarget: { dataset: { item } } }) {
    if (item.isShareDevice) {
      wx.navigateTo({
        url: `/pages/panel/panel?deviceId=${item.DeviceId}&isShareDevice=1`,
      });
    } else {
      wx.navigateTo({
        url: `/pages/panel/panel?deviceId=${item.DeviceId}`,
      });
    }
  },

  onPullDownRefresh() {
    this.fetchData();
  },
  requestWeather(){
    wx.request({
      url: 'https://wthrcdn.etouch.cn/weather_mini?city=上海市',
      success: (res) => {
        console.log("请求成功：",res);
      },
      fail: (e) => {
        console.log("请求失败");
      }
    })
  },
  fetchData() {
    actions.getDevicesData()
      .then(() => {
        if (!this.data.inited) {
          this.setData({ inited: true });
        }
        wx.stopPullDownRefresh();
      })
      .catch((err) => {
        if (!this.data.inited) {
          this.setData({ inited: true });
        }
        console.error('getDevicesData fail', err);
        wx.stopPullDownRefresh();
      });
  },

  showAddDeviceMenu() {
    showWifiConfTypeMenu();
  },
});
