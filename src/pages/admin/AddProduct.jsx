import React from "react";
import ProductForm from "./ProductForm";
import { createProduct } from "../../services/productService";
import toast from "react-hot-toast";

export default function AddProduct() {
  const handleSave = async (productData) => {
    await createProduct(productData);
    toast.success("Masterpiece created successfully!");
  };

  return <ProductForm onSave={handleSave} title="Add New Masterpiece" />;
}
