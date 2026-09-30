/**
 * Converts array of products into CSV string and triggers browser download
 */
export function exportProductsToCSV(products) {
  if (!products || !products.length) return;

  const headers = [
    "id",
    "name",
    "sku",
    "category",
    "categoryName",
    "price",
    "discountPrice",
    "stock",
    "status",
    "isFeatured",
    "material",
    "dimensions",
    "warranty",
    "tags",
  ];

  const escapeCell = (val) => {
    if (val === null || val === undefined) return '""';
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
  };

  const rows = products.map((p) => [
    escapeCell(p.id),
    escapeCell(p.name),
    escapeCell(p.sku),
    escapeCell(p.category),
    escapeCell(p.categoryName),
    escapeCell(p.price),
    escapeCell(p.discountPrice || ""),
    escapeCell(p.stock),
    escapeCell(p.status),
    escapeCell(p.isFeatured ? "true" : "false"),
    escapeCell(p.material),
    escapeCell(p.dimensions),
    escapeCell(p.warranty),
    escapeCell(p.tags ? p.tags.join(",") : ""),
  ]);

  const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\r\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `maison_elegance_products_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Parses CSV text into product objects
 */
export function parseCSVToProducts(csvText) {
  const lines = csvText.split(/\r?\n/).filter((l) => l.trim().length > 0);
  if (lines.length < 2) return [];

  // Parse header
  const headers = lines[0].split(",").map((h) => h.replace(/^"|"$/g, "").trim());

  const parsedProducts = [];

  for (let i = 1; i < lines.length; i++) {
    // Regex for CSV with escaped commas
    const regex = /(?:,|\n|^)("(?:(?:"")*[^"]*)*"|[^",\n]*|(?:\n|$))/g;
    const matches = [];
    let match;
    while ((match = regex.exec(lines[i])) !== null) {
      let val = match[1];
      if (val !== undefined) {
        val = val.replace(/^"|"$/g, "").replace(/""/g, '"');
        matches.push(val);
      }
      if (regex.lastIndex >= lines[i].length) break;
    }

    if (matches.length >= 2) {
      const row = {};
      headers.forEach((h, idx) => {
        row[h] = matches[idx] || "";
      });

      if (row.name) {
        parsedProducts.push({
          name: row.name,
          sku: row.sku || `ME-IMP-${Date.now().toString().slice(-4)}`,
          category: row.category || "living-room",
          categoryName: row.categoryName || "Living Room",
          price: Number(row.price) || 0,
          discountPrice: row.discountPrice ? Number(row.discountPrice) : null,
          stock: Number(row.stock) || 0,
          status: row.status === "draft" ? "draft" : "active",
          isFeatured: row.isFeatured === "true" || row.isFeatured === true,
          material: row.material || "",
          dimensions: row.dimensions || "",
          warranty: row.warranty || "",
          tags: row.tags ? row.tags.split(",").map((t) => t.trim()) : [],
          media: [
            {
              type: "image",
              url: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80",
              source: "url",
              isPrimary: true,
            },
          ],
          variants: [],
          sortOrder: 100,
        });
      }
    }
  }

  return parsedProducts;
}
