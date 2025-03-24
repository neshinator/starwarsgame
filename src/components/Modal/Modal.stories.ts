/** @file storybook file for Modal component */

import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import {happyPath} from './Modal.mock'

import Modal from './index';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Component/Modal',
  component: Modal,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof Modal>;

export const BasicUsage: Story = {
    args: happyPath
}

/* additional stories if needed
export const Secondary: Story = {
  args: {
    label: 'Button',
  },
};
*/
