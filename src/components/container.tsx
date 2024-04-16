"use client";

import { useEffect } from "react";
import { useModal } from "./use-modal";
import { Modal } from "rizzui";
import { useLocation } from "react-router-dom";

export default function GlobalModal() {
  const { isOpen, view, closeModal, customSize } = useModal();
  const { pathname } = useLocation();
  useEffect(() => {
    closeModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      customSize={customSize}
      overlayClassName="dark:bg-opacity-40 dark:backdrop-blur-lg"
      containerClassName="dark:bg-gray-100"
    >
      {view}
    </Modal>
  );
}
