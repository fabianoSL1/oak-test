import sqlite3 from "sqlite3";
import type { Product } from "./product";
import { HTTPException } from "hono/http-exception";

const database = new sqlite3.Database("products.db");

database.serialize(() => {
	database.run(
		"CREATE TABLE IF NOT EXISTS product (name TEXT, describe TEXT, price REAL, avaliable INTEGER)",
	);
});

function insertProduct(product: Product): Promise<void> {
	return new Promise((resolve, reject) => {
		const stmt = database.prepare(
			"INSERT INTO product (name, describe, price, avaliable) VALUES (?, ?, ?, ?)",
		);

		const params = [
			product.name,
			product.describe,
			product.price,
			product.avaliable,
		];

		stmt.run(params, (err) => {
			if (err) {
				console.error(err);
				reject(new HTTPException());
			}
			resolve();
		});
	});
}

function listProducts(): Promise<Product[]> {
	return new Promise((resolve, reject) => {
		database.all(
			"SELECT rowid, name, describe FROM product ORDER BY price",
			[],
			(err, rows: Product[]) => {
				if (err) {
					console.error(err);
					reject(new HTTPException());
				}

				resolve(rows);
			},
		);
	});
}

export default {
	insertProduct,
	listProducts,
};
