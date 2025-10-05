import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Shield, 
  Clock, 
  Search,
  Filter,
  Eye,
  Trash2,
  Lock,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Badge, Button } from '../ui/Badge';
import { activeAlerts } from '../../data/mockData';
import { formatRelativeTime, getSeverityColor, translateSeverity } from '../../utils/helpers';

const AlertCard = ({ alert, onAction }) => {
  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'critical':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'medium':
        return <Shield className="h-5 w-5 text-orange-500" />;
      default:
        return <Clock className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getActionButtons = (actions) => {
    const buttonConfig = {
      quarantine: { label: 'Quarentena', variant: 'danger', icon: Lock },
      investigate: { label: 'Investigar', variant: 'primary', icon: Eye },
      ignore: { label: 'Ignorar', variant: 'secondary', icon: XCircle },
      block: { label: 'Bloquear', variant: 'danger', icon: Shield },
      restore: { label: 'Restaurar', variant: 'success', icon: CheckCircle },
      whitelist: { label: 'Lista Branca', variant: 'secondary', icon: CheckCircle }
    };

    return actions.map((action) => {
      const config = buttonConfig[action];
      if (!config) return null;
      
      const Icon = config.icon;
      return (
        <Button
          key={action}
          variant={config.variant}
          size="sm"
          onClick={() => onAction(alert.id, action)}
          className="flex items-center gap-1"
        >
          <Icon className="h-3 w-3" />
          {config.label}
        </Button>
      );
    });
  };

  return (
    <Card className={`border-l-4 ${
      alert.severity === 'critical' ? 'border-l-red-500' :
      alert.severity === 'medium' ? 'border-l-orange-500' : 'border-l-yellow-500'
    }`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            {getSeverityIcon(alert.severity)}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-semibold text-gray-900">{alert.title}</h3>
                <Badge variant={alert.severity} size="sm">
                  {translateSeverity(alert.severity)}
                </Badge>
              </div>
              <p className="text-gray-600 mb-2">{alert.description}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>Origem: {alert.source}</span>
                <span>•</span>
                <span>{formatRelativeTime(alert.timestamp)}</span>
                <span>•</span>
                <span className="capitalize">Status: {alert.status}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {getActionButtons(alert.actions)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const AlertFilters = ({ filters, onFilterChange }) => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filtros:</span>
          </div>
          
          <select
            value={filters.severity}
            onChange={(e) => onFilterChange({ ...filters, severity: e.target.value })}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todas as severidades</option>
            <option value="critical">Crítico</option>
            <option value="medium">Médio</option>
            <option value="low">Baixo</option>
          </select>

          <select
            value={filters.status}
            onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todos os status</option>
            <option value="active">Ativo</option>
            <option value="investigating">Investigando</option>
            <option value="monitoring">Monitorando</option>
            <option value="blocked">Bloqueado</option>
          </select>

          <div className="flex items-center gap-2 ml-auto">
            <Search className="h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Buscar alertas..."
              value={filters.search}
              onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const AlertsPage = () => {
  const [filters, setFilters] = useState({
    severity: '',
    status: '',
    search: ''
  });

  const handleAction = (alertId, action) => {
    console.log(`Ação ${action} executada no alerta ${alertId}`);
    // Aqui seria implementada a lógica real de ação
  };

  const filteredAlerts = activeAlerts.filter(alert => {
    const matchesSeverity = !filters.severity || alert.severity === filters.severity;
    const matchesStatus = !filters.status || alert.status === filters.status;
    const matchesSearch = !filters.search || 
      alert.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      alert.description.toLowerCase().includes(filters.search.toLowerCase()) ||
      alert.source.toLowerCase().includes(filters.search.toLowerCase());
    
    return matchesSeverity && matchesStatus && matchesSearch;
  });

  const criticalCount = filteredAlerts.filter(a => a.severity === 'critical').length;
  const mediumCount = filteredAlerts.filter(a => a.severity === 'medium').length;
  const lowCount = filteredAlerts.filter(a => a.severity === 'low').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Alertas de Segurança</h1>
          <p className="text-gray-600">Gerenciamento de alertas e ameaças detectadas</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-500">
            {filteredAlerts.length} alertas encontrados
          </div>
        </div>
      </div>

      {/* Resumo de Alertas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-l-4 border-l-red-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Críticos</p>
                <p className="text-2xl font-bold text-red-600">{criticalCount}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Médios</p>
                <p className="text-2xl font-bold text-orange-600">{mediumCount}</p>
              </div>
              <Shield className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Baixos</p>
                <p className="text-2xl font-bold text-yellow-600">{lowCount}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <AlertFilters filters={filters} onFilterChange={setFilters} />

      {/* Lista de Alertas */}
      <div className="space-y-4">
        {filteredAlerts.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum alerta encontrado</h3>
              <p className="text-gray-600">
                {filters.search || filters.severity || filters.status
                  ? 'Tente ajustar os filtros para ver mais resultados.'
                  : 'Não há alertas ativos no momento.'}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredAlerts.map((alert) => (
            <AlertCard
              key={alert.id}
              alert={alert}
              onAction={handleAction}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default AlertsPage;

