import {render} from '@testing-library/react'
import '@testing-library/jest-dom'
import * as config from '../src/config'
import * as websocketAdapter from '../src/websockets/websocketAdapter'
import sinon from 'sinon';
import {Root} from '../src/app/Root';
import {onMessage} from '../src/websockets/websocketEventsHandler';
import message1 from './data/message1.json';
import * as message2 from './data/message2.json';
import * as message3 from './data/message3.json';
import {createTestEventMessage, getTestIdValue, patchWindowWithMatchMedia} from './testUtils';
import {screen} from '@testing-library/dom';
import * as orderBook from '../src/components/orderbook/orderbook';


describe('root', () => {
  it('when snapshot and deltas received it renders orders correctly', async () => {
    // arrange

    // mock window
    patchWindowWithMatchMedia();
    sinon.stub(orderBook, 'isWindowSmall').resolves(false);
    // mock config
    sinon.stub(config, 'websocketSpecs')
         .resolves({
           feedUrl: 'not_provided',
           reconnectInterval: 5000,
           uiUpdateInterval: 0, // faster tests
           feedSpecs: {
             PI_XBTUSD: {product_id: 'PI_XBTUSD', groups: [0.5, 1, 2.5]},
             PI_ETHUSD: {product_id: 'PI_ETHUSD', groups: [0.05, 0.1, 0.25]},
           },
         })
    // mock connect
    sinon.stub(websocketAdapter, 'connect').resolves();
    // mock disconnect
    sinon.stub(websocketAdapter, 'disconnect').resolves();
    // mock web socket
    sinon.stub(websocketAdapter, 'isConnected').resolves(true);


    // act
    
    // render app
    render(<Root/>)
    // provide test data
    onMessage(createTestEventMessage(message1));
    onMessage(createTestEventMessage(message2));
    onMessage(createTestEventMessage(message3));


    // assert 
    
    // order book contains expected order data
    await new Promise((r) => setTimeout(r, 1500));
    screen.debug()
    expect(await getTestIdValue("b_0_t")).toBe('113,521');
    expect(await getTestIdValue("b_0_s")).toBe('113,521');
    expect(await getTestIdValue("b_0_p")).toBe('43,681.00');

    expect(await getTestIdValue("s_0_t")).toBe('2,250');
    expect(await getTestIdValue("s_0_s")).toBe('2,250');
    expect(await getTestIdValue("s_0_p")).toBe('43,889.50');

    // test other orders ...
  })
});



