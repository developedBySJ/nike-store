import {useStyletron} from 'baseui';
import {Block} from 'baseui/block';
import {StyledLink} from 'baseui/link';
import {Modal, ModalBody, ModalHeader} from 'baseui/modal';
import {Skeleton} from 'baseui/skeleton';
import {H4, Paragraph1, Paragraph2} from 'baseui/typography';
import React from 'react';
import {formatPrice} from '../../../../lib/utils/formatPrice';

interface IProductNameProps {
  name: string;
  description: string;
  price: number;
}
const ProductName = ({description, name, price}: IProductNameProps) => {
  const [css, theme] = useStyletron();
  return (
    <Block display="flex" justifyContent="space-between" marginBottom="2rem">
      <Block>
        <Paragraph1>{description}</Paragraph1>
        <H4>{name}</H4>
      </Block>
      <Block className={css({textAlign: 'right'})}>
        <Paragraph1>{formatPrice(price)}</Paragraph1>
        <Paragraph2 overrides={{Block: {style: {opacity: 0.5}}}}>
          incl. of taxes <br /> and duties
        </Paragraph2>
      </Block>
    </Block>
  );
};

const ProductDetails = (props: {
  details: string;
  name: string;
  price: number;
  image: string;
}) => {
  const {details, image, name, price} = props;
  const [css, theme] = useStyletron();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  return (
    <>
      <div>
        <Paragraph2
          overrides={{
            Block: {
              props: {
                dangerouslySetInnerHTML: {__html: details},
              },
              style: {
                height: '25vh',
                minHeight: '100px',
                overflow: 'hidden',
                position: 'relative',
                zIndex: -2,
              },
            },
          }}
        />
        <span
          className={css({
            width: '100%',
            height: '100%',
            display: 'block',
            position: 'absolute',
            bottom: '0%',
            left: '0%',
            zIndex: -1,
            backgroundImage:
              'linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 10%,rgba(255,255,255,0) 100%)',
          })}
        />
        <StyledLink
          className={css({
            cursor: 'pointer',
            display: 'block',
          })}
          onClick={() => setIsModalOpen(true)}
        >
          View Product Details
        </StyledLink>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        overrides={{
          Dialog: {style: {borderRadius: '1rem'}},
          Root: {style: {zIndex: 2}},
        }}
      >
        <ModalHeader>
          <Block display="flex">
            <img src={image} alt={name} height="72px" />
            <Block marginLeft="1rem">
              <Paragraph1>{name}</Paragraph1>
              <Paragraph2>{formatPrice(price)}</Paragraph2>
            </Block>
          </Block>
          <ModalBody>
            <Paragraph2
              overrides={{
                Block: {
                  props: {
                    dangerouslySetInnerHTML: {__html: details},
                  },
                  style: {
                    ' strong': {
                      marginTop: '2rem',
                    },
                  },
                },
              }}
            />
          </ModalBody>
        </ModalHeader>
      </Modal>
    </>
  );
};

const ShippingInfo = () => {
  const [css, theme] = useStyletron();
  return (
    <>
      <Paragraph2 marginBottom="2rem">
        Your order of ₹14,000 or more gets free standard delivery.
      </Paragraph2>
      <ul className={css({listStyleType: 'disc', marginBottom: '2rem'})}>
        <li>
          <Paragraph2>
            Standard Delivery for Postal Codes: 100000-399999, 500000-699999 and
            800000-899999 : 4 &ndash; 16 business days
          </Paragraph2>
        </li>
        <li>
          <Paragraph2>
            Standard Delivery for Postal Codes: 400000-499999 : 3 &ndash; 15
            business days
          </Paragraph2>
        </li>
        <li>
          <Paragraph2>
            Standard Delivery for Postal Codes: 700000-799999 and 900000-999999:
            5 &ndash; 21 business days
          </Paragraph2>
        </li>
      </ul>

      <Paragraph2>
        Orders are processed and delivered Monday-Friday (excluding public
        holidays).
      </Paragraph2>
    </>
  );
};

export {ProductName, ProductDetails, ShippingInfo};
