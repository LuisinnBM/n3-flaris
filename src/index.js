const fs = require("fs");
const csv = require("csv-parser");
const { MongoClient } = require("mongodb");
require("dotenv").config();

function makeId(prefix, name) {
  if (!name) return null;
  return `${prefix}_${name.trim().toLowerCase().replace(/\s+/g, "_").replace(/[^a-z0-9_]/g, "")}`;
}

function toArrayField(value) {
  if (!value) return [];
  return value.split(",").map(v => v.trim()).filter(Boolean);
}

async function main() {
  const results = [];

  fs.createReadStream("./data/netflix_titles.csv")
    .pipe(csv())
    .on("data", (row) => {
      const doc = {
        _id: row.show_id,
        tipo: row.type,
        titulo: row.title,
        ano_lancamento: Number(row.release_year) || null,
        data_adicao: row.date_added || null,
        classificacao: row.rating || null,
        duracao: row.duration || null,
        descricao: row.description || null,

        diretor: row.director
          ? {
              id: makeId("d", row.director),
              nome: row.director.trim(),
            }
          : null,

        atores: toArrayField(row.cast).map((a) => ({
          id: makeId("a", a),
          nome: a,
        })),

        pais: toArrayField(row.country).map((p) => ({
          id: makeId("p", p),
          nome: p,
        })),

        generos: toArrayField(row.listed_in),

        fonte_dados: "kaggle/shivamb/netflix-shows",
      };

      results.push(doc);
    })
    .on("end", async () => {
      console.log("Transformação concluída:", results.length, "documentos");

      const client = new MongoClient(process.env.MONGO_URI);

      try {
        await client.connect();
        const db = client.db("netflix");
        const col = db.collection("titulos");

        await col.deleteMany({});

        const BATCH = 1000;
        for (let i = 0; i < results.length; i += BATCH) {
          const batch = results.slice(i, i + BATCH);
          await col.insertMany(batch);
          console.log(`Inseridos ${i + batch.length}/${results.length}`);
        }

        console.log("Carga finalizada!");
      } catch (err) {
        console.error("Erro:", err);
      } finally {
        await client.close();
      }
    });
}

main();
