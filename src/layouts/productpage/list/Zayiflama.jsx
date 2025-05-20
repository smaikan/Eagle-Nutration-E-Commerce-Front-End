import { useEffect } from 'react';
import Item from '../../../components/items/item'
import { Zayiflamaitem } from '../../../components/items/itemlists/zayiflamaitem'
import Productlist from '../../../components/productlist'

const Zayiflama = () => {
   useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div><Productlist item={Zayiflamaitem} text='ZAYIFLAMA'/></div>
  )
}

export default Zayiflama