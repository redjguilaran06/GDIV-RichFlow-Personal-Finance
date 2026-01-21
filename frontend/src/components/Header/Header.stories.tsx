import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn, expect, userEvent, within } from 'storybook/test';

import Header from './Header';

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#0a0a0a' },
        { name: 'light', value: '#ffffff' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    hideActions: { control: 'boolean' },
    balanceSheetVisible: { control: 'boolean' },
    balanceSheetExists: { control: 'boolean' },
    sidebarOpen: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultHeader: Story = {
  args: {
    title: 'Dashboard',
    hideActions: false,
    balanceSheetExists: false,
    balanceSheetVisible: false,
    onToggleSidebar: fn(),
    onAddBalanceSheet: fn(),
    onToggleBalanceSheet: fn(),
    sidebarOpen: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Default header with title and hamburger menu toggle. Click the hamburger menu (≡) to trigger the onToggleSidebar handler. Check Actions panel for callback events.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify header title is displayed
    const title = await canvas.findByRole('heading', { name: /Dashboard/i }, { timeout: 3000 });
    await expect(title).toBeInTheDocument();
    
    // Verify hamburger menu button exists
    const hamburgerBtn = await canvas.findByRole('button', { name: /Toggle menu/i }, { timeout: 3000 });
    await expect(hamburgerBtn).toBeInTheDocument();
    
    // Click hamburger to test callback
    await userEvent.click(hamburgerBtn);
  },
};

export const HeaderWithBalanceSheet: Story = {
  args: {
    title: 'Financial Overview',
    hideActions: false,
    balanceSheetExists: true,
    balanceSheetVisible: true,
    onToggleSidebar: fn(),
    onAddBalanceSheet: fn(),
    onToggleBalanceSheet: fn(),
    sidebarOpen: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Header with balance sheet dropdown menu. Click the menu dropdown to reveal balance sheet options. Test toggling balance sheet visibility through the dropdown. Check Actions panel for callbacks.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify title is displayed
    const title = await canvas.findByRole('heading', { name: /Financial Overview/i }, { timeout: 3000 });
    await expect(title).toBeInTheDocument();
    
    // Find and click the dropdown menu button (should be the three-dots menu)
    const buttons = await canvas.findAllByRole('button', {}, { timeout: 3000 });
    
    // The menu button should be one of the buttons (typically the last one)
    if (buttons.length > 1) {
      const menuButton = buttons[buttons.length - 1];
      await userEvent.click(menuButton);
    }
  },
};

export const HeaderWithActionsHidden: Story = {
  args: {
    title: 'Settings',
    hideActions: true,
    balanceSheetExists: true,
    balanceSheetVisible: true,
    onToggleSidebar: fn(),
    onAddBalanceSheet: fn(),
    onToggleBalanceSheet: fn(),
    sidebarOpen: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Header with actions menu hidden (no dropdown button visible). Useful for pages that don\'t need balance sheet controls. Only shows title and hamburger menu. Check Actions panel when clicking hamburger.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify title is displayed
    const title = await canvas.findByRole('heading', { name: /Settings/i }, { timeout: 3000 });
    await expect(title).toBeInTheDocument();
    
    // Verify hamburger menu button exists
    const hamburgerBtn = await canvas.findByRole('button', { name: /Toggle menu/i }, { timeout: 3000 });
    await expect(hamburgerBtn).toBeInTheDocument();
    
    // Verify only hamburger button is visible (no add/menu button)
    const buttons = await canvas.findAllByRole('button', {}, { timeout: 3000 });
    await expect(buttons.length).toBe(1); // Only hamburger
    
    // Click hamburger to test callback
    await userEvent.click(hamburgerBtn);
  },
};
