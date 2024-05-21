"use client";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { Tabs } from "../dashboard";

// const GET_USER_QUERY = gql`
//   query getAllUsers {
//     getAllUsers {
//       address
//       tabs {
//         name
//         cards {
//           francais
//           pinyin
//           hanzi
//         }
//       }
//     }
//   }
// `;

const GET_USER_QUERY = gql`
  query user($address: String!) {
    user(address: $address) {
      address
      tabs {
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

const ADD_CARD_MUTATION = gql`
  mutation createCard($address: String!, $tabID: ID!, $card: CardInput!) {
    createCard(address: $address, tabID: $tabID, card: $card) {
      address
      tabs {
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

export const AddCardForm = (props) => {
  const [userId, setUserId] = useState(""); // État local pour stocker l'ID de l'utilisateur
  const [activeTabID, setActiveTabID] = useState(""); // État local pour stocker le nom de la tab
  const [card, setCard] = useState({
    francais: "",
    pinyin: "",
    hanzi: "",
  }); // État local pour stocker les détails de la carte
  const { loading, error, data } = useQuery(GET_USER_QUERY, {
    variables: { address: "0x77A89C51f106D6cD547542a3A83FE73cB4459135" },
  });
  const [createCard] = useMutation(ADD_CARD_MUTATION);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCard({
        variables: {
          address: "0x77A89C51f106D6cD547542a3A83FE73cB4459135",
          tabID,
          card: card,
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  //   if (loading) return <p>Loading...</p>;
  //   if (error) return <p>Error : {error.message}</p>;

  return (
    <div className="h-screen flex items-center flex-col justify-center w-screen bg-red">
      <Tabs />
      <form onSubmit={handleSubmit} className="text-black">
        <input
          type="text"
          placeholder="Tab Name"
          className="text-black"
          onChange={(e) => setTabName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Francais"
          className="text-black"
          onChange={(e) => setCard({ ...card, francais: e.target.value })}
        />
        <input
          type="text"
          placeholder="Pinyin"
          className="text-black"
          onChange={(e) => setCard({ ...card, pinyin: e.target.value })}
        />
        <input
          type="text"
          placeholder="Hanzi"
          className="text-black"
          onChange={(e) => setCard({ ...card, hanzi: e.target.value })}
        />
        <button type="submit">Add Card</button>
      </form>
      {data?.user?.tabs.map((tab) => (
        <div key={tab.name}>
          <h1>{tab.name}</h1>
          {tab.cards.map((card) => (
            <div key={card.francais}>
              <h1>{card.francais}</h1>
              <h1>{card.pinyin}</h1>
              <h1>{card.hanzi}</h1>
            </div>
          ))}
        </div>
      ))}
      <div className="my-9 h-8 w-8" />
      {/* <Card translate={""} position={""} delay={0} /> */}
    </div>
  );
};
