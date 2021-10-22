const actions = require('../../redux/actions');
const { subscribeStore } = require('../../libs/store-subscribe');
const showWifiConfTypeMenu = require('../add-device/wifiConfTypeMenu');
const models = require('../../models');
const app = getApp();
const { controlDeviceData, getDevicesData } = require('../../redux/actions');


Page({
  data: {
    deviceList: [],
    shareDeviceList: [],
    deviceStatusMap: {},
    deviceDataMap: {},
    inited: false,
    userId: '',
    userInfo: {},
    weatherIconSrc: './asset/sun.png',
    weather: '-',
    temperature: '-',
  },

  onLoad() {
    // 请求天气数据
    this.requestWeather();
    // 订阅store数据变化
    this.unsubscribeAll = subscribeStore([
      'deviceList',
      'shareDeviceList',
      'deviceStatusMap',
      'deviceDataMap',
      'userInfo'
    ].map(key => ({
      selector: state => state[key],
      onChange: value => this.setData({ [key]: value }),
    })));
  },

  onUnload() {
    this.unsubscribeAll && this.unsubscribeAll();
  },
  // 点击设备开关
  clickSwitch(event){
    console.log("item:",event);
    let deviceInfo = event.target.dataset.item;
    this.controlDeviceData(deviceInfo,'switch',!this.data.deviceDataMap[deviceInfo.DeviceId].switch.Value);
  },
  // 控制设备属性
  controlDeviceData(deviceInfo, id, value) {
    clearTimeout(this.debounceTimer);

    this.debounceTimer = setTimeout(async () => {
      try {
        await controlDeviceData(deviceInfo, { id, value });
      } catch (err) {
        console.error('controlDeviceData fail', err);
        wx.showModal({
          title: '控制设备属性失败',
          content: getErrorMsg(err),
          confirmText: '我知道了',
          showCancel: false,
        });
      }
    }, 250);
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
      url: 'http://wthrcdn.etouch.cn/weather_mini?city=上海市',
      success: (res) => {
        console.log("请求成功：",res);
        let todayWeather = res.data.data.forecast[0];
        let url = './asset/';
        switch (todayWeather.type) {
          case "晴": 
          url += 'sun.png';
            break;
          case "多云": 
          url += 'cloud.png';
            break;
          case "雨": 
          url += 'rain.png';
            break;
          default: 
          url += 'dark.png';
            break;
        }
        this.setData({
          weatherIconSrc: url,
          weather: todayWeather.type,
          temperature: res.data.data.wendu
        });
      },
      fail: (e) => {
        console.log("请求失败");
      }
    })
  },
  getDeviceData(){
    models.getDeviceData({DeviceId: ''})
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
