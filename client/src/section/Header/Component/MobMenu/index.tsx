import {Drawer} from 'baseui/drawer';
import {H4, H5, H6, Label1} from 'baseui/typography';
import React from 'react';
import {Viewer} from '../../../../lib/types';
import User from '../../../../lib/assets/icons/User.svg';
import {Block} from 'baseui/block';
import {StyledLink} from 'baseui/link';
import {HEADER_CONFIG} from '../../lib';
import {ChevronRight} from 'baseui/icon';
import Heart from '../../../../lib/assets/icons/Heart.svg';
import ShoppingBag from '../../../../lib/assets/icons/ShoppingBag.svg';
import {Link, useHistory} from 'react-router-dom';
import {useStyletron} from 'baseui';
import {Button} from 'baseui/button';
interface IMobMenuProps {
  viewer: Viewer;
  isOpen: boolean;
  onClose: () => void;
}

const MobMenu = ({viewer, onClose, isOpen}: IMobMenuProps) => {
  const [css, theme] = useStyletron();
  const histroy = useHistory();
  const cta = (
    <Block>
      <Button
        kind="primary"
        shape="pill"
        $style={{width: '48%', margin: '1%'}}
        onClick={() => {
          histroy.push('/register');
          onClose();
        }}
      >
        Join Us
      </Button>
      <Button
        kind="secondary"
        shape="pill"
        $style={{width: '48%', margin: '1%'}}
        onClick={() => {
          histroy.push('/login');
          onClose();
        }}
      >
        Sign In
      </Button>
    </Block>
  );

  return (
    <Drawer
      isOpen={isOpen}
      onClose={() => onClose()}
      overrides={{
        Root: {
          style: {zIndex: 2, transition: '0.5s all ease-in-out'},
        },
        Backdrop: {
          style: {backdropFilter: 'blur(16px)'},
        },
      }}
    >
      <Block padding="2rem 2vw">
        <Block>
          {viewer.id ? (
            <>
              <Block display="flex" alignItems="center" marginBottom="0.5rem">
                <img src={User} alt={'User Profile'} />
                <H5 marginLeft="1rem">Hii, {viewer.firstName}</H5>
              </Block>
              <Link to="/logout" onClick={() => onClose()}>
                <StyledLink $as="span">
                  <H6 marginLeft="2.5rem">Logout</H6>
                </StyledLink>
              </Link>
            </>
          ) : (
            cta
          )}
        </Block>
        <Block margin="3.5rem 0 1.5rem 2.5rem">
          <Link
            to="/me"
            className={css({textDecoration: 'none'})}
            onClick={() => onClose()}
          >
            <Block
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <H4 margin="1rem 0">Profile</H4>
              <ChevronRight size="32px" color="#111" />
            </Block>
          </Link>
          {HEADER_CONFIG.map((config, i) => {
            return (
              <Link
                to={config.link}
                className={css({textDecoration: 'none'})}
                key={i}
                onClick={() => onClose()}
              >
                <Block
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <H4 margin="1rem 0">{config.title}</H4>
                  <ChevronRight size="32px" color="#111" />
                </Block>
              </Link>
            );
          })}
        </Block>
        <Link
          to={'/favourites'}
          className={css({textDecoration: 'none'})}
          onClick={() => onClose()}
        >
          <Block display="flex" alignItems="center" marginBottom="1rem">
            <img src={Heart} alt={'Favourites'} />
            <H5 marginLeft="1rem">Favourites</H5>
          </Block>
        </Link>
        <Link
          to={'/cart'}
          className={css({textDecoration: 'none'})}
          onClick={() => onClose()}
        >
          <Block display="flex" alignItems="center" marginBottom="1rem">
            <img src={ShoppingBag} alt={'Orders'} />
            <H5 marginLeft="1rem">Bag</H5>
          </Block>
        </Link>
      </Block>
    </Drawer>
  );
};

export {MobMenu};
