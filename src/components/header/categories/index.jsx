import Category from "./Category"


export const Categories = () => {
    
  return (
    <>
    <div className='bg-gray-600 border-t relative border-gray-700 border-solid w-full h-12 text-l text-white flex justify-between items-center px-40'>
    <Category path='/performance'>
    PERFORMANS
    </Category>
    <Category path='/protein'>
    PROTEİN
    </Category>
    <Category path='/hacim'>
    HACİM
    </Category>
    <Category path='/zayiflama'>
    ZAYIFLAMA</Category>
    <Category path='/aksesuar'>
    AKSESUAR & MALZEME</Category>
    <Category path='/giyim'>
    SPOR GİYİM</Category>

    
    </div>
    
    </>
    
  )
}
