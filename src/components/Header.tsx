import { GrKeyboard } from 'react-icons/gr';

const Header = () => {
  return (
    <header className='min-w-full min-h-20 pl-3 sm:pl-10'>
      <div className=' flex items-center pt-4'>
        <div className='w-10 h-10 flex items-center justify-center'>
          <GrKeyboard className='w-8 h-8 text-primary-400' />
        </div>
        <h1 className='text-xl sm:text-3xl text-gray-50 pl-2'>
          Typing Speed Trainer
        </h1>
      </div>
    </header>
  );
};

export default Header;
