import React from 'react'
import {Textarea} from 'baseui/textarea'
import {
  Modal,
  ModalBody,
  ModalButton,
  ModalFooter,
  ModalHeader,
} from 'baseui/modal'
import {Viewer} from '../../../../lib/types'
import {StarRating} from 'baseui/rating'
import {Block} from 'baseui/block'
import {useLazyQuery, useMutation, useQuery} from '@apollo/client'
import {GET_REVIEWS_BY_PRODUCT_ID} from '../../../../lib/graphQl/queries/getReviewsByProductId'
import {GET_MY_REVIEWS} from '../../../../lib/graphQl/queries/getMyReviews'
import {
  GetMyReviews,
  GetMyReviewsVariables,
} from '../../../../lib/graphQl/queries/getMyReviews/__generated__/GetMyReviews'
import {Spinner} from 'baseui/spinner'
import {Notification} from 'baseui/notification'
import {CREATE_REVIEW} from '../../../../lib/graphQl/mutations/createReview'
import {
  CreateReview,
  CreateReviewVariables,
} from '../../../../lib/graphQl/mutations/createReview/__generated__/CreateReview'
import {
  UpdateReview,
  UpdateReviewVariables,
} from '../../../../lib/graphQl/mutations/updateReview/__generated__/UpdateReview'
import {UPDATE_REVIEW} from '../../../../lib/graphQl/mutations/updateReview'
import {useSnackbar} from 'baseui/snackbar'

interface IWriteReviewProps {
  isOpen: boolean
  setIsOpen: (x: boolean) => void
  productId: string
  viewer: Viewer
  onComplete?: () => void
}

const WriteReview: React.FC<IWriteReviewProps> = ({
  isOpen,
  productId,
  setIsOpen,
  onComplete,
}) => {
  const [rating, setRating] = React.useState(1)
  const [comment, setComment] = React.useState('')
  const [reviewId, setReviewId] = React.useState<string | undefined>()
  const {enqueue} = useSnackbar()

  const [_getMyReviews, {data, error, loading}] = useLazyQuery<
    GetMyReviews,
    GetMyReviewsVariables
  >(GET_MY_REVIEWS, {
    variables: {productId},
    onCompleted: ({getMyReviews}) => {
      // console.log('REVIEW RENDER')
      // console.log({getMyReviews})
      if (getMyReviews.length === 1) {
        const reqReview = getMyReviews[0]
        setRating(reqReview.rating)
        setComment(reqReview.comment)
        setReviewId(reqReview.id)
      }
    },
  })
  const [createReview, {}] = useMutation<CreateReview, CreateReviewVariables>(
    CREATE_REVIEW,
    {
      variables: {productId, comment, rating},
      onCompleted: () => {
        enqueue({message: 'Review Created Successfully'})
        setIsOpen(false)
        onComplete && onComplete()
      },
    },
  )
  const [updateReview, {}] = useMutation<UpdateReview, UpdateReviewVariables>(
    UPDATE_REVIEW,
    {
      onCompleted: () => {
        enqueue({message: 'Review Updated Successfully'})
        setIsOpen(false)
        onComplete && onComplete()
      },
    },
  )
  const getMyReviews = React.useRef(_getMyReviews)

  React.useEffect(() => {
    if (isOpen) {
      getMyReviews.current()
    }
    if (data?.getMyReviews.length === 1) {
      const reqReview = data?.getMyReviews[0]
      setRating(reqReview.rating)
      setComment(reqReview.comment)
    }
  }, [isOpen, data])

  const handleSubmission = () => {
    if (reviewId) {
      updateReview({variables: {reviewId, comment, rating}})
    } else {
      createReview()
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <ModalHeader>Write Review</ModalHeader>
      <ModalBody>
        {reviewId && (
          <Notification>You already reviewed this product ! </Notification>
        )}
        {loading ? (
          <Block $style={{textAlign: 'center'}} padding="2rem 0">
            <Spinner color="#111" />
          </Block>
        ) : (
          <>
            <Block margin="1rem 0">
              <StarRating
                value={rating}
                onChange={({value}) => setRating(value)}
              />
            </Block>
            <Textarea
              value={comment}
              size={'compact'}
              onChange={(e) => setComment((e.target as HTMLInputElement).value)}
              placeholder="Write your review here.  It must be at least 5 characters long.  Consider whether you would recommend this product and what you like or dislike about it."
              clearOnEscape
              min={5}
              error={comment.length < 5}
              overrides={{
                Input: {
                  style: {
                    resize: 'vertical',
                    minHeight: '100px',
                  },
                },
              }}
            />
          </>
        )}
      </ModalBody>
      <ModalFooter>
        <ModalButton kind="minimal" onClick={() => setIsOpen(false)}>
          Cancel
        </ModalButton>
        <ModalButton
          disabled={comment.length < 5}
          onClick={() => handleSubmission()}
        >
          {!!reviewId ? 'Update' : 'Submit'}
        </ModalButton>
      </ModalFooter>
    </Modal>
  )
}

export {WriteReview}
