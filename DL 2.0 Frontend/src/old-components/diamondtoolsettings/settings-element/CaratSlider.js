import React, { useEffect, useState } from "react";
import { Modal } from "react-responsive-modal";
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
import Skeleton from "react-loading-skeleton";
import { useCookies } from "react-cookie";

const CaratSlider = (props) => {
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const [loaded, setLoaded] = useState(false);
  const marks = props.caratSliderData;
  const [startValue, setstartValue] = useState(Number(props.minCarat));
  const [lastValue, setlastValue] = useState(Number(props.maxCarat));

  const [getsettingcookies, setsettingcookies] = useCookies([
    "_wpsavediamondfiltercookie",
  ]);
  const [getlabcookies, setlabcookies] = useCookies([
    "_wpsavedlabgowndiamondfiltercookie",
  ]);
  const [getfancycookies, setfancycookies] = useCookies([
    "_wpsavedfancydiamondfiltercookie",
  ]);
  // console.log("props");
  // console.log(props.caratSliderData);
  // console.log(startValue);
  // console.log(lastValue);

  const rangeSelector = (newValue) => {
    setstartValue(Number(newValue[0]));
    setlastValue(Number(newValue[1]));

    let sliderSelection = [];
    // sliderSelection.push(Number(newValue[0]));
    // sliderSelection.push(Number(newValue[1]));
  };

  const rangeSelectorprops = (newValue) => {
    setstartValue(Number(newValue[0]));
    setlastValue(Number(newValue[1]));
    // console.log("rangeslider");
    // console.log(Number(newValue[0]));
    let sliderSelection = [];
    sliderSelection.push(Number(newValue[0]));
    sliderSelection.push(Number(newValue[1]));
    // props.callBack(newValue);
    props.callBack(sliderSelection);
  };

  /* CHANGED FOR INVALID INPUTS ABOVE IS OLD CODE INCASE IF THE BELOW FUNCTIONS DOESN'T WORK */
  // const startValueOnChange = (event) => {
  //   setstartValue(event.target.value);
  //   let sliderSelection = [];
  //   sliderSelection.push(event.target.value);
  //   sliderSelection.push(lastValue);
  //   props.callBack(sliderSelection);
  // };

  const startValueOnChange = (event) => {
    const inputValue = event.target.value.trim();

    // Check if the input is a valid number (whole or decimal)
    if (isNaN(inputValue)) {
      alert("Please enter a valid number.");
      return;
    }

    setstartValue(inputValue);
    let sliderSelection = [inputValue, lastValue];
    props.callBack(sliderSelection);
  };

  // const endValueOnChange = (event) => {
  //   setlastValue(event.target.value);
  //   let sliderSelection = [];
  //   sliderSelection.push(startValue);
  //   sliderSelection.push(event.target.value);
  //   props.callBack(sliderSelection);
  // };

  const endValueOnChange = (event) => {
    const inputValue = event.target.value.trim();

    // Check if the input is a valid number (whole or decimal)
    if (isNaN(inputValue)) {
      alert("Please enter a valid number.");
      return;
    }

    setlastValue(inputValue);
    let sliderSelection = [startValue, inputValue];
    props.callBack(sliderSelection);
  };
  /* CHANGED FOR INVALID INPUTS ABOVE IS OLD CODE INCASE IF THE BELOW FUNCTIONS DOESN'T WORK */

  useEffect(() => {
    setLoaded(true);

    if (props.minCarat === "" && props.maxCarat === "") {
      setstartValue(Number(props.caratSliderData[0].minCarat));
      setlastValue(Number(props.caratSliderData[0].maxCarat));
    }

    if (
      getfancycookies._wpsavedfancydiamondfiltercookie &&
      getfancycookies._wpsavedfancydiamondfiltercookie.minCarat
    ) {
      if (props.callbacktab === "fancycolor") {
        setstartValue(Number(props.minCarat));
        setlastValue(Number(props.maxCarat));
      }
    }

    if (props.callbacktab === "mined") {
      if (
        getsettingcookies._wpsavediamondfiltercookie &&
        getsettingcookies._wpsavediamondfiltercookie.minCarat
      ) {
        setstartValue(Number(props.minCarat));
        setlastValue(Number(props.maxCarat));
      }
    }

    if (props.callbacktab === "labgrown") {
      if (
        getlabcookies._wpsavedlabgowndiamondfiltercookie &&
        getlabcookies._wpsavedlabgowndiamondfiltercookie.minCarat
      ) {
        setstartValue(Number(props.minCarat));
        setlastValue(Number(props.maxCarat));
      }
    }
  }, [props]);

  if (loaded === false) {
    return <Skeleton height={80} />;
  } else {
    return (
      <div className="range-slider_diamond">
        <div className="slider">
          <h4 className="f_heading diamond_heading">
            CARAT
            {window.initData.data[0].show_filter_info === "1" && (
              <span className="f_popup" onClick={onOpenModal}>
                <i className="fas fa-info-circle"></i>
              </span>
            )}
          </h4>
          <Modal
            open={open}
            onClose={onCloseModal}
            center
            classNames={{
              overlay: "popup_Overlay",
              modal: "popup_Modal",
            }}
          >
            <div className="popup_content">
              <p>
                Carat is a unit of measurement to determine a diamond’s weight.
                Typically, a higher carat weight means a larger looking diamond,
                but that is not always the case. Look for the mm measurements of
                the diamond to determine its visible size.
              </p>
              <img
                src={
                  window.initData.data[0].server_url +
                  process.env.PUBLIC_URL +
                  "/images/carat.jpg"
                }
                alt="Carat"
                className="popup-image"
              ></img>
            </div>
          </Modal>

          <div className="diamond-ui-slider diamond-small-slider">
            <Nouislider
              connect
              behaviour={"tap"}
              start={[startValue, lastValue]}
              range={{
                min: Number(marks[0].minCarat),
                max: Number(marks[0].maxCarat),
              }}
              tooltips={true}
              onChange={rangeSelectorprops}
              // onKeyDown={handleKeyPress}
            />
          </div>
        </div>
        <div className="input-value dia-input-value">
          <div className="input-value-left">
            <input
              type="text"
              value={startValue}
              onChange={startValueOnChange}
              // onKeyDown={handleKeyPress}
            />
          </div>
          <div className="input-value-right">
            <input type="text" value={lastValue} onChange={endValueOnChange} />
          </div>
        </div>
      </div>
    );
  }
};

export default CaratSlider;
