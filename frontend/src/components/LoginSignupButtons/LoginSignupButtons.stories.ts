import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import { LoginSignupButtons } from './LoginSignupButtons';

const meta = {
  title: 'Components/LoginSignupButtons',
  component: LoginSignupButtons,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isAuthenticated: { control: 'boolean' },
  },
  args: {
    isAuthenticated: false,
    onLoginOrDashboard: fn(),
    onSignup: fn(),
  },
} satisfies Meta<typeof LoginSignupButtons>;

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

export const WithHandlers: Story = {
  args: {
    isAuthenticated: false,
    // Override to show separate actions in the panel
    onLoginOrDashboard: fn(),
    onSignup: fn(),
  },
};
