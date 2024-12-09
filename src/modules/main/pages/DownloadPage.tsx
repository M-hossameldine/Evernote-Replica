import { HeroSection } from "sections";

const DownloadPage: React.FC = () => {
  return (
    <div>
      <HeroSection
        title="Get Evernote"
        description="Evernote gives you everything you need to keep life organized—great note taking, project planning, and easy ways to find what you need, when you need it."
        className=" mt-10 "
        primeBtn={{
          text: "Download",
          route:
            "https://cdn1.evernote.com/boron/win/builds/Evernote-10.36.4-win-ddl-ga-3377-6d2f121c6a-setup.exe",
          isExteranl: true,
          className: "text-lg font-bold tracking-widest px-[4.5em] ",
        }}
      />
    </div>
  );
};

export default DownloadPage;
