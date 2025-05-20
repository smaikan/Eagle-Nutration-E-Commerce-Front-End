import React, { useEffect } from 'react'
import Productlist from '../../../components/productlist'
import { Hacimitem } from '../../../components/items/itemlists/hacimitem'

const Hacim = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div><Productlist text='HACİM' item={Hacimitem} /></div>
  )
}

export default Hacim