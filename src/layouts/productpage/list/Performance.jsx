import React, { useEffect } from 'react'
import Productlist from '../../../components/productlist'
import { performance } from '../../../components/items/itemlists/performanceitem'

const Performance = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div><Productlist text='PERFORMANS' item={performance}/></div>
  )
}

export default Performance