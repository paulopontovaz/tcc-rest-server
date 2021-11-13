import * as mongoose from "mongoose";
import {
	PokemonStats,
	PokemonMove,
	PokemonMoves,
	PokemonAbilities,
	PokemonDamages,
	PokemonMisc,
	Pokemon,
	PokemonType,
} from "../model/pokemon.model";

const Schema = mongoose.Schema;

const PokemonStatsSchema = new Schema<PokemonStats>({
	hp: Number,
	attack: String,
	defense: String,
	spattack: String,
	spdefense: String,
	speed: Number,
});

const PokemonMoveSchema = new Schema<PokemonMove>({
	learnedat: String,
	name: String,
});

const PokemonMovesSchema = new Schema<PokemonMoves>({
	level: [PokemonMoveSchema],
});

const PokemonAbilitiesSchema = new Schema<PokemonAbilities>({
	normal: [{ type: String }],
	hidden: [{ type: String }],
});

const PokemonDamagesSchema = new Schema<PokemonDamages>({
	normal: String,
	fire: String,
	water: String,
	electric: String,
	grass: String,
	ice: String,
	fight: String,
	poison: String,
	ground: String,
	flying: String,
	psychic: String,
	bug: String,
	rock: String,
	ghost: String,
	dragon: String,
	dark: String,
	steel: String,
});

const PokemonMiscSchema = new Schema<PokemonMisc>({
	abilities: PokemonAbilitiesSchema,
	classification: String,
	height: String,
	weight: String,
	capturerate: String,
	eggsteps: String,
	expgrowth: String,
	happiness: String,
	evpoints: [{ type: String }],
	fleeflag: String,
	entreeforestlevel: String,
});

const PokemonSchema = new Schema<Pokemon>(
	{
		id: Number,
		name: String,
		img: String,
		nickname: String,
		moves: PokemonMovesSchema,
		damages: PokemonDamagesSchema,
		stats: PokemonStatsSchema,
		misc: PokemonMiscSchema,
		type: [
			{
				type: String,
				enum: Object.values(PokemonType),
			},
		],
	},
	{
		collection: "pokemon",
		autoIndex: true,
		minimize: true,
	}
);

export default mongoose.model("PokemonSchema", PokemonSchema);
