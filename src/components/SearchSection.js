import React, { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ButtonIcon from "../images/buttonicon.png";
import Tabs from "./Tabs";
import { useSelector, useDispatch } from "react-redux";
import { updateTemplate } from "../redux/templateSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-regular-svg-icons';

// Create an instance of GoogleGenerativeAI
const genAI = new GoogleGenerativeAI("AIzaSyB-a_-nkxziWWhCdEkIK_Vfs42LueGOIak");

// Define email templates and languages
const emailTemplates = [
  { name: "Interview Invitation Email" },
  { name: "Rejection Email" },
  { name: "Interview Confirmation Email" },
  { name: "Offer Letter Email" },
  { name: "Referral Email" },
];

const languages = ["English(UK)", "Spanish"];

// Define a function to get response from Gemini
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

    // Extract required fields from the generated template
    const requiredFields = extractRequiredFields(text);

    return { text, requiredFields };
  } catch (error) {
    if (error.message === "LLM API timeout") {
      return {
        text: "Sorry, I'm unable to respond at the moment. Please try again later.",
        requiredFields: [],
      };
    } else {
      throw error;
    }
  }
}

// Helper function to extract required fields from the generated template
const extractRequiredFields = (template) => {
  const regex = /\[(.*?)\]/g; // Regular expression to match text within square brackets
  const matches = template.match(regex);
  if (matches) {
    // Extract field names from matches and remove square brackets
    return matches.map((match) => match.replace(/\[|\]/g, "").toLowerCase());
  } else {
    return [];
  }
};

