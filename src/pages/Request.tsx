import React, { useContext, useEffect, useState } from "react";
import { serverUrl } from "../server";
import { AppContext } from "../context/Context";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const Request = () => {
  const context = useContext(AppContext);
  const nav = useNavigate();
  // States
  const [name, setName] = useState<string>("");
  const [countryCode, setCountryCode] = useState<string>("");
  const [topElevation, setTopElevation] = useState<number>(-1);
  const [minElevation, setMinElevation] = useState<number>(-1);
  const [description, setDescription] = useState<string>("");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [iconImage, setIconImage] = useState<File | null>(null);
  const [files, setFiles] = useState<FileList | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [succeeded, setSucceeded] = useState<boolean>(false);

  useEffect(() => {
    if (!context?.user) {
      alert("Please login to access this page.");
      nav("/signin");
    }
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    const requestBody = new FormData();
    const createdUser = context?.user._id;
    requestBody.append("createdBy", createdUser!);

    if (coverImage) requestBody.append("coverImage", coverImage!);

    if (iconImage) requestBody.append("iconImage", iconImage!);

    if (files)
      Array.from(files).forEach((file) => {
        requestBody.append("file", file);
      });

    const resort = {
      name,
      countryCode,
      topElevation,
      minElevation,
      description,
      createdBy: createdUser,
    };
    requestBody.append("resort", JSON.stringify(resort));
    try {
      const res = await fetch(`${serverUrl}/api/request`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: requestBody,
      });
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        setSucceeded(true);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const ThankYouPage = () => {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-3xl font-poppins font-semibold">
          Thank you for your request!
        </h1>
      </div>
    );
  };

  if (succeeded) return <ThankYouPage />;

  return (
    <>
      <div
        style={{
          backgroundImage: `url("${serverUrl}/api/images/resortsCovers/whistlercover.avif")`,
        }}
        className="scroll-up md:h-[30vh] h-[20vh] w-full bg-cover bg-no-repeat bg-bottom"
      />
      <div
        style={{
          background: "linear-gradient(to top, white 97%, transparent 100%)",
        }}
        className="p-7 pt-5 md:pt-1 -mt-12 min-h-[100vh]"
      >
        <div className="pb-4 min-h-[100vh]">
          <h2 className="md:text-3xl text-2xl font-semibold font-poppins text-teal-950">
            Suggest a new Ski Resort
          </h2>
          {/* Form */}
          <div className="my-10 md:px-72">
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="font-semibold">Name:</label>
                <br />
                <input
                  type="text"
                  className="border-2 border-gray-300 rounded-lg w-full px-2 py-1"
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
                  placeholder="Base Elevation"
                  onChange={(e) => setMinElevation(parseInt(e.target.value))}
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="font-semibold">Description:</label>
              <br />
              <textarea
                className="border-2 border-gray-300 rounded-lg w-full px-2 py-1 h-28"
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
                    ) : (
                      <div className="flex items-center justify-center h-[100%]">
                        No Image Selected
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
                    ) : (
                      <div className="flex items-center justify-center h-[100%]">
                        No Image Selected
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
            <div className="mt-6">
              <Button
                type="primary"
                className="w-full"
                onClick={handleSubmit}
                loading={loading}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Request;
