import { useEffect } from 'react';import Productlist from '../../../components/productlist'
import { giyimitem } from '../../../components/items/itemlists/giyimitem'

const Giyim = () => {
   useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div><Productlist text='SPOR GİYİM' item={giyimitem} /></div>
  )
}

export default Giyim