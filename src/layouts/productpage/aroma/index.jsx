import React, { useState } from "react";
import classNames from 'classnames';

const Aroma = ({ product,setSelect,Select }) => {
  
  return (
    <div className=" mt-10">
      <div className="font-bold mb-1 text-xl text-gray-600">Aroma</div>
      <div className="flex flex-wrap">
        {product.map((item, index) => (
          <div
            onClick={()=>setSelect(item)}
            key={index}
            className={classNames(
            "flex items-center text-xl font-bold h-10 w-max py-2 px-4 mr-2 mb-3 border-2 cursor-pointer text-gray-600 border-gray-300",
            {
              "bg-gray-400": Select === item 
            }
          )}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Aroma;
