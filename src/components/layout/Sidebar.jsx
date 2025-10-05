import React from 'react';
import { 
  LayoutDashboard, 
  Shield, 
  AlertTriangle, 
  FileText, 
  FolderOpen, 
  Settings, 
  Activity,
  X 
} from 'lucide-react';
import { cn } from '../../utils/helpers';

const Sidebar = ({ isOpen, onClose, activeTab, onTabChange }) => {
  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      description: 'Visão geral do sistema'
    },
    {
      id: 'alerts',
      label: 'Alertas',
      icon: AlertTriangle,
      description: 'Alertas ativos',
      badge: 3
    },
    {
      id: 'logs',
      label: 'Logs de Eventos',
      icon: FileText,
      description: 'Histórico de atividades'
    },
    {
      id: 'files',
      label: 'Arquivos',
      icon: FolderOpen,
      description: 'Gerenciamento de arquivos'
    },
    {
      id: 'monitoring',
      label: 'Monitoramento',
      icon: Activity,
      description: 'Status em tempo real'
    },
    {
      id: 'settings',
      label: 'Configurações',
      icon: Settings,
      description: 'Configurações do sistema'
    }
  ];

  return (
    <>
      {/* Overlay para mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 h-full w-72 bg-slate-900 text-white z-50 transform transition-transform duration-300 ease-in-out",
        "lg:relative lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Header da Sidebar */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-lg">SecureGuard</h2>
              <p className="text-xs text-slate-400">v2.1.4</p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded-md hover:bg-slate-700 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Status de Proteção */}
        <div className="p-6 border-b border-slate-700">
          <div className="bg-green-900 bg-opacity-50 border border-green-700 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <div>
                <p className="font-medium text-green-100">Sistema Protegido</p>
                <p className="text-xs text-green-300">Última atualização: há 2h</p>
              </div>
            </div>
          </div>
        </div>

        {/* Menu de Navegação */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      onTabChange(item.id);
                      onClose(); // Fecha sidebar no mobile após seleção
                    }}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200",
                      isActive 
                        ? "bg-blue-600 text-white shadow-lg" 
                        : "text-slate-300 hover:bg-slate-700 hover:text-white"
                    )}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{item.label}</span>
                        {item.badge && (
                          <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs opacity-75 truncate">{item.description}</p>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer da Sidebar */}
        <div className="p-4 border-t border-slate-700">
          <div className="text-xs text-slate-400 space-y-1">
            <p>CPU: 12% | RAM: 34%</p>
            <p>Uptime: 15 dias, 8h</p>
            <p className="text-green-400">Status: Operacional</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

