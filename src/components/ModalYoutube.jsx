import React from "react";
import Modal from "react-modal";
import YouTube from "react-youtube";

const ModalYoutube = ( {isOpen, onClose, videoId}) => {
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        style={{
          overlay: {
            position: "fixed",
            zIndex: 9999,
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
          },
        }}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        {
          <YouTube
            videoId={videoId}
            opts={{
              height: "390",
              width: "640",
              playerVars: {
                // https://developers.google.com/youtube/player_parameters
                autoplay: 1,
              },
            }}
          />
        }
      </Modal>
    </div>
  );
};

export default ModalYoutube;
