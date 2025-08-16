import { useEffect } from 'react';
import Productlist from '../../../components/productlist'
import { useGiyimProducts } from '../../../redux/Hooks';

const Giyim = () => {
   useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const giyimitem = useGiyimProducts()
  return (
    <div><Productlist text='SPOR GİYİM' item={giyimitem} /></div>
  )
}

export default Giyim