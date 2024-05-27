import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import ReactTooltip from "react-tooltip";
import Pagination from "react-bootstrap/Pagination";
import { Modal } from "react-responsive-modal";

// import Modal from "react-bootstrap/Modal";
// import "react-responsive-modal/styles.css";
import spinn from "../../../images/spinner.gif";
import MyPagination from "./Pagination";
import ListDataTable from "./ListDataTable";
import { useCookies } from "react-cookie";
import Checkbox from "rc-checkbox";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { LoadingOverlay, Loader } from "react-overlay-loader";

function Preloader(props) {
  return (
    <img
      className="preloaderr"
      alt="spinner"
      src={
        window.initData.data[0].server_url +
        process.env.PUBLIC_URL +
        "/images/spinner.gif"
      }
      style={{ width: "21px", height: "24px" }}
    />
  );
}

const DiamondSettingsProducts = (props) => {
  const [text, setText] = useState("");
  const [modalShow, setModalShow] = React.useState(false);
  const [getVideo, setVideo] = useState("");
  const [videoLoading, setVideoLoading] = useState(true);
  const [getpaginationpagecount, setpaginationpagecount] = useState("12");
  const [getdiamondFilterRange, setdiamondFilterRange] = useState("");

  const [currPage, setCurrPage] = useState(1);
  const [getInfo, setInfo] = useState("");
  const [getgrid, setgrid] = useState(true);
  const [getlist, setlist] = useState(false);
  const [getGridClass, setGridClass] = useState("gf-grid-view-four");
  const [getlistClass, setlistClass] = useState("gf-grid-list-view");
  const [getAscClass, setAscClass] = useState("active");
  const [getDescClass, setDescClass] = useState("inactive");
  const [getOrderType, setOrderType] = useState("DESC");
  const [getSearch, setSearch] = useState("");
  const [getclose, setClose] = useState("false");
  const [cookies, setCookie] = useCookies(["_compareitems"]);
  const [getCompare, setCompare] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [getCompareCount, setCompareCount] = useState(0);
  const [getcookie, setcookie] = useCookies(["compareproductcookie"]);
  const [getCPDiamondTypecookie, setCPDiamondTypecookie] = useCookies([
    "compareProductDiamondTypeCookie",
  ]);
  const [getcomparecookies, setcomparecookies] = useCookies([
    "_wpsavedcompareproductcookie",
  ]);
  const [getbrowserdiamondcookies, setbrowserdiamondcookies] = useCookies([
    "shopify_diamondbackvalue",
  ]);
  const [getcpcookies, setcpcookies, removeCookie] = useCookies([
    "cookie-name",
  ]);

  const [getvideoloader, setvideoloader] = useState("true");
  const [getprouductClass, setprouductClass] = useState();
  const [getproductselected, productselected] = useState();
  const [loaded, setLoaded] = useState(false);

  const [openVideo, setOpenVideo] = useState(false);

  const onOpenModalVideo = () => setOpenVideo(true);
  const onCloseModalVideo = () => {
    // console.log("close");
    setOpenVideo(false);
  };

  const spinner = () => {
    // setTimeout(() => {
    setvideoloader("false");
    // }, 500);
  };
  const navigate = useNavigate();

  // console.log(props);
  useEffect(() => {
    if (window.initData.data[0].default_viewmode === "1") {
      setlist(true);
      setgrid(false);
      setGridClass("inactive");
      setlistClass("active");
    } else {
      setgrid(true);
      setlist(false);
      setGridClass("active");
      setlistClass("inactive");
    }
    if (getcpcookies.compareproductcookie) {
      //console.log(getcpcookies.compareproductcookie);
      window.compareproduct = getcpcookies.compareproductcookie;
      setCompareCount(window.compareproduct.length);

      //console.log(window.comparecookies);
    }

    if (getCPDiamondTypecookie.compareProductDiamondTypeCookie) {
      window.compareProductDiamondType =
        getCPDiamondTypecookie.compareProductDiamondTypeCookie;
    }

    if (
      getcomparecookies._wpsavedcompareproductcookie &&
      getcomparecookies._wpsavedcompareproductcookie.length > 0
    ) {
      window.compareproduct = JSON.parse(
        JSON.stringify(getcomparecookies._wpsavedcompareproductcookie)
      );
      setCompareCount(window.compareproduct.length);
    }

    if (getbrowserdiamondcookies.shopify_diamondbackvalue) {
      if (
        getbrowserdiamondcookies.shopify_diamondbackvalue &&
        getbrowserdiamondcookies.shopify_diamondbackvalue[0].diamondId
      ) {
        productselected(
          getbrowserdiamondcookies.shopify_diamondbackvalue[0].diamondId
        );
      }
    }

    if (
      getCPDiamondTypecookie.compareProductDiamondTypeCookie &&
      getCPDiamondTypecookie.compareProductDiamondTypeCookie !== ""
    ) {
      window.compareProductDiamondType = JSON.parse(
        JSON.stringify(getCPDiamondTypecookie.compareProductDiamondTypeCookie)
      );
    }

    if (
      getcookie.compareproductcookie &&
      getcookie.compareproductcookie !== ""
    ) {
      window.compareproduct = JSON.parse(
        JSON.stringify(getcookie.compareproductcookie)
      );
      setCompareCount(window.compareproduct.length);
    }
    setprouductClass(getproductselected);
  }, [getcomparecookies, getproductselected]);
  const onSubmit = (evt) => {
    evt.preventDefault();
    // console.log(getSearch);
    if (getSearch === "") {
      alert("Please enter your search value");
      return false;
    }
    props.searchvalue(getSearch);
    setClose("true");
  };

  const onChange = (evt) => {
    setSearch(evt.target.value);
  };

  const onClose = (evt) => {
    evt.preventDefault();
    //console.log(getSearch);
    setSearch("");
    props.searchvalue("");
    setClose("false");
  };

  const handlePageSizeChange = (event) => {
    props.pagesize(event.target.value);
    setpaginationpagecount(event.target.value);
  };

  const handlediamondFilterRangeChange = (event) => {
    console.log(event.target.value);
    var inHouseVariable = event.target.value;
    var inHouseVariableInLowercCase = inHouseVariable.toLowerCase();
    console.log(inHouseVariableInLowercCase);

    props.diamondFilterRangeResponse(inHouseVariableInLowercCase);
    setdiamondFilterRange(inHouseVariableInLowercCase);
  };

  const handleorderbytype = (event) => {
    props.orderbytype(event.target.value);
  };

  const afterPageClicked = (page_number) => {
    setCurrPage(page_number);
    props.currentpageno(page_number);
    document.getElementById("ringbuilderScrollUp").scrollIntoView({
      behavior: "smooth",
    });
    setCookie("compareproductcookie", JSON.stringify(window.compareproduct), {
      path: "/",
      maxAge: 604800,
    });
    setCookie(
      "compareProductDiamondTypeCookie",
      JSON.stringify(window.compareProductDiamondType),
      {
        path: "/",
        maxAge: 604800,
      }
    );
  };

  const handleModel = async (event) => {
    // console.log("Click on Video Button");
    setvideoloader("true");
    try {
      const res = await fetch(
        `${window.initData.data[0].getvideoapi}InventoryID=${event.target.id}&Type=Diamond`
      );
      const geturl = await res.json();
      // console.log(geturl);
      setVideo(geturl.videoURL);
      //   setModalShow(true);
      onOpenModalVideo();
    } catch (error) {
      //console.log();
    }
  };

  const closehandleModel = async (event) => {
    setModalShow(false);
  };

  const handleOrderClass = (event) => {
    // event.preventDefault();
    //console.log(event.target.id);
    if (event.target.id === "asc") {
      setAscClass("inactive");
      setDescClass("active");
      setOrderType("ASC");
      props.orderType("DESC");
    } else {
      setAscClass("active");
      setDescClass("inactive");
      setOrderType("DESC");
      props.orderType("ASC");
    }
  };

  const onOpenInfo = (e) => {
    e.preventDefault();
    var currentId = e.target.id;
    var c = currentId.split("-");
    //console.log(c[1]);
    setInfo(c[1]);
    if (getInfo === c[1]) {
      setInfo("");
    }
  };

  const hideInfo = (e) => {
    setInfo("");
  };

  const onOpenGrid = (e) => {
    e.preventDefault();
    setgrid(true);
    setlist(false);
    setGridClass("active");
    setlistClass("inactive");
  };
  const onOpenList = (e) => {
    e.preventDefault();
    setlist(true);
    setgrid(false);
    setGridClass("inactive");
    setlistClass("active");
  };

  const handleCompare = (item, e) => {
    if (item.isLabCreated === true || item.isLabCreated === "true") {
      var diamondType = "labcreated";
    } else if (item.fancyColorIntensity) {
      var diamondType = "fancydiamonds";
    } else {
      var diamondType = "mined";
    }
    //console.log(e.target.checked)
    if (e.target.checked === false) {
      var index = window.compareproduct.indexOf(e.target.value);
      if (index !== -1) {
        window.compareproduct.splice(index, 1);
      }
    }

    if (window.compareproduct.length < 6) {
      if (e.target.checked === true) {
        window.compareproduct.push(e.target.value);

        window.compareProductDiamondType.push({
          diamondId: e.target.value,
          diamondType: diamondType,
        });
        //console.log(window.compareproduct);
      }
    } else {
      toast("You can not add more than 6 products.");
      e.target.checked = false;
    }

    // //console.log(window.compareproduct.length);

    setCompareCount(window.compareproduct.length);
  };

  const handlefilterprice = (e) => {
    //console.log("sc");
    props.orderbytype("FltPrice");
    if (getOrderType === "ASC") {
      setOrderType("DESC");
    } else {
      setOrderType("ASC");
    }
    props.orderType(getOrderType);
  };

  const handleshape = (e) => {
    props.orderbytype("Cut");
    if (getOrderType === "ASC") {
      setOrderType("DESC");
    } else {
      setOrderType("ASC");
    }
    props.orderType(getOrderType);
  };

  const handlesize = (e) => {
    props.orderbytype("Size");
    if (getOrderType === "ASC") {
      setOrderType("DESC");
    } else {
      setOrderType("ASC");
    }
    props.orderType(getOrderType);
  };

  const handlecolor = (e) => {
    props.orderbytype("Color");
    if (getOrderType === "DESC") {
      setOrderType("ASC");
    } else {
      setOrderType("DESC");
    }
    props.orderType(getOrderType);
  };

  const handleIntensity = (e) => {
    props.orderbytype("FancyColorIntensity");
    if (getOrderType === "DESC") {
      setOrderType("ASC");
    } else {
      setOrderType("DESC");
    }
    props.orderType(getOrderType);
  };

  const handleclarity = (e) => {
    props.orderbytype("ClarityID");
    if (getOrderType === "ASC") {
      setOrderType("DESC");
    } else {
      setOrderType("ASC");
    }
    props.orderType(getOrderType);
  };

  const handlecutgrade = (e) => {
    props.orderbytype("CutGrade");
    if (getOrderType === "ASC") {
      setOrderType("DESC");
    } else {
      setOrderType("ASC");
    }
    props.orderType(getOrderType);
  };

  const handledepth = (e) => {
    props.orderbytype("Depth");
    if (getOrderType === "ASC") {
      setOrderType("DESC");
    } else {
      setOrderType("ASC");
    }
    props.orderType(getOrderType);
  };

  const handletablemeasure = (e) => {
    props.orderbytype("TableMeasure");
    if (getOrderType === "ASC") {
      setOrderType("DESC");
    } else {
      setOrderType("ASC");
    }
    props.orderType(getOrderType);
  };

  const handlepolish = (e) => {
    props.orderbytype("Polish");
    if (getOrderType === "ASC") {
      setOrderType("DESC");
    } else {
      setOrderType("ASC");
    }
    props.orderType(getOrderType);
  };

  const handlesymmetry = (e) => {
    props.orderbytype("Symmetry");
    if (getOrderType === "ASC") {
      setOrderType("DESC");
    } else {
      setOrderType("ASC");
    }
    props.orderType(getOrderType);
  };

  const handlemeasurements = (e) => {
    props.orderbytype("Measurements");
    if (getOrderType === "ASC") {
      setOrderType("DESC");
    } else {
      setOrderType("ASC");
    }
    props.orderType(getOrderType);
  };

  const handlecertificate = (e) => {
    props.orderbytype("Certificate");
    if (getOrderType === "ASC") {
      setOrderType("DESC");
    } else {
      setOrderType("ASC");
    }
    props.orderType(getOrderType);
  };

  const handleCheckbox = (e) => {
    setCompareCount(e);
  };

  // console.log("props");
  // console.log(props.diamondFilterRange);

  const handleSetBackValue = (item, e) => {
    e.preventDefault();

    var finalSetBackValue = [];
    finalSetBackValue.push({
      shapeName: props.shapeName,
      selectedCut: props.selectedCut,
      selectedColor: props.selectedColor,
      selectedClarity: props.selectedClarity,
      caratmin: props.caratmin,
      caratmax: props.caratmax,
      pricemin: props.pricemin,
      pricemax: props.pricemax,
      selectedFlour: props.selectedFlour,
      selectedPolish: props.selectedPolish,
      selectedfancyColor: props.selectedfancyColor,
      selectedfancyIntensity: props.selectedfancyIntensity,
      selectedmaxDept: props.selectedmaxDept,
      selectedminDept: props.selectedminDept,
      selectedmaxtable: props.selectedmaxtable,
      selectedmintable: props.selectedmintable,
      selectedSymmetry: props.selectedSymmetry,
      diamondId: item.diamondId,
    });

    setbrowserdiamondcookies("shopify_diamondbackvalue", finalSetBackValue, {
      path: "/",
      maxAge: 604800,
    });

    if (item.isLabCreated === true || item.isLabCreated === "true") {
      navigate(
        "/apps/diamondtools/product/" +
          item.shape.replace(/\s+/g, "-").toLowerCase() +
          "-shape-" +
          item.carat.replace(/\s+/g, "-").toLowerCase() +
          "-carat-" +
          item.color.replace(/\s+/g, "-").toLowerCase() +
          "-color-" +
          item.clarity.replace(/\s+/g, "-").toLowerCase() +
          "-clarity-" +
          item.cut.replace(/\s+/g, "-").toLowerCase() +
          "-cut-" +
          item.cert.replace(/\s+/g, "-").toLowerCase() +
          "-certificate-" +
          "-sku-" +
          item.diamondId +
          "/labcreated"
      );
    } else if (item.fancyColorIntensity) {
      navigate(
        "/apps/diamondtools/product/" +
          item.shape.replace(/\s+/g, "-").toLowerCase() +
          "-shape-" +
          item.carat.replace(/\s+/g, "-").toLowerCase() +
          "-carat-" +
          item.color.replace(/\s+/g, "-").toLowerCase() +
          "-color-" +
          item.clarity.replace(/\s+/g, "-").toLowerCase() +
          "-clarity-" +
          item.cut.replace(/\s+/g, "-").toLowerCase() +
          "-cut-" +
          item.cert.replace(/\s+/g, "-").toLowerCase() +
          "-certificate-" +
          "-sku-" +
          item.diamondId +
          "/fancydiamonds"
      );
    } else {
      navigate(
        "/apps/diamondtools/product/" +
          item.shape.replace(/\s+/g, "-").toLowerCase() +
          "-shape-" +
          item.carat.replace(/\s+/g, "-").toLowerCase() +
          "-carat-" +
          item.color.replace(/\s+/g, "-").toLowerCase() +
          "-color-" +
          item.clarity.replace(/\s+/g, "-").toLowerCase() +
          "-clarity-" +
          item.cut.replace(/\s+/g, "-").toLowerCase() +
          "-cut-" +
          item.cert.replace(/\s+/g, "-").toLowerCase() +
          "-certificate-" +
          "-sku-" +
          item.diamondId
      );
    }

    // console.log(Istype);
    // console.log(
    //   "/apps/diamondtools/product/" +
    //     item.shape.replace(/\s+/g, "-").toLowerCase() +
    //     "-shape-" +
    //     item.carat.replace(/\s+/g, "-").toLowerCase() +
    //     "-carat-" +
    //     item.color.replace(/\s+/g, "-").toLowerCase() +
    //     "-color-" +
    //     item.clarity.replace(/\s+/g, "-").toLowerCase() +
    //     "-clarity-" +
    //     item.cut.replace(/\s+/g, "-").toLowerCase() +
    //     "-cut-" +
    //     item.cert.replace(/\s+/g, "-").toLowerCase() +
    //     "-cert-" +
    //     "-sku-" +
    //     item.diamondId +
    //     +Istype
    // );

    // navigate(
    //   "/apps/diamondtools/product/" +
    //     item.shape.replace(/\s+/g, "-").toLowerCase() +
    //     "-shape-" +
    //     item.carat.replace(/\s+/g, "-").toLowerCase() +
    //     "-carat-" +
    //     item.color.replace(/\s+/g, "-").toLowerCase() +
    //     "-color-" +
    //     item.clarity.replace(/\s+/g, "-").toLowerCase() +
    //     "-clarity-" +
    //     item.cut.replace(/\s+/g, "-").toLowerCase() +
    //     "-cut-" +
    //     item.cert.replace(/\s+/g, "-").toLowerCase() +
    //     "-cert-" +
    //     "-sku-" +
    //     item.diamondId +
    //     +Istype
    // );
  };

  const handleBottomCompare = (e) => {
    document.getElementById("compare").click();
  };

  return (
    <>
      {/* <Modal
        show={modalShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <iframe
          className="modal__video-style"
          onLoad={spinner}
          width="100%"
          height="500"
          title="Video"
          src={getVideo}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </Modal> */}

      <Modal open={openVideo} onClose={onCloseModalVideo} center>
        <div className="ring-diamond-video gf-active">
          {getvideoloader === "true" ? (
            <img
              className="preloaderr"
              alt="preLoad"
              src={
                window.initData.data[0].server_url +
                process.env.PUBLIC_URL +
                "/images/diamond.gif"
              }
              style={{ width: "100px", height: "100px" }}
            />
          ) : null}
          <iframe
            onLoad={spinner}
            src={getVideo}
            id="iframevideo"
            width="560"
            height="450"
            scrolling="no"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </Modal>

      <div className="gf-diamond-searching-result">
        <div className="gf-result-number">
          <p>
            {props.productCount} <strong>Similar Diamonds</strong>
          </p>
          <span className="pattern-line">|</span>
          <p id="compare-items">
            <strong>
              {" "}
              Compare Items (<span id="total-price">{getCompareCount}</span>)
            </strong>
          </p>
        </div>
        <div className="gf-diamond-search-details">
          <div className="gf-change-view-result">
            <p>Per Page</p>
            <select
              className="result-perpage"
              defaultValue={"20"}
              id="per-page"
              name="perpage"
              onChange={handlePageSizeChange}
            >
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
          <div className="gf-grid-view-sort">
            <select
              name="dropdown-orderby"
              defaultValue={"Shape"}
              id="dropdown-sort"
              className="dropdown-sort"
              onChange={handleorderbytype}
            >
              <option value="Cut">Shape</option>
              <option value="Size">Carat</option>
              <option value="Color">Color</option>
              {props.tabvalue === "fancycolor" && (
                <option value="FancyColorIntensity">Intensity</option>
              )}
              <option value="ClarityID">Clarity</option>
              <option value="CutGrade">Cut</option>
              <option value="Depth">Depth</option>
              <option value="TableMeasure">Table</option>
              <option value="Polish">Polish</option>
              <option value="Symmetry">Symmetry</option>
              <option value="Measurements">Measurement</option>
              <option value="Certificate">Certificate</option>
              <option value="FltPrice">Price</option>
            </select>
          </div>

          {window.initData.data[0].show_In_House_Diamonds_Column_with_SKU ===
            "1" &&
            props.diamondFilterRange !== "" && (
              <div className="gf-grid-view-sort">
                <select
                  name="dropdown-orderby"
                  defaultValue={""}
                  id="dropdown-sort"
                  className="dropdown-sort"
                  onChange={handlediamondFilterRangeChange}
                >
                  {props.diamondFilterRange.map((filter, index) => (
                    <option key={filter.$id} value={filter.filterName}>
                      {filter.filterName}
                    </option>
                  ))}
                </select>
              </div>
            )}

          <div className="gf-grid-view-orderby">
            <a
              href="javascript:;"
              id="asc"
              onClick={handleOrderClass}
              className={`${getAscClass}`}
            >
              ASC
            </a>
            <a
              href="javascript:;"
              id="desc"
              onClick={handleOrderClass}
              className={` ${getDescClass}`}
            >
              DESC
            </a>
          </div>
        </div>
        <div className="gf-diamond-search-lists">
          <div className="gf-diamond-change-view">
            <ul>
              <li
                className={`gf-grid-view ${
                  getgrid === true ? "gf-active" : ""
                } `}
              >
                <a
                  href="javascript:;"
                  data-tip="Grid View"
                  id="grid-view-four"
                  data-grid="grid-col-four"
                  onClick={onOpenGrid}
                  className="gf-grid-view-four"
                >
                  <svg
                    height="34px"
                    viewBox="0 0 24 24"
                    width="32px"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M10 7h4v4h-4zm6 0h4v4h-4zM4 7h4v4H4zm6 6h4v4h-4zm6 0h4v4h-4zM4 13h4v4H4z" />
                  </svg>
                  Grid view 3 column
                </a>
                <ReactTooltip />
              </li>
              <li
                className={`list-view ${getlist === true ? "gf-active" : ""} `}
              >
                <a
                  href="javascript:;"
                  data-tip="list view"
                  id="grid-list-view"
                  data-grid="grid-col-list"
                  onClick={onOpenList}
                  className="listview"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24px"
                    height="24px"
                  >
                    <path d="M 2 5 L 2 7 L 22 7 L 22 5 L 2 5 z M 2 11 L 2 13 L 22 13 L 22 11 L 2 11 z M 2 17 L 2 19 L 22 19 L 22 17 L 2 17 z" />
                  </svg>
                  List View
                </a>
                <ReactTooltip />
              </li>
            </ul>
          </div>

          <div className="gf-search-bar">
            <form onSubmit={onSubmit}>
              <input
                type="text"
                name="searchdidfield"
                id="searchdidfield"
                placeholder="Search Diamond Stock#"
                value={getSearch}
                onChange={onChange}
                className="search-field"
              />
              <button
                type="button"
                className={`close_button ${
                  getclose === "true" ? "gf-active" : ""
                }`}
                onClick={onClose}
              >
                x
              </button>
              <button type="submit" className={`gf-search-btn gf-active`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 30 30"
                  width="20px"
                  height="20px"
                >
                  <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
      {/* product listing starting */}

      <div className={`gf-search-product-listing ${getGridClass}`}>
        <ul className="gf-product-grid-view gf-grid-col-four" id="grid-mode">
          {props.getDataSettingProductData.map((item) => (
            <li
              className={`gf-product-listing ${
                getprouductClass === item.diamondId ? "gf-active" : ""
              }`}
              key={item.$id}
              id={item.diamondId}
            >
              <div className="Gf_product_box">
                <div className="gf-product__detailss">
                  <a
                    href="javascript:;"
                    className="gf-slidebutton pp"
                    onClick={onOpenInfo}
                  >
                    <i
                      className="fas fa-ellipsis-h"
                      id={`popup-${item.diamondId}`}
                    ></i>
                  </a>

                  <div
                    className={`gf-product-inner-info ${getInfo} ${
                      getInfo === item.diamondId ? "gf-active" : ""
                    }`}
                    onClick={hideInfo}
                  >
                    <ul>
                      <li>
                        <p>
                          <span>Diamond ID </span>
                          <span>{item.diamondId}</span>
                        </p>
                      </li>
                      <li>
                        <p>
                          <span>Shape</span>
                          <span>{item.shape}</span>
                        </p>
                      </li>
                      <li>
                        <p>
                          <span>Carat</span>
                          <span>{item.carat ? item.carat : "-"}</span>
                        </p>
                      </li>
                      <li>
                        <p>
                          <span>Color</span>
                          <span>{item.color ? item.color : "-"}</span>
                        </p>
                      </li>
                      <li>
                        <p>
                          <span>Clarity</span>
                          <span>{item.clarity ? item.clarity : "-"}</span>
                        </p>
                      </li>
                      <li>
                        <p>
                          <span>Cut</span>
                          <span>{item.cut ? item.cut : "-"}</span>
                        </p>
                      </li>
                      <li>
                        <p>
                          <span>Depth</span>
                          <span>{item.depth ? item.depth : "-"}</span>
                        </p>
                      </li>
                      <li>
                        <p>
                          <span>Table</span>
                          <span>{item.table ? item.table : "-"}</span>
                        </p>
                      </li>
                      <li>
                        <p>
                          <span>Polish</span>
                          <span>{item.polish ? item.polish : "-"}</span>
                        </p>
                      </li>
                      <li>
                        <p>
                          <span>Symmetry</span>
                          <span>{item.symmetry ? item.symmetry : "-"}</span>
                        </p>
                      </li>
                      <li>
                        <p>
                          <span>Measurement</span>
                          <span>
                            {item.measurement ? item.measurement : "-"}
                          </span>
                        </p>
                      </li>
                      <li>
                        <p>
                          <span>Certificate</span>
                          <span>
                            <a href={item.certificateUrl}>
                              {item.cert ? item.cert : "-"}
                            </a>
                          </span>
                        </p>
                      </li>
                      <li>
                        <p>
                          <span>Price</span>
                          <span>
                            {item.fltPrice === "Call for Price"
                              ? "Call for Price"
                              : window.initData.data[0].price_row_format === "1"
                              ? item.currencyFrom === "USD"
                                ? window.currency +
                                  Number(item.fltPrice).toLocaleString(
                                    undefined,
                                    {
                                      maximumFractionDigits: 0,
                                    }
                                  )
                                : item.currencyFrom +
                                  "  " +
                                  item.currencySymbol +
                                  "  " +
                                  Number(item.fltPrice).toLocaleString(
                                    undefined,
                                    {
                                      maximumFractionDigits: 0,
                                    }
                                  )
                              : item.currencyFrom === "USD"
                              ? window.currency +
                                Number(item.fltPrice).toLocaleString(
                                  undefined,
                                  {
                                    maximumFractionDigits: 0,
                                  }
                                )
                              : Number(item.fltPrice).toLocaleString(
                                  undefined,
                                  {
                                    maximumFractionDigits: 0,
                                  }
                                ) +
                                "  " +
                                item.currencySymbol +
                                "  " +
                                item.currencyFrom}
                            {/* {item.fltPrice !== "Call for Price"
                          ? Number(item.fltPrice).toLocaleString(undefined, {
                              maximumFractionDigits: 0,
                            })
                          : "Call For Price"} */}
                          </span>
                        </p>
                      </li>
                    </ul>
                  </div>
                  <a
                    href="javascript:;"
                    className={`gf-video-popup ${
                      item.videoFileName !== "" ? "video-active" : ""
                    }`}
                    onClick={handleModel}
                  >
                    <i id={item.diamondId} className="gem-video"></i>
                  </a>
                </div>
                <a
                  href="javascript:;"
                  onClick={(e) => handleSetBackValue(item, e)}
                >
                  <div className="gf-product-images">
                    <img
                      src={item.biggerDiamondimage}
                      alt={item.detailLinkText}
                    ></img>
                  </div>
                  <div className="gf-product-details">
                    <div className="gf-product-item-name">
                      <span>
                        {" "}
                        {item.shape} <strong> {item.carat} </strong> CARAT
                      </span>
                      <span>
                        {" "}
                        {item.color} , {item.clarity}{" "}
                      </span>
                    </div>
                    {/* <h2 className="product-name"> <strong> {item.name}</strong></h2> */}
                  </div>
                </a>

                <h5
                  className="gf-product-price"
                  onClick={(e) => handleSetBackValue(item, e)}
                >
                  {item.fltPrice === "Call for Price"
                    ? "Call For Price"
                    : window.initData.data[0].price_row_format === "1"
                    ? item.currencyFrom === "USD"
                      ? window.currency +
                        Number(item.fltPrice).toLocaleString(undefined, {
                          maximumFractionDigits: 0,
                        })
                      : item.currencyFrom +
                        "  " +
                        item.currencySymbol +
                        "  " +
                        Number(item.fltPrice).toLocaleString(undefined, {
                          maximumFractionDigits: 0,
                        })
                    : item.currencyFrom === "USD"
                    ? window.currency +
                      Number(item.fltPrice).toLocaleString(undefined, {
                        maximumFractionDigits: 0,
                      })
                    : Number(item.fltPrice).toLocaleString(undefined, {
                        maximumFractionDigits: 0,
                      }) +
                      "  " +
                      item.currencySymbol +
                      "  " +
                      item.currencyFrom}
                  {/* {item.fltPrice !== "Call for Price"
                          ? Number(item.fltPrice).toLocaleString(undefined, {
                              maximumFractionDigits: 0,
                            })
                          : "Call For Price"} */}
                </h5>
                {window.compareproduct.indexOf(item.diamondId) > -1 == true && (
                  <div className="gf-product-box-action checked">
                    <label>
                      <Checkbox
                        value={item.diamondId}
                        id={item.diamondId}
                        // onClick={handleCompare}
                        onClick={(e) => handleCompare(item, e)}
                        checked={true}
                      />
                      Add to Compare
                    </label>
                  </div>
                )}
                {window.compareproduct.indexOf(item.diamondId) > -1 ==
                  false && (
                  <div className="gf-product-box-action unchecked">
                    <label>
                      <Checkbox
                        value={item.diamondId}
                        id={item.diamondId}
                        // onClick={handleCompare}
                        onClick={(e) => handleCompare(item, e)}
                      />
                      {/* <input type="checkbox" name="comparebox[]" value={item.diamondId} onClick={handleCompare} id={item.diamondId} /> */}
                      Add to Compare
                    </label>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className={`gf-product-datatable ${getlistClass}`}>
        <ListDataTable
          listviewData={props.getDataSettingProductData}
          checkboxcount={handleCheckbox}
          filterPrice={handlefilterprice}
          filtershape={handleshape}
          filterCarat={handlesize}
          filterColor={handlecolor}
          filterIntensity={handleIntensity}
          filterClarity={handleclarity}
          filterDepth={handledepth}
          tabname={props.tabvalue}
          filterTable={handletablemeasure}
          filterPolish={handlepolish}
          filterMeasurement={handlemeasurements}
          filterCertificate={handlecertificate}
          filterCut={handlecutgrade}
          filterSummery={handlesymmetry}
          selectValue={props}
        />
      </div>
      {props.productCount !== "" && (
        <div className="gf-result-pagination">
          <div className="gf-btn-compare">
            <a
              href="#"
              id="compare-main"
              className="gf-btn"
              onClick={handleBottomCompare}
            >
              {" "}
              Compare(<span id="totaldiamond">{getCompareCount}</span>)
            </a>
          </div>
          <div className="gf-result-bottom">
            <h2>
              Results {props.startPage} to {props.endPage} of{" "}
              {props.productCount}{" "}
            </h2>
          </div>
          <div className="gf-diamond-product-pagination">
            <MyPagination
              totPages={props.totalPages}
              currentPage={currPage}
              pageClicked={(ele) => {
                afterPageClicked(ele);
              }}
            ></MyPagination>
          </div>
        </div>
      )}
    </>
  );
};

export default DiamondSettingsProducts;
