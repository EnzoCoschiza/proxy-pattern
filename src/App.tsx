import { useState } from 'react';
import { DocumentProxy, AccessLog } from './proxy/DocumentProxy';
import { PatternDiagram } from './components/PatternDiagram';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, Play, RotateCcw, User, FileText, AlertTriangle, CheckCircle, Terminal } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-neutral-900 to-black">
      {/* Header */}
      <header className="bg-black/40 backdrop-blur-lg border-b border-zinc-700/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="w-10 h-10 text-zinc-100" />
            <h1 className="text-4xl font-bold text-zinc-100 tracking-tight">Patrón de Diseño: PROXY</h1>
          </div>
          <p className="text-center text-zinc-300 text-lg font-light tracking-wide">
            AGENCIA DE INTELIGENCIA ARGENTINA - SISTEMA DE ACCESO SEGURO
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="game" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8 bg-zinc-800/50 border border-zinc-700">
            <TabsTrigger value="game" className="text-base data-[state=active]:bg-zinc-100 data-[state=active]:text-zinc-900">
              <Play className="w-4 h-4 mr-2" />
              Juego Interactivo
            </TabsTrigger>
            <TabsTrigger value="diagram" className="text-base data-[state=active]:bg-zinc-100 data-[state=active]:text-zinc-900">
              <FileText className="w-4 h-4 mr-2" />
              Diagrama Visual
            </TabsTrigger>
          </TabsList>

          <TabsContent value="game" className="space-y-6">
            {/* Escenario */}
            <Card className="border border-zinc-700/50 bg-zinc-900/90 backdrop-blur text-zinc-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-zinc-100">
                  <FileText className="w-6 h-6 text-zinc-400" />
                  ESCENARIO
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-zinc-300 leading-relaxed">
                  La agencia de inteligencia de Argentina tiene un <strong className="text-zinc-100">documento confidencial</strong> en su sistema.
                  Un hacker quiere perjudicar a la nación robando dicha información para venderla en la deepweb.
                </p>
                <p className="text-zinc-300 leading-relaxed">
                  Por suerte, los ingenieros diseñaron un <strong className="text-zinc-100">objeto Proxy</strong> que:
                </p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-zinc-400 mt-0.5 flex-shrink-0" />
                    <span className="text-zinc-300">Registra todos los intentos de acceso (logs)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-zinc-400 mt-0.5 flex-shrink-0" />
                    <span className="text-zinc-300">Permite o deniega accesos según el usuario</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-zinc-400 mt-0.5 flex-shrink-0" />
                    <span className="text-zinc-300">Devuelve información falsa a usuarios no autorizados</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-zinc-400 mt-0.5 flex-shrink-0" />
                    <span className="text-zinc-300">El hacker queda satisfecho sin saber que fue engañado</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Juego */}
            <Card className="border border-zinc-700/50 bg-zinc-900/90 backdrop-blur text-zinc-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-zinc-100">
                  <User className="w-6 h-6 text-zinc-400" />
                  INTENTA ACCEDER AL DOCUMENTO
                </CardTitle>
                <CardDescription className="text-zinc-400">
                  Selecciona un usuario o escribe uno personalizado
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Usuarios predefinidos */}
                <div className="space-y-3">
                  <p className="font-semibold text-sm text-zinc-300">Selecciona un usuario rápido:</p>
                  <div className="grid grid-cols-2 gap-3">
                    {predefinedUsers.map(user => (
                      <Button
                        key={user.name}
                        variant={user.authorized ? "default" : "destructive"}
                        className={`h-auto py-3 flex items-center gap-2 ${
                          user.authorized 
                            ? 'bg-zinc-700 hover:bg-zinc-600 text-zinc-100 border border-zinc-600' 
                            : 'bg-red-900/80 hover:bg-red-800 text-zinc-100 border border-red-800'
                        }`}
                        onClick={() => setUsername(user.name)}
                      >
                        <span className="text-xl">{user.icon}</span>
                        <span className="text-sm">{user.name}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Input y botón */}
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="O ingresa tu nombre de usuario..."
                    className="flex-1 px-4 py-3 bg-zinc-800 border border-zinc-700 text-zinc-100 rounded-lg focus:border-zinc-500 focus:ring-2 focus:ring-zinc-600/20 outline-none transition-all placeholder:text-zinc-500"
                    onKeyPress={(e) => e.key === 'Enter' && handleAccessAttempt()}
                  />
                  <Button 
                    onClick={handleAccessAttempt}
                    size="lg"
                    className="px-6 bg-zinc-100 hover:bg-zinc-200 text-zinc-900"
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    Intentar Acceso
                  </Button>
                </div>

                {/* Estadísticas */}
                <div className="flex items-center justify-between p-4 bg-zinc-800/50 border border-zinc-700 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-5 h-5 text-zinc-400" />
                    <span className="font-semibold text-zinc-300">Intentos: {attempts}</span>
                  </div>
                  <Button 
                    onClick={handleReset}
                    variant="outline"
                    size="sm"
                    className="border-zinc-600 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reiniciar
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Logs */}
            {gameStarted && logs.length > 0 && (
              <Card className="border border-zinc-700/50 bg-zinc-900/90 backdrop-blur text-zinc-100">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-zinc-100">
                    <Terminal className="w-6 h-6 text-zinc-400" />
                    LOGS DEL SISTEMA (PROXY)
                  </CardTitle>
                  <CardDescription className="text-zinc-400">
                    Registro de todos los intentos de acceso
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {logs.map((log, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border-l-4 ${
                        log.granted
                          ? 'bg-zinc-800/50 border-zinc-500'
                          : 'bg-red-950/30 border-red-800'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-zinc-500 font-mono">
                          {log.timestamp.toLocaleTimeString()}
                        </span>
                        <Badge variant={log.granted ? "default" : "destructive"} className={log.granted ? 'bg-zinc-600 text-zinc-100' : 'bg-red-900 text-zinc-100'}>
                          {log.granted ? '✅ ACCESO CONCEDIDO' : '🚨 ACCESO DENEGADO'}
                        </Badge>
                      </div>
                      <div className="text-sm text-zinc-300 mb-1">
                        <strong className="text-zinc-100">Usuario:</strong> {log.user} | <strong className="text-zinc-100">Acción:</strong> {log.action}
                      </div>
                      <div className="text-sm text-zinc-400 italic">
                        {log.message}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Documento */}
            {showDocument && (
              <Card 
                id="document-section"
                className={`border backdrop-blur ${
                  proxy.isAuthorized(username)
                    ? 'border-zinc-600 bg-zinc-900/90'
                    : 'border-orange-900/50 bg-zinc-900/90'
                }`}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-zinc-100">
                    <FileText className="w-6 h-6 text-zinc-400" />
                    DOCUMENTO RECIBIDO
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-black/50 text-zinc-100 p-6 rounded-lg font-mono text-sm overflow-x-auto border border-zinc-800">
                    <pre className="whitespace-pre-wrap">{document}</pre>
                  </div>

                  {!proxy.isAuthorized(username) && (
                    <div className="flex items-start gap-3 p-4 bg-orange-950/30 border border-orange-900/50 rounded-lg">
                      <AlertTriangle className="w-6 h-6 text-orange-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-orange-400 mb-1">
                          ¡Perfecto! El hacker fue engañado
                        </p>
                        <p className="text-orange-300/80 text-sm">
                          El hacker recibió información falsa y cree que robó datos reales.
                          La agencia está a salvo y el hacker no sospecha nada.
                        </p>
                      </div>
                    </div>
                  )}

                  {proxy.isAuthorized(username) && (
                    <div className="flex items-start gap-3 p-4 bg-zinc-800/50 border border-zinc-700 rounded-lg">
                      <CheckCircle className="w-6 h-6 text-zinc-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-zinc-100 mb-1">
                          Acceso Autorizado
                        </p>
                        <p className="text-zinc-300 text-sm">
                          Este es el documento real. Solo usuarios autorizados pueden ver esta información.
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Explicación del patrón */}
            <Card className="border border-zinc-700/50 bg-zinc-900/90 backdrop-blur text-zinc-100">
              <CardHeader>
                <CardTitle className="text-zinc-100">🎓 EXPLICACIÓN DEL PATRÓN PROXY</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-zinc-800/50 rounded-lg border border-zinc-700">
                    <h3 className="font-bold text-lg mb-2 text-zinc-100">🏢 RealDocument</h3>
                    <p className="text-sm text-zinc-300">
                      Contiene el documento confidencial real. Solo el Proxy tiene acceso directo a él.
                    </p>
                  </div>
                  <div className="p-4 bg-zinc-800/50 rounded-lg border border-zinc-700">
                    <h3 className="font-bold text-lg mb-2 text-zinc-100">🛡️ DocumentProxy</h3>
                    <p className="text-sm text-zinc-300">
                      Actúa como intermediario. Controla el acceso, registra logs, y devuelve información
                      falsa a usuarios no autorizados.
                    </p>
                  </div>
                  <div className="p-4 bg-zinc-800/50 rounded-lg border border-zinc-700">
                    <h3 className="font-bold text-lg mb-2 text-zinc-100">👤 Cliente</h3>
                    <p className="text-sm text-zinc-300">
                      Interactúa solo con el Proxy, nunca con el objeto real. No sabe si recibió
                      información real o falsa.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="diagram">
            <PatternDiagram />
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <footer className="bg-black/40 backdrop-blur-lg border-t border-zinc-800 mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-zinc-400">
          <p className="text-base tracking-wide">💡 EJEMPLO EDUCATIVO DEL PATRÓN DE DISEÑO PROXY</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
