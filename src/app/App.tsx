import { useAppDispatch } from 'src/state/hooks';
import { Header } from 'src/components/header/header';
import { Orderbook } from 'src/components/orderbook/orderbook';
import { Footer } from 'src/components/footer/footer';
import 'src/app/App.css';
import {useEffect} from 'react';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({type: 'CONNECT_TO_WEBSOCKET'});
  }, []);

  return (
    <div className='App'>
      <Header />
      <Orderbook />
      <Footer />
    </div>
  );
}

export default App;
