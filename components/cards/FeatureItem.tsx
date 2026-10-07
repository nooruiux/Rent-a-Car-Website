import type { ComponentType } from "react";
import { DriverIcon, FreeTagIcon, HatchbackIcon, ShieldIcon, type IconProps } from "@/components/icons";
import type { Feature } from "@/data/site";

const icons: Record<Feature["id"], ComponentType<IconProps>> = {
  brands: HatchbackIcon,
  driver: DriverIcon,
  cancellation: FreeTagIcon,
  security: ShieldIcon,
};

export function FeatureItem({ feature }: { feature: Feature }) {
  const Icon = icons[feature.id];
  return (
    <div className="flex items-start gap-4">
      <span className="mt-2 flex size-12 shrink-0 items-center justify-center rounded-xs border border-primary bg-sky-50 text-primary">
        <Icon className="size-6" />
      </span>
      <div className="flex flex-col gap-2">
        <h3 className="text-h5 font-semibold text-ink">{feature.title}</h3>
        <p className="max-w-[223px] text-body-lg leading-normal font-medium text-body-72 min-[82rem]:w-[223px] min-[82rem]:max-w-none">{feature.description}</p>
      </div>
    </div>
  );
}
