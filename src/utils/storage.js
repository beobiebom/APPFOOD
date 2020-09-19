import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';
const storage=new Storage({
    size:1000,
    storageBackend:AsyncStorage,
    defaultExpires:7*1000*3600*24,
    enableCache:true,
});
export const StorageErrorTypes={
    Expired:'ExpireError',
    NotFound:'NotFoundError'
};
export const saveToken=(token)=>{
    return storage.save({
        key:'appfood:token',
        data:token
    });
};
export const loadToken=()=>{
    return storage.load({
        key:'appfood:token'
    });
};
export const removeToken=()=>{
    return storage.remove({
        key:'appfood:token',
    });
};
export default storage;