// // layout/MainLayoutProduct.tsx
// import { Outlet } from "react-router-dom";
// import SidebarProducts from '../components/SidebarProduct';
// import { useState } from "react";

// function MainLayoutProducts() {
  
//   const [filters, setFilters] = useState<ProductFilters>({ 
//     colors: [], 
//     sizes: [],  
//     priceRange: [0, 1000], 
//   });

//   const handleFilterChange = (key: keyof ProductFilters, value: any) => {
//     setFilters(prev => ({
//       ...prev,
//       [key]: value
//     }));
//   };

//   return (    
//     <div className="flex bg-gray-100 min-h-screen overflow-hidden">
//       <SidebarProducts 
//         filters={filters} 
//         onFilterChange={handleFilterChange} 
//       />

//       <main className="flex-1 py-8 px-8 overflow-y-auto">
//         <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
//           <Outlet context={{ filters }} />
//         </div>
//       </main>
//     </div>
//   );
// }
// export default MainLayoutProducts;