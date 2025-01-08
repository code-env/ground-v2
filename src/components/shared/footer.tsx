import { siteConfig } from "@/lib/config";

const Footer = () => {
  return (
    <footer className="mt-40 w-full">
      <div className=" mx-auto max-w-5xl w-full border-t flex items-center py-8">
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
            className="font-bold"
          >
            Bossadi Zenith
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
