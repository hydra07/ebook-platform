import ListOrder from "./list-order";

export interface Order {
    id: string
}

export default async function PurchasePage() {
    const orders = await getOrders()
  return (
    <ListOrder orders={orders} />
  );
}
