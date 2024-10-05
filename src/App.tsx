import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [images, setImages] = useState([]);
  const [imageIndex, setImageIndex] = useState(0);

  const currentImage = getCurrentImage();
  let loading = currentImage ? false : true;

  const fetchImage = async () => {
    const response = await axios.get("https://api.openverse.org/v1/images/");
    setImages(response.data.results);
  };

  useEffect(() => {
    fetchImage();
  }, []);

  useEffect(() => {
    setImageIndex(0);
  }, [images]);

  const buttonClickHandler = (direction: string) => {
    if (loading) return;

    loading = true;
    if (direction === "left") {
      if (imageIndex === 0) {
        setImageIndex(images.length - 1);
      } else {
        setImageIndex((prev) => prev - 1);
      }
    } else {
      if (imageIndex === images.length - 1) {
        setImageIndex(0);
      } else {
        setImageIndex((prev) => prev + 1);
      }
    }
  };

  function getCurrentImage(): null | string {
    if (!images.length) {
      return null;
    }

    return images[imageIndex].thumbnail;
  }
  return (
    <div className="container">
      <div className="left">
        <button onClick={() => buttonClickHandler("left")}>←</button>
      </div>
      <div className="middle">
        {currentImage ? (
          <img src={currentImage} alt="" height={300} width={300} />
        ) : loading ? (
          <p>Loading....</p>
        ) : null}
      </div>
      <div className="right">
        <button onClick={() => buttonClickHandler("right")}>→</button>
      </div>
    </div>
  );
}

export default App;
