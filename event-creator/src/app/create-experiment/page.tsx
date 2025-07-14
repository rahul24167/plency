"use client";
import { useState } from "react";
//import { uploadToS3 } from "@/event-creator/src/lib/s3Uploader";
import { uploadToGCS } from "../../lib/uploadToGCS";
import Image from "next/image";
import { createExperiment } from "@/event-creator/src/app/actions/createExperiment";

export default function CreateExperiment() {
  const [experimentInfo, setExperimentInfo] = useState({
    brand: "",
    brandDescription: "",
    question: "why this design",
    answer: "",
  });
  const [images, setImages] = useState<string[]>([]);
  const [isConfirm, setIsConfirm] = useState(false);

  return (
    <div className="h-screen w-full overflow-auto flex flex-row md:flex-col flex-wrap p-5 gap-2">
      <form className="md:relative md:w-[45vh] md:h-[90vh] flex flex-col justify-end items-start">
        <button
          type="button"
          onClick={() => setIsConfirm(true)}
          className={`px-4 py-2 rounded text-white transition 
          ${
            !images.length ||
            !experimentInfo.brand ||
            !experimentInfo.brandDescription ||
            !experimentInfo.answer ||
            !experimentInfo.question
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={
            !images.length ||
            !experimentInfo.brand ||
            !experimentInfo.brandDescription ||
            !experimentInfo.answer ||
            !experimentInfo.question
          }
        >
          Create Experiment
        </button>
        <div className="flex flex-col py-5">
          <label htmlFor="images">Images</label>
          <input
            id="images"
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                // uploadToS3(file).then((url) =>
                //   setImages((prev) => [...prev, url])
                // );
                uploadToGCS(file).then((url) =>
                  setImages((prev) => [...prev, url])
                );
              }
            }}
          />
        </div>
        <label htmlFor="brand">Brand</label>
        <input
          id="brand"
          type="text"
          value={experimentInfo.brand}
          onChange={(e) => {
            setExperimentInfo({ ...experimentInfo, brand: e.target.value });
          }}
          className="font-bold uppercase border"
        />
        <label htmlFor="brandDescription">Brand Description</label>
        <textarea
          id="brandDescription"
          value={experimentInfo.brandDescription}
          onChange={(e) => {
            setExperimentInfo({
              ...experimentInfo,
              brandDescription: e.target.value,
            });
          }}
          className="font-bold uppercase border"
        />
        <span className="font-bold uppercase">{experimentInfo.question}</span>
        <label htmlFor="answer">Answer</label>
        <textarea
          id="answer"
          value={experimentInfo.answer}
          onChange={(e) => {
            setExperimentInfo({ ...experimentInfo, answer: e.target.value });
          }}
          className="font-bold uppercase border"
        />
        {isConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg p-6 min-w-[300px] flex flex-col gap-4">
              <h2 className="text-lg font-bold mb-2">
                Confirm Experiment Creation
              </h2>
              <p>Are you sure you want to create this experiment?</p>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  onClick={() => setIsConfirm(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={(e) => {
                    e.preventDefault();
                    createExperiment(experimentInfo, images)
                      .then((response) => {
                        if (!response.success) {
                          console.error(
                            "Error creating experiment:",
                            "error" in response
                              ? response.error
                              : "Unknown error"
                          );
                        } else {
                          console.log(
                            "Experiment created successfully:",
                            response.experiment
                          );

                          // Reset form
                          setExperimentInfo({
                            brand: "",
                            brandDescription: "",
                            question: "why this design",
                            answer: "",
                          });
                          setImages([]);
                        }
                      })
                      .catch((error) => {
                        console.error(
                          "Unexpected error creating experiment:",
                          error
                        );
                      });

                    setIsConfirm(false);
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </form>
      <div className="w-full md:w-1/2 h-[90vh] overflow-auto">
        {images.map((url, index) => (
          <div className="w-full my-2" key={index}>
            <Image
              src={url}
              alt={`Uploaded image ${index}`}
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-auto"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
