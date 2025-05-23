import React, { useEffect } from 'react'
import Productlist from '../../../components/productlist'
import { useHacimProducts } from '../../../redux/Hooks';

const Hacim = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const Hacimitem = useHacimProducts()
  console.log(Hacimitem)
  if(Hacimitem.length==0){
    return null
  }
  return (
    <div><Productlist text='HACİM' item={Hacimitem} /></div>
  )
}

export default Hacim