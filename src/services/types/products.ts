export type ImagemProduto = {
  id: string;
  url: string;
  produtoId: string;
  createdAt: string;
};

export type Products = {
    id: string;
    name: string;
    description: string;
    price: number;
    images: ImagemProduto[]
    inStock: number;
    active: boolean;
    categoria: string;
    tags: string[]
    createdAt: Date;
    updatedAt: string;
}
