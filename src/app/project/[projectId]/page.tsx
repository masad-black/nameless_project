"use client";
import React from "react";
import {
  SidebarProvider,
  Sidebar,
  SidebarFooter,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Textarea } from "@/components/ui/textarea";
import { Plus, ArrowUp, ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";

import Chats from "./Chats";
import Canvas from "./Canvas";

const Footer = () => {
  const [prompt, setPrompt] = React.useState<string>("");
  const [image, setImage] = React.useState<string>("");

  // console.log(prompt);
  function handleSubmit() {
    console.log("generate ai response!!!");
  }

  // todo: add the toast to tell the user
  function handleFileUpload(e) {
    // if the uploaded file is not an image, return
    if (!e.target.files[0].type.startsWith("image")) return;

    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();

      reader.onload = (event) => {
        setImage(event.target.result);
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  }

  return (
    <SidebarFooter className="border border-gray-300 rounded-md max-h-[30vh] p-0 bg-gray-100 w-full">
      {/* user selected image */}
      {image && (
        <div className="flex items-center justify-start border-b p-1">
          <div className="w-12 h-12">
            <Image
              src={image}
              className="w-full h-full object-cover rounded-md"
              width={0}
              height={0}
              alt="image"
            />
          </div>
        </div>
      )}
      <Textarea
        placeholder="Type your message here..."
        className="border-none outline-0 resize-none bg-transparent shadow-none p-1 m-0 focus-visible:outline-none focus-visible:ring-0 text-gray-800"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      {/* action buttons */}
      <div className="flex items-center justify-between border-t border-gray-300 p-1">
        <button
          onChange={handleFileUpload}
          className="hover:cursor-pointer flex items-center justify-center border border-gray-300 rounded-full p-1 hover:bg-gray-200"
        >
          <label
            htmlFor="input_photo"
            className="flex items-center hover:cursor-pointer"
          >
            <Plus size={18} />
            <input
              type="file"
              id="input_photo"
              className="w-0 h-0 invisible"
              accept="image/*"
            />
          </label>
        </button>
        <button
          className="flex items-center justify-center border border-gray-300 rounded-full p-1 hover:bg-gray-200 hover:cursor-pointer"
          onClick={handleSubmit}
        >
          <ArrowUp size={18} className="hover:cursor-pointer" />
        </button>
      </div>
    </SidebarFooter>
  );
};

const Header = () => {
  const pages = ["/", "About", "Contact", "Services", "Blog", "Portfolio"];
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedPage, setSelectedPage] = React.useState(() => pages.at(0));

  function handelPageSelection(page: string) {
    setSelectedPage(page.toLowerCase());
    setIsOpen(false);
  }

  return (
    <div className="relative flex items-center justify-between w-full p-1">
      <div>
        <h1 className="text-sm text-gray-500">utitled name</h1>
      </div>
      <div className="">
        <div className="relative w-40 bg-white border border-gray-200 rounded-sm shadow-sm ">
          {/* Dropdown Header - Clickable */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="hover:cursor-pointer w-full flex items-center justify-between text-left p-1 hover:bg-gray-100 transition-colors duration-200 rounded-t-md"
          >
            <span className="text-sm text-gray-600 ml-2 font-medium hover:text-gray-900 transition-colors duration-200">
              {selectedPage === "/" ? selectedPage : "/" + selectedPage}
            </span>
            {isOpen ? (
              <ChevronUp
                size={16}
                className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
              />
            ) : (
              <ChevronDown
                size={16}
                className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
              />
            )}
          </button>

          {/* Dropdown Content - Shows/Hides */}
          {isOpen && (
            <div className="absolute w-full border-t border-grey-300 ">
              {pages.map((page, index) => (
                <div
                  key={index}
                  className="px-3 py-1.5 cursor-pointer bg-gray-100 hover:bg-gray-50 active:bg-gray-100 border-b
                   border-gray-100 last:border-b-0 transition-all duration-150 hover:text-black  font-normal hover:font-medium"
                  onClick={() => handelPageSelection(page)}
                >
                  <span className="text-sm text-gray-500">
                    {page.toLowerCase()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const page = () => {
  return (
    <div className="w-screen h-screen overflow-hidden rounded-md">
      <SidebarProvider className="relative">
        {/* main sidebar  */}
        <Sidebar className="p-1 border-[#F9FAFB]">
          <Header />
          <main className="w-full h-full overflow-auto">
            <Chats />
          </main>
          <Footer />
        </Sidebar>
        {/* canvas for showing the preview of the code */}
        <div className="w-full h-screen p-0.5 bg-[#F9FAFB]">
          <Canvas />
        </div>
      </SidebarProvider>
    </div>
  );
};

export default page;
