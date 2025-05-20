import { useEffect } from 'react'
import Images from '../../../components/fullimages'
import Items from '../../../components/items'
import { bestsellerItem } from '../../../components/items/itemlists/bestselleritem'
import { giyimitem } from '../../../components/items/itemlists/giyimitem'
import { Newitem } from '../../../components/items/itemlists/newitem'
import { useGiyimProducts, useProteinProducts, useZayiflamaProducts } from '../../../redux/Hooks'

const Home = () => {
  const protein = useProteinProducts()
  const zayiflama = useZayiflamaProducts()
  const giyim = useGiyimProducts()
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
        <Images />
      <Items text='Protein' item={protein}/>
      <Items text='Zayıflama' item={zayiflama}/>
      <Items text='Spor giyim' item={giyim}/>
    </div>
  )
}

export default Home