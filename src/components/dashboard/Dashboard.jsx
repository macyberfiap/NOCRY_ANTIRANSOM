import React from 'react';
import { 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { 
  Shield, 
  AlertTriangle, 
  FileText, 
  Activity,
  TrendingUp,
  TrendingDown,
  Clock
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { dashboardMetrics, threatTrendData, threatTypeData } from '../../data/mockData';
import { formatNumber, formatRelativeTime } from '../../utils/helpers';

const MetricCard = ({ title, value, change, changeType, icon: Icon, color }) => {
  const isPositive = changeType === 'positive';
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;
  
  return (
    <Card className="relative overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-3xl font-bold text-gray-900">{value}</p>
            {change && (
              <div className={`flex items-center gap-1 text-sm ${
                isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                <TrendIcon className="h-4 w-4" />
                <span>{change}</span>
              </div>
            )}
          </div>
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const ThreatTrendChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-blue-600" />
          Tendência de Ameaças (24h)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={threatTrendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="time" 
              stroke="#666"
              fontSize={12}
            />
            <YAxis 
              stroke="#666"
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="threats" 
              stroke="#ef4444" 
              strokeWidth={2}
              dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
              name="Ameaças Detectadas"
            />
            <Line 
              type="monotone" 
              dataKey="blocked" 
              stroke="#10b981" 
              strokeWidth={2}
              dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
              name="Ameaças Bloqueadas"
            />
            <Legend />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

const ThreatTypeChart = () => {
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx, cy, midAngle, innerRadius, outerRadius, percent
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-orange-600" />
          Tipos de Ameaças
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={threatTypeData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {threatTypeData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

const SystemStatus = () => {
  const statusItems = [
    {
      label: 'Proteção em Tempo Real',
      status: 'active',
      description: 'Monitoramento ativo'
    },
    {
      label: 'Análise Comportamental',
      status: 'active',
      description: 'Detectando padrões suspeitos'
    },
    {
      label: 'Backup Automático',
      status: 'active',
      description: 'Última execução: há 2h'
    },
    {
      label: 'Atualizações de Definições',
      status: 'active',
      description: 'Atualizado há 30min'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-green-600" />
          Status do Sistema
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {statusItems.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <div>
                  <p className="font-medium text-gray-900">{item.label}</p>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </div>
              <Badge variant="success" size="sm">Ativo</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const RecentAlerts = () => {
  const recentAlerts = [
    {
      id: 1,
      type: 'critical',
      message: 'Ransomware detectado em /documents/',
      time: '2 min atrás',
      status: 'investigating'
    },
    {
      id: 2,
      type: 'medium',
      message: 'Comportamento suspeito em processo',
      time: '15 min atrás',
      status: 'monitoring'
    },
    {
      id: 3,
      type: 'low',
      message: 'Varredura completa finalizada',
      time: '1h atrás',
      status: 'completed'
    }
  ];

  const getAlertColor = (type) => {
    const colors = {
      critical: 'border-l-red-500 bg-red-50',
      medium: 'border-l-orange-500 bg-orange-50',
      low: 'border-l-yellow-500 bg-yellow-50'
    };
    return colors[type] || 'border-l-gray-500 bg-gray-50';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-blue-600" />
          Alertas Recentes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recentAlerts.map((alert) => (
            <div 
              key={alert.id} 
              className={`p-4 border-l-4 rounded-r-lg ${getAlertColor(alert.type)}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{alert.message}</p>
                  <p className="text-sm text-gray-600 mt-1">{alert.time}</p>
                </div>
                <Badge variant={alert.type} size="sm">
                  {alert.type === 'critical' ? 'Crítico' : 
                   alert.type === 'medium' ? 'Médio' : 'Baixo'}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Visão geral do sistema de segurança</p>
        </div>
        <div className="text-sm text-gray-500">
          Última atualização: {formatRelativeTime(dashboardMetrics.lastUpdate)}
        </div>
      </div>

      {/* Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Ameaças Bloqueadas"
          value={formatNumber(dashboardMetrics.threatsBlocked)}
          change="12% vs. ontem"
          changeType="positive"
          icon={Shield}
          color="bg-red-500"
        />
        <MetricCard
          title="Arquivos Monitorados"
          value={formatNumber(dashboardMetrics.filesMonitored)}
          change="Sistema ativo"
          changeType="positive"
          icon={FileText}
          color="bg-blue-500"
        />
        <MetricCard
          title="Alertas Ativos"
          value={dashboardMetrics.alertsCount.critical + dashboardMetrics.alertsCount.medium + dashboardMetrics.alertsCount.low}
          change={`${dashboardMetrics.alertsCount.critical} críticos`}
          changeType="negative"
          icon={AlertTriangle}
          color="bg-yellow-500"
        />
        <MetricCard
          title="Status do Sistema"
          value="Protegido"
          change="Uptime: 15d 8h"
          changeType="positive"
          icon={Activity}
          color="bg-green-500"
        />
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ThreatTrendChart />
        <ThreatTypeChart />
      </div>

      {/* Status e Alertas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SystemStatus />
        <RecentAlerts />
      </div>
    </div>
  );
};

export default Dashboard;

