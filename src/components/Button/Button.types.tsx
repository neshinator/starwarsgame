/** @file types for the Button component */

import { HTMLAttributes } from 'react'

/** #### Props for the Button component **/
export interface IButtonProps extends HTMLAttributes<HTMLButtonElement> {
    /** #### My first prop here **/
    buttonText: string;
    size?: 'small' | 'regular'
}
