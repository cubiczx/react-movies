import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import ReactPlayer from "react-player";

import "./ModalVideo.scss";

export default function ModalVideo(props: any) {
  const { videoKey, videoPlatform, open, onClose } = props;
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (!open) {
      setUrl("");
      return;
    }
    if (videoKey) {
      switch (videoPlatform) {
        case "YouTube":
          setUrl(`https://www.youtube.com/watch?v=${videoKey}`);
          break;
        case "Vimeo":
          setUrl(`https://vimeo.com/${videoKey}`);
          break;
        default:
          setUrl("");
      }
    }
  }, [videoKey, videoPlatform, open]);

  return (
    <Modal
      className="modal-video"
      centered
      open={open}
      onCancel={onClose}
      footer={null}
      width="90vw"
      styles={{ body: { height: '80vh' } }}
      destroyOnHidden
    >
      {open && <ReactPlayer src={url} controls width="100%" height="100%" />}
    </Modal>
  );
}
