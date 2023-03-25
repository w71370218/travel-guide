import "./Card.css";
import useRWD from "./useRWD";
/* svg */
import ImageSVG from "../assets/svg/Image.svg";
import LocationSVG from "../assets/svg/Geo alt.svg";
import CalendarSVG from "../assets/svg/Calendar.svg";

const Card = (props) => {
  const device = useRWD();
  const imageWidth = device === "mobile" ? 75 : 150;
  const imageHeight = device === "mobile" ? 55 : 110;
  function renderSwitch(selectCategories) {
    switch (selectCategories) {
      case 0:
        return <h3 className="title">{props.data.ScenicSpotName}</h3>;
        break;
      case 1:
        return <h3 className="title">{props.data.RestaurantName}</h3>;
        break;
      case 2:
        return <h3 className="title">{props.data.HotelName}</h3>;
        break;
      case 3:
        return <h3 className="title">{props.data.ActivityName}</h3>;
        break;
      default:
        return <div className="h-3 mb-5 bg-slate-700 rounded w-4/6"></div>;
    }
  }

  return (
    <>
      <div className={`${props.loading && "animate-pulse"}`}>
        <div className={`card ${!props.loading ? "onloaded" : ""}`}>
          <div className="image">
            {props.data.Picture && props.data.Picture.PictureUrl1 ? (
              <img
                src={props.data.Picture.PictureUrl1}
                alt={props.data.PictureDescription1}
              />
            ) : (
              <span>
                <svg
                  width={imageWidth}
                  height={imageHeight}
                  viewBox={`0 0 ${imageWidth} ${imageHeight}`}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <use
                    href={`${ImageSVG}#svg`}
                    width={imageWidth}
                    height={imageHeight}
                  />
                </svg>
              </span>
            )}
          </div>
          <div className="card-body ">
            {renderSwitch(props.selectCategories)}
            <hr />
            <div className="description">
              {!props.loading ? (
                props.data.Description ? (
                  <p>{props.data.Description}</p>
                ) : (
                  <p>無</p>
                )
              ) : (
                <div className="description grid gap-4">
                  <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                  <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                  <div className="h-2 bg-slate-700 rounded col-span-3"></div>
                  <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                  <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                </div>
              )}
            </div>
            <div className="card-information">
              <div className="information">
                {props.selectCategories === 2 && props.data.Class && (
                  <span>{props.data.Class}</span>
                )}
              </div>
              <div className="information">
                {props.selectCategories === 3 && (
                  <>
                    <span>
                      <svg
                        width={16}
                        height={16}
                        viewBox={`0 0 ${16} ${16}`}
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <use
                          href={`${CalendarSVG}#svg`}
                          width={16}
                          height={16}
                        />
                      </svg>
                    </span>
                    <span>
                      {props.data.StartTime &&
                        `${new Date(props.data.StartTime).getFullYear()}-${
                          new Date(props.data.StartTime).getMonth() + 1
                        }-${new Date(props.data.StartTime).getDate()}`}
                    </span>
                    {(new Date(props.data.StartTime).getFullYear() !==
                      new Date(props.data.EndTime).getFullYear() ||
                      new Date(props.data.StartTime).getMonth() !==
                        new Date(props.data.EndTime).getMonth() ||
                      new Date(props.data.StartTime).getDate() !==
                        new Date(props.data.EndTime).getDate()) &&
                      props.data.EndTime && (
                        <>
                          <span>{" - "}</span>
                          <span>
                            {`${new Date(props.data.EndTime).getFullYear()}-${
                              new Date(props.data.EndTime).getMonth() + 1
                            }-${new Date(props.data.EndTime).getDate()}`}
                          </span>
                        </>
                      )}
                  </>
                )}
              </div>
              <div className="information">
                {props.data.City || props.data.Address ? (
                  <>
                    <span>
                      <svg
                        width={16}
                        height={16}
                        viewBox={`0 0 ${16} ${16}`}
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <use
                          href={`${LocationSVG}#svg`}
                          width={16}
                          height={16}
                        />
                      </svg>
                    </span>
                    <span>
                      {props.data.City
                        ? props.data.City
                        : props.data.Address.slice(0, 3)}
                    </span>
                  </>
                ) : !props.loading ? (
                  <></>
                ) : (
                  <div className=" grid gap-5">
                    <div className="h-2 bg-slate-700 rounded col-span-4"></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
