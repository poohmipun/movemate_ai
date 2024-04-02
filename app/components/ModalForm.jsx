"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FileInput,
  Label,
  Textarea,
  Select,
  Alert,
  Table,
  TextInput,
  Button,
  Modal,
  Toast,
} from "flowbite-react";
import { CldUploadButton, CldImage } from "next-cloudinary";

const ModalForm = ({ openModal, onCloseModal }) => {
  const [modalSize, setModalSize] = useState("7xl");
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleUploadSuccess = (result) => {
    setImageUrl(result.info.public_id);
  };

  const [formData, setFormData] = useState({
    img_url: "",
    title: "",
    description: "",
    joint_rotation_1: "",
    joint_rotation_2: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedFormData = { ...formData, img_url: imageUrl };

      const res = await fetch("/api/Programs", {
        method: "POST",
        body: JSON.stringify(updatedFormData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to create Program.");
      }

      onCloseModal();
      window.location.reload();
    } catch (error) {
      console.error("Error creating program:", error.message);
    }
  };

  return (
    <div className="flex w-full h-full">
      <Modal show={openModal} size={modalSize} onClose={onCloseModal}>
        <form
          className="bg-gradient-to-tr from-black to-indigo-900 rounded-md text-white"
          method="post"
          onSubmit={handleSubmit}
        >
          <Modal.Header>
            <div className="text-white font-bold text-3xl">
              Create Workout Program
            </div>
          </Modal.Header>
          <Modal.Body>
            <div className="modal-container flex flex-col xl:space-x-8 xl:flex-row max-h-screen overflow-y-auto ">
              <div className="left-side flex-col items-center flex-2 justify-center max-h-screen overflow-y-auto ">
                <h3 className="text-xl font-medium mb-2 text-white ">
                  Joint Rotation images
                </h3>
                <div className="xl:max-w-xl border-dashed border-2 border-cyan-500 rounded-md">
                  <Image
                    src="/images/t_pose.png"
                    width={1500}
                    height={1500}
                    priority
                    alt="preview"
                  />
                </div>
              </div>
              <div className="right-side min-w-1/2 flex-1 grid gap-4 mb-4 ">
                <div className="col-span-1 w-full overflow-y-auto max-h-96 pr-2">
                  <h3 className="text-xl font-medium text-white mb-2">
                    Program Form
                  </h3>
                  <div className="flex flex-col w-full items-center justify-center mb-4 space-y-4">
                    <h3 className="text-xl font-medium text-white">
                      Image Preview
                    </h3>
                    <div
                      role="status"
                      className="flex items-center w-full justify-center h-56 bg-gray-300 rounded-lg overflow-hidden"
                    >
                      {imageUrl ? (
                        <CldImage
                          src={imageUrl}
                          width="1200"
                          height="1200"
                          alt="Uploaded"
                        />
                      ) : (
                        <svg
                          className="w-36 h-36 text-gray-600"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 18"
                        >
                          <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                        </svg>
                      )}
                    </div>
                    <CldUploadButton
                      uploadPreset="nh1i8otq"
                      onSuccess={handleUploadSuccess}
                      className="orange_btn w-full h-12"
                      onUploadAdded={(result) => {
                        console.log(result);
                        setImageUrl(result.info.public_id);
                        console.log(
                          "Uploaded image URL:",
                          result.info.secure_url
                        );
                      }}
                    />
                  </div>
                  <div className="space-y-4 mb-4">
                    <TextInput
                      id="title"
                      name="title"
                      placeholder="title"
                      type="text"
                      onChange={handleChange}
                      required={true}
                      value={formData.title}
                      sizing="md"
                    />
                    <Textarea
                      id="Description"
                      name="description"
                      placeholder="Description"
                      type="text"
                      onChange={handleChange}
                      required={true}
                      value={formData.description}
                      rows={4}
                    />
                  </div>
                  <div className="mb-2 block space-y-2">
                    <Label
                      value="Select your First Joint"
                      className="text-white"
                    />
                    <Select
                      id="first_joint"
                      name="joint_rotation_1"
                      onChange={handleChange}
                      value={formData.joint_rotation_1}
                      required={true}
                    >
                      <option value="">Select an option</option>
                      <option value="shoulder">Shoulder</option>
                      <option value="knee">Knee</option>
                    </Select>
                  </div>
                  <div className="mb-2 block space-y-2">
                    <Label
                      value="Select your Second Joint"
                      className="text-white"
                    />
                    <Select
                      id="first_joint"
                      name="joint_rotation_2"
                      onChange={handleChange}
                      value={formData.joint_rotation_2}
                      required={true}
                    >
                      <option value="">Select an option</option>
                      <option value="shoulder">Shoulder</option>
                      <option value="knee">Knee</option>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="w-full flex flex-row-reverse">
              <Button className="orange_btn" type="submit">
                Create Program
              </Button>
            </div>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
};

export default ModalForm;
