import Productlist from '../../../components/productlist'


import { useEffect } from 'react';
import { useAksesuarProducts } from '../../../redux/Hooks';

const Aksesuar = () => {
   useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const Aksesuaritem = useAksesuarProducts()
  return (
    <div><Productlist text='AKSESUAR & MALZEME' item={Aksesuaritem}/></div>
  )
}

export default Aksesuar