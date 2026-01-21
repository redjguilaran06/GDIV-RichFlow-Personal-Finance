import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import RightSidePanel from './RightSidePanel';

const meta = {
  title: 'Components/RightSidePanel',
  component: RightSidePanel,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: { control: 'boolean' },
    title: { control: 'text' },
  },
  args: {
    isOpen: true,
    onClose: fn(),
  },
} satisfies Meta<typeof RightSidePanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ActivityFeed: Story = {
  args: {
    isOpen: true,
    title: 'Recent Activity',
    onClose: fn(),
    children: (
      <div className="space-y-3">
        <div className="p-3 rounded-lg bg-zinc-800 border border-white/10 hover:border-white/20 transition-colors" data-testid="activity-income">
          <div className="flex items-start justify-between mb-2">
            <p className="text-sm text-white font-semibold">💰 Income Added</p>
            <span className="text-xs text-zinc-500">2 hours ago</span>
          </div>
          <p className="text-xs text-zinc-400 mt-1">$5,000.00 - Monthly Salary</p>
          <div className="mt-2 text-xs text-green-400">+$5,000.00</div>
        </div>
        <div className="p-3 rounded-lg bg-zinc-800 border border-white/10 hover:border-white/20 transition-colors" data-testid="activity-expense">
          <div className="flex items-start justify-between mb-2">
            <p className="text-sm text-white font-semibold">🛒 Expense Added</p>
            <span className="text-xs text-zinc-500">5 hours ago</span>
          </div>
          <p className="text-xs text-zinc-400 mt-1">$120.50 - Groceries</p>
          <div className="mt-2 text-xs text-red-400">-$120.50</div>
        </div>
        <div className="p-3 rounded-lg bg-zinc-800 border border-white/10 hover:border-white/20 transition-colors" data-testid="activity-investment">
          <div className="flex items-start justify-between mb-2">
            <p className="text-sm text-white font-semibold">📊 Investment Update</p>
            <span className="text-xs text-zinc-500">1 day ago</span>
          </div>
          <p className="text-xs text-zinc-400 mt-1">Portfolio value increased</p>
          <div className="mt-2 text-xs text-green-400">+$250.00 (+2.5%)</div>
        </div>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Activity Feed panel showing recent financial transactions. Test the close button in the top-right corner to trigger the onClose handler. Includes test IDs for automated testing.',
      },
    },
  },
};

export const SakiAssistant: Story = {
  args: {
    isOpen: true,
    title: '🤖 Saki - AI Financial Assistant',
    onClose: fn(),
    children: (
      <div className="space-y-4">
        <div className="p-4 rounded-lg bg-purple-900/20 border border-purple-500/20">
          <p className="text-sm text-purple-200">👋 Hi! I'm Saki, your AI financial assistant.</p>
          <p className="text-xs text-purple-300/70 mt-2">Ask me anything about your finances, budgeting, or financial goals!</p>
        </div>
        
        <div className="space-y-3">
          <div className="p-3 rounded-lg bg-zinc-800/50 border border-white/5">
            <p className="text-xs text-zinc-400 mb-1">Suggested questions:</p>
            <button className="text-xs text-purple-400 hover:text-purple-300 block mt-1" data-testid="question-savings">💡 How can I improve my savings rate?</button>
            <button className="text-xs text-purple-400 hover:text-purple-300 block mt-1" data-testid="question-networth">📈 What's my net worth trend?</button>
            <button className="text-xs text-purple-400 hover:text-purple-300 block mt-1" data-testid="question-goals">🎯 Help me set financial goals</button>
          </div>
        </div>
        
        <textarea 
          className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-white/10 focus:border-purple-500/50 focus:outline-none resize-none"
          placeholder="Type your question here..."
          rows={4}
          data-testid="saki-input"
        />
        <button 
          className="w-full px-4 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-semibold transition-all"
          data-testid="saki-send"
        >
          Send Message
        </button>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Saki AI Assistant panel with interactive elements. Test the close button, suggested question buttons, input field, and send button. All elements have test IDs for automated testing.',
      },
    },
  },
};

export const SettingsPanel: Story = {
  args: {
    isOpen: true,
    title: '⚙️ Settings',
    onClose: fn(),
    children: (
      <div className="space-y-4">
        <div className="border-b border-white/10 pb-4">
          <h3 className="text-white font-semibold mb-3">Preferences</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between" data-testid="toggle-darkmode">
              <span className="text-sm text-zinc-300">Dark Mode</span>
              <button className="w-12 h-6 bg-purple-600 rounded-full relative" data-testid="darkmode-toggle">
                <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
              </button>
            </div>
            <div className="flex items-center justify-between" data-testid="toggle-notifications">
              <span className="text-sm text-zinc-300">Notifications</span>
              <button className="w-12 h-6 bg-zinc-700 rounded-full relative" data-testid="notifications-toggle">
                <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5"></div>
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-b border-white/10 pb-4">
          <h3 className="text-white font-semibold mb-3">Account</h3>
          <div className="space-y-2">
            <button className="w-full text-left text-sm text-zinc-300 hover:text-white p-2 rounded hover:bg-zinc-800" data-testid="btn-edit-profile">
              Edit Profile
            </button>
            <button className="w-full text-left text-sm text-zinc-300 hover:text-white p-2 rounded hover:bg-zinc-800" data-testid="btn-change-password">
              Change Password
            </button>
            <button className="w-full text-left text-sm text-zinc-300 hover:text-white p-2 rounded hover:bg-zinc-800" data-testid="btn-currency-settings">
              Currency Settings
            </button>
          </div>
        </div>
        
        <button className="w-full px-4 py-2 rounded-lg border border-red-500/50 text-red-400 hover:bg-red-500/10 font-semibold transition-all" data-testid="btn-signout">
          Sign Out
        </button>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Settings panel with preference toggles and account management options. Test the close button to trigger onClose handler. All interactive elements have test IDs for E2E testing.',
      },
    },
  },
};
