import React from 'react'
import {useStyletron} from 'baseui'
import {
  HomeFeatured,
  HomeHero,
  HomeLatest,
  HomeTrending,
  HomePreFooter,
} from './Components'

const Home = () => {
  const [css, theme] = useStyletron()

  return (
    <>
      <section id="hero">
        <HomeHero />
      </section>
      <section
        id="trending"
        className={css({margin: '1rem 0', padding: '1rem 0'})}
      >
        <HomeTrending />
      </section>
      <section
        id="latest"
        className={css({margin: '1rem 0', padding: '1rem 0'})}
      >
        <HomeLatest />
      </section>
      <section
        id="featured"
        className={css({margin: '1rem 0', padding: '1rem 0'})}
      >
        <HomeFeatured />
      </section>
      <section id="where-all-athletes-belong">
        <HomePreFooter />
      </section>
    </>
  )
}

export {Home as default}
