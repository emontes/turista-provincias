import React from 'react'
import imgOpenSea from '../../assets/images/opensea.svg'

const Nft = ({ items }) => {
  console.log('Los Items -=>', items)
  return (
    <div className="flex justify-center gap-4 mb-4">
      {items.map((item, index) => {
        return (
          <div className="border rounded-t-lg" key={index}>
            <img
              className="rounded-t-lg"
              src={item.image}
              alt={item.title}
              title={item.title}
            />
            <div className="p-2">
              <a className="flex justify-center gap-2" href={item.url}>
                <img className="w-6" src={imgOpenSea} alt="Open Sea" />
                Abrir en OpenSea
              </a>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Nft

const Samples = () => {
  return (
    <div>
      {/* 3 Nft */}
      <Nft
        items={[
          {
            title: 'Casa Blanca 1',
            image:
              'https://lh3.googleusercontent.com/BVHYcFj_RAVjqV2bfhdqKyG7_QM3ietKhGNiOQKefaorf-K2lwPeGObqpO6lYjCE7N0WPQcv4PLGleAhskuj9FCCcEoHmGugtgOnqg=w300',
            url:
              'https://opensea.io/assets/ethereum/0x495f947276749ce646f68ac8c248420045cb7b5e/40204312931910274261888319886493561627181628932808286703084245907766736060417/',
          },
          {
            title: 'Casa Blanca 2',
            image:
              'https://lh3.googleusercontent.com/Hp1jjlZ4u925CC9H0G3iexIrwHK_kSPBIlu25oyYY1wTQy9om1An_V9dYlwfEx6lJUj_0b3XdZzKFC7ukDPmUPtU7MeFDL1v0ervmfU=w300',
            url:
              'https://opensea.io/assets/ethereum/0x495f947276749ce646f68ac8c248420045cb7b5e/40204312931910274261888319886493561627181628932808286703084245905567712804865/',
          },
          {
            title: 'Casa Blanca 3',
            image:
              'https://lh3.googleusercontent.com/5OInt6zUv6AivEbdpohNeoppEw9EReGYH1YdahHC9JfiR0veTDxXE9IinAT44Ln2PoeCBTfI5TUX1ihLnySnHWGXu35vTc9JqVi1=w300',
            url:
              'https://opensea.io/assets/ethereum/0x495f947276749ce646f68ac8c248420045cb7b5e/40204312931910274261888319886493561627181628932808286703084245906667224432641/',
          },
        ]}
      />
      {/* 1 Nft */}
      <Nft
        items={[
          {
            title: 'Catedral San Ildefonso',
            image:
              'https://lh3.googleusercontent.com/FE15CPoEePaQBtcAyaghpSArU7-YWDswnrTNJQ2Ui-v9MnQkbLHYhWJLaddZvg21mnXjdQNIuGsBdMeZW1j6rbcJUaRLkGA_0HHUzw=w300',
            url:
              'https://opensea.io/assets/matic/0x2953399124f0cbb46d2cbacd8a89cf0599974963/40204312931910274261888319886493561627181628932808286703084245894572596527105/',
          },
        ]}
      />
      {/* 2 Nft */}
      <Nft
        items={[
          {
            title: 'Arcos en Mérida',
            image:
              'https://lh3.googleusercontent.com/C8Sem94r78lHrjRlmrjhmyj-SgwUvWSlPMpd-vo4cDFA2BVQXX_uwz0zDZgnKwXQCxGo1XHeHTJBBoJLd3MoE99_SHmMNSO73fC5=w300',
            url:
              'https://opensea.io/assets/ethereum/0x495f947276749ce646f68ac8c248420045cb7b5e/40204312931910274261888319886493561627181628932808286703084245897871131410433/',
          },
          {
            title: 'Calesita en Mérida',
            image:
              'https://lh3.googleusercontent.com/0u7HNLPinSj9i17Wml2B6Jx5NIvX2mTbwfkjvl_rx3-rh9mxJNoxqbBNCIFuzDaZRTgs885ZPfWbkfYTYtUZPztrcQIoO1d7aiifVg=w300',
            url:
              'https://opensea.io/assets/ethereum/0x495f947276749ce646f68ac8c248420045cb7b5e/40204312931910274261888319886493561627181628932808286703084245902269177921537/',
          },
        ]}
      />
    </div>
  )
}
