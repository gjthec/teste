const express = require('express');
const multer = require('multer');
const { Pool } = require('pg');
const fs = require('fs');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Configuração do pool de conexões com o PostgreSQL
const pool = new Pool({
  host: 'jocularly-honest-tapir.data-1.use1.tembo.io',
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: 'TDBRtHFddwa6YGMO',
  ssl: { rejectUnauthorized: false },
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000
});

const upload = multer({ dest: 'uploads/' });

// Rota para cadastrar um novo cliente
app.post('/api/clients', async (req, res) => {
  const { cpfCnpj, razaoSocial, bairro, cidade, estado, telefone, email, cep, dataInclusao, endereco, situacao } = req.body;

  try {
    const client = await pool.connect();
    const query = `
      INSERT INTO clients (cpf_cnpj, razao_social, bairro, cidade, estado, telefone, email, cep, data_inclusao, endereco, situacao)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`;
    const values = [cpfCnpj, razaoSocial, bairro, cidade, estado, telefone, email, cep, dataInclusao, endereco, situacao];
    const result = await client.query(query, values);
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao cadastrar cliente:', error.message);
    res.status(500).send('Erro ao cadastrar cliente.');
  }
});

// Rota para obter todos os clientes
app.get('/api/clients', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM clients');
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar clientes:', error.message);
    res.status(500).send('Erro ao buscar clientes.');
  }
});

// Rota para obter um cliente específico pelo ID
app.get('/api/clients/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM clients WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      res.status(404).send('Cliente não encontrado.');
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error('Erro ao buscar cliente:', error.message);
    res.status(500).send('Erro ao buscar cliente.');
  }
});

// Rota para excluir um cliente pelo ID
app.delete('/api/clients/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const client = await pool.connect();
    const result = await client.query('DELETE FROM clients WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      res.status(404).send('Cliente não encontrado.');
    } else {
      res.send(`Cliente com ID ${id} excluído com sucesso.`);
    }
  } catch (error) {
    console.error('Erro ao excluir cliente:', error.message);
    res.status(500).send('Erro ao excluir cliente.');
  }
});

// Rota para upload de PDF e cadastro no banco
app.post('/api/upload', upload.single('arquivoPdf'), async (req, res) => {
  const caminhoPdf = req.file.path;
  const nomeArquivo = req.file.originalname;

  try {
    const client = await pool.connect();
    const conteudoPdf = fs.readFileSync(caminhoPdf);

    const query = 'INSERT INTO documentos_pdf (nome_arquivo, conteudo) VALUES ($1, $2)';
    await client.query(query, [nomeArquivo, conteudoPdf]);

    fs.unlinkSync(caminhoPdf);

    res.send(`Arquivo '${nomeArquivo}' inserido com sucesso no banco de dados.`);
  } catch (error) {
    console.error('Erro ao inserir o arquivo:', error.message);
    res.status(500).send('Erro ao inserir o arquivo no banco de dados.');
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
