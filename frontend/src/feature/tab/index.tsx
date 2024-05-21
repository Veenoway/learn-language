"use client";
import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { Container } from "@/components/container";
import { Input } from "@/components/input";
import { Modal } from "@/components/modal";
import { GET_TAB_QUERY } from "@/queries";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import { useState } from "react";

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

const CREATE_CARD_MUTATION = gql`
  mutation createCard($address: String!, $tabID: ID!, $card: CardInput!) {
    createCard(address: $address, tabID: $tabID, card: $card) {
      francais
      pinyin
      hanzi
    }
  }
`;

const createTab = gql`
  mutation createTab($name: String!, $address: String!) {
    createTab(name: $name, address: $address) {
      name
    }
  }
`;

export const Tab = ({ tab }) => {
  const [userId, setUserId] = useState(""); // État local pour stocker l'ID de l'utilisateur
  const [activeTabID, setActiveTabID] = useState(""); // État local pour stocker le nom de la tab
  const [isOpen, setIsOpen] = useState(false); // État local pour gérer l'ouverture et la fermeture du modal
  const [cards, setCards] = useState(tab?.cards || []); // État local pour stocker les cartes de la tab
  const params = useParams();
  const [card, setCard] = useState({
    francais: "",
    pinyin: "",
    hanzi: "",
  }); // État local pour stocker les détails de la carte
  const { loading, error, data } = useQuery(GET_USER_QUERY, {
    variables: { address: "0x77A89C51f106D6cD547542a3A83FE73cB4459135" },
  });
  const [createCard] = useMutation(CREATE_CARD_MUTATION);
  const [activeCard, setActiveCard] = useState(0);
  console.log("pathname", params);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await createCard({
        variables: {
          address: "0x77A89C51f106D6cD547542a3A83FE73cB4459135",
          tabID: params.tabs,
          card,
        },
        refetchQueries: [
          {
            query: GET_TAB_QUERY,
            variables: {
              address: "0x77A89C51f106D6cD547542a3A83FE73cB4459135",
            },
          },
        ],
      });
      console.log("createCard", data);
      setCards((prev) => [...prev, data.createCard]);
      setIsOpen(false);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (e) => {
    setCard({ ...card, [e.target.name]: e.target.value });
  };

  console.log("tab", tab);

  //   if (loading) return <p>Loading...</p>;
  //   if (error) return <p>Error : {error.message}</p>;

  return (
    <Container className="items-center">
      <div className="flex justify-between items-center w-fit mb-8">
        <Button title="< Back" className="mr-2.5" url="/tabs" />
        <Button title="Create Card" onClick={() => setIsOpen(true)} />
      </div>

      <Modal
        title="Create a card"
        isOpen={isOpen}
        close={() => setIsOpen(false)}
      >
        <form onSubmit={handleSubmit} className="text-black">
          <Input handleChange={handleChange} name="hanzi" title="Hanzi" />
          <Input handleChange={handleChange} name="pinyin" title="Pinyin" />
          <Input
            handleChange={handleChange}
            name="francais"
            title="Traduction"
          />
          <Button className="mt-5" title="Submit" type="submit" />
        </form>
      </Modal>
      <Card card={cards[activeCard]} />
      <div className="flex items-center justify-between mt-8 w-fit">
        <Button title="Facile +3jour" className="mr-2.5" />
        <Button title="Moyen +4heure" className="mr-2.5" />
        <Button title="Difficile +1min" className="mr-2.5" />

        <Button
          title="next"
          onClick={() => {
            if (activeCard < cards.length - 1) setActiveCard(activeCard + 1);
            else setActiveCard(0);
          }}
        />
      </div>
    </Container>
  );
};
