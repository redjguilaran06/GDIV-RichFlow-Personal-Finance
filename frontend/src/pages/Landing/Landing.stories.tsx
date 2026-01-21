import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useEffect } from 'react';
import { expect, userEvent, within } from 'storybook/test';
import { MemoryRouter } from 'react-router-dom';

import Landing from './Landing';
import { AuthProvider, useAuth } from '../../context/AuthContext';
import { authAPI } from '../../utils/api';

const mockUser = {
  id: 'demo-user',
  name: 'Demo User',
  email: 'demo@example.com',
  createdAt: new Date().toISOString(),
};

authAPI.login = async () => ({ user: mockUser });
authAPI.logout = async () => {};
authAPI.getProfile = async () => ({ user: mockUser });

type LandingStoryArgs = { isAuthenticated: boolean };

const AuthStateController: React.FC<LandingStoryArgs> = ({ isAuthenticated }) => {
  const { isAuthenticated: ctxAuth, login, logout, loading } = useAuth();

  useEffect(() => {
    if (loading) return;
    if (isAuthenticated && !ctxAuth) {
      login('demo@example.com', 'password');
    } else if (!isAuthenticated && ctxAuth) {
      logout();
    }
  }, [isAuthenticated, ctxAuth, loading, login, logout]);

  return null;
};

const meta = {
  title: 'Pages/Landing',
  component: Landing,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    isAuthenticated: {
      control: 'boolean',
      description: 'Shows Dashboard when authenticated',
    },
  },
  args: {
    isAuthenticated: false,
  },
  decorators: [
    (Story, context: any) => (
      <MemoryRouter initialEntries={['/']}>
        <AuthProvider>
          <AuthStateController isAuthenticated={context.args?.isAuthenticated ?? false} />
          <Story />
        </AuthProvider>
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof Landing>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedOut: Story = {
  args: {
    isAuthenticated: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Landing page for non-authenticated users. Shows the welcome screen, features overview, and sign-up/login options. This is the first page users see when visiting the application.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Find and interact with sign up or login buttons
    const buttons = await canvas.findAllByRole('button', {}, { timeout: 3000 });
    if (buttons.length > 0) {
      await expect(buttons[0]).toBeInTheDocument();
      await userEvent.click(buttons[0]);
    }
  },
};

export const Authenticated: Story = {
  args: {
    isAuthenticated: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Landing page for authenticated users. Automatically redirects to the dashboard, showing the user\'s financial overview and main navigation.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Wait for dashboard to load
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Verify dashboard content is present
    const dashboardElements = await canvas.findAllByRole('button', {}, { timeout: 3000 });
    await expect(dashboardElements.length).toBeGreaterThan(0);
  },
};
