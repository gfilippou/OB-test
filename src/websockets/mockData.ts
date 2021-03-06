export const connectResponse = { event: 'info', version: 1 };

export const subscribeResponse = {
  event: 'subscribed',
  feed: 'book_ui_1',
  product_ids: ['PI_XBTUSD'],
};

export const initialStateResponse = {
  numLevels: 25,
  feed: 'book_ui_1_snapshot',
  bids: [
    [41817.5, 11416.0],
    [41815.0, 10.0],
    [41814.5, 4000.0],
    [41812.5, 4400.0],
    [41812.0, 6353.0],
    [41810.0, 9796.0],
    [41809.5, 4708.0],
    [41804.5, 35927.0],
    [41804.0, 15000.0],
    [41803.0, 12500.0],
    [41799.5, 10610.0],
    [41799.0, 4641.0],
    [41798.5, 55000.0],
    [41794.5, 15000.0],
    [41794.0, 4000.0],
    [41791.0, 8357.0],
    [41789.5, 20000.0],
    [41783.5, 4000.0],
    [41782.5, 3.0],
    [41782.0, 250000.0],
    [41779.5, 500.0],
    [41776.0, 14406.0],
    [41775.0, 3284.0],
    [41773.0, 4000.0],
    [41772.5, 150000.0],
  ],
  asks: [
    [41827.5, 167.0],
    [41832.5, 4000.0],
    [41837.0, 16568.0],
    [41839.5, 15000.0],
    [41842.5, 4671.0],
    [41843.0, 8638.0],
    [41843.5, 10535.0],
    [41844.5, 55000.0],
    [41846.5, 29659.0],
    [41847.0, 12245.0],
    [41849.0, 14406.0],
    [41853.0, 5000.0],
    [41853.5, 4000.0],
    [41854.0, 15000.0],
    [41855.5, 8953.0],
    [41856.5, 3140.0],
    [41859.0, 8372.0],
    [41859.5, 98522.0],
    [41864.0, 4000.0],
    [41868.0, 32.0],
    [41871.0, 23999.0],
    [41871.5, 3410.0],
    [41873.0, 20000.0],
    [41874.5, 32371.0],
    [41876.0, 83961.0],
  ],
  product_id: 'PI_XBTUSD',
};

export const updateResponse = {
  feed: 'book_ui_1',
  product_id: 'PI_XBTUSD',
  bids: [
    [41753.0, 2884.0],
    [41762.5, 37589.0],
    [41766.0, 199.0],
    [41768.5, 400198.0],
    [41771.5, 0.0],
    [41773.0, 4000.0],
    [41781.5, 0.0],
    [41782.0, 250000.0],
    [41783.5, 4000.0],
    [41788.5, 0.0],
    [41789.5, 20000.0],
    [41790.0, 0.0],
    [41792.0, 0.0],
    [41794.0, 4000.0],
    [41802.5, 0.0],
    [41804.5, 35927.0],
    [41813.0, 0.0],
    [41814.5, 4000.0],
    [41815.0, 10.0],
  ],
  asks: [
    [41830.0, 0.0],
    [41830.5, 0.0],
    [41831.5, 0.0],
    [41832.5, 4000.0],
    [41834.5, 0.0],
    [41840.5, 0.0],
    [41842.0, 0.0],
    [41843.0, 8638.0],
    [41844.5, 55000.0],
    [41845.0, 0.0],
    [41848.5, 0.0],
    [41851.0, 5000.0],
    [41852.5, 0.0],
    [41853.0, 0.0],
    [41853.5, 4000.0],
    [41855.5, 8953.0],
    [41863.0, 0.0],
    [41864.0, 4000.0],
    [41866.0, 0.0],
    [41871.5, 3410.0],
    [41873.5, 0.0],
    [41874.5, 32371.0],
    [41876.5, 0.0],
  ],
};

export const updateResponse2 = {
  feed: 'book_ui_1',
  product_id: 'PI_XBTUSD',
  bids: [[41762.5, 0.0]],
  asks: [
    [41855.5, 0.0],
    [41856.5, 69.0],
    [41859.0, 420.0],
    [41859.5, 1337.0],
  ],
};

export const updateResponse3 = {
  feed: 'book_ui_1',
  product_id: 'PI_XBTUSD',
  bids: [
    [41817.5, 69420.0],
    [41815.0, 0.0],
    [41812.5, 0.0],
  ],
  asks: [
    [41856.5, 0.0],
    [41859.0, 0.0],
    [41859.5, 0.0],
  ],
};

export const unsubscribeResponse = {
  event: 'unsubscribed',
  feed: 'book_ui_1',
  product_ids: ['PI_XBTUSD'],
};

export const websocketAlertResponse = {
  event: 'alert',
  message: 'Bad request',
};
