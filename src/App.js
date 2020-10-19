import React, {useEffect, useState} from 'react';
import './App.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDownload, faUpload, faImage, faUndo} from "@fortawesome/free-solid-svg-icons";

const  App = () => {
    
    const [image, setImage] = useState(null);
    const [imageName, setImageName] = useState("");

    const [sepia,setSepia] = useState("sepia(0)")
    const [grayscale,setGrayscale] = useState("grayscale(0)")
    const [brightness,setBrightness] = useState("brightness(1)")
    const [contrast, setContrast] = useState("contrast(1)")
    const [invert,setInvert] = useState("invert(0)")
    const [opacity,setOpacity] = useState("opacity(1)")
    const [hue,setHue] = useState("hue-rotate(0deg)")
    const [blur,setBlur] = useState("blur(0px)")

    const [sepiaValue,setSepiaValue] = useState(0);
    const [grayscaleValue,setGrayscaleValue] = useState(0);
    const [brightnessValue,setBrightnessValue] = useState(100);
    const [contrastValue,setContrastValue] = useState(100);
    const [invertValue,setInvertValue] = useState(0);
    const [opcacityValue,setOpacityValue] = useState(100);
    const [hueValue,setHueValue] = useState(0);
    const [blurValue,setBlurValue] = useState(0);

    useEffect(() => {
        if (!image) return
        drawImageUploaded(image)
    },[image, sepia,grayscale,brightness,contrast,invert,opacity,hue,blur]);

    const uploadHandler = (e) => {
        setImage(e.target.files[0]);
        setImageName(e.target.files[0].name);
        reset();
    }

    const drawImageUploaded = (image) => {

        let canvas = document.getElementById("canvas");
        let ctx = canvas.getContext("2d")
        let reader = new FileReader();

        reader.onload = function(e){

            let img = new Image();
            img.onload = function(){
                if (img.height > 3000) {
                    document.querySelector(".canvas-content").style.width = "60%"
                    document.getElementById("canvas").style.width = "60%";
                } else if (img.height < 600){
                    document.querySelector(".canvas-content").style.width = "50%"
                    document.getElementById("canvas").style.width = "80%";
                } else {
                    document.querySelector(".canvas-content").style.width = "70%"
                    document.getElementById("canvas").style.width = "90%";
                }
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.filter= sepia + grayscale + brightness + contrast + invert + opacity + hue + blur;
                ctx.drawImage(img,0,0, img.width,img.height);

            }

            img.src = e.target.result;
        }

        reader.readAsDataURL(image);

    }
    const filterHandler = (filterName,setFilter,setValue, value, valueType) => {
        if (valueType === "percent") {
            setFilter(filterName +"("+ (value / 100)+")");
            setValue(value);
        }
        if ( valueType === "deg") {
            setFilter(filterName +"("+ value + "deg)");
            setValue(value);
        }
        if ( valueType === "px") {
            setFilter(filterName +"("+ value + "px)");
            setValue(value);
        }
    }

    const reset = ()  => {
        setSepia("sepia(0)");
        setSepiaValue(0);

        setGrayscale("grayscale(0)");
        setGrayscaleValue(0);

        setBrightness("brightness(1)");
        setBrightnessValue(100)

        setContrast("contrast(1)");
        setContrastValue(100);

        setInvert("invert(0)");
        setInvertValue(0);

        setOpacity("opacity(1)");
        setOpacityValue(100)

        setHue("hue-rotate(0deg)");
        setHueValue(0)

        setBlur("blur(0px)");
        setBlurValue(0)
    }
    const downloadImage = ()  => {
        const canvas = document.getElementById("canvas");
        const url = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.download = "filename.png";
        link.href = url;
        link.click();
    }

  return (
      <>
          <div className={"container"}>
              <div className={"content"}>
                  <section className={"sidebar-bar"}>
                      <h1>Image Filter</h1>
                      <div className={"sidebar-content"}>
                          <div>
                              <h3>Sepia</h3>
                              <input className={"slider"} onChange={(e) => filterHandler("sepia",setSepia,setSepiaValue, e.target.value, 'percent')} type="range" min={0} max={100} value={sepiaValue}/>
                          </div>
                          <div>
                              <h3>Grayscale</h3>
                              <input className={"slider"} onChange={(e) => filterHandler("grayscale",setGrayscale,setGrayscaleValue, e.target.value, 'percent')} type="range" min={0} max={100} value={grayscaleValue}/>
                          </div>
                          <div>
                              <h3>Brightness</h3>
                              <input className={"slider"} onChange={(e) => filterHandler("brightness",setBrightness,setBrightnessValue, e.target.value, 'percent')} type="range" min={0} max={100} value={brightnessValue}/>
                          </div>
                          <div>
                              <h3>Contrast</h3>
                              <input className={"slider"} onChange={(e) => filterHandler("contrast",setContrast,setContrastValue, e.target.value, 'percent')} type="range" min={0} max={100} value={contrastValue}/>
                          </div>
                          <div>
                              <h3>Invert</h3>
                              <input className={"slider"} onChange={(e) => filterHandler("invert",setInvert,setInvertValue, e.target.value, 'percent')} type="range" min={0} max={100} value={invertValue}/>
                          </div>
                          <div>
                              <h3>Opacity</h3>
                              <input className={"slider"} onChange={(e) => filterHandler("opacity",setOpacity,setOpacityValue, e.target.value, 'percent')} type="range" min={0} max={100} value={opcacityValue}/>
                          </div>
                          <div>
                              <h3>Hue rotate</h3>
                              <input className={"slider"} onChange={(e) => filterHandler("hue-rotate",setHue,setHueValue, e.target.value, 'deg')} type="range" min={0} max={360} value={hueValue}/>
                          </div>
                          <div>
                              <h3>Blur</h3>
                              <input className={"slider"} onChange={(e) => filterHandler("blur",setBlur,setBlurValue, e.target.value, 'px')} type="range" min={0} max={20} value={blurValue}/>

                          </div>

                          <button className={"reset-btn"} onClick={() => reset()}>Reset <FontAwesomeIcon icon={faUndo}/></button>
                      </div>
                  </section>
                  <section className={"canvas-container"}>
                      <div className={"canvas-content"}>
                          {image !=null ? (
                              <canvas id={"canvas"}>
                              </canvas>
                          ) : (
                              <div className={"upload-container"}>
                                  <FontAwesomeIcon icon={faImage}/>
                                  <button className={"upload-btn"} onClick={() => document.getElementById("upload").click()}>Upload Image <FontAwesomeIcon icon={faUpload}/></button>
                                  <input type="file" id={"upload"} onChange={(e) => uploadHandler(e)} />
                              </div>
                          )}

                      </div>
                  </section>

                  <section className={"bottom-bar"}>
                      <div className={"bottom-bar-content"}>
                          <button className={"upload-btn"} onClick={() => document.getElementById("upload").click()}>Change Image <FontAwesomeIcon icon={faUpload}/></button>
                          <input type="file" id={"upload"} onChange={(e) => uploadHandler(e)} />
                          <button onClick={() => downloadImage()}>Download <FontAwesomeIcon icon={faDownload}/></button>
                      </div>

                  </section>
              </div>
          </div>
      </>
  );
}

export default App;
