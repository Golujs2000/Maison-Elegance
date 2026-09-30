import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductForm from "./ProductForm";
import { getProductById, updateProduct } from "../../services/productService";
import Loader from "../../components/common/Loader";
import toast from "react-hot-toast";

export default function EditProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const item = await getProductById(id);
        setProduct(item);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load piece details");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  const handleSave = async (updatedData) => {
    await updateProduct(id, updatedData);
    toast.success("Masterpiece updated successfully!");
  };

  if (loading) return <Loader message="Opening piece dossier..." />;

  if (!product) {
    return (
      <div className="p-8 text-center bg-white border border-sand rounded-2xl">
        <p className="font-serif text-xl text-primary">Piece not found</p>
      </div>
    );
  }

  return (
    <ProductForm
      initialData={product}
      onSave={handleSave}
      title={`Editing: ${product.name}`}
    />
  );
}
