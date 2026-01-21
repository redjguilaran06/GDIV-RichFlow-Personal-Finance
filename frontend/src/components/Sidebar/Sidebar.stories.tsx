import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { MemoryRouter } from 'react-router-dom';

import Sidebar from './Sidebar';
import { AuthProvider } from '../../context/AuthContext';
import { CurrencyProvider } from '../../context/CurrencyContext';
import { authAPI } from '../../utils/api';

// Stub auth API
authAPI.getProfile = async () => ({ 
  user: { 
    id: 'demo', 
    name: 'Demo User', 
    email: 'demo@example.com', 
    createdAt: new Date().toISOString() 
  } 
});

const meta = {
  title: 'Components/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  args: {
    onOpenAssistant: fn(),
    onOpenActivity: fn(),
    onToggleSidebar: fn(),
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <AuthProvider>
          <CurrencyProvider>
            <Story />
          </CurrencyProvider>
        </AuthProvider>
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {
  args: {
    mobileOpen: false,
  },
};

export const OnDashboard: Story = {
  args: {
    mobileOpen: false,
  },
};

export const WithCallbacks: Story = {
  args: {
    mobileOpen: false,
    onOpenAssistant: fn(),
    onOpenActivity: fn(),
    onToggleSidebar: fn(),
  },
};
