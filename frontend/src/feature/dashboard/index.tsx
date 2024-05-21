"use client";
import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { Input } from "@/components/input";
import { Modal } from "@/components/modal";
import { GET_USER_QUERY } from "@/queries";
import { gql, useMutation } from "@apollo/client";
import Link from "next/link";
import { useState } from "react";

const createTab = gql`
  mutation createTab($name: String!, $address: String!) {
    createTab(name: $name, address: $address) {
      name
    }
  }
`;

export const Dashboard = ({ user }) => {
  const [name, setName] = useState("");
  const [createTabMutation] = useMutation(createTab);
  const [isOpen, setIsOpen] = useState(false);
  const [tabs, setTabs] = useState(user?.tabs || []);

  const handleChange = (e) => {
    setName(e.target.value);
  };

  console.log("tttttt", tabs);

  const submitTabCreation = async () => {
    try {
      const { data } = await createTabMutation({
        variables: {
          name,
          address: "0x77A89C51f106D6cD547542a3A83FE73cB4459135",
        },
        refetchQueries: [
          {
            query: GET_USER_QUERY,
            variables: {
              address: "0x77A89C51f106D6cD547542a3A83FE73cB4459135",
            },
          },
        ],
      });
      console.log("DATA", data, data);
      setTabs((prev) => [...prev, data.createTab]);
      setIsOpen(false);
      setName("");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container>
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
      {tabs?.map((tab) => (
        <div
          key={tab.name}
          className="w-full bg-slate-500 p-5 rounded-xl shadow-md mb-2.5 justify-between items-center flex
           hover:bg-slate-400 transition-all duration-300 border border-[#000] cursor-pointer"
        >
          <Link href={`/tabs/${tab._id}`}>
            <p className="text-base font-medium">{tab.name}</p>
            <p className="text-base font-medium">{tab?.cards?.length} cards</p>
          </Link>
        </div>
      ))}

      <button
        className="w-full bg-slate-500 p-5 rounded-xl shadow-md justify-center mb-2.5 items-center flex
           hover:bg-slate-400 transition-all duration-300 border border-[#000] cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        Create Tab +
      </button>

      <Modal
        title="Create a tab"
        isOpen={isOpen}
        close={() => setIsOpen(false)}
      >
        <p className="text-white text-base mb-2.5">Name</p>
        <Input handleChange={handleChange} />
        <Button title="Submit" onClick={submitTabCreation} />
      </Modal>

      {/* <input
        className="bg-red-500 w-[150px] h-[50px] rounded-[10px] mt-5"
        onChange={handleChange}
        placeholder="Tab name"
      />
      <button
        className="bg-blue-500 w-[150px] h-[50px] rounded-[10px] mt-5"
        onClick={submitTabCreation}
      >
        Create Tab
      </button> */}
    </Container>
  );
};
