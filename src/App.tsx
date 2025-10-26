import { useState } from 'react';
import { DocumentProxy, AccessLog } from './proxy/DocumentProxy';
import './App.css';

const proxy = new DocumentProxy();

function App() {
  const [username, setUsername] = useState('');
  const [document, setDocument] = useState('');
  const [logs, setLogs] = useState<AccessLog[]>([]);
  const [showDocument, setShowDocument] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const handleAccessAttempt = () => {
    if (!username.trim()) {
      alert('Por favor, ingresa un nombre de usuario');
      return;
    }

    setGameStarted(true);
    const documentContent = proxy.read(username);
    
    setDocument(documentContent);
    setLogs(proxy.getLogs());
    setShowDocument(true);
    setAttempts(prev => prev + 1);

    // Scroll al documento después de un momento
    setTimeout(() => {
      window.document.getElementById('document-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleReset = () => {
    setUsername('');
    setDocument('');
    setShowDocument(false);
    setAttempts(0);
    setGameStarted(false);
    proxy.clearLogs();
    setLogs([]);
  };

  const predefinedUsers = [
    { name: 'hacker_dark', authorized: false, icon: '🦹‍♂️' },
    { name: 'anonymous_user', authorized: false, icon: '🎭' },
    { name: 'director', authorized: true, icon: '👔' },
    { name: 'agente007', authorized: true, icon: '🕵️' },
  ];

  return (
    <div className="app">
      <header className="header">
        <h1>🛡️ Patrón de Diseño: PROXY</h1>
        <p className="subtitle">Agencia de Inteligencia Argentina - Sistema de Acceso Seguro</p>
      </header>

      <div className="container">
        <div className="scenario-box">
          <h2>📋 Escenario</h2>
          <p>
            La agencia de inteligencia de Argentina tiene un <strong>documento confidencial</strong> en su sistema.
            Un hacker quiere perjudicar a la nación robando dicha información para venderla en la deepweb.
          </p>
          <p>
            Por suerte, los ingenieros diseñaron un <strong>objeto Proxy</strong> que:
          </p>
          <ul>
            <li>✅ Registra todos los intentos de acceso (logs)</li>
            <li>✅ Permite o deniega accesos según el usuario</li>
            <li>✅ Devuelve información falsa a usuarios no autorizados</li>
            <li>✅ El hacker queda satisfecho sin saber que fue engañado</li>
          </ul>
        </div>

        <div className="game-section">
          <h2>🎮 Intenta Acceder al Documento</h2>
          
          <div className="quick-select">
            <p>Selecciona un usuario rápido:</p>
            <div className="user-buttons">
              {predefinedUsers.map(user => (
                <button
                  key={user.name}
                  className={`user-btn ${user.authorized ? 'authorized' : 'unauthorized'}`}
                  onClick={() => setUsername(user.name)}
                >
                  {user.icon} {user.name}
                </button>
              ))}
            </div>
          </div>

          <div className="input-group">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ingresa tu nombre de usuario..."
              className="username-input"
              onKeyPress={(e) => e.key === 'Enter' && handleAccessAttempt()}
            />
            <button onClick={handleAccessAttempt} className="access-btn">
              🔓 Intentar Acceso
            </button>
          </div>

          <div className="stats">
            <span>Intentos: {attempts}</span>
            <button onClick={handleReset} className="reset-btn">🔄 Reiniciar</button>
          </div>
        </div>

        {gameStarted && logs.length > 0 && (
          <div className="logs-section">
            <h2>📊 Logs del Sistema (Proxy)</h2>
            <div className="logs-container">
              {logs.map((log, index) => (
                <div key={index} className={`log-entry ${log.granted ? 'granted' : 'denied'}`}>
                  <div className="log-header">
                    <span className="log-time">
                      {log.timestamp.toLocaleTimeString()}
                    </span>
                    <span className={`log-status ${log.granted ? 'success' : 'danger'}`}>
                      {log.granted ? '✅ ACCESO CONCEDIDO' : '🚨 ACCESO DENEGADO'}
                    </span>
                  </div>
                  <div className="log-details">
                    <strong>Usuario:</strong> {log.user} | <strong>Acción:</strong> {log.action}
                  </div>
                  <div className="log-message">{log.message}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {showDocument && (
          <div id="document-section" className="document-section">
            <h2>📄 Documento Recibido</h2>
            <div className={`document ${proxy.isAuthorized(username) ? 'real' : 'fake'}`}>
              <pre>{document}</pre>
            </div>
            {!proxy.isAuthorized(username) && (
              <div className="warning-box">
                <p>
                  😈 <strong>¡Perfecto!</strong> El hacker recibió información falsa y cree que robó datos reales.
                  La agencia está a salvo y el hacker no sospecha nada.
                </p>
              </div>
            )}
            {proxy.isAuthorized(username) && (
              <div className="success-box">
                <p>
                  ✅ <strong>Acceso Autorizado:</strong> Este es el documento real. 
                  Solo usuarios autorizados pueden ver esta información.
                </p>
              </div>
            )}
          </div>
        )}

        <div className="explanation-section">
          <h2>🎓 Explicación del Patrón Proxy</h2>
          <div className="pattern-explanation">
            <div className="pattern-card">
              <h3>🏢 RealDocument (Objeto Real)</h3>
              <p>
                Contiene el documento confidencial real. Solo el Proxy tiene acceso directo a él.
              </p>
            </div>
            <div className="pattern-card">
              <h3>🛡️ DocumentProxy (Proxy)</h3>
              <p>
                Actúa como intermediario. Controla el acceso, registra logs, y devuelve información
                falsa a usuarios no autorizados sin que ellos lo sepan.
              </p>
            </div>
            <div className="pattern-card">
              <h3>👤 Cliente (Usuario/Hacker)</h3>
              <p>
                Interactúa solo con el Proxy, nunca con el objeto real. No sabe si recibió
                información real o falsa.
              </p>
            </div>
          </div>
        </div>
      </div>

      <footer className="footer">
        <p>💡 Este es un ejemplo educativo del patrón de diseño Proxy</p>
      </footer>
    </div>
  );
}

export default App;

