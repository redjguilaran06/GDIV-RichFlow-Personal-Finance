import React from 'react';

export interface LoginSignupButtonsProps {
  isAuthenticated?: boolean;
  onLoginOrDashboard?: () => void;
  onSignup?: () => void;
}

export const LoginSignupButtons: React.FC<LoginSignupButtonsProps> = ({
  isAuthenticated = false,
  onLoginOrDashboard,
  onSignup,
}) => {
  return (
    <div className="flex gap-4 items-center">
      <button
        type="button"
        onClick={onLoginOrDashboard}
        className="px-6 py-3 rounded-xl font-semibold text-base bg-(--color-purple) text-(--color-gold) transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-(--color-gold) focus:ring-offset-2 focus:ring-offset-(--color-dark)"
      >
        {isAuthenticated ? 'Dashboard' : 'Log in'}
      </button>
      <button
        type="button"
        onClick={onSignup}
        className="px-6 py-3 rounded-xl font-semibold text-base bg-(--color-purple) text-(--color-gold) transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-(--color-gold) focus:ring-offset-2 focus:ring-offset-(--color-dark)"
      >
        Sign up
      </button>
    </div>
  );
};

export default LoginSignupButtons;
