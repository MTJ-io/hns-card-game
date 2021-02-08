import React, { useEffect, useState } from "react";
import classNames from "classnames";
import ReactModal from "react-modal";

import { ReactComponent as CloseSvg } from "../../assets/close.svg";
import styles from "./Modal.module.scss";
import { registerExits } from "../../utils/utils";

ReactModal.setAppElement("#app");

interface ModalProps {
  onClose: () => void;
  label?: string;
  open?: boolean;
}

const Modal: React.FC<ModalProps> = ({ children, label, open, onClose }) => {
  useEffect(() => {
    if (open) {
      return registerExits(() => {
        onClose();
      });
    }
  }, [open, onClose]);

  return (
    <ReactModal
      isOpen={open}
      contentLabel={label || "Card info"}
      onRequestClose={onClose}
      className={styles.modal}
      overlayClassName={{
        base: styles.overlay,
        beforeClose: styles.beforeClose,
        afterOpen: styles.afterOpen,
      }}
      closeTimeoutMS={500}
    >
      <button className={styles.close} onClick={onClose}>
        <CloseSvg />
      </button>
      <div className={styles.content}>{children}</div>
    </ReactModal>
  );
};

export { Modal };
