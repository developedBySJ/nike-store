import {Block} from 'baseui/block';
import {H6, Paragraph1, Paragraph4} from 'baseui/typography';
import {Button} from 'baseui/button';
import {useHistory} from 'react-router-dom';
import {StatefulTooltip} from 'baseui/tooltip';

import {formatPrice} from '../../../../lib/utils/formatPrice';
import {GetMyCart_getMyCart_products} from '../../../../lib/graphQl/queries/getMyCart/__generated__/GetMyCart';

interface ISummaryProps {
  products: GetMyCart_getMyCart_products[];
}

const Summary = ({products}: ISummaryProps) => {
  const total = products.reduce((acc, cur) => acc + cur.price * cur.qty, 0);
  const tax = total * 0.12;
  const histroy = useHistory();
  return (
    <Block margin="1rem 0" padding="1rem 0">
      <Block display="flex" justifyContent="space-between">
        <Paragraph1>
          SubTotal&nbsp;&nbsp;
          <StatefulTooltip
            content={() => (
              <Paragraph4 padding={'4px'} color="#f7f7f7" maxWidth="15rem">
                The subtotal reflects the total price of your order before any
                applicable discounts.
              </Paragraph4>
            )}
            showArrow
          >
            <Paragraph4
              color="#fff"
              backgroundColor="#333"
              as="span"
              padding="0 5px"
              height="100%"
              $style={{borderRadius: '100px'}}
            >
              ?
            </Paragraph4>
          </StatefulTooltip>
        </Paragraph1>
        <Paragraph1>{formatPrice(total)}</Paragraph1>
      </Block>
      <Block display="flex" justifyContent="space-between" margin="1rem 0">
        <Paragraph1>Estimated Shipping & Handling&nbsp;&nbsp;</Paragraph1>
        <Paragraph1>{formatPrice(0)}</Paragraph1>
      </Block>
      <Block display="flex" justifyContent="space-between">
        <Paragraph1>Estimated Tax (incl.)&nbsp;&nbsp;</Paragraph1>
        <Paragraph1>{formatPrice(tax)}</Paragraph1>
      </Block>
      <Block
        display="flex"
        justifyContent="space-between"
        margin="1rem 0"
        padding="1rem 0"
        $style={{
          borderBottom: '1px solid rgb(229,229,229)',
          borderTop: '1px solid rgb(229,229,229)',
        }}
      >
        <Paragraph1>Total</Paragraph1>
        <H6>{formatPrice(total, 2)}</H6>
      </Block>
      <Block padding="1rem 0">
        <Button
          shape="pill"
          size="large"
          $style={{width: '100%'}}
          disabled={total === 0}
          onClick={() => histroy.push('/checkout')}
        >
          Checkout
        </Button>
      </Block>
    </Block>
  );
};

export {Summary};
