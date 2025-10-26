import { useState } from 'react';
import './PatternDiagram.css';

interface FlowStep {
  id: number;
  active: boolean;
  completed: boolean;
}

export function PatternDiagram() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [flowSteps, setFlowSteps] = useState<FlowStep[]>([
    { id: 1, active: false, completed: false },
    { id: 2, active: false, completed: false },
    { id: 3, active: false, completed: false },
    { id: 4, active: false, completed: false },
    { id: 5, active: false, completed: false },
  ]);
  const [userType, setUserType] = useState<'authorized' | 'unauthorized'>('unauthorized');

  const animateFlow = () => {
    setIsAnimating(true);
    setFlowSteps([
      { id: 1, active: false, completed: false },
      { id: 2, active: false, completed: false },
      { id: 3, active: false, completed: false },
      { id: 4, active: false, completed: false },
      { id: 5, active: false, completed: false },
    ]);

    // Paso 1: Usuario solicita acceso
    setTimeout(() => {
      setFlowSteps(prev => prev.map(s => s.id === 1 ? { ...s, active: true } : s));
    }, 300);

    setTimeout(() => {
      setFlowSteps(prev => prev.map(s => s.id === 1 ? { ...s, active: false, completed: true } : s));
    }, 1300);

    // Paso 2: Proxy intercepta
    setTimeout(() => {
      setFlowSteps(prev => prev.map(s => s.id === 2 ? { ...s, active: true } : s));
    }, 1500);

    setTimeout(() => {
      setFlowSteps(prev => prev.map(s => s.id === 2 ? { ...s, active: false, completed: true } : s));
    }, 2500);

    // Paso 3: Proxy verifica credenciales
    setTimeout(() => {
      setFlowSteps(prev => prev.map(s => s.id === 3 ? { ...s, active: true } : s));
    }, 2700);

    setTimeout(() => {
      setFlowSteps(prev => prev.map(s => s.id === 3 ? { ...s, active: false, completed: true } : s));
    }, 3700);

    // Paso 4: Decisión del Proxy
    setTimeout(() => {
      setFlowSteps(prev => prev.map(s => s.id === 4 ? { ...s, active: true } : s));
    }, 3900);

    setTimeout(() => {
      setFlowSteps(prev => prev.map(s => s.id === 4 ? { ...s, active: false, completed: true } : s));
    }, 4900);

    // Paso 5: Respuesta al usuario
    setTimeout(() => {
      setFlowSteps(prev => prev.map(s => s.id === 5 ? { ...s, active: true } : s));
    }, 5100);

    setTimeout(() => {
      setFlowSteps(prev => prev.map(s => s.id === 5 ? { ...s, active: false, completed: true } : s));
      setIsAnimating(false);
    }, 6100);
  };

  return (
    <div className="pattern-diagram-container">
      <div className="diagram-header">
        <h2>📐 Diagrama del Patrón Proxy</h2>
        <p>Visualización interactiva del flujo de comunicación</p>
      </div>

      <div className="user-type-selector">
        <button
          className={`type-btn ${userType === 'unauthorized' ? 'active' : ''}`}
          onClick={() => setUserType('unauthorized')}
        >
          🦹‍♂️ Usuario No Autorizado (Hacker)
        </button>
        <button
          className={`type-btn ${userType === 'authorized' ? 'active' : ''}`}
          onClick={() => setUserType('authorized')}
        >
          🕵️ Usuario Autorizado (Agente)
        </button>
      </div>
      <div className="animation-controls">
        <button 
          className="animate-btn"
          onClick={animateFlow}
          disabled={isAnimating}
        >
          {isAnimating ? '⏳ Animando...' : '▶️ Animar Flujo'}
        </button>
      </div>


      <div className="architecture-diagram">
        {/* Cliente */}
        <div className="diagram-box client-box">
          <div className="box-icon">👤</div>
          <h3>Cliente</h3>
          <p className="box-label">{userType === 'authorized' ? 'Agente007' : 'Hacker_Dark'}</p>
          <div className="box-description">
            Solicita acceso al documento confidencial
          </div>
          {flowSteps[0].active && <div className="pulse-indicator"></div>}
          {flowSteps[0].completed && <div className="check-indicator">✓</div>}
        </div>

        {/* Flecha 1 */}
        <div className={`arrow arrow-down ${flowSteps[0].active || flowSteps[0].completed ? 'active' : ''}`}>
          <div className="arrow-label">1. read(username)</div>
          <div className="arrow-line"></div>
          <div className="arrow-head">▼</div>
        </div>

        {/* Proxy */}
        <div className="diagram-box proxy-box">
          <div className="box-icon">🛡️</div>
          <h3>DocumentProxy</h3>
          <p className="box-label">Intermediario de Seguridad</p>
          <div className="box-description">
            • Intercepta la solicitud<br/>
            • Verifica credenciales<br/>
            • Registra logs<br/>
            • Decide qué retornar
          </div>
          {flowSteps[1].active && <div className="pulse-indicator"></div>}
          {flowSteps[1].completed && <div className="check-indicator">✓</div>}
        </div>

        {/* Flecha 2 - Verificación */}
        <div className={`arrow arrow-side ${flowSteps[2].active || flowSteps[2].completed ? 'active' : ''}`}>
          <div className="verification-box">
            <div className="verification-content">
              <span className="verification-icon">🔍</span>
              <div className="verification-text">
                <strong>Verificación</strong>
                <p>¿Usuario autorizado?</p>
                <div className={`verification-result ${userType === 'authorized' ? 'success' : 'danger'}`}>
                  {userType === 'authorized' ? '✅ SÍ' : '❌ NO'}
                </div>
              </div>
            </div>
          </div>
          {flowSteps[2].active && <div className="pulse-indicator"></div>}
          {flowSteps[2].completed && <div className="check-indicator">✓</div>}
        </div>

        {/* Decisión del Proxy */}
        <div className={`decision-split ${flowSteps[3].active || flowSteps[3].completed ? 'active' : ''}`}>
          <div className={`decision-path left-path ${userType === 'authorized' ? 'chosen' : ''}`}>
            <div className="arrow arrow-diagonal-left">
              <div className="arrow-label">3a. Autorizado</div>
              <div className="arrow-line"></div>
              <div className="arrow-head">▼</div>
            </div>
            <div className="diagram-box real-doc-box">
              <div className="box-icon">📄</div>
              <h3>RealDocument</h3>
              <p className="box-label">Documento Real</p>
              <div className="box-description">
                OPERACIÓN CÓNDOR AZUL<br/>
                <span className="secret-label">🔒 ULTRA SECRETO</span>
              </div>
              {flowSteps[3].active && userType === 'authorized' && <div className="pulse-indicator"></div>}
              {flowSteps[3].completed && userType === 'authorized' && <div className="check-indicator">✓</div>}
            </div>
          </div>

          <div className={`decision-path right-path ${userType === 'unauthorized' ? 'chosen' : ''}`}>
            <div className="arrow arrow-diagonal-right">
              <div className="arrow-label">3b. No Autorizado</div>
              <div className="arrow-line"></div>
              <div className="arrow-head">▼</div>
            </div>
            <div className="diagram-box fake-doc-box">
              <div className="box-icon">📋</div>
              <h3>Documento Falso</h3>
              <p className="box-label">Información Engañosa</p>
              <div className="box-description">
                Informe Rutinario<br/>
                <span className="fake-label">🎭 PÚBLICO (Falso)</span>
              </div>
              {flowSteps[3].active && userType === 'unauthorized' && <div className="pulse-indicator"></div>}
              {flowSteps[3].completed && userType === 'unauthorized' && <div className="check-indicator">✓</div>}
            </div>
          </div>
        </div>

        {/* Flecha 4 - Retorno */}
        <div className={`arrow arrow-up ${flowSteps[4].active || flowSteps[4].completed ? 'active' : ''}`}>
          <div className="arrow-head up">▲</div>
          <div className="arrow-line"></div>
          <div className="arrow-label">4. Retorna documento</div>
        </div>

        {/* Cliente recibe respuesta */}
        <div className="diagram-box response-box">
          <div className="box-icon">
            {userType === 'authorized' ? '✅' : '😈'}
          </div>
          <h3>Respuesta Recibida</h3>
          <p className="box-label">
            {userType === 'authorized' 
              ? 'Documento Real Recibido' 
              : 'Hacker Engañado Exitosamente'}
          </p>
          <div className="box-description">
            {userType === 'authorized'
              ? 'El agente tiene acceso a la información confidencial'
              : 'El hacker cree que robó información real, pero es falsa'}
          </div>
          {flowSteps[4].active && <div className="pulse-indicator"></div>}
          {flowSteps[4].completed && <div className="check-indicator">✓</div>}
        </div>
      </div>

      
      <div className="pattern-benefits">
        <h3>🎯 Beneficios del Patrón Proxy</h3>
        <div className="benefits-grid">
          <div className="benefit-card">
            <div className="benefit-icon">🔒</div>
            <h4>Control de Acceso</h4>
            <p>El Proxy verifica permisos antes de permitir acceso al objeto real</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">📊</div>
            <h4>Logging y Auditoría</h4>
            <p>Registra todas las operaciones para análisis de seguridad</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">🛡️</div>
            <h4>Protección del Objeto Real</h4>
            <p>El cliente nunca accede directamente al objeto real</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">🎭</div>
            <h4>Respuestas Personalizadas</h4>
            <p>Puede devolver diferentes respuestas según el contexto</p>
          </div>
        </div>
      </div>

      <div className="code-structure">
        <h3>💻 Estructura del Código</h3>
        <div className="code-boxes">
          <div className="code-box">
            <h4>🏢 RealDocument.ts</h4>
            <pre>{`class RealDocument {
  private confidentialContent: string;
  
  read(): string {
    return this.confidentialContent;
  }
}`}</pre>
          </div>
          <div className="code-box">
            <h4>🛡️ DocumentProxy.ts</h4>
            <pre>{`class DocumentProxy {
  private realDocument: RealDocument;
  private authorizedUsers: Set<string>;
  
  read(username: string): string {
    if (this.isAuthorized(username)) {
      return this.realDocument.read();
    } else {
      this.triggerAlert(username);
      return this.generateFakeDocument();
    }
  }
}`}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}

