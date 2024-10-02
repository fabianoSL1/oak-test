import { useEffect, useState } from "react";
import ProductForm from "./ProductForm";

export const baseUrl = "http://localhost:3000";

export type ProductResponse = {
	rowid: number;
	name: string;
	describe: string;
};

function App() {
	const [products, setProducts] = useState<ProductResponse[]>([]);
	const [newProduct, setNewProduct] = useState(false);

	useEffect(() => {
		fetch(`${baseUrl}/products`).then(async (productsResponse) =>
			setProducts(await productsResponse.json()),
		);
	}, []);

	function handlerOnSubmit(products: ProductResponse[]) {
		setProducts(products);
		setNewProduct(false);
	}

	return (
		<main>
			<h1>Produtos</h1>

			<div className="product">
				<button type="button" onClick={() => setNewProduct(!newProduct)}>
					Novo produto
				</button>

				{newProduct ? <ProductForm onSubmit={handlerOnSubmit} /> : <></>}

				<table>
					<tr>
						<th>Nome</th>
						<th>Descrição</th>
					</tr>
					{products.map((product) => (
						<tr key={product.rowid}>
							<td>{product.name}</td>
							<td>{product.describe}</td>
						</tr>
					))}
				</table>
			</div>
		</main>
	);
}

export default App;
