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

   it('should return ItemList[{item:object,count:number}]', () => {
     let expected=[
       {"item":{barcode: 'ITEM000001',name: '雪碧',unit: '瓶',price: 3.00},"count":5},
       {"item":{barcode: 'ITEM000003',name: '荔枝',unit: '斤',price: 15.00},"count":2.5},
       {"item": {barcode: 'ITEM000005',name: '方便面',unit: '袋',price: 4.50},"count":3}
     ];
      let actual=getItemList(tags);
      expect(actual).toEqual(expected);
   })
  
   it('should return subTotal[{item:object,total:number}]',()=>{
      let expected=[
        {"item":{barcode: 'ITEM000001',name: '雪碧',unit: '瓶',price: 3.00},"total":15},
        {"item":{barcode: 'ITEM000003',name: '荔枝',unit: '斤',price: 15.00},"total":37.5},
        {"item": {barcode: 'ITEM000005',name: '方便面',unit: '袋',price: 4.50},"total":13.5}
      ];
      let actual=calculateCostItem(getItemList(tags));
      expect(actual).toEqual(expected);
   })

   it('should return 66',()=>{
    let expected=66;
    let actual=calculateTotalPrice(calculateCostItem(getItemList(tags)));
    expect(actual).toEqual(expected);
 })
   

  });

