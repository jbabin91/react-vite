import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import App from '@/App';

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<App />);
    expect(baseElement).toBeTruthy();
  });

  it('should have a title', () => {
    const { getByText } = render(<App />);
    expect(getByText(/react starter/i)).toBeTruthy();
  });

  it('should have a button', () => {
    const { getByText } = render(<App />);
    expect(getByText(/count is 0/i)).toBeTruthy();
  });

  it('should increment the count when the button is clicked', async () => {
    const { getByText } = render(<App />);
    const button = getByText(/count is 0/i);
    await userEvent.click(button);
    expect(getByText(/count is 1/i)).toBeTruthy();
  });
});
