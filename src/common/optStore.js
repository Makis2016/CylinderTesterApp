export function setMId(mId){
    sessionStorage.setItem('mId',mId);
}

export function getMId(){
    let mId = sessionStorage.getItem('mId');
    if (mId == null || mId == '' || mId == undefined) mId = 0;
    return mId;
}

export function setIndex(index){
    sessionStorage.setItem('index',index);
}

export function getIndex(){
    let Index = sessionStorage.getItem('index');
    if (Index == null || Index == '' || Index == undefined) Index = 0;
    return Index;
}