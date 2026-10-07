import type { ComponentType } from "react";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
  TwitterIcon,
  type IconProps,
} from "@/components/icons";
import { footer, site } from "@/data/site";

const socialIcons: Record<string, ComponentType<IconProps>> = {
  facebook: FacebookIcon,
  linkedin: LinkedinIcon,
  twitter: TwitterIcon,
  instagram: InstagramIcon,
};

const linkClass = "inline-flex min-h-[30px] items-center text-body-lg text-on-dark-72 transition-colors hover:text-white";

export function Footer() {
  return (
    <footer id="contact" className="mt-section bg-secondary text-white lg:mt-20">
      <div className="container-site">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 pt-12 pb-10 md:grid-cols-3 lg:grid-cols-5 lg:pb-[63px] min-[82rem]:grid-cols-[235px_274px_274px_274px_221px] min-[82rem]:gap-0">
          {footer.columns.map((column, i) => (
            <nav key={`${column.title}-${i}`} aria-label={i === 0 ? column.title : `${column.title} ${i}`} className="flex flex-col gap-6">
              <h2 className="text-body-lg leading-none font-semibold text-white">{column.title}</h2>
              <ul className="flex flex-col gap-4">
                {column.links.map((link) => (
                  <li key={link}>
                    <a href="#" className={linkClass}>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="col-span-2 flex flex-col gap-10 md:col-span-1">
            <div className="flex flex-col gap-6">
              <h2 className="text-body-lg leading-none font-semibold text-white">{footer.contactTitle}</h2>
              <address className="flex flex-col gap-4 not-italic">
                <p className="flex items-center gap-2 text-body-lg text-on-dark-72">
                  <PinIcon className="size-5 shrink-0" />
                  <span>
                    {site.address.street}
                    <br />
                    {site.address.locality}
                  </span>
                </p>
                <a href={`tel:${site.phone.replace(/\s/g, "")}`} className={`${linkClass} gap-2`}>
                  <PhoneIcon className="size-5 shrink-0" />
                  {site.phone}
                </a>
                <a href={`mailto:${site.email}`} className={`${linkClass} gap-2`}>
                  <MailIcon className="size-5 shrink-0" />
                  {site.email}
                </a>
              </address>
            </div>
            <ul className="flex items-center gap-5" aria-label="Social media">
              {footer.socials.map((social) => {
                const Icon = socialIcons[social.id];
                return (
                  <li key={social.id}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${site.name} on ${social.label}`}
                      className="-m-1.5 inline-flex size-11 items-center justify-center rounded-full text-white transition-colors hover:text-primary"
                    >
                      <Icon className="size-8" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 border-t border-on-dark-12 pt-4 pb-6 text-body-lg text-on-dark-80 sm:flex-row sm:justify-center sm:gap-8">
          <p>{footer.copyright}</p>
          <p>
            {footer.legal.map((item, i) => (
              <span key={item.label}>
                {i > 0 ? " | " : null}
                <a href={item.href} className="transition-colors hover:text-white">
                  {item.label}
                </a>
              </span>
            ))}
          </p>
        </div>
      </div>
    </footer>
  );
}
