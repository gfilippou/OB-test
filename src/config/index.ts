export const websocketSpecs = {
  feedUrl: 'wss://www.cryptofacilities.com/ws/v1',
  reconnectInterval: 5000,
  uiUpdateInterval: 1000,
  feedSpecs: {
    PI_XBTUSD: { product_id: 'PI_XBTUSD', groups: [0.5, 1, 2.5] },
    PI_ETHUSD: { product_id: 'PI_ETHUSD', groups: [0.05, 0.1, 0.25] },
  },
};
