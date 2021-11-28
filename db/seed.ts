import * as fs from "fs";
import mongoose from "mongoose";
import dbConfig from "./database";
import { Pokemon } from "../types/pokemon.type";
import PokemonModel from "../model/pokemon.model";

const rawdata = fs.readFileSync("./db/db.json");
const pokemonSeedData = JSON.parse(rawdata.toString());

const handleError = (error: any) => {
	if (error) {
		console.log("handleError error: ", error);
		return;
	}
};

mongoose
	.connect(dbConfig.db)
	.then((_) => {
		mongoose.connection.db.dropDatabase();
		console.log("Database connected successfully");
		(pokemonSeedData as Pokemon[]).forEach((pokemon) => {
			console.log("Starting to insert Pokémon: ", pokemon.name);

			try {
				PokemonModel.create(pokemon, handleError);
			} catch (err) {
				console.log("Fell in catch: ", err);
			}
		});
	})
	.catch((error) => {
		console.error("Failed to connect to the database", error);
	});
