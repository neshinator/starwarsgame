/** @file types for the BackgroundContainer component */

import { HTMLAttributes, ReactNode } from 'react'

/** #### Props for the BackgroundContainer component **/
export interface IBackgroundContainerProps extends HTMLAttributes<HTMLElement> {
    /** #### My first prop here **/
    children: ReactNode
}
