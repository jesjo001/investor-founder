import React,{useState, useEffect, useCallback} from 'react';
import uploadIcon from '../../../assets/images/uploadPhoto.svg';


export const UploadLogo = ({getData, data}) => {
    const [upload, setUpload] = useState(uploadIcon);
    const convertFileForImg =useCallback(()=>{
        
        if(/\.(jpe?g|png|gif)$/i.test(data?.logo?.name)){
            const reader = new FileReader();

            reader.addEventListener("load", (result)=>{
                console.log("rss",result)
                    setUpload((upload)=>result.target.result)
            }, false);

            reader.readAsDataURL(data?.logo)

        }
    },[data?.logo])


    useEffect(()=>{
        convertFileForImg()
    },[data, convertFileForImg])
    return (
        <section>
            <header className="muon-step-header">Upload your start-up's logo.</header>
            <div className="muon-photo-upload">
                <input type="file" onChange={(e)=>{getData(e); convertFileForImg()}} name="logo" accept="image/*"/>
                <img src={upload} alt="upload" />
            </div>
        </section>
    )
}
