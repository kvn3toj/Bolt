import React, { useEffect, useState } from 'react';
import { 
  Menu, Search, MessageSquare, Bell, AlertTriangle, 
  CheckCircle, XCircle, ArrowUpRight, ArrowDownRight, BarChart, PieChart, Clock
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { BottomNavigation } from '../components/BottomNavigation';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"

export function Analytics() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('performance');
  const [timeRange, setTimeRange] = useState('month');
  const [videoWatchTime, setVideoWatchTime] = useState(0);
  const [quizScores, setQuizScores] = useState<number[]>([]);
  const [productViews, setProductViews] = useState(0);

  // Simulated performance metrics
  const performanceMetrics = {
    responseTime: {
      current: 250,
      previous: 280,
      unit: 'ms',
      trend: 'down',
      improvement: true
    },
    errorRate: {
      current: 0.8,
      previous: 1.2,
      unit: '%',
      trend: 'down',
      improvement: true
    },
    availability: {
      current: 99.95,
      previous: 99.90,
      unit: '%',
      trend: 'up',
      improvement: true
    },
    cpuUsage: {
      current: 45,
      previous: 52,
      unit: '%',
      trend: 'down',
      improvement: true
    }
  };

  // Simulated user metrics
  const userMetrics = {
    activeUsers: {
      current: 12500,
      previous: 11000,
      trend: 'up',
      improvement: true
    },
    conversionRate: {
      current: 3.2,
      previous: 2.8,
      unit: '%',
      trend: 'up',
      improvement: true
    },
    avgSessionTime: {
      current: 15,
      previous: 12,
      unit: 'min',
      trend: 'up',
      improvement: true
    },
    bounceRate: {
      current: 35,
      previous: 38,
      unit: '%',
      trend: 'down',
      improvement: true
    }
  };

  // Simulated security metrics
  const securityMetrics = {
    unauthorizedAttempts: {
      current: 145,
      previous: 167,
      trend: 'down',
      improvement: true
    },
    suspiciousActivities: {
      current: 23,
      previous: 28,
      trend: 'down',
      improvement: true
    },
    securityUpdates: {
      current: 12,
      previous: 8,
      trend: 'up',
      improvement: true
    },
    resolvedIncidents: {
      current: 18,
      previous: 15,
      trend: 'up',
      improvement: true
    }
  };

  // Daily transaction data for the graph
  const transactionData = {
    labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
    values: [
      8500, 9200, 8800, 9500, 9800, 9300, 8900,
      9100, 9400, 9600, 9200, 8800, 8600, 8900,
      9300, 9700, 9500, 9200, 9400, 9800, 10100,
      9900, 9600, 9400, 9200, 9500, 9800, 10000,
      10200, 10500
    ]
  };

  // Usage patterns by hour
  const hourlyUsage = Array.from({ length: 24 }, (_, hour) => ({
    hour,
    users: Math.floor(1000 + Math.sin(hour / 3) * 500 + Math.random() * 200)
  }));

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      if (!user) {
        setLoading(false); // Asegurarse de detener la carga si no hay usuario
        return;
      }
      try {
        setLoading(true);
        
        // Fetch video progress
        const { data: watchTimeData, error: watchTimeError } = await supabase
          .from('user_video_progress')
          .select('total_watch_time')
          .eq('user_id', user.id)
          .single();

        if (watchTimeError) throw watchTimeError;

        // Fetch quiz results
        const { data: quizScoreData, error: quizScoreError } = await supabase
          .from('user_quiz_attempts')
          .select('score')
          .eq('user_id', user.id);
        
        if (quizScoreError) throw quizScoreError;

        // Fetch product views
        const { data: productViewData, error: productViewError } = await supabase
          .from('user_product_views')
          .select('view_count', { count: 'exact' })
          .eq('user_id', user.id);
        
        if (productViewError) throw productViewError;

        if (watchTimeData && quizScoreData && productViewData) {
          setVideoWatchTime(watchTimeData.total_watch_time || 0);
          setQuizScores(quizScoreData.map((q) => q.score));
          setProductViews(productViewData.length || 0);
        }
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyticsData();

  }, [user]); // La dependencia es solo user ahora

  const averageQuizScore = quizScores.length > 0 ? quizScores.reduce((a, b) => a + b, 0) / quizScores.length : 0;

  const renderMetricCard = (
    title: string,
    current: number,
    previous: number,
    unit: string = '',
    trend: 'up' | 'down' = 'up',
    improvement: boolean = true
  ) => {
    const change = ((current - previous) / previous) * 100;
    const formattedChange = Math.abs(change).toFixed(1);

    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-sm font-medium text-gray-500 mb-2">{title}</h3>
        <div className="flex items-end justify-between">
          <div>
            <p className="text-2xl font-bold text-gray-900">
              {current}
              {unit && <span className="text-sm ml-1">{unit}</span>}
            </p>
            <div className={`flex items-center mt-2 ${
              improvement ? 'text-green-600' : 'text-red-600'
            }`}>
              {trend === 'up' ? (
                <ArrowUpRight className="w-4 h-4 mr-1" />
              ) : (
                <ArrowDownRight className="w-4 h-4 mr-1" />
              )}
              <span className="text-sm">{formattedChange}%</span>
            </div>
          </div>
          <div className={`h-16 w-24 flex items-end ${
            improvement ? 'text-green-500' : 'text-red-500'
          }`}>
            {/* Simplified graph representation */}
            <div className="flex-1 bg-current h-8 rounded-sm opacity-20" />
            <div className="flex-1 bg-current h-12 rounded-sm opacity-40 mx-px" />
            <div className="flex-1 bg-current h-10 rounded-sm" />
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto bg-gray-50 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-white px-4 py-2 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <button className="p-2" aria-label="Open menu">
              <Menu className="w-6 h-6 text-gray-600" />
            </button>
            <h1 className="ml-2 text-xl font-semibold">ÜStats</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2" aria-label="Search">
              <Search className="w-6 h-6 text-gray-600" />
            </button>
            <button className="p-2" aria-label="Messages">
              <MessageSquare className="w-6 h-6 text-gray-600" />
            </button>
            <button className="p-2 relative" aria-label="Notifications">
              <Bell className="w-6 h-6 text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-4 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('performance')}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'performance'
                ? 'text-purple-600 border-b-2 border-purple-600'
                : 'text-gray-500'
            }`}
          >
            Rendimiento
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'users'
                ? 'text-purple-600 border-b-2 border-purple-600'
                : 'text-gray-500'
            }`}
          >
            Usuarios
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'security'
                ? 'text-purple-600 border-b-2 border-purple-600'
                : 'text-gray-500'
            }`}
          >
            Seguridad
          </button>
        </div>

        {/* Time Range Selector */}
        <div className="flex space-x-2 mt-4">
          {['day', 'week', 'month', 'year'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 text-sm rounded-full ${
                timeRange === range
                  ? 'bg-purple-100 text-purple-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4">
        {/* Performance Metrics */}
        {activeTab === 'performance' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {renderMetricCard(
                'Tiempo de Respuesta',
                performanceMetrics.responseTime.current,
                performanceMetrics.responseTime.previous,
                'ms',
                'down',
                true
              )}
              {renderMetricCard(
                'Tasa de Error',
                performanceMetrics.errorRate.current,
                performanceMetrics.errorRate.previous,
                '%',
                'down',
                true
              )}
              {renderMetricCard(
                'Disponibilidad',
                performanceMetrics.availability.current,
                performanceMetrics.availability.previous,
                '%',
                'up',
                true
              )}
              {renderMetricCard(
                'Uso de CPU',
                performanceMetrics.cpuUsage.current,
                performanceMetrics.cpuUsage.previous,
                '%',
                'down',
                true
              )}
            </div>

            {/* Transaction Volume Graph */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <h3 className="text-lg font-medium mb-4">Volumen de Transacciones</h3>
              <div className="h-64">
                <div className="h-full flex items-end space-x-1">
                  {transactionData.values.map((value, index) => (
                    <div
                      key={index}
                      className="flex-1 bg-purple-600 rounded-t opacity-80 hover:opacity-100 transition-opacity"
                      style={{ height: `${(value / Math.max(...transactionData.values)) * 100}%` }}
                    />
                  ))}
                </div>
              </div>
              <div className="flex justify-between mt-4 text-sm text-gray-500">
                <span>1 {timeRange}</span>
                <span>15 {timeRange}s</span>
                <span>30 {timeRange}s</span>
              </div>
            </div>
          </>
        )}

        {/* User Metrics */}
        {activeTab === 'users' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {renderMetricCard(
                'Usuarios Activos',
                userMetrics.activeUsers.current,
                userMetrics.activeUsers.previous,
                '',
                'up',
                true
              )}
              {renderMetricCard(
                'Tasa de Conversión',
                userMetrics.conversionRate.current,
                userMetrics.conversionRate.previous,
                '%',
                'up',
                true
              )}
              {renderMetricCard(
                'Tiempo Promedio',
                userMetrics.avgSessionTime.current,
                userMetrics.avgSessionTime.previous,
                'min',
                'up',
                true
              )}
              {renderMetricCard(
                'Tasa de Rebote',
                userMetrics.bounceRate.current,
                userMetrics.bounceRate.previous,
                '%',
                'down',
                true
              )}
            </div>
            
            {/* Hourly Usage Pattern */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-medium mb-4">Patrones de Uso por Hora</h3>
              <div className="h-64">
                <div className="h-full flex items-end space-x-1">
                  {hourlyUsage.map((data, index) => (
                    <div
                      key={index}
                      className="flex-1 bg-purple-600 rounded-t opacity-80 hover:opacity-100 transition-opacity"
                      style={{ height: `${(data.users / Math.max(...hourlyUsage.map(d => d.users))) * 100}%` }}
                    />
                  ))}
                </div>
              </div>
              <div className="flex justify-between mt-4 text-sm text-gray-500">
                <span>00:00</span>
                <span>12:00</span>
                <span>23:59</span>
              </div>
            </div>
          </>
        )}

        {/* Security Metrics */}
        {activeTab === 'security' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {renderMetricCard(
                'Intentos No Autorizados',
                securityMetrics.unauthorizedAttempts.current,
                securityMetrics.unauthorizedAttempts.previous,
                '',
                'down',
                true
              )}
              {renderMetricCard(
                'Actividades Sospechosas',
                securityMetrics.suspiciousActivities.current,
                securityMetrics.suspiciousActivities.previous,
                '',
                'down',
                true
              )}
              {renderMetricCard(
                'Actualizaciones de Seguridad',
                securityMetrics.securityUpdates.current,
                securityMetrics.securityUpdates.previous,
                '',
                'up',
                true
              )}
              {renderMetricCard(
                'Incidentes Resueltos',
                securityMetrics.resolvedIncidents.current,
                securityMetrics.resolvedIncidents.previous,
                '',
                'up',
                true
              )}
            </div>
            
            {/* Security Incidents Timeline */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-medium mb-4">Línea de Tiempo de Incidentes</h3>
              <div className="space-y-4">
                {[
                  {
                    type: 'success',
                    message: 'Actualización de seguridad completada',
                    time: '2 horas atrás'
                  },
                  {
                    type: 'warning',
                    message: 'Detectados múltiples intentos de acceso',
                    time: '5 horas atrás'
                  },
                  {
                    type: 'error',
                    message: 'Intento de acceso no autorizado bloqueado',
                    time: '1 día atrás'
                  }
                ].map((incident, index) => (
                  <div
                    key={index}
                    className="flex items-center p-4 rounded-lg bg-gray-50"
                  >
                    {incident.type === 'success' && (
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    )}
                    {incident.type === 'warning' && (
                      <AlertTriangle className="w-5 h-5 text-yellow-500 mr-3" />
                    )}
                    {incident.type === 'error' && (
                      <XCircle className="w-5 h-5 text-red-500 mr-3" />
                    )}
                    <div className="flex-1">
                      <p className="font-medium">{incident.message}</p>
                      <p className="text-sm text-gray-500">{incident.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      <div className="p-4">
        <h2 className="text-2xl font-semibold mb-4">Resumen de Análisis</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                Total Video Watch Time
              </CardTitle>
              <Clock className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-500">{Math.round(videoWatchTime / 60)} mins</div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                Average Quiz Score
              </CardTitle>
              <BarChart className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">{averageQuizScore.toFixed(1)}%</div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                Product Views
              </CardTitle>
              <PieChart className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-500">{productViews}</div>
            </CardContent>
          </Card>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}