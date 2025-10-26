import { RealDocument } from './RealDocument';

export interface AccessLog {
  timestamp: Date;
  user: string;
  action: string;
  granted: boolean;
  message: string;
}

// Clase Proxy - Controla el acceso al documento real
export class DocumentProxy {
  private realDocument: RealDocument;
  private accessLogs: AccessLog[] = [];
  private authorizedUsers: Set<string> = new Set(['admin', 'director', 'agente007']);

  constructor() {
    this.realDocument = new RealDocument();
  }

  public read(username: string): string {
    const log: AccessLog = {
      timestamp: new Date(),
      user: username,
      action: 'READ',
      granted: false,
      message: ''
    };

    // Verificar si el usuario está autorizado
    if (this.authorizedUsers.has(username)) {
      log.granted = true;
      log.message = `✅ Acceso CONCEDIDO a ${username}`;
      this.accessLogs.push(log);
      return this.realDocument.read();
    } else {
      // Usuario no autorizado - devolver documento falso
      log.granted = false;
      log.message = `🚨 Acceso DENEGADO a ${username} - Devolviendo información falsa`;
      this.accessLogs.push(log);
      
      // Activar alerta de seguridad
      this.triggerSecurityAlert(username);
      
      return this.generateFakeDocument();
    }
  }

  public getDocumentName(username: string): string {
    if (this.authorizedUsers.has(username)) {
      return this.realDocument.getDocumentName();
    }
    return "INFORME RUTINARIO - PÚBLICO";
  }

  private generateFakeDocument(): string {
    // Documento falso para engañar al hacker
    return `
╔══════════════════════════════════════════════════════════╗
║     INFORME RUTINARIO - ACCESO PÚBLICO                  ║
║     MINISTERIO DE INFORMACIÓN                           ║
╚══════════════════════════════════════════════════════════╝

INFORME: Estadísticas Mensuales
FECHA: 26 de Octubre de 2025
CLASIFICACIÓN: PÚBLICO

CONTENIDO:
- Reporte de actividades administrativas generales
- Estadísticas de oficinas regionales
- Calendario de eventos públicos del próximo mes
- Información de contacto de oficinas públicas
- Horarios de atención al ciudadano

Este documento contiene información de dominio público
disponible en el sitio web oficial del gobierno.

Departamento de Comunicaciones
    `;
  }

  private triggerSecurityAlert(username: string): void {
    console.warn(`🚨 ALERTA DE SEGURIDAD: Intento de acceso no autorizado por ${username}`);
  }

  public getLogs(): AccessLog[] {
    return [...this.accessLogs];
  }

  public clearLogs(): void {
    this.accessLogs = [];
  }

  public isAuthorized(username: string): boolean {
    return this.authorizedUsers.has(username);
  }
}

