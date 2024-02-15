"use client";

export default function Price({ value }) {
  const price = formatPrice(value);
  return <span>€ {price}</span>;
}

function formatPrice(price) {
  let priceString = price.toString().replace(".", ",");
  if (priceString.includes(",00")) {
    return priceString.replace(",00", ",-");
  }
  if (!priceString.includes(",")) {
    return priceString + ",-";
  }
  if (priceString.endsWith(",0")) {
    return priceString.replace(",0", ",-");
  }
  return priceString;
}
