const { createStore } = require('../libs/redux');
const reducer = require('./reducer');

const initState = {
  productInfoMap: {},
  deviceDataMap: {},
  deviceStatusMap: {},
  deviceList: [],
  shareDeviceList: [],
  wifiList: [],
  deviceId: 'ZN8AW4VCWE/pioneer_light'
};

const store = createStore(reducer, initState);

module.exports = store;
