import React from 'react'
import imgOpenSea from '../../assets/images/opensea.svg'

const Nft = ({ items }) => {
  return (
    <div className="flex justify-center gap-4 mb-4">
      {items.map((item, index) => {
        return (
          <a className="group flex justify-center gap-2" href={item.url}>
            <div className="border rounded-t-lg" key={index}>
              <div className="overflow-hidden">
                <img
                  className="rounded-t-lg duration-200 group-hover:scale-125"
                  src={item.image}
                  alt={item.title}
                  title={item.title}
                />
              </div>
              <div className="p-2 overflow-hidden">
                <p className="font-bold mt-5 text-black">{item.title}</p>
                <span className="flex justify-center gap-2 translate-y-8 opacity-0  duration-100 group-hover:translate-y-0 group-hover:opacity-100">
                  <img className="w-6" src={imgOpenSea} alt="Open Sea" />
                  <span className="group-hover:text-black">
                    Abrir en OpenSea
                  </span>
                </span>
              </div>
            </div>
          </a>
        )
      })}
    </div>
  )
}

export default Nft
