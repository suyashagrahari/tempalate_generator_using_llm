import React, { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ButtonIcon from "../images/buttonicon.png";
import Tabs from "./Tabs";

const genAI = new GoogleGenerativeAI("AIzaSyB-a_-nkxziWWhCdEkIK_Vfs42LueGOIak");

const emailTemplates = [
  { name: "Interview Invitation Email", fields: ["Name", "Email", "Date"] },
  { name: "Rejection Email", fields: ["Name", "Reason"] },
  { name: "Interview Confirmation Email", fields: ["Name", "Date", "Time"] },
  { name: "Offer Letter Email", fields: ["Name", "Position", "Salary"] },
  { name: "Referral Email", fields: ["Name", "Referral Code"] },
];

const languages = ["English", "Spanish", "French", "German"];

export async function geminiResponse(message) {
  const timeout = new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error("LLM API timeout"));
    }, 10000); // 10 seconds
  });

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = message;
    const result = await Promise.race([model.generateContent(prompt), timeout]);
    const response = await result.response;
    const text = response.text();
    return text;
  } catch (error) {
    if (error.message === "LLM API timeout") {
      return "Sorry, I'm unable to respond at the moment. Please try again later.";
    } else {
      throw error;
    }
  }
}

const SearchSection = () => {
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [generatedTemplate, setGeneratedTemplate] = useState("");
  const [smartInputs, setSmartInputs] = useState({});
  const [isLoading, setIsLoading] = useState(false); // Track loading state

  useEffect(() => {
    setSmartInputs({});
    setGeneratedTemplate("");
  }, [selectedTemplate]);

  const handleTemplateChange = (e) => {
    setSelectedTemplate(e.target.value);
  };

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  const handleSmartInputChange = (e) => {
    setSmartInputs({ ...smartInputs, [e.target.name]: e.target.value });
  };

  const handleGenerate = async () => {
    setIsLoading(true); // Set loading to true when generating
    try {
      const template = await generateTemplate(
        selectedTemplate,
        selectedLanguage,
        smartInputs
      );
      setGeneratedTemplate(template);
    } catch (error) {
      console.error("Error generating template:", error);
    } finally {
      setIsLoading(false); // Set loading to false after response received
    }
  };

  const generateTemplate = async (templateName, language, smartInputs) => {
    let prompt = `Generate a ${templateName} in ${language}.`;
    for (const [key, value] of Object.entries(smartInputs)) {
      prompt += ` ${key}: ${value}`;
    }
    const template = await geminiResponse(prompt);
    return replaceSmartFields(template, smartInputs);
  };

  const replaceSmartFields = (template, smartInputs) => {
    Object.entries(smartInputs).forEach(([key, value]) => {
      const regex = new RegExp(`{{${key}}}`, "g");
      template = template.replace(regex, value);
    });
    return template;
  };

  const getSmartInputFields = () => {
    const selectedTemplateData = emailTemplates.find(
      (template) => template.name === selectedTemplate
    );
    return selectedTemplateData ? selectedTemplateData.fields : [];
  };

  return (
    <section className="text-gray-600 body-font mt-10">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-12 gap-7">
          <h1 className="sm:text-3xl text-2xl font-poppins font-semibold title-font mb-4 text-gray-900">
            Free HR Email Template Generator
          </h1>
          <p className="lg:w-1/3 font-medium mx-auto leading-relaxed text-base">
            Generate professional HR email templates for the entire employee
            lifecycle in seconds. No signup required.
          </p>
        </div>
        <div className="flex justify-center">
          <div className="flex flex-wrap justify-center shadow-xl rounded-2xl gap-4 p-6  w-[75%]">
            <div className="p-2 lg:flex-1 ">
              <select
                id="template"
                name="template"
                className="w-full h-[52px] bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-2 px-4 leading-8 transition-colors duration-200 ease-in-out "
                value={selectedTemplate}
                onChange={handleTemplateChange}>
                <option value="">Select Email Template</option>
                {emailTemplates.map((template) => (
                  <option key={template.name} value={template.name}>
                    {template.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="p-2  lg:flex-3">
              <select
                id="language"
                name="language"
                className="w-full h-[52px] bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-2 px-4 leading-8 transition-colors duration-200 ease-in-out"
                value={selectedLanguage}
                onChange={handleLanguageChange}>
                <option value="">Select Language (Optional)</option>
                {languages.map((language) => (
                  <option key={language} value={language}>
                    {language}
                  </option>
                ))}
              </select>
            </div>
            <div className="p-2 lg:flex-3">
              <button
                className="text-white bg-gradient-to-r  from-gradient-start font-bold to-gradient-end border-0 pt-3 px-8 w-[165px] h-[52px] focus:outline-none hover:bg-indigo-600 rounded text-lg flex justify-center"
                onClick={handleGenerate}>
                {isLoading ? (
                  "Generating..."
                ) : (
                  <>
                    <img src={ButtonIcon} alt="buttonicon" /> Generate
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
        {generatedTemplate && (
  <div className="container px-5 py-24 flex justify-center">
    {/* Template Area */}
    <div className="bg-white relative flex flex-wrap py-6 rounded-xl bg-transparent shadow-xl md:w-full max-w-[90%]">
      <div className="lg:w-1/2 w-full px-6 mb-4 lg:mb-0">
        <h2 className="title-font font-semibold text-gray-900 mt-4 text-xl">
          Generated Template
        </h2>
        <textarea
          className="w-full mt-2 bg-gray-100 bg-opacity-70 rounded-xl border shadow-xl focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-3 px-4 leading-8 transition-colors duration-200 ease-in-out"
          rows={15}
          value={generatedTemplate}
          readOnly
        />
      </div>
      <div className="lg:w-1/2 w-full px-6 flex justify-center items-center">
        <div className="md:w-8/12 w-11/12"> {/* Adjust width as needed */}
          <h2 className="title-font font-semibold text-gray-900  text-xl">
            Smart Input Fields
          </h2>
          {getSmartInputFields().map((field) => (
            <div key={field} className="relative mb-4">
              <label
                htmlFor={field.toLowerCase()}
                className="leading-7 text-sm text-gray-600">
                {field}:
              </label>
              <input
                type="text"
                id={field.toLowerCase()}
                name={field.toLowerCase()}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                value={smartInputs[field.toLowerCase()] || ""}
                onChange={handleSmartInputChange}
              />
            </div>
          ))}
          <button
            className="text-white bg-button-col border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg w-full mt-4"
            onClick={handleGenerate}>
            Apply Changes
          </button>
        </div>
      </div>
    </div>
  </div>
)}




        <Tabs />
      </div>
    </section>
  );
};

export default SearchSection;
