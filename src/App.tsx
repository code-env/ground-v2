import ComponentPreview from "@/components/animations/component-preview";
import AnimatedFeedback from "@/components/animations/feedback";
import AmieAction from "@/components/animations/amie-action";
import Fellaz from "@/components/animations/fellaz";
import MovieGallery from "@/components/animations/movie-gallery";
import Wants from "@/components/animations/wants";
import Wheel from "@/components/animations/wheel";
import Counter from "@/components/animations/counter";
import Bolt from "@/components/animations/bolt";
import Cashflow from "@/components/animations/cashflow-flow";
import Typer from "@/components/animations/typer";
import SearchUser from "@/components/animations/search-user";
import ImageCarousel from "@/components/animations/carousel";
import Slider from "@/components/animations/slider";
import DynamicIsland from "@/components/animations/dynamic-island";
import SignIn from "@/components/animations/sign-in";

import Hero from "@/components/shared/hero";
import Footer from "@/components/shared/footer";
import Feedback from "@/components/shared/feedback";

const App = () => {
  const images = ["/succession.jpeg", "/mirror.jpeg", "/dune.jpg"];
  return (
    <div className="min-h-screen flex flex-col items-center justify-center lg:px-0 px-10">
      <Hero />
      <Feedback />
      <ComponentPreview>
        <AnimatedFeedback />
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
      <Footer />
    </div>
  );
};

export default App;
