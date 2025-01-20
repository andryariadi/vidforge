"use client";

import { creditsOption } from "@/app/constant";
import { PiCoinsFill } from "react-icons/pi";
import { motion } from "framer-motion";
import { useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";

type selectedOptionProps = {
  credits: number;
  amount: number;
};

const CreditsCard = () => {
  const [selectedOption, setselectedOption] = useState<selectedOptionProps | null>(creditsOption[2] || null);

  const [open, setOpen] = useState<boolean>(false);

  const handleSelectedOption = (credit: selectedOptionProps) => {
    setselectedOption(credit);
    setOpen(true);
  };

  console.log({ selectedOption }, "<----creditsCard");

  return (
    <div className="space-y-5">
      {/* Cards */}
      <div className="b-sky-600 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-3">
        {creditsOption.map((credit) => (
          <figure
            key={credit.credits}
            className={`w-auto flex flex-col items-center gap-y-7 bg-black-1 rounded-lg border border-gray-600/50 shadow-lg p-5 hover:border-orange-1 transition-all duration-300 ${
              credit.credits === selectedOption?.credits && "border-orange-1"
            }`}
          >
            <div className="flex items-center gap-3">
              <PiCoinsFill size={26} className="text-yellow-500" />
              <h2 className="text-16 md:text-32 font-bold text-orange-1">{credit.credits}</h2>
            </div>

            <motion.button
              type="button"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.95 }}
              className="bg-btn w-full text-14 md:button_bold-16 px-2 md:px-5 py-[10px] rounded-md flex items-center justify-center"
              onClick={() => handleSelectedOption(credit)}
            >
              Select
            </motion.button>

            <figcaption>
              <span className="text-orange-2">$ {credit.amount}</span>
            </figcaption>
          </figure>
        ))}
      </div>

      {/* Paypal Button */}
      {open && (
        <PayPalButtons
          style={{ layout: "horizontal" }}
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: selectedOption?.amount.toFixed(2),
                    currency_code: "USD",
                  },
                },
              ],
            });
          }}
        />
      )}
    </div>
  );
};

export default CreditsCard;
