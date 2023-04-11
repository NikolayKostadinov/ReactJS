import { storage } from '../services/utils/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';

const useUploadImg = () => {
    const uploadImage = (folder, event) => {
        const file = event.target.files[0];
        if (file == null) return;
        const imageRef = ref(storage, `${folder}/${file.name + v4()}`);
        return uploadBytes(imageRef, file)
            .then((snapshot) => {
                return getDownloadURL(snapshot.ref);
            });
    };

    return { uploadImage }
}

export default useUploadImg;
