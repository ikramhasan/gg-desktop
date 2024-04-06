import React, { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./collapsible";
import DownArrow from "@/assets/down";
import UpArrow from "@/assets/up";

const GiveawayCard = (giveaway: Giveaway) => {
  const truncatedDescription =
    giveaway.description.length > 170
      ? `${giveaway.description.slice(0, 170)}...`
      : giveaway.description;

  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const [isInstructionsOpen, setIsInstructionsOpen] = useState(false);

  const handleDescriptionClick = () => {
    setIsDescriptionOpen(!isDescriptionOpen);
  };

  const handleInstructionsClick = () => {
    setIsInstructionsOpen(!isInstructionsOpen);
  };

  return (
    <div
      key={giveaway.id}
      className="flex flex-col gap-2 border p-4 border-gray-500 rounded-lg bg-gradient-to-b from-white dark:from-black lg:static lg:w-96 lg:border-none lg:bg-none"
    >
      <img
        className="w-full h-48 object-cover rounded-lg"
        src={giveaway.image}
        alt={giveaway.title}
      />
      <h2 className="text-lg font-bold">{giveaway.title}</h2>
      <p className="text-sm text-gray-500">{giveaway.platforms}</p>
      {/* <p className="text-sm">{giveaway.description}</p> */}
      <Collapsible>
        <CollapsibleTrigger
          className="text-sm font-bold"
          onClick={handleDescriptionClick}
        >
          <div className="flex items-center justify-between gap-4">
            <span>Description</span>
            {isDescriptionOpen ? <UpArrow /> : <DownArrow />}
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <p className="text-sm pt-2">{giveaway.description}</p>
        </CollapsibleContent>
      </Collapsible>
      {isDescriptionOpen ? null : (
        <p className="text-sm">{truncatedDescription}</p>
      )}
      <Collapsible>
        <CollapsibleTrigger
          className="text-sm font-bold"
          onClick={handleInstructionsClick}
        >
          <div className="flex items-center justify-between gap-4">
            <span>Instructions</span>
            {isInstructionsOpen ? <UpArrow /> : <DownArrow />}
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <p className="text-sm pt-2">{giveaway.instructions}</p>
        </CollapsibleContent>
      </Collapsible>

      <div className="flex items-center justify-between">
        <p className="font-medium text-green-500">Save: {giveaway.worth}</p>
        <a
          className="text-sm text-blue-500 underline"
          href={giveaway.open_giveaway_url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Redeem
        </a>
      </div>
    </div>
  );
};

export default GiveawayCard;
