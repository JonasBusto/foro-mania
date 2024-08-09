import { useEffect, useState } from 'react';
import banner1 from '/img/banner1.gif';
import banner2 from '/img/banner2.gif';
import banner3 from '/img/banner3.gif';

const banners = [banner1, banner2, banner3];
const randomIndex = Math.floor(Math.random() * banners.length);
const randomBanner = banners[randomIndex];

export const BannerAdversiting = () => {
  const [randomBanner, setRandomBanner] = useState(null);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * banners.length);
    setRandomBanner(banners[randomIndex]);
  }, []);

  return (
    <div className='bg-white w-full md:h-28 flex items-center justify-center'>
      <img src={randomBanner} alt='img-adversiting' className='md:h-full' />
    </div>
  );
};
