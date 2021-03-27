import React from 'react';
import {useStyletron} from 'baseui';
import {
  StatefulDataTable,
  BooleanColumn,
  StringColumn,
  DatetimeColumn,
} from 'baseui/data-table';
import {useQuery} from '@apollo/client';
import {Block} from 'baseui/block';

import {GET_MEMBERS} from '../../../lib/graphQl/queries/getMembers';
import {
  GetMembers,
  GetMembersVariables,
} from '../../../lib/graphQl/queries/getMembers/__generated__/GetMembers';
import {LoadingSnipper} from '../../../lib/Components';
import {displayNotification} from '../../../lib/utils/displayNotification';

type RowDataT = [string, string, string, string, Date, boolean];

const columns = [
  StringColumn({
    title: 'ID',
    mapDataToValue: (data: RowDataT) => data[0],
  }),
  StringColumn({
    title: 'First Name',
    mapDataToValue: (data: RowDataT) => data[1],
  }),
  StringColumn({
    title: 'Last Name',
    mapDataToValue: (data: RowDataT) => data[2],
  }),
  StringColumn({
    title: 'Email',
    mapDataToValue: (data: RowDataT) => data[3],
  }),
  DatetimeColumn({
    title: 'Birth Date',
    mapDataToValue: (data: RowDataT) => new Date(data[4]),
  }),

  BooleanColumn({
    title: 'boolean',
    mapDataToValue: (data: RowDataT) => data[5],
  }),
];

const MemberTable = () => {
  const [css] = useStyletron();

  const {data, loading, error} = useQuery<GetMembers, GetMembersVariables>(
    GET_MEMBERS,
    {
      variables: {
        limit: 24,
      },
    },
  );

  if (loading || error || !data) {
    if (error || (!loading && !data)) {
      displayNotification('negative', 'Something went wrong!');
    }
    return <LoadingSnipper />;
  }
  const rows = data?.getMembers.map((member) => ({
    id: member.id,
    data: [
      member.id,
      member.firstName,
      member.lastName,
      member.email,
      member.dateOfBirth,
      member.isAdmin,
    ],
  }));
  return (
    <Block className={css({height: '100vh', width: '100%'})}>
      {data && <StatefulDataTable columns={columns} rows={rows} />}
    </Block>
  );
};

export {MemberTable};
