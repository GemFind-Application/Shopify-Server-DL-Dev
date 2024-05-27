import React, { useEffect, useState } from "react";
import Topheader from "../elements/Topheader";
import { Routes, Route, Router, Redirect, useLocation } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import DiamondProductGallary from "./diamondsettings-element/DiamondProductGallary";
import DiamondProductInformation from "./diamondsettings-element/DiamondProductInformation";
import { Modal } from "react-responsive-modal";
import { LoadingOverlay, Loader } from "react-overlay-loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCookies } from "react-cookie";
import DiamondDetailsListing from "./diamondsettings-element/DiamondDetailsListing";
import { useNavigate } from "react-router-dom";
import NotFound from "../NotFound";

const DiamondSettingDetails = () => {
  const [openModel, setOpenModel] = useState(false);
  const [openDelearModel, setOpenDelearModel] = useState(false);
  const [isgetLabGrown, issetLabGrown] = useState("false");

  const location = useLocation();
  var productUrl = location.pathname;

  const isSlashPresentLab = productUrl.includes("labcreated");
  const isSlashPresentFancy = productUrl.includes("fancydiamonds");

  if (isSlashPresentLab === true || isSlashPresentFancy === true) {
    var getsku = productUrl.substring(productUrl.lastIndexOf("-") + 1);

    // console.log(getsku);

    var sku = getsku.split("/");

    var part = sku[0];

    var type = productUrl.substring(productUrl.lastIndexOf("/") + 1);

    // console.log(sku[0]);
  } else {
    var part = productUrl.substring(productUrl.lastIndexOf("-") + 1);
  }

  const [getCurrentProductId, setCurrentProductId] = useState(part);

  const [getIslab, setIslab] = useState(isSlashPresentLab);
  const [getIsFancy, setIsFancy] = useState(isSlashPresentFancy);

  var diamondType = "mined";

  if (getIsFancy === true && getIslab === false) {
    diamondType = "fancydiamonds";
  } else if (getIsFancy === false && getIslab === true) {
    diamondType = "labcreated";
  } else {
    var diamondType = "mined";
  }

  // console.log("getIslab");
  // console.log(getIslab);

  const [skeltonLoad, setskeltonLoad] = useState(false);
  const [getProductData, setProductData] = useState("");
  var selectedmetal = productUrl.substring(productUrl.lastIndexOf("/") + 1);
  const [getIp, setIp] = useState("");
  const [geterror, seterror] = useState([""]);
  const [loaded, setLoaded] = useState(false);
  const [getsettingcookies, setsettingcookies] = useCookies([
    "_shopify_ringsetting",
  ]);
  const [getdiamondcookies, setdiamondcookies] = useCookies([
    "_shopify_diamondsetting",
  ]);
  const [getDiamondCookie, setDiamondCookie] = useState(false);
  const [getsettingcookie, setsettingcookie] = useState(false);
  const [getDataSettingProduct, setDataSettingProduct] = useState([]);
  const [getProductCount, setProductCount] = useState("");
  const [getcaratWeight, setcaratWeight] = useState("");
  const [getColorId, setColorId] = useState("");
  const [getCertificate, setCertificate] = useState("");
  const [getLabgown, setLabgown] = useState(false);
  const [getTotalPage, setTotalPage] = useState(35);
  const [getStartPage, setStartPage] = useState(1);
  const [getEndPage, setEndPage] = useState(12);
  const [getShape, setShape] = useState("");
  const [getminprice, setminprice] = useState("");
  const [getselectedpageSize, setpageSizeselected] = useState("20");
  const [getselectedpageno, setselectedpageno] = useState("1");
  const [getpageordertypeelected, setpageordertypeelected] = useState("");
  const [getascdescordertypeelected, setascdescordertypeelected] = useState("");
  const [getFancyColor, setFancyColor] = useState("");
  const [getFancyColordata, setFancyColordata] = useState("");
  const [getFancyIntensitydata, setFancyIntensitydata] = useState("");
  const [loadvarible, setloadvariable] = useState(false);
  const [getyourpassword, setyourpassword] = useState("");
  const [initdataload, setinitdataload] = useState(false);
  const [initdataloadsimilar, setinitdataloadsimilar] = useState(false);
  const [getpriceRange, setpriceRange] = useState([]);
  const [getPricemin, setPricemin] = useState("");
  const [getPricemax, setPricemax] = useState("");
  const [getdepthRange, setdepthRange] = useState([]);
  const [getDepthmin, setDepthmin] = useState("");
  const [getDepthmax, setDepthmax] = useState("");
  const [gettableRange, settableRange] = useState([]);
  const [getTablemin, setTablemin] = useState("");
  const [getTablemax, setTablemax] = useState("");
  const [getClarity, setClarity] = useState("");
  const [getCut, setCut] = useState("");
  const [getSymmetry, setSymmetry] = useState("");
  const [getPolish, setPolish] = useState("");
  const [getFluorescence, setFluorescence] = useState("");
  const [getCaratRange, setCaratRange] = useState([]);
  const [getFilterData, setFilterData] = useState("");
  const [getdiamondFilterRange, setdiamondFilterRange] = useState("");
  const [showRetailerInfo, setshowRetailerInfo] = useState(false);

  const navigate = useNavigate();

  // const pageorderbytype = (type) => {
  //   console.log(type);
  //   //setpageordertypeelected(type);
  //   // setLoaded(true);
  //   if (getpageordertypeelected !== type) {
  //     setpageordertypeelected(type);
  //     setLoaded(true);
  //   } else {
  //     setpageordertypeelected(type);
  //   }
  // };

  const pageorderbytype = (type) => {
    getsimilarDiamondProductsData(
      type,
      getselectedpageSize,
      getascdescordertypeelected,
      getselectedpageno
    );
    setpageordertypeelected(type);
    setLoaded(true);
  };

  const handlechangedpagesize = (sizevalue) => {
    getsimilarDiamondProductsData(
      getpageordertypeelected,
      sizevalue,
      getascdescordertypeelected,
      getselectedpageno
    );
    setpageSizeselected(sizevalue);
    setLoaded(true);
  };

  const ascdesctype = (type1) => {
    if (getascdescordertypeelected !== type1) {
      getsimilarDiamondProductsData(
        getpageordertypeelected,
        getselectedpageSize,
        type1,
        getselectedpageno
      );
      setascdescordertypeelected(type1);
      setLoaded(true);
    }
    // setascdescordertypeelected(type1);
    // setLoaded(true);
  };

  const diamondFilterRangeOfInHouse = (type) => {
    console.log("type in House In Detail Page");
    console.log(type);

    // getsimilarDiamondProductsData(
    //   type,
    //   getselectedpageSize,
    //   getascdescordertypeelected,
    //   getselectedpageno
    // );

    if (type !== "view all") {
      setdiamondFilterRange(type);
    } else {
      setdiamondFilterRange("");
    }

    setLoaded(true);
  };

  const currentpagevalue = (currentPage) => {
    getsimilarDiamondProductsData(
      getpageordertypeelected,
      getselectedpageSize,
      getascdescordertypeelected,
      currentPage
    );
    setselectedpageno(currentPage);
    setLoaded(true);
  };

  //Internal Storage
  const handleYourpassword = (event) => {
    setyourpassword(event.target.value);
  };

  const handleShowModel = () => {
    setOpenModel(true);
    setshowRetailerInfo(true);
    // console.log(showRetailerInfo);
  };

  const handleintstorageSubmit = async (e) => {
    e.preventDefault();
    setLoaded(true);
    let errors = {};
    let formIsValid = true;

    //Validation

    //Name
    if (getyourpassword === "") {
      errors["yourpassword"] = "Please enter your password";
      formIsValid = false;
    }

    if (formIsValid == false) {
      console.log(errors);
      seterror(errors);
      setLoaded(false);
      return;
    }

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        DealerPass: getyourpassword,
        DealerID: window.initData.data[0].dealerid,
      }),
    };
    try {
      const res = await fetch(
        `${window.initData.data[0].dealerauthapi}`,
        requestOptions
      );
      const Data = await res.json();
      if (Data === "User successfully authenticated.") {
        getProductDetails(
          getCurrentProductId,
          diamondType,
          window.initData.data[0].shop,
          showRetailerInfo
        );
        setOpenDelearModel(true);
      } else {
        toast("User is not authenticated");
      }
      setOpenModel(false);
      setLoaded(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getProductDetails = async (
    diamondId,
    diamondType,
    shopDomain,
    internalUseOnly
  ) => {
    try {
      const res = await fetch(
        `https://dl2.gemfind.us/api/getDiamondDetailsApi/` +
          diamondId +
          "/" +
          diamondType +
          "/" +
          shopDomain +
          "/" +
          internalUseOnly
      );

      const productDetails = await res.json();

      // console.log(productDetails);
      //console.log(productId);
      setProductData(productDetails);
      setShape(productDetails.shape);
      setcaratWeight(productDetails.caratWeight);
      setminprice(productDetails.fltPrice);
      setColorId(productDetails.colorID);
      setCertificate(productDetails.certificate);
      setLabgown(productDetails.isLabCreated);
      setFancyColordata(productDetails.color);
      //console.log(productDetails.isLabCreated);
      setClarity(productDetails.clarity);
      setCut(productDetails.cut);
      setFancyColor(productDetails.fancyColorIntensity);
      setFancyIntensitydata(productDetails.fancyColorIntensity);
      setSymmetry(productDetails.symmetry);
      setPolish(productDetails.polish);
      setFluorescence(productDetails.fluorescence);
      setskeltonLoad(true);
      setinitdataload(true);
    } catch (error) {
      console.log(error);
      // alert("Something went wrong");
      navigate("/apps/diamondtools/");
      window.location.reload();
    }
  };

  // const getProductDetails = async (DealerID, productId) => {
  //   try {
  //     // const res = await fetch(
  //     //   `${window.initData.data[0].diamonddetailapi}DealerID=${DealerID}&DID=${productId}&IsLabGrown=${getIslab}`
  //     // );

  //     if (getIsFancy === true) {
  //       var url = `${window.initData.data[0].diamonddetailapi}DealerID=${DealerID}&DID=${productId}&IsFancy=${getIsFancy}`;
  //     } else {
  //       var url = `${window.initData.data[0].diamonddetailapi}DealerID=${DealerID}&DID=${productId}&IsLabGrown=${getIslab}`;
  //     }

  //     const res = await fetch(url);

  //     const productDetails = await res.json();
  //     // console.log(productDetails);
  //     //console.log(productId);
  //     setProductData(productDetails);
  //     setShape(productDetails.shape);
  //     setcaratWeight(productDetails.caratWeight);
  //     setminprice(productDetails.fltPrice);
  //     setColorId(productDetails.colorID);
  //     setCertificate(productDetails.certificate);
  //     setLabgown(productDetails.isLabCreated);
  //     setFancyColordata(productDetails.color);
  //     //console.log(productDetails.isLabCreated);
  //     setClarity(productDetails.clarity);
  //     setCut(productDetails.cut);
  //     setFancyColor(productDetails.fancyColorIntensity);
  //     setFancyIntensitydata(productDetails.fancyColorIntensity);
  //     setSymmetry(productDetails.symmetry);
  //     setPolish(productDetails.polish);
  //     setFluorescence(productDetails.fluorescence);
  //     setskeltonLoad(true);
  //     setinitdataload(true);
  //   } catch (error) {
  //     console.log(error);
  //     // alert("Something went wrong");
  //     navigate("/apps/diamondtools/");
  //     window.location.reload();
  //   }
  // };

  const initpingback = async () => {
    try {
      // const res = await fetch(
      //   `${window.initData.data[0].diamonddetailapi}DealerID=${window.initData.data[0].dealerid}&DID=${getCurrentProductId}&IsLabGrown=${getIslab}`
      // );
      // const productDetails = await res.json();

      const res = await fetch(
        `https://dl2.gemfind.us/api/getDiamondDetailsApi/` +
          getCurrentProductId +
          "/" +
          diamondType +
          "/" +
          window.initData.data[0].shop +
          "/" +
          showRetailerInfo
      );

      // if (getIsFancy === true) {
      //   var url = `${window.initData.data[0].diamonddetailapi}DealerID=${window.initData.data[0].dealerid}&DID=${getCurrentProductId}&IsFancy=${getIsFancy}`;
      // } else {
      //   var url = `${window.initData.data[0].diamonddetailapi}DealerID=${window.initData.data[0].dealerid}&DID=${getCurrentProductId}&IsLabGrown=${getIslab}`;
      // }

      const productDetails = await res.json();

      //GET THE  CURRENT USER IP
      const response = await fetch("https://geolocation-db.com/json/");
      const data = await response.json();
      setIp(data.IPv4);

      //POST THE  PINGBACK URL TO SERVER
      const response1 = await fetch(
        `http://platform.jewelcloud.com/DiamondTracking.aspx?RetailerID=${window.initData.data[0].dealerid}&VendorID=${productDetails.retailerInfo.retailerID}&GFInventoryID=${getCurrentProductId}&URL=${window.location.href}&DealerStockNo=${productDetails.vendorStockNo}&Carat=${productDetails.stoneCarat}&Cut=${productDetails.cut}&Color=${productDetails.color}&Clarity=${productDetails.clarity}&Depth=${productDetails.depth}&Polish=${productDetails.polish}&Symmetry=${productDetails.symmetry}&FltPrice=${productDetails.fltPrice}&SellingPrice=${productDetails.fltPrice}&Girdle=${productDetails.girdleThick}&Culet=${productDetails.culet}&Fluorescence=${productDetails.fluorescence}&Measurements=${productDetails.measurement}&Certificate=${productDetails.certificate}&CertificateNo=${productDetails.certificateNo}&TableMes=${productDetails.table}&CutGrade=${productDetails.cutGrade}&UsersIPAddress=${data.IPv4}
      `,
        {
          method: "POST",
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getInitFilterDiamondData = async (DealerID) => {
    try {
      if (getFancyColor !== "") {
        var url =
          `${window.initData.data[0].filterapifancy}DealerID=` + DealerID;
      } else {
        var url = `${window.initData.data[0].filterapi}DealerID=` + DealerID;
      }

      // console.log(url);
      const res = await fetch(url);
      const acrualRes = await res.json();

      if (acrualRes[1][0].diamondFilterRange) {
        setFilterData(acrualRes[1][0].diamondFilterRange);
      } else {
        setFilterData("");
      }

      //Price Range
      setpriceRange(acrualRes[1][0].priceRange);
      // setPricemin(acrualRes[1][0].priceRange[0].minPrice);
      // setPricemax(acrualRes[1][0].priceRange[0].maxPrice);

      //Depth Range
      setdepthRange(acrualRes[1][0].depthRange);
      setDepthmin(acrualRes[1][0].depthRange[0].minDepth);
      setDepthmax(acrualRes[1][0].depthRange[0].maxDepth);

      //Table Range
      settableRange(acrualRes[1][0].tableRange);
      setTablemin(acrualRes[1][0].tableRange[0].minTable);
      setTablemax(acrualRes[1][0].tableRange[0].maxTable);

      setinitdataloadsimilar(true);
    } catch (error) {
      console.log(error);
    }
  };

  const getsimilarDiamondProductsData = async (
    type,
    sizevalue,
    type1,
    currentPage
  ) => {
    var labGown = false;
    // console.log(getLabgown);

    //For Price
    var minPrice;
    var maxPrice;

    if (getPricemin === "") {
      minPrice = getpriceRange[0].minPrice;
    } else {
      minPrice = getPricemin;
    }
    if (getPricemax === "") {
      maxPrice = getpriceRange[0].maxPrice;
    } else {
      maxPrice = getPricemax;
    }

    try {
      if (window.initData.data[0].settings_carat_ranges) {
        var myObject = JSON.parse(
          window.initData.data[0].settings_carat_ranges
        );

        var data = Object.keys(myObject);

        const goal = getcaratWeight;

        const output = data.reduce((prev, curr) =>
          Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev
        );

        var caratArray = myObject[output];

        var centerstonemincarat = Number(caratArray["0"]);
        var centerstonemaxcarat = Number(caratArray["1"]);
      }

      var diamondfilterParam = getdiamondFilterRange
        ? `&diamondfilter=${getdiamondFilterRange}`
        : "";

      if (getFancyColor === "" || getFancyColor === null) {
        var url = `${window.initData.data[0].diamondlistapi}DealerID=${
          window.initData.data[0].dealerid
        }&Shape=${getShape}&PriceMin=${minPrice}&PriceMax=${maxPrice}&CaratMin=${centerstonemincarat}&CaratMax=${centerstonemaxcarat}&Certificate=${getCertificate}&OrderBy=${
          type ? type : getpageordertypeelected
        }&OrderType=${type1 ? type1 : getascdescordertypeelected}&PageNumber=${
          currentPage ? currentPage : getselectedpageno
        }&PageSize=${
          sizevalue ? sizevalue : getselectedpageSize
        }${diamondfilterParam}&IsLabGrown=${getLabgown}`;
      } else {
        var url = `${window.initData.data[0].diamondlistapifancy}DealerID=${
          window.initData.data[0].dealerid
        }&Shape=${getShape}&PriceMin=${minPrice}&PriceMax=${maxPrice}&CaratMin=${centerstonemincarat}&CaratMax=${centerstonemaxcarat}&TableMin=${getTablemin}&TableMax=${getTablemax}&DepthMin=${getDepthmin}&DepthMax=${getDepthmax}&Certificate=${getCertificate}&OrderBy=${
          type ? type : getpageordertypeelected
        }&OrderType=${type1 ? type1 : getascdescordertypeelected}&PageNumber=${
          currentPage ? currentPage : getselectedpageno
        }&PageSize=${sizevalue ? sizevalue : getselectedpageSize}`;
      }

      const res = await fetch(url);
      // console.log("res");
      // console.log(url);
      // return false;
      const settingProduct = await res.json();
      // setDataSettingProduct(settingProduct.diamondList);

      if (settingProduct.diamondList) {
        setDataSettingProduct(settingProduct.diamondList);
      } else {
        setDataSettingProduct([]);
      }

      setProductCount(settingProduct.count);
      var totalPages = Math.ceil(
        settingProduct.count / (sizevalue ? sizevalue : getselectedpageSize)
      );
      setTotalPage(totalPages);
      var offset =
        (currentPage ? currentPage : getselectedpageno - 1) *
          (sizevalue ? sizevalue : getselectedpageSize) +
        1;
      setStartPage(offset);
      var end = parseInt(
        (currentPage ? currentPage : getselectedpageno) *
          (sizevalue ? sizevalue : getselectedpageSize)
      );
      setEndPage(end);
      setskeltonLoad(true);
      setLoaded(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBackButton = (e) => {
    navigate("/apps/diamondtools");
  };

  useEffect(() => {
    if (
      getsettingcookies._shopify_ringsetting &&
      getsettingcookies._shopify_ringsetting[0].setting_id
    ) {
      setsettingcookie(true);
    }
    if (
      getdiamondcookies._shopify_diamondsetting &&
      getdiamondcookies._shopify_diamondsetting[0].diamondId
    ) {
      setDiamondCookie(true);
    }
    if (initdataload === false) {
      initpingback();
      // getProductDetails(window.initData.data[0].dealerid, getCurrentProductId);
      getProductDetails(
        getCurrentProductId,
        diamondType,
        window.initData.data[0].shop,
        showRetailerInfo
      );

      //setinitdataload(true);
    }
    if (initdataload === true) {
      getInitFilterDiamondData(window.initData.data[0].dealerid);
      //setinitdataloadsimilar(true);
    }
    if (initdataloadsimilar === true) {
      getsimilarDiamondProductsData();
    }

    console.log("showRetailerInfo");
    console.log(showRetailerInfo);
  }, [
    initdataload,
    initdataloadsimilar,
    getdiamondFilterRange,
    // getdiamondFilterRange,
    // getselectedpageno,
    // getShape,
    // getcaratWeight,
    // getselectedpageSize,
    // getpageordertypeelected,
    // getascdescordertypeelected,
    // getminprice,
    // getColorId,
    // getCertificate,
    // getLabgown,
    // getFancyColor,
    // getPricemin,
    // getPricemax,
    // getTablemin,
    // getTablemax,
    // getDepthmin,
    // getDepthmax,
    // getFancyColordata,
    // getFancyIntensitydata,
    // getClarity,
    // getCut,
    // getSymmetry,
  ]);

  if (skeltonLoad == false) {
    return (
      <>
        <div className="gf-tool-container">
          <Skeleton height={80} />
          <Skeleton />
          <div className="Skeleton-type">
            <Skeleton count={9} height={60} />
          </div>
          <div className="Skeleton-settings">
            <div className="skeleton-div">
              <div className="skelton-info">
                {/* <h4 className="div-left"><Skeleton /></h4> */}
                <div className="div-right2">
                  {" "}
                  <Skeleton height={300} />
                </div>
              </div>
            </div>
            <div className="skeleton-div">
              <div className="skelton-info">
                {/* <h4 className="div-left"><Skeleton /></h4> */}
                <div className="div-right-price">
                  <Skeleton height={40} />
                  <Skeleton height={60} />
                  <Skeleton height={30} width={200} />
                  <Skeleton height={30} width={200} />
                  <Skeleton height={30} width={200} />
                  <Skeleton height={20} />
                  <Skeleton height={40} />
                  <div className="div-inner">
                    <div className="div-skelton-inner">
                      {" "}
                      <Skeleton height={40} />
                    </div>
                    <div className="div-skelton-inner">
                      {" "}
                      <Skeleton height={40} />
                    </div>
                  </div>
                  <Skeleton />
                </div>
              </div>
            </div>
          </div>
          <Skeleton />
        </div>
      </>
    );
  } else {
    return (
      <>
        {/* <ToastContainer
          position="bottom-center"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        /> */}

        <style>
          {`
          .gf-product-info .gf-product-controller ul li a:hover{
            color: ${window.initData["data"][0].hover_colour};
        }
        .gf-product-info .gf-product-controller ul li a:hover span i{
          background-color:${window.initData["data"][0].hover_colour};
           color:#fff;
        }
        .gf-product-info .gf-diamond-tryon .btn-diamond , .btn-tryon{
          background-color:${window.initData["data"][0].button_colour};
        }
        .gf-diamond-change-view ul li a:hover{
           background-color:${window.initData["data"][0].hover_colour};
        }
        
        .gf-diamond-change-view ul .gf-active a.listview , .gf-diamond-change-view ul .gf-active a.gf-grid-view-four{
            background-color:${window.initData["data"][0].hover_colour};
        }
        .gf-product-list-viewdata .table thead {
        background-color:${window.initData["data"][0].header_colour};
        }
        .gf-product-list-viewdata .table tbody tr:hover{
          background-color:${window.initData["data"][0].hover_colour};
        }
        
        .gf-btn:hover{
           background-color: ${window.initData["data"][0].hover_colour} !important;
        }
        .gf-btn{
          background-color: ${window.initData["data"][0].button_colour};
       }

        .gf-diamond-filter{
          background-color:${window.initData["data"][0].header_colour}; 
        }
        .gf-product-list-viewdata .gf-table thead{
           background-color:${window.initData["data"][0].header_colour}; 
        }
        .gf-product-list-viewdata .gf-table thead th{
          background-color:${window.initData["data"][0].header_colour}; 
       }
        .gf-diamond-filter .gf-navigation_filter_left .n_filter_left li.gf-active a {
                color: ${window.initData["data"][0].link_colour};
            }
            .gf-diamond-filter .gf-navigation_filter_left .n_filter_left li.gf-active{
              background-color:${window.initData["data"][0].hover_colour}; 
            }
            .gf-diamond-filter .gf-navigation_filter_left .n_filter_left li.gf-active span i{
                color: ${window.initData["data"][0].link_colour};
            }
            .gf-diamond-filter .gf-navigation_filter_left .n_filter_left li:hover a{
               background-color:${window.initData["data"][0].hover_colour}; 
                color: ${window.initData["data"][0].link_colour};
            }
            .gf-diamond-filter .gf-navigation_filter_left .n_filter_left li:hover span{
               background-color:${window.initData["data"][0].hover_colour}; 
            }
            .gf-diamond-filter .gf-navigation_filter_left .n_filter_left li:hover span i{
              color: ${window.initData["data"][0].link_colour};
            }
            .gf-diamond-filter .gf-save-reset-filter .gf-navigation_right li a:hover{
              color: #fff;
            }
            .gf-shapes ul .shapes_lists .shape_box:hover {
                background-color: ${window.initData["data"][0].hover_colour};                 
            }
            .gf-shapes ul .gf-active .shape_box{
                background-color: ${window.initData["data"][0].hover_colour} !important;
            }
        .range-slider_diamond .noUi-connect , .range-slider_diamond .noUi-horizontal .noUi-handle{
                background-color: ${window.initData["data"][0].slider_colour};
            }
            .gf-diamond-change-view ul .gf-active a.gf-grid-view-four , .gf-diamond-change-view ul .gf-active a.listview , .gf-diamond-change-view ul li a:hover , .gf-search-bar .gf-search-btn {
              background-color: ${window.initData["data"][0].button_colour};
            }
            .gf-search-product-listing .gf-product-grid-view li.gf-product-listing:hover a{
              color: ${window.initData["data"][0].hover_colour};
            }
            .gf-diamond-product-pagination .pagination .active .page-link ,  .gf-diamond-product-pagination .pagination li a.page-link:hover{
               background-color:${window.initData["data"][0].button_colour};
                  border-color: ${window.initData["data"][0].button_colour};
                  // color: ${window.initData["data"][0].link_colour};
            }
            .gf-btn-compare .gf-btn{
               background-color:${window.initData["data"][0].button_colour};
            }
            .gf-product-list-viewdata .gf-table tbody tr:hover{
              background-color:${window.initData["data"][0].hover_colour};
            }
            .ellipsis-data:hover .icon-hover i:hover{
              background-color: ${window.initData["data"][0].hover_colour};
              // color: ${window.initData["data"][0].link_colour};                  
              border-radius: 5px;
            }
            .ellipsis-data:hover .icon-hover i{
              color: ${window.initData["data"][0].header_colour};
            }
            // .ellipsis-data .info-diamond{
            //   color: ${window.initData["data"][0].header_colour};
            // }
            .gf-product-list-viewdata .gf-table tbody td.ellipsis-data{
              color: ${window.initData["data"][0].header_colour};
            }
        
            .gf-product-list-viewdata .gf-table tbody tr:hover td{
              color: #fff !important;
            }
             .gf-btn:hover{
               background-color: ${window.initData["data"][0].hover_colour} !important;
            }
            @media screen and (max-width: 991px) { 
                .shapes ul .shapes_lists .shape_box:hover {
                    background-color: inherit;
                }
            }
            .gf-product-info .gf-product-controller ul li a span i {
              background-color:${window.initData["data"][0].button_colour};
            }
            .gf-product-info .gf-diamond-tryon .btn-diamond, .btn-tryon{
              background-color:${window.initData["data"][0].button_colour};
            }
           
            .gf-search-product-listing .gf-product-grid-view li.gf-product-listing a.gf-slidebutton{
              color:${window.initData["data"][0].header_colour};
            }
            .gf-search-product-listing .gf-product-grid-view li.gf-product-listing a.gf-video-popup{
              color:${window.initData["data"][0].header_colour};
            }
            .gf-product-info__title h4.gf-ring-spacifacation a span i{
              color:${window.initData["data"][0].button_colour};
            }
            .gf-product-info__title h4.gf-ring-spacifacation a span i:hover{
              color:${window.initData["data"][0].hover_colour};
            }
            .gf-diamond-back-button a{
              color:${window.initData["data"][0].button_colour};
            }
            .gf-diamond-back-button a:hover{
              color:${window.initData["data"][0].hover_colour};
            }
            .react-responsive-modal-root .react-responsive-modal-closeButton
            {
              background-color:${window.initData["data"][0].button_colour};
            }
            .react-responsive-modal-root .react-responsive-modal-closeButton:hover
            {
              background-color:${window.initData["data"][0].hover_colour};
            }
            .gf-btn{
              background-color:${window.initData["data"][0].button_colour};
            }
            
           
            

            `}
        </style>
        <div className="gf-tool-container">
          <LoadingOverlay className="_gfloading_overlay_wrapper">
            <Loader fullPage loading={loaded} />
          </LoadingOverlay>

          <Topheader></Topheader>

          <div className="gf-diamond-back-button">
            <a href="javascript:;" onClick={handleBackButton}>
              <i className="fas fa-angle-double-left"></i>
              <span>Change Diamond</span>
            </a>
          </div>

          <div className="gf-product-info">
            <div className="gf-product-info__box">
              <div className="gf-product-info__image">
                <DiamondProductGallary productDetailsData={getProductData} />
              </div>
              <div className="gf-internam-use">
                <p>
                  Internal use Only:{" "}
                  <a
                    href="javascript:;"
                    // onClick={() => {
                    //   setOpenModel(true);
                    //   setshowRetailerInfo(true);
                    // }}
                    onClick={handleShowModel}
                  >
                    Click Here
                  </a>
                </p>
                <Modal
                  open={openModel}
                  onClose={() => setOpenModel(false)}
                  center
                  classNames={{
                    overlay: "popup_Overlay",
                    modal: "popup-internal-form",
                  }}
                >
                  <LoadingOverlay className="_gfloading_overlay_wrapper">
                    <Loader fullPage loading={loaded} />
                  </LoadingOverlay>
                  <div className="internal-use-form">
                    <form
                      className="internaluseform"
                      id="internaluseform"
                      onSubmit={handleintstorageSubmit}
                    >
                      <input
                        type="password"
                        id="auth_password"
                        name="password"
                        value={getyourpassword}
                        onChange={handleYourpassword}
                        placeholder="Enter Your Gemfind Password"
                      />
                      <p> {geterror.yourpassword} </p>

                      <button type="submit" title="Submit" className="gf-btn">
                        <span>Submit</span>
                      </button>
                    </form>
                  </div>
                </Modal>

                <Modal
                  open={openDelearModel}
                  onClose={() => setOpenDelearModel(false)}
                  center
                  classNames={{
                    overlay: "popup_Overlay",
                    modal: "popup_diamond-product",
                  }}
                >
                  <LoadingOverlay className="_gfloading_overlay_wrapper">
                    <Loader fullPage loading={loaded} />
                  </LoadingOverlay>
                  <div className="popup_content">
                    <div className="diamond-information">
                      <div className="spacification-info">
                        <h2>Vendor Information</h2>
                      </div>
                      <ul>
                        <li>
                          <div className="diamonds-details-title">
                            <p>Dealer Name</p>
                          </div>
                          <div className="diamonds-info">
                            <p>
                              {getProductData.retailerInfo.retailerName
                                ? getProductData.retailerInfo.retailerName
                                : "-"}
                            </p>
                          </div>
                        </li>
                        <li>
                          <div className="diamonds-details-title">
                            <p>Dealer Company</p>
                          </div>
                          <div className="diamonds-info">
                            <p>
                              {getProductData.retailerInfo.retailerCompany
                                ? getProductData.retailerInfo.retailerCompany
                                : "-"}
                            </p>
                          </div>
                        </li>
                        <li>
                          <div className="diamonds-details-title">
                            <p>Dealer City/State</p>
                          </div>
                          <div className="diamonds-info">
                            <p>
                              {getProductData.retailerInfo.retailerCity
                                ? getProductData.retailerInfo.retailerCity
                                : "-"}
                              /
                              {getProductData.retailerInfo.retailerState
                                ? getProductData.retailerInfo.retailerState
                                : "-"}
                            </p>
                          </div>
                        </li>
                        <li>
                          <div className="diamonds-details-title">
                            <p>Dealer Contact No.</p>
                          </div>
                          <div className="diamonds-info">
                            <p>
                              {getProductData.retailerInfo.retailerContactNo
                                ? getProductData.retailerInfo.retailerContactNo
                                : "-"}
                            </p>
                          </div>
                        </li>
                        <li>
                          <div className="diamonds-details-title">
                            <p>Dealer Email</p>
                          </div>
                          <div className="diamonds-info">
                            <p>
                              {getProductData.retailerInfo.retailerEmail
                                ? getProductData.retailerInfo.retailerEmail
                                : "-"}
                            </p>
                          </div>
                        </li>
                        <li>
                          <div className="diamonds-details-title">
                            <p>Dealer Lot number of the item</p>
                          </div>
                          <div className="diamonds-info">
                            <p>
                              {getProductData.retailerInfo.retailerLotNo
                                ? getProductData.retailerInfo.retailerLotNo
                                : "-"}
                            </p>
                          </div>
                        </li>
                        <li>
                          <div className="diamonds-details-title">
                            <p>Dealer Stock number of the item</p>
                          </div>
                          <div className="diamonds-info">
                            <p>
                              {getProductData.retailerInfo.retailerStockNo
                                ? getProductData.retailerInfo.retailerStockNo
                                : "-"}
                            </p>
                          </div>
                        </li>
                        <li>
                          <div className="diamonds-details-title">
                            <p>Wholesale Price</p>
                          </div>
                          <div className="diamonds-info">
                            <p>
                              {window.currency}
                              {getProductData.retailerInfo.wholesalePrice
                                ? getProductData.retailerInfo.wholesalePrice
                                : "-"}
                            </p>
                          </div>
                        </li>
                        <li>
                          <div className="diamonds-details-title">
                            <p>Third Party</p>
                          </div>
                          <div className="diamonds-info">
                            <p>
                              {getProductData.retailerInfo.thirdParty
                                ? getProductData.retailerInfo.thirdParty
                                : "-"}
                            </p>
                          </div>
                        </li>
                        <li>
                          <div className="diamonds-details-title">
                            <p>Diamond Id</p>
                          </div>
                          <div className="diamonds-info">
                            <p>
                              {getProductData.diamondId
                                ? getProductData.diamondId
                                : "-"}
                            </p>
                          </div>
                        </li>
                        <li>
                          <div className="diamonds-details-title">
                            <p>Seller Name</p>
                          </div>
                          <div className="diamonds-info">
                            <p>
                              {getProductData.retailerInfo.sellerName
                                ? getProductData.retailerInfo.sellerName
                                : "-"}
                            </p>
                          </div>
                        </li>
                        <li>
                          <div className="diamonds-details-title">
                            <p>Seller Address</p>
                          </div>
                          <div className="diamonds-info">
                            <p>
                              {getProductData.retailerInfo.sellerAddress
                                ? getProductData.retailerInfo.sellerAddress
                                : "-"}
                            </p>
                          </div>
                        </li>
                        <li>
                          <div className="diamonds-details-title">
                            <p>Dealer Fax</p>
                          </div>
                          <div className="diamonds-info">
                            <p>
                              {getProductData.retailerInfo.retailerFax
                                ? getProductData.retailerInfo.retailerFax
                                : "-"}
                            </p>
                          </div>
                        </li>
                        <li>
                          <div className="diamonds-details-title">
                            <p>Dealer Address</p>
                          </div>
                          <div className="diamonds-info">
                            <p>
                              {getProductData.retailerInfo.retailerAddress
                                ? getProductData.retailerInfo.retailerAddress
                                : "-"}
                            </p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </Modal>
              </div>
            </div>
            <div className="gf-product-info__detail">
              <DiamondProductInformation productDetailsData={getProductData} />
            </div>
          </div>
          <div className="gf-SettingsContainer" id="diamondDetailScrollUp">
            <DiamondDetailsListing
              getDataSettingProductData={getDataSettingProduct}
              productCount={getProductCount}
              pagesize={getselectedpageSize}
              changedpagesize={handlechangedpagesize}
              currentpageno={currentpagevalue}
              totalPages={getTotalPage}
              startPage={getStartPage}
              endPage={getEndPage}
              orderbytype={pageorderbytype}
              orderType={ascdesctype}
              tabvalue={getFancyColor}
              productDetailsData={getProductData}
              diamondFilterRange={getFilterData}
              diamondFilterRangeResponse={diamondFilterRangeOfInHouse}
            />
          </div>
        </div>
      </>
    );
  }
};

export default DiamondSettingDetails;
