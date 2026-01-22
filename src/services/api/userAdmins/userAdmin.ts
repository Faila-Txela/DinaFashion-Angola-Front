import axios from "../../lib/axios";
import type { Admin } from "../../types/userAdmin";


class AdminService{
    async create(adminData: Admin){
        const { data } = await axios.post("/register", adminData);
        return data;
    } // Não estou usando esta função agora

    async getAll(){
        return await axios.get("/admin")
    }
}

export const adminService = new AdminService();