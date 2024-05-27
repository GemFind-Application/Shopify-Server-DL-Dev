import React, { useEffect, useState } from "react";
import { Modal } from "react-responsive-modal";
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
import Skeleton from "react-loading-skeleton";
import { useCookies } from "react-cookie";

const PriceSlider = (props) => {
  // Our States
  // console.log(props);

  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const [loaded, setLoaded] = useState(false);
  const marks = props.pricerangeData;
  const [startValue, setstartValue] = useState(Number(props.pricemindata));
  const [lastValue, setlastValue] = useState(Number(props.pricemaxdata));
  const [loadedfirst, setloadedfirst] = useState(false);

  const [getsettingcookies, setsettingcookies] = useCookies([
    "_wpsavediamondfiltercookie",
  ]);
  const [getlabcookies, setlabcookies] = useCookies([
    "_wpsavedlabgowndiamondfiltercookie",
  ]);
  const [getfancycookies, setfancycookies] = useCookies([
    "_wpsavedfancydiamondfiltercookie",
  ]);
  //   console.log("props");
  //   console.log(props);
  // Changing State when volume increases/decreases
  const rangeSelector = (newValue) => {
    setstartValue(parseInt(newValue[0]));
    setlastValue(parseInt(newValue[1]));

    let sliderSelection = [];
    sliderSelection.push(parseInt(newValue[0]));
    sliderSelection.push(parseInt(newValue[1]));
  };
  const rangeSelectorprops = (newValue) => {
    setstartValue(parseInt(newValue[0]));
    setlastValue(parseInt(newValue[1]));

    let sliderSelection = [];
    sliderSelection.push(parseInt(newValue[0]));
    sliderSelection.push(parseInt(newValue[1]));
    // props.callBack(newValue);
    props.callBack(sliderSelection);
  };

  const startValueOnChange = (event) => {
    const intValue = parseInt(event.target.value);
    if (
      Number.isInteger(intValue) &&
      intValue >= 0 &&
      intValue <= Number(marks[0].maxPrice)
    ) {
      setstartValue(event.target.value);
      let sliderSelection = [];
      sliderSelection.push(parseInt(event.target.value));
      sliderSelection.push(lastValue);
      ////console.log("continue start value change");
      props.callBack(sliderSelection);
    } else {
      alert("Please Enter Valid Value");
      return;
    }
  };

  const endValueOnChange = (event) => {
    const intValue = parseInt(event.target.value);
    if (
      Number.isInteger(intValue) &&
      intValue >= 0 &&
      intValue <= Number(marks[0].maxPrice)
    ) {
      setlastValue(event.target.value);
      let sliderSelection = [];
      sliderSelection.push(startValue);
      sliderSelection.push(parseInt(event.target.value));
      //console.log("continue end value change");
      props.callBack(sliderSelection);
    } else {
      alert("Please Enter Valid Value");
      return;
    }
  };

  useEffect(() => {
    setLoaded(true);
    if (props.callbacktab === "fancycolor") {
      if (
        getfancycookies._wpsavedfancydiamondfiltercookie &&
        getfancycookies._wpsavedfancydiamondfiltercookie.pricemin &&
        getfancycookies._wpsavedfancydiamondfiltercookie.pricemax
      ) {
        setstartValue(Number(props.pricemindata));
        setlastValue(Number(props.pricemaxdata));
      }
    }

    if (props.pricemindata === "" && props.pricemaxdata === "") {
      setstartValue(Number(marks[0].minPrice));
      setlastValue(Number(marks[0].maxPrice));
    }

    if (props.callbacktab === "mined") {
      if (
        getsettingcookies._wpsavediamondfiltercookie &&
        getsettingcookies._wpsavediamondfiltercookie.pricemin &&
        getsettingcookies._wpsavediamondfiltercookie.pricemax
      ) {
        setstartValue(Number(props.pricemindata));
        setlastValue(Number(props.pricemaxdata));
      }
    }
    if (props.callbacktab === "labgrown") {
      if (
        getlabcookies._wpsavedlabgowndiamondfiltercookie &&
        getlabcookies._wpsavedlabgowndiamondfiltercookie.pricemin &&
        getlabcookies._wpsavedlabgowndiamondfiltercookie.pricemax
      ) {
        setstartValue(Number(props.pricemindata));
        setlastValue(Number(props.pricemaxdata));
      }
    }
  }, [props]);

  if (loaded === false) {
    return <Skeleton height={80} />;
  } else {
    return (
      <div className="range-slider_diamond">
        <div className="slider">
          <h4 className="f_heading">
            Price
            <span className="f_popup" onClick={onOpenModal}>
              <i className="fas fa-info-circle"></i>
            </span>
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
                This refer to different type of Price to filter and select the
                appropriate ring as per your requirements. Look for best suit
                price of your chosen ring.
              </p>
            </div>
          </Modal>
          <div className="diamond-ui-slider diamond-small-slider">
            <Nouislider
              connect
              behaviour={"snap"}
              start={[
                props.pricemindata ? props.pricemindata : startValue,
                props.pricemaxdata ? props.pricemaxdata : lastValue,
              ]}
              range={{
                min: Number(marks[0].minPrice),
                max: Number(marks[0].maxPrice),
              }}
              // format={{ Number }}
              tooltips={true}
              // onUpdate={rangeSelector} // for example updating a state value
              onChange={rangeSelectorprops}
              // onSlide={rangeSelector}
            />
          </div>
        </div>
        <div className="input-value">
          <div className="input-value-left">
            <span
              className={
                window.initData["data"][0].price_row_format === "0"
                  ? "icon-right"
                  : "icon-left"
              }
            >
              {window.currencyFrom === "USD"
                ? window.currency
                : window.currencyFrom + " " + window.currency}
            </span>
            <input
              type="text"
              value={props.pricemindata ? props.pricemindata : startValue}
              onChange={startValueOnChange}
              className={
                window.initData["data"][0].price_row_format === "0"
                  ? "input-left"
                  : ""
              }
            />{" "}
          </div>
          <div className="input-value-right">
            <span
              className={
                window.initData["data"][0].price_row_format === "0"
                  ? "icon-right"
                  : "icon-left"
              }
            >
              {window.currencyFrom === "USD"
                ? window.currency
                : window.currencyFrom + " " + window.currency}
            </span>
            <input
              type="text"
              value={props.pricemaxdata ? props.pricemaxdata : lastValue}
              onChange={endValueOnChange}
              className={
                window.initData["data"][0].price_row_format === "0"
                  ? "input-left"
                  : ""
              }
            />
          </div>
        </div>
      </div>
    );
  }
};

export default PriceSlider;
