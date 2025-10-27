import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Shield, Zap, Database, Lock, Eye, Server, Code, CheckCircle, ArrowRight } from 'lucide-react';

export function LearnPage() {
  const proxyTypes = [
    {
      icon: Shield,
      title: 'Protection Proxy',
      subtitle: 'Proxy de Protección',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-gradient-to-br from-blue-950/40 to-blue-900/20',
      borderColor: 'border-blue-700/30',
      textColor: 'text-zinc-100',
      subtitleColor: 'text-blue-300',
      description: 'Controla el acceso al objeto real verificando permisos y credenciales.',
      useCases: [
        'Control de acceso basado en roles',
        'Validación de credenciales',
        'Restricción de operaciones sensibles',
      ],
      example: 'Sistema bancario que verifica identidad antes de permitir transacciones',
    },
    {
      icon: Zap,
      title: 'Virtual Proxy',
      subtitle: 'Proxy Virtual',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-gradient-to-br from-purple-950/40 to-purple-900/20',
      borderColor: 'border-purple-700/30',
      textColor: 'text-zinc-100',
      subtitleColor: 'text-purple-300',
      description: 'Retrasa la creación de objetos costosos hasta que sean realmente necesarios.',
      useCases: [
        'Carga diferida de imágenes',
        'Inicialización perezosa de recursos',
        'Optimización de memoria',
      ],
      example: 'Visor de imágenes que carga fotos de alta resolución solo cuando se visualizan',
    },
    {
      icon: Database,
      title: 'Cache Proxy',
      subtitle: 'Proxy de Caché',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-gradient-to-br from-green-950/40 to-green-900/20',
      borderColor: 'border-green-700/30',
      textColor: 'text-zinc-100',
      subtitleColor: 'text-green-300',
      description: 'Almacena resultados de operaciones costosas para reutilizarlos.',
      useCases: [
        'Caché de consultas a base de datos',
        'Almacenamiento de respuestas HTTP',
        'Reducción de cálculos repetitivos',
      ],
      example: 'API que cachea respuestas frecuentes para mejorar el rendimiento',
    },
    {
      icon: Server,
      title: 'Remote Proxy',
      subtitle: 'Proxy Remoto',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-gradient-to-br from-orange-950/40 to-orange-900/20',
      borderColor: 'border-orange-700/30',
      textColor: 'text-zinc-100',
      subtitleColor: 'text-orange-300',
      description: 'Representa un objeto que existe en un espacio de direcciones diferente.',
      useCases: [
        'Comunicación cliente-servidor',
        'Servicios web distribuidos',
        'RPC (Remote Procedure Call)',
      ],
      example: 'Cliente REST que interactúa con un servidor remoto como si fuera local',
    },
    {
      icon: Eye,
      title: 'Logging Proxy',
      subtitle: 'Proxy de Registro',
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-gradient-to-br from-yellow-950/40 to-yellow-900/20',
      borderColor: 'border-yellow-700/30',
      textColor: 'text-zinc-100',
      subtitleColor: 'text-yellow-300',
      description: 'Registra todas las operaciones realizadas sobre el objeto real.',
      useCases: [
        'Auditoría de operaciones',
        'Debugging y monitoreo',
        'Análisis de uso',
      ],
      example: 'Sistema que registra cada acceso a archivos sensibles para auditoría',
    },
    {
      icon: Lock,
      title: 'Smart Reference',
      subtitle: 'Referencia Inteligente',
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-gradient-to-br from-red-950/40 to-red-900/20',
      borderColor: 'border-red-700/30',
      textColor: 'text-zinc-100',
      subtitleColor: 'text-red-300',
      description: 'Realiza acciones adicionales cuando se accede al objeto.',
      useCases: [
        'Conteo de referencias',
        'Liberación automática de recursos',
        'Gestión de memoria',
      ],
      example: 'Smart pointer en C++ que gestiona automáticamente la memoria',
    },
  ];

  const ourProxyFeatures = [
    {
      icon: Shield,
      title: 'Control de Acceso',
      description: 'Verifica si el usuario está autorizado antes de permitir acceso al documento',
      color: 'text-blue-400',
      bgColor: 'bg-gradient-to-br from-blue-950/40 to-blue-900/20',
      borderColor: 'border-blue-700/30',
    },
    {
      icon: Eye,
      title: 'Logging Completo',
      description: 'Registra todos los intentos de acceso con timestamp y detalles del usuario',
      color: 'text-purple-400',
      bgColor: 'bg-gradient-to-br from-purple-950/40 to-purple-900/20',
      borderColor: 'border-purple-700/30',
    },
    {
      icon: Lock,
      title: 'Protección de Datos',
      description: 'Devuelve información falsa a usuarios no autorizados sin revelar el engaño',
      color: 'text-green-400',
      bgColor: 'bg-gradient-to-br from-green-950/40 to-green-900/20',
      borderColor: 'border-green-700/30',
    },
    {
      icon: Server,
      title: 'Transparencia',
      description: 'El cliente no sabe si está interactuando con el proxy o el objeto real',
      color: 'text-orange-400',
      bgColor: 'bg-gradient-to-br from-orange-950/40 to-orange-900/20',
      borderColor: 'border-orange-700/30',
    },
  ];

  return (
    <div className="space-y-6 sm:space-y-8 md:space-y-10">
      {/* Hero Section */}
      <Card className="border-2 border-zinc-700/50 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-zinc-100 overflow-hidden relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <CardHeader className="text-center relative z-10 p-6 sm:p-8 md:p-10">
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="p-3 sm:p-4 bg-zinc-100 rounded-2xl">
              <BookOpen className="w-10 h-10 sm:w-12 md:w-16 sm:h-12 md:h-16 text-zinc-900" />
            </div>
          </div>
          <CardTitle className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
            El Patrón de Diseño Proxy
          </CardTitle>
          <CardDescription className="text-sm sm:text-base md:text-lg lg:text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed px-2">
            Un patrón estructural que proporciona un sustituto o marcador de posición para otro objeto,
            controlando el acceso a él y añadiendo funcionalidad adicional de forma transparente.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Video Section */}
      <Card className="border-2 border-red-700/50 bg-gradient-to-br from-red-950/30 via-zinc-900 to-zinc-900 text-zinc-100 overflow-hidden relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <CardHeader className="text-center relative z-10 pb-4 sm:pb-6">
          <div className="flex justify-center mb-3 sm:mb-4">
            <Badge className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 text-sm sm:text-base flex items-center gap-2">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              Video Tutorial
            </Badge>
          </div>
          <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
            🎥 Aprende Visualmente el Patrón Proxy
          </CardTitle>
          <CardDescription className="text-sm sm:text-base text-zinc-400">
            Tutorial completo sobre el patrón de diseño Proxy
          </CardDescription>
        </CardHeader>
        <CardContent className="relative z-10 p-3 sm:p-4 md:p-6">
          <div className="relative rounded-xl overflow-hidden shadow-2xl border-4 border-zinc-800/50 bg-black">
            {/* Video Container with 16:9 Aspect Ratio */}
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/QiJhLAgm5_8"
                title="Patrón de Diseño Proxy - Tutorial"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
            {/* Decorative gradient overlay on edges */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/20 via-transparent to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/20 via-transparent to-transparent"></div>
            </div>
          </div>
          {/* Video Info */}
          <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-zinc-800/30 rounded-lg border border-zinc-700/50 backdrop-blur">
            <p className="text-xs sm:text-sm text-zinc-300 text-center leading-relaxed">
              💡 <strong className="text-zinc-100">Tip:</strong> Mira este video antes de explorar el juego interactivo 
              para comprender mejor los conceptos del patrón Proxy
            </p>
          </div>
        </CardContent>
      </Card>

      {/* ¿Qué es el Patrón Proxy? */}
      <Card className="border border-zinc-700/50 bg-zinc-900/90 backdrop-blur text-zinc-100">
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl md:text-3xl text-zinc-100 flex items-center gap-2 sm:gap-3">
            <Code className="w-6 h-6 sm:w-7 md:w-8 sm:h-7 md:h-8 text-zinc-400" />
            ¿Qué es el Patrón Proxy?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 sm:space-y-6">
          <p className="text-sm sm:text-base md:text-lg text-zinc-300 leading-relaxed">
            El patrón <strong className="text-zinc-100">Proxy</strong> actúa como un intermediario entre el cliente
            y el objeto real. El proxy implementa la misma interfaz que el objeto real, por lo que puede ser usado
            en su lugar sin que el cliente note la diferencia.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <div className="p-4 sm:p-5 bg-zinc-800/50 rounded-lg border border-zinc-700">
              <h4 className="font-bold text-base sm:text-lg mb-2 text-zinc-100">🎯 Propósito</h4>
              <p className="text-xs sm:text-sm text-zinc-300">
                Controlar el acceso a un objeto, añadiendo una capa de indirección.
              </p>
            </div>
            <div className="p-4 sm:p-5 bg-zinc-800/50 rounded-lg border border-zinc-700">
              <h4 className="font-bold text-base sm:text-lg mb-2 text-zinc-100">🏗️ Tipo</h4>
              <p className="text-xs sm:text-sm text-zinc-300">
                Patrón Estructural - organiza objetos y clases en estructuras más grandes.
              </p>
            </div>
            <div className="p-4 sm:p-5 bg-zinc-800/50 rounded-lg border border-zinc-700 sm:col-span-2 lg:col-span-1">
              <h4 className="font-bold text-base sm:text-lg mb-2 text-zinc-100">💡 Ventaja Clave</h4>
              <p className="text-xs sm:text-sm text-zinc-300">
                Transparencia total - el cliente no sabe que está usando un proxy.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tipos de Proxy */}
      <Card className="border border-zinc-700/50 bg-zinc-900/90 backdrop-blur text-zinc-100">
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl md:text-3xl text-zinc-100 text-center mb-2">
            🎨 Tipos de Proxy
          </CardTitle>
          <CardDescription className="text-center text-sm sm:text-base text-zinc-400">
            Existen diferentes variantes del patrón Proxy, cada una con un propósito específico
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {proxyTypes.map((proxy, index) => {
              const Icon = proxy.icon;
              return (
                <Card
                  key={index}
                  className={`border ${proxy.borderColor} ${proxy.bgColor} backdrop-blur hover:shadow-xl hover:shadow-${proxy.color.split('-')[1]}-500/10 transition-all duration-300 hover:scale-105 hover:border-${proxy.color.split('-')[1]}-600/50`}
                >
                  <CardHeader className="p-4 sm:p-6 border-b border-zinc-800/50">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 sm:p-3 bg-gradient-to-br ${proxy.color} rounded-lg flex-shrink-0 shadow-lg`}>
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <CardTitle className={`text-base sm:text-lg ${proxy.textColor} mb-1`}>
                          {proxy.title}
                        </CardTitle>
                        <CardDescription className={`text-xs sm:text-sm ${proxy.subtitleColor} font-medium`}>
                          {proxy.subtitle}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                      {proxy.description}
                    </p>
                    
                    <div>
                      <h5 className="font-semibold text-xs sm:text-sm text-zinc-200 mb-2">Casos de uso:</h5>
                      <ul className="space-y-1 sm:space-y-1.5">
                        {proxy.useCases.map((useCase, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-zinc-400">
                            <CheckCircle className={`w-3 h-3 sm:w-4 sm:h-4 ${proxy.subtitleColor} mt-0.5 flex-shrink-0`} />
                            <span>{useCase}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className={`p-3 bg-zinc-900/50 rounded-lg border ${proxy.borderColor}`}>
                      <p className="text-xs sm:text-sm text-zinc-400 italic">
                        <strong className="text-zinc-200">Ejemplo:</strong> {proxy.example}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Nuestro Proxy */}
      <Card className="border-2 border-blue-700/50 bg-gradient-to-br from-blue-950/50 to-zinc-900 text-zinc-100">
        <CardHeader className="text-center border-b border-blue-800/30 pb-6">
          <div className="flex justify-center mb-4">
            <Badge className="bg-blue-600 text-white px-4 py-2 text-sm sm:text-base">
              Nuestro Proyecto
            </Badge>
          </div>
          <CardTitle className="text-2xl sm:text-3xl md:text-4xl text-zinc-100 mb-3">
            🛡️ DocumentProxy: Proxy de Protección Híbrido
          </CardTitle>
          <CardDescription className="text-sm sm:text-base md:text-lg text-zinc-300 max-w-3xl mx-auto">
            Nuestro proxy combina características de <strong className="text-blue-400">Protection Proxy</strong> y{' '}
            <strong className="text-purple-400">Logging Proxy</strong> para crear un sistema de seguridad robusto
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 sm:pt-8 space-y-6 sm:space-y-8">
          {/* Características */}
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-zinc-100 mb-4 sm:mb-6 text-center">
              Características Principales
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5">
              {ourProxyFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className={`p-4 sm:p-5 ${feature.bgColor} rounded-lg border ${feature.borderColor} hover:border-${feature.color.split('-')[1]}-600/50 transition-all backdrop-blur`}
                  >
                    <div className="flex items-start gap-3">
                      <Icon className={`w-6 h-6 sm:w-7 sm:h-7 ${feature.color} flex-shrink-0 mt-1`} />
                      <div className="min-w-0 flex-1">
                        <h4 className="font-bold text-base sm:text-lg text-zinc-100 mb-2">
                          {feature.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Flujo de Trabajo */}
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-zinc-100 mb-4 sm:mb-6 text-center">
              Flujo de Trabajo
            </h3>
            <div className="space-y-3 sm:space-y-4 max-w-2xl mx-auto">
              {[
                { step: '1', title: 'Cliente solicita acceso', desc: 'El usuario intenta leer el documento confidencial' },
                { step: '2', title: 'Proxy intercepta', desc: 'El DocumentProxy recibe la solicitud antes que el objeto real' },
                { step: '3', title: 'Verificación', desc: 'Comprueba si el usuario está en la lista de autorizados' },
                { step: '4', title: 'Registro de log', desc: 'Guarda un registro del intento con timestamp y detalles' },
                { step: '5', title: 'Decisión', desc: 'Retorna documento real o falso según la autorización' },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-zinc-800/50 rounded-lg border border-zinc-700 hover:border-blue-500 transition-all"
                >
                  <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-base">
                    {item.step}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-sm sm:text-base text-zinc-100 mb-1">{item.title}</h4>
                    <p className="text-xs sm:text-sm text-zinc-400">{item.desc}</p>
                  </div>
                  {index < 4 && <ArrowRight className="hidden sm:block w-5 h-5 text-blue-500 flex-shrink-0 mt-1" />}
                </div>
              ))}
            </div>
          </div>

          {/* Código Simplificado */}
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-zinc-100 mb-4 sm:mb-6 text-center">
              Implementación Simplificada
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
              <div>
                <div className="bg-zinc-800 text-zinc-100 px-3 sm:px-4 py-2 rounded-t-lg font-semibold border border-zinc-700 text-xs sm:text-sm">
                  📄 RealDocument.ts
                </div>
                <pre className="bg-black/50 text-zinc-100 p-3 sm:p-4 rounded-b-lg overflow-x-auto text-xs sm:text-sm border border-zinc-800 border-t-0">
{`export class RealDocument {
  private content: string;

  constructor() {
    this.content = \`
      OPERACIÓN CÓNDOR AZUL
      CLASIFICACIÓN: ULTRA SECRETO
      ...información confidencial...
    \`;
  }

  read(): string {
    return this.content;
  }
}`}
                </pre>
              </div>

              <div>
                <div className="bg-zinc-800 text-zinc-100 px-3 sm:px-4 py-2 rounded-t-lg font-semibold border border-zinc-700 text-xs sm:text-sm">
                  🛡️ DocumentProxy.ts
                </div>
                <pre className="bg-black/50 text-zinc-100 p-3 sm:p-4 rounded-b-lg overflow-x-auto text-xs sm:text-sm border border-zinc-800 border-t-0">
{`export class DocumentProxy {
  private realDoc: RealDocument;
  private authorized: Set<string>;
  private logs: AccessLog[];

  read(username: string): string {
    this.logAccess(username);
    
    if (this.isAuthorized(username)) {
      return this.realDoc.read();
    } else {
      this.triggerAlert(username);
      return this.getFakeDocument();
    }
  }
}`}
                </pre>
              </div>
            </div>
          </div>

          {/* Ventajas de Nuestro Enfoque */}
          <div className="bg-gradient-to-br from-green-950/30 to-zinc-900/50 p-4 sm:p-6 rounded-lg border border-green-800/30">
            <h3 className="text-xl sm:text-2xl font-bold text-green-400 mb-4 sm:mb-6 text-center">
              ✨ Ventajas de Nuestro Enfoque
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-4xl mx-auto">
              {[
                'Seguridad multicapa con verificación de acceso',
                'Auditoría completa de todos los intentos',
                'Engaño efectivo a usuarios maliciosos',
                'Transparencia total para el cliente',
                'Fácil extensión con nuevas funcionalidades',
                'Separación clara de responsabilidades',
              ].map((advantage, index) => (
                <div key={index} className="flex items-center gap-2 sm:gap-3 justify-center sm:justify-start">
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0" />
                  <p className="text-xs sm:text-sm text-zinc-300">{advantage}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cuándo Usar el Patrón Proxy */}
      <Card className="border border-zinc-700/50 bg-zinc-900/90 backdrop-blur text-zinc-100">
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl md:text-3xl text-zinc-100 text-center">
            🤔 ¿Cuándo Usar el Patrón Proxy?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            <div className="p-4 sm:p-5 bg-gradient-to-br from-green-950/40 to-green-900/20 rounded-lg border border-green-700/30 backdrop-blur hover:border-green-600/50 transition-all">
              <h4 className="font-bold text-base sm:text-lg text-green-400 mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                Úsalo cuando...
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-zinc-300">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">•</span>
                  <span>Necesitas controlar el acceso a un objeto</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">•</span>
                  <span>Quieres añadir funcionalidad sin modificar el objeto original</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">•</span>
                  <span>Necesitas logging o auditoría de operaciones</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">•</span>
                  <span>Quieres optimizar el uso de recursos costosos</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">•</span>
                  <span>Necesitas trabajar con objetos remotos</span>
                </li>
              </ul>
            </div>
            <div className="p-4 sm:p-5 bg-gradient-to-br from-red-950/40 to-red-900/20 rounded-lg border border-red-700/30 backdrop-blur hover:border-red-600/50 transition-all">
              <h4 className="font-bold text-base sm:text-lg text-red-400 mb-3 flex items-center gap-2">
                <span className="text-xl sm:text-2xl">⚠️</span>
                Evítalo cuando...
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-zinc-300">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">•</span>
                  <span>La indirección añade complejidad innecesaria</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">•</span>
                  <span>El rendimiento es crítico y cada milisegundo cuenta</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">•</span>
                  <span>No necesitas ninguna funcionalidad adicional</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">•</span>
                  <span>El objeto real es simple y no requiere protección</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">•</span>
                  <span>Hay formas más simples de lograr el mismo objetivo</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

