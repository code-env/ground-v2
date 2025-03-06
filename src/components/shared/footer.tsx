import { siteConfig } from "@/lib/config";
import { Icons } from "./icons";

const Footer = () => {
  return (
    <footer className="w-full bg-background border-t">
      <div className=" mx-auto max-w-5xl w-full md:border-x flex items-center py-5 justify-between md:px-10">
        <p className="flex gap-1 items-center">
          <img
            src={siteConfig.link.imageURl}
            alt={siteConfig.author}
            className="size-10 rounded-full"
          />
          by{" "}
          <a
            href="https://x.com/bossadizenith"
            target="_blank"
            rel="noreferrer"
            className="font-bold text-sm"
          >
            Bossadi Zenith
          </a>
        </p>
        <a href="https://github.com/code-env/ground-v2" target="_blank">
          <Icons.github className="md:size-5 size-4 fill-primary" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
