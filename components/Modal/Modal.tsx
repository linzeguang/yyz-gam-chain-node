import React, {
  cloneElement,
  PropsWithChildren,
  useCallback,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import Dialog from "rc-dialog";
import { ContentFunc, ModalHandleProps, ModalProps } from "./types";
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
        mask={false}
        animation="zoom"
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
