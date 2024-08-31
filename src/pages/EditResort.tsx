import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/Context";
import { Button } from "antd";
import Flag from "react-world-flags";
import { IoIosArrowRoundForward } from "react-icons/io";
import { PlusOutlined } from "@ant-design/icons";
import { serverUrl } from "../server";
import { Resort } from "../models/models";
import { FaSkiing } from "react-icons/fa";

interface EditProps {
  resort?: Resort;
  handleEdit?: (formData: FormData) => void;
}

const EditResort: React.FC<EditProps> = (props) => {
  const nav = useNavigate();
  const context = useContext(AppContext);
  const { id } = useParams();
  const [name, setName] = useState<string>("");
  const [countryCode, setCountryCode] = useState<string>("");
  const [files, setFiles] = useState<FileList | null>(null);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [iconImage, setIconImage] = useState<File | null>(null);
  const [topElevation, setTopElevation] = useState<number | null>(null);
  const [baseElevation, setBaseElevation] = useState<number | null>(null);
  const [description, setDescription] = useState<string>("");
  const resort =
    props.resort || context?.resorts.find((resort) => resort._id === id);

  useEffect(() => {
    if (resort) {
      setName(resort.name);
      setCountryCode(resort.countryCode);
      setTopElevation(resort.topElevation);
      setBaseElevation(resort.minElevation);
    }
  }, [resort]);

  const handleSubmit = () => {
    context?.setLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("countryCode", countryCode);
    formData.append("description", description);
    formData.append("topElevation", topElevation?.toString() || "");
    formData.append("minElevation", baseElevation?.toString() || "");
    if (coverImage) formData.append("coverImage", coverImage);
    if (iconImage) formData.append("iconImage", iconImage);
    if (files) {
      Array.from(files).forEach((file) => {
        formData.append("file", file);
      });
    }
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
    props.handleEdit ? props.handleEdit(formData) : handleCreate(formData);
  };

  const handleCreate = async (formData: FormData) => {
    try {
      const response = await fetch(`${serverUrl}/api/resorts/${id}`, {
        method: "PATCH",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      console.log(data);
      // Promise to simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 2000));
      context?.setLoading(false);
    } catch (error) {
      context?.setLoading(false);
      console.error(error);
    }
  };

  return (
    <div className="my-10">
      <div className="flex">
        <h1 className="text-3xl font-semibold">Editing:</h1>
        <div className="flex items-center ms-2">
          <h1 className="text-3xl font-extralight me-2">{resort?.name}</h1>
          <div className="h-8 w-14 flex">
            <Flag code={resort?.countryCode!} />
          </div>
        </div>
        <div className="ms-auto flex">
          <Button
            className="h-[100%] bg-teal-400 border-teal-800"
            onClick={() => nav(-1)}
          >
            Back to Resorts
            <IoIosArrowRoundForward size={20} />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <label className="font-semibold">Name:</label>
          <br />
          <input
            type="text"
            className="border-2 border-gray-300 rounded-lg w-full px-2 py-1"
            defaultValue={resort?.name}
            placeholder="Resort Name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="font-semibold">Country:</label>
          <br />
          <input
            type="text"
            className="border-2 border-gray-300 rounded-lg w-full px-2 py-1"
            defaultValue={resort?.countryCode}
            placeholder="Country Code"
            onChange={(e) => setCountryCode(e.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="mt-4">
          <label className="font-semibold">Top Elevation:</label>
          <br />
          <input
            type="number"
            className="border-2 border-gray-300 rounded-lg w-full px-2 py-1"
            defaultValue={resort?.topElevation}
            placeholder="Top Elevation"
            onChange={(e) => setTopElevation(parseInt(e.target.value))}
          />
        </div>
        <div className="mt-4">
          <label className="font-semibold">Base Elevation:</label>
          <br />
          <input
            type="number"
            className="border-2 border-gray-300 rounded-lg w-full px-2 py-1"
            defaultValue={resort?.minElevation}
            placeholder="Base Elevation"
            onChange={(e) => setBaseElevation(parseInt(e.target.value))}
          />
        </div>
      </div>
      <div className="mt-4">
        <label className="font-semibold">Description:</label>
        <br />
        <textarea
          className="border-2 border-gray-300 rounded-lg w-full px-2 py-1 h-28"
          defaultValue={resort?.description}
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-2 gap-x-10">
        <div className="mt-4 h-48">
          <label className="font-semibold">Cover Image:</label>
          <br />
          <div className="flex items-center">
            <label
              htmlFor="coverInput"
              className="cursor-pointer bg-black bg-opacity-30 hover:bg-opacity-40 p-1 rounded border-dashed border border-black h-40 w-[100%]"
            >
              {coverImage ? (
                <img
                  src={URL.createObjectURL(coverImage)}
                  alt="cover"
                  className=" rounded-lg h-[100%] w-[100%] object-contain"
                />
              ) : resort?.coverImage ? (
                <img
                  src={`${serverUrl}/api/images/resortscovers/${resort?.coverImage}`}
                  alt="cover"
                  className=" rounded-lg h-[100%] w-[100%] object-contain"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center">
                  <div className="text-center">
                    <PlusOutlined className="text-xl" />
                    <p className="text-sm">Add Cover</p>
                  </div>
                </div>
              )}
            </label>
            <input
              type="file"
              className="hidden"
              id="coverInput"
              onChange={(e) => setCoverImage(e.target.files![0])}
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="font-semibold">Icon Image:</label>
          <br />
          <div className="flex items-center">
            <label
              htmlFor="iconInput"
              className="cursor-pointer bg-black bg-opacity-30 hover:bg-opacity-40 p-1 rounded border-dashed border border-black h-40 w-[100%]"
            >
              {iconImage ? (
                <img
                  src={URL.createObjectURL(iconImage)}
                  alt="icon"
                  className=" rounded-lg h-[100%] w-[100%] object-contain"
                />
              ) : resort?.iconImage ? (
                <img
                  src={`${serverUrl}/api/images/resortsIcons/${resort?.iconImage}`}
                  alt="icon"
                  className=" rounded-lg h-[100%] w-[100%] object-contain"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center">
                  <div className="text-center">
                    <PlusOutlined className="text-xl" />
                    <p className="text-sm">Add Icon</p>
                  </div>
                </div>
              )}
            </label>
            <input
              type="file"
              className="hidden"
              id="iconInput"
              onChange={(e) => setIconImage(e.target.files![0])}
            />
          </div>
        </div>
      </div>
      <div className="mt-4">
        <label className="font-semibold">Gallery Images:</label>
        <br />
        <div className="flex items-center">
          {files?.length && files.length > 0 ? (
            <div className="grid grid-cols-5 gap-2">
              {Array.from(files).map((file) => (
                <div
                  key={file.name}
                  className="bg-teal-600 rounded-lg flex items-center justify-center p-2"
                >
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className="h-24 object-cover rounded-lg"
                  />
                </div>
              ))}
              <label
                htmlFor="fileInput"
                className="cursor-pointer bg-black bg-opacity-30 border border-black border-dashed p-3 rounded flex flex-col items-center justify-center hover:bg-opacity-40 h-28 w-38"
              >
                <PlusOutlined className="text-xl" />
                <label className="text-md">Add Files</label>
              </label>
              <input
                type="file"
                className="hidden"
                aria-label="gallery images"
                multiple
                id="fileInput"
                onChange={(e) => setFiles(e.target.files)}
              />
              {/* // Add a button to remove files */}
              <button
                onClick={() => setFiles(null)}
                className="bg-red-500 text-white p-2 rounded-lg h-28 w-38"
              >
                Clear
              </button>
            </div>
          ) : (
            <div className="grid gird-cols-3">
              <label
                htmlFor="fileInput"
                className="cursor-pointer bg-black bg-opacity-30 border border-black border-dashed p-3 rounded flex flex-col items-center justify-center hover:bg-opacity-40 h-28 w-36"
              >
                <PlusOutlined className="text-xl" />
                <label className="text-md">Add Files</label>
              </label>
              <input
                type="file"
                className="hidden"
                aria-label="gallery images"
                multiple
                id="fileInput"
                accept="image/*"
                onChange={(e) => setFiles(e.target.files)}
              />
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <Button type="default" className="w-16 me-2" onClick={() => nav(-1)}>
          Cancel
        </Button>
        <Button
          loading={context?.loading}
          type="primary"
          className="w-16"
          onClick={handleSubmit}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default EditResort;
