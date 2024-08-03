import React from "react";

interface ModalProps {
    children: React.ReactNode;
}

const Modal = ({children}: ModalProps) => {
    return <section
        className={"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"}>
        <div className={"bg-white p-4 rounded-lg"}>
            {children}
        </div>
    </section>;
};

export default Modal;
