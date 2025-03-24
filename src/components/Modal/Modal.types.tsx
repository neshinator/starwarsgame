/** @file types for the Modal component */

import { HTMLAttributes, ReactNode } from 'react'

/** #### Props for the Modal component **/
export interface IModalProps extends HTMLAttributes<HTMLElement> {
    /** #### My first prop here **/
    children: ReactNode,
    isOpen: boolean;
    close: () => void;
}
