import React, { useEffect } from 'react'
import Productlist from '../../../components/productlist'
import { useProteinProducts } from '../../../redux/Hooks';


const Proteins = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const proteinitem = useProteinProducts()
  return (
    <div><Productlist text='PROTEİN' item={proteinitem}/></div>
  )
}

export default Proteins