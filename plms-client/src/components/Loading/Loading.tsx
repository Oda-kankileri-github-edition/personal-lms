import { ReactElement } from 'react';

/**
 * Spinner for loading state after.
 * @category Component
 */
export default function LoadingSpinner(): ReactElement {
  return (
    <div>
      <div className="loading-spinner" data-testid="loading"></div>
    </div>
  );
}
