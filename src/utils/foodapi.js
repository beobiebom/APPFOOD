
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid';

export function uploadFood(food){
    const fileExtension=food.image.split('.').pop();
     var uuid=uuidv4();
    const fileName = `${uuid}.${fileExtension}`;
    console.log(fileName)
    var storageRef=storage().ref(`FoodIMG/${fileName}`);
    storageRef.putFile(food.image).on('state_changed',snapshot=>{
        console.log("snapshot: "+snapshot.state);
        console.log("progress: " + (snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        
        if(snapshot.state=== storage.TaskState.SUCCESS){
            console.log("Success");
        }
    },error=>{
            console.log("image upload error: " + error.toString());
    },()=>{
        storageRef.getDownloadURL().then((downurl)=>{
                console.log("DOWN at"+downurl);
                food.image=downurl;
            //    delete food.image;
            food.creAt = firestore.FieldValue.serverTimestamp();
            firestore().collection('Foods').add(food).then((snapshot) => {
                food.id = snapshot.id;
                snapshot.set(food);
            }).catch((error) => console.log(error));
        })
    })
}