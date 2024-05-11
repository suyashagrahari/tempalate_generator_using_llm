import React from "react";
import imageUrl from "../images/templateGen.png";
import step1 from "../images/step1.png";
import step2 from "../images/step2.png";
import step3 from "../images/step3.png";
import step4 from "../images/step4.png";
import step5 from "../images/step5.png";
import Cards from "./Cards";

const HREmailTemplateGenerator = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-8 py-12">
      <h1 className="text-3xl font-bold text-center mb-10">
        How to use the HR Email Template Generator
      </h1>
      <div className="flex flex-col md:flex-row items-center justify-center md:space-x-16 mb-16">
        <div className="md:w-1/2 mb-10 md:mb-0 mx-auto px-4 md:ml-[10%] md:mr-0">
          <Step
            steps={step1}
            stepNumber="1"
            title="Select an Email Type"
            description="Choose the email type to kickstart your HR communication process. We have a huge number of email templates for delivering seamless communication across the entire employee lifecycle."
          />
          <Step
            steps={step2}
            stepNumber="2"
            title="Choose a Language (Optional)"
            description="Generate professional email content in English (US), English (UK), and Spanish within seconds."
          />
          <Step
            steps={step3}
            stepNumber="3"
            title="Hit the Generate button (Optional)"
            description="Once you have entered your desired parameters, click on the Generate button. Our HR Email Template Generator will create high-quality professional emails in seconds."
          />
          <Step
            steps={step4}
            stepNumber="4"
            title="Add Smart Inputs (Optional)"
            description="Customize your email with smart inputs that intelligently pick up all the text fields for you to create a personalized experience."
          />
          <Step
            steps={step5}
            stepNumber="5"
            title="Copy or Edit"
            description="Copy the email and send it to the desired recipients. If you want to edit it, simply click on the text and modify it as per your requirements."
          />
        </div>
        <div className="md:w-1/2 md:h-auto w-full flex justify-center">
          <img
            src={imageUrl}
            alt="Template Generator"
            className="w-[60%] md:max-w-full h-auto rounded-lg shadow-md"
          />
        </div>
      </div>
      <Cards />
    </div>
  );
};

const Step = ({ stepNumber, title, description, steps }) => {
  return (
    <div className="flex items-start mb-8">
      <div className="mr-4">
        <span className="text-white rounded-full w-16 h-8 flex items-center justify-center">
          <img src={steps} alt="" />
        </span>
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <p className="text-gray-700">{description}</p>
      </div>
    </div>
  );
};

export default HREmailTemplateGenerator;
