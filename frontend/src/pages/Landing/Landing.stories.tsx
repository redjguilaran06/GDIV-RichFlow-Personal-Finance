import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useEffect } from 'react';
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
      <MemoryRouter>
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
};

export const Authenticated: Story = {
  args: {
    isAuthenticated: true,
  },
};
