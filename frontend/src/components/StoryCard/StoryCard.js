import React from 'react'
import './StoryCard.css'

function StoryCard() {
  return (
    <div className='story-card'>
      <picture className='story-card__picture'>
        <source
          media='(min-width: 1200px)'
          srcSet='https://target.scene7.com/is/image/Target/CP_legend_SH_2400x875-201231-1609438410519?wid=2160&amp;qlt=80&amp;fmt=webp'
        />

        <source
          media='(min-width: 992px)'
          srcSet='https://target.scene7.com/is/image/Target/CP_legend_SH_2400x875-201231-1609438410519?wid=2160&amp;qlt=80&amp;fmt=webp'
        />

        <source
          media='(min-width: 668px)'
          srcSet='https://target.scene7.com/is/image/Target/CP_legend_SH_2400x875_TABLET-201231-1609439392408?wid=1785&amp;qlt=80&amp;fmt=webp'
        />

        <source
          media='(min-width: 0px)'
          srcSet='https://target.scene7.com/is/image/Target/CP_legend_SH_1500x1900-201231-1609439735966?wid=1200&amp;qlt=80&amp;fmt=webp'
        />

        <img alt='' />
      </picture>
    </div>
  )
}

export default StoryCard
