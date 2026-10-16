import Button from '../components/ui/Button.jsx';
import EmptyState from '../components/ui/EmptyState.jsx';
import useDocumentTitle from '../hooks/useDocumentTitle.js';

export default function NotFoundPage() {
  useDocumentTitle('Page not found');
  return (
    <EmptyState
      icon="compass"
      title="Page not found"
      message="This page does not exist. Let's get you back to the books."
      action={<Button to="/">Go to Home</Button>}
    />
  );
}
