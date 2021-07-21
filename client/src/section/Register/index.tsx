import {useStyletron} from 'baseui'
import React from 'react'
import {RegisterForm} from './Component/RegisterForm'
import {Block} from 'baseui/block'

import {H6, Paragraph3} from 'baseui/typography'
import Logo from '../../lib/assets/icons/Logo.svg'
import {Link} from 'react-router-dom'
import {Viewer} from '../../lib/types'

interface ILoginProps {
  setViewer: (data: Viewer) => void
}

const Register = ({setViewer}: ILoginProps) => {
  const [css, theme] = useStyletron()
  return (
    <Block
      width="100%"
      display="flex"
      alignItems="center"
      marginBottom="10vh"
      justifyContent="center"
    >
      <Block width={['100%', '90vw', '500px', '400px']}>
        <div
          className={css({
            textAlign: 'center',
            marginTop: '10vh',
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
          <H6 width={['100%', '90%', '70%', '70%']} margin="32px auto">
            BECOME A NIKE MEMBER
          </H6>
          <Paragraph3
            width={['100%', '90%', '80%', '80%']}
            margin="32px auto"
            $style={{opacity: 0.6}}
          >
            Create your Nike Member profile and get first access to the very
            best of Nike products, inspiration and community.
          </Paragraph3>
        </div>
        <RegisterForm setViewer={setViewer} />
        <Paragraph3 className={css({textAlign: 'center'})}>
          Already a member?&nbsp;
          <Link to="/login" className={css({color: '#000'})}>
            Sign in.
          </Link>
          .
        </Paragraph3>
      </Block>
    </Block>
  )
}

export {Register as default}
