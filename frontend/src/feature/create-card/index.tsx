"use client";
import { Card } from "@/components/card";
import { gql, useQuery } from "@apollo/client";
import { useState } from "react";

// const getUserQuery = gql`
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

const getUserQuery = gql`
  query user {
    user(address: "0x77A89C51f106D6cD547542a3A83FE73cB4459135") {
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
  const [tabName, setTabName] = useState(""); // État local pour stocker le nom de la tab
  const [card, setCard] = useState({}); // État local pour stocker les détails de la carte
  console.log("props", props);
  const { loading, error, data } = useQuery(getUserQuery);

  console.log("data", data, "error", error, "loading", loading);

  //   if (loading) return <p>Loading...</p>;
  //   if (error) return <p>Error : {error.message}</p>;

  return (
    <div className="h-screen flex items-center justify-center w-screen bg-red">
      <Card translate={""} position={""} delay={0} />
    </div>
  );
};
