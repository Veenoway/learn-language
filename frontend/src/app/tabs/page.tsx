import { Dashboard } from "@/feature/dashboard";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const GET_USER_QUERY = gql`
  query user($address: String!) {
    user(address: $address) {
      address
      tabs {
        _id
        name
        cards {
          francais
          pinyin
          hanzi
        }
      }
    }
  }
`;

export const fetchTabFromUser = async () => {
  const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache(),
  });

  try {
    const { data } = await client.query({
      query: GET_USER_QUERY,
      variables: { address: "0x77A89C51f106D6cD547542a3A83FE73cB4459135" },
    });
    return data;
  } catch (e) {
    console.log(e);
  }
};

export default async function TabsPage() {
  const data = await fetchTabFromUser();
  return <Dashboard user={data?.user} />;
}
