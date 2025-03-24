/** @file types for the Card component */

import { HTMLAttributes } from 'react'

/** #### Props for the Card component **/
export interface ICardProps extends HTMLAttributes<Omit<HTMLDivElement, 'onClick'>> {
    /** #### My first prop here **/
    question: string;
    onClick: (answer: number) => void;
    isSelected: boolean;
}
