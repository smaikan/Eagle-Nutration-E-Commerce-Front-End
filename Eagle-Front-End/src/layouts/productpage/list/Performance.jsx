import React, { useEffect } from 'react'
import Productlist from '../../../components/productlist'
import { usePerformansProducts } from '../../../redux/Hooks';

const Performance = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const performance = usePerformansProducts()
  return (
    <div><Productlist text='PERFORMANS' item={performance}/></div>
  )
}

export default Performance