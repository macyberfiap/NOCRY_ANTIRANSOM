import React from 'react';
import { Shield, Bell, User, Settings, Menu } from 'lucide-react';
import { cn } from '../../utils/helpers';

const Header = ({ onMenuToggle, notifications = 0, isConnected = true }) => {
  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6">
      {/* Logo e Menu Toggle */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
        >
          <Menu className="h-5 w-5" />
        </button>
        
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">SecureGuard</h1>
            <p className="text-xs text-gray-500">Sistema de Monitoramento</p>
          </div>
        </div>
      </div>

      {/* Status e Notificações */}
      <div className="flex items-center gap-4">
        {/* Status de Proteção e Conexão */}
        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-green-700">Proteção Ativa</span>
          </div>
          
          <div className={cn(
            "flex items-center gap-2 px-3 py-1.5 rounded-full",
            isConnected ? "bg-blue-50" : "bg-red-50"
          )}>
            <div className={cn(
              "w-2 h-2 rounded-full",
              isConnected ? "bg-blue-500 animate-pulse" : "bg-red-500"
            )}></div>
            <span className={cn(
              "text-sm font-medium",
              isConnected ? "text-blue-700" : "text-red-700"
            )}>
              {isConnected ? "Online" : "Offline"}
            </span>
          </div>
        </div>

        {/* Notificações */}
        <button className="relative p-2 rounded-md hover:bg-gray-100 transition-colors">
          <Bell className="h-5 w-5 text-gray-600" />
          {notifications > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {notifications > 9 ? '9+' : notifications}
            </span>
          )}
        </button>

        {/* Configurações */}
        <button className="p-2 rounded-md hover:bg-gray-100 transition-colors">
          <Settings className="h-5 w-5 text-gray-600" />
        </button>

        {/* Usuário */}
        <div className="flex items-center gap-3 pl-3 border-l border-gray-200">
          <div className="hidden md:block text-right">
            <p className="text-sm font-medium text-gray-900">Admin</p>
            <p className="text-xs text-gray-500">Administrador</p>
          </div>
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="h-4 w-4 text-blue-600" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

