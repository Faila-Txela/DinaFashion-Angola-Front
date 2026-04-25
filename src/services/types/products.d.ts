export interface ImagemProduto {
  id: string;
  url: string;
  produtoId: string;
  createdAt: string;
};

export interface Products {
    id: string;
    name: string;
    description: string;
    price: number;
    imagens: ImagemProduto[]
    inStock: number;
    active: boolean;
    categoria: string;
    tags: string[]
    createdAt: Date;
    updatedAt: string;
}
