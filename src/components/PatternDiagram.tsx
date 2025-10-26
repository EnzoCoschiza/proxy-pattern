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
    <div className="space-y-8">
      {/* Header */}
      <Card className="border-2 border-white/20 bg-white/95 backdrop-blur">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">📐 Diagrama del Patrón Proxy</CardTitle>
          <CardDescription className="text-lg">
            Visualización interactiva del flujo de comunicación
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Controles */}
      <Card className="border-2 border-white/20 bg-white/95 backdrop-blur">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex gap-3 flex-wrap justify-center">
              <Button
                variant={userType === 'unauthorized' ? 'default' : 'outline'}
                onClick={() => setUserType('unauthorized')}
                className="h-auto py-3 px-6"
              >
                <span className="text-xl mr-2">🦹‍♂️</span>
                Usuario No Autorizado (Hacker)
              </Button>
              <Button
                variant={userType === 'authorized' ? 'default' : 'outline'}
                onClick={() => setUserType('authorized')}
                className="h-auto py-3 px-6"
              >
                <span className="text-xl mr-2">🕵️</span>
                Usuario Autorizado (Agente)
              </Button>
            </div>
            <Button 
              onClick={animateFlow}
              disabled={isAnimating}
              size="lg"
              className="px-8"
            >
              <Play className="w-4 h-4 mr-2" />
              {isAnimating ? 'Animando...' : 'Animar Flujo'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Diagrama */}
      <Card className="border-2 border-white/20 bg-gradient-to-br from-slate-50 to-slate-100">
        <CardContent className="pt-8">
          <div className="flex flex-col items-center gap-6 max-w-4xl mx-auto">
            
            {/* Cliente */}
            <div className="relative">
              <Card className={`w-80 border-2 transition-all duration-300 ${
                flowSteps[0].active ? 'ring-4 ring-blue-400 scale-105' : ''
              } ${flowSteps[0].completed ? 'border-green-500' : 'border-blue-500'}`}>
                <CardHeader className="bg-gradient-to-br from-blue-50 to-blue-100">
                  <div className="flex items-center gap-3">
                    <User className="w-8 h-8 text-blue-600" />
                    <div>
                      <CardTitle className="text-blue-900">Cliente</CardTitle>
                      <CardDescription className="text-blue-700 font-semibold">
                        {userType === 'authorized' ? 'Agente007' : 'Hacker_Dark'}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-sm text-gray-700">
                    Solicita acceso al documento confidencial
                  </p>
                </CardContent>
              </Card>
              {flowSteps[0].completed && (
                <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1">
                  <CheckCircle className="w-5 h-5" />
                </div>
              )}
            </div>

            {/* Flecha 1 */}
            <div className={`flex flex-col items-center transition-opacity ${
              flowSteps[0].active || flowSteps[0].completed ? 'opacity-100' : 'opacity-30'
            }`}>
              <Badge variant="default" className="mb-2">1. read(username)</Badge>
              <ArrowDown className="w-8 h-8 text-primary animate-bounce" />
            </div>

            {/* Proxy */}
            <div className="relative">
              <Card className={`w-80 border-2 transition-all duration-300 ${
                flowSteps[1].active ? 'ring-4 ring-purple-400 scale-105' : ''
              } ${flowSteps[1].completed ? 'border-green-500' : 'border-purple-500'}`}>
                <CardHeader className="bg-gradient-to-br from-purple-50 to-purple-100">
                  <div className="flex items-center gap-3">
                    <Shield className="w-8 h-8 text-purple-600" />
                    <div>
                      <CardTitle className="text-purple-900">DocumentProxy</CardTitle>
                      <CardDescription className="text-purple-700 font-semibold">
                        Intermediario de Seguridad
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Intercepta la solicitud</li>
                    <li>• Verifica credenciales</li>
                    <li>• Registra logs</li>
                    <li>• Decide qué retornar</li>
                  </ul>
                </CardContent>
              </Card>
              {flowSteps[1].completed && (
                <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1">
                  <CheckCircle className="w-5 h-5" />
                </div>
              )}
            </div>

            {/* Verificación */}
            <div className={`transition-opacity ${
              flowSteps[2].active || flowSteps[2].completed ? 'opacity-100' : 'opacity-30'
            }`}>
              <Card className="w-80 border-2 border-orange-500 bg-gradient-to-br from-orange-50 to-orange-100">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <Search className="w-8 h-8 text-orange-600" />
                    <div className="flex-1">
                      <p className="font-bold text-orange-900 mb-1">Verificación</p>
                      <p className="text-sm text-orange-700 mb-2">¿Usuario autorizado?</p>
                      <Badge variant={userType === 'authorized' ? 'default' : 'destructive'}>
                        {userType === 'authorized' ? '✅ SÍ' : '❌ NO'}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Decisión */}
            <div className={`grid md:grid-cols-2 gap-8 w-full max-w-3xl transition-opacity ${
              flowSteps[3].active || flowSteps[3].completed ? 'opacity-100' : 'opacity-30'
            }`}>
              {/* Documento Real */}
              <div className={`transition-all duration-500 ${
                userType === 'authorized' ? 'scale-105 opacity-100' : 'scale-95 opacity-40'
              }`}>
                <div className="flex flex-col items-center gap-3">
                  <Badge variant="default">3a. Autorizado</Badge>
                  <ArrowDown className="w-6 h-6 text-green-600" />
                  <div className="relative">
                    <Card className="border-2 border-green-500 bg-gradient-to-br from-green-50 to-green-100">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <FileText className="w-8 h-8 text-green-600" />
                          <div>
                            <CardTitle className="text-green-900">RealDocument</CardTitle>
                            <CardDescription className="text-green-700 font-semibold">
                              Documento Real
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-700 mb-2">OPERACIÓN CÓNDOR AZUL</p>
                        <Badge className="bg-green-600">
                          <Lock className="w-3 h-3 mr-1" />
                          ULTRA SECRETO
                        </Badge>
                      </CardContent>
                    </Card>
                    {flowSteps[3].completed && userType === 'authorized' && (
                      <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1">
                        <CheckCircle className="w-5 h-5" />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Documento Falso */}
              <div className={`transition-all duration-500 ${
                userType === 'unauthorized' ? 'scale-105 opacity-100' : 'scale-95 opacity-40'
              }`}>
                <div className="flex flex-col items-center gap-3">
                  <Badge variant="destructive">3b. No Autorizado</Badge>
                  <ArrowDown className="w-6 h-6 text-orange-600" />
                  <div className="relative">
                    <Card className="border-2 border-orange-500 bg-gradient-to-br from-orange-50 to-orange-100">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <FileWarning className="w-8 h-8 text-orange-600" />
                          <div>
                            <CardTitle className="text-orange-900">Documento Falso</CardTitle>
                            <CardDescription className="text-orange-700 font-semibold">
                              Información Engañosa
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-700 mb-2">Informe Rutinario</p>
                        <Badge className="bg-orange-600">
                          <Unlock className="w-3 h-3 mr-1" />
                          PÚBLICO (Falso)
                        </Badge>
                      </CardContent>
                    </Card>
                    {flowSteps[3].completed && userType === 'unauthorized' && (
                      <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1">
                        <CheckCircle className="w-5 h-5" />
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
              <ArrowUp className="w-8 h-8 text-primary animate-bounce" />
              <Badge variant="default" className="mt-2">4. Retorna documento</Badge>
            </div>

            {/* Respuesta */}
            <div className="relative">
              <Card className={`w-80 border-2 transition-all duration-300 ${
                flowSteps[4].active ? 'ring-4 ring-indigo-400 scale-105' : ''
              } ${flowSteps[4].completed ? 'border-green-500' : 'border-indigo-500'}`}>
                <CardHeader className="bg-gradient-to-br from-indigo-50 to-indigo-100">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{userType === 'authorized' ? '✅' : '😈'}</span>
                    <div>
                      <CardTitle className="text-indigo-900">Respuesta Recibida</CardTitle>
                      <CardDescription className="text-indigo-700 font-semibold">
                        {userType === 'authorized' 
                          ? 'Documento Real Recibido' 
                          : 'Hacker Engañado Exitosamente'}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-sm text-gray-700">
                    {userType === 'authorized'
                      ? 'El agente tiene acceso a la información confidencial'
                      : 'El hacker cree que robó información real, pero es falsa'}
                  </p>
                </CardContent>
              </Card>
              {flowSteps[4].completed && (
                <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1">
                  <CheckCircle className="w-5 h-5" />
                </div>
              )}
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Beneficios */}
      <Card className="border-2 border-white/20 bg-white/95 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-center text-2xl">🎯 Beneficios del Patrón Proxy</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardHeader>
                <div className="text-4xl mb-2">🔒</div>
                <CardTitle className="text-lg">Control de Acceso</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700">
                  El Proxy verifica permisos antes de permitir acceso al objeto real
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardHeader>
                <div className="text-4xl mb-2">📊</div>
                <CardTitle className="text-lg">Logging y Auditoría</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700">
                  Registra todas las operaciones para análisis de seguridad
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardHeader>
                <div className="text-4xl mb-2">🛡️</div>
                <CardTitle className="text-lg">Protección del Objeto Real</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700">
                  El cliente nunca accede directamente al objeto real
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
              <CardHeader>
                <div className="text-4xl mb-2">🎭</div>
                <CardTitle className="text-lg">Respuestas Personalizadas</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700">
                  Puede devolver diferentes respuestas según el contexto
                </p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Código */}
      <Card className="border-2 border-white/20 bg-white/95 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-center text-2xl">💻 Estructura del Código</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <div className="bg-primary text-primary-foreground px-4 py-2 rounded-t-lg font-semibold">
                🏢 RealDocument.ts
              </div>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-b-lg overflow-x-auto text-sm">
{`class RealDocument {
  private confidentialContent: string;
  
  read(): string {
    return this.confidentialContent;
  }
}`}
              </pre>
            </div>
            <div>
              <div className="bg-primary text-primary-foreground px-4 py-2 rounded-t-lg font-semibold">
                🛡️ DocumentProxy.ts
              </div>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-b-lg overflow-x-auto text-sm">
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
