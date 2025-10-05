import React, { useState } from 'react';
import { 
  FolderOpen, 
  File, 
  Shield, 
  AlertTriangle, 
  Clock, 
  Search,
  Filter,
  Download,
  Eye,
  Lock,
  CheckCircle,
  XCircle,
  History,
  HardDrive
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Badge, Button } from '../ui/Badge';
import { monitoredFiles } from '../../data/mockData';
import { formatDate, formatRelativeTime, formatBytes, getStatusColor } from '../../utils/helpers';

const FileCard = ({ file, onViewHistory, onAction }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'protected':
        return <Shield className="h-5 w-5 text-green-500" />;
      case 'quarantined':
        return <Lock className="h-5 w-5 text-red-500" />;
      case 'monitoring':
        return <Eye className="h-5 w-5 text-yellow-500" />;
      default:
        return <File className="h-5 w-5 text-gray-500" />;
    }
  };

  const getIntegrityIcon = (integrity) => {
    switch (integrity) {
      case 'verified':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'compromised':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'checking':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getActionButtons = (status) => {
    const buttons = [];
    
    if (status === 'quarantined') {
      buttons.push(
        <Button key="restore" variant="success" size="sm" onClick={() => onAction(file.id, 'restore')}>
          <CheckCircle className="h-3 w-3 mr-1" />
          Restaurar
        </Button>
      );
    }
    
    if (status === 'protected' || status === 'monitoring') {
      buttons.push(
        <Button key="quarantine" variant="danger" size="sm" onClick={() => onAction(file.id, 'quarantine')}>
          <Lock className="h-3 w-3 mr-1" />
          Quarentena
        </Button>
      );
    }
    
    buttons.push(
      <Button key="history" variant="outline" size="sm" onClick={() => onViewHistory(file)}>
        <History className="h-3 w-3 mr-1" />
        Histórico
      </Button>
    );
    
    return buttons;
  };

  return (
    <Card className={`border-l-4 ${
      file.status === 'protected' ? 'border-l-green-500' :
      file.status === 'quarantined' ? 'border-l-red-500' :
      file.status === 'monitoring' ? 'border-l-yellow-500' : 'border-l-gray-500'
    }`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            {getStatusIcon(file.status)}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-semibold text-gray-900 truncate">{file.path.split('/').pop()}</h3>
                <Badge variant={file.status === 'protected' ? 'success' : 
                              file.status === 'quarantined' ? 'error' : 'warning'} size="sm">
                  {file.status === 'protected' ? 'Protegido' :
                   file.status === 'quarantined' ? 'Quarentena' :
                   file.status === 'monitoring' ? 'Monitorando' : file.status}
                </Badge>
              </div>
              
              <p className="text-sm text-gray-600 truncate mb-3">{file.path}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Tamanho:</span>
                  <p className="font-medium">{file.size}</p>
                </div>
                <div>
                  <span className="text-gray-500">Modificado:</span>
                  <p className="font-medium">{formatRelativeTime(file.lastModified)}</p>
                </div>
                <div>
                  <span className="text-gray-500">Backups:</span>
                  <p className="font-medium">{file.backupCount}</p>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-gray-500">Integridade:</span>
                  <div className="flex items-center gap-1">
                    {getIntegrityIcon(file.integrity)}
                    <span className="font-medium capitalize">{file.integrity}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 flex-shrink-0">
            {getActionButtons(file.status)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const FileFilters = ({ filters, onFilterChange }) => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={filters.status}
              onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todos os status</option>
              <option value="protected">Protegido</option>
              <option value="quarantined">Quarentena</option>
              <option value="monitoring">Monitorando</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Integridade
            </label>
            <select
              value={filters.integrity}
              onChange={(e) => onFilterChange({ ...filters, integrity: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todas as integridades</option>
              <option value="verified">Verificado</option>
              <option value="compromised">Comprometido</option>
              <option value="checking">Verificando</option>
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
                placeholder="Buscar arquivos..."
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

const FileHistoryModal = ({ file, isOpen, onClose }) => {
  if (!isOpen || !file) return null;

  const mockHistory = [
    {
      timestamp: new Date().toISOString(),
      action: 'Verificação de integridade',
      result: 'Aprovado',
      details: 'Hash verificado com sucesso'
    },
    {
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      action: 'Backup automático',
      result: 'Concluído',
      details: 'Backup #3 criado'
    },
    {
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      action: 'Acesso detectado',
      result: 'Permitido',
      details: 'Usuário autorizado'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Histórico do Arquivo</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              ✕
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-1">{file.path}</p>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            {mockHistory.map((entry, index) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-gray-900">{entry.action}</h4>
                    <span className="text-sm text-gray-500">{formatDate(entry.timestamp)}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{entry.details}</p>
                  <Badge variant={entry.result === 'Aprovado' || entry.result === 'Concluído' || entry.result === 'Permitido' ? 'success' : 'error'} size="sm">
                    {entry.result}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
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

const FilesPage = () => {
  const [filters, setFilters] = useState({
    status: '',
    integrity: '',
    search: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

  const handleViewHistory = (file) => {
    setSelectedFile(file);
    setIsHistoryModalOpen(true);
  };

  const handleCloseHistoryModal = () => {
    setIsHistoryModalOpen(false);
    setSelectedFile(null);
  };

  const handleAction = (fileId, action) => {
    console.log(`Ação ${action} executada no arquivo ${fileId}`);
    // Aqui seria implementada a lógica real de ação
  };

  const filteredFiles = monitoredFiles.filter(file => {
    const matchesStatus = !filters.status || file.status === filters.status;
    const matchesIntegrity = !filters.integrity || file.integrity === filters.integrity;
    const matchesSearch = !filters.search || 
      file.path.toLowerCase().includes(filters.search.toLowerCase());
    
    return matchesStatus && matchesIntegrity && matchesSearch;
  });

  const protectedCount = filteredFiles.filter(f => f.status === 'protected').length;
  const quarantinedCount = filteredFiles.filter(f => f.status === 'quarantined').length;
  const monitoringCount = filteredFiles.filter(f => f.status === 'monitoring').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gerenciamento de Arquivos</h1>
          <p className="text-gray-600">Monitoramento e proteção de arquivos críticos</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">
            {filteredFiles.length} arquivos encontrados
          </span>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Relatório
          </Button>
        </div>
      </div>

      {/* Resumo de Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Protegidos</p>
                <p className="text-2xl font-bold text-green-600">{protectedCount}</p>
              </div>
              <Shield className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Quarentena</p>
                <p className="text-2xl font-bold text-red-600">{quarantinedCount}</p>
              </div>
              <Lock className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Monitorando</p>
                <p className="text-2xl font-bold text-yellow-600">{monitoringCount}</p>
              </div>
              <Eye className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <FileFilters filters={filters} onFilterChange={setFilters} />

      {/* Lista de Arquivos */}
      <div className="space-y-4">
        {filteredFiles.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <FolderOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum arquivo encontrado</h3>
              <p className="text-gray-600">
                {filters.search || filters.status || filters.integrity
                  ? 'Tente ajustar os filtros para ver mais resultados.'
                  : 'Não há arquivos monitorados no momento.'}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredFiles.map((file) => (
            <FileCard
              key={file.id}
              file={file}
              onViewHistory={handleViewHistory}
              onAction={handleAction}
            />
          ))
        )}
      </div>

      {/* Modal de Histórico */}
      <FileHistoryModal
        file={selectedFile}
        isOpen={isHistoryModalOpen}
        onClose={handleCloseHistoryModal}
      />
    </div>
  );
};

export default FilesPage;

