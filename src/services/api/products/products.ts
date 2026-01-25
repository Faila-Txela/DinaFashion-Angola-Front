import axios from "../../lib/axios";

class ProductsService{
    async create(productsData: FormData){
        const { data } = await axios.post("/products", productsData, {
            headers: {
            "Content-Type": "multipart/form-data"
    }
        });
        return data;
    }
    

    async getAll(){
     const { data } = await axios.get("/products");
     return data;
    }


    async update(id: string, productsData: FormData){
        const { data } = await axios.put(`/products/${id}`, productsData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return data;
    }

    
    async delete(id: string){
        const { data } = await axios.delete(`/products/${id}`);
        return data;
    }

}

export const productsService = new ProductsService();