import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

const GET_CURRENCIES = gql`
  query {
    currencies {
      id
      name
      code
      symbol
    }
  }
`;

const GENERATE_GRAPH_MUTATION = gql`
  mutation {
    generateGraph
  }
`;

client.query({ query: GET_CURRENCIES })
  .then(response => {
    const currencies = response.data.currencies;
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = ''; 
    const currenciesSection = document.createElement('div');
    currenciesSection.innerHTML = `<h3>Monedas</h3>`;
    currencies.forEach(currency => {
      const currencyElement = document.createElement('div');
      currencyElement.classList.add('currency');
      currencyElement.innerHTML = `
        <h4>${currency.name}</h4>
        <p>Código: ${currency.code}</p>
        <p>Símbolo: ${currency.symbol}</p>
      `;
      currenciesSection.appendChild(currencyElement);
    });

    resultsContainer.appendChild(currenciesSection);
  })
  .catch(error => {
    console.error('Error al obtener monedas:', error);
  });

document.addEventListener('DOMContentLoaded', function () {
  const graphContainer = document.getElementById('graph-container');

  client.mutate({ mutation: GENERATE_GRAPH_MUTATION })
    .then(response => {
      const imageBase64 = response.data.generateGraph; 
      const img = document.createElement('img');
      img.src = imageBase64;  
      img.alt = 'Gráfico de Ingresos y Gastos';
      img.width = 500;  
      graphContainer.appendChild(img);
    })
    .catch(error => {
      console.error('Error al generar el gráfico:', error);
    });
});

