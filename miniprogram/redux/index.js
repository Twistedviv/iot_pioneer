const { createStore } = require('../libs/redux');
const reducer = require('./reducer');

const initState = {
  productInfoMap: {},
  deviceDataMap: {},
  deviceStatusMap: {},
  deviceList: [],
  shareDeviceList: [],
  wifiList: [],
  deviceId: 'CZRJVSUX4E/t1'
};

const store = createStore(reducer, initState);

module.exports = store;
