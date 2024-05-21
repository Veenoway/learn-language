import { Tab } from "@/feature/tab";
import { GET_TAB_QUERY } from "@/queries";
import { ApolloClient, InMemoryCache } from "@apollo/client";

async function getData(tabID) {
  const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: GET_TAB_QUERY,
    variables: {
      id: tabID,
    },
  });

  if (!data) {
    throw new Error("Failed to fetch data");
  }

  return data;
}

export default async function Page({ params }) {
  console.log(params);
  const data = await getData(params.tabs);

  console.log("MY DATA", data.tab);

  return <Tab tab={data.tab} />;
}
