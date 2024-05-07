import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Button from "../app/BaseComponents/Button";
import '../app/CSS/Components.css';

const meta = {
  title: 'Button_1',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
    img: { control: 'text', description: 'relative path of icon for button' },
    width: { control: 'text' },
    height: { control: 'text' },
    label: { control: 'text' },
    id: { control: 'text' },
    white: { control: 'boolean' },
    marginTop: { control: 'text' },
    hoverContent: { control: 'text' }
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: 'Button',
    img: '',
    width: '200',
    height: '20',
    id: 'storybook-example-1',
    white: false,
    marginTop: '0',
    hoverContent: ''
  },
};
