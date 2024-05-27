import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import round from "../../../images/round.png";
// import Modal from "react-bootstrap/Modal";
import { Modal } from "react-responsive-modal";

import spinn from "../../../images/spinner.gif";
import { useCookies } from "react-cookie";
import Checkbox from "rc-checkbox";
import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { LoadingOverlay, Loader } from "react-overlay-loader";
import ReactTooltip from "react-tooltip";
import { useNavigate } from "react-router-dom";

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

const ListDataTable = (props) => {
  const [getshow, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const [getDiamondID, setDiamondID] = useState("");
  const [getShape, setShape] = useState("");
  const [getCarat, setCarat] = useState("");
  const [getColor, setColor] = useState("");
  const [getClarity, setClarity] = useState("");
  const [getDepth, setDepth] = useState("");
  const [getTable, setTable] = useState("");
  const [getPolish, setPolish] = useState("");
  const [getMeasurement, setMeasurement] = useState("");
  const [getCertificate, setCertificate] = useState("");
  const [getPrice, setPrice] = useState("");
  const [getSymmetry, setSymmetry] = useState("");
  const [getCut, setCut] = useState("");
  const [getVideo, setVideo] = useState(true);
  const [getView, setView] = useState(true);
  const [getRow, setRow] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [videoLoading, setVideoLoading] = useState(true);
  const [getCompareCount, setCompareCount] = useState(0);
  const [getvideoloader, setvideoloader] = useState("true");
  const [getShapeOrderType, setShapeOrderType] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [getOrderType, setOrderType] = useState("");
  const [getPriceOrderType, setPriceOrderType] = useState("");
  const [getCaratOrderType, setCaratOrderType] = useState("");
  const [getColorOrderType, setColorOrderType] = useState("");
  const [getIntensityOrderType, setIntensityOrderType] = useState("");
  const [getClarityOrderType, setClarityOrderType] = useState("");
  const [getCutOrderType, setCutOrderType] = useState("");
  const [getDepthOrderType, setDepthOrderType] = useState("");
  const [getTableOrderType, setTableOrderType] = useState("");
  const [getPolishOrderType, setPolishOrderType] = useState("");
  const [getSymmetryOrderType, setSymmetryOrderType] = useState("");
  const [getMeasurementOrderType, setMeasurementOrderType] = useState("");
  const [getCertificateOrderType, setCertificateOrderType] = useState("");
  const [openVideo, setOpenVideo] = useState(false);
  const navigate = useNavigate();
  const [showRetailerInfo, setshowRetailerInfo] = useState(false);

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
  const closehandleModel = async (event) => {
    setModalShow(false);
  };

  const onClickRow = (e) => {
    e.preventDefault();
    setRow(true);
  };

  const onClickShape = (e) => {
    if (getShapeOrderType === "ASC") {
      setShapeOrderType("DESC");
    } else {
      setShapeOrderType("ASC");
    }
    props.filtershape(e);
  };

  const onClickPrice = (e) => {
    e.preventDefault();
    if (getPriceOrderType === "ASC") {
      setPriceOrderType("DESC");
    } else {
      setPriceOrderType("ASC");
    }
    props.filterPrice(e);
  };

  const onClickCarat = (e) => {
    e.preventDefault();
    if (getCaratOrderType === "ASC") {
      setCaratOrderType("DESC");
    } else {
      setCaratOrderType("ASC");
    }
    props.filterCarat(e);
  };

  const onClickColor = (e) => {
    e.preventDefault();
    if (getColorOrderType === "ASC") {
      setColorOrderType("DESC");
    } else {
      setColorOrderType("ASC");
    }
    props.filterColor(e);
  };

  const onClickIntensity = (e) => {
    e.preventDefault();
    if (getIntensityOrderType === "ASC") {
      setIntensityOrderType("DESC");
    } else {
      setIntensityOrderType("ASC");
    }
    props.filterIntensity(e);
  };

  const onClickClarity = (e) => {
    e.preventDefault();
    if (getClarityOrderType === "ASC") {
      setClarityOrderType("DESC");
    } else {
      setClarityOrderType("ASC");
    }
    props.filterClarity(e);
  };

  const onClickDepth = (e) => {
    e.preventDefault();
    if (getDepthOrderType === "ASC") {
      setDepthOrderType("DESC");
    } else {
      setDepthOrderType("ASC");
    }
    props.filterDepth(e);
  };
  const onClickTable = (e) => {
    e.preventDefault();
    if (getTableOrderType === "ASC") {
      setTableOrderType("DESC");
    } else {
      setTableOrderType("ASC");
    }
    props.filterTable(e);
  };
  const onClickPolish = (e) => {
    e.preventDefault();
    if (getPolishOrderType === "ASC") {
      setPolishOrderType("DESC");
    } else {
      setPolishOrderType("ASC");
    }
    props.filterPolish(e);
  };
  const onClickMeasurement = (e) => {
    e.preventDefault();
    if (getMeasurementOrderType === "ASC") {
      setMeasurementOrderType("DESC");
    } else {
      setMeasurementOrderType("ASC");
    }
    props.filterMeasurement(e);
  };
  const onClickCertificate = (e) => {
    e.preventDefault();
    if (getCertificateOrderType === "ASC") {
      setCertificateOrderType("DESC");
    } else {
      setCertificateOrderType("ASC");
    }
    props.filterCertificate(e);
  };
  const onClickCut = (e) => {
    e.preventDefault();
    if (getCutOrderType === "ASC") {
      setCutOrderType("DESC");
    } else {
      setCutOrderType("ASC");
    }
    props.filterCut(e);
  };

  const onClickSymmetry = (e) => {
    e.preventDefault();
    if (getSymmetryOrderType === "ASC") {
      setSymmetryOrderType("DESC");
    } else {
      setSymmetryOrderType("ASC");
    }
    props.filterSummery(e);
  };

  const onClickVideo = (e) => {
    e.preventDefault();
    setView(true);
  };

  const onClickView = (e) => {
    e.preventDefault();
    setRow(true);
  };

  const handleShow = async (item, e) => {
    e.preventDefault();
    setLoaded(true);

    var currentId = e.target.id;
    var tab = props.tabname;

    console.log(props);
    console.log("tab");
    console.log(tab);

    try {
      if (item.isLabCreated === true || item.isLabCreated === "true") {
        // var url = `${window.initData.data[0].diamonddetailapi}DealerID=${window.initData.data[0].dealerid}&DID=${currentId}&IsLabGrown=true`;
        var diamondType = "labcreated";
      } else if (item.fancyColorIntensity) {
        //var url = `${window.initData.data[0].diamonddetailapi}DealerID=${window.initData.data[0].dealerid}&DID=${currentId}&IsFancy=true`;
        var diamondType = "fancydiamonds";
      } else {
        // var url = `${window.initData.data[0].diamonddetailapi}DealerID=${window.initData.data[0].dealerid}&DID=${currentId}&IsLabGrown=false`;
        var diamondType = "mined";
      }

      const res = await fetch(
        `https://dl2.gemfind.us/api/getDiamondDetailsApi/` +
          currentId +
          "/" +
          diamondType +
          "/" +
          window.initData.data[0].shop +
          "/" +
          showRetailerInfo
      );

      // const res = await fetch(url);
      const productDetails = await res.json();
      // console.log(productDetails);
      setDiamondID(currentId);
      setShape(productDetails.shape);
      setCarat(productDetails.caratWeight);
      setColor(productDetails.color);
      setClarity(productDetails.clarity);
      setDepth(productDetails.depth);
      setCut(productDetails.cut);
      setTable(productDetails.table);
      setPolish(productDetails.polish);
      setMeasurement(productDetails.measurement);
      setCertificate(productDetails.certificate);
      setPrice(productDetails.fltPrice);
      setSymmetry(productDetails.symmetry);
      setShow(true);
      //console.log(productId);
    } catch (error) {
      console.log(error);
    }
    setLoaded(false);
  };

  const handleModel = async (event) => {
    setvideoloader("true");

    try {
      const res = await fetch(
        `${window.initData.data[0].getvideoapi}InventoryID=${event.target.id}&Type=Diamond`
      );
      const geturl = await res.json();
      setVideo(geturl.videoURL);
      // setModalShow(true);
      onOpenModalVideo();
    } catch (error) {
      console.log(error);
    }
  };

  const functionWithSwitch = (param) => {
    //console.log(param);
    switch (param) {
      case "Good":
        return "G";
      case "Very good":
        return "VG";
      case "Excellent":
        return "Ex";
      case "Fair":
        return "F";
      case "Ideal":
        return "I";
      default:
        return "-";
    }
  };
  const handleUrl = (e) => {};

  const handleSetBackValue = (item, e) => {
    e.preventDefault();
    // console.log(props);
    console.log("item1223");
    console.log(item.shape);

    if (item.isLabCreated === true || item.isLabCreated === "true") {
      console.log("123");
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
      window.location.reload();
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
      window.location.reload();
    } else {
      console.log("12345");
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
      window.location.reload();
    }
  };

  // console.log("detailData");

  // console.log(props.detailData.showPrice);

  return (
    <>
      <LoadingOverlay className="_gfloading_overlay_wrapper">
        <Loader fullPage loading={loaded} />{" "}
      </LoadingOverlay>
      {/* <Modal
        show={modalShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton onClick={closehandleModel}></Modal.Header>
        <Modal.Body>
          {getvideoloader === "true" ? (
            <div className="modal__spinner">
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
            </div>
          ) : null}
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
        </Modal.Body>
      </Modal> */}
      <Modal
        open={getshow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="additional-info"
        onClose={handleClose}
      >
        <div className="gf-model-header">
          <h2>Additional Information</h2>
        </div>
        <div className="diamond-information">
          <ul class="diamond-spacification-list">
            <li>
              <div className="diamonds-details-title">
                <p>Diamond ID</p>
              </div>
              <div className="diamonds-info">
                <p>{getDiamondID ? getDiamondID : "NA"}</p>
              </div>
            </li>
            <li>
              <div className="diamonds-details-title">
                <p>Shape</p>
              </div>
              <div className="diamonds-info">
                <p>{getShape ? getShape : "NA"}</p>
              </div>
            </li>
            <li>
              <div className="diamonds-details-title">
                <p>Carat</p>
              </div>
              <div className="diamonds-info">
                <p>{getCarat ? getCarat : "NA"}</p>
              </div>
            </li>
            <li>
              <div className="diamonds-details-title">
                <p>Color</p>
              </div>
              <div className="diamonds-info">
                <p>{getColor ? getColor : "NA"}</p>
              </div>
            </li>
            <li>
              <div className="diamonds-details-title">
                <p>Clarity</p>
              </div>
              <div className="diamonds-info">
                <p>{getClarity ? getClarity : "NA"}</p>
              </div>
            </li>
            <li>
              <div className="diamonds-details-title">
                <p>Cut</p>
              </div>
              <div className="diamonds-info">
                <p>{getCut ? getCut : "NA"}</p>
              </div>
            </li>
            <li>
              <div className="diamonds-details-title">
                <p>Depth %</p>
              </div>
              <div className="diamonds-info">
                <p>{getDepth ? getDepth : "NA"}</p>
              </div>
            </li>
            <li>
              <div className="diamonds-details-title">
                <p>Table %</p>
              </div>
              <div className="diamonds-info">
                <p>{getTable ? getTable : "NA"}</p>
              </div>
            </li>
            <li>
              <div className="diamonds-details-title">
                <p>Polish</p>
              </div>
              <div className="diamonds-info">
                <p>{getPolish ? getPolish : "NA"}</p>
              </div>
            </li>
            {/* <li>
                                                            <div className="diamonds-details-title">
                                                                <p>Symmetry</p>
                                                            </div>
                                                            <div className="diamonds-info">
                                                                <p>
                                                                    {getSymmetry
                                                                        ? getSymmetry
                                                                        : "NA"}
                                                                </p>
                                                            </div>
                                                        </li> */}
            <li>
              <div className="diamonds-details-title">
                <p>Measurement</p>
              </div>
              <div className="diamonds-info">
                <p>{getMeasurement ? getMeasurement : "NA"}</p>
              </div>
            </li>
            {/* <li>
                                                            <div className="diamonds-details-title">
                                                                <p>
                                                                    Certificate
                                                                </p>
                                                            </div>
                                                            <div className="diamonds-info">
                                                                <p>
                                                                    {getCertificate
                                                                        ? getCertificate
                                                                        : "NA"}
                                                                </p>
                                                            </div>
                                                        </li> */}
            <li>
              <div className="diamonds-details-title">
                <p>Price</p>
              </div>
              <div className="diamonds-info">
                <p>
                  {getPrice === "Call for Price"
                    ? "Call For Price"
                    : window.initData.data[0].price_row_format === "1"
                    ? window.currencyFrom === "USD"
                      ? window.currency +
                        Number(getPrice).toLocaleString(undefined, {
                          maximumFractionDigits: 0,
                        })
                      : window.currencyFrom +
                        "  " +
                        window.currency +
                        "  " +
                        Number(getPrice).toLocaleString(undefined, {
                          maximumFractionDigits: 0,
                        })
                    : window.currencyFrom === "USD"
                    ? window.currency +
                      Number(getPrice).toLocaleString(undefined, {
                        maximumFractionDigits: 0,
                      })
                    : Number(getPrice).toLocaleString(undefined, {
                        maximumFractionDigits: 0,
                      }) +
                      "  " +
                      window.currency +
                      "  " +
                      window.currencyFrom}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </Modal>
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

      <div className="gf-product-list-viewdata">
        <div className="table-responsive-sm">
          <table className="gf-table">
            <thead>
              <tr>
                {/* <th scope="col">
                <i className="fas fa-clone"></i>
              </th> */}
                <th
                  scope="col"
                  className={`table-sort ${getShapeOrderType}`}
                  title="Shape"
                  id="shape"
                  onClick={onClickShape}
                >
                  Shape
                </th>
                <th
                  scope="col"
                  className={`table-sort ${getCaratOrderType}`}
                  title="Carat"
                  id="Size"
                  onClick={onClickCarat}
                >
                  Carat
                </th>
                <th
                  scope="col"
                  className={`table-sort ${getColorOrderType}`}
                  title="Color"
                  id="Color"
                  onClick={onClickColor}
                >
                  Color
                </th>
                {props.tabname === "fancycolor" && (
                  <th
                    scope="col"
                    className={`table-sort ${getIntensityOrderType}`}
                    title="Intensity"
                    id="FancyColorIntensity"
                    onClick={onClickIntensity}
                  >
                    Intensity
                  </th>
                )}
                <th
                  scope="col"
                  className={`table-sort ${getClarityOrderType}`}
                  title="Clarity"
                  id="ClarityID"
                  onClick={onClickClarity}
                >
                  Clarity
                </th>
                <th
                  scope="col"
                  className={`table-sort ${getCutOrderType}`}
                  title="Cut"
                  id="CutGrade"
                  onClick={onClickCut}
                >
                  Cut
                </th>
                <th
                  scope="col"
                  className={`table-sort ${getDepthOrderType}`}
                  id="Depth"
                  title="Depth"
                  onClick={onClickDepth}
                >
                  Depth
                </th>
                <th
                  scope="col"
                  className={`table-sort ${getTableOrderType}`}
                  id="TableMeasure"
                  title="Table"
                  onClick={onClickTable}
                >
                  Table
                </th>
                {/* <th
                scope="col"
                className={`table-sort ${getPolishOrderType}`}
                id="Polish"
                title="Polish"
                onClick={onClickPolish}
              >
                Polish
              </th>
              <th
                scope="col"
                className={`table-sort ${getSymmetryOrderType}`}
                id="Symmetry"
                title="Symmetry"
                onClick={onClickSymmetry}
              >
                Sym.
              </th> */}
                <th
                  scope="col"
                  className={`table-sort ${getMeasurementOrderType}`}
                  id="Measurements"
                  title="Measurement"
                  onClick={onClickMeasurement}
                >
                  Measurement
                </th>
                <th
                  scope="col"
                  className={`table-sort ${getCertificateOrderType}`}
                  id="Certificate"
                  title="Certificate"
                  onClick={onClickCertificate}
                >
                  Cert.
                </th>
                {window.initData.data[0]
                  .show_In_House_Diamonds_Column_with_SKU === "1" && (
                  <th
                    scope="col"
                    className={`table-sort`}
                    id="InHouse"
                    title="InHouse"
                  >
                    In House
                  </th>
                )}
                <th
                  scope="col"
                  className={`table-sort ${getPriceOrderType}`}
                  id="FltPrice"
                  title="Price"
                  onClick={onClickPrice}
                >
                  Price
                  {props.detailData.showPrice === true
                    ? ` ( ${window.initData.data[0].currencyFrom} ) `
                    : ""}
                </th>
                {/* <th
                scope="col"
                className="video-data"
                id="dia_video"
                onClick={onClickVideo}
              >
                Video
              </th>
              <th
                scope="col"
                className="view-data"
                id="dia_view"
                onClick={onClickView}
              >
                View
              </th> */}
                <th></th>
              </tr>
            </thead>
            <tbody>
              {props.listviewData.map((item) => (
                <tr
                  key={item.$id}
                  className={`${
                    window.compareproduct.indexOf(item.diamondId) > -1 === true
                      ? "selected_row"
                      : ""
                  }`}
                >
                  <td
                    className="Cutcol"
                    onClick={(e) => handleSetBackValue(item, e)}
                  >
                    <img
                      src={item.biggerDiamondimage}
                      alt={item.detailLinkText}
                      width="20"
                      height="20"
                      title={item.shape + " " + item.carat + " CARAT"}
                    />
                    <span className="shape-name">{item.shape}</span>
                  </td>
                  <td
                    className="Sizecol"
                    onClick={(e) => handleSetBackValue(item, e)}
                  >
                    {" "}
                    {item.carat ? item.carat : "-"}{" "}
                  </td>
                  <td
                    className="Colorcol"
                    onClick={(e) => handleSetBackValue(item, e)}
                  >
                    {" "}
                    {item.color ? item.color : "-"}{" "}
                  </td>
                  {props.tabname === "fancycolor" && (
                    <td className="Intensitycol">
                      {item.fancyColorIntensity
                        ? item.fancyColorIntensity
                        : "-"}
                    </td>
                  )}
                  <td
                    className="ClarityIDcol"
                    onClick={(e) => handleSetBackValue(item, e)}
                  >
                    {item.clarity ? item.clarity : "-"}
                  </td>
                  <td
                    className="CutGradecol"
                    onClick={(e) => handleSetBackValue(item, e)}
                  >
                    {functionWithSwitch(item.cut)}
                  </td>
                  <td
                    className="Depthcol HiddenCol"
                    onClick={(e) => handleSetBackValue(item, e)}
                  >
                    {item.depth ? item.depth : "-"}
                  </td>
                  <td
                    className="TableMeasurecol HiddenCol"
                    onClick={(e) => handleSetBackValue(item, e)}
                  >
                    {item.table ? item.table : "-"}
                  </td>
                  {/* <td className="Polishcol">{functionWithSwitch(item.polish)}</td>
                <td className="Symmetrycol">
                  {functionWithSwitch(item.symmetry)}
                </td>*/}
                  <td
                    className="Measurementscol"
                    onClick={(e) => handleSetBackValue(item, e)}
                  >
                    {item.measurement ? item.measurement : "-"}
                  </td>
                  <td
                    className="Certificatecol "
                    onClick={(e) => handleSetBackValue(item, e)}
                  >
                    <a href="javascript:;">{item.cert ? item.cert : "-"}</a>
                  </td>
                  {window.initData.data[0]
                    .show_In_House_Diamonds_Column_with_SKU === "1" && (
                    <td
                      className="Certificatecol"
                      onClick={(e) => handleSetBackValue(item, e)}
                    >
                      <a href="javascript:;">
                        {item.inhouse ? item.inhouse : "-"}
                      </a>
                    </td>
                  )}
                  <td
                    className="FltPricecol"
                    onClick={(e) => handleSetBackValue(item, e)}
                  >
                    {item.fltPrice === "Call for Price"
                      ? "Call"
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
                  </td>
                  {/* <td
                  className={`video-data dia_videocol ${
                    item.videoFileName !== "" ? "video-active" : ""
                  }`}
                >
                  {item.videoFileName !== "" && (
                    <a
                      href="javascript:;"
                      className={`gf-video-popup ${
                        item.videoFileName !== "" ? "video-active" : ""
                      }`}
                      onClick={handleModel}
                    >
                      <i id={item.diamondId} className="fas fa-video"></i>
                    </a>
                  )}
                </td> */}
                  {/* <td className="view-data dia_viewcol">
                  <a
                    href={
                      "/apps/diamondtools/diamonds/product/" +
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
                      "-cert-" +
                      "islabgrown-" +
                      item.isLabCreated +
                      "-sku-" +
                      item.diamondId
                    }
                    title="View Diamond"
                  >
                    <i className="fas fa-eye"></i>
                  </a>
                </td> */}
                  <td className="ellipsis-data">
                    <div className="info-diamond">
                      <i className="fas fa-ellipsis-v"></i>
                    </div>
                    <div className="icon-hover">
                      <div className="view-icon">
                        <>
                          <a
                            href="javascript:;"
                            onClick={(e) => handleSetBackValue(item, e)}
                            data-tip="View Diamond Details"
                            title="View Diamond Details"
                          >
                            <i className="fas fa-eye"></i>
                          </a>

                          {/* <a
                            href={
                              "/apps/diamondtools/diamonds/product/" +
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
                              "-cert-" +
                              "islabgrown-" +
                              item.isLabCreated +
                              "-sku-" +
                              item.diamondId
                            }
                            title="View Diamond Details"
                            data-tip="View Diamond Details"
                          >
                            <i className="fas fa-eye"></i>
                          </a> */}
                          <ReactTooltip />
                        </>
                      </div>
                      <div
                        className={`video-icon video-data dia_videocol ${
                          item.videoFileName !== "" ? "video-active" : ""
                        }`}
                      >
                        {item.videoFileName !== "" && (
                          <>
                            <a
                              href="javascript:;"
                              className={`gf-video-popup ${
                                item.videoFileName !== "" ? "video-active" : ""
                              }`}
                              onClick={handleModel}
                              data-tip="Video"
                            >
                              <i
                                id={item.diamondId}
                                className="fas fa-video"
                              ></i>
                            </a>

                            <ReactTooltip />
                          </>
                        )}
                      </div>
                      <div
                        className="info-icon"
                        onClick={(e) => handleShow(item, e)}
                      >
                        <>
                          <i
                            id={item.diamondId}
                            className="fas fa-info"
                            data-tip="Quick View"
                          ></i>
                          <ReactTooltip />
                        </>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ListDataTable;
