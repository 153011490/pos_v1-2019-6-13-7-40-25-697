'use strict';

const isBarCodesValid = (barcodes) => {
    let items=loadAllItems();
    for(let i=0;i<barcodes.length;i++){
        for(let j=0;j<items.length;j++){
            if(barcodes[i].substr(0,10)==items[j].barcode){
                return true;
            }
        }
    }
    return false;
}

const getItemList = (barcodes) => {
    let itemList=[];
    let items=loadAllItems();
    let map=barcodes.reduce((m,element)=>m.set(element.substr(0,10),(m.get(element.substr(0,10))||0)+parseFloat(element.indexOf('-')!=-1?element.substr(11):1)),new Map());
    for (let [key, value] of map) {
        itemList.push({"item":items.filter(item=>item.barcode==key)[0],"count":value});
    }
    return itemList;
    }

const calculateCostItem = (itemList) => {
    let subTotal=[];
    itemList.forEach(element => {
        subTotal.push({'item':element["item"],'total':element["item"]['price']*element['count']});
    });
    return subTotal;
}

const calculateTotalPrice = (subTotal) => {
    let totalPrice=0;
    subTotal.forEach(item=>{
        totalPrice+=item['total'];
    })
    return totalPrice;
}

const getTotalPromotion = (itemList) => {
    let promotionList=loadPromotions();
    let promotionItemList=[];
    itemList.forEach(element => {
        promotionList.forEach(item=>{
            if(item['barcodes'].includes(element["item"]['barcode'])&&item['type']=='BUY_TWO_GET_ONE_FREE'){
                promotionItemList.push({'item':element["item"],'promotionTotal':element["item"]['price']*(element['count']-Math.floor(element['count']/2))});
            }else{
                promotionItemList.push({'item':element["item"],'promotionTotal':element["item"]['price']*element['count']});
            }
        })
    });
    return promotionItemList;
}