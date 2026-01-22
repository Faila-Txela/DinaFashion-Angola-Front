import { useState, useEffect } from "react"; 
import { productsService } from "../../services/api/products/products"
import Button from "../../components/Button";
import Input from "../../components/Input";
import UploadArea from "../../components/upload-area";
import { Loader2 } from "lucide-react";
import Modal from "../../components/Modal";

interface Product {
  id: string;
  name: string;
  images?: { url: string }[];
  description: string;
  price: number;
  inStock: number;
  active?: boolean;
  categoria?: string;
  tags?: string[];
}

function Products() {
  const [products, setProducts] = useState<Product[]>([]); // Estado para guardar os produtos
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);


   const handleUpload = (files: File[]) => {
  console.log("Arquivos recebidos:", files);
  setSelectedImages(files);
   };

  // ✅ CORRETO: O useEffect garante que a busca aconteça apenas UMA VEZ
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await productsService.getAll();
        setProducts(response.data);
      } catch (error) {
        console.error("Erro ao carregar:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []); // Array vazio é a chave para parar o loop!

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-start">
        <div className="flex items-center gap-2 text-gray-600">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Carregando produtos...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Button 
        name="Adicionar Produtos" 
        type="button" 
        title="adicionar produtos" 
        onClick={() => setIsModalOpen(true)} 
        addClassName="bg-[#b95411] text-white rounded px-4 py-2 hover:scale-105 duration-300 ease-in cursor-pointer" 
      />

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Adicionar Novo Produto"
      >
        <div className="flex flex-col gap-4 w-full">
          <p className="text-sm text-gray-500">Preencha os dados abaixo para cadastrar no sistema os produtos.</p>

          <div className="flex flex-col gap-2">
            <Input 
            id="nome"
            type="text" 
            title="nome"
            placeholder="Nome do produto" 
            addClassName="w-full p-2 border rounded focus:ring-2 focus:ring-[#b95411] outline-none"
          />
          <Input
            id="descricao" 
            type="text"
            title="descrição"
            placeholder="Descrição do produto"
            addClassName="w-full p-2 border rounded focus:ring-2 focus:ring-[#b95411] outline-none"
          />
          <Input 
            id="categoria" 
            type="text"
            title="categoria"
            placeholder="Categoria do produto"
            addClassName="w-full p-2 border rounded focus:ring-2 focus:ring-[#b95411] outline-none"
          />
          <Input
            id="tags" 
            type="text"
            title="tags"
            placeholder="Tags do produto (separadas por vírgula)"
            addClassName="w-full p-2 border rounded focus:ring-2 focus:ring-[#b95411] outline-none"
          />
            <Input
            id="preco" 
            type="number"
            title="preço"
            placeholder="Preço do produto"
            addClassName="w-full p-2 border rounded focus:ring-2 focus:ring-[#b95411] outline-none" 
          />
          <Input
          id="quant"
          title="stock"
          placeholder="Quantidade em Stock"
          type="number"
          required
          addClassName="w-full p-2 border rounded focus:ring-2 focus:ring-[#b95411] outline-none" 
          />
          </div>

          <div className="flex"></div>

          <div className="flex flex-col items-center gap-3">
            <UploadArea onFilesSelected={handleUpload}/>

            <div className="flex gap-2 mt-2 overflow-x-auto">
              {selectedImages.map((file, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(file)}
                  className="w-16 h-16 object-cover rounded border"
                  alt="preview"
                />
              ))}
            </div>
          </div>
        
        </div>
      </Modal>
      
      {/* Aqui você renderizaria sua lista de produtos */}
    {/* Container da Lista */}
<div className="mt-8 overflow-x-auto">
  <table className="w-full border-collapse">
    <thead>
      <tr className="border-b border-gray-200 text-left">
        <th className="py-4 px-2">Imagem</th>
        <th className="py-4 px-2">Nome</th>
        <th className="py-4 px-2">Preço</th>
        <th className="py-4 px-2">Em stock</th>
        <th className="py-4 px-2 text-center">Status</th>
      </tr>
    </thead>

    <tbody>
      {products.length > 0 ? (
        products.map((product) => (
          <tr 
            key={product.id} 
            className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
          >
            <td className="py-3 px-2">
              {product.images && product.images.length > 0 ? (
                <img 
                  src={product.images[0].url} 
                  alt={product.name} 
                  className="w-10 h-10 object-cover rounded-md"
                />
              ) : (
                <div className="w-10 h-10 bg-gray-200 rounded-md flex items-center justify-center text-[10px] text-gray-400">
                  Sem foto
                </div>
              )}
            </td>
            <td className="py-3 px-2 font-medium">{product.name}</td>
            <td className="py-3 px-2">
              {/* Formatando o preço para Kz */}
              {new Intl.NumberFormat('pt-AOA', {
                style: 'currency',
                currency: 'AOA'
              }).format(product.price)}
            </td>
            <td className="py-3 px-2">{product.inStock} un.</td>
            <td className="py-3 px-2 text-center">
              <span className={`px-2 py-1 rounded text-xs ${product.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {product.active ? "Ativo" : "Inativo"}
              </span>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={5} className="py-10 text-center text-gray-500">
            Nenhum produto cadastrado até o momento.
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>
    </div>
  )
}

export default Products;