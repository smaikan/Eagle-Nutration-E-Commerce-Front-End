import Productlist from '../../../components/productlist'
import { Aksesuaritem } from '../../../components/items/itemlists/aksesuaritem'
import { useEffect } from 'react';

const Aksesuar = () => {
   useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div><Productlist text='AKSESUAR & MALZEME' item={Aksesuaritem}/></div>
  )
}

export default Aksesuar