// Dados simulados para o sistema de monitoramento de ransomware
import { format, subHours, subDays, subMinutes } from 'date-fns';

// Métricas principais do dashboard
export const dashboardMetrics = {
  threatsBlocked: 1247,
  filesMonitored: 15832,
  lastUpdate: new Date().toISOString(),
  systemHealth: 'active',
  alertsCount: {
    critical: 3,
    medium: 7,
    low: 12
  },
  protectionStatus: 'active',
  scanProgress: 78,
  quarantinedFiles: 23
};

// Dados para gráficos
export const threatTrendData = [
  { time: '00:00', threats: 12, blocked: 12 },
  { time: '04:00', threats: 8, blocked: 8 },
  { time: '08:00', threats: 25, blocked: 24 },
  { time: '12:00', threats: 18, blocked: 18 },
  { time: '16:00', threats: 32, blocked: 31 },
  { time: '20:00', threats: 15, blocked: 15 },
  { time: '23:59', threats: 9, blocked: 9 }
];

export const threatTypeData = [
  { name: 'Ransomware', value: 45, color: '#ef4444' },
  { name: 'Malware', value: 30, color: '#f59e0b' },
  { name: 'Phishing', value: 15, color: '#eab308' },
  { name: 'Outros', value: 10, color: '#64748b' }
];

// Logs de eventos
export const eventLogs = [
  {
    id: 'log_001',
    timestamp: subMinutes(new Date(), 5).toISOString(),
    type: 'detection',
    severity: 'critical',
    message: 'Atividade de ransomware detectada em /home/user/documents/',
    source: '/home/user/documents/important.docx',
    action: 'quarantined',
    details: 'Arquivo suspeito isolado automaticamente'
  },
  {
    id: 'log_002',
    timestamp: subMinutes(new Date(), 12).toISOString(),
    type: 'prevention',
    severity: 'medium',
    message: 'Tentativa de acesso não autorizado bloqueada',
    source: 'C:\\Windows\\System32\\',
    action: 'blocked',
    details: 'Processo suspeito impedido de executar'
  },
  {
    id: 'log_003',
    timestamp: subMinutes(new Date(), 18).toISOString(),
    type: 'scan',
    severity: 'low',
    message: 'Varredura completa finalizada',
    source: 'Sistema completo',
    action: 'completed',
    details: '15,832 arquivos verificados, nenhuma ameaça encontrada'
  },
  {
    id: 'log_004',
    timestamp: subHours(new Date(), 1).toISOString(),
    type: 'detection',
    severity: 'critical',
    message: 'Comportamento suspeito de criptografia detectado',
    source: '/home/user/photos/',
    action: 'investigating',
    details: 'Múltiplos arquivos sendo modificados rapidamente'
  },
  {
    id: 'log_005',
    timestamp: subHours(new Date(), 2).toISOString(),
    type: 'prevention',
    severity: 'medium',
    message: 'Extensão de arquivo suspeita bloqueada',
    source: 'email_attachment.exe.pdf',
    action: 'blocked',
    details: 'Anexo de email com dupla extensão rejeitado'
  }
];

// Alertas ativos
export const activeAlerts = [
  {
    id: 'alert_001',
    severity: 'critical',
    title: 'Ransomware Ativo Detectado',
    description: 'Atividade de criptografia maliciosa em andamento',
    timestamp: subMinutes(new Date(), 3).toISOString(),
    source: '/home/user/documents/',
    status: 'active',
    actions: ['quarantine', 'investigate', 'ignore']
  },
  {
    id: 'alert_002',
    severity: 'critical',
    title: 'Múltiplos Arquivos Comprometidos',
    description: 'Detecção de padrão de ransomware em 47 arquivos',
    timestamp: subMinutes(new Date(), 8).toISOString(),
    source: '/home/user/projects/',
    status: 'investigating',
    actions: ['quarantine', 'restore', 'ignore']
  },
  {
    id: 'alert_003',
    severity: 'medium',
    title: 'Comportamento Suspeito',
    description: 'Processo não reconhecido tentando acessar arquivos críticos',
    timestamp: subMinutes(new Date(), 15).toISOString(),
    source: 'unknown_process.exe',
    status: 'monitoring',
    actions: ['block', 'investigate', 'whitelist']
  },
  {
    id: 'alert_004',
    severity: 'medium',
    title: 'Tentativa de Acesso Não Autorizado',
    description: 'Múltiplas tentativas de acesso a arquivos protegidos',
    timestamp: subHours(new Date(), 1).toISOString(),
    source: 'Network Scanner',
    status: 'blocked',
    actions: ['investigate', 'ignore']
  }
];

// Arquivos monitorados
export const monitoredFiles = [
  {
    id: 'file_001',
    path: '/home/user/documents/financeiro.xlsx',
    status: 'protected',
    lastModified: subHours(new Date(), 2).toISOString(),
    size: '2.4 MB',
    integrity: 'verified',
    backupCount: 3,
    accessCount: 12
  },
  {
    id: 'file_002',
    path: '/home/user/projects/codigo_fonte.zip',
    status: 'quarantined',
    lastModified: subMinutes(new Date(), 30).toISOString(),
    size: '15.7 MB',
    integrity: 'compromised',
    backupCount: 1,
    accessCount: 1
  },
  {
    id: 'file_003',
    path: '/home/user/photos/familia.jpg',
    status: 'protected',
    lastModified: subDays(new Date(), 1).toISOString(),
    size: '3.2 MB',
    integrity: 'verified',
    backupCount: 2,
    accessCount: 5
  },
  {
    id: 'file_004',
    path: '/home/user/documents/contratos.pdf',
    status: 'monitoring',
    lastModified: subHours(new Date(), 6).toISOString(),
    size: '890 KB',
    integrity: 'checking',
    backupCount: 4,
    accessCount: 8
  }
];

// Configurações do sistema
export const systemSettings = {
  protection: {
    realTimeProtection: true,
    behaviorAnalysis: true,
    networkMonitoring: true,
    emailProtection: true
  },
  sensitivity: {
    detectionLevel: 'high',
    falsePositiveReduction: true,
    quarantineAutomatic: true
  },
  scanning: {
    scheduledScans: true,
    scanFrequency: 'daily',
    scanTime: '02:00',
    deepScan: false
  },
  notifications: {
    realTimeAlerts: true,
    emailNotifications: true,
    soundAlerts: false,
    desktopNotifications: true
  }
};

// Status do sistema
export const systemStatus = {
  version: '2.1.4',
  lastUpdate: subHours(new Date(), 6).toISOString(),
  uptime: '15 dias, 8 horas',
  cpuUsage: 12,
  memoryUsage: 34,
  diskUsage: 67,
  networkStatus: 'connected',
  databaseStatus: 'healthy',
  serviceStatus: 'running'
};

