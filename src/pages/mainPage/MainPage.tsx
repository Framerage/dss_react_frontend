import React, {useRef, useState} from "react";

import classes from "./mainPage.module.css";

const MainPage = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [isVideoActive, setIsVideoActive] = useState(false);
  const handleProgress = () => {
    const vDuration = videoRef.current?.duration || 0;
    const vCurrentTime = videoRef.current?.currentTime || 0;
    const vCurrentProgress = (vDuration / vCurrentTime) * 100;
    setCurrentProgress(vCurrentProgress);
  };
  const onActivePlayer = () => {
    if (isVideoActive) {
      videoRef.current?.pause();
    }
    videoRef.current?.play();
    setIsVideoActive(!isVideoActive);
  };
  console.log(videoRef, "vid ref");
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        color: "black",
        fontSize: "20px",
      }}
    >
      <div className={classes.mainContent}>
        <div className={classes.appPreview}>
          <video
            ref={videoRef}
            tabIndex={-1}
            // src="https://www.youtube.com/watch?v=2tAPxjcGLms"
            className={classes.previewPlayer}
            webkit-playsinline=""
            playsInline
            controlsList="nodownload"
            controls
          >
            <source
              src="https://www.youtube.com/watch?v=2tAPxjcGLms"
              type="video/mp4"
            />
          </video>
          <div onClick={onActivePlayer}>Play</div>
          <progress value={currentProgress} max={100} />
        </div>
      </div>
    </div>
  );
};
export default MainPage;
