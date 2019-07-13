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

  it('should return promotionItemList[{item:object,promotionTotal:number}]',()=>{
    let expected=[
      {"item":{barcode: 'ITEM000001',name: '雪碧',unit: '瓶',price: 3.00},"promotionTotal":9},
      {"item":{barcode: 'ITEM000003',name: '荔枝',unit: '斤',price: 15.00},"promotionTotal":37.5},
      {"item": {barcode: 'ITEM000005',name: '方便面',unit: '袋',price: 4.50},"promotionTotal":9}
    ];
    let actual=getTotalPromotion(getItemList(tags));
    expect(actual).toEqual(expected);
 })

 it('should return receipt',()=>{
  let expected="***<没钱赚商店>收据***\n"+
  "名称：雪碧，数量：5瓶，单价：3，小计：9.00(元)\n"+
  "名称：荔枝，数量：2.5斤，单价：15，小计：37.50(元)\n"+
  "名称：方便面，数量：3袋，单价：4.5，小计：9.00(元)\n"+
  "----------------------\n"+
  "总计：66.00(元)\n"+
  "节省：10.50(元)\n"+
  "**********************"
  let actual=createReceipt(getItemList(tags),calculateTotalPrice(calculateCostItem(getItemList(tags))),getTotalPromotion(getItemList(tags)));
  expect(actual).toEqual(expected);
})
});

