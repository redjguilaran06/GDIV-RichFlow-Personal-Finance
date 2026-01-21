import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import { LoginSignupButtons } from './LoginSignupButtons';

const meta = {
  title: 'Components/LoginSignupButtons',
  component: LoginSignupButtons,
  parameters: {
    layout: 'centered',
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
    isAuthenticated: { control: 'boolean' },
  },
  args: {
    isAuthenticated: false,
  },
} satisfies Meta<typeof LoginSignupButtons>;

export default meta;

type Story = StoryObj<typeof meta>;

export const LoggedOut: Story = {
  args: {
    isAuthenticated: false,
    onLoginOrDashboard: undefined,
    onSignup: undefined,
  },
  parameters: {
    docs: {
      description: {
        story: 'Logged out state with NO click handlers. Buttons are visible but clicking them does nothing - useful for visual testing only.',
      },
    },
  },
};

export const Authenticated: Story = {
  args: {
    isAuthenticated: true,
    onLoginOrDashboard: undefined,
  },
  parameters: {
    docs: {
      description: {
        story: 'Authenticated state showing the "Go to Dashboard" button. No handlers attached in this variant.',
      },
    },
  },
};

export const WithHandlers: Story = {
  args: {
    isAuthenticated: false,
    onLoginOrDashboard: fn(),
    onSignup: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'Logged out state WITH active click handlers. Click the buttons and watch the Actions panel at the bottom to see the events being logged. This demonstrates that the button interactions work correctly.',
      },
    },
  },
};

export const AuthenticatedWithHandler: Story = {
  args: {
    isAuthenticated: true,
    onLoginOrDashboard: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'Authenticated state with click handler. Click "Go to Dashboard" and see the action logged below.',
      },
    },
  },
};
