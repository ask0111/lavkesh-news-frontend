declare module "react-slick" {
    interface Settings {
      dots?: boolean;
      infinite?: boolean;
      speed?: number;
      slidesToShow?: number;
      slidesToScroll?: number;
      arrows?: boolean;
      autoplay?: boolean;
      // Add more props as needed
      [key: string]: any; // For extra settings
    }
  
    const Slider: React.FC<Settings>;
    export default Slider;
  }
  