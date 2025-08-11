import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import StockOverview from '../components/dashboard/StockOverview';
import LowStockAlerts from '../components/dashboard/LowStockAlerts';

function Dashboard() {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Carregando...</p>
      </div>
    );
  }
  return (
    <div className="bg-[#8FD3D5] pt-16 md:pl-64 pl-0 ">
      <div className="p-6">
        <h1 className="text-2xl text-center text-[#f68597] border-[#93c2d2] bg-[#feebee] p-2 border rounded-2xl font-bold mb-6">
          Painel de controle
        </h1>
        <div className="space-y-8">
          <StockOverview />
          <LowStockAlerts />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
