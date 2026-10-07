"use client";

import { useState } from "react";
import { CurrencyIcon, FlagUaeIcon, FlagUsIcon } from "@/components/icons";
import { Dropdown } from "@/components/ui/Dropdown";
import { topBar } from "@/data/site";

const toOptions = (values: string[]) => values.map((v) => ({ label: v, value: v }));

export function TopBar() {
  const [location, setLocation] = useState(topBar.location);
  const [language, setLanguage] = useState(topBar.language);
  const [currency, setCurrency] = useState(topBar.currency);

  const trigger = "gap-2 text-body-lg leading-none font-medium text-white";

  return (
    <div className="hidden bg-secondary text-white md:block">
      <div className="container-site flex h-16 items-center justify-between">
        <Dropdown label="Select country" options={toOptions(topBar.locations)} value={location} onChange={setLocation} triggerClassName={trigger}>
          <FlagUaeIcon className="size-5" />
          <span>{location}</span>
        </Dropdown>

        <div className="flex items-center gap-8">
          <Dropdown label="Select language" options={toOptions(topBar.languages)} value={language} onChange={setLanguage} triggerClassName={trigger} align="end">
            <FlagUsIcon className="h-4 w-[26px]" />
            <span>{language}</span>
          </Dropdown>
          <Dropdown label="Select currency" options={toOptions(topBar.currencies)} value={currency} onChange={setCurrency} triggerClassName={trigger} align="end">
            <CurrencyIcon className="h-4 w-[26px] text-white" />
            <span>{currency}</span>
          </Dropdown>
          <a href="#" lang="ar" dir="rtl" className="inline-flex min-h-11 items-center text-body-lg leading-none font-medium hover:underline">
            {topBar.arabic}
          </a>
        </div>
      </div>
    </div>
  );
}
