import React, { useState } from 'react';
import './HomeStyle.css';

const Home = () => {
    const [img, setImg] = useState(null);
    const [vid, setVid] = useState(null);

    const handleCapturePhoto = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
            const mediaRecorder = new MediaRecorder(mediaStream);
            const chunks = [];

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    chunks.push(event.data);
                }
            };

            mediaRecorder.onstop = () => {
                const blob = new Blob(chunks, { type: 'image/jpeg' });
                const photoUrl = URL.createObjectURL(blob);
                setImg(photoUrl);
            };

            mediaRecorder.start();
            setTimeout(() => {
                mediaRecorder.stop();
                mediaStream.getTracks().forEach(track => track.stop());
            }, 3000); // Adjust the time as needed
        } catch (error) {
            console.error('Error accessing camera:', error);
        }
    };

    const handleCaptureVideo = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
            const mediaRecorder = new MediaRecorder(mediaStream);
            const chunks = [];

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    chunks.push(event.data);
                }
            };

            mediaRecorder.onstop = () => {
                const blob = new Blob(chunks, { type: 'video/webm' });
                const videoUrl = URL.createObjectURL(blob);
                setVid(videoUrl);
            };

            mediaRecorder.start();
            setTimeout(() => {
                mediaRecorder.stop();
                mediaStream.getTracks().forEach(track => track.stop());
            }, 5000); // Adjust the time as needed
        } catch (error) {
            console.error('Error accessing camera:', error);
        }
    };

    const handleUpload = () => {
        // Implement your upload logic here
        console.log('Uploading:', img, vid);
    };

    return (
        <div className='Home-main-div'>
            <div className='Home-First-div'>
                <div className='Home-First-div-camera'>
                    <i onClick={handleCapturePhoto} className="fa-solid fa-camera"></i>
                </div>
                {img ? (
                    <>
                        <div className='Home-First-div-image'>
                            <img src={img} alt="Captured" />
                        </div>
                        <button onClick={handleUpload} className='Home-First-div-upload-button'>Upload</button>
                    </>
                ) : ''}
            </div>
            <hr />
            <div className='Home-First-div'>
                <div className='Home-First-div-camera'>
                    <i onClick={handleCaptureVideo} className="fa-solid fa-video"></i>
                </div>
                {vid ? (
                    <>
                        <div className='Home-First-div-image'>
                            <video controls>
                                <source src={vid} type="video/webm" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                        <button onClick={handleUpload} className='Home-First-div-upload-button'>Upload</button>
                    </>
                ) : ''}
            </div>
            <hr />
        </div>
    );
}

export default Home;
