'use client';
import { useEffect, useState } from 'react';
import '@/app/globals.css';

// Constantes para opções reutilizáveis
const TIPO_PRODUTO = ["Colchão", "Cabeceira", "Box", "Avulso"];
const REVESTIMENTO = ["Nulo", "Suede", "Corino", "Linhão"];
const COR_REVESTIMENTO = ["Nulo", "Branco", "Bege", "Marrom", "Preto", "Palha", "Ocre", "Cinza", "Cosmo", "Rosé"];
const ESTADO_PRODUTO = ["Novo", "Defeito", "Mostruário"];

// Classe CSS reutilizável para inputs
const inputClasses = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5";

export default function App() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estados do formulário
  const [formData, setFormData] = useState({
    tipo_produto: '',
    nome_produto: '',
    medida: '',
    revestimento: '',
    cor_revestimento: '',
    quantidade: 0,
    preco: 0,
    estado: '',
    observacao: ''
  });

  // Buscar produtos do banco de dados
  useEffect(() => {
    fetchProdutos();
  }, []);

  const fetchProdutos = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/produtos');
      if (!response.ok) throw new Error('Erro ao carregar produtos');
      const data = await response.json();
      setProdutos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Manipular mudanças no formulário
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Enviar formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/produtos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Erro ao registrar produto');
      
      await fetchProdutos();
      setFormData({
        tipo_produto: '',
        nome_produto: '',
        medida: '',
        revestimento: '',
        cor_revestimento: '',
        quantidade: 0,
        preco: 0,
        estado: '',
        observacao: ''
      });

    } catch (err) {
      setError(err.message);
    }
  };

  // Formatar preço
  const formatarPreco = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  return (
    <html>
      <body className="min-h-screen bg-gray-100">
        <header className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto py-4 px-4">
            <h1 className="text-2xl font-bold text-gray-800">Lua Nova Estoque</h1>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-8">
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Seção de Identificação */}
            <div className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Tipo</label>
                <select 
                  name="tipo_produto"
                  className={inputClasses}
                  value={formData.tipo_produto}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Selecione...</option>
                  {TIPO_PRODUTO.map((tipo) => (
                    <option key={tipo} value={tipo}>{tipo}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Nome</label>
                <input 
                  type="text"
                  name="nome_produto"
                  className={inputClasses}
                  value={formData.nome_produto}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Medida</label>
                <input 
                  type="text" 
                  name="medida"
                  className={inputClasses}
                  value={formData.medida}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Seção de Características */}
            <div className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Revestimento</label>
                <select 
                  name="revestimento"
                  className={inputClasses}
                  value={formData.revestimento}
                  onChange={handleInputChange}
                >
                  <option value="">Selecione...</option>
                  {REVESTIMENTO.map((revest) => (
                    <option key={revest} value={revest}>{revest}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Cor do Revestimento</label>
                <select 
                  name="cor_revestimento"
                  className={inputClasses}
                  value={formData.cor_revestimento}
                  onChange={handleInputChange}
                >
                  <option value="">Selecione...</option>
                  {COR_REVESTIMENTO.map((cor) => (
                    <option key={cor} value={cor}>{cor}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Estado</label>
                <select 
                  name="estado"
                  className={inputClasses}
                  value={formData.estado}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Selecione...</option>
                  {ESTADO_PRODUTO.map((estado) => (
                    <option key={estado} value={estado}>{estado}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Seção de Controle */}
            <div className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Quantidade</label>
                <input 
                  type="number" 
                  name="quantidade"
                  min={0}
                  className={inputClasses}
                  value={formData.quantidade}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Preço</label>
                <div className="flex items-center">
                  <span className="mr-2">R$</span>
                  <input 
                    type="number" 
                    name="preco"
                    step="0.01"
                    className={inputClasses}
                    value={formData.preco}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Observações</label>
                <textarea 
                  rows={3}
                  name="observacao"
                  className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.observacao}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Botões */}
            <div className="col-span-full flex flex-wrap gap-3 mt-6">
              <Button type="submit" variant="primary">Registrar</Button>
              <Button variant="secondary">Pesquisar</Button>
              <Button variant="warning">Editar</Button>
              <Button variant="success">Entrada</Button>
              <Button variant="danger">Saída</Button>
              <Button variant="dark">Remover</Button>
              <Button variant="info">Exportar Excel</Button>
            </div>
          </form>

          {/* Seção de Visualização de Produtos */}
          <section className="mt-8 bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Produtos Registrados</h2>
              
              {loading ? (
                <p className="text-gray-500">Carregando produtos...</p>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nome</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Medida</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Revestimento</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cor</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantidade</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Preço</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Última Atualização</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {produtos.map((produto) => (
                        <tr key={produto.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{produto.tipo_produto}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{produto.nome_produto}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{produto.medida}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{produto.revestimento}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{produto.cor_revestimento}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{produto.quantidade}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {formatarPreco(produto.preco)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                              ${produto.estado === 'Novo' ? 'bg-green-100 text-green-800' :
                                produto.estado === 'Defeito' ? 'bg-red-100 text-red-800' :
                                  'bg-yellow-100 text-yellow-800'}`}>
                              {produto.estado}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {new Date(produto.prod_entrada).toLocaleDateString('pt-BR')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </section>
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