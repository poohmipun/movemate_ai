"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button, Modal } from "flowbite-react";
import { Label, Textarea, Select, Alert, Table } from "flowbite-react";

const page = () => {
  const [openModal, setOpenModal] = useState(false);
  const [modalSize, setModalSize] = useState("7xl");
  return (
    <section className="w-full h-full flex-row mb-5">
      <div className="w-full h-full flex flex-col">
        <p className="head_text text-left mb-12">Choose your Programs</p>
        <div className="cards max-w-full max-h-96 mb-12 grid grid-cols-1 md:grid-cols-4 xl:grid-cols-5 gap-8 flex-wrap overflow-auto ">
          <button
            onClick={() => setOpenModal(true)}
            className="card max-w-64 h-96  border rounded-lg shadow bg-gray-200 border-gray-600 flex flex-col items-center "
            type="button"
          >
            Toggle modal
          </button>
          <Modal
            show={openModal}
            size={modalSize}
            onClose={() => setOpenModal(false)}
          >
            <Modal.Header>Create Workout Program</Modal.Header>
            <Modal.Body>
              <div className="modal-container flex flex-col space-x-2 sm:flex-row">
                <div className="left-side w-1/2 flex flex-col">
                  <div className="max-w-xl">
                    <div className="mb-2 block">
                      <Label htmlFor="countries" value="Select your country" />
                    </div>
                    <Image
                      src="/images/slogan_bg.png"
                      sizes="100vw"
                      objectFit="contain"
                      width={1500}
                      height={1500}
                      priority
                      alt="preview"
                    />
                  </div>
                </div>
                <div className="right-side w-1/2 grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-1 max-w-md">
                    <div className="mb-2 block">
                      <Label htmlFor="countries" value="Select your country" />
                    </div>
                    <Select id="countries" required>
                      <option>United States</option>
                      <option>Canada</option>
                      <option>France</option>
                      <option>Germany</option>
                    </Select>
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <div className="w-full grid md:grid-cols-2 grid-cols-1">
                <Alert
                  color="success"
                  onDismiss={() => alert("Alert dismissed!")}
                >
                  <span className="font-medium">Info alert!</span> Change a few
                  things up and try submitting again.
                </Alert>

                <Button
                  className="justify-self-end"
                  onClick={() => setOpenModal(false)}
                >
                  I accept
                </Button>
              </div>
            </Modal.Footer>
          </Modal>
          <div className="card max-w-64 h-96  border rounded-lg shadow bg-gray-200 border-gray-600 flex flex-col items-center ">
            <img
              className="rounded-t-lg"
              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />

            <div className="p-5 flex flex-col max-h-fit">
              <a href="#">
                <h5 className="mb-2 text-md font-bold tracking-tight text-gray-900 dark:text-white">
                  Noteworthy technology acquisitions 2021
                </h5>
              </a>
              <p className=" mb-2 font-normal text-gray-700 max-h-20 text-sm text-ellipsis overflow-hidden">
                Here are the biggest enterprise technology acquisitions of 2021
                so far, in reverse chronological
              </p>
              <a
                href="#"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Add to list
              </a>
            </div>
          </div>
          <div className="card max-w-64 h-96  border rounded-lg shadow bg-gray-200 border-gray-600 flex flex-col items-center ">
            <img
              className="rounded-t-lg"
              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />

            <div className="p-5 flex flex-col max-h-fit">
              <a href="#">
                <h5 className="mb-2 text-md font-bold tracking-tight text-gray-900 dark:text-white">
                  Noteworthy technology acquisitions 2021
                </h5>
              </a>
              <p className=" mb-2 font-normal text-gray-700 max-h-20 text-sm text-ellipsis overflow-hidden">
                Here are the biggest enterprise technology acquisitions of 2021
                so far, in reverse chronological
              </p>
              <a
                href="#"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Add to list
              </a>
            </div>
          </div>
          <div className="card max-w-64 h-96  border rounded-lg shadow bg-gray-200 border-gray-600 flex flex-col items-center ">
            <img
              className="rounded-t-lg"
              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />

            <div className="p-5 flex flex-col max-h-fit">
              <a href="#">
                <h5 className="mb-2 text-md font-bold tracking-tight text-gray-900 dark:text-white">
                  Noteworthy technology acquisitions 2021
                </h5>
              </a>
              <p className=" mb-2 font-normal text-gray-700 max-h-20 text-sm text-ellipsis overflow-hidden">
                Here are the biggest enterprise technology acquisitions of 2021
                so far, in reverse chronological
              </p>
              <a
                href="#"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Add to list
              </a>
            </div>
          </div>
          <div className="card max-w-64 h-96  border rounded-lg shadow bg-gray-200 border-gray-600 flex flex-col items-center ">
            <img
              className="rounded-t-lg"
              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />

            <div className="p-5 flex flex-col max-h-fit">
              <a href="#">
                <h5 className="mb-2 text-md font-bold tracking-tight text-gray-900 dark:text-white">
                  Noteworthy technology acquisitions 2021
                </h5>
              </a>
              <p className=" mb-2 font-normal text-gray-700 max-h-20 text-sm text-ellipsis overflow-hidden">
                Here are the biggest enterprise technology acquisitions of 2021
                so far, in reverse chronological
              </p>
              <a
                href="#"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Add to list
              </a>
            </div>
          </div>
          <div className="card max-w-64 h-96  border rounded-lg shadow bg-gray-200 border-gray-600 flex flex-col items-center ">
            <img
              className="rounded-t-lg"
              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />

            <div className="p-5 flex flex-col max-h-fit">
              <a href="#">
                <h5 className="mb-2 text-md font-bold tracking-tight text-gray-900 dark:text-white">
                  Noteworthy technology acquisitions 2021
                </h5>
              </a>
              <p className=" mb-2 font-normal text-gray-700 max-h-20 text-sm text-ellipsis overflow-hidden">
                Here are the biggest enterprise technology acquisitions of 2021
                so far, in reverse chronological
              </p>
              <a
                href="#"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Add to list
              </a>
            </div>
          </div>
          {/*  Create Program */}
        </div>

        {/* summarize */}
        <div className="overflow-x-auto">
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
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
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
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
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
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
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
          <Link href="/" className="orange_btn ">
            Start
          </Link>
        </div>
      </div>
    </section>
  );
};

export default page;
