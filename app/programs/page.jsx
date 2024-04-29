"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Label, Table, Button, Toast } from "flowbite-react";
import { HiCheck, HiExclamation, HiX } from "react-icons/hi";
import { CldImage } from "next-cloudinary";
import ModalForm from "../components/ModalForm";

const Programs = () => {
  const [programs, setPrograms] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const res = await fetch("/api/Programs");
        if (res.ok) {
          const data = await res.json();
          setPrograms(data.data);
          console.log(data.data);
        } else {
          console.error("Failed to fetch programs:", res.status);
        }
      } catch (error) {
        console.error("Error fetching programs:", error);
      }
    };

    fetchPrograms();
  }, []);

  return (
    <section className="w-full h-full flex-row mb-5 sm:px-16 px-6">
      <div className="w-full h-full flex flex-col">
        <p className="head_text text-left mb-12">Choose your Programs</p>
        <div className="cards max-w-full max-h-screen mb-6 grid grid-cols-1 md:grid-cols-4 xl:grid-cols-5 gap-8 flex-wrap overflow-auto ">
          <button
            onClick={() => setOpenModal(true)}
            className="card max-w-64 min-h-96  border rounded-lg shadow bg-gray-900 border-blue-300  flex flex-col items-center "
            type="button"
          >
            <div className="flex flex-col items-center justify-center h-full w-full space-y-6">
              <svg
                className="w-20 h-20 text-white "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M9 7V2.221a2 2 0 0 0-.5.365L4.586 6.5a2 2 0 0 0-.365.5H9Zm2 0V2h7a2 2 0 0 1 2 2v6.41A7.5 7.5 0 1 0 10.5 22H6a2 2 0 0 1-2-2V9h5a2 2 0 0 0 2-2Z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M9 16a6 6 0 1 1 12 0 6 6 0 0 1-12 0Zm6-3a1 1 0 0 1 1 1v1h1a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0v-1h-1a1 1 0 1 1 0-2h1v-1a1 1 0 0 1 1-1Z"
                  clipRule="evenodd"
                />
              </svg>
              <h1 className="text-white font-bold">
                {" "}
                Create your <br></br>Own Program
              </h1>
            </div>
          </button>
          {openModal && (
            <ModalForm openModal={openModal} onCloseModal={handleCloseModal} />
          )}
          {programs &&
            programs.map((program) => (
              <div
                key={program._id}
                className="card max-w-64 min-h-96 border rounded-lg shadow bg-gray-900 border-blue-300 flex flex-col  "
              >
                <CldImage
                  className="rounded-t-lg h-36 "
                  width="3000"
                  height="3000"
                  src={program.img_url}
                  alt={program.title}
                />
                <div className="p-5 flex flex-col max-h-fit">
                  <h5 className="mb-2 text-md font-bold tracking-tight text-blue-500 uppercase ">
                    {program.title}
                  </h5>
                  <p className="mb-4 font-normal min-h-28 text-gray-200 max-h-28 text-sm text-ellipsis overflow-y-auto">
                    {program.description}
                  </p>
                  <a className="inline-flex items-center px-3 py-2 text-sm font-medium text-end text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 w-fit self-end">
                    Add to list
                  </a>
                </div>
              </div>
            ))}
        </div>
        {/* summarize */}
        <div className="overflow-x-auto mb-6">
          <Table>
            <Table.Head>
              <Table.HeadCell>Product name</Table.HeadCell>
              <Table.HeadCell>Color</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Price</Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">Edit</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-white dark:text-white">
                  {'Apple MacBook Pro 17"'}
                </Table.Cell>
                <Table.Cell>Sliver</Table.Cell>
                <Table.Cell>Laptop</Table.Cell>
                <Table.Cell>$2999</Table.Cell>
                <Table.Cell>
                  <a
                    href="#"
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    Edit
                  </a>
                </Table.Cell>
              </Table.Row>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-white dark:text-white">
                  Microsoft Surface Pro
                </Table.Cell>
                <Table.Cell>White</Table.Cell>
                <Table.Cell>Laptop PC</Table.Cell>
                <Table.Cell>$1999</Table.Cell>
                <Table.Cell>
                  <a
                    href="#"
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    Edit
                  </a>
                </Table.Cell>
              </Table.Row>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-white dark:text-white">
                  Magic Mouse 2
                </Table.Cell>
                <Table.Cell>Black</Table.Cell>
                <Table.Cell>Accessories</Table.Cell>
                <Table.Cell>$99</Table.Cell>
                <Table.Cell>
                  <a
                    href="#"
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    Edit
                  </a>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
        <div className="footer w-full flex flex-row-reverse">
          <Button
            className="orange_btn min-w-fit focus:outline-none focus:ring focus:ring-blue-800 border-none"
            as={Link}
            href="/programs/exercises"
          >
            Start
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Programs;
