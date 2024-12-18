import ComponentPreview from "@/components/component-preview";
import Feedback from "@/components/feedback";
import AmieAction from "@/components/amie-action";
import Fellaz from "@/components/fellaz";
import MovieGallery from "@/components/movie-gallery";
import Wants from "@/components/wants";
import Wheel from "@/components/wheel";
import Counter from "@/components/counter";
import Bolt from "@/components/bolt";
import Cashflow from "@/components/cashflow-flow";
import Typer from "@/components/typer";
import SearchUser from "@/components/search-user";
import ImageCarousel from "@/components/carousel";
import Slider from "@/components/slider";
import Hero from "@/components/hero";
import DynamicIsland from "@/components/dynamic-island";
import SignIn from "./components/sign-in";

const App = () => {
  const images = ["/succession.jpeg", "/mirror.jpeg", "/dune.jpg"];
  return (
    <div className="min-h-screen flex flex-col items-center justify-center lg:px-0 px-10">
      <Hero />
      <ComponentPreview>
        <Feedback />
      </ComponentPreview>
      <ComponentPreview>
        <AmieAction />
      </ComponentPreview>
      <ComponentPreview>
        <Fellaz />
      </ComponentPreview>
      <ComponentPreview>
        <MovieGallery />
      </ComponentPreview>
      <ComponentPreview>
        <Wants />
      </ComponentPreview>
      <ComponentPreview>
        <Wheel />
      </ComponentPreview>
      <ComponentPreview>
        <Counter />
      </ComponentPreview>
      <ComponentPreview>
        <Bolt />
      </ComponentPreview>
      <ComponentPreview height={100}>
        <Cashflow />
      </ComponentPreview>
      <ComponentPreview>
        <Typer />
      </ComponentPreview>
      <ComponentPreview>
        <SearchUser />
      </ComponentPreview>
      <ComponentPreview>
        <ImageCarousel images={images} />
      </ComponentPreview>
      <ComponentPreview>
        <Slider />
      </ComponentPreview>
      <ComponentPreview height={200}>
        <DynamicIsland />
      </ComponentPreview>
      <ComponentPreview>
        <SignIn />
      </ComponentPreview>
    </div>
  );
};

export default App;
