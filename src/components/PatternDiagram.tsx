import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, User, Shield, FileText, FileWarning, CheckCircle, Lock, Unlock, ArrowDown, ArrowUp, Search } from 'lucide-react';

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

    setTimeout(() => setFlowSteps(prev => prev.map(s => s.id === 1 ? { ...s, active: true } : s)), 300);
    setTimeout(() => setFlowSteps(prev => prev.map(s => s.id === 1 ? { ...s, active: false, completed: true } : s)), 1300);
    setTimeout(() => setFlowSteps(prev => prev.map(s => s.id === 2 ? { ...s, active: true } : s)), 1500);
    setTimeout(() => setFlowSteps(prev => prev.map(s => s.id === 2 ? { ...s, active: false, completed: true } : s)), 2500);
    setTimeout(() => setFlowSteps(prev => prev.map(s => s.id === 3 ? { ...s, active: true } : s)), 2700);
    setTimeout(() => setFlowSteps(prev => prev.map(s => s.id === 3 ? { ...s, active: false, completed: true } : s)), 3700);
    setTimeout(() => setFlowSteps(prev => prev.map(s => s.id === 4 ? { ...s, active: true } : s)), 3900);
    setTimeout(() => setFlowSteps(prev => prev.map(s => s.id === 4 ? { ...s, active: false, completed: true } : s)), 4900);
    setTimeout(() => setFlowSteps(prev => prev.map(s => s.id === 5 ? { ...s, active: true } : s)), 5100);
    setTimeout(() => {
      setFlowSteps(prev => prev.map(s => s.id === 5 ? { ...s, active: false, completed: true } : s));
      setIsAnimating(false);
    }, 6100);
  };

  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8">
      {/* Header */}
      <Card className="border border-zinc-700/50 bg-zinc-900/90 backdrop-blur text-zinc-100">
        <CardHeader className="text-center">
          <CardTitle className="text-xl sm:text-2xl md:text-3xl text-zinc-100">📐 DIAGRAMA DEL PATRÓN PROXY</CardTitle>
          <CardDescription className="text-sm sm:text-base md:text-lg text-zinc-400">
            Visualización interactiva del flujo de comunicación
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Controles */}
      <Card className="border border-zinc-700/50 bg-zinc-900/90 backdrop-blur text-zinc-100">
        <CardContent className="pt-4 sm:pt-6">
          <div className="flex flex-col gap-3 sm:gap-4">
            <div className="flex flex-col xs:flex-row gap-2 sm:gap-3 justify-center">
              <Button
                variant={userType === 'unauthorized' ? 'default' : 'outline'}
                onClick={() => setUserType('unauthorized')}
                className={`h-auto py-2 sm:py-3 px-3 sm:px-4 md:px-6 text-xs sm:text-sm ${
                  userType === 'unauthorized'
                    ? 'bg-red-900/80 hover:bg-red-800 text-zinc-100 border border-red-800'
                    : 'border-zinc-600 text-zinc-300 hover:bg-zinc-800'
                }`}
              >
                <span className="text-base sm:text-xl mr-1 sm:mr-2">🦹‍♂️</span>
                <span className="hidden sm:inline">Usuario No Autorizado (Hacker)</span>
                <span className="sm:hidden">No Autorizado</span>
              </Button>
              <Button
                variant={userType === 'authorized' ? 'default' : 'outline'}
                onClick={() => setUserType('authorized')}
                className={`h-auto py-2 sm:py-3 px-3 sm:px-4 md:px-6 text-xs sm:text-sm ${
                  userType === 'authorized'
                    ? 'bg-green-700 hover:bg-green-600 text-zinc-100 border border-green-600'
                    : 'border-zinc-600 text-zinc-300 hover:bg-zinc-800'
                }`}
              >
                <span className="text-base sm:text-xl mr-1 sm:mr-2">🕵️</span>
                <span className="hidden sm:inline">Usuario Autorizado (Agente)</span>
                <span className="sm:hidden">Autorizado</span>
              </Button>
            </div>
            <Button 
              onClick={animateFlow}
              disabled={isAnimating}
              size="lg"
              className="px-4 sm:px-6 md:px-8 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 w-full sm:w-auto mx-auto text-sm sm:text-base"
            >
              <Play className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              {isAnimating ? 'Animando...' : 'Animar Flujo'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Diagrama */}
      <Card className="border border-zinc-700/50 bg-gradient-to-br from-zinc-900 to-zinc-800">
        <CardContent className="pt-4 sm:pt-6 md:pt-8 px-2 sm:px-4">
          <div className="flex flex-col items-center gap-4 sm:gap-6 max-w-4xl mx-auto">
            
            {/* Cliente */}
            <div className="relative w-full max-w-xs sm:max-w-sm">
              <Card className={`border-2 transition-all duration-300 ${
                flowSteps[0].active ? 'ring-4 ring-blue-400 scale-105' : ''
              } ${flowSteps[0].completed ? 'border-green-500' : 'border-blue-500'}`}>
                <CardHeader className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 sm:p-6">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <User className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 flex-shrink-0" />
                    <div className="min-w-0">
                      <CardTitle className="text-blue-900 text-sm sm:text-base md:text-lg">Cliente</CardTitle>
                      <CardDescription className="text-blue-700 font-semibold text-xs sm:text-sm truncate">
                        {userType === 'authorized' ? 'Agente007' : 'Hacker_Dark'}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-3 sm:pt-4 p-3 sm:p-6">
                  <p className="text-xs sm:text-sm text-gray-700">
                    Solicita acceso al documento confidencial
                  </p>
                </CardContent>
              </Card>
              {flowSteps[0].completed && (
                <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-green-500 text-white rounded-full p-0.5 sm:p-1">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              )}
            </div>

            {/* Flecha 1 */}
            <div className={`flex flex-col items-center transition-opacity ${
              flowSteps[0].active || flowSteps[0].completed ? 'opacity-100' : 'opacity-30'
            }`}>
              <Badge variant="default" className="mb-1 sm:mb-2 bg-zinc-700 text-zinc-100 text-xs sm:text-sm">1. read(username)</Badge>
              <ArrowDown className="w-6 h-6 sm:w-8 sm:h-8 text-zinc-100 animate-bounce" />
            </div>

            {/* Proxy */}
            <div className="relative w-full max-w-xs sm:max-w-sm">
              <Card className={`border-2 transition-all duration-300 ${
                flowSteps[1].active ? 'ring-4 ring-purple-400 scale-105' : ''
              } ${flowSteps[1].completed ? 'border-green-500' : 'border-purple-500'}`}>
                <CardHeader className="bg-gradient-to-br from-purple-50 to-purple-100 p-3 sm:p-6">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600 flex-shrink-0" />
                    <div className="min-w-0">
                      <CardTitle className="text-purple-900 text-sm sm:text-base md:text-lg">DocumentProxy</CardTitle>
                      <CardDescription className="text-purple-700 font-semibold text-xs sm:text-sm">
                        Intermediario de Seguridad
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-3 sm:pt-4 p-3 sm:p-6">
                  <ul className="text-xs sm:text-sm text-gray-700 space-y-0.5 sm:space-y-1">
                    <li>• Intercepta la solicitud</li>
                    <li>• Verifica credenciales</li>
                    <li>• Registra logs</li>
                    <li>• Decide qué retornar</li>
                  </ul>
                </CardContent>
              </Card>
              {flowSteps[1].completed && (
                <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-green-500 text-white rounded-full p-0.5 sm:p-1">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              )}
            </div>

            {/* Verificación */}
            <div className={`transition-opacity w-full max-w-xs sm:max-w-sm ${
              flowSteps[2].active || flowSteps[2].completed ? 'opacity-100' : 'opacity-30'
            }`}>
              <Card className="border-2 border-orange-500 bg-gradient-to-br from-orange-50 to-orange-100">
                <CardContent className="pt-4 sm:pt-6 p-3 sm:p-6">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Search className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-orange-900 mb-1 text-sm sm:text-base">Verificación</p>
                      <p className="text-xs sm:text-sm text-orange-700 mb-2">¿Usuario autorizado?</p>
                      <Badge variant={userType === 'authorized' ? 'default' : 'destructive'} className="text-xs sm:text-sm">
                        {userType === 'authorized' ? '✅ SÍ' : '❌ NO'}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Decisión */}
            <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 w-full max-w-3xl transition-opacity ${
              flowSteps[3].active || flowSteps[3].completed ? 'opacity-100' : 'opacity-30'
            }`}>
              {/* Documento Real */}
              <div className={`transition-all duration-500 ${
                userType === 'authorized' ? 'sm:scale-105 opacity-100' : 'sm:scale-95 opacity-40'
              }`}>
                <div className="flex flex-col items-center gap-2 sm:gap-3">
                  <Badge variant="default" className="text-xs sm:text-sm">3a. Autorizado</Badge>
                  <ArrowDown className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                  <div className="relative w-full">
                    <Card className="border-2 border-green-500 bg-gradient-to-br from-green-50 to-green-100">
                      <CardHeader className="p-3 sm:p-6">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 flex-shrink-0" />
                          <div className="min-w-0">
                            <CardTitle className="text-green-900 text-sm sm:text-base md:text-lg">RealDocument</CardTitle>
                            <CardDescription className="text-green-700 font-semibold text-xs sm:text-sm">
                              Documento Real
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-3 sm:p-6 pt-0">
                        <p className="text-xs sm:text-sm text-gray-700 mb-2">OPERACIÓN CÓNDOR AZUL</p>
                        <Badge className="bg-green-600 text-xs sm:text-sm">
                          <Lock className="w-3 h-3 mr-1" />
                          ULTRA SECRETO
                        </Badge>
                      </CardContent>
                    </Card>
                    {flowSteps[3].completed && userType === 'authorized' && (
                      <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-green-500 text-white rounded-full p-0.5 sm:p-1">
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Documento Falso */}
              <div className={`transition-all duration-500 ${
                userType === 'unauthorized' ? 'sm:scale-105 opacity-100' : 'sm:scale-95 opacity-40'
              }`}>
                <div className="flex flex-col items-center gap-2 sm:gap-3">
                  <Badge variant="destructive" className="text-xs sm:text-sm">3b. No Autorizado</Badge>
                  <ArrowDown className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
                  <div className="relative w-full">
                    <Card className="border-2 border-orange-500 bg-gradient-to-br from-orange-50 to-orange-100">
                      <CardHeader className="p-3 sm:p-6">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <FileWarning className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600 flex-shrink-0" />
                          <div className="min-w-0">
                            <CardTitle className="text-orange-900 text-sm sm:text-base md:text-lg">Documento Falso</CardTitle>
                            <CardDescription className="text-orange-700 font-semibold text-xs sm:text-sm">
                              Información Engañosa
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-3 sm:p-6 pt-0">
                        <p className="text-xs sm:text-sm text-gray-700 mb-2">Informe Rutinario</p>
                        <Badge className="bg-orange-600 text-xs sm:text-sm">
                          <Unlock className="w-3 h-3 mr-1" />
                          PÚBLICO (Falso)
                        </Badge>
                      </CardContent>
                    </Card>
                    {flowSteps[3].completed && userType === 'unauthorized' && (
                      <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-green-500 text-white rounded-full p-0.5 sm:p-1">
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Flecha de retorno */}
            <div className={`flex flex-col items-center transition-opacity ${
              flowSteps[4].active || flowSteps[4].completed ? 'opacity-100' : 'opacity-30'
            }`}>
              <ArrowUp className="w-6 h-6 sm:w-8 sm:h-8 text-zinc-100 animate-bounce" />
              <Badge variant="default" className="mt-1 sm:mt-2 bg-zinc-700 text-zinc-100 text-xs sm:text-sm">4. Retorna documento</Badge>
            </div>

            {/* Respuesta */}
            <div className="relative w-full max-w-xs sm:max-w-sm">
              <Card className={`border-2 transition-all duration-300 ${
                flowSteps[4].active ? 'ring-4 ring-indigo-400 scale-105' : ''
              } ${flowSteps[4].completed ? 'border-green-500' : 'border-indigo-500'}`}>
                <CardHeader className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-3 sm:p-6">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <span className="text-2xl sm:text-3xl flex-shrink-0">{userType === 'authorized' ? '✅' : '😈'}</span>
                    <div className="min-w-0">
                      <CardTitle className="text-indigo-900 text-sm sm:text-base md:text-lg">Respuesta Recibida</CardTitle>
                      <CardDescription className="text-indigo-700 font-semibold text-xs sm:text-sm">
                        {userType === 'authorized' 
                          ? 'Documento Real Recibido' 
                          : 'Hacker Engañado Exitosamente'}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-3 sm:pt-4 p-3 sm:p-6">
                  <p className="text-xs sm:text-sm text-gray-700">
                    {userType === 'authorized'
                      ? 'El agente tiene acceso a la información confidencial'
                      : 'El hacker cree que robó información real, pero es falsa'}
                  </p>
                </CardContent>
              </Card>
              {flowSteps[4].completed && (
                <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-green-500 text-white rounded-full p-0.5 sm:p-1">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              )}
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Beneficios */}
      <Card className="border border-zinc-700/50 bg-zinc-900/90 backdrop-blur text-zinc-100">
        <CardHeader>
          <CardTitle className="text-center text-lg sm:text-xl md:text-2xl text-zinc-100">🎯 BENEFICIOS DEL PATRÓN PROXY</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <Card className="bg-zinc-800/50 border-zinc-700">
              <CardHeader className="p-3 sm:p-6">
                <div className="text-3xl sm:text-4xl mb-2">🔒</div>
                <CardTitle className="text-base sm:text-lg text-zinc-100">Control de Acceso</CardTitle>
              </CardHeader>
              <CardContent className="p-3 sm:p-6 pt-0">
                <p className="text-xs sm:text-sm text-zinc-300">
                  El Proxy verifica permisos antes de permitir acceso al objeto real
                </p>
              </CardContent>
            </Card>
            <Card className="bg-zinc-800/50 border-zinc-700">
              <CardHeader className="p-3 sm:p-6">
                <div className="text-3xl sm:text-4xl mb-2">📊</div>
                <CardTitle className="text-base sm:text-lg text-zinc-100">Logging y Auditoría</CardTitle>
              </CardHeader>
              <CardContent className="p-3 sm:p-6 pt-0">
                <p className="text-xs sm:text-sm text-zinc-300">
                  Registra todas las operaciones para análisis de seguridad
                </p>
              </CardContent>
            </Card>
            <Card className="bg-zinc-800/50 border-zinc-700">
              <CardHeader className="p-3 sm:p-6">
                <div className="text-3xl sm:text-4xl mb-2">🛡️</div>
                <CardTitle className="text-base sm:text-lg text-zinc-100">Protección del Objeto Real</CardTitle>
              </CardHeader>
              <CardContent className="p-3 sm:p-6 pt-0">
                <p className="text-xs sm:text-sm text-zinc-300">
                  El cliente nunca accede directamente al objeto real
                </p>
              </CardContent>
            </Card>
            <Card className="bg-zinc-800/50 border-zinc-700">
              <CardHeader className="p-3 sm:p-6">
                <div className="text-3xl sm:text-4xl mb-2">🎭</div>
                <CardTitle className="text-base sm:text-lg text-zinc-100">Respuestas Personalizadas</CardTitle>
              </CardHeader>
              <CardContent className="p-3 sm:p-6 pt-0">
                <p className="text-xs sm:text-sm text-zinc-300">
                  Puede devolver diferentes respuestas según el contexto
                </p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Código */}
      <Card className="border border-zinc-700/50 bg-zinc-900/90 backdrop-blur text-zinc-100">
        <CardHeader>
          <CardTitle className="text-center text-lg sm:text-xl md:text-2xl text-zinc-100">💻 ESTRUCTURA DEL CÓDIGO</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <div className="bg-zinc-800 text-zinc-100 px-3 sm:px-4 py-2 rounded-t-lg font-semibold border border-zinc-700 text-xs sm:text-sm">
                🏢 RealDocument.ts
              </div>
              <pre className="bg-black/50 text-zinc-100 p-3 sm:p-4 rounded-b-lg overflow-x-auto text-xs sm:text-sm border border-zinc-800 border-t-0">
{`class RealDocument {
  private confidentialContent: string;
  
  read(): string {
    return this.confidentialContent;
  }
}`}
              </pre>
            </div>
            <div>
              <div className="bg-zinc-800 text-zinc-100 px-3 sm:px-4 py-2 rounded-t-lg font-semibold border border-zinc-700 text-xs sm:text-sm">
                🛡️ DocumentProxy.ts
              </div>
              <pre className="bg-black/50 text-zinc-100 p-3 sm:p-4 rounded-b-lg overflow-x-auto text-xs sm:text-sm border border-zinc-800 border-t-0">
{`class DocumentProxy {
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
}`}
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
