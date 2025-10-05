import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  Filter, 
  Calendar,
  Download,
  Eye,
  AlertTriangle,
  Shield,
  Activity,
  Lock,
  Settings,
  Wifi,
  File
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Badge, Button } from '../ui/Badge';
import { eventLogs } from '../../data/mockData';
import { 
  formatDate, 
  formatRelativeTime, 
  getSeverityColor, 
  getEventIcon,
  translateEventType,
  translateSeverity 
} from '../../utils/helpers';

const LogRow = ({ log, onViewDetails }) => {
  const getIcon = (type) => {
    const icons = {
      detection: AlertTriangle,
      prevention: Shield,
      scan: Activity,
      quarantine: Lock,
      system: Settings,
      network: Wifi,
      file: File
    };
    const Icon = icons[type] || FileText;
    return <Icon className="h-4 w-4" />;
  };

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          {getIcon(log.type)}
          <span className="text-sm text-gray-600">{formatDate(log.timestamp, 'dd/MM HH:mm')}</span>
        </div>
      </td>
      <td className="px-4 py-3">
        <Badge variant={log.severity} size="sm">
          {translateSeverity(log.severity)}
        </Badge>
      </td>
      <td className="px-4 py-3">
        <span className="text-sm font-medium text-gray-900">
          {translateEventType(log.type)}
        </span>
      </td>
      <td className="px-4 py-3">
        <div className="max-w-md">
          <p className="text-sm text-gray-900 truncate">{log.message}</p>
          <p className="text-xs text-gray-500 truncate">{log.source}</p>
        </div>
      </td>
      <td className="px-4 py-3">
        <span className="text-sm text-gray-600 capitalize">{log.action}</span>
      </td>
      <td className="px-4 py-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onViewDetails(log)}
          className="flex items-center gap-1"
        >
          <Eye className="h-3 w-3" />
          Detalhes
        </Button>
      </td>
    </tr>
  );
};

const LogFilters = ({ filters, onFilterChange }) => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de Evento
            </label>
            <select
              value={filters.type}
              onChange={(e) => onFilterChange({ ...filters, type: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todos os tipos</option>
              <option value="detection">Detecção</option>
              <option value="prevention">Prevenção</option>
              <option value="scan">Varredura</option>
              <option value="quarantine">Quarentena</option>
              <option value="system">Sistema</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Severidade
            </label>
            <select
              value={filters.severity}
              onChange={(e) => onFilterChange({ ...filters, severity: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todas as severidades</option>
              <option value="critical">Crítico</option>
              <option value="medium">Médio</option>
              <option value="low">Baixo</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Período
            </label>
            <select
              value={filters.period}
              onChange={(e) => onFilterChange({ ...filters, period: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todos os períodos</option>
              <option value="1h">Última hora</option>
              <option value="24h">Últimas 24 horas</option>
              <option value="7d">Últimos 7 dias</option>
              <option value="30d">Últimos 30 dias</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Buscar
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar logs..."
                value={filters.search}
                onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const LogDetailsModal = ({ log, isOpen, onClose }) => {
  if (!isOpen || !log) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Detalhes do Log</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">ID do Evento</label>
              <p className="text-sm text-gray-900 font-mono">{log.id}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Timestamp</label>
              <p className="text-sm text-gray-900">{formatDate(log.timestamp)}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Tipo</label>
              <p className="text-sm text-gray-900">{translateEventType(log.type)}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Severidade</label>
              <Badge variant={log.severity} size="sm">
                {translateSeverity(log.severity)}
              </Badge>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mensagem</label>
            <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-md">{log.message}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Origem</label>
            <p className="text-sm text-gray-900 font-mono bg-gray-50 p-3 rounded-md">{log.source}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ação Executada</label>
            <p className="text-sm text-gray-900 capitalize">{log.action}</p>
          </div>
          
          {log.details && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Detalhes Adicionais</label>
              <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-md">{log.details}</p>
            </div>
          )}
        </div>
        
        <div className="p-6 border-t border-gray-200 flex justify-end">
          <Button variant="secondary" onClick={onClose}>
            Fechar
          </Button>
        </div>
      </div>
    </div>
  );
};

const LogsPage = () => {
  const [filters, setFilters] = useState({
    type: '',
    severity: '',
    period: '',
    search: ''
  });
  const [selectedLog, setSelectedLog] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (log) => {
    setSelectedLog(log);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedLog(null);
  };

  const handleExport = () => {
    console.log('Exportando logs...');
    // Aqui seria implementada a lógica de exportação
  };

  const filteredLogs = eventLogs.filter(log => {
    const matchesType = !filters.type || log.type === filters.type;
    const matchesSeverity = !filters.severity || log.severity === filters.severity;
    const matchesSearch = !filters.search || 
      log.message.toLowerCase().includes(filters.search.toLowerCase()) ||
      log.source.toLowerCase().includes(filters.search.toLowerCase());
    
    // Filtro de período seria implementado aqui
    const matchesPeriod = true; // Simplificado para o exemplo
    
    return matchesType && matchesSeverity && matchesSearch && matchesPeriod;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Logs de Eventos</h1>
          <p className="text-gray-600">Histórico completo de atividades do sistema</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">
            {filteredLogs.length} eventos encontrados
          </span>
          <Button
            variant="outline"
            onClick={handleExport}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Filtros */}
      <LogFilters filters={filters} onFilterChange={setFilters} />

      {/* Tabela de Logs */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Timestamp
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Severidade
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Evento
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ação
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Detalhes
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {filteredLogs.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-4 py-8 text-center">
                      <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum log encontrado</h3>
                      <p className="text-gray-600">
                        {filters.search || filters.type || filters.severity
                          ? 'Tente ajustar os filtros para ver mais resultados.'
                          : 'Não há logs disponíveis no momento.'}
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredLogs.map((log) => (
                    <LogRow
                      key={log.id}
                      log={log}
                      onViewDetails={handleViewDetails}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Modal de Detalhes */}
      <LogDetailsModal
        log={selectedLog}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default LogsPage;

