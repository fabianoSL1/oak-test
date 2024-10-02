import repository from "./repository";

export type Product = {
  rowid?: number;
  name: string;
  describe: string;
  price: number;
  avaliable: boolean;
};

export async function createProduct(product: Product): Promise<Product[]> {
  await repository.insertProduct(product);
  return await repository.listProducts();
}

export async function listProducts(): Promise<Product[]> {
  return await repository.listProducts();
}
