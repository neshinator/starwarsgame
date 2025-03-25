import {IModalProps} from './Modal.types'
import './Modal.style.scss'
import { useCallback, useEffect, useState } from 'react'

/** #### Modal
* - A description of the Modal component so that tooltips can understand this component
 */
const Modal = ({children, isOpen, close, ...htmlAttributes}: IModalProps) => {
    const [element, setElement] = useState<HTMLDialogElement | null>(null)

    const openModal = useCallback(() => {
        if (!element) return;
        element.showModal();
    }, [element])

    const closeModal = useCallback(() => {
        if (!element) return;
        close();
        element?.close();
    }, [element, close])

    useEffect(() => {
        if (!element) return;
        if (isOpen) {
            openModal()
        } else {
            closeModal()
        }
    }, [isOpen, element, closeModal, openModal])

    const handleNativeCloseEvent = () => {
        closeModal()
    }

    return <dialog onCancel={handleNativeCloseEvent} onClose={handleNativeCloseEvent} ref={setElement} className='Modal' {...htmlAttributes}>{children}</dialog>
}

export default Modal