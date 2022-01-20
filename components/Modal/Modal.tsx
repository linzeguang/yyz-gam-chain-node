import React, {
  PropsWithChildren,
  useCallback,
  useImperativeHandle,
  useState,
} from "react";
import Dialog from "rc-dialog";
import { ModalHandleProps, ModalProps } from "./types";
import { ModalTitle } from "./styled";

// eslint-disable-next-line react/display-name
const Modal = React.forwardRef<ModalHandleProps, PropsWithChildren<ModalProps>>(
  (props, ref) => {
    const { afterClose, title, children } = props;
    const [visible, setVisible] = useState(false);

    const toggle = useCallback(
      (boo?: boolean) => {
        setVisible(boo ?? !visible);
      },
      [visible]
    );

    useImperativeHandle(ref, () => ({ toggle, visible }), [toggle, visible]);

    return (
      <Dialog
        visible={visible}
        animation="zoom"
        maskAnimation="fade"
        afterClose={afterClose}
        onClose={() => toggle()}
        destroyOnClose
      >
        {title && <ModalTitle>{title}</ModalTitle>}
        {children}
      </Dialog>
    );
  }
);

export default Modal;
