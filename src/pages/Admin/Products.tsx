import { useState, useEffect } from "react";
import { productsService } from "../../services/api/products/products";
import Button from "../../components/Button";
import Input from "../../components/Input";
import UploadArea from "../../components/upload-area";
import { Loader2, MoreVertical, Trash2, Edit3, Eye } from "lucide-react"; 
import Modal from "../../components/Modal";
import ProductDetailsModal from "../../components/ProductDetailsModal";
import { toast } from "react-toastify"; 

interface Product {
  id: string;
  name: string;
  imagens: { url: string }[];
  description: string;
  price: number;
  inStock: number;
  active?: boolean;
  categoria?: string;
  tags?: string[];
  createdAt: string;  
}

function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  
  // Estados para edição e dropdown
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedProductForEdit, setSelectedProductForEdit] = useState<Product | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null); 

  const handleUpload = (files: File[]) => {
    console.log("Arquivos recebidos:", files);
    setSelectedImages(files);
  };

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: 0,
    inStock: 0,
    categoria: "",
    tags: ""
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await productsService.getAll();
        setProducts(data);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
        toast.error("Erro ao carregar produtos. Verifique a conexão.");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Função para criar novo produto
  const handleSaveProduct = async () => {
    if (!form.name.trim()) {
      toast.error("Nome do produto é obrigatório.");
      return;
    }
    try {
      const formData = new FormData();
      const info = {
        name: form.name,
        description: form.description,
        price: Number(form.price),
        inStock: Number(form.inStock),
        categoria: form.categoria,
        tags: form.tags, // Envie como string (não array), pois o backend espera string
        active: true
      };
      formData.append("info", JSON.stringify(info));
      if (selectedImages.length > 0) {
        formData.append("file", selectedImages[0]);
      }
      console.log("Criando produto:", info);
      const newProduct = await productsService.create(formData);
      setProducts(prev => [...prev, newProduct]); // Atualiza lista local
      setIsModalOpen(false);
      setForm({ name: "", description: "", price: 0, inStock: 0, categoria: "", tags: "" });
      setSelectedImages([]);
      toast.success("Produto criado com sucesso!");
    } catch (error) {
      console.error("Erro ao criar produto:", error);
      toast.error("Falha ao criar produto. Verifique os dados e tente novamente.");
    }
  };

  // Função para atualizar o produto 
  const handleUpdateProduct = async () => {
    if (!selectedProductForEdit || !form.name.trim()) {
      toast.error("Nome do produto é obrigatório.");
      return;
    }
    try {
      const formData = new FormData();
      const info = {
        name: form.name,
        description: form.description,
        price: Number(form.price),
        inStock: Number(form.inStock),
        categoria: form.categoria,
        tags: form.tags, // Envie como string
        active: selectedProductForEdit.active
      };
      formData.append("info", JSON.stringify(info));
      if (selectedImages.length > 0) {
        formData.append("file", selectedImages[0]);
      }
      console.log("Atualizando produto:", info);
      const updatedProduct = await productsService.update(selectedProductForEdit.id, formData);
      setProducts(prev => prev.map(p => p.id === selectedProductForEdit.id ? updatedProduct : p)); 
      setIsModalOpen(false);
      setForm({ name: "", description: "", price: 0, inStock: 0, categoria: "", tags: "" });
      setSelectedImages([]);
      setIsEditMode(false);
      setSelectedProductForEdit(null);
      toast.success("Produto atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      toast.error("Falha ao atualizar produto. Verifique os dados e tente novamente.");
    }
  };

  // Função para abrir o modal de detalhes
  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsDetailModalOpen(true);
    setOpenMenuId(null); 
  };

  // Função para editar
  const handleEdit = (product: Product) => {
    setSelectedProductForEdit(product);
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      inStock: product.inStock,
      categoria: product.categoria || "",
      tags: product.tags ? product.tags.join(', ') : "" // Converte array para string para edição
    });
    setSelectedImages([]); // Reseta imagens
    setIsEditMode(true);
    setIsModalOpen(true);
    setOpenMenuId(null);
  };

  // Função para eliminar produto
  const handleDelete = async (id: string) => {
    if (window.confirm("Deseja realmente eliminar este produto?")) {
      try {
        console.log("Deletando produto ID:", id);
        await productsService.delete(id);
        setProducts(prevProducts => prevProducts.filter(product => product.id !== id)); // Remove da lista local
        toast.success("Produto eliminado com sucesso!");
      } catch (error) {
        console.error("Erro ao eliminar produto:", error);
        toast.error("Erro ao eliminar o produto. Tente novamente.");
      }
    }
    setOpenMenuId(null); 
  };

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
    <div onClick={() => setOpenMenuId(null)}>
      <Button 
        name="Adicionar Produtos" 
        type="button" 
        title="adicionar produtos" 
        onClick={() => {
          setIsEditMode(false);
          setSelectedProductForEdit(null);
          setForm({ name: "", description: "", price: 0, inStock: 0, categoria: "", tags: "" });
          setSelectedImages([]);
          setIsModalOpen(true);
        }} 
        addClassName="bg-[#b95411] text-white rounded px-4 py-2 hover:scale-105 duration-300 ease-in cursor-pointer" 
      />

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          setIsEditMode(false);
          setSelectedProductForEdit(null);
        }}
        onConfirm={isEditMode ? handleUpdateProduct : handleSaveProduct}
        title={isEditMode ? "Editar Produto" : "Adicionar Novo Produto"}
      >
        <div className="flex flex-col gap-4 w-full">
          <p className="text-sm text-gray-500">Preencha os dados abaixo para {isEditMode ? "editar" : "cadastrar"} no sistema os produtos.</p>
          <div className="flex flex-col gap-2">
            <Input id="nome" type="text" value={form.name} onChange={(e)=> setForm({...form, name: e.target.value})} title="nome" placeholder="Nome do produto" addClassName="w-full p-2 border rounded focus:ring-2 focus:ring-[#b95411] outline-none" />
            <Input id="descricao" type="text" value={form.description} onChange={(e)=> setForm({...form, description: e.target.value})} title="descrição" placeholder="Descrição do produto" addClassName="w-full p-2 border rounded focus:ring-2 focus:ring-[#b95411] outline-none" />
            <Input id="categoria" type="text" value={form.categoria} onChange={(e)=> setForm({...form, categoria: e.target.value})} title="categoria" placeholder="Categoria do produto" addClassName="w-full p-2 border rounded focus:ring-2 focus:ring-[#b95411] outline-none" />
            <Input id="tags" type="text" value={form.tags} onChange={(e)=> setForm({...form, tags: e.target.value})} title="tags" placeholder="Tags do produto (separadas por vírgula)" addClassName="w-full p-2 border rounded focus:ring-2 focus:ring-[#b95411] outline-none" />
            <Input id="preco" type="number" value={form.price.toString()} onChange={(e)=> setForm({...form, price: Number(e.target.value)})} title="preço" placeholder="Preço do produto" addClassName="w-full p-2 border rounded focus:ring-2 focus:ring-[#b95411] outline-none" />
            <Input id="quant" title="stock" value={form.inStock.toString()} onChange={(e)=> setForm({...form, inStock: Number(e.target.value)})} placeholder="Quantidade em Stock" type="number" required addClassName="w-full p-2 border rounded focus:ring-2 focus:ring-[#b95411] outline-none" />
          </div>
          <div className="flex flex-col items-center gap-3">
            <UploadArea onFilesSelected={handleUpload}/>
            <div className="flex gap-2 mt-2 overflow-x-auto">
              {selectedImages.map((file, index) => (
                <img key={index} src={URL.createObjectURL(file)} className="w-16 h-16 object-cover rounded border" alt="preview" />
              ))}
            </div>
          </div>
        </div>
      </Modal>

      <ProductDetailsModal 
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        product={selectedProduct}
      />
      
      <div className="mt-8 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-200 text-left">
              <th className="py-4 px-2">Imagem</th>
              <th className="py-4 px-2">Nome</th>
              <th className="py-4 px-2">Preço</th>
              <th className="py-4 px-2">Em stock</th>
              <th className="py-4 px-2">Criado em</th>
              <th className="py-4 px-2 text-center">Status</th>
              <th className="py-4 px-2 text-center">Ações</th>  
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-2">
                    {product.imagens && product.imagens.length > 0 ? (
                      <img alt="images" src={product.imagens[0].url} className="w-10 h-10 object-cover rounded-md" />
                    ) : (
                      <div className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center text-[10px] text-gray-300">N/A</div>
                    )}
                  </td>
                  <td className="py-3 px-2 font-medium">{product.name}</td>
                  <td className="py-3 px-2">
                    {new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(product.price)}
                  </td>
                  <td className="py-3 px-2">{product.inStock} un.</td>
                  <td className="py-3 px-2 text-xs">
                    {new Intl.DateTimeFormat('pt-AO', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(product.createdAt))}
                  </td> 
                  <td className="py-3 px-2 text-center">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${product.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {product.active ? "Ativo" : "Inativo"}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-center relative">
                    <button
                      type="button"
                      title="open" 
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenMenuId(openMenuId === product.id ? null : product.id);
                      }}
                      className={`p-2 rounded-full transition-colors ${openMenuId === product.id ? 'bg-[#b95411] text-white' : 'hover:bg-gray-200 text-gray-500'}`}
                    >
                      <MoreVertical className="w-5 h-5 cursor-pointer" />
                    </button>
                    {openMenuId === product.id && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-100 z-[100] py-2 animate-in fade-in zoom-in duration-200">
                        <button 
                          type="button"
                          onClick={() => handleViewDetails(product)}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-[#b95411]"
                        >
                          <Eye size={16} /> Ver Detalhes
                        </button>
                        <button
                          type="button" 
                          onClick={() => handleEdit(product)}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                        >
                          <Edit3 size={16} /> Atualizar
                        </button>
                        <div className="h-[1px] bg-gray-100 my-1 mx-2" />
                        <button 
                          type="button"
                          title="delete"
                          onClick={(e) => {
                            e.stopPropagation(); 
                            handleDelete(product.id);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 font-medium"
                        >
                          <Trash2 size={16} /> Eliminar Produto
                        </button>
                      </div>
                    )}
                  </td>  
                </tr>
              ))
            ) : (
              <tr><td colSpan={7} className="py-10 text-center text-gray-500 italic">Nenhum produto cadastrado até o momento.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Products;