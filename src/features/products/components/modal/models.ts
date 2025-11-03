export type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  confirmHandler: () => void;
  cancelHandler: () => void;
};
