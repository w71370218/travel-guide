import "./App.css";
import { useEffect, useState } from "react";
/* component */
import List from "./components/List";
import Navbar from "./components/Navbar";
/* SVG */
import LocationSVG from "./assets/svg/Geo alt.svg";
/* img url */
import taiwanCountyJson from "./assets/json/taiwan_county.json";

function App() {
  const area = taiwanCountyJson;
  const [carouselIndex, setCarouselIndex] = useState(0);
  useEffect(() => {
    let img = area[carouselIndex].cover;
    if (!area[carouselIndex].cover || !area[carouselIndex].coverName) {
      let randIndex = parseInt(Math.random() * (22 - 0) + 0);
      while (!area[randIndex].cover || !area[randIndex].coverName) {
        randIndex = parseInt(Math.random() * (22 - 0) + 0);
      }
      setCarouselIndex(randIndex);
      img = area[randIndex].cover;
    } else {
      img = area[carouselIndex].cover;
    }
    document.documentElement.style.setProperty(
      "--cover-background",
      `url(${require(`./assets/img/${img}`)})`
    );
  }, [carouselIndex]);
  return (
    <div className="App">
      <Navbar />
      <div className="background-cover"></div>
      <div className="cover"></div>
      <main>
        <div className="container mx-auto py-6">
          <div className="carousel-text">
            <span className="svg">
              <svg
                width={16}
                height={16}
                viewBox={`0 0 ${16} ${16}`}
                xmlns="http://www.w3.org/2000/svg"
              >
                <use href={`${LocationSVG}#svg`} width={16} height={16} />
              </svg>
            </span>
            <p>
              {area[carouselIndex].name} · {area[carouselIndex].coverName}
            </p>
          </div>
          <div className="page">
            <List
              carouselIndex={carouselIndex}
              setCarouselIndex={setCarouselIndex}
            />
          </div>
        </div>
      </main>
      <footer>
        <div className="footer-ref">
          <p>封面背景: 楊子右 攝</p>
          <p>
            靈感提供:{" "}
            <a href="https://2021.thef2e.com/news/">
              The F2E 前端 & UI 修煉精神時光屋
            </a>
          </p>
        </div>
        <p>版權所有 © 楊子右</p>
      </footer>
    </div>
  );
}

export default App;
