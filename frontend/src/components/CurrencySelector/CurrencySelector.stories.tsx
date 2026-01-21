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
  },
  tags: ['autodocs'],
  args: { onCurrencyChange: fn() },
  decorators: [
    (Story, context: StoryContext<StorybookArgs>) => (
      <AuthProvider>
        <CurrencyProvider>
          {/* Optional controllers driven by args */}
          {context.args?.authenticated !== undefined && (
            <AuthStateController authenticated={!!context.args.authenticated} />
          )}
          {context.args?.initialCurrencyId && (
            <CurrencyStateController initialCurrencyId={context.args.initialCurrencyId} />
          )}
          <Story />
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
};

export const PreselectedEuro: Story = {
  args: {
    authenticated: false,
    initialCurrencyId: 2,
  },
};

export const AuthenticatedUserCurrency: Story = {
  args: {
    authenticated: true,
  },
};
