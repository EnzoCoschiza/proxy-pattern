// Clase Real - El documento confidencial real
export class RealDocument {
  private readonly confidentialContent: string = `
╔══════════════════════════════════════════════════════════╗
║     DOCUMENTO ULTRA CONFIDENCIAL - NIVEL 5              ║
║     AGENCIA DE INTELIGENCIA ARGENTINA                   ║
╚══════════════════════════════════════════════════════════╝

OPERACIÓN: CÓNDOR AZUL
FECHA: 26 de Octubre de 2025
CLASIFICACIÓN: ULTRA SECRETO

CONTENIDO:
- Ubicación de bases militares secretas
- Códigos de acceso a sistemas de defensa nacional
- Lista de agentes encubiertos en el exterior
- Protocolos de seguridad nacional nivel 5
- Coordenadas de bunkers estratégicos

ADVERTENCIA: La divulgación no autorizada de este documento
está penada por la ley de seguridad nacional.

Firmado: Director de Inteligencia Nacional
  `;

  public read(): string {
    return this.confidentialContent;
  }

  public getDocumentName(): string {
    return "OPERACIÓN CÓNDOR AZUL - ULTRA SECRETO";
  }
}

