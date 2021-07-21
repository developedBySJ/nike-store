import {useStyletron} from 'baseui'
import React from 'react'
import LoginForm from './Component/LoginForm'
import {Block} from 'baseui/block'
import {H6, Label1, Paragraph3} from 'baseui/typography'
import Logo from '../../lib/assets/icons/Logo.svg'
import {Link} from 'react-router-dom'
import {Viewer} from '../../lib/types'

interface ILoginProps {
  setViewer: (data: Viewer) => void
}

const Login = ({setViewer}: ILoginProps) => {
  const [css, theme] = useStyletron()
  return (
    <Block
      width="100%"
      height="90vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Block width={['100%', '90vw', '500px', '400px']}>
        <div
          className={css({
            textAlign: 'center',
          })}
        >
          <img
            src={Logo}
            alt="Nike Logo"
            className={css({
              height: '24px',
              backgroundImage: `url("${Logo}")`,
              objectFit: 'contain',
              objectPosition: 'center',
              backgroundRepeat: 'no-repeat',
            })}
          />
          <H6 width={['100%', '60%', '50%', '50%']} margin="32px auto">
            YOUR ACCOUNT FOR EVERYTHING NIKE
          </H6>
        </div>
        <LoginForm setViewer={setViewer} />
        <Paragraph3 className={css({textAlign: 'center'})}>
          Not a member?{' '}
          <Link to="/register" className={css({color: '#000'})}>
            Join Us
          </Link>
          .
        </Paragraph3>
      </Block>
    </Block>
  )
}

export {Login as default}
