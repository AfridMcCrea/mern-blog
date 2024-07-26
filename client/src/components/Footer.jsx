import React from "react";
import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import {BsFacebook, BsGithub, BsInstagram, BsTwitter, BsYoutube} from 'react-icons/bs'

export default function FooterCom() {
  return (
    <Footer container className="border border-t-8 border-[#4285F4]">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="mt-5">
            <Link className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white">
              <span className="px-2 py-1 bg-gradient-to-r from-indigo-300 via-purple to-pink-500 rounded-lg text-white">
                McCrea's
              </span>
              blog
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8  mt-4 sm:grid-cols-3 sm:gap-6">
            <div className="">
              <Footer.Title title="About" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://www.100jsprojects.com"
                  target="_black"
                  rel="noopener noreferrer"
                >
                  100 Js Projects
                </Footer.Link>
                <Footer.Link
                  href="/about"
                  target="_black"
                  rel="noopener noreferrer"
                >
                  McCrea's Blog
                </Footer.Link>
              </Footer.LinkGroup>
              
            </div>
            <div className="">
              <Footer.Title title="Follow Us" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://github.com/AfridMcCrea"
                  target="_black"
                  rel="noopener noreferrer"
                >
                  Github
                </Footer.Link>
                <Footer.Link
                  href="#"
                  target="_black"
                  rel="noopener noreferrer"
                >
                  Discord
                </Footer.Link>
              </Footer.LinkGroup>
              
            </div>
            <div className="">
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="#"
                  target="_black"
                  rel="noopener noreferrer"
                >
                  Privacy Policy
                </Footer.Link>
                <Footer.Link
                  href="#"
                  target="_black"
                  rel="noopener noreferrer"
                >
                  Terms & Condition
                </Footer.Link>
              </Footer.LinkGroup>
              
            </div>
          </div>
        </div>
        <Footer.Divider/>
        <div className="w-full sm:flex sm:items-center sm:justify-between sm:">
            <Footer.Copyright
                href="#"
                by="McCrea's Blog"
                year={new Date().getFullYear()}
            />
            <div className="mt-4 sm:mt-0 sm:justify-center flex gap-6">
            <Footer.Icon href="#" icon={BsGithub}/>
                <Footer.Icon href="#" icon={BsFacebook}/>
                <Footer.Icon href="#" icon={BsTwitter}/>
                <Footer.Icon href="#" icon={BsInstagram}/>
                <Footer.Icon href="#" icon={BsYoutube}/>
            </div>
        </div>
      </div>
    </Footer>
  );
}
