import { HomeImg } from "../../assets/index";
import { RiHomeGearFill } from "../../assets/index";

const HomePrivateHeader: React.FC = (props) => {
  // get home header date
  const todayTimestamp = new Date().toLocaleString("en-US", {
    dateStyle: "full",
  });

  // define proper greeting according to the day time
  const hour = new Date().getHours();

  let greeting = "morning";
  if ((hour >= 12 && hour <= 23) || (hour >= 0 && hour <= 3)) {
    greeting = hour >= 12 && hour <= 16 ? "afternoon" : "evening";
  }

  return (
    <header
      className="h-[28rem] py-4 px-6 bg-no-repeat bg-center bg-cover"
      style={{
        backgroundImage: `url("${HomeImg}")`,
      }}
    >
      <nav className="flex gap-4 justify-evenly items-center text-neutral-100">
        <p className="text-xl">Good {greeting}!</p>
        <small className="ml-auto uppercase"> {todayTimestamp}</small>
        <button className="flex gap-1 items-center bg-neutral-100 rounded text-neutral-800 py-1 px-2">
          <RiHomeGearFill size="20" className="shrink-0" />
          <span className="text-sm hidden md:block">Customize</span>
        </button>
      </nav>
    </header>
  );
};

export default HomePrivateHeader;
