import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { MemoryRouter } from 'react-router-dom';

import Analysis from './Analysis';
import { AuthProvider } from '../../context/AuthContext';
import { CurrencyProvider } from '../../context/CurrencyContext';
import { authAPI, analysisAPI } from '../../utils/api';

// Mock financial data
const mockSnapshotData = {
  date: '2026-01-21',
  balanceSheet: {
    totalCashBalance: 15000,
    totalCash: 15000,
    totalInvestedAssets: 50000,
    totalAssets: 65000,
    totalLiabilities: 20000,
    netWorth: 45000,
  },
  cashflow: {
    earnedIncome: 5000,
    passiveIncome: 1500,
    portfolioIncome: 500,
    totalIncome: 7000,
    totalExpenses: 3500,
    netCashflow: 3500,
    direction: 'positive',
  },
  ratios: {
    passiveCoverageRatio: '57.14%',
    savingsRate: '50.00%',
  },
  richFlowMetrics: {
    wealthVelocity: 7.78,
    wealthVelocityPct: 7.78,
    solvencyRatio: 3.25,
    freedomGap: 2000,
  },
  incomeQuadrant: {
    EMPLOYEE: { amount: 5000, pct: 71.43 },
    SELF_EMPLOYED: { amount: 0, pct: 0 },
    BUSINESS_OWNER: { amount: 1500, pct: 21.43 },
    INVESTOR: { amount: 500, pct: 7.14 },
    total: 7000,
  },
  financialHealth: {
    runway: 4.29,
    freedomDate: '2027-08-15',
    assetEfficiency: 10.77,
    trends: {
      netWorth: 5.2,
      cashflow: 3.8,
    },
  },
  currency: { symbol: '$', name: 'US Dollar' },
};

// Stub APIs
authAPI.getProfile = async () => ({
  user: {
    id: 'demo',
    name: 'Demo User',
    email: 'demo@example.com',
    createdAt: new Date().toISOString(),
  },
});

analysisAPI.getFinancialSnapshot = async () => mockSnapshotData;

const meta = {
  title: 'Pages/Analysis',
  component: Analysis,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
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
} satisfies Meta<typeof Analysis>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Loading: Story = {
  decorators: [
    (Story) => {
      // Override API to delay response
      analysisAPI.getFinancialSnapshot = async () => {
        await new Promise(resolve => setTimeout(resolve, 5000));
        return mockSnapshotData;
      };
      return <Story />;
    },
  ],
};

export const WithInteraction: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Wait for content to load
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Look for the hamburger menu button (mobile sidebar toggle)
    const menuButton = canvas.queryByRole('button', { name: /menu/i });
    if (menuButton) {
      await expect(menuButton).toBeInTheDocument();
      await userEvent.click(menuButton);
    }
    
    // Check for key financial metrics
    const netWorthText = await canvas.findByText(/net worth/i, {}, { timeout: 3000 });
    await expect(netWorthText).toBeInTheDocument();
  },
};
