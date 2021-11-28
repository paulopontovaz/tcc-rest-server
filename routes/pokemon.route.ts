import * as express from "express";
import PokemonModel from "../model/pokemon.model";

const pokemonExpressRoute = express.Router();

const handleError = (res: any, next: any) => (error: any, data: any) => {
	if (error) {
		console.log("handleError: ", error);
		return next(error);
	}

	res.json(data);
};

pokemonExpressRoute.route("/pokemon").get((req: any, res: any, next: any) => {
	console.log("Fetch pokemon list req.query", req.query);
	const searchParams = req.query.q
		? { name: { $regex: req.query.q, $options: "i" } }
		: {};
	console.log("Fetch pokemon list searchParams", searchParams);

	PokemonModel.find(searchParams)
		.sort({ id: "asc" })
		.exec(handleError(res, next));
});

pokemonExpressRoute
	.route("/pokemon/:id")
	.get((req: any, res: any, next: any) => {
		console.log("Fetch pokemon req.params:", req.params);
		PokemonModel.findOne({ id: req.params.id }, handleError(res, next));
	});

pokemonExpressRoute
	.route("/pokemon/:id")
	.put((req: any, res: any, next: any) => {
		console.log("Edit pokemon params: ", req.params);
		console.log("Edit pokemon body: ", req.body);
		PokemonModel.findOneAndUpdate(
			{ id: req.params.id },
			{ nickname: req.body.nickname },
			{ new: true },
			handleError(res, next)
		);
	});

pokemonExpressRoute
	.route("/pokemon/:id")
	.delete((req: any, res: any, next: any) => {
		console.log("Delete pokemon: ", req.params);
		PokemonModel.findOneAndDelete(
			{ id: req.params.id },
			handleError(res, next)
		);
	});

export default pokemonExpressRoute;
