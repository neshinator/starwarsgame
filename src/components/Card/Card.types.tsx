/** @file types for the Card component */

import { HTMLAttributes } from 'react'

/** #### Props for the Card component **/
export interface ICardProps extends HTMLAttributes<HTMLDivElement> {
    /** #### My first prop here **/
    question: string;
    isSelected: boolean | null;
}
