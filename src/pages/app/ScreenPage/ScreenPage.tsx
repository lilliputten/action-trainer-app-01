import { useLocation, useParams } from 'react-router-dom';
import { ScreenWrapper } from 'src/components/screens/ScreenWrapper';

export function ScreenPage() {
  const { scenario, screen } = useParams();
  const location = useLocation();
  const { pathname } = location;
  return (
    <ScreenWrapper>
      <h1>Screen page</h1>
      <p>
        Page: <u>{pathname}</u>
      </p>
      <p>
        Scenario: <u>{scenario}</u>
      </p>
      <p>
        Screen: <u>{screen}</u>
      </p>
    </ScreenWrapper>
  );
}
