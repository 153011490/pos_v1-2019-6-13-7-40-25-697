'use strict';

//TODO: 请在该文件中实现练习要求并删除此注释
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