const SearchSection = () => {
  // State variables
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [generatedTemplate, setGeneratedTemplate] = useState("");
  const [para, setPara] = useState("");
  const [smartInputs, setSmartInputs] = useState({});
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const [requiredFields, setRequiredFields] = useState([]); // Track required fields for generated template
  const [isCopied, setIsCopied] = useState(false);
  // Redux
  const dispatch = useDispatch();
  const storedTemplate = useSelector((state) => state.template.template); // Select template from Redux store

  // Extract smart input fields from stored template
  const extractFieldFromTemplate = extractRequiredFields(storedTemplate);

  // Define a regular expression pattern to match all words to be replaced
  const pattern = new RegExp(Object.keys(smartInputs).join("|"), "gi");

  // Reset smart inputs and generated template when selected template changes
  useEffect(() => {
    setSmartInputs({});
    setGeneratedTemplate("");
  }, [selectedTemplate]);

  // Update paragraph when smart inputs change
  useEffect(() => {
    const updatedParagraph = storedTemplate.replace(
      pattern,
      (match) => smartInputs[match.toLowerCase()]
    );
    setPara(updatedParagraph);
  }, [smartInputs]);

  // Handle template change
  const handleTemplateChange = (e) => {
    setSelectedTemplate(e.target.value);
  };

  // Handle language change
  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  // Handle smart input change
  const handleSmartInputChange = (e) => {
    setSmartInputs({ ...smartInputs, [e.target.name]: e.target.value });
  };

  // Generate template
  const handleGenerate = async () => {
    setIsLoading(true); // Set loading to true when generating
    try {
      const { text, requiredFields } = await generateTemplate(
        selectedTemplate,
        selectedLanguage,
        smartInputs // Pass the updated smart inputs
      );
      setGeneratedTemplate(text);
      setPara(text);
      setRequiredFields(requiredFields);

      // Console log the input fields
      console.log("Smart Inputs:", smartInputs);
      dispatch(updateTemplate(text)); // Update the template in Redux store
    } catch (error) {
      console.error("Error generating template:", error);
    } finally {
      setIsLoading(false); // Set loading to false after response received
    }
  };

  // Generate template
  const generateTemplate = async (templateName, language, smartInputs) => {
    let prompt = `Generate a ${templateName} in ${language}.`;
    for (const [key, value] of Object.entries(smartInputs)) {
      prompt += ` {{${key}}}`;
    }
    const { text, requiredFields } = await geminiResponse(prompt);
    return { text: replaceSmartFields(text, smartInputs), requiredFields };
  };

  // Replace smart fields in template
  const replaceSmartFields = (template, smartInputs) => {
    Object.entries(smartInputs).forEach(([key, value]) => {
      const regex = new RegExp(`\\[${key}\\]`, "g");
      template = template.replace(regex, value);
    });
    return template;
  };

  // Get smart input fields
  const getSmartInputFields = () => {
    const selectedTemplateData = emailTemplates.find(
      (template) => template.name === selectedTemplate
    );
    return selectedTemplateData ? selectedTemplateData.fields : [];
  };

  // Function to copy the template field content
  const handleCopyTemplate = () => {
    navigator.clipboard.writeText(para); // Copy the template field content
    setIsCopied(true); // Set copied state to true
    setTimeout(() => {
      setIsCopied(false); // Reset copied state after 2 seconds
    }, 2000);
  };

  return (
    <section className="text-gray-600 body-font ">
      <div className="container px-5 sm:py-24 py-10 mx-auto">
        <div className="flex flex-col text-center w-full mb-12 gap-7">
          <h1 className="sm:text-3xl text-2xl font-poppins font-semibold title-font  text-gray-900">
            Free HR Email Template Generator
          </h1>
          <p className="lg:w-1/3 font-medium mx-auto leading-relaxed text-base">
            Generate professional HR email templates for the entire employee
            lifecycle in seconds. No signup required.
          </p>
        </div>
        <div className="flex justify-center">
          <div className="flex flex-wrap justify-center shadow-xl border border-hero-col rounded-2xl gap-4 p-12  w-[95%]">
            <div className="p-2 lg:flex-1 ">
              <select
                id="template"
                name="template"
                className="sm:w-full w-[300px] h-[52px] bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 sm:text-base text-sm outline-none text-gray-700 py-2 px-4 leading-8 transition-colors duration-200 ease-in-out "
                value={selectedTemplate}
                onChange={handleTemplateChange}>
                <option value="">Select Email Template</option>
                {emailTemplates.map((template, index) => (
                  <option key={index} value={template.name}>
                    {template.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="p-2 lg:flex-3">
              <select
                id="language"
                name="language"
                className="sm:w-full w-[300px] h-[52px] bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 sm:text-base text-sm outline-none text-gray-700 py-2 px-4 leading-8 transition-colors duration-200 ease-in-out"
                value={selectedLanguage}
                onChange={handleLanguageChange}
                defaultValue="English(US)">
                <option value="">English(US)</option>
                {languages.map((language, index) => (
                  <option key={index} value={language}>
                    {language}
                  </option>
                ))}
              </select>
            </div>
            <div className="p-2 lg:flex-3 items-center">
              <button
                className="text-white bg-gradient-to-r from-gradient-start to-gradient-end border-0 sm:pt-3 py-2 pr-2 sm:px-8 sm:w-[165px] sm:h-[52px] w-[170px] sm:text-base sm:font-semibold font-medium focus:outline-none hover:bg-indigo-600 rounded sm:text-lg flex justify-center items-center"
                onClick={handleGenerate}>
                {isLoading ? (
                  "Generating..."
                ) : (
                  <>
                    <img
                      src={ButtonIcon}
                      alt="buttonicon"
                      className="sm:w-full w-5 mr-2"
                    />{" "}
                    Generate
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
        {requiredFields.length > 0 && (
          <div className="container px-[-2rem] pt-12 flex mb-[-2px] justify-center">
            {/* Template Area */}
            {para !== undefined ? (
              <div className="bg-white relative flex flex-wrap py-6 rounded-xl bg-transparent shadow-xl md:w-full max-w-[90%]">
                <div className="lg:w-1/2 w-full px-6 mb-4 lg:mb-0">
                  <div className="flex items-center justify-between">
                    <h2 className="title-font font-semibold text-gray-900  text-xl">
                      Generated Template
                    </h2>
                    {/* Copy icon positioned at the top of the template field */}
                    {
                        isCopied ? <span className="text-sm text-gray-500 ml-2">Copied!</span> : <FontAwesomeIcon
                        icon={faCopy}
                        className="text-gray-500 cursor-pointer"
                        onClick={handleCopyTemplate}
                      />
                     
                    }
                    
                   
                  </div>
                  <textarea
                    className="w-full mt-8 bg-gray-100 bg-opacity-70 rounded-xl border shadow-xl focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-3 px-4 leading-8 transition-colors duration-200 ease-in-out"
                    rows={20}
                    value={para}
                    readOnly
                  />
                </div>
                <div className="lg:w-1/2 w-full px-6 flex justify-center items-center">
                  <div className="md:w-8/12 w-11/12">
                    {" "}
                    {/* Adjust width as needed */}
                    <h2 className="title-font font-semibold text-gray-900  text-xl">
                      Smart Input Fields
                    </h2>
                    {requiredFields.map((field, index) => (
                      <div key={`${field}_${index}`} className="relative mb-4">
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
            ) : (
              {}
            )}
          </div>
        )}
        <Tabs />
      </div>
    </section>
  );
};

export default SearchSection;
