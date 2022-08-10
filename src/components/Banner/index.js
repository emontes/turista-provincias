import React from 'react'
import About from './About'
import HotelsBox from './HotelsBox'
import ListItems from './ListItems'
import BlockGrey from '../atoms/BlockGrey'

const index = ({
  title,
  description,
  image,
  showHotelsBox,
  listItems1,
  sinAbout,
}) => {
  return (
    <BlockGrey title={title}>
      <aside className="flex gap-4 flex-wrap justify-around">
        {!sinAbout && <About description={description} image={image} />}

        {listItems1 && (
          <ListItems
            title={listItems1.title}
            items={listItems1.items}
            linkTo={listItems1.linkTo}
            linkToSuffix={listItems1.linkToSuffix}
          />
        )}
        {showHotelsBox && <HotelsBox />}
      </aside>
    </BlockGrey>
  )
}

export default index
