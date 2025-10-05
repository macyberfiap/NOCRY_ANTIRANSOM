import React, { useState } from 'react';
import { 
  Settings, 
  Shield, 
  Clock, 
  Bell, 
  Scan,
  AlertTriangle,
  Save,
  RotateCcw,
  Info
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Badge';
import { systemSettings } from '../../data/mockData';

const ToggleSwitch = ({ enabled, onChange, label, description }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
      <div className="flex-1">
        <h4 className="font-medium text-gray-900">{label}</h4>
        {description && <p className="text-sm text-gray-600 mt-1">{description}</p>}
      </div>
      <button
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          enabled ? 'bg-blue-600' : 'bg-gray-300'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
};

const SelectField = ({ value, onChange, options, label, description }) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      {description && <p className="text-sm text-gray-600">{description}</p>}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

const ProtectionSettings = ({ settings, onSettingsChange }) => {
  const updateProtectionSetting = (key, value) => {
    onSettingsChange({
      ...settings,
      protection: {
        ...settings.protection,
        [key]: value
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-green-600" />
          Configurações de Proteção
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ToggleSwitch
          enabled={settings.protection.realTimeProtection}
          onChange={(value) => updateProtectionSetting('realTimeProtection', value)}
          label="Proteção em Tempo Real"
          description="Monitora arquivos e processos continuamente"
        />
        
        <ToggleSwitch
          enabled={settings.protection.behaviorAnalysis}
          onChange={(value) => updateProtectionSetting('behaviorAnalysis', value)}
          label="Análise Comportamental"
          description="Detecta padrões suspeitos de atividade"
        />
        
        <ToggleSwitch
          enabled={settings.protection.networkMonitoring}
          onChange={(value) => updateProtectionSetting('networkMonitoring', value)}
          label="Monitoramento de Rede"
          description="Monitora tráfego de rede suspeito"
        />
        
        <ToggleSwitch
          enabled={settings.protection.emailProtection}
          onChange={(value) => updateProtectionSetting('emailProtection', value)}
          label="Proteção de Email"
          description="Verifica anexos e links em emails"
        />
      </CardContent>
    </Card>
  );
};

const SensitivitySettings = ({ settings, onSettingsChange }) => {
  const updateSensitivitySetting = (key, value) => {
    onSettingsChange({
      ...settings,
      sensitivity: {
        ...settings.sensitivity,
        [key]: value
      }
    });
  };

  const detectionLevelOptions = [
    { value: 'low', label: 'Baixo - Menos alertas, pode perder algumas ameaças' },
    { value: 'medium', label: 'Médio - Balanceado entre detecção e falsos positivos' },
    { value: 'high', label: 'Alto - Máxima detecção, mais falsos positivos' },
    { value: 'paranoid', label: 'Paranóico - Detecta tudo, muitos falsos positivos' }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-orange-600" />
          Configurações de Sensibilidade
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <SelectField
          value={settings.sensitivity.detectionLevel}
          onChange={(value) => updateSensitivitySetting('detectionLevel', value)}
          options={detectionLevelOptions}
          label="Nível de Detecção"
          description="Ajusta a sensibilidade do sistema de detecção"
        />
        
        <ToggleSwitch
          enabled={settings.sensitivity.falsePositiveReduction}
          onChange={(value) => updateSensitivitySetting('falsePositiveReduction', value)}
          label="Redução de Falsos Positivos"
          description="Usa machine learning para reduzir alertas desnecessários"
        />
        
        <ToggleSwitch
          enabled={settings.sensitivity.quarantineAutomatic}
          onChange={(value) => updateSensitivitySetting('quarantineAutomatic', value)}
          label="Quarentena Automática"
          description="Isola automaticamente arquivos suspeitos"
        />
      </CardContent>
    </Card>
  );
};

const ScanningSettings = ({ settings, onSettingsChange }) => {
  const updateScanningSetting = (key, value) => {
    onSettingsChange({
      ...settings,
      scanning: {
        ...settings.scanning,
        [key]: value
      }
    });
  };

  const frequencyOptions = [
    { value: 'hourly', label: 'A cada hora' },
    { value: 'daily', label: 'Diariamente' },
    { value: 'weekly', label: 'Semanalmente' },
    { value: 'monthly', label: 'Mensalmente' }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Scan className="h-5 w-5 text-blue-600" />
          Configurações de Varredura
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ToggleSwitch
          enabled={settings.scanning.scheduledScans}
          onChange={(value) => updateScanningSetting('scheduledScans', value)}
          label="Varreduras Agendadas"
          description="Executa varreduras automáticas em horários programados"
        />
        
        {settings.scanning.scheduledScans && (
          <>
            <SelectField
              value={settings.scanning.scanFrequency}
              onChange={(value) => updateScanningSetting('scanFrequency', value)}
              options={frequencyOptions}
              label="Frequência de Varredura"
              description="Com que frequência executar varreduras completas"
            />
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Horário da Varredura
              </label>
              <p className="text-sm text-gray-600">Horário preferido para executar varreduras</p>
              <input
                type="time"
                value={settings.scanning.scanTime}
                onChange={(e) => updateScanningSetting('scanTime', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </>
        )}
        
        <ToggleSwitch
          enabled={settings.scanning.deepScan}
          onChange={(value) => updateScanningSetting('deepScan', value)}
          label="Varredura Profunda"
          description="Analisa arquivos mais detalhadamente (mais lento)"
        />
      </CardContent>
    </Card>
  );
};

const NotificationSettings = ({ settings, onSettingsChange }) => {
  const updateNotificationSetting = (key, value) => {
    onSettingsChange({
      ...settings,
      notifications: {
        ...settings.notifications,
        [key]: value
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-purple-600" />
          Configurações de Notificações
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ToggleSwitch
          enabled={settings.notifications.realTimeAlerts}
          onChange={(value) => updateNotificationSetting('realTimeAlerts', value)}
          label="Alertas em Tempo Real"
          description="Mostra alertas imediatamente quando detectados"
        />
        
        <ToggleSwitch
          enabled={settings.notifications.emailNotifications}
          onChange={(value) => updateNotificationSetting('emailNotifications', value)}
          label="Notificações por Email"
          description="Envia alertas importantes por email"
        />
        
        <ToggleSwitch
          enabled={settings.notifications.soundAlerts}
          onChange={(value) => updateNotificationSetting('soundAlerts', value)}
          label="Alertas Sonoros"
          description="Reproduz sons para alertas críticos"
        />
        
        <ToggleSwitch
          enabled={settings.notifications.desktopNotifications}
          onChange={(value) => updateNotificationSetting('desktopNotifications', value)}
          label="Notificações do Sistema"
          description="Mostra notificações na área de trabalho"
        />
      </CardContent>
    </Card>
  );
};

const SettingsPage = () => {
  const [settings, setSettings] = useState(systemSettings);
  const [hasChanges, setHasChanges] = useState(false);

  const handleSettingsChange = (newSettings) => {
    setSettings(newSettings);
    setHasChanges(true);
  };

  const handleSave = () => {
    console.log('Salvando configurações:', settings);
    setHasChanges(false);
    // Aqui seria implementada a lógica real de salvamento
  };

  const handleReset = () => {
    setSettings(systemSettings);
    setHasChanges(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Configurações do Sistema</h1>
          <p className="text-gray-600">Personalize as configurações de segurança e monitoramento</p>
        </div>
        
        {hasChanges && (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-orange-600">
              <Info className="h-4 w-4" />
              Alterações não salvas
            </div>
            <Button variant="outline" onClick={handleReset}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Resetar
            </Button>
            <Button variant="primary" onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Salvar
            </Button>
          </div>
        )}
      </div>

      {/* Configurações */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <ProtectionSettings 
            settings={settings} 
            onSettingsChange={handleSettingsChange} 
          />
          <ScanningSettings 
            settings={settings} 
            onSettingsChange={handleSettingsChange} 
          />
        </div>
        
        <div className="space-y-6">
          <SensitivitySettings 
            settings={settings} 
            onSettingsChange={handleSettingsChange} 
          />
          <NotificationSettings 
            settings={settings} 
            onSettingsChange={handleSettingsChange} 
          />
        </div>
      </div>

      {/* Informações do Sistema */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-gray-600" />
            Informações do Sistema
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
              <span className="text-gray-500">Versão:</span>
              <p className="font-medium">SecureGuard v2.1.4</p>
            </div>
            <div>
              <span className="text-gray-500">Última Atualização:</span>
              <p className="font-medium">18/06/2025 15:30</p>
            </div>
            <div>
              <span className="text-gray-500">Licença:</span>
              <p className="font-medium">Empresarial - Válida até 2026</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;

