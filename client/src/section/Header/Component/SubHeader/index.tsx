import {useStyletron} from 'baseui'
import {Block} from 'baseui/block'
import {H6, Paragraph1, Paragraph2, Paragraph4} from 'baseui/typography'
import React from 'react'
import {Link} from 'react-router-dom'
import {Viewer} from '../../../../lib/types'
import {ListItem} from 'baseui/list'

interface ISubHeaderProps {
  viewer: Viewer
}

const SubHeader = ({viewer}: ISubHeaderProps) => {
  const [css, theme] = useStyletron()

  const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false)

  const UserMenuItems = [
    {name: 'Dashboard', link: '/me'},
    {name: 'Profile', link: '/profile'},
    {name: 'Orders ', link: '/orders'},
    {name: 'Favourites ', link: '/favourites'},
    {name: 'Log Out', link: '/logout'},
  ]

  const UserMenu = (
    <Block
      position="absolute"
      top="4%"
      className={css({
        zIndex: 100,
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        borderRadius: '16px',
      })}
      backgroundColor="#fff"
    >
      <div
        onMouseLeave={() => setIsUserMenuOpen(false)}
        style={{padding: '32px'}}
      >
        <H6 marginBottom="16px">Account</H6>
        <ul className={css({listStyle: 'none'})}>
          {UserMenuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.link}
                className={css({
                  textDecoration: 'none',
                  opacity: 0.8,
                  ':hover': {opacity: 1},
                })}
              >
                <Paragraph2 as="span"> {item.name}</Paragraph2>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Block>
  )

  const renderUserHelper = viewer.id ? (
    <>
      <Paragraph4 margin="0" position="relative">
        &nbsp;
        <Link
          to="/me"
          onMouseEnter={() => setIsUserMenuOpen(true)}
          onBlur={() => setIsUserMenuOpen(false)}
          className={css({textDecoration: 'none', color: '#000'})}
        >
          &nbsp;Hi, {viewer.firstName}
        </Link>
        &nbsp; &nbsp;
      </Paragraph4>

      {isUserMenuOpen && UserMenu}
    </>
  ) : (
    <>
      <Paragraph4 margin="0">
        &nbsp;
        <Link
          to="/register"
          className={css({textDecoration: 'none', color: '#000'})}
        >
          Join Us
        </Link>
        &nbsp;&nbsp;| &nbsp;
        <Link
          to="/login"
          className={css({textDecoration: 'none', color: '#000'})}
        >
          &nbsp; Sign In
        </Link>
      </Paragraph4>
    </>
  )

  return (
    <Block
      display="flex"
      backgroundColor="#eee"
      margin="0"
      padding="8px 24px"
      justifyContent="flex-end"
      className={css({
        '@media screen and (max-width:700px)': {
          display: 'none',
          visibility: 'hidden',
        },
      })}
      overrides={{
        Block: {
          props: {
            onMouseLeave: () => setIsUserMenuOpen(false),
          },
        },
      }}
    >
      <Paragraph4 margin="0">
        <Link to="/" className={css({textDecoration: 'none', color: '#000'})}>
          Help
        </Link>
        &nbsp; | &nbsp;
      </Paragraph4>
      {renderUserHelper}
    </Block>
  )
}

export {SubHeader}
