const { Pool, Client } = require('pg');
const client = new Client({
  user: 'AdrianRodriguez',
  host: 'localhost',
  database: 'racedb',
  password: '',
  port: 5432,
});

client.connect();

module.exports = {
  query: (text, params, callback) => {
    return client.query(text, params, callback)
  }
}
