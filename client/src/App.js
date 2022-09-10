import { gql, useQuery } from "@apollo/client";

function App() {
  const GET_CLIENTS = gql`
    query getClients {
      allClients {
        id,
        name,
        phone,
        email
      }
    }
  `;
  const data = useQuery(GET_CLIENTS);
  console.log(data);
  return (
    <div className="App">
      <h1>Appolo Client </h1>
    </div>
  );
}

export default App;
