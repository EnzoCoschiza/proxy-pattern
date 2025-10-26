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
    <div className="min-h-screen bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="w-10 h-10 text-white" />
            <h1 className="text-4xl font-bold text-white">Patrón de Diseño: PROXY</h1>
          </div>
          <p className="text-center text-white/90 text-lg">
            Agencia de Inteligencia Argentina - Sistema de Acceso Seguro
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="game" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="game" className="text-base">
              <Play className="w-4 h-4 mr-2" />
              Juego Interactivo
            </TabsTrigger>
            <TabsTrigger value="diagram" className="text-base">
              <FileText className="w-4 h-4 mr-2" />
              Diagrama Visual
            </TabsTrigger>
          </TabsList>

          <TabsContent value="game" className="space-y-6">
            {/* Escenario */}
            <Card className="border-2 border-white/20 bg-white/95 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-6 h-6 text-primary" />
                  Escenario
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  La agencia de inteligencia de Argentina tiene un <strong>documento confidencial</strong> en su sistema.
                  Un hacker quiere perjudicar a la nación robando dicha información para venderla en la deepweb.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Por suerte, los ingenieros diseñaron un <strong>objeto Proxy</strong> que:
                </p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Registra todos los intentos de acceso (logs)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Permite o deniega accesos según el usuario</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Devuelve información falsa a usuarios no autorizados</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>El hacker queda satisfecho sin saber que fue engañado</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Juego */}
            <Card className="border-2 border-white/20 bg-white/95 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-6 h-6 text-primary" />
                  Intenta Acceder al Documento
                </CardTitle>
                <CardDescription>
                  Selecciona un usuario o escribe uno personalizado
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Usuarios predefinidos */}
                <div className="space-y-3">
                  <p className="font-semibold text-sm text-gray-700">Selecciona un usuario rápido:</p>
                  <div className="grid grid-cols-2 gap-3">
                    {predefinedUsers.map(user => (
                      <Button
                        key={user.name}
                        variant={user.authorized ? "default" : "destructive"}
                        className="h-auto py-3 flex items-center gap-2"
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
                    className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    onKeyPress={(e) => e.key === 'Enter' && handleAccessAttempt()}
                  />
                  <Button 
                    onClick={handleAccessAttempt}
                    size="lg"
                    className="px-6"
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    Intentar Acceso
                  </Button>
                </div>

                {/* Estadísticas */}
                <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-5 h-5 text-gray-600" />
                    <span className="font-semibold text-gray-700">Intentos: {attempts}</span>
                  </div>
                  <Button 
                    onClick={handleReset}
                    variant="outline"
                    size="sm"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reiniciar
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Logs */}
            {gameStarted && logs.length > 0 && (
              <Card className="border-2 border-white/20 bg-white/95 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Terminal className="w-6 h-6 text-primary" />
                    Logs del Sistema (Proxy)
                  </CardTitle>
                  <CardDescription>
                    Registro de todos los intentos de acceso
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {logs.map((log, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border-l-4 ${
                        log.granted
                          ? 'bg-green-50 border-green-500'
                          : 'bg-red-50 border-red-500'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-500 font-mono">
                          {log.timestamp.toLocaleTimeString()}
                        </span>
                        <Badge variant={log.granted ? "default" : "destructive"}>
                          {log.granted ? '✅ ACCESO CONCEDIDO' : '🚨 ACCESO DENEGADO'}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-700 mb-1">
                        <strong>Usuario:</strong> {log.user} | <strong>Acción:</strong> {log.action}
                      </div>
                      <div className="text-sm text-gray-600 italic">
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
                className={`border-2 bg-white/95 backdrop-blur ${
                  proxy.isAuthorized(username)
                    ? 'border-green-500'
                    : 'border-orange-500'
                }`}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-6 h-6 text-primary" />
                    Documento Recibido
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-gray-900 text-gray-100 p-6 rounded-lg font-mono text-sm overflow-x-auto">
                    <pre className="whitespace-pre-wrap">{document}</pre>
                  </div>

                  {!proxy.isAuthorized(username) && (
                    <div className="flex items-start gap-3 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                      <AlertTriangle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-orange-900 mb-1">
                          ¡Perfecto! El hacker fue engañado
                        </p>
                        <p className="text-orange-800 text-sm">
                          El hacker recibió información falsa y cree que robó datos reales.
                          La agencia está a salvo y el hacker no sospecha nada.
                        </p>
                      </div>
                    </div>
                  )}

                  {proxy.isAuthorized(username) && (
                    <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-green-900 mb-1">
                          Acceso Autorizado
                        </p>
                        <p className="text-green-800 text-sm">
                          Este es el documento real. Solo usuarios autorizados pueden ver esta información.
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Explicación del patrón */}
            <Card className="border-2 border-white/20 bg-white/95 backdrop-blur">
              <CardHeader>
                <CardTitle>🎓 Explicación del Patrón Proxy</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                    <h3 className="font-bold text-lg mb-2 text-blue-900">🏢 RealDocument</h3>
                    <p className="text-sm text-blue-800">
                      Contiene el documento confidencial real. Solo el Proxy tiene acceso directo a él.
                    </p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                    <h3 className="font-bold text-lg mb-2 text-purple-900">🛡️ DocumentProxy</h3>
                    <p className="text-sm text-purple-800">
                      Actúa como intermediario. Controla el acceso, registra logs, y devuelve información
                      falsa a usuarios no autorizados.
                    </p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
                    <h3 className="font-bold text-lg mb-2 text-green-900">👤 Cliente</h3>
                    <p className="text-sm text-green-800">
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
      <footer className="bg-black/20 backdrop-blur-lg border-t border-white/10 mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-white">
          <p className="text-lg">💡 Este es un ejemplo educativo del patrón de diseño Proxy</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
