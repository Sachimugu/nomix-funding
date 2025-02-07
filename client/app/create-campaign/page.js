"use client";
import { UploadCloud } from "lucide-react";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { createCampaign } from "@/lib/crowdFunding";
import DatePicker from "@/components/DatePicker";


export default function CampaignForm() {
  const [campaignName, setCampaignName] = useState("");
  const [campaignDescription, setCampaignDescription] = useState("");
  const [campaignTarget, setCampaignTarget] = useState("");
  const [campaignImage, setCampaignImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [duration, setDuration] = useState(null)
  const [durationError, setDurationError] = React.useState("");
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    target: "",
    image: "",
  });
  const [theme, setTheme] = useState("light"); // Use this to toggle light/dark theme

  // Set up Pinata API details
  const PINATA_API_KEY =""
  // process.env.NEXT_PUBLIC_apiKey ; // replace with your Pinata API Key
  const PINATA_API_SECRET = ""
   process.env.NEXT_PUBLIC_apiSecret; // replace with your Pinata API Secret

  // Drag-and-Drop Image handling using `react-dropzone`
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*", // Allow only images
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        setCampaignImage(acceptedFiles[0]);
        setImagePreview(URL.createObjectURL(acceptedFiles[0])); // Preview the selected image
      }
    },
    maxFiles: 1, // Only allow one image
  });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    let formErrors = { name: "", description: "", target: "", image: "" };
    let isValid = true;

    if (!campaignName) {
      formErrors.name = "Campaign Name is required";
      isValid = false;
    }

    if (!campaignDescription) {
      formErrors.description = "Campaign Description is required";
      isValid = false;
    }

    if (!campaignTarget) {
      formErrors.target = "Campaign Target is required";
      isValid = false;
    }

    if (!campaignImage) {
      formErrors.image = "Campaign Image is required";
      isValid = false;
    }

    if (!duration){
      setDurationError("Campaign Duration is required")
      isValid = false;
    }

    setErrors(formErrors);

    if (isValid) {
      try {
        const ipfsHash = await uploadImageToIPFS(campaignImage); // Upload the image to IPFS
        console.log("Image uploaded to IPFS with hash:", ipfsHash);

        // After uploading, reset the form
        setCampaignName("");
        setCampaignDescription("");
        setCampaignTarget("");
        setCampaignImage(null);
        setImagePreview(null);

        // Log the form data with IPFS hash (you can use it to store in your backend or database)
        console.log({
          campaignName,
          campaignDescription,
          campaignTarget,
          duration,
          imageHash: ipfsHash,
        });


        await handleCreateCampaign(campaignName, campaignDescription, campaignTarget, duration, ipfsHash,)
      } catch (err) {
        console.error("Error uploading to IPFS:", err);
        setErrors((prevErrors) => ({
          ...prevErrors,
          image: "Error uploading image to IPFS.",
        }));
      }
    }
  };

  // Function to upload the image to Pinata
  const uploadImageToIPFS = async (image) => {
    console.log(PINATA_API_KEY, PINATA_API_SECRET);
    const formData = new FormData();
    formData.append("file", image);

    const response = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        pinata_api_key: PINATA_API_KEY,
        pinata_secret_api_key: PINATA_API_SECRET,
      },
    });

    if (response.data && response.data.IpfsHash) {
      return response.data.IpfsHash; // This is the IPFS hash of the uploaded image
    } else {
      throw new Error("Failed to upload image to IPFS");
    }
  };


    // Create new campaign
    const handleCreateCampaign = async (name, description, goal, duration, image) => {
      try {
        await createCampaign(name, description, parseInt(goal), parseInt(duration), image);
      } catch (error) {
        console.error("Error creating campaign:", error);
      }
    };

  return (
    <div
      className={`max-w-4xl mx-auto mt-12 px-6 py-8 rounded-lg shadow-lg ${
        " dark:text-white dark:border-[1px]  dark:bg-brown-950  dark:bg-card"
      }`}
    >
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-gray-200">
        Create New Campaign
      </h2>

      <form onSubmit={handleSubmit} className={`space-y-6 text-gray-800 dark:text-gray-200`}>
        {/* Campaign Name and Target (Side by Side on md and above) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Campaign Name */}
          <div>
            <label htmlFor="campaignName" className="block text-lg font-medium">
              Campaign Name
            </label>
            <input
              type="text"
              id="campaignName"
              value={campaignName}
              onChange={(e) => setCampaignName(e.target.value)}
              className="mt-2 w-full p-3 border-[0.1px] border-gray-600 rounded-md focus:outline-none focus:ring-gray-500 focus:ring-[0.6px]"
              placeholder="Enter campaign name"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          {/* Campaign Target */}
          <div>
            <label htmlFor="campaignTarget" className="block text-lg font-medium">
              Campaign Target
            </label>
            <input
              type="text"
              id="campaignTarget"
              value={campaignTarget}
              onChange={(e) => setCampaignTarget(e.target.value)}
              className="mt-2 w-full p-3 border-[0.1px] border-gray-600 rounded-md focus:outline-none focus:ring-gray-500 focus:ring-[0.6px]"
              placeholder="Target your campaign"
            />
            {errors.target && <p className="text-red-500 text-sm">{errors.target}</p>}
          </div>
        </div>

        {/* Campaign Description */}
        <div>
          <label htmlFor="campaignDescription" className="block text-lg font-medium">
            Campaign Description
          </label>
          <textarea
            id="campaignDescription"
            value={campaignDescription}
            onChange={(e) => setCampaignDescription(e.target.value)}
            className="mt-2 w-full p-3 border-[0.1px]  border-gray-600 rounded-md focus:outline-none focus:ring-gray-500 focus:ring-[0.6px]"
            placeholder="Describe your campaign"
            rows={4}
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
        </div>
        <DatePicker setDuration={setDuration} durationError ={durationError} setDurationError ={setDurationError}/>

        {/* Drag-and-Drop Image Upload */}
        <div
          className="mt-6 p-6 border-dashed border-2 border-gray-600 rounded-md cursor-pointer relative"
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <div className="text-center">
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="mx-auto mb-3 rounded-md w-32 h-32 object-cover" />
            ) : (
              <div>
                <UploadCloud size={40} className="mx-auto text-orange-600 mb-3" />
                <p className="text-lg">Drag & Drop or Click to Select an Image</p>
              </div>
            )}
          </div>
          {/* Tooltip */}
          <div className="absolute top-0 right-0 p-2 text-sm text-white bg-gray-700 rounded-tl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Image stored in decentralized server
          </div>
        </div>
        {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-3 rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            Create Campaign
          </button>
        </div>
      </form>
    </div>
  );
}
