import { Footer } from './components/structure/Footer';
import { Header } from './components/structure/Header';
import { Main } from './components/structure/Main';
import './styles/app.css';

export function App() {
  return (
    <div className='bg-[#121212] flex flex-col min-h-screen'>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}
