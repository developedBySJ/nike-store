import {useLazyQuery, useQuery} from '@apollo/client'
import {useStyletron} from 'baseui'
import {Block} from 'baseui/block'
import React from 'react'
import {useHistory} from 'react-router-dom'
import {GET_MEMBER_BY_ID} from '../../lib/graphQl/queries/getMemberById'
import {
  GetMemberById,
  GetMemberByIdVariables,
} from '../../lib/graphQl/queries/getMemberById/__generated__/GetMemberById'
import {Viewer} from '../../lib/types'
import {MemberForm} from './MemberForm'

interface IProfileProps {
  viewer: Viewer
}

const Profile = ({viewer}: IProfileProps) => {
  const [_getMemberById, {data}] = useLazyQuery<
    GetMemberById,
    GetMemberByIdVariables
  >(GET_MEMBER_BY_ID)
  const {didRequest, id} = viewer
  const [css, theme] = useStyletron()
  const histroy = React.useRef(useHistory())
  const getMemberById = React.useRef(_getMemberById)
  React.useEffect(() => {
    if (didRequest && !id) {
      histroy.current.push('/login')
    }
    if (id) {
      getMemberById.current({
        variables: {
          id,
        },
      })
    }
  }, [id, didRequest])
  return (
    <Block minHeight="80vh">
      {data && <MemberForm initialValues={data.getMemberById} />}
    </Block>
  )
}

export {Profile as default}
