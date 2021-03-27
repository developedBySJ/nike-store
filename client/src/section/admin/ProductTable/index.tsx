import React from 'react';
import {Block} from 'baseui/block';
import {useQuery} from '@apollo/client';
import {useStyletron} from 'baseui';
import {
  CategoricalColumn,
  NumericalColumn,
  StatefulDataTable,
  StringColumn,
} from 'baseui/data-table';

import {LoadingSnipper} from '../../../lib/Components';
import {GET_PRODUCTS_COMPLETE} from '../../../lib/graphQl/queries/getProductsComplete/index,';
import {
  GetProductsComplete,
  GetProductsCompleteVariables,
} from '../../../lib/graphQl/queries/getProductsComplete/__generated__/GetProductsComplete';
import {displayNotification} from '../../../lib/utils/displayNotification';

type RowDataT = [
  string, //        product.id,
  string, //        product.name,
  string, //        product.brand,
  string, //        product.category,
  string, //        product.description,
  string[], //      product.size,
  string[], //      product.fit,
  number, //        product.price,
  number, //        product.mrp,
  number, //        product.availableStock,
  number, //        product.ratings,
  number, //        product.numOfReviews,
  string | null, // product.material,
  string, //        product.slug,
  Date, //          product.createdAt,
];

const columns = [
  StringColumn({
    title: 'Id',
    mapDataToValue: (data: RowDataT) => data[0],
  }),
  StringColumn({
    title: 'Name',
    mapDataToValue: (data: RowDataT) => data[1],
  }),
  CategoricalColumn({
    title: 'Brand',
    mapDataToValue: (data: RowDataT) => data[2],
  }),
  CategoricalColumn({
    title: 'Category',
    mapDataToValue: (data: RowDataT) => data[3],
  }),
  StringColumn({
    title: 'Description',
    mapDataToValue: (data: RowDataT) => data[4],
  }),
  StringColumn({
    title: 'Size',
    mapDataToValue: (data: RowDataT) => data[5].join(' | '),
  }),
  StringColumn({
    title: 'Fit',
    mapDataToValue: (data: RowDataT) => data[6].join(' | '),
  }),
  NumericalColumn({
    title: 'Price',
    mapDataToValue: (data: RowDataT) => data[7],
  }),
  NumericalColumn({
    title: 'Mrp',
    mapDataToValue: (data: RowDataT) => data[8],
  }),
  NumericalColumn({
    title: 'Available Stock',
    mapDataToValue: (data: RowDataT) => data[9],
  }),
  NumericalColumn({
    title: 'Rating',
    mapDataToValue: (data: RowDataT) => data[10],
  }),
  NumericalColumn({
    title: 'No of Reviews',
    mapDataToValue: (data: RowDataT) => data[11],
  }),
  CategoricalColumn({
    title: 'Materials',
    mapDataToValue: (data: RowDataT) => data[12],
  }),
  StringColumn({
    title: 'Slug',
    mapDataToValue: (data: RowDataT) => data[13],
  }),
  StringColumn({
    title: 'Created At',
    mapDataToValue: (data: RowDataT) => data[14],
  }),
];

const ProductTable = () => {
  const [css, theme] = useStyletron();
  const {loading, data, error} = useQuery<
    GetProductsComplete,
    GetProductsCompleteVariables
  >(GET_PRODUCTS_COMPLETE, {
    variables: {
      limit: 50,
    },
  });

  if (loading || error || !data) {
    if (error || (!loading && !data)) {
      displayNotification('negative', 'Something went wrong!');
    }
    return <LoadingSnipper />;
  }
  const rows = data.getProducts.map((product) => ({
    id: product.id,
    data: [
      product.id,
      product.name,
      product.brand,
      product.category,
      product.description,
      product.size,
      product.fit,
      product.price,
      product.mrp,
      product.availableStock,
      product.ratings,
      product.numOfReviews,
      product.material,
      product.slug,
      product.createdAt,
    ],
  }));
  return (
    <Block className={css({height: '100vh', width: '100%'})}>
      <StatefulDataTable columns={columns} rows={rows} resizableColumnWidths />
    </Block>
  );
};

export {ProductTable};
