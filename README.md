<h1 align="center">📊 Pipeline de Big Data – N3 📊</h1>

<p align="center">
  <strong>Implementação completa da ingestão e transformação de dados da Netflix.</strong>
</p>

<p align="center">
  <a href="#funcionalidades">✨ Funcionalidades</a> •
  <a href="#instalacao">⚙️ Instalação</a> •
  <a href="#uso">💻 Uso</a> •
  <a href="#modelo-dados">🧱 Modelo NoSQL</a> •
  <a href="#consultas">🔎 Consultas</a> •
  <a href="#integrantes">🤝 Integrantes</a>
</p>

<hr>

<h2 id="funcionalidades">✨ Funcionalidades</h2>
<ul>
  <li>📥 Captura do dataset Netflix (CSV – Kaggle)</li>
  <li>🧹 Limpeza e padronização dos dados</li>
  <li>🔄 Transformação (ETL) completa via Node.js</li>
  <li>🗂️ Conversão para modelo NoSQL estruturado</li>
  <li>📤 Carga dos dados no MongoDB Atlas</li>
  <li>📊 Suporte a consultas analíticas (Aggregation)</li>
</ul>

<hr>

<h2 id="instalacao">⚙️ Instalação</h2>

<p>Clone o repositório:</p>

<pre><code>
git clone https://github.com/SEU_USUARIO/n3-flaris.git
cd n3-flaris
npm install
</code></pre>

<p>Crie o arquivo <code>.env</code> na raiz do projeto:</p>

<pre><code>
MONGO_URI=sua_string_do_mongodb
</code></pre>

<p>Coloque o arquivo <code>netflix_titles.csv</code> dentro da pasta <code>data/</code>.</p>

<hr>

<h2 id="uso">💻 Uso</h2>

<p>Para executar o pipeline completo (ETL + carga no MongoDB):</p>

<pre><code>
npm start
</code></pre>

<p>Saída esperada:</p>

<pre><code>
Transformação concluída: 8807 documentos
Inseridos 1000/8807
Inseridos 2000/8807
...
Carga finalizada!
</code></pre>

<hr>

<h2 id="modelo-dados">🧱 Modelo NoSQL</h2>

<p>Formato final de cada documento inserido no MongoDB:</p>

<pre><code>
{
  "_id": "s1",
  "tipo": "Movie",
  "titulo": "Inception",
  "ano_lancamento": 2010,
  "data_adicao": "2010-07-16",
  "classificacao": "PG-13",
  "duracao": "148 min",
  "descricao": "...",
  "diretor": { "id": "d_christopher_nolan", "nome": "Christopher Nolan" },
  "atores": [
    { "id": "a_leonardo_dicaprio", "nome": "Leonardo DiCaprio" }
  ],
  "pais": [
    { "id": "p_united_states", "nome": "United States" }
  ],
  "generos": ["Action", "Sci-Fi"],
  "fonte_dados": "kaggle/shivamb/netflix-shows"
}
</code></pre>

<hr>

<h2 id="consultas">🔎 Consultas Analíticas (Aggregation)</h2>

<p>Produções por país:</p>

<pre><code>
db.titulos.aggregate([
  { $unwind: "$pais" },
  { $group: { _id: "$pais.nome", total: { $sum: 1 } } },
  { $sort: { total: -1 } }
])
</code></pre>

<p>Quantidade de Filmes × Séries:</p>

<pre><code>
db.titulos.aggregate([
  { $group: { _id: "$tipo", total: { $sum: 1 } } }
])
</code></pre>

<p>Tendência por ano:</p>

<pre><code>
db.titulos.aggregate([
  { $group: { _id: "$ano_lancamento", total: { $sum: 1 } } },
  { $sort: { _id: 1 } }
])
</code></pre>

<p>Diretores mais frequentes:</p>

<pre><code>
db.titulos.aggregate([
  { $group: { _id: "$diretor.nome", total: { $sum: 1 } } },
  { $sort: { total: -1 } },
  { $limit: 10 }
])
</code></pre>

<hr>

<h2 id="integrantes">🤝 Integrantes</h2>

<p>
Grupo:<br>
Luis Bolina Martins<br>
João Vitor Castanheira Corrêa<br>
João Pedro Bastos
</p>

<p align="center">Faculdade Unicesusc 🏦</p>
