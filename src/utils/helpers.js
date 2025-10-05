// Utilitários para formatação e manipulação de dados
import { format, formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { clsx } from 'clsx';

// Formatação de datas
export const formatDate = (date, pattern = 'dd/MM/yyyy HH:mm') => {
  return format(new Date(date), pattern, { locale: ptBR });
};

export const formatRelativeTime = (date) => {
  return formatDistanceToNow(new Date(date), { 
    addSuffix: true, 
    locale: ptBR 
  });
};

// Formatação de números
export const formatNumber = (num) => {
  return new Intl.NumberFormat('pt-BR').format(num);
};

export const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

// Utilitários de classe CSS
export const cn = (...inputs) => {
  return clsx(inputs);
};

// Cores para severidade
export const getSeverityColor = (severity) => {
  const colors = {
    critical: 'text-red-500 bg-red-50 border-red-200',
    high: 'text-red-400 bg-red-50 border-red-200',
    medium: 'text-orange-500 bg-orange-50 border-orange-200',
    low: 'text-yellow-500 bg-yellow-50 border-yellow-200',
    info: 'text-blue-500 bg-blue-50 border-blue-200'
  };
  return colors[severity] || colors.info;
};

// Cores para status
export const getStatusColor = (status) => {
  const colors = {
    active: 'text-green-500 bg-green-50 border-green-200',
    protected: 'text-green-500 bg-green-50 border-green-200',
    quarantined: 'text-red-500 bg-red-50 border-red-200',
    monitoring: 'text-yellow-500 bg-yellow-50 border-yellow-200',
    investigating: 'text-orange-500 bg-orange-50 border-orange-200',
    blocked: 'text-red-400 bg-red-50 border-red-200',
    completed: 'text-blue-500 bg-blue-50 border-blue-200',
    checking: 'text-yellow-400 bg-yellow-50 border-yellow-200',
    compromised: 'text-red-600 bg-red-100 border-red-300',
    verified: 'text-green-600 bg-green-100 border-green-300'
  };
  return colors[status] || 'text-gray-500 bg-gray-50 border-gray-200';
};

// Ícones para tipos de evento
export const getEventIcon = (type) => {
  const icons = {
    detection: 'AlertTriangle',
    prevention: 'Shield',
    scan: 'Search',
    quarantine: 'Lock',
    system: 'Settings',
    network: 'Wifi',
    file: 'File'
  };
  return icons[type] || 'Info';
};

// Tradução de tipos de evento
export const translateEventType = (type) => {
  const translations = {
    detection: 'Detecção',
    prevention: 'Prevenção',
    scan: 'Varredura',
    quarantine: 'Quarentena',
    system: 'Sistema',
    network: 'Rede',
    file: 'Arquivo'
  };
  return translations[type] || type;
};

// Tradução de severidade
export const translateSeverity = (severity) => {
  const translations = {
    critical: 'Crítico',
    high: 'Alto',
    medium: 'Médio',
    low: 'Baixo',
    info: 'Informação'
  };
  return translations[severity] || severity;
};

// Tradução de status
export const translateStatus = (status) => {
  const translations = {
    active: 'Ativo',
    protected: 'Protegido',
    quarantined: 'Quarentena',
    monitoring: 'Monitorando',
    investigating: 'Investigando',
    blocked: 'Bloqueado',
    completed: 'Concluído',
    checking: 'Verificando',
    compromised: 'Comprometido',
    verified: 'Verificado'
  };
  return translations[status] || status;
};

// Validação de arquivo
export const isFileExtensionSafe = (filename) => {
  const dangerousExtensions = [
    '.exe', '.bat', '.cmd', '.com', '.pif', '.scr', '.vbs', '.js', '.jar',
    '.msi', '.dll', '.sys', '.tmp', '.reg', '.ps1', '.sh'
  ];
  
  const extension = filename.toLowerCase().substring(filename.lastIndexOf('.'));
  return !dangerousExtensions.includes(extension);
};

// Geração de ID único
export const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

// Debounce para busca
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

