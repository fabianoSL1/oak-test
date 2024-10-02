import { useState } from "react";
import { baseUrl, type ProductResponse } from "./App";

type Props = {
	onSubmit: (products: ProductResponse[]) => void;
};

type ProductRequest = {
	name: string;
	describe: string;
	price: number;
	avaliable: boolean;
};

const defaultValues: ProductRequest = {
	name: "",
	describe: "",
	price: 0,
	avaliable: true,
};

function ProductForm({ onSubmit }: Props) {
	const [product, setProduct] = useState<ProductRequest>(defaultValues);

	function handlerField(event: React.ChangeEvent<HTMLInputElement>) {
		setProduct((current) => ({
			...current,
			[event.target.name]: event.target.value,
		}));
	}

	function toggleAvaliable() {
		setProduct((current) => ({ ...current, avaliable: !current.avaliable }));
	}

	async function handlerSubmit() {
		try {
			const response = await fetch(`${baseUrl}/products`, {
				method: "POST",
				body: JSON.stringify(product),
			});

			onSubmit(await response.json());
		} catch {
			alert("falha ao salvar produto");
		}
	}

	return (
		<form className="product-form">
			<div className="product-form-field">
				<label htmlFor="name">Nome</label>
				<input
					name="name"
					type="text"
					value={product.name}
					onChange={(event) => handlerField(event)}
				/>
			</div>

			<div className="product-form-field">
				<label htmlFor="describe">Descrição</label>
				<input
					name="describe"
					type="text"
					value={product.describe}
					onChange={(event) => handlerField(event)}
				/>
			</div>

			<div className="product-form-field">
				<label htmlFor="price">Preço</label>
				<input
					name="price"
					type="text"
					value={product.price}
					onChange={(event) => handlerField(event)}
				/>
			</div>

			<div className="product-form-field">
				<div>
					<input
						name="avaliable"
						type="checkbox"
						onClick={toggleAvaliable}
						checked={product.avaliable}
					/>
					<label htmlFor="avaliable">Disponivel</label>
				</div>
			</div>

			<button type="button" onClick={handlerSubmit}>
				Salvar
			</button>
		</form>
	);
}

export default ProductForm;
