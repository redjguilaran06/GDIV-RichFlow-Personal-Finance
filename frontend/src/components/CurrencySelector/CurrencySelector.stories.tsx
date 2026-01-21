import type { Meta, StoryObj } from '@storybook/react-vite';
import type { StoryContext } from '@storybook/react-vite';
import React, { useEffect } from 'react';
import { fn } from 'storybook/test';

import CurrencySelector from './CurrencySelector';
import { AuthProvider, useAuth } from '../../context/AuthContext';
import { CurrencyProvider, useCurrency } from '../../context/CurrencyContext';
import { currencyAPI, authAPI } from '../../utils/api';
import type { Currency } from '../../types/currency.types';
import type { CurrencySelectorProps } from './CurrencySelector';

type StorybookArgs = CurrencySelectorProps & {
  authenticated?: boolean;
  initialCurrencyId?: number;
};

// Mock data for Storybook
const mockCurrencies: Currency[] = [
  { id: 1, cur_symbol: '$', cur_name: 'US Dollar' },
  { id: 2, cur_symbol: '€', cur_name: 'Euro' },
  { id: 3, cur_symbol: '£', cur_name: 'British Pound' },
];

// Stub API calls to keep stories deterministic
currencyAPI.getCurrencies = async () => mockCurrencies;
currencyAPI.getUserCurrency = async () => mockCurrencies[1]; // Euro by default
authAPI.login = async () => ({ user: { id: 'demo', name: 'Demo', email: 'demo@example.com', createdAt: new Date().toISOString() } });
authAPI.getProfile = async () => ({ user: { id: 'demo', name: 'Demo', email: 'demo@example.com', createdAt: new Date().toISOString() } });

// Controller to toggle auth state for stories
const AuthStateController: React.FC<{ authenticated: boolean }> = ({ authenticated }) => {
  const { isAuthenticated, login, logout, loading } = useAuth();
  useEffect(() => {
    if (loading) return;
    if (authenticated && !isAuthenticated) {
      login('demo@example.com', 'password');
    } else if (!authenticated && isAuthenticated) {
      logout();
    }
  }, [authenticated, isAuthenticated, loading, login, logout]);
  return null;
};

// Controller to set initial currency selection
const CurrencyStateController: React.FC<{ initialCurrencyId?: number }> = ({ initialCurrencyId }) => {
  const { loading, setCurrency } = useCurrency();
  useEffect(() => {
    if (!loading && initialCurrencyId) {
      const found = mockCurrencies.find((c) => c.id === initialCurrencyId);
      if (found) setCurrency(found);
    }
  }, [loading, initialCurrencyId, setCurrency]);
  return null;
};

const meta = {
  title: 'Components/CurrencySelector',
  component: CurrencySelector,
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
  args: { onCurrencyChange: fn() },
  decorators: [
    (Story, context: StoryContext<StorybookArgs>) => (
      <AuthProvider>
        <CurrencyProvider>
          {context.args?.authenticated !== undefined && (
            <AuthStateController authenticated={!!context.args.authenticated} />
          )}
          {context.args?.initialCurrencyId && (
            <CurrencyStateController initialCurrencyId={context.args.initialCurrencyId} />
          )}
          <div style={{ padding: '3rem' }}>
            <Story />
          </div>
        </CurrencyProvider>
      </AuthProvider>
    ),
  ],
} satisfies Meta<StorybookArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    authenticated: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Default currency selector with no pre-selected currency. Shows all available currencies.',
      },
    },
  },
};

export const PreselectedEuro: Story = {
  args: {
    authenticated: false,
    initialCurrencyId: 2,
  },
  parameters: {
    docs: {
      description: {
        story: 'Currency selector with Euro (€) pre-selected. Demonstrates initial currency selection.',
      },
    },
  },
};

export const PreselectedPound: Story = {
  args: {
    authenticated: false,
    initialCurrencyId: 3,
  },
  parameters: {
    docs: {
      description: {
        story: 'Currency selector with British Pound (£) pre-selected.',
      },
    },
  },
};

export const AuthenticatedUserCurrency: Story = {
  args: {
    authenticated: true,
    initialCurrencyId: 2,
  },
  parameters: {
    docs: {
      description: {
        story: 'Currency selector for authenticated users. Shows how the selector works when user is logged in with their saved currency preference.',
      },
    },
  },
};
