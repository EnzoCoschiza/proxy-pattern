import { useState } from 'react';
import { DocumentProxy, AccessLog } from './proxy/DocumentProxy';
import { PatternDiagram } from './components/PatternDiagram';
import { LearnPage } from './pages/LearnPage';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, Play, RotateCcw, User, FileText, AlertTriangle, CheckCircle, Terminal, BookOpen } from 'lucide-react';

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
        <div className="container mx-auto px-4 py-4 sm:py-6 relative">
          <div className="flex items-center justify-center gap-2 sm:gap-4 mb-3 sm:mb-4">
            <img src="/spy.svg" alt="Spy Icon" className="w-8 h-8 sm:w-10 md:w-12 sm:h-10 md:h-12" />
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-zinc-100 tracking-tight text-center">
              Patrón de Diseño: PROXY
            </h1>
            <Shield className="w-6 h-6 sm:w-8 md:w-10 sm:h-8 md:h-10 text-zinc-100" />
          </div>
          <p className="text-center text-zinc-300 text-xs sm:text-sm md:text-base lg:text-lg font-light tracking-wide px-2">
            AGENCIA DE INTELIGENCIA ARGENTINA - SISTEMA DE ACCESO SEGURO - Kaizen
          </p>
          {/* Logo Kaizen */}
          <div className="absolute top-2 right-2 sm:top-4 sm:right-4">
            <img src="/kaizen-logo.png" alt="Kaizen Evolving Group" className="h-10 sm:h-12 md:h-16 w-auto" />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 md:py-8">
        <Tabs defaultValue="learn" className="w-full">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 mb-4 sm:mb-6 md:mb-8 bg-zinc-800/50 border border-zinc-700">
            <TabsTrigger value="learn" className="text-xs sm:text-sm md:text-base data-[state=active]:bg-zinc-100 data-[state=active]:text-zinc-900">
              <BookOpen className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Aprender</span>
              <span className="sm:hidden">Info</span>
            </TabsTrigger>
            <TabsTrigger value="game" className="text-xs sm:text-sm md:text-base data-[state=active]:bg-zinc-100 data-[state=active]:text-zinc-900">
              <Play className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Juego</span>
              <span className="sm:hidden">Jugar</span>
            </TabsTrigger>
            <TabsTrigger value="diagram" className="text-xs sm:text-sm md:text-base data-[state=active]:bg-zinc-100 data-[state=active]:text-zinc-900">
              <FileText className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Diagrama</span>
              <span className="sm:hidden">Flujo</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="learn">
            <LearnPage />
          </TabsContent>

          <TabsContent value="game" className="space-y-4 sm:space-y-6">
            {/* Escenario */}
            <Card className="border border-zinc-700/50 bg-zinc-900/90 backdrop-blur text-zinc-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-zinc-100 text-base sm:text-lg md:text-xl">
                  <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-zinc-400" />
                  ESCENARIO
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                <p className="text-zinc-300 leading-relaxed text-sm sm:text-base">
                  La agencia de inteligencia de Argentina tiene un <strong className="text-zinc-100">documento confidencial</strong> en su sistema.
                  Un hacker quiere perjudicar a la nación robando dicha información para venderla en la deepweb.
                </p>
                <p className="text-zinc-300 leading-relaxed text-sm sm:text-base">
                  Por suerte, los ingenieros diseñaron un <strong className="text-zinc-100">objeto Proxy</strong> que:
                </p>
                <ul className="space-y-2 ml-2 sm:ml-4">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-400 mt-0.5 flex-shrink-0" />
                    <span className="text-zinc-300 text-sm sm:text-base">Registra todos los intentos de acceso (logs)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-400 mt-0.5 flex-shrink-0" />
                    <span className="text-zinc-300 text-sm sm:text-base">Permite o deniega accesos según el usuario</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-400 mt-0.5 flex-shrink-0" />
                    <span className="text-zinc-300 text-sm sm:text-base">Devuelve información falsa a usuarios no autorizados</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-400 mt-0.5 flex-shrink-0" />
                    <span className="text-zinc-300 text-sm sm:text-base">El hacker queda satisfecho sin saber que fue engañado</span>
                  </li>
                </ul>

                {/* Video del Agente */}
                <div className="max-w-2xl mx-auto pt-2">
                  <div className="relative rounded-lg overflow-hidden border-2 border-zinc-700/50 bg-black shadow-xl">
                    <video
                      className="w-full h-auto"
                      controls
                      loop
                      playsInline
                      preload="metadata"
                    >
                      <source src="/video-agente.mp4" type="video/mp4" />
                      Tu navegador no soporta el elemento de video.
                    </video>
                  </div>
                  <div className="mt-2 text-center">
                    <p className="text-xs sm:text-sm text-zinc-400">
                      🕵️ Agente de Inteligencia Protegiendo Información Clasificada
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Juego */}
            <Card className="border border-zinc-700/50 bg-zinc-900/90 backdrop-blur text-zinc-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-zinc-100 text-base sm:text-lg md:text-xl">
                  <User className="w-5 h-5 sm:w-6 sm:h-6 text-zinc-400" />
                  INTENTA ACCEDER AL DOCUMENTO
                </CardTitle>
                <CardDescription className="text-zinc-400 text-xs sm:text-sm">
                  Selecciona un usuario o escribe uno personalizado
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6">
                {/* Usuarios predefinidos */}
                <div className="space-y-3">
                  <p className="font-semibold text-xs sm:text-sm text-zinc-300">Selecciona un usuario rápido:</p>
                  <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 sm:gap-3">
                    {predefinedUsers.map(user => (
                      <Button
                        key={user.name}
                        variant={user.authorized ? "default" : "destructive"}
                        className={`h-auto py-2 sm:py-3 flex items-center justify-center gap-2 ${
                          user.authorized 
                            ? 'bg-zinc-700 hover:bg-zinc-600 text-zinc-100 border border-zinc-600' 
                            : 'bg-red-900/80 hover:bg-red-800 text-zinc-100 border border-red-800'
                        }`}
                        onClick={() => setUsername(user.name)}
                      >
                        <span className="text-lg sm:text-xl">{user.icon}</span>
                        <span className="text-xs sm:text-sm">{user.name}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Input y botón */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="O ingresa tu nombre de usuario..."
                    className="flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-zinc-800 border border-zinc-700 text-zinc-100 text-sm sm:text-base rounded-lg focus:border-zinc-500 focus:ring-2 focus:ring-zinc-600/20 outline-none transition-all placeholder:text-zinc-500"
                    onKeyPress={(e) => e.key === 'Enter' && handleAccessAttempt()}
                  />
                  <Button 
                    onClick={handleAccessAttempt}
                    size="lg"
                    className="px-4 sm:px-6 py-2 sm:py-3 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 w-full sm:w-auto text-sm sm:text-base"
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    Intentar Acceso
                  </Button>
                </div>

                {/* Estadísticas */}
                <div className="flex flex-col xs:flex-row items-center justify-between gap-3 xs:gap-0 p-3 sm:p-4 bg-zinc-800/50 border border-zinc-700 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-400" />
                    <span className="font-semibold text-zinc-300 text-sm sm:text-base">Intentos: {attempts}</span>
                  </div>
                  <Button 
                    onClick={handleReset}
                    variant="outline"
                    size="sm"
                    className="border-zinc-600 bg-zinc-800/50 text-zinc-300 hover:bg-zinc-700 hover:text-zinc-100 text-xs sm:text-sm w-full xs:w-auto"
                  >
                    <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                    Reiniciar
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Logs */}
            {gameStarted && logs.length > 0 && (
              <Card className="border border-zinc-700/50 bg-zinc-900/90 backdrop-blur text-zinc-100">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-zinc-100 text-base sm:text-lg md:text-xl">
                    <Terminal className="w-5 h-5 sm:w-6 sm:h-6 text-zinc-400" />
                    LOGS DEL SISTEMA (PROXY)
                  </CardTitle>
                  <CardDescription className="text-zinc-400 text-xs sm:text-sm">
                    Registro de todos los intentos de acceso
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 sm:space-y-3">
                  {logs.map((log, index) => (
                    <div
                      key={index}
                      className={`p-3 sm:p-4 rounded-lg border-l-4 ${
                        log.granted
                          ? 'bg-zinc-800/50 border-zinc-500'
                          : 'bg-red-950/30 border-red-800'
                      }`}
                    >
                      <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-2 mb-2">
                        <span className="text-xs text-zinc-500 font-mono">
                          {log.timestamp.toLocaleTimeString()}
                        </span>
                        <Badge variant={log.granted ? "default" : "destructive"} className={`${log.granted ? 'bg-zinc-600 text-zinc-100' : 'bg-red-900 text-zinc-100'} text-xs whitespace-nowrap`}>
                          {log.granted ? '✅ ACCESO CONCEDIDO' : '🚨 ACCESO DENEGADO'}
                        </Badge>
                      </div>
                      <div className="text-xs sm:text-sm text-zinc-300 mb-1 break-words">
                        <strong className="text-zinc-100">Usuario:</strong> {log.user} | <strong className="text-zinc-100">Acción:</strong> {log.action}
                      </div>
                      <div className="text-xs sm:text-sm text-zinc-400 italic break-words">
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
                  <CardTitle className="flex items-center gap-2 text-zinc-100 text-base sm:text-lg md:text-xl">
                    <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-zinc-400" />
                    DOCUMENTO RECIBIDO
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4">
                  <div className="bg-black/50 text-zinc-100 p-3 sm:p-4 md:p-6 rounded-lg font-mono text-xs sm:text-sm overflow-x-auto border border-zinc-800">
                    <pre className="whitespace-pre-wrap">{document}</pre>
                  </div>

                  {!proxy.isAuthorized(username) && (
                    <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-orange-950/30 border border-orange-900/50 rounded-lg">
                      <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-orange-400 mb-1 text-sm sm:text-base">
                          ¡Perfecto! El hacker fue engañado
                        </p>
                        <p className="text-orange-300/80 text-xs sm:text-sm">
                          El hacker recibió información falsa y cree que robó datos reales.
                          La agencia está a salvo y el hacker no sospecha nada.
                        </p>
                      </div>
                    </div>
                  )}

                  {proxy.isAuthorized(username) && (
                    <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-green-950/30 border border-green-800/50 rounded-lg">
                      <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-green-400 mb-1 text-sm sm:text-base">
                          Acceso Autorizado
                        </p>
                        <p className="text-green-300/80 text-xs sm:text-sm">
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
                <CardTitle className="text-zinc-100 text-base sm:text-lg md:text-xl">🎓 EXPLICACIÓN DEL PATRÓN PROXY</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                  <div className="p-3 sm:p-4 bg-zinc-800/50 rounded-lg border border-zinc-700">
                    <h3 className="font-bold text-base sm:text-lg mb-2 text-zinc-100">🏢 RealDocument</h3>
                    <p className="text-xs sm:text-sm text-zinc-300">
                      Contiene el documento confidencial real. Solo el Proxy tiene acceso directo a él.
                    </p>
                  </div>
                  <div className="p-3 sm:p-4 bg-zinc-800/50 rounded-lg border border-zinc-700">
                    <h3 className="font-bold text-base sm:text-lg mb-2 text-zinc-100">🛡️ DocumentProxy</h3>
                    <p className="text-xs sm:text-sm text-zinc-300">
                      Actúa como intermediario. Controla el acceso, registra logs, y devuelve información
                      falsa a usuarios no autorizados.
                    </p>
                  </div>
                  <div className="p-3 sm:p-4 bg-zinc-800/50 rounded-lg border border-zinc-700">
                    <h3 className="font-bold text-base sm:text-lg mb-2 text-zinc-100">👤 Cliente</h3>
                    <p className="text-xs sm:text-sm text-zinc-300">
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
      <footer className="bg-black/40 backdrop-blur-lg border-t border-zinc-800 mt-8 sm:mt-12">
        <div className="container mx-auto px-4 py-4 sm:py-6">
          <div className="text-center space-y-1 sm:space-y-2">
            <p className="text-xs sm:text-sm md:text-base tracking-wide text-zinc-400">💡 EJEMPLO EDUCATIVO DEL PATRÓN DE DISEÑO PROXY</p>
            <p className="text-xs sm:text-sm text-zinc-500">
              Made by <span className="text-zinc-300 font-semibold">Kaizen</span> - Diseño de Sistemas de Información
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
