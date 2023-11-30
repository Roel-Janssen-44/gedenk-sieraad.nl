"use client";
import {
  Image,
  useCart,
  CartLineProvider,
  CartLineQuantity,
  CartLineQuantityAdjustButton,
} from "@shopify/hydrogen-react";

export default function Navbar() {
  const { cartCreate, lines, status, linesAdd } = useCart();

  console.log("Status:", status);
  console.log("Lines:", lines);

  const handleAddLineClick = () => {
    const lineToAdd = {
      merchandiseId: "gid://shopify/ProductVariant/47247984722262",
      quantity: 1,
      attributes: [{ key: "example", value: "value" }],
    };

    if (status === "uninitialized") {
      cartCreate({ lines: [lineToAdd] });
    } else {
      linesAdd([lineToAdd]);
    }
  };

  return (
    <nav className="w-full bg-gray-500">
      <div className="container h-20 flex justify-between items-center">
        <span>home</span>
        <div className="relative">
          cart
          <div className="absolute right-0 top-10 bg-gray-100 px-4 py-4 w-80 h-auto">
            {lines?.map((line) => (
              <div key={"cart_line" + line.id}>
                <CartLineProvider line={line}>
                  <div className="flex justify-between">
                    <div className="w-20">
                      <Image data={line.merchandise.image} />
                    </div>
                    <span>{line.merchandise.title}</span>
                    <div className="flex justify-between gap-2">
                      <CartLineQuantity />
                      <span className="text-red-700">
                        <CartLineQuantityAdjustButton adjust="remove">
                          X
                        </CartLineQuantityAdjustButton>
                      </span>
                    </div>
                  </div>
                </CartLineProvider>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* <button onClick={() => cartCreate([merchandise])}>Add Line</button> */}
      {/* <button onClick={handleAddLineClick}>Add Line</button> */}
    </nav>
  );
}
