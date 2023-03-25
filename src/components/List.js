import "./List.css";
import { useEffect, useState } from "react";
import taiwanCountyJson from "../assets/json/taiwan_county.json";
/* component */
import Pagination from "./Pagination";
import Card from "./Card";
/* SVG */
import LocationSVG from "../assets/svg/Geo alt.svg";
import FunnelSVG from "../assets/svg/Funnel fill.svg";
/* test */
import scenicSpotJson from "../assets/json/scenicSpot_k.json";

const List = (props) => {
  const numPerPage = 12; //每頁數量
  const [loading, setLoading] = useState(1); //Loading狀態
  const [pageIndex, setPageIndex] = useState(0); //目前頁數
  const [page, setPage] = useState([1]); //所有頁數 , 2, 3, 4, 5, 6, 7, 8, 9, 10, 11
  const [data, setData] = useState([{}, {}, {}, {}]); //API取得的資料  /* test */(scenicSpotJson);
  const data_url = "https://tdx.transportdata.tw/api/basic/v2/Tourism"; //API request url
  const [selectArea, setSelectArea] = useState(""); //目前選擇縣市
  const area = taiwanCountyJson; //台灣縣市名稱

  const categories = [
    { name: "景點", value: "ScenicSpot" },
    { name: "餐飲", value: "Restaurant" },
    { name: "旅宿", value: "Hotel" },
    { name: "活動", value: "Activity" },
  ]; //類型
  const [selectCategories, setSelectCategories] = useState(0); //目前選擇類型

  const [filter, setFilter] = useState("");

  useEffect(() => {
    setPageIndex(0);
    let page = [];
    for (let i = 1; i <= parseInt(dataMap(data).length / numPerPage) + 1; i++)
      page.push(i);
    setPage(page);
  }, [filter]);

  function typeSwitch(p) {
    switch (selectCategories) {
      case 0:
        return "ScenicSpotName";
        break;
      case 1:
        return "RestaurantName";
        break;
      case 2:
        return "HotelName";
        break;
      case 3:
        return "ActivityName";
        break;
    }
  }

  function dataMap(data) {
    if (Object.keys(data[0]).length !== 0) {
      return data.filter(
        (keys) =>
          keys[typeSwitch()].includes(filter) ||
          (keys["Description"] && keys["Description"].includes(filter))
      );
    } else {
      return data;
    }
  }

  // fetch 所有API資料
  async function fetchData() {
    setLoading(1);
    console.log("fetching...");
    const res = await fetch(
      selectArea === ""
        ? `${data_url}/${categories[selectCategories].value}`
        : `${data_url}/${categories[selectCategories].value}/${selectArea}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    );

    if (res.ok) {
      const response = await res.json();
      console.log(response);
      setData(response);
      let page = [];
      for (let i = 1; i <= parseInt(response.length / numPerPage) + 1; i++)
        page.push(i);
      setPage(page);
      setLoading(0);
    }
  }

  useEffect(() => {
    fetchData();
    console.log(data);
    document.title = `${
      selectArea === ""
        ? "所有"
        : area[area.findIndex((p) => p.value === selectArea)].name
    }${categories[selectCategories].name} | 台灣旅遊景點導覽`;
    let randIndex = parseInt(Math.random() * (22 - 0) + 0);
    while (!area[randIndex].cover || !area[randIndex].coverName) {
      randIndex = parseInt(Math.random() * (22 - 0) + 0);
    }
    props.setCarouselIndex(
      area.findIndex((p) => p.value === selectArea) === -1
        ? randIndex
        : area.findIndex((p) => p.value === selectArea)
    );
  }, [selectArea, selectCategories]);

  return (
    <>
      <div className="informations p-6">
        <div className="top-page">
          <div>
            <h1 className="top-page-title">
              {selectArea === ""
                ? "所有"
                : area[area.findIndex((p) => p.value === selectArea)].name}
              {categories[selectCategories].name}
            </h1>
            <h3 className="text-xl">
              共有{" "}
              {data && Object.keys(data[0]).length !== 0
                ? dataMap(data).length
                : 0}{" "}
              筆資料
            </h3>
          </div>
          {/* 篩選 條件 */}
          <div className="filter">
            <div className="select-area">
              <span className="svg">
                <svg
                  width={16}
                  height={16}
                  viewBox={`0 0 ${16} ${16}`}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <use href={`${FunnelSVG}#svg`} width={16} height={16} />
                </svg>
              </span>
              <label id="filter-label" className="filter-label">
                篩選
              </label>
              <input
                type="search"
                className="serach-input"
                onChange={(e) => {
                  setFilter(e.target.value);
                }}
                value={filter}
              />
            </div>
            <div className="select-area">
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
              <label id="listbox-label" className="listbox-label">
                地區
              </label>
              <select
                onChange={(e) => {
                  setSelectArea(e.target.value);
                  setPageIndex(0);
                  setData([{}, {}, {}, {}]);
                }}
              >
                <option value={""} defaultValue>
                  全部
                </option>
                {area.map((keys, index) => (
                  <option key={index} value={keys.value}>
                    {keys.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="categories">
          {categories.map((keys, index) => (
            <div
              className={`category ${selectCategories === index && "index"}`}
              key={index}
              onClick={() => {
                setPageIndex(0);
                setSelectCategories(index);
                setData([{}, {}, {}, {}]);
              }}
            >
              {keys.name}
            </div>
          ))}
        </div>
      </div>
      {/* 資料 */}
      <div className="list-page">
        <div className="card-list">
          {data &&
            dataMap(data)
              .slice(
                pageIndex * numPerPage,
                pageIndex * numPerPage + numPerPage
              )
              .map((keys, index) => (
                <Card
                  data={keys}
                  key={index}
                  loading={loading}
                  selectCategories={selectCategories}
                />
              ))}
        </div>
        <Pagination
          page={page}
          pageIndex={pageIndex}
          setPageIndex={setPageIndex}
        />
      </div>
    </>
  );
};

export default List;
