import React, { useRef, useState } from 'react';
import './HomeStyle.css';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Home = () => {

    const inputRef = useRef()
    const inputVidRef = useRef()

    const [img, setImg] = useState(null);
    const [vid, setVid] = useState(null);
    const [isShowImg, setIsShowImg] = useState(false);
    const [imageToShow, setImageToShow] = useState();
    // const [isShowVid, setIsShowVid] = useState(false);

    const handleCameraClick = () => {
        inputRef.current.click();
    };
    const handleVideoClick = () => {
        inputVidRef.current.click();
    };

    const handleImageChange = (event) => {
        const files = event.target.files;

        if (files.length > 1) {
            toast.error("You can only upload up to 1 images.");
            return;
        } else {
            //   setEmployeeChangeImage(files)
            const imageUrl = URL.createObjectURL(files[0]);
            setImg(imageUrl);
        }
    };


    const handleVideoChange = (event) => {
        const files = event.target.files;

        if (files.length > 1) {
            toast.error("You can only upload up to 1 images.");
            return;
        } else {
            //   setEmployeeChangeImage(files)
            const VideoUrl = URL.createObjectURL(files[0]);
            setVid(VideoUrl);
        }
    };

    const handleShowImage =(img)=>{
        setImageToShow(img)
        setTimeout(()=>{
            setIsShowImg(true)
        },100)
        
    }

    return (
        <div className='Home-main-div'>
            <div className={isShowImg?'Show-Photo-Main-div':'Show-Photo-Main-div-inactive'}>
            <i onClick={()=>setIsShowImg(false)} className="fa-solid fa-xmark show-Img-Close"></i>
            <div className='Show-Photo-sub-div'>
                <img src={imageToShow} alt="" />
            </div>
            </div>

            <div className='Home-First-div'>
                <div className='Home-First-div-camera'>
                    <i className="fa fa-camera" onClick={handleCameraClick}></i>
                    <input
                        onChange={handleImageChange}
                        type="file"
                        accept="image/*"
                        capture="camera"
                        style={{ display: 'none' }}
                        id="inputImage"
                        ref={inputRef}
                    />
                </div>
                {img ? (
                    <>
                        <div className='Home-First-div-image'>
                            <img src={img} alt="Captured" onClick={()=>handleShowImage(img)} />
                        </div>
                        <button className='Home-First-div-upload-button'>Upload</button>
                    </>
                ) : ''}
            </div>


            <hr />




            {/* For Video capture */}

            <div className='Home-First-div'>
                <div className='Home-First-div-camera'>
                    <i className="fa-solid fa-video" onClick={handleVideoClick}></i>
                    <input
                        onChange={handleVideoChange}
                        type="file"
                        accept="video/*"
                        capture="camera"
                        style={{ display: 'none' }}
                        id="inputVideo"
                        ref={inputVidRef}
                    />
                </div>
                {vid ? (
                    <>
                        <div className='Home-First-div-image'>
                            {/* <iframe src={vid} title="Captured Video" frameborder="0"></iframe> */}
                            <video controls width="100%" height="auto">
                                <source src={vid} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>

                        </div>
                        <button className='Home-First-div-upload-button'>Upload</button>
                    </>
                ) : ''}
            </div>
            <hr />
        </div>
    );
}

export default Home;
