import { Button } from "flowbite-react";
import React from "react";

export default function CallToAction() {
  return (
    <>
         
      <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
        <div className="">
          <p className="text-right text-xs text-gray-500 italic">sponsored Ad</p>
        <div className="flex-1 justify-center flex flex-col">
          <h2 className="text-2xl">Want to print your custom design ?</h2>
          <p className="text-gray-500 my-2">
            Check out Rui-Raiment a custom T-shirt distribution company with
            segment best materials.
          </p>
          <Button
            gradientDuoTone="purpleToPink"
            className="rounded-tl-xl rounded-bl-none"
          >
            <a
              href="https://www.linkedin.com/company/103330222/admin/dashboard/"
              target="_blank"
              rel="noopenner noreferrer"
            >
              Rui Raiment
            </a>
          </Button>
        </div>
        <div className="p-7 flex-1">
          <img
            src="https://cdn.shopify.com/s/files/1/0070/7032/files/how_20to_20start_20a_20clothing_20brand.png?v=1693935729"
            alt=""
          />
        </div>

        </div>
      </div>
    </>
  );
}
