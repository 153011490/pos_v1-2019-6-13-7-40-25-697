'use strict';

describe('pos', () => {
  const tags = [
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000003-2.5',
    'ITEM000005',
    'ITEM000005-2',
  ];

  it('should return true', () => {
    expect(isBarCodesValid(tags)).toEqual(true);
   })

   it('should return true', () => {
     let expected=[{"item":{barcode: 'ITEM000001',name: '雪碧',unit: '瓶',price: 3.00},"count":5},
     {"item":{barcode: 'ITEM000003',name: '荔枝',unit: '斤',price: 15.00},"count":2.5},
     {"item": {barcode: 'ITEM000005',name: '方便面',unit: '袋',price: 4.50},"count":3}
    ];
    expect(getItemList(tags)).toEqual(expected);
   })

  });

