import { useNavigate } from 'react-router-dom';

export default function Onboarding() {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h1 style={{fontSize:'3rem'}}>Welcome to the inventory!</h1>
      <p>Start organizing your products </p>
      <button style={{fontSize:'1rem' }} onClick={() => navigate('/product')}>Start Here</button>
    </div>
  );
}
