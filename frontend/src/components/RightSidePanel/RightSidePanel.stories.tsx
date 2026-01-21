import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import RightSidePanel from './RightSidePanel';

const meta = {
  title: 'Components/RightSidePanel',
  component: RightSidePanel,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: { control: 'boolean' },
    title: { control: 'text' },
  },
  args: {
    onClose: fn(),
  },
} satisfies Meta<typeof RightSidePanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
    title: 'Side Panel',
    children: (
      <div className="space-y-3">
        <p className="text-white">This is a side panel.</p>
        <p className="text-zinc-400 text-sm">You can put any content here.</p>
      </div>
    ),
  },
};

export const ActivityFeed: Story = {
  args: {
    isOpen: true,
    title: 'Recent Activity',
    children: (
      <div className="space-y-3">
        <div className="p-3 rounded-lg bg-zinc-800 border border-white/10">
          <p className="text-sm text-white font-semibold">Income Added</p>
          <p className="text-xs text-zinc-400 mt-1">$5,000 - Salary</p>
        </div>
        <div className="p-3 rounded-lg bg-zinc-800 border border-white/10">
          <p className="text-sm text-white font-semibold">Expense Added</p>
          <p className="text-xs text-zinc-400 mt-1">$120 - Groceries</p>
        </div>
      </div>
    ),
  },
};

export const OpenWithCustomContent: Story = {
  args: {
    isOpen: true,
    title: 'Saki Assistant',
    children: (
      <div className="space-y-4">
        <p className="text-sm text-zinc-400">Ask me anything about your finances!</p>
        <textarea 
          className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-white/10"
          placeholder="Type your question here..."
          rows={4}
        />
        <button className="px-4 py-2 rounded-lg bg-purple-600 text-white font-semibold">
          Send
        </button>
      </div>
    ),
  },
};
