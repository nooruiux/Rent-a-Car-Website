"use client";

import { useState, type ComponentType, type FormEvent } from "react";
import { CalendarIcon, ClockIcon, SearchIcon, type IconProps } from "@/components/icons";
import { hero } from "@/data/site";
import { cn } from "@/lib/cn";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatDate(value: string) {
  const [y, m, d] = value.split("-").map(Number);
  if (!y || !m || !d) return "Select date";
  const date = new Date(Date.UTC(y, m - 1, d));
  return `${DAYS[date.getUTCDay()]} ${d} ${MONTHS[m - 1]}`;
}

type PickerFieldProps = {
  id: string;
  label: string;
  type: "date" | "time";
  value: string;
  onChange: (v: string) => void;
  icon: ComponentType<IconProps>;
  className?: string;
};

function PickerField({ id, label, type, value, onChange, icon: Icon, className }: PickerFieldProps) {
  return (
    <div
      className={cn(
        "relative flex h-20 items-center gap-4 rounded-xs bg-pure-white px-4 focus-within:ring-2 focus-within:ring-primary",
        className,
      )}
    >
      <Icon className="size-6 shrink-0 text-black-64" />
      <div className="flex flex-col gap-0.5 whitespace-nowrap">
        <label htmlFor={id} className="text-body-lg leading-[26px] text-black-64">
          {label}
        </label>
        <span aria-hidden="true" className="text-body-xl leading-normal font-semibold text-black-80">
          {type === "date" ? formatDate(value) : value}
        </span>
      </div>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        required
        onChange={(e) => onChange(e.target.value)}
        onClick={(e) => {
          try {
            e.currentTarget.showPicker?.();
          } catch {
            /* showPicker can throw when not user-activated; the native control still works. */
          }
        }}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
      />
    </div>
  );
}

export function SearchBar() {
  const s = hero.search;
  const [location, setLocation] = useState("");
  const [pickupDate, setPickupDate] = useState(s.pickupDate);
  const [pickupTime, setPickupTime] = useState(s.pickupTime);
  const [dropoffDate, setDropoffDate] = useState(s.dropoffDate);
  const [dropoffTime, setDropoffTime] = useState(s.dropoffTime);
  const [status, setStatus] = useState("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus(`Searching cars${location ? ` near ${location}` : ""} from ${formatDate(pickupDate)} ${pickupTime} to ${formatDate(dropoffDate)} ${dropoffTime}.`);
    document.getElementById("cars")?.scrollIntoView({ behavior: "smooth" });
  };

  const divider = "xl:border-r xl:border-line-soft";

  return (
    <form
      id="search"
      role="search"
      aria-label="Find a rental car"
      onSubmit={onSubmit}
      className="relative flex flex-col overflow-hidden rounded-sm bg-pure-white shadow-search xl:flex-row xl:items-stretch"
    >
      <div className="grid grid-cols-1 gap-px bg-line-soft p-2 sm:grid-cols-2 lg:grid-cols-4 xl:flex xl:flex-1 xl:gap-2 xl:bg-pure-white xl:px-0 xl:py-4">
        <div className={cn("relative flex h-20 items-center gap-4 bg-pure-white px-4 sm:col-span-2 lg:col-span-4 xl:flex-1 xl:pr-14 focus-within:ring-2 focus-within:ring-primary rounded-xs", divider)}>
          <SearchIcon className="size-6 shrink-0 text-black-64" />
          <label htmlFor="pickup-location" className="sr-only">
            Pick up location
          </label>
          <input
            id="pickup-location"
            name="location"
            type="text"
            autoComplete="address-level2"
            placeholder={s.locationPlaceholder}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="h-full w-full min-w-0 bg-transparent text-body-lg text-ink placeholder:text-black-56 focus:outline-none"
          />
        </div>
        <PickerField id="pickup-date" label={s.pickupDateLabel} type="date" value={pickupDate} onChange={setPickupDate} icon={CalendarIcon} className={divider} />
        <PickerField id="pickup-time" label={s.timeLabel} type="time" value={pickupTime} onChange={setPickupTime} icon={ClockIcon} className={divider} />
        <PickerField id="dropoff-date" label={s.dropoffDateLabel} type="date" value={dropoffDate} onChange={setDropoffDate} icon={CalendarIcon} className={divider} />
        <PickerField id="dropoff-time" label={s.timeLabel} type="time" value={dropoffTime} onChange={setDropoffTime} icon={ClockIcon} className="xl:pr-6" />
      </div>
      <button
        type="submit"
        className="flex h-16 items-center justify-center bg-primary px-7 text-h6 font-semibold text-white transition-colors hover:bg-primary-hover focus-visible:outline-offset-[-4px] xl:h-auto xl:min-h-28 xl:w-[125px] xl:shrink-0 xl:rounded-r-sm"
      >
        {s.submit}
      </button>
      <p aria-live="polite" className="sr-only">
        {status}
      </p>
    </form>
  );
}
