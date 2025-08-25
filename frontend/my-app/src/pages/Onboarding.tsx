import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

export default function Onboarding() {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h1>Welcome to the inventory!</h1>
      <p>Start organizing your products </p>
      <Button onClick={() => navigate('/products')}>Start Here</Button>
    </div>
  );
}
