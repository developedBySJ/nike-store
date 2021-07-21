import {FlexGrid, FlexGridItem} from 'baseui/flex-grid'
import React from 'react'
import {Redirect, useHistory, useParams} from 'react-router-dom'
import {useStyletron} from 'baseui'
import {
  ShippingInfo,
  ProductImgMob,
  ProductDetails,
  ProductName,
  ProductSkeleton,
  SelectSize,
  ProductReviews,
  ProductImages,
} from './component'
import {useQuery} from '@apollo/client'
import {StyledLink} from 'baseui/link'
import {
  GetProductBySlug,
  GetProductBySlugVariables,
} from '../../lib/graphQl/queries/__generated__/GetProductBySlug'
import {GET_PRODUCT_BY_ID} from '../../lib/graphQl/queries/getProductBySlug'
import {Paragraph1} from 'baseui/typography'
import {Block} from 'baseui/block'
import {sortImgArr} from '../../lib/utils/sortImgArr'
import {Accordion, Panel} from 'baseui/accordion'
import {StarRating} from 'baseui/rating'
import {PanelOverrides} from './lib'
import {Waypoint} from 'react-waypoint'
import {SimilarProducts} from './component/SimilarProducts'
import ProductCta from './component/ProductCta'
import {Viewer} from '../../lib/types'
import {Reviews} from '../Reviews'
import {WriteReview} from '../Reviews/components/WriteReview'
import {displayNotification} from '../../lib/utils/displayNotification'

interface IParams {
  slug?: string
}

const Product = ({viewer}: {viewer: Viewer}) => {
  const params = useParams<IParams>()
  const [css, theme] = useStyletron()
  const [fetchSimilarProduct, setFetchSimilarProduct] = React.useState(false)
  const [sizeVal, setSizeVal] = React.useState<string | null>(null)
  const histroy = useHistory()
  const [isReviewOpen, setIsReviewOpen] = React.useState(false)
  const [isWriteReviewOpen, setIsWriteReviewOpen] = React.useState(false)

  const {data, loading, error, refetch} = useQuery<
    GetProductBySlug,
    GetProductBySlugVariables
  >(GET_PRODUCT_BY_ID, {variables: {slug: params.slug || ''}})

  if (loading) {
    return <ProductSkeleton />
  }
  if (error) {
    const statusCode =
      error.graphQLErrors[0].extensions?.exception?.response?.statusCode
    if (statusCode === 404) {
      return <Redirect to="/404" />
    }
    console.log(statusCode)
  }
  if (!data) {
    return <ProductSkeleton error="Something Went Wrong! :(" />
  }
  const product = data.getProductBySlug

  return (
    <>
      <FlexGrid
        flexGridColumnCount={[1, 1, 3, 3]}
        flexGridColumnGap={['0px', '0px', '1rem', '4rem']}
        margin={['1rem', '1.5rem 1.5rem', '2rem 0', '4rem 3rem']}
      >
        <FlexGridItem
          overrides={{
            Block: {
              style: ({$theme}) => ({
                width: `calc((200% - ${$theme.sizing.scale800}) / 3)`,
              }),
            },
          }}
        >
          <Block display={['none', 'none', 'block', 'block']}>
            <ProductImages
              images={sortImgArr(product.images)}
              name={product.name}
            />
          </Block>
        </FlexGridItem>
        <FlexGridItem display="none">
          {/** This invisible one is needed so the margins line up */}
        </FlexGridItem>
        <FlexGridItem
          overrides={{
            Block: {
              style: ({$theme}) => ({
                flexGrow: 0,
              }),
            },
          }}
        >
          <ProductName
            name={product.name}
            description={product.description}
            price={product.price}
          />
          <Block display={['block', 'block', 'none', 'none']}>
            <ProductImgMob images={product.images} />
          </Block>
          <Block margin="1rem 0">
            <SelectSize
              size={product.size}
              setSizeVal={setSizeVal}
              sizeVal={sizeVal}
            />
          </Block>
          <Block marginBottom="2rem">
            <ProductCta product={product} size={sizeVal} viewer={viewer} />
          </Block>
          <Block position="relative">
            <ProductDetails
              details={product.details}
              image={sortImgArr(product.images)[0]}
              name={product.name}
              price={product.price}
            />
          </Block>
          <Block margin="3rem 0">
            <Accordion>
              <Panel title="Size & Fit" overrides={PanelOverrides}>
                <ul className={css({listStyleType: 'disc'})}>
                  {product.fit.map((s, i) => (
                    <li key={s}>
                      <Paragraph1>{s}</Paragraph1>
                    </li>
                  ))}
                </ul>
              </Panel>
              <Panel title="Free Shipping & Returns" overrides={PanelOverrides}>
                <ShippingInfo />
              </Panel>
              <Panel
                title={`Reviews (${product.numOfReviews})`}
                overrides={PanelOverrides}
              >
                <Block>
                  <Block display="flex" alignItems="center" marginBottom="1rem">
                    <StarRating size={20} value={product.ratings} readOnly />
                    <Paragraph1 marginLeft="1rem">
                      {product.ratings} Stars
                    </Paragraph1>
                  </Block>
                  <Block>
                    <Paragraph1 $style={{cursor: 'pointer'}}>
                      <StyledLink
                        onClick={() => {
                          // displayNotification(
                          //   "info",
                          //   "Feature is not implemented yet!"
                          // );
                          if (viewer.id) {
                            setIsWriteReviewOpen(true)
                          } else {
                            histroy.push('/login')
                          }
                        }}
                        $as="span"
                      >
                        Write Review
                      </StyledLink>
                    </Paragraph1>
                    <WriteReview
                      isOpen={isWriteReviewOpen}
                      productId={product.id}
                      setIsOpen={(x) => setIsWriteReviewOpen(x)}
                      viewer={viewer}
                      onComplete={() => {
                        refetch()
                      }}
                    />
                  </Block>
                  {product.reviews?.map(
                    ({member, id, comment, rating, createdAt}) => {
                      const fullName = `${member.firstName} ${member.lastName}`
                      return (
                        <ProductReviews
                          key={id}
                          comment={comment}
                          fullName={fullName}
                          rating={rating}
                          avatar={member.avatar}
                          createdAt={createdAt}
                        />
                      )
                    },
                  )}
                  {product.numOfReviews > 2 && (
                    <>
                      <Paragraph1 $style={{cursor: 'pointer'}}>
                        <StyledLink
                          onClick={() => setIsReviewOpen(true)}
                          $as="span"
                        >
                          More Reviews
                        </StyledLink>
                      </Paragraph1>
                      <Reviews
                        avgRating={product.ratings}
                        totalReviews={product.numOfReviews}
                        isOpen={isReviewOpen}
                        productId={product.id}
                        setIsOpen={(x) => setIsReviewOpen(x)}
                      />
                    </>
                  )}
                </Block>
              </Panel>
            </Accordion>
          </Block>
        </FlexGridItem>
      </FlexGrid>
      <Waypoint
        onEnter={() => !fetchSimilarProduct && setFetchSimilarProduct(true)}
      />
      <Block margin={['1rem', '1.5rem 1.5rem', '2rem 0', '4rem 3rem']}>
        {fetchSimilarProduct && (
          <Block>
            <SimilarProducts
              category={product.category}
              productId={product.id}
            />
          </Block>
        )}
      </Block>
    </>
  )
}

export {Product as default}
