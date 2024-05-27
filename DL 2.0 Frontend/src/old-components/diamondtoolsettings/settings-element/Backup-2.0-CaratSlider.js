import React, { useEffect, useState } from "react";
import { Modal } from "react-responsive-modal";
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
import Skeleton from "react-loading-skeleton";
import { useCookies } from "react-cookie";

const CaratSlider = (props) => {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const marks = props.caratSliderData;
  const [sliderUpdate, setSliderUpdate] = useState(false);

  const [getSettingCookies, setSettingCookies] = useCookies([
    "_wpsavediamondfiltercookie",
  ]);
  const [getLabCookies, setLabCookies] = useCookies([
    "_wpsavedlabgowndiamondfiltercookie",
  ]);
  const [getFancyCookies, setFancyCookies] = useCookies([
    "_wpsavedfancydiamondfiltercookie",
  ]);

  const [tempStartValue, setTempStartValue] = useState(
    props.minCarat !== "" ? Number(props.minCarat) : Number(marks[0].minCarat)
  );
  const [tempLastValue, setTempLastValue] = useState(
    props.maxCarat !== "" ? Number(props.maxCarat) : Number(marks[0].maxCarat)
  );

  const [manualEdit, setManualEdit] = useState(false);

  const rangeSelectorprops = (newValue) => {
    setTempStartValue(newValue[0]);
    setTempLastValue(newValue[1]);
    setSliderUpdate(true);
    setManualEdit(false); // Reset the manualEdit flag when slider is moved
  };

  const startValueOnChange = (event) => {
    console.log(event);
    setTempStartValue(event.target.value);
    // setManualEdit(true);
  };

  const endValueOnChange = (event) => {
    setTempLastValue(event.target.value);
    //setManualEdit(true);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      setSliderUpdate(false);
      let sliderSelection = [Number(tempStartValue), Number(tempLastValue)];
      props.callBack(sliderSelection);
      // setTempStartValue(event.target.value);
      // setTempLastValue(event.target.value);
      setManualEdit(true); // Reset the manualEdit flag
    }
  };

  useEffect(() => {
    if (!manualEdit) {
      setLoaded(true);

      if (sliderUpdate) {
        setSliderUpdate(false);
        let sliderSelection = [Number(tempStartValue), Number(tempLastValue)];
        props.callBack(sliderSelection);
      }

      if (
        getFancyCookies._wpsavedfancydiamondfiltercookie &&
        getFancyCookies._wpsavedfancydiamondfiltercookie.minCarat
      ) {
        if (props.callbacktab === "fancycolor") {
          setTempStartValue(Number(props.minCarat));
          setTempLastValue(Number(props.maxCarat));
        }
      }

      if (props.callbacktab === "mined") {
        if (
          getSettingCookies._wpsavediamondfiltercookie &&
          getSettingCookies._wpsavediamondfiltercookie.minCarat
        ) {
          setTempStartValue(Number(props.minCarat));
          setTempLastValue(Number(props.maxCarat));
        }
      }

      if (props.callbacktab === "labgrown") {
        if (
          getLabCookies._wpsavedlabgowndiamondfiltercookie &&
          getLabCookies._wpsavedlabgowndiamondfiltercookie.minCarat
        ) {
          setTempStartValue(Number(props.minCarat));
          setTempLastValue(Number(props.maxCarat));
        }
      }
    }
  }, [
    props,
    sliderUpdate,
    tempStartValue,
    tempLastValue,
    getFancyCookies,
    getSettingCookies,
    getLabCookies,
    manualEdit,
  ]);

  if (loaded === false) {
    return <Skeleton height={80} />;
  } else {
    return (
      <div className="range-slider_diamond">
        <div className="slider">
          <h4 className="f_heading diamond_heading">
            CARAT
            {window.initData.data[0].show_filter_info === "1" && (
              <span className="f_popup" onClick={() => setOpen(true)}>
                <i className="fas fa-info-circle"></i>
              </span>
            )}
          </h4>
          <Modal
            open={open}
            onClose={() => setOpen(false)}
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
              behaviour="tap"
              start={[tempStartValue, tempLastValue]}
              range={{
                min: Number(marks[0].minCarat),
                max: Number(marks[0].maxCarat),
              }}
              tooltips={true}
              onChange={rangeSelectorprops}
            />
          </div>
        </div>
        <div className="input-value dia-input-value">
          <div className="input-value-left">
            <input
              type="number"
              value={tempStartValue}
              onChange={startValueOnChange}
              onKeyDown={handleKeyPress}
            />
          </div>
          <div className="input-value-right">
            <input
              type="number"
              value={tempLastValue}
              onChange={endValueOnChange}
              onKeyDown={handleKeyPress}
            />
          </div>
        </div>
      </div>
    );
  }
};

export default CaratSlider;
