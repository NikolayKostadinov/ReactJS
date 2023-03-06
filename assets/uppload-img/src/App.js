import './App.css';

import { useState, useEffect } from 'react';
import { storage } from './firbase'
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage'
import { v4 } from 'uuid'

function App() {
    const [imageUpload, setImageUpload] = useState(null);
    const [imageUrls, setImageUrls] = useState([]);

    const imagesListRef = ref(storage, "meals/");

    const prepareFile = (event) => {
        setImageUpload(event.target.files[0]);
    }

    const uploadFile = () => {
        if (imageUpload == null) return;
        const imageRef = ref(storage, `meals/${imageUpload.name + v4()}`);
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setImageUrls((prev) => [...prev, url]);
            });
        });
    };

    useEffect(() => {
        listAll(imagesListRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setImageUrls((prev) => [...prev, url]);
                });
            });
        });
    }, []);

    return (
        <div className="App">
            <h1>Hello App</h1>
            <div>
                <input type="file" onChange={prepareFile} />
                <button onClick={uploadFile}>Upload image</button>
            </div>
            <div className="images">
                {imageUrls.map((url, ix) => {
                    return <img key={url} src={url} alt={`file${ix}`}/>;
                })}
            </div>
        </div>
    );
}

export default App;