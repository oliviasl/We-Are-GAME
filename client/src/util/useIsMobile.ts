import {useEffect, useState} from 'react';

const isMobileDevice = () => {
  const {innerWidth: width, innerHeight: height} = window;
  return width < 500 || height < 300;
};

const useIsMobile = () => {

  const [isMobile, setIsMobile] = useState(isMobileDevice());

  useEffect(() => {
    function handleResize() {
      setIsMobile(isMobileDevice());
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
};

export default useIsMobile;
