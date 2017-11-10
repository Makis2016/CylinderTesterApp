export function setMId(mId){
    sessionStorage.setItem('mId',mId);
}

export function getMId(){
    let mId = sessionStorage.getItem('mId');
    if (mId == null || mId == '' || mId == undefined) mId = 0;
    return mId;
}