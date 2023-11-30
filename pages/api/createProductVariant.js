const handler = async (req, res) => {
  const storeName = process.env.PUBLIC_STORE_DOMAIN;
  const ADMIN_TOKEN = process.env.PRIVATE_SHOPIFY_ADMIN_TOKEN;
  const method = "POST";
  const apiVersion = "2023-10";

  const product = req.body.variantData.product;

  const productIdParts = product.id.split("/");
  const productId = productIdParts[productIdParts.length - 1];

  const variants = product.variants.edges;
  const targetId = req.body.variantData.selectedVariantId;

  const filteredVariants = variants.filter(
    (variant) => variant.node.id === targetId
  );
  const currentVariant = filteredVariants[0].node;

  const imageIdParts = currentVariant.image.id.split("/");
  const imageId = imageIdParts[imageIdParts.length - 1];

  const randomNumber = Math.floor(1000000000 + Math.random() * 9000000000);

  const option1 =
    currentVariant.selectedOptions[0].value +
    " WD options " +
    String(randomNumber);
  const option2 =
    currentVariant.selectedOptions[1]?.value !== undefined
      ? currentVariant.selectedOptions[1].value
      : null;
  const option3 =
    currentVariant.selectedOptions[2]?.value !== undefined
      ? currentVariant.selectedOptions[2].value
      : null;

  const postBody = {
    variant: {
      product_id: productId,
      option1: option1,
      option2: option2,
      option3: option3,
      //   price: currentVariant.price.amount,
      price: "50.00",
      inventory_policy: "continue",
      sku: currentVariant.sku,
      //   To do
      // Stock quantity
      image_id: imageId,
    },
  };

  const options = {
    mode: "cors",
    method: method,
    headers: {
      "X-Shopify-Access-Token": ADMIN_TOKEN,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postBody),
  };

  const url = `https://${storeName}/admin/api/${apiVersion}/products/${postBody.variant.product_id}/variants.json`;

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    return res.end(JSON.stringify({ succes: data }));
  } catch (error) {
    return res.end(JSON.stringify({ error: error.message }));
  }
};

export default handler;

function findVariantIdById(variants, targetId) {
  for (const variant of variants) {
    if (variant.id === targetId) {
      return variant;
    }
  }
  return null;
}
