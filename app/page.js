import '@/app/globals.css';

// Constantes para opções reutilizáveis
const TIPO_PRODUTO = ["Colchão", "Cabeceira", "Box", "Avulso"];
const REVESTIMENTO = ["Nulo", "Suede", "Corino", "Linhão"];
const COR_REVESTIMENTO = ["Nulo", "Branco", "Bege", "Marrom", "Preto", "Palha", "Ocre", "Cinza", "Cosmo", "Rosé"];
const ESTADO_PRODUTO = ["Novo", "Defeito", "Mostruário"];

// Classe CSS reutilizável para inputs
const inputClasses = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5";

export default function App() {
  return (
    <html>
      <body className="min-h-screen bg-gray-100">
        <header className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto py-4 px-4">
            <h1 className="text-2xl font-bold text-gray-800">Lua Nova Estoque</h1>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-8">
          <form className="bg-white rounded-lg shadow-md p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Seção de Identificação */}
            <div className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">ID</label>
                <input 
                  type="number" 
                  min={0}
                  className={inputClasses}
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Tipo</label>
                <select className={inputClasses}>
                  {TIPO_PRODUTO.map((tipo) => (
                    <option key={tipo} value={tipo}>{tipo}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Nome</label>
                <input 
                  type="text"
                  className={inputClasses}
                />
              </div>
            </div>

            {/* Seção de Características */}
            <div className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Medida</label>
                <input 
                  type="text" 
                  className={inputClasses}
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Revestimento</label>
                <select className={inputClasses}>
                  {REVESTIMENTO.map((revest) => (
                    <option key={revest} value={revest}>{revest}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Cor do Revestimento</label>
                <select className={inputClasses}>
                  {COR_REVESTIMENTO.map((cor) => (
                    <option key={cor} value={cor}>{cor}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Seção de Controle */}
            <div className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Estado</label>
                <select className={inputClasses}>
                  {ESTADO_PRODUTO.map((estado) => (
                    <option key={estado} value={estado}>{estado}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Quantidade</label>
                <input 
                  type="number" 
                  min={0}
                  className={inputClasses}
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Preço</label>
                <div className="flex items-center">
                  <span className="mr-2">R$</span>
                  <input 
                    type="number" 
                    step="0.01"
                    className={inputClasses}
                  />
                </div>
              </div>
            </div>

            {/* Observações */}
            <div className="col-span-full">
              <label className="block mb-2 text-sm font-medium text-gray-700">Observações</label>
              <textarea 
                rows={3}
                className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Botões */}
            <div className="col-span-full flex flex-wrap gap-3 mt-6">
              <Button variant="primary">Registrar</Button>
              <Button variant="secondary">Pesquisar</Button>
              <Button variant="warning">Editar</Button>
              <Button variant="success">Entrada</Button>
              <Button variant="danger">Saída</Button>
              <Button variant="dark">Remover</Button>
              <Button variant="info">Exportar Excel</Button>
            </div>
          </form>
        </main>
      </body>
    </html>
  );
}

// Componente de Botão Reutilizável
const Button = ({ variant = 'primary', children, ...props }) => {
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white',
    success: 'bg-green-600 hover:bg-green-700 text-white',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
    warning: 'bg-yellow-500 hover:bg-yellow-600 text-white',
    info: 'bg-cyan-500 hover:bg-cyan-600 text-white',
    dark: 'bg-gray-800 hover:bg-gray-900 text-white'
  };

  return (
    <button
      className={`px-4 py-2 rounded-lg font-medium transition-colors ${variants[variant]}`}
      {...props}
    >
      {children}
    </button>
  );
};