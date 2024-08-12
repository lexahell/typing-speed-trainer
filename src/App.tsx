import RestartButton from './components/RestartButton';
import Header from './components/Header';
import Words from './components/Words';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import Countdown from './components/Countdown';
import Results from './components/Results';
function App() {
  const { status } = useSelector((state: RootState) => state.app);
  return (
    <div className='min-h-screen grid grid-rows-[80px_auto]'>
      <Header />
      <div className='min-h-full grid place-items-center px-4 pb-20 '>
        <div className='text-slate-500 max-w-5xl'>
          {status !== 'end' && (
            <>
              <Countdown seconds={3} />
              <Words />
            </>
          )}
          {status === 'end' && <Results seconds={30} />}
          <RestartButton className='mx-auto mt-10 text-slate-500' />
        </div>
      </div>
    </div>
  );
}

export default App;
