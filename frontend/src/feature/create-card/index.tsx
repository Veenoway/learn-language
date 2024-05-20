"use client";
import { gql, useMutation } from "@apollo/client";
import { useState } from "react";

const ADD_CARD_TO_USER_TAB = gql`
  mutation AddCardToUserTab(
    $address: String!
    $name: String!
    $card: CardInput!
  ) {
    addCardToUserTab(address: $address, tabName: $name, card: $card) {
      id
      address
      tabs {
        name
        cards
      }
    }
  }
`;

export const AddCardForm = () => {
  const [userId, setUserId] = useState(""); // État local pour stocker l'ID de l'utilisateur
  const [tabName, setTabName] = useState(""); // État local pour stocker le nom de la tab
  const [card, setCard] = useState({}); // État local pour stocker les détails de la carte

  const [addCardToUserTab] = useMutation(ADD_CARD_TO_USER_TAB);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Appeler la mutation avec les valeurs actuelles des états locaux
    addCardToUserTab({
      variables: { userId, tabName, card },
    })
      .then((result) => {
        // Gérer le résultat si nécessaire
        console.log("Card added successfully:", result.data.addCardToUserTab);
      })
      .catch((error) => {
        // Gérer les erreurs si nécessaire
        console.error("Failed to add card:", error);
      });
  };

  return (
    <div className="h-screen flex items-center justify-center w-screen bg-red">
      <form onSubmit={handleSubmit}>
        <label>
          User ID:
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </label>
        <label>
          Tab Name:
          <input
            type="text"
            value={tabName}
            onChange={(e) => setTabName(e.target.value)}
          />
        </label>
        <label>
          Card Hanzi:
          <input
            type="text"
            value={card.hanzi}
            onChange={(e) => setCard({ ...card, hanzi: e.target.value })}
          />
        </label>
        {/* Ajoutez d'autres champs de carte si nécessaire */}
        <button type="submit">Add Card</button>
      </form>
    </div>
  );
};
