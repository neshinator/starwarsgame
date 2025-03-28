/** @file types for the Modal component */

import {IModalProps} from './Modal.types'

/** #### Props for the Modal component **/
export const happyPath: IModalProps = {
    /** #### My first prop here **/
    children: <p>some content</p>,
    isOpen: true,
    close: () => null
}
