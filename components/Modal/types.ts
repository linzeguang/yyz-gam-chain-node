export type ContentFunc = () => React.ReactElement;

export interface ModalProps {
  title?: string;
  afterClose?: () => void;
}

export interface ModalHandleProps {
  toggle: (boo?: boolean) => void;
  visible: boolean;
}
