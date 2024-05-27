import React, { useEffect, useState } from "react";

import Table from "react-bootstrap/Table";
import Topheader from "../elements/Topheader";

import Filter from "./settings-element/Filter";
import DiamondShape from "./settings-element/DiamondShape";
import CutSlider from "./settings-element/CutSlider";
import ColorSlider from "./settings-element/ColorSlider";
import FancyColorSlider from "./settings-element/FancyColorSlider";
import FancyIntensity from "./settings-element/FancyIntensity";
import ClaritySlider from "./settings-element/ClaritySlider";
import CaratSlider from "./settings-element/CaratSlider";
import PriceSlider from "./settings-element/PriceSlider";
import DiamondSettingsProducts from "./settings-element/DiamondSettingsProducts";
import Skeleton from "react-loading-skeleton";
import { LoadingOverlay, Loader } from "react-overlay-loader";
import DepthSlider from "./settings-element/DepthSlider";
import TableSlider from "./settings-element/TableSlider";
import PolishSlider from "./settings-element/PolishSlider";
import FluorescenceSlider from "./settings-element/FluorescenceSlider";
import SymmetrySlider from "./settings-element/SymmetrySlider";
import Certificates from "./settings-element/Certificates";
import { useCookies } from "react-cookie";
import { useLocation } from "react-router-dom";
import emerald from "../../images/emerald_Large.jpg";
import marquise from "../../images/marquise_Large.png";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const DiamondtoolSetting = (props) => {
  // const location = useLocation();
  // var productUrl = location.pathname;
  // var part = productUrl.substring(productUrl.lastIndexOf("/") + 1);
  // console.log("First");

  // console.log(part);

  // if (part === "") {
  //   part = productUrl.substring(productUrl.lastIndexOf("/") - 2);
  //   console.log("Second");
  //   console.log(part);
  // }

  const location = useLocation();
  var productUrl = location.pathname;
  var parts = productUrl.split("/"); // Split the pathname into an array
  var part = parts[parts.length - 1]; // Get the last part of the array
  // console.log("First");
  // console.log(part);

  if (part === "") {
    part = parts[parts.length - 2]; // Get the second-to-last part of the array
    // console.log("Second");
    // console.log(part);
  }

  const [shape, setShape] = useState([]);
  const [getshapeselected, shapeselected] = useState("");
  const [getSelectedCut, setSelectedCut] = useState("");
  const [initCut, setinitCut] = useState(false);
  const [getSelectedColor, setSelectedColor] = useState("");
  const [initColor, setinitColor] = useState(false);
  const [getSelectedClarity, setSelectedClarity] = useState("");
  const [getSelectedfancyColor, setSelectedfancyColor] = useState("");
  const [getSelectedintensity, setSelectedintensity] = useState("");
  const [inticlarit, setinitClarity] = useState(false);
  const [getCaratmin, setCaratmin] = useState("");
  const [getCaratmax, setCaratmax] = useState("");
  const [getPricemin, setPricemin] = useState("");
  const [getPricemax, setPricemax] = useState("");
  const [getDepthmin, setDepthmin] = useState("");
  const [getDepthmax, setDepthmax] = useState("");
  const [getTablemin, setTablemin] = useState("");
  const [getTablemax, setTablemax] = useState("");
  const [getDataSettingProduct, setDataSettingProduct] = useState([]);
  const [getProductCount, setProductCount] = useState("");
  const [skeltonLoad, setskeltonLoad] = useState(false);
  const [getDiamondCut, setDiamondCut] = useState([]);
  const [getDiamondColor, setDiamondColor] = useState([]);
  const [getDiamondClarity, setDiamondClarity] = useState([]);
  const [getDiamondCarat, setDiamondCarat] = useState([]);
  const [getpriceRange, setpriceRange] = useState([]);
  const [getPolish, setPolish] = useState([]);
  const [getfluorescenceRangeData, setfluorescenceRangeData] = useState([]);
  const [getsymmetry, setsymmetry] = useState([]);
  const [getcertificate, setcertificate] = useState([]);
  const [getSelectedpolish, setSelectedpolish] = useState("");
  const [getinitpolish, setinitpolish] = useState(false);
  const [getSelectedfluore, setSelectedfluore] = useState("");
  const [getinitfluore, setinitfluore] = useState(false);
  const [getSelectedsymmetry, setSelectedsymmetry] = useState("");
  const [getinitsymmetry, setinitsymmetry] = useState(false);
  const [getDepth, setDepth] = useState([]);
  const [getTable, setTable] = useState([]);
  const [getTotalPage, setTotalPage] = useState(35);
  const [getStartPage, setStartPage] = useState(1);
  const [getEndPage, setEndPage] = useState(12);
  const [getselectedpageSize, setpageSizeselected] = useState("20");
  const [getselectedpageno, setselectedpageno] = useState("1");
  const [loaded, setLoaded] = useState(false);
  const [getpageordertypeelected, setpageordertypeelected] = useState("");
  const [getascdescordertypeelected, setascdescordertypeelected] = useState("");
  const [getdiamondFilterRange, setdiamondFilterRange] = useState("");
  const [intskeltonLoad, setintskeltonLoad] = useState(false);
  const [certificateType, setcertificateType] = useState("");

  const [getfilledsearch, setfilledsearch] = useState("");
  const [getDiamondDepth, setDiamondDepth] = useState([]);
  const [gettabname, settabname] = useState("");
  const [loadvarible, setloadvariable] = useState(false);
  const [cookies, setCookie] = useCookies(["_wpsavediamondfiltercookie"]);
  const [getlabcookies, setlabcookies] = useCookies([
    "_wpsavedlabgowndiamondfiltercookie",
  ]);
  const [getfancycookies, setfancycookies] = useCookies([
    "_wpsavedfancydiamondfiltercookie",
  ]);
  const [getcomparecookies, setcomparecookies] = useCookies([
    "_wpsavedcompareproductcookie",
  ]);
  const [getCompareCount, setCompareCount] = useState();
  const [getIntensity, setIntensity] = useState([]);
  const [getFancyColor, setFancyColor] = useState([]);
  const [getFancyStatus, setFancyStatus] = useState(false);
  const [getsettingcookies, setsettingcookies] = useCookies([
    "_shopify_ringsetting",
  ]);
  const [getdiamondcookies, setdiamondcookies] = useCookies([
    "_shopify_diamondsetting",
  ]);
  const [getbrowserdiamondcookies, setbrowserdiamondcookies, removeCookie] =
    useCookies(["shopify_diamondbackvalue"]);
  const [getDiamondCookie, setDiamondCookie] = useState(false);
  const [getsettingcookie, setsettingcookie] = useState(false);
  const [getfirsttimeload, setfirsttimeload] = useState(false);
  const [getDiamondCompareArrayCookie, setDiamondCompareArrayCookie] = useState(
    []
  );
  const [getfinalcomparedata, setfinalcomparedata] = useState([]);
  const [getcomparecookie, setcomparecookie] = useCookies([
    "finalcompareproductcookie",
  ]);
  const [getcookie, setcookie] = useCookies(["compareproductcookie"]);
  const [getCPDiamondTypecookie, setCPDiamondTypecookie] = useCookies([
    "compareProductDiamondTypeCookie",
  ]);

  const [getinitcookies, setinitcookies] = useCookies(["getinitcookies"]);

  const [initdataload, setinitdataload] = useState(false);
  const [loadcomparedata, setloadcomparedata] = useState(false);
  const [skeletoncomparedata, setskeletoncomparedata] = useState(false);
  const [getShowPriceFilter, setShowPriceFilter] = useState();
  const [getQuerySearchShape, setQuerySearchShape] = useState("0");

  var compareurl = location.pathname.includes("compare");

  const [getlabsetting, setlabsetting] = useState("");
  const [getminedsetting, setminedsetting] = useState("");
  const [getfcsetting, setfcsetting] = useState("");
  const [getcomparesetting, setcomparesetting] = useState("");
  const [getFilterData, setFilterData] = useState("");

  const search = useLocation().search;
  const searchshape = new URLSearchParams(search).get("shape");

  const isUpperCase = (searchshape) =>
    searchshape === searchshape.toUpperCase();

  const isLowerCase = (searchshape) =>
    searchshape === searchshape.toLowerCase();

  const capitalize = (searchshape) =>
    searchshape.charAt(0).toUpperCase() + searchshape.slice(1).toLowerCase();

  const [count, setCount] = useState(0);

  const navigate = useNavigate();

  const shapeName = (shapeName) => {
    shapeselected(shapeName);
    console.log("shapeName");
    console.log(shapeName);
    setQuerySearchShape("1");
    setLoaded(true);
  };

  // Define the handler function to handle order type changes
  const handleOrderTypeChange = (selectedOrderType) => {
    // Update the state with the selected order type
    console.log("selectedOrderType");
    console.log(selectedOrderType);

    if (selectedOrderType === "Show All Cerificate") {
      setcertificateType("");
    } else {
      setcertificateType(selectedOrderType);
    }
  };

  //console.log(props);

  const cutName = (cutName) => {
    const startCut = cutName[0];
    const endCut = cutName[1] - 1;
    // console.log("getDiamondCut");
    // console.log(getDiamondCut);

    var res = getDiamondCut.filter(function (v) {
      return v.cutId >= parseInt(startCut) && v.cutId <= parseInt(endCut);
    });
    const finalCut = res
      .map(function (m) {
        return m.cutId;
      })
      .join(",");

    if (getSelectedCut !== finalCut) {
      setSelectedCut(finalCut);
      setLoaded(true);
    }
  };

  const inticutname = (cutName) => {
    setinitCut(cutName);
    setLoaded(true);
  };

  const fancyColorName = (colorName) => {
    const startCut = colorName[0];
    const endCut = colorName[1] - 1;
    var res = getFancyColor.filter(function (v) {
      return v.$id >= parseInt(startCut) && v.$id <= parseInt(endCut);
    });

    const finalfancycolor = res
      .map(function (m) {
        return m.diamondColorName;
      })
      .join(",");

    setSelectedfancyColor(finalfancycolor);
    setLoaded(true);
  };
  const fancyintensityname = (cutName) => {
    const startCut = cutName[0];
    const endCut = cutName[1] - 1;
    var res = getIntensity.filter(function (v) {
      return v.$id >= parseInt(startCut) && v.$id <= parseInt(endCut);
    });

    const finalIntensity = res
      .map(function (m) {
        return m.intensityName;
      })
      .join(",");

    setSelectedintensity(finalIntensity);
    // setTimeout(() => {
    setLoaded(true);
    // }, 500);
  };

  //POLISH NAME
  const polishName = (polishName) => {
    const startpolish = polishName[0];
    const endpolish = polishName[1] - 1;
    var res = getPolish.filter(function (v) {
      return (
        v.polishId >= parseInt(startpolish) && v.polishId <= parseInt(endpolish)
      );
    });

    const finalpolish = res
      .map(function (m) {
        return m.polishId;
      })
      .join(",");

    setSelectedpolish(finalpolish);
    setTimeout(() => {
      setLoaded(true);
    }, 500);
  };

  const intpolishname = (polishName) => {
    setinitpolish(polishName);
    setLoaded(true);
  };

  //POLISH NAME
  const fluoreName = (fluoreName) => {
    const startfluore = fluoreName[0];
    const endfluore = fluoreName[1] - 1;
    var res = getfluorescenceRangeData.filter(function (v) {
      return (
        v.fluorescenceId >= parseInt(startfluore) &&
        v.fluorescenceId <= parseInt(endfluore)
      );
    });

    const finalfluorescence = res
      .map(function (m) {
        return m.fluorescenceId;
      })
      .join(",");

    setSelectedfluore(finalfluorescence);

    console.log("finalfluorescence");
    console.log(finalfluorescence);

    setTimeout(() => {
      setLoaded(true);
    }, 500);
  };

  const intfluore = (fluoreName) => {
    setinitfluore(fluoreName);
    setLoaded(true);
  };

  //SYMETRIC NAME
  const symmetryName = (symmetryName) => {
    const startsymmetry = symmetryName[0];
    const endsymmetry = symmetryName[1] - 1;
    var res = getsymmetry.filter(function (v) {
      return (
        v.symmetryId >= parseInt(startsymmetry) &&
        v.symmetryId <= parseInt(endsymmetry)
      );
    });

    const finalsymmetry = res
      .map(function (m) {
        return m.symmetryId;
      })
      .join(",");

    setSelectedsymmetry(finalsymmetry);
    console.log("finalsymmetry");
    console.log(finalsymmetry);
    setTimeout(() => {
      setLoaded(true);
    }, 500);
  };

  const initsymmetry = (symmetryName) => {
    setinitsymmetry(symmetryName);
    setLoaded(true);
  };

  const colorName = (colorName) => {
    const startColor = colorName[0];
    const endColor = colorName[1] - 1;
    var res = getDiamondColor.filter(function (v) {
      return (
        v.colorId >= parseInt(startColor) && v.colorId <= parseInt(endColor)
      );
    });

    const finalColor = res
      .map(function (m) {
        return m.colorId;
      })
      .join(",");
    setSelectedColor(finalColor);
    setTimeout(() => {
      setLoaded(true);
    }, 500);
  };

  const inticolorname = (colorName) => {
    setinitColor(colorName);
    setLoaded(false);
  };

  const clarityName = (clarityName) => {
    const startColor = clarityName[0];
    const endColor = clarityName[1] - 1;
    var res = getDiamondClarity.filter(function (v) {
      return (
        v.clarityId >= parseInt(startColor) && v.clarityId <= parseInt(endColor)
      );
    });
    const finalClarity = res
      .map(function (m) {
        return m.clarityId;
      })
      .join(",");
    setSelectedClarity(finalClarity);
    // setTimeout(() => {
    //   setLoaded(true);
    // }, 500);
  };

  const inticlarityname = (clarityName) => {
    setinitClarity(clarityName);
    // setLoaded(false);
  };

  // const caratSliderValue = (caratValue) => {
  //   setCaratmin(caratValue[0]);
  //   setCaratmax(caratValue[1]);
  //   setLoaded(true);
  // };

  const caratSliderValue = (caratValue) => {
    if (
      window.minicarat !== caratValue[0] ||
      window.maxcarat !== caratValue[1]
    ) {
      // console.log(caratValue[0]);
      // console.log(caratValue[1]);
      setCaratmin(caratValue[0]);
      setCaratmax(caratValue[1]);
      window.minicarat = caratValue[0];
      window.maxcarat = caratValue[1];
      setLoaded(true);
    }

    //console.log(getCaratmin);
  };

  // const depthSliderValue = (depthValue) => {
  //   setDepthmin(depthValue[0]);
  //   setDepthmax(depthValue[1]);
  //   setLoaded(true);
  // };

  const depthSliderValue = (depthValue) => {
    if (
      window.minidepth !== depthValue[0] ||
      window.maxdepth !== depthValue[1]
    ) {
      setDepthmin(parseInt(depthValue[0]));
      setDepthmax(parseInt(depthValue[1]));
      window.minidepth = depthValue[0];
      window.maxdepth = depthValue[1];
      setLoaded(true);
    }
  };

  // const tableSliderValue = (tableValue) => {
  //   setTablemin(tableValue[0]);
  //   setTablemax(tableValue[1]);
  //   setLoaded(true);
  // };

  const tableSliderValue = (tableValue) => {
    if (
      window.minitable !== tableValue[0] ||
      window.maxtable !== tableValue[1]
    ) {
      setTablemin(parseInt(tableValue[0]));
      setTablemax(parseInt(tableValue[1]));
      window.minitable = tableValue[0];
      window.maxtable = tableValue[1];
      setLoaded(true);
    }
  };

  // const priceSliderValue = (priceValue) => {
  //   setPricemin(priceValue[0]);
  //   setPricemax(priceValue[1]);
  //   setLoaded(true);
  // };

  const priceSliderValue = (priceValue) => {
    if (
      window.miniprice !== priceValue[0] ||
      window.maxprice !== priceValue[1]
    ) {
      setPricemin(parseInt(priceValue[0]));
      setPricemax(parseInt(priceValue[1]));
      window.miniprice = priceValue[0];
      window.maxprice = priceValue[1];
      setLoaded(true);
    }
  };

  const pagesizevalue = (sizevalue) => {
    setpageSizeselected(sizevalue);
    setLoaded(true);
  };

  const pageorderbytype = (type) => {
    // console.log("type");
    // console.log(type);
    getDiamondProductsData(type, getascdescordertypeelected, getselectedpageno);
    setpageordertypeelected(type);
    setLoaded(true);
  };

  const ascdesctype = (type1) => {
    // console.log("type1");
    // console.log(type1);
    if (getascdescordertypeelected !== type1) {
      getDiamondProductsData(getpageordertypeelected, type1, getselectedpageno);
      setascdescordertypeelected(type1);
      setLoaded(true);
    }
  };

  const diamondFilterRangeOfInHouse = (type) => {
    // console.log("type in House");
    // console.log(type);

    if (type !== "view all") {
      setdiamondFilterRange(type);
    } else {
      setdiamondFilterRange("");
    }
    setLoaded(true);
  };

  const currentpagevalue = (currentPage) => {
    getDiamondProductsData(
      getpageordertypeelected,
      getascdescordertypeelected,
      currentPage
    );
    setselectedpageno(currentPage);
    setLoaded(true);
  };

  const searchValueCurrent = (searchval) => {
    //console.log(searchval);
    if (getfilledsearch !== searchval) {
      setfilledsearch(searchval);
      setLoaded(true);
    }
  };

  const tabvalue = (tabname) => {
    settabname(tabname);
    setLoaded(true);
    setfirsttimeload(true);
    setinitdataload(false);
    setloadvariable(false);
    getInitFilterDiamondData(window.initData.data[0].dealerid, tabname);
    // console.log("tabname");

    // console.log(tabname);
    if (gettabname === "mined") {
      if (
        getsettingcookies._shopify_ringsetting &&
        getsettingcookies._shopify_ringsetting[0].setting_id
      ) {
        shapeselected(getsettingcookies._shopify_ringsetting[0].centerStoneFit);
      }
    }
    if (gettabname === "labgrown") {
      if (
        getsettingcookies._shopify_ringsetting &&
        getsettingcookies._shopify_ringsetting[0].setting_id
      ) {
        shapeselected(getsettingcookies._shopify_ringsetting[0].centerStoneFit);
      }
    }

    if (gettabname === "fancycolor") {
      if (
        getsettingcookies._shopify_ringsetting &&
        getsettingcookies._shopify_ringsetting[0].setting_id
      ) {
        shapeselected(getsettingcookies._shopify_ringsetting[0].centerStoneFit);
      }
    }

    //   //END OF  FIRST TIME LOAD
    //}
  };

  const [getgrid, setgrid] = useState(true);
  const [getlist, setlist] = useState(false);
  const onOpenGrid = (e) => {
    e.preventDefault();
    setgrid(false);
    setlist(true);
  };
  const onOpenList = (e) => {
    e.preventDefault();
    setlist(false);
    setgrid(true);
  };

  const saveSearch = () => {
    setLoaded(true);
    setTimeout(() => {
      setLoaded(false);
    }, 3000);
  };

  const onClickDelete = (e) => {
    e.preventDefault();
    setLoaded(true);

    var deleteproduct = [];
    if (
      getcomparecookies._wpsavedcompareproductcookie &&
      getcomparecookies._wpsavedcompareproductcookie !== ""
    ) {
      deleteproduct = JSON.parse(
        JSON.stringify(getcomparecookies._wpsavedcompareproductcookie)
      );
    }

    var index = deleteproduct.indexOf(e.target.id);
    if (index !== -1) {
      deleteproduct.splice(index, 1);
    }

    if (deleteproduct !== "") {
      setCookie("_wpsavedcompareproductcookie", JSON.stringify(deleteproduct), {
        path: "/",
        maxAge: 604800,
      });
    }

    var deletecpproduct = [];
    if (
      getcookie.compareproductcookie &&
      getcookie.compareproductcookie !== ""
    ) {
      deletecpproduct = JSON.parse(
        JSON.stringify(getcookie.compareproductcookie)
      );
    }

    var indexcp = deletecpproduct.indexOf(e.target.id);
    if (indexcp !== -1) {
      deletecpproduct.splice(indexcp, 1);
    }

    if (deletecpproduct !== "") {
      setCookie("compareproductcookie", JSON.stringify(deletecpproduct), {
        path: "/",
        maxAge: 604800,
      });
    }

    // DELETE product from  getCPDiamondTypecookie
    var deleteCPDiamondTypeProduct = [];
    if (
      getCPDiamondTypecookie.compareProductDiamondTypeCookie &&
      getCPDiamondTypecookie.compareProductDiamondTypeCookie !== ""
    ) {
      deleteCPDiamondTypeProduct = JSON.parse(
        JSON.stringify(getCPDiamondTypecookie.compareProductDiamondTypeCookie)
      );
    }

    var indexcp = deleteCPDiamondTypeProduct.indexOf(e.target.id);
    if (indexcp !== -1) {
      deleteCPDiamondTypeProduct.splice(indexcp, 1);
    }

    if (deleteCPDiamondTypeProduct !== "") {
      setCookie(
        "compareProductDiamondTypeCookie",
        JSON.stringify(deleteCPDiamondTypeProduct),
        {
          path: "/",
          maxAge: 604800,
        }
      );
    }

    //console.log(getCPDiamondTypecookie.compareproductcookie);

    var delLocaldatarb = JSON.parse(
      JSON.stringify(getcomparecookie.finalcompareproductcookie)
    );
    var removeLocaldata = delLocaldatarb.map(
      (delLocaldatarb) => delLocaldatarb.diamondId == e.target.id
    );
    var indexid = delLocaldatarb.findIndex(
      (delLocaldatarb) => delLocaldatarb.diamondId == e.target.id
    );

    if (indexid !== -1) {
      delLocaldatarb.splice(indexid, 1);
    }

    if (delLocaldatarb !== "") {
      setCookie("finalcompareproductcookie", JSON.stringify(delLocaldatarb), {
        path: "/",
        maxAge: 604800,
      });
    }

    if (compareurl === true && window.compareproduct.length <= 1) {
      // console.log("inside here");
      navigate(`${process.env.PUBLIC_URL}`);
      window.location.reload();
    }

    settabname("compare");

    setTimeout(() => {
      setLoaded(false);
    }, 1000);

    //setLoaded(false);
  };

  // GET FILTER PRODUCT
  const getInitFilterDiamondData = async (DealerID, tabname) => {
    try {
      // console.log("tabname");
      // console.log(tabname);

      // console.log(getminedsetting);

      // if (initdataload === true) {
      if (tabname === "fancycolor") {
        var url =
          `${window.initData.data[0].filterapifancy}DealerID=` + DealerID;
      } else if (tabname === "labgrown") {
        var url =
          `${window.initData.data[0].filterapi}DealerID=` +
          DealerID +
          "&IsLabGrown=True";
      } else {
        var url = `${window.initData.data[0].filterapi}DealerID=` + DealerID;
      }
      // }

      // if (initdataload === false) {
      //   if (tabname === "fancycolor") {
      //     var url =
      //       `${window.initData.data[0].filterapifancy}DealerID=` + DealerID;
      //   } else if (tabname === "labgrown") {
      //     var url =
      //       `${window.initData.data[0].filterapi}DealerID=` +
      //       DealerID +
      //       "&IsLabGrown=True";
      //   } else {
      //     var url =
      //       `https://api.jewelcloud.com/api/RingBuilder/GetInitialFilter?DealerID=` +
      //       DealerID;
      //   }
      //   setinitdataload(true);
      // }

      const res = await fetch(url);
      // console.log("filter url");
      // console.log(url);
      const acrualRes = await res.json();

      // console.log(acrualRes[1][0].diamondFilterRange);

      if (acrualRes[1][0].diamondFilterRange) {
        setFilterData(acrualRes[1][0].diamondFilterRange);
      } else {
        setFilterData("");
      }

      setShowPriceFilter(acrualRes[1][0].isShowPrice);
      setShape(acrualRes[1][0].shapes);

      // console.log(acrualRes[1][0].shapes);
      //DYNAMIC CUT
      if (tabname !== "fancycolor") {
        var cutData = acrualRes[1][0].cutRange;
        var dynamicLastCut = acrualRes[1][0].cutRange.length + 1;
        cutData.push({
          $id: "000",
          cutId: dynamicLastCut.toString(),
          cutName: "Last",
        });
        setDiamondCut(cutData);

        //DYNAMIC COLOR

        var colorData = acrualRes[1][0].colorRange;

        //if (colorData.length > 0) {
        var dynamicLastColor =
          Number(
            acrualRes[1][0].colorRange[acrualRes[1][0].colorRange.length - 1]
              .colorId
          ) + 1;
        colorData.push({
          $id: "000",
          colorId: dynamicLastColor.toString(),
          colorName: "Last",
        });
        setDiamondColor(colorData);
        //}
      }

      if (tabname === "fancycolor") {
        var intensityData = acrualRes[1][0].intensity;
        var dynamicIntensity =
          Number(
            acrualRes[1][0].intensity[acrualRes[1][0].intensity.length - 1].$id
          ) + 1;
        intensityData.push({
          $id: dynamicIntensity.toString(),
          intensityName: "Last",
        });

        setIntensity(intensityData);

        //DYNAMIC COLOR
        var fancycolorData = acrualRes[1][0].diamondColorRange;
        var dynamicLastColor =
          Number(
            acrualRes[1][0].diamondColorRange[
              acrualRes[1][0].diamondColorRange.length - 1
            ].$id
          ) + 1;
        fancycolorData.push({
          $id: dynamicLastColor.toString(),
          diamondColorId: "last",
          diamondColorImagePath: "",
          diamondColorName: "Last",
        });
        setFancyColor(fancycolorData);
        //console.log("init fancycolor");
        //console.log(getFancyColor);

        // THIS IS TO GET INIT TIME LOAD ALL DATA
        const startInt = acrualRes[1][0].intensity[0].$id;
        const endInt =
          acrualRes[1][0].intensity[acrualRes[1][0].intensity.length - 1].$id;
        var intensityres = acrualRes[1][0].intensity.filter(function (v) {
          return v.$id >= parseInt(startInt) && v.$id <= parseInt(endInt);
        });
        const initfinalinten = intensityres
          .map(function (m) {
            return m.intensityName;
          })
          .join(",");
        //setSelectedintensity(initfinalinten);
        if (
          getfancycookies._wpsavedfancydiamondfiltercookie &&
          getfancycookies._wpsavedfancydiamondfiltercookie
            .selectedfancyIntensity
        ) {
          setSelectedintensity(
            getfancycookies._wpsavedfancydiamondfiltercookie
              .selectedfancyIntensity
          );
        } else {
          setSelectedintensity(initfinalinten);
        }
        //console.log("init intensity");
        //console.log(getSelectedintensity);

        // THIS IS TO GET INIT TIME LOAD ALL DATA
        const startFancy = acrualRes[1][0].diamondColorRange[0].$id;
        const endFancy =
          acrualRes[1][0].diamondColorRange[
            acrualRes[1][0].diamondColorRange.length - 1
          ].$id;
        var resfancycolor = acrualRes[1][0].diamondColorRange.filter(function (
          v
        ) {
          return v.$id >= parseInt(startFancy) && v.$id <= parseInt(endFancy);
        });

        const finalfancycd = resfancycolor
          .map(function (m) {
            return m.diamondColorName;
          })
          .join(",");
        if (
          getfancycookies._wpsavedfancydiamondfiltercookie &&
          getfancycookies._wpsavedfancydiamondfiltercookie.selectedfancyColor
        ) {
          setSelectedfancyColor(
            getfancycookies._wpsavedfancydiamondfiltercookie.selectedfancyColor
          );
        } else {
          setSelectedfancyColor(finalfancycd);
        }
        setFancyStatus(true);
      }

      // //console.log("tabname==" + gettabname);

      //DYNAMIC Clarity
      var clarityRange = acrualRes[1][0].clarityRange;
      var dynamicLastClarity =
        Number(
          acrualRes[1][0].clarityRange[acrualRes[1][0].clarityRange.length - 1]
            .clarityId
        ) + 1;
      clarityRange.push({
        $id: "46",
        clarityId: dynamicLastClarity.toString(),
        clarityName: "Last",
      });
      setDiamondClarity(clarityRange);
      setDiamondCarat(acrualRes[1][0].caratRange);
      setDepth(acrualRes[1][0].depthRange);
      setTable(acrualRes[1][0].tableRange);

      var polishRangeData = acrualRes[1][0].polishRange;
      var dynamicLastpolish = acrualRes[1][0].polishRange.length + 1;
      polishRangeData.push({
        $id: "000",
        polishId: dynamicLastpolish.toString(),
        polishName: "Last",
      });
      setPolish(polishRangeData);

      var fluorescenceRangeData = acrualRes[1][0].fluorescenceRange;
      var fluorescenceRangeDatalast =
        acrualRes[1][0].fluorescenceRange.length + 1;
      fluorescenceRangeData.push({
        $id: "000",
        fluorescenceId: fluorescenceRangeDatalast.toString(),
        fluorescenceName: "Last",
      });
      setfluorescenceRangeData(fluorescenceRangeData);

      var symmetryRangeData = acrualRes[1][0].symmetryRange;
      var dynamicLastsymmetry = acrualRes[1][0].symmetryRange.length + 1;
      symmetryRangeData.push({
        $id: "000",
        symmetryId: dynamicLastsymmetry.toString(),
        symmteryName: "Last",
      });
      setsymmetry(symmetryRangeData);
      console.log("acrualRes[1][0].certificateRange");
      console.log(acrualRes[1][0].certificateRange);

      setcertificate(acrualRes[1][0].certificateRange);
      setpriceRange(acrualRes[1][0].priceRange);

      window.minicarat = parseInt(acrualRes[1][0].caratRange[0].minCarat);
      window.maxcarat = parseInt(acrualRes[1][0].caratRange[0].maxCarat);

      setintskeltonLoad(true);

      if (!getinitcookies.getinitcookies) {
        getInitFiltersData(DealerID, gettabname);
        setinitcookies("getinitcookies", true);
      }

      setTimeout(() => {
        setinitdataload(true);
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  const getInitFiltersData = async (DealerID, tabname) => {
    try {
      var url =
        `https://api.jewelcloud.com/api/RingBuilder/GetInitialFilter?DealerID=` +
        DealerID;

      const res = await fetch(url);
      const acrualRes = await res.json();
      // console.log("acrualRes");
      // console.log(acrualRes[1][0].shapes);

      // setShape(acrualRes[1][0].shapes);

      if (
        acrualRes &&
        acrualRes[1] &&
        acrualRes[1][0] &&
        acrualRes[1][0].shapes
      ) {
        const shapeNames = acrualRes[1][0].shapes
          .map((shape) => shape.shapeName)
          .join(",");
        shapeselected(shapeNames);
      }

      // selectedShape()

      if (acrualRes[1][0].diamondFilterRange) {
        setFilterData(acrualRes[1][0].diamondFilterRange);
      } else {
        setFilterData();
      }

      setCaratmin(acrualRes[1][0].caratRange[0].minCarat);
      setCaratmax(acrualRes[1][0].caratRange[0].maxCarat);

      setPricemax(acrualRes[1][0].priceRange[0].maxPrice);
      setPricemin(acrualRes[1][0].priceRange[0].minPrice);

      setDepthmax(acrualRes[1][0].depthRange[0].maxDepth);
      setDepthmin(acrualRes[1][0].depthRange[0].minDepth);

      setTablemax(acrualRes[1][0].tableRange[0].maxTable);
      setTablemin(acrualRes[1][0].tableRange[0].minTable);

      if (tabname !== "fancycolor") {
        var cutData = acrualRes[1][0].cutRange;

        if (cutData.length > 0) {
          const startCut = cutData[0].cutId;

          const endCut = cutData[cutData.length - 1].cutId;

          var res1 = cutData.filter(function (v) {
            return v.cutId >= parseInt(startCut) && v.cutId <= parseInt(endCut);
          });
          const finalCut = res1
            .map(function (m) {
              return m.cutId;
            })
            .join(",");

          // console.log("finalCut");
          // console.log(finalCut);

          setSelectedCut(finalCut);
        }

        //DYNAMIC COLOR

        var colorData = acrualRes[1][0].colorRange;

        if (colorData.length > 0) {
          const startColor = colorData[0].colorId;
          const endColor = colorData[colorData.length - 1].colorId;

          var res2 = colorData.filter(function (v) {
            return (
              v.colorId >= parseInt(startColor) &&
              v.colorId <= parseInt(endColor)
            );
          });

          const finalColor = res2
            .map(function (m) {
              return m.colorId;
            })
            .join(",");
          setSelectedColor(finalColor);
        }
      }

      //DYNAMIC Clarity
      var clarityRange = acrualRes[1][0].clarityRange;
      if (clarityRange.length > 0) {
        const startClarity = clarityRange[0].clarityId;
        const endClarity = clarityRange[clarityRange.length - 1].clarityId;

        var res3 = clarityRange.filter(function (v) {
          return (
            v.clarityId >= parseInt(startClarity) &&
            v.clarityId <= parseInt(endClarity)
          );
        });
        const finalClarity = res3
          .map(function (m) {
            return m.clarityId;
          })
          .join(",");
        setSelectedClarity(finalClarity);
      }

      var polishRangeData = acrualRes[1][0].polishRange;

      if (polishRangeData.length > 0) {
        const startpolish = polishRangeData[0].polishId;
        const endpolish = polishRangeData[polishRangeData.length - 1].polishId;
        var res4 = polishRangeData.filter(function (v) {
          return (
            v.polishId >= parseInt(startpolish) &&
            v.polishId <= parseInt(endpolish)
          );
        });

        const finalpolish = res4
          .map(function (m) {
            return m.polishId;
          })
          .join(",");

        setSelectedpolish(finalpolish);
      }

      var fluorescenceRangeData = acrualRes[1][0].fluorescenceRange;
      if (fluorescenceRangeData.length > 0) {
        const startfluore = fluorescenceRangeData[0].fluorescenceId;
        const endfluore =
          fluorescenceRangeData[fluorescenceRangeData.length - 1]
            .fluorescenceId;

        var res5 = fluorescenceRangeData.filter(function (v) {
          return (
            v.fluorescenceId >= parseInt(startfluore) &&
            v.fluorescenceId <= parseInt(endfluore)
          );
        });

        const finalfluorescence = res5
          .map(function (m) {
            return m.fluorescenceId;
          })
          .join(",");

        setSelectedfluore(finalfluorescence);
      }

      var symmetryRangeData = acrualRes[1][0].symmetryRange;
      if (symmetryRangeData.length > 0) {
        const startsymmetry = symmetryRangeData[0].symmetryId;
        const endsymmetry =
          symmetryRangeData[symmetryRangeData.length - 1].symmetryId;

        var res6 = symmetryRangeData.filter(function (v) {
          return (
            v.symmetryId >= parseInt(startsymmetry) &&
            v.symmetryId <= parseInt(endsymmetry)
          );
        });

        const finalsymmetry = res6
          .map(function (m) {
            return m.symmetryId;
          })
          .join(",");

        setSelectedsymmetry(finalsymmetry);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // GET SETTINGS PRODUCT
  const getDiamondProductsData = async (type, type1, currentPage) => {
    ////console.log(getshapeselected);
    var labGown = false;

    // console.log(gettabname);

    if (gettabname === "labgrown") {
      labGown = true;
    }

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

    //For Carat
    var minCarat;
    var maxCarat;

    if (getCaratmin === "") {
      minCarat = getDiamondCarat[0].minCarat;
    } else {
      minCarat = getCaratmin;
    }
    if (getCaratmax === "") {
      maxCarat = getDiamondCarat[0].maxCarat;
    } else {
      maxCarat = getCaratmax;
    }

    //For Table
    // var minTable;
    // var maxTable;

    // if (getTablemin === "") {
    //   minTable = getTable[0].minTable;
    //   //console.log("if empty");
    // } else {
    //   minTable = getTablemin;
    //   //console.log("else not empty");
    // }
    // if (getTablemax === "") {
    //   maxTable = getTable[0].maxTable;
    // } else {
    //   maxTable = getTablemax;
    // }

    // //For Depth
    var minDepth;
    var maxDepth;

    if (getDepthmin === "") {
      minDepth = getDepth[0].minDepth;
      //console.log("if empty");
    } else {
      minDepth = getDepthmin;
      //console.log("else not empty");
    }
    if (getDepthmax === "") {
      maxDepth = getDepth[0].maxDepth;
    } else {
      maxDepth = getDepthmax;
    }

    //console.log(getFancyColor);
    if (getsettingcookies._shopify_ringsetting) {
      var shapeArrayLength =
        getsettingcookies._shopify_ringsetting[0].centerStoneFit.split(
          ","
        ).length;
      if (
        getsettingcookies._shopify_ringsetting &&
        getsettingcookies._shopify_ringsetting[0].centerStoneFit &&
        shapeArrayLength < 2
      ) {
        var cookieshape1 =
          getsettingcookies._shopify_ringsetting[0].centerStoneFit;
        cookieshape = cookieshape1.replace(/\s/g, "");
      } else if (shapeArrayLength < 1) {
        cookieshape = getsettingcookies._shopify_ringsetting[0].centerStoneFit;
      } else {
        if (getshapeselected === "" || getshapeselected === ",") {
          var cookieshape =
            getsettingcookies._shopify_ringsetting[0].centerStoneFit;
        } else {
          var cookieshape = getshapeselected;
        }
      }
    } else {
      var cookieshape = getshapeselected;
    }

    var diamondfilterParam = getdiamondFilterRange
      ? `&diamondfilter=${getdiamondFilterRange}`
      : "";

    try {
      if (gettabname === "fancycolor") {
        var url = `${window.initData.data[0].diamondlistapifancy}DealerID=${
          window.initData.data[0].dealerid
        }&Shape=${cookieshape}&CaratMin=${minCarat}&CaratMax=${maxCarat}&PriceMin=${minPrice}&PriceMax=${maxPrice}&ColorId=${getSelectedColor}&DID=${getfilledsearch}&ClarityId=${getSelectedClarity}&CutGradeId=${getSelectedCut}&TableMin=${getTablemin}&TableMax=${getTablemax}&DepthMin=${minDepth}&DepthMax=${maxDepth}&SymmetryId=${getSelectedsymmetry}&PolishId=${getSelectedpolish}&FluorescenceId=${getSelectedfluore}&Certificate=${certificateType}&OrderBy=${
          type ? type : getpageordertypeelected
        }&OrderType=${type1 ? type1 : getascdescordertypeelected}&PageNumber=${
          currentPage ? currentPage : getselectedpageno
        }&PageSize=${getselectedpageSize}&FancyColor=${getSelectedfancyColor}&intIntensity=${getSelectedintensity}`;
      } else {
        var url = `${window.initData.data[0].diamondlistapi}DealerID=${
          window.initData.data[0].dealerid
        }&Shape=${cookieshape}&CaratMin=${minCarat}&CaratMax=${maxCarat}&PriceMin=${minPrice}&PriceMax=${maxPrice}&ColorId=${getSelectedColor}&DID=${getfilledsearch}&ClarityId=${getSelectedClarity}&CutGradeId=${getSelectedCut}&TableMin=${getTablemin}&TableMax=${getTablemax}&DepthMin=${minDepth}&DepthMax=${maxDepth}&SymmetryId=${getSelectedsymmetry}&PolishId=${getSelectedpolish}&FluorescenceId=${getSelectedfluore}&Certificate=${certificateType}&OrderBy=${
          type ? type : getpageordertypeelected
        }&OrderType=${type1 ? type1 : getascdescordertypeelected}&PageNumber=${
          currentPage ? currentPage : getselectedpageno
        }&PageSize=${getselectedpageSize}${diamondfilterParam}&IsLabGrown=${labGown}`;
      }

      setLoaded(true);
      const res = await fetch(url);
      const settingProduct = await res.json();

      if (settingProduct.diamondList) {
        setDataSettingProduct(settingProduct.diamondList);
      } else {
        setDataSettingProduct([]);
      }

      setProductCount(settingProduct.count);
      var totalPages = Math.ceil(settingProduct.count / getselectedpageSize);
      setTotalPage(totalPages);
      var offset =
        (currentPage ? currentPage : getselectedpageno - 1) *
          getselectedpageSize +
        1;
      setStartPage(offset);
      var end = parseInt(
        currentPage ? currentPage : getselectedpageno * getselectedpageSize
      );
      setEndPage(end);
      setskeltonLoad(true);
      setTimeout(() => {
        setLoaded(false);
      }, 500);
      setloadvariable(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNavigationData();
    if (getfirsttimeload === false) {
      if (part === "navlabgrown") {
        settabname("labgrown");
        setfirsttimeload(true);
      }
      if (part === "navfancycolored") {
        settabname("fancycolor");
        setfirsttimeload(true);
      }
      if (part === "compare") {
        settabname("compare");
        setfirsttimeload(true);
      }

      if (getminedsetting !== "" && getminedsetting !== null) {
        settabname("mined");
        setfirsttimeload(true);
      } else if (getlabsetting !== "" && getlabsetting !== null) {
        settabname("labgrown");
        setfirsttimeload(true);
      } else if (getfcsetting !== "" && getfcsetting !== null) {
        settabname("fancycolor");
        setfirsttimeload(true);
      }
    }
  }, [gettabname, getminedsetting, getlabsetting, getfcsetting]);
  useEffect(() => {
    // if (initdataload === false) {
    //   getInitFilterDiamondData(window.initData.data[0].dealerid, gettabname);
    // }
    if (initdataload === true) {
      getDiamondProductsData();
      // setTimeout(() => {
      //   setLoaded(false);
      // }, 1000);
    }
  }, [
    initdataload,
    getshapeselected,
    getPricemax,
    getPricemin,
    getSelectedCut,
    getSelectedColor,
    getSelectedClarity,
    getCaratmin,
    getCaratmax,
    getDepthmin,
    getDepthmax,
    getTablemin,
    getTablemax,
    getSelectedpolish,
    getSelectedfluore,
    getSelectedsymmetry,
    getselectedpageSize,
    getselectedpageno,
    getpageordertypeelected,
    getascdescordertypeelected,
    getfilledsearch,
    getSelectedfancyColor,
    getSelectedintensity,
    getdiamondFilterRange,
    certificateType,
  ]);

  useEffect(() => {
    if (loadvarible === false) {
      if (gettabname === "compare") {
        if (getcomparecookie.finalcompareproductcookie) {
          setloadcomparedata(true);
          setskeletoncomparedata(true);
          setLoaded(false);
        }
      }

      ////console.log("first time load");
      if (gettabname === "mined") {
        if (
          getsettingcookies._shopify_ringsetting &&
          getsettingcookies._shopify_ringsetting[0].setting_id
        ) {
          // console.log(getsettingcookies._shopify_ringsetting[0].centerStoneFit);
          shapeselected(
            getsettingcookies._shopify_ringsetting[0].centerStoneFit
          );
        }
      }
      if (gettabname === "labgrown") {
        //console.log("selected labgrown");
        if (
          getsettingcookies._shopify_ringsetting &&
          getsettingcookies._shopify_ringsetting[0].setting_id
        ) {
          //console.log(getsettingcookies._shopify_ringsetting[0].centerStoneFit);
          shapeselected(
            getsettingcookies._shopify_ringsetting[0].centerStoneFit
          );
        }
      }

      if (gettabname === "fancycolor") {
        if (
          getsettingcookies._shopify_ringsetting &&
          getsettingcookies._shopify_ringsetting[0].setting_id
        ) {
          //console.log(getsettingcookies._shopify_ringsetting[0].centerStoneFit);
          shapeselected(
            getsettingcookies._shopify_ringsetting[0].centerStoneFit
          );
        }
      }

      //THIS IS FOR ON LOAD PAGE CHECK WHICH TAB IS SELECTED ACCORDING TO THAT IT WILL LOADD SAVED SEARCH DATA
      //MINED

      // console.log("else testing..");

      if (gettabname === "mined" && cookies._wpsavediamondfiltercookie) {
        if (
          cookies._wpsavediamondfiltercookie &&
          cookies._wpsavediamondfiltercookie.shapeName
        ) {
          shapeselected(cookies._wpsavediamondfiltercookie.shapeName);
        } else {
          shapeselected("");
        }

        if (
          cookies._wpsavediamondfiltercookie &&
          cookies._wpsavediamondfiltercookie.selectedCut
        ) {
          setSelectedCut(cookies._wpsavediamondfiltercookie.selectedCut);
        } else {
          setSelectedCut("");
        }
        if (
          cookies._wpsavediamondfiltercookie &&
          cookies._wpsavediamondfiltercookie.selectedColor
        ) {
          setSelectedColor(cookies._wpsavediamondfiltercookie.selectedColor);
        } else {
          setSelectedColor("");
        }
        if (
          cookies._wpsavediamondfiltercookie &&
          cookies._wpsavediamondfiltercookie.selectedClarity
        ) {
          setSelectedClarity(
            cookies._wpsavediamondfiltercookie.selectedClarity
          );
        }
        if (
          cookies._wpsavediamondfiltercookie &&
          cookies._wpsavediamondfiltercookie.caratmax
        ) {
          setCaratmax(cookies._wpsavediamondfiltercookie.caratmax);
        } else {
          setCaratmax("");
        }
        if (
          cookies._wpsavediamondfiltercookie &&
          cookies._wpsavediamondfiltercookie.caratmin
        ) {
          setCaratmin(cookies._wpsavediamondfiltercookie.caratmin);
        } else {
          setCaratmin("");
        }
        if (
          cookies._wpsavediamondfiltercookie &&
          cookies._wpsavediamondfiltercookie.pricemax
        ) {
          setPricemax(cookies._wpsavediamondfiltercookie.pricemax);
        } else {
          setPricemax("");
        }
        if (
          cookies._wpsavediamondfiltercookie &&
          cookies._wpsavediamondfiltercookie.pricemin
        ) {
          setPricemin(cookies._wpsavediamondfiltercookie.pricemin);
        } else {
          setPricemin("");
        }
        if (
          cookies._wpsavediamondfiltercookie &&
          cookies._wpsavediamondfiltercookie.orderType
        ) {
          setascdescordertypeelected(
            cookies._wpsavediamondfiltercookie.orderType
          );
        }
        if (
          cookies._wpsavediamondfiltercookie &&
          cookies._wpsavediamondfiltercookie.orderbytype
        ) {
          setpageordertypeelected(
            cookies._wpsavediamondfiltercookie.orderbytype
          );
        }
        if (
          cookies._wpsavediamondfiltercookie &&
          cookies._wpsavediamondfiltercookie.searchvalue
        ) {
          setfilledsearch(cookies._wpsavediamondfiltercookie.searchvalue);
        }
        if (
          cookies._wpsavediamondfiltercookie &&
          cookies._wpsavediamondfiltercookie.selectedFlour
        ) {
          setSelectedfluore(cookies._wpsavediamondfiltercookie.selectedFlour);
        } else {
          setSelectedfluore("");
        }
        if (
          cookies._wpsavediamondfiltercookie &&
          cookies._wpsavediamondfiltercookie.selectedPolish
        ) {
          setSelectedpolish(cookies._wpsavediamondfiltercookie.selectedPolish);
        } else {
          setSelectedpolish("");
        }
        if (
          cookies._wpsavediamondfiltercookie &&
          cookies._wpsavediamondfiltercookie.selectedSymmetry
        ) {
          setSelectedsymmetry(
            cookies._wpsavediamondfiltercookie.selectedSymmetry
          );
        } else {
          setSelectedsymmetry("");
        }
        if (
          cookies._wpsavediamondfiltercookie &&
          cookies._wpsavediamondfiltercookie.selectedmaxDept
        ) {
          setDepthmax(cookies._wpsavediamondfiltercookie.selectedmaxDept);
        } else {
          setDepthmax("");
        }
        if (
          cookies._wpsavediamondfiltercookie &&
          cookies._wpsavediamondfiltercookie.selectedminDept
        ) {
          setDepthmin(cookies._wpsavediamondfiltercookie.selectedminDept);
        } else {
          setDepthmin("");
        }
        if (
          cookies._wpsavediamondfiltercookie &&
          cookies._wpsavediamondfiltercookie.selectedmaxtable
        ) {
          setTablemax(cookies._wpsavediamondfiltercookie.selectedmaxtable);
        } else {
          setTablemax("");
        }
        if (
          cookies._wpsavediamondfiltercookie &&
          cookies._wpsavediamondfiltercookie.selectedmintable
        ) {
          setTablemin(cookies._wpsavediamondfiltercookie.selectedmintable);
        } else {
          setTablemin("");
        }
      }

      //LABGOWN
      if (gettabname === "labgrown") {
        if (
          getlabcookies._wpsavedlabgowndiamondfiltercookie &&
          getlabcookies._wpsavedlabgowndiamondfiltercookie.shapeName
        ) {
          shapeselected(
            getlabcookies._wpsavedlabgowndiamondfiltercookie.shapeName
          );
        } else {
          shapeselected("");
        }

        if (
          getlabcookies._wpsavedlabgowndiamondfiltercookie &&
          getlabcookies._wpsavedlabgowndiamondfiltercookie.selectedCut
        ) {
          setSelectedCut(
            getlabcookies._wpsavedlabgowndiamondfiltercookie.selectedCut
          );
        } else {
          setSelectedCut("");
        }
        if (
          getlabcookies._wpsavedlabgowndiamondfiltercookie &&
          getlabcookies._wpsavedlabgowndiamondfiltercookie.selectedColor
        ) {
          setSelectedColor(
            getlabcookies._wpsavedlabgowndiamondfiltercookie.selectedColor
          );
        } else {
          setSelectedColor("");
        }
        if (
          getlabcookies._wpsavedlabgowndiamondfiltercookie &&
          getlabcookies._wpsavedlabgowndiamondfiltercookie.selectedClarity
        ) {
          setSelectedClarity(
            getlabcookies._wpsavedlabgowndiamondfiltercookie.selectedClarity
          );
        } else {
          setSelectedClarity("");
        }
        if (
          getlabcookies._wpsavedlabgowndiamondfiltercookie &&
          getlabcookies._wpsavedlabgowndiamondfiltercookie.caratmax
        ) {
          setCaratmax(
            getlabcookies._wpsavedlabgowndiamondfiltercookie.caratmax
          );
        } else {
          setCaratmax("");
        }
        if (
          getlabcookies._wpsavedlabgowndiamondfiltercookie &&
          getlabcookies._wpsavedlabgowndiamondfiltercookie.caratmin
        ) {
          setCaratmin(
            getlabcookies._wpsavedlabgowndiamondfiltercookie.caratmin
          );
        } else {
          setCaratmin("");
        }
        if (
          getlabcookies._wpsavedlabgowndiamondfiltercookie &&
          getlabcookies._wpsavedlabgowndiamondfiltercookie.pricemax
        ) {
          setPricemax(
            getlabcookies._wpsavedlabgowndiamondfiltercookie.pricemax
          );
        } else {
          setPricemax("");
        }
        if (
          getlabcookies._wpsavedlabgowndiamondfiltercookie &&
          getlabcookies._wpsavedlabgowndiamondfiltercookie.pricemin
        ) {
          setPricemin(
            getlabcookies._wpsavedlabgowndiamondfiltercookie.pricemin
          );
        } else {
          setPricemin("");
        }
        if (
          getlabcookies._wpsavedlabgowndiamondfiltercookie &&
          getlabcookies._wpsavedlabgowndiamondfiltercookie.orderType
        ) {
          setascdescordertypeelected(
            getlabcookies._wpsavedlabgowndiamondfiltercookie.orderType
          );
        }
        if (
          getlabcookies._wpsavedlabgowndiamondfiltercookie &&
          getlabcookies._wpsavedlabgowndiamondfiltercookie.orderbytype
        ) {
          setpageordertypeelected(
            getlabcookies._wpsavedlabgowndiamondfiltercookie.orderbytype
          );
        }
        if (
          getlabcookies._wpsavedlabgowndiamondfiltercookie &&
          getlabcookies._wpsavedlabgowndiamondfiltercookie.searchvalue
        ) {
          setfilledsearch(
            getlabcookies._wpsavedlabgowndiamondfiltercookie.searchvalue
          );
        }
        if (
          getlabcookies._wpsavedlabgowndiamondfiltercookie &&
          getlabcookies._wpsavedlabgowndiamondfiltercookie.selectedFlour
        ) {
          setSelectedfluore(
            getlabcookies._wpsavedlabgowndiamondfiltercookie.selectedFlour
          );
        } else {
          setSelectedfluore("");
        }
        if (
          getlabcookies._wpsavedlabgowndiamondfiltercookie &&
          getlabcookies._wpsavedlabgowndiamondfiltercookie.selectedPolish
        ) {
          setSelectedpolish(
            getlabcookies._wpsavedlabgowndiamondfiltercookie.selectedPolish
          );
        } else {
          setSelectedpolish("");
        }
        if (
          getlabcookies._wpsavedlabgowndiamondfiltercookie &&
          getlabcookies._wpsavedlabgowndiamondfiltercookie.selectedSymmetry
        ) {
          setSelectedsymmetry(
            getlabcookies._wpsavedlabgowndiamondfiltercookie.selectedSymmetry
          );
        } else {
          setSelectedsymmetry("");
        }
        if (
          getlabcookies._wpsavedlabgowndiamondfiltercookie &&
          getlabcookies._wpsavedlabgowndiamondfiltercookie.selectedmaxDept
        ) {
          setDepthmax(
            getlabcookies._wpsavedlabgowndiamondfiltercookie.selectedmaxDept
          );
        } else {
          setDepthmax("");
        }
        if (
          getlabcookies._wpsavedlabgowndiamondfiltercookie &&
          getlabcookies._wpsavedlabgowndiamondfiltercookie.selectedminDept
        ) {
          setDepthmin(
            getlabcookies._wpsavedlabgowndiamondfiltercookie.selectedminDept
          );
        } else {
          setDepthmin("");
        }
        if (
          getlabcookies._wpsavedlabgowndiamondfiltercookie &&
          getlabcookies._wpsavedlabgowndiamondfiltercookie.selectedmaxtable
        ) {
          setTablemax(
            getlabcookies._wpsavedlabgowndiamondfiltercookie.selectedmaxtable
          );
        } else {
          setTablemax("");
        }
        if (
          getlabcookies._wpsavedlabgowndiamondfiltercookie &&
          getlabcookies._wpsavedlabgowndiamondfiltercookie.selectedmintable
        ) {
          setTablemin(
            getlabcookies._wpsavedlabgowndiamondfiltercookie.selectedmintable
          );
        } else {
          setTablemin("");
        }
      }
      //FANCYCOLOR
      if (gettabname === "fancycolor") {
        if (
          getfancycookies._wpsavedfancydiamondfiltercookie &&
          getfancycookies._wpsavedfancydiamondfiltercookie.shapeName
        ) {
          // console.log(
          //   "saved filter" +
          //     getfancycookies._wpsavedfancydiamondfiltercookie.shapeName
          // );
          shapeselected(
            getfancycookies._wpsavedfancydiamondfiltercookie.shapeName
          );
        } else {
          shapeselected("");
        }

        if (
          getfancycookies._wpsavedfancydiamondfiltercookie &&
          getfancycookies._wpsavedfancydiamondfiltercookie
            .selectedfancyIntensity
        ) {
          setSelectedintensity(
            getfancycookies._wpsavedfancydiamondfiltercookie
              .selectedfancyIntensity
          );
        }
        if (
          getfancycookies._wpsavedfancydiamondfiltercookie &&
          getfancycookies._wpsavedfancydiamondfiltercookie.selectedfancyColor
        ) {
          setSelectedfancyColor(
            getfancycookies._wpsavedfancydiamondfiltercookie.selectedfancyColor
          );
        }
        if (
          getfancycookies._wpsavedfancydiamondfiltercookie &&
          getfancycookies._wpsavedfancydiamondfiltercookie.selectedClarity
        ) {
          setSelectedClarity(
            getfancycookies._wpsavedfancydiamondfiltercookie.selectedClarity
          );
        } else {
          setSelectedClarity("");
        }
        if (
          getfancycookies._wpsavedfancydiamondfiltercookie &&
          getfancycookies._wpsavedfancydiamondfiltercookie.caratmax
        ) {
          setCaratmax(
            getfancycookies._wpsavedfancydiamondfiltercookie.caratmax
          );
        } else {
          setCaratmax("");
        }
        if (
          getfancycookies._wpsavedfancydiamondfiltercookie &&
          getfancycookies._wpsavedfancydiamondfiltercookie.caratmin
        ) {
          setCaratmin(
            getfancycookies._wpsavedfancydiamondfiltercookie.caratmin
          );
        } else {
          setCaratmin("");
        }
        if (
          getfancycookies._wpsavedfancydiamondfiltercookie &&
          getfancycookies._wpsavedfancydiamondfiltercookie.pricemax
        ) {
          setPricemax(
            getfancycookies._wpsavedfancydiamondfiltercookie.pricemax
          );
        } else {
          setPricemax("");
        }
        if (
          getfancycookies._wpsavedfancydiamondfiltercookie &&
          getfancycookies._wpsavedfancydiamondfiltercookie.pricemin
        ) {
          setPricemin(
            getfancycookies._wpsavedfancydiamondfiltercookie.pricemin
          );
        } else {
          setPricemin("");
        }
        if (
          getfancycookies._wpsavedfancydiamondfiltercookie &&
          getfancycookies._wpsavedfancydiamondfiltercookie.orderType
        ) {
          setascdescordertypeelected(
            getfancycookies._wpsavedfancydiamondfiltercookie.orderType
          );
        }
        if (
          getfancycookies._wpsavedfancydiamondfiltercookie &&
          getfancycookies._wpsavedfancydiamondfiltercookie.orderbytype
        ) {
          setpageordertypeelected(
            getfancycookies._wpsavedfancydiamondfiltercookie.orderbytype
          );
        }
        if (
          getfancycookies._wpsavedfancydiamondfiltercookie &&
          getfancycookies._wpsavedfancydiamondfiltercookie.searchvalue
        ) {
          setfilledsearch(
            getfancycookies._wpsavedfancydiamondfiltercookie.searchvalue
          );
        }
        if (
          getfancycookies._wpsavedfancydiamondfiltercookie &&
          getfancycookies._wpsavedfancydiamondfiltercookie.selectedFlour
        ) {
          setSelectedfluore(
            getfancycookies._wpsavedfancydiamondfiltercookie.selectedFlour
          );
        } else {
          setSelectedfluore("");
        }
        if (
          getfancycookies._wpsavedfancydiamondfiltercookie &&
          getfancycookies._wpsavedfancydiamondfiltercookie.selectedPolish
        ) {
          setSelectedpolish(
            getfancycookies._wpsavedfancydiamondfiltercookie.selectedPolish
          );
        } else {
          setSelectedpolish("");
        }
        if (
          getfancycookies._wpsavedfancydiamondfiltercookie &&
          getfancycookies._wpsavedfancydiamondfiltercookie.selectedSymmetry
        ) {
          setSelectedsymmetry(
            getfancycookies._wpsavedfancydiamondfiltercookie.selectedSymmetry
          );
        } else {
          setSelectedsymmetry("");
        }
        if (
          getfancycookies._wpsavedfancydiamondfiltercookie &&
          getfancycookies._wpsavedfancydiamondfiltercookie.selectedmaxDept
        ) {
          setDepthmax(
            getfancycookies._wpsavedfancydiamondfiltercookie.selectedmaxDept
          );
        } else {
          setDepthmax("");
        }
        if (
          getfancycookies._wpsavedfancydiamondfiltercookie &&
          getfancycookies._wpsavedfancydiamondfiltercookie.selectedminDept
        ) {
          setDepthmin(
            getfancycookies._wpsavedfancydiamondfiltercookie.selectedminDept
          );
        } else {
          setDepthmin("");
        }
        if (
          getfancycookies._wpsavedfancydiamondfiltercookie &&
          getfancycookies._wpsavedfancydiamondfiltercookie.selectedmaxtable
        ) {
          setTablemax(
            getfancycookies._wpsavedfancydiamondfiltercookie.selectedmaxtable
          );
        } else {
          setTablemax("");
        }
        if (
          getfancycookies._wpsavedfancydiamondfiltercookie &&
          getfancycookies._wpsavedfancydiamondfiltercookie.selectedmintable
        ) {
          setTablemin(
            getfancycookies._wpsavedfancydiamondfiltercookie.selectedmintable
          );
        } else {
          setTablemin("");
        }
      }
      //END OF  FIRST TIME LOAD
    }

    //SET BACK VALUE

    if (getbrowserdiamondcookies.shopify_diamondbackvalue) {
      //console.log(getbrowserdiamondcookies.shopify_diamondbackvalue);
      if (
        getbrowserdiamondcookies.shopify_diamondbackvalue &&
        getbrowserdiamondcookies.shopify_diamondbackvalue[0].shapeName
      ) {
        shapeselected(
          getbrowserdiamondcookies.shopify_diamondbackvalue[0].shapeName
        );
      } else {
        shapeselected("");
      }

      if (
        getbrowserdiamondcookies.shopify_diamondbackvalue &&
        getbrowserdiamondcookies.shopify_diamondbackvalue[0].selectedCut
      ) {
        setSelectedCut(
          getbrowserdiamondcookies.shopify_diamondbackvalue[0].selectedCut
        );
      } else {
        setSelectedCut("");
      }
      if (
        getbrowserdiamondcookies.shopify_diamondbackvalue &&
        getbrowserdiamondcookies.shopify_diamondbackvalue[0].selectedColor
      ) {
        setSelectedColor(
          getbrowserdiamondcookies.shopify_diamondbackvalue[0].selectedColor
        );
      } else {
        setSelectedColor("");
      }
      if (
        getbrowserdiamondcookies.shopify_diamondbackvalue &&
        getbrowserdiamondcookies.shopify_diamondbackvalue[0].selectedClarity
      ) {
        setSelectedClarity(
          getbrowserdiamondcookies.shopify_diamondbackvalue[0].selectedClarity
        );
      } else {
        setSelectedClarity("");
      }
      if (
        getbrowserdiamondcookies.shopify_diamondbackvalue &&
        getbrowserdiamondcookies.shopify_diamondbackvalue[0].caratmax
      ) {
        setCaratmax(
          getbrowserdiamondcookies.shopify_diamondbackvalue[0].caratmax
        );
      } else {
        setCaratmax("");
      }
      if (
        getbrowserdiamondcookies.shopify_diamondbackvalue &&
        getbrowserdiamondcookies.shopify_diamondbackvalue[0].caratmin
      ) {
        setCaratmin(
          getbrowserdiamondcookies.shopify_diamondbackvalue[0].caratmin
        );
      } else {
        setCaratmin("");
      }
      if (
        getbrowserdiamondcookies.shopify_diamondbackvalue &&
        getbrowserdiamondcookies.shopify_diamondbackvalue[0].pricemax
      ) {
        setPricemax(
          getbrowserdiamondcookies.shopify_diamondbackvalue[0].pricemax
        );
      } else {
        setPricemax("");
      }
      if (
        getbrowserdiamondcookies.shopify_diamondbackvalue &&
        getbrowserdiamondcookies.shopify_diamondbackvalue[0].pricemin
      ) {
        setPricemin(
          getbrowserdiamondcookies.shopify_diamondbackvalue[0].pricemin
        );
      } else {
        setPricemin("");
      }
      if (
        getbrowserdiamondcookies.shopify_diamondbackvalue &&
        getbrowserdiamondcookies.shopify_diamondbackvalue[0].orderType
      ) {
        setascdescordertypeelected(
          getbrowserdiamondcookies.shopify_diamondbackvalue[0].orderType
        );
      }
      if (
        getbrowserdiamondcookies.shopify_diamondbackvalue &&
        getbrowserdiamondcookies.shopify_diamondbackvalue[0].orderbytype
      ) {
        setpageordertypeelected(
          getbrowserdiamondcookies.shopify_diamondbackvalue[0].orderbytype
        );
      }
      if (
        getbrowserdiamondcookies.shopify_diamondbackvalue &&
        getbrowserdiamondcookies.shopify_diamondbackvalue[0].searchvalue
      ) {
        setfilledsearch(
          getbrowserdiamondcookies.shopify_diamondbackvalue[0].searchvalue
        );
      }
      if (
        getbrowserdiamondcookies.shopify_diamondbackvalue &&
        getbrowserdiamondcookies.shopify_diamondbackvalue[0].selectedFlour
      ) {
        setSelectedfluore(
          getbrowserdiamondcookies.shopify_diamondbackvalue[0].selectedFlour
        );
      } else {
        setSelectedfluore("");
      }
      if (
        getbrowserdiamondcookies.shopify_diamondbackvalue &&
        getbrowserdiamondcookies.shopify_diamondbackvalue[0].selectedPolish
      ) {
        setSelectedpolish(
          getbrowserdiamondcookies.shopify_diamondbackvalue[0].selectedPolish
        );
      } else {
        setSelectedpolish("");
      }
      if (
        getbrowserdiamondcookies.shopify_diamondbackvalue &&
        getbrowserdiamondcookies.shopify_diamondbackvalue[0].selectedSymmetry
      ) {
        setSelectedsymmetry(
          getbrowserdiamondcookies.shopify_diamondbackvalue[0].selectedSymmetry
        );
      } else {
        setSelectedsymmetry("");
      }
      if (
        getbrowserdiamondcookies.shopify_diamondbackvalue &&
        getbrowserdiamondcookies.shopify_diamondbackvalue[0].selectedmaxDept
      ) {
        setDepthmax(
          getbrowserdiamondcookies.shopify_diamondbackvalue[0].selectedmaxDept
        );
      } else {
        setDepthmax("");
      }
      if (
        getbrowserdiamondcookies.shopify_diamondbackvalue &&
        getbrowserdiamondcookies.shopify_diamondbackvalue[0].selectedminDept
      ) {
        setDepthmin(
          getbrowserdiamondcookies.shopify_diamondbackvalue[0].selectedminDept
        );
      } else {
        setDepthmin("");
      }
      if (
        getbrowserdiamondcookies.shopify_diamondbackvalue &&
        getbrowserdiamondcookies.shopify_diamondbackvalue[0].selectedmaxtable
      ) {
        setTablemax(
          getbrowserdiamondcookies.shopify_diamondbackvalue[0].selectedmaxtable
        );
      } else {
        setTablemax("");
      }
      if (
        getbrowserdiamondcookies.shopify_diamondbackvalue &&
        getbrowserdiamondcookies.shopify_diamondbackvalue[0].selectedmintable
      ) {
        setTablemin(
          getbrowserdiamondcookies.shopify_diamondbackvalue[0].selectedmintable
        );
      } else {
        setTablemin("");
      }
      if (
        getbrowserdiamondcookies.shopify_diamondbackvalue &&
        getbrowserdiamondcookies.shopify_diamondbackvalue[0]
          .selectedfancyIntensity
      ) {
        setSelectedintensity(
          getbrowserdiamondcookies.shopify_diamondbackvalue[0]
            .selectedfancyIntensity
        );
      } else {
        setSelectedintensity("");
      }

      if (
        getbrowserdiamondcookies.shopify_diamondbackvalue &&
        getbrowserdiamondcookies.shopify_diamondbackvalue[0].selectedfancyColor
      ) {
        setSelectedfancyColor(
          getbrowserdiamondcookies.shopify_diamondbackvalue[0]
            .selectedfancyColor
        );
      } else {
        setSelectedfancyColor("");
      }

      if (getbrowserdiamondcookies.shopify_diamondbackvalue) {
        setTimeout(() => {
          removeCookie("shopify_diamondbackvalue", { path: "/" });
        }, 3000);
      }
    }

    //THIS IS TO CHECK COOKIES BASED BUTTON SELECTION
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
    //END THIS IS TO CHECK COOKIES BASED BUTTON SELECTION

    // COMPARE ITEMS COOKIES CHECKING
    if (
      getcomparecookies._wpsavedcompareproductcookie &&
      getcomparecookies._wpsavedcompareproductcookie !== ""
    ) {
      window.compareproduct = JSON.parse(
        JSON.stringify(getcomparecookies._wpsavedcompareproductcookie)
      );
    }

    // if (getfirsttimeload === false) {
    // if (part === "navlabgrown") {
    //   settabname("labgrown");
    //   setfirsttimeload(true);
    // }
    // if (part === "navfancycolored") {
    //   settabname("fancycolor");
    //   setfirsttimeload(true);
    // }
    // if (part === "compare") {
    //   settabname("compare");
    //   setfirsttimeload(true);
    // }

    // if (getminedsetting !== "" && getminedsetting !== null) {
    //   settabname("mined");
    //   setfirsttimeload(true);
    // } else if (getlabsetting !== "" && getlabsetting !== null) {
    //   settabname("labgrown");
    //   setfirsttimeload(true);
    // } else if (getfcsetting !== "" && getfcsetting !== null) {
    //   settabname("fancycolor");
    //   setfirsttimeload(true);
    // }
    // }

    //THIS IS FOR SELECTED VALUE FROM QUERY STRING IF WE PASS
    if (getQuerySearchShape === "0") {
      if (searchshape) {
        if (
          isUpperCase(searchshape) === true ||
          isLowerCase(searchshape) === true
        ) {
          // console.log("Inside if");
          // console.log(capitalize(searchshape));
          shapeselected(capitalize(searchshape));
        } else {
          //console.log("Inside else");
          shapeselected(searchshape);
        }
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
    }
    setCompareCount(window.compareproduct.length);
    // if (initdataload === false) {
    //   getInitFilterDiamondData(window.initData.data[0].dealerid, gettabname);
    // }
    // if (initdataload === true) {
    //   getDiamondProductsData();
    // }
    // getNavigationData();
  }, [
    initdataload,
    getshapeselected,
    getPricemax,
    getPricemin,
    getSelectedCut,
    getSelectedColor,
    getSelectedClarity,
    getCaratmin,
    getCaratmax,
    getDepthmin,
    getDepthmax,
    getTablemin,
    getTablemax,
    getSelectedpolish,
    getSelectedfluore,
    getSelectedsymmetry,
    getselectedpageSize,
    getselectedpageno,
    getpageordertypeelected,
    getascdescordertypeelected,
    getfilledsearch,
    getSelectedfancyColor,
    getSelectedintensity,
    gettabname,
    loaded,
    getcomparecookies,
    loadcomparedata,
    certificateType,
  ]);

  const handleSetBackValue = (item, e) => {
    e.preventDefault();
    // console.log(props);
    // console.log("item");
    // console.log(item);

    var shape = item.shape ? item.shape : "-";
    var carat = item.carat ? item.carat : "-";
    var color = item.color ? item.color : "-";
    var clarity = item.clarity ? item.clarity : "-";
    var cut = item.cut ? item.cut : "-";
    var cert = item.cert ? item.cert : "-";

    if (
      (item.isfancy === "" && item.isLabCreated === true) ||
      item.isLabCreated === "true"
    ) {
      navigate(
        "/apps/diamondtools/product/" +
          shape.replace(/\s+/g, "-").toLowerCase() +
          "-shape-" +
          carat.replace(/\s+/g, "-").toLowerCase() +
          "-carat-" +
          color.replace(/\s+/g, "-").toLowerCase() +
          "-color-" +
          clarity.replace(/\s+/g, "-").toLowerCase() +
          "-clarity-" +
          cut.replace(/\s+/g, "-").toLowerCase() +
          "-cut-" +
          cert.replace(/\s+/g, "-").toLowerCase() +
          "-certificate-" +
          "-sku-" +
          item.diamondId +
          "/labcreated"
      );
    } else if (
      item.isLabCreated === true &&
      item.isfancy &&
      item.isfancy !== ""
    ) {
      navigate(
        "/apps/diamondtools/product/" +
          shape.replace(/\s+/g, "-").toLowerCase() +
          "-shape-" +
          carat.replace(/\s+/g, "-").toLowerCase() +
          "-carat-" +
          color.replace(/\s+/g, "-").toLowerCase() +
          "-color-" +
          clarity.replace(/\s+/g, "-").toLowerCase() +
          "-clarity-" +
          cut.replace(/\s+/g, "-").toLowerCase() +
          "-cut-" +
          cert.replace(/\s+/g, "-").toLowerCase() +
          "-certificate-" +
          "-sku-" +
          item.diamondId +
          "/fancydiamonds"
      );
    } else {
      navigate(
        "/apps/diamondtools/product/" +
          shape.replace(/\s+/g, "-").toLowerCase() +
          "-shape-" +
          carat.replace(/\s+/g, "-").toLowerCase() +
          "-carat-" +
          color.replace(/\s+/g, "-").toLowerCase() +
          "-color-" +
          clarity.replace(/\s+/g, "-").toLowerCase() +
          "-clarity-" +
          cut.replace(/\s+/g, "-").toLowerCase() +
          "-cut-" +
          cert.replace(/\s+/g, "-").toLowerCase() +
          "-certificate-" +
          "-sku-" +
          item.diamondId
      );
    }
  };

  const getNavigationData = async () => {
    try {
      var url =
        `${window.initData.data[0].navigationapi}DealerID=` +
        window.initData.data[0].dealerid;

      const res = await fetch(url);
      // console.log("navigation url");
      // console.log(url);

      const acrualRes = await res.json();
      setminedsetting(acrualRes[0].navStandard);
      setlabsetting(acrualRes[0].navLabGrown);
      setfcsetting(acrualRes[0].navFancyColored);
      setcomparesetting(acrualRes[0].navCompare);
      getInitFilterDiamondData(window.initData.data[0].dealerid, gettabname);
    } catch (error) {
      console.log(error);
    }
  };

  if (intskeltonLoad === false) {
    return (
      <>
        <div>
          <Helmet>
            <title>{window.initData.data["0"].diamond_meta_title}</title>
            <meta
              name="description"
              content={window.initData.data["0"].diamond_meta_description}
            />
          </Helmet>
        </div>
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
                <div className="div-right">
                  {" "}
                  <Skeleton count={8} height={60} />
                </div>
              </div>
            </div>
            <div className="skeleton-div">
              <div className="skelton-info">
                {/* <h4 className="div-left"><Skeleton /></h4> */}
                <div className="div-right-price">
                  <Skeleton height={60} />
                </div>
                <div className="div-right-metal">
                  <Skeleton height={60} />
                </div>
              </div>
            </div>
          </div>
          <div className="s_gridview">
            <div className="Skeleton__lists">
              <Skeleton circle={true} height={150} width={150} />
              <Skeleton height={25} width={200} />
              <Skeleton height={25} width={200} />
              <Skeleton height={25} width={200} />
            </div>
            <div className="Skeleton__lists">
              <Skeleton circle={true} height={150} width={150} />
              <Skeleton height={25} width={200} />
              <Skeleton height={25} width={200} />
              <Skeleton height={25} width={200} />
            </div>
            <div className="Skeleton__lists">
              <Skeleton circle={true} height={150} width={150} />
              <Skeleton height={25} width={200} />
              <Skeleton height={25} width={200} />
              <Skeleton height={25} width={200} />
            </div>
            <div className="Skeleton__lists">
              <Skeleton circle={true} height={150} width={150} />
              <Skeleton height={25} width={200} />
              <Skeleton height={25} width={200} />
              <Skeleton height={25} width={200} />
            </div>
            <div className="Skeleton__lists">
              <Skeleton circle={true} height={150} width={150} />
              <Skeleton height={25} width={200} />
              <Skeleton height={25} width={200} />
              <Skeleton height={25} width={200} />
            </div>
            <div className="Skeleton__lists">
              <Skeleton circle={true} height={150} width={150} />
              <Skeleton height={25} width={200} />
              <Skeleton height={25} width={200} />
              <Skeleton height={25} width={200} />
            </div>
            <div className="Skeleton__lists">
              <Skeleton circle={true} height={150} width={150} />
              <Skeleton height={25} width={200} />
              <Skeleton height={25} width={200} />
              <Skeleton height={25} width={200} />
            </div>
            <div className="Skeleton__lists">
              <Skeleton circle={true} height={150} width={150} />
              <Skeleton height={25} width={200} />
              <Skeleton height={25} width={200} />
              <Skeleton height={25} width={200} />
            </div>
          </div>
          <Skeleton />
        </div>
      </>
    );
  } else {
    if (skeletoncomparedata === false && gettabname === "compare") {
      return (
        <>
          <div>
            <Helmet>
              <title>{window.initData.data["0"].diamond_meta_title}</title>
              <meta
                name="description"
                content={window.initData.data["0"].diamond_meta_description}
              />
            </Helmet>
          </div>
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
                  <div className="div-right">
                    {" "}
                    <Skeleton count={8} height={60} />
                  </div>
                </div>
              </div>
              <div className="skeleton-div">
                <div className="skelton-info">
                  {/* <h4 className="div-left"><Skeleton /></h4> */}
                  <div className="div-right-price">
                    <Skeleton height={60} />
                  </div>
                  <div className="div-right-metal">
                    <Skeleton height={60} />
                  </div>
                </div>
              </div>
            </div>
            <div className="s_gridview">
              <div className="Skeleton__lists">
                <Skeleton circle={true} height={150} width={150} />
                <Skeleton height={25} width={200} />
                <Skeleton height={25} width={200} />
                <Skeleton height={25} width={200} />
              </div>
              <div className="Skeleton__lists">
                <Skeleton circle={true} height={150} width={150} />
                <Skeleton height={25} width={200} />
                <Skeleton height={25} width={200} />
                <Skeleton height={25} width={200} />
              </div>
              <div className="Skeleton__lists">
                <Skeleton circle={true} height={150} width={150} />
                <Skeleton height={25} width={200} />
                <Skeleton height={25} width={200} />
                <Skeleton height={25} width={200} />
              </div>
              <div className="Skeleton__lists">
                <Skeleton circle={true} height={150} width={150} />
                <Skeleton height={25} width={200} />
                <Skeleton height={25} width={200} />
                <Skeleton height={25} width={200} />
              </div>
              <div className="Skeleton__lists">
                <Skeleton circle={true} height={150} width={150} />
                <Skeleton height={25} width={200} />
                <Skeleton height={25} width={200} />
                <Skeleton height={25} width={200} />
              </div>
              <div className="Skeleton__lists">
                <Skeleton circle={true} height={150} width={150} />
                <Skeleton height={25} width={200} />
                <Skeleton height={25} width={200} />
                <Skeleton height={25} width={200} />
              </div>
              <div className="Skeleton__lists">
                <Skeleton circle={true} height={150} width={150} />
                <Skeleton height={25} width={200} />
                <Skeleton height={25} width={200} />
                <Skeleton height={25} width={200} />
              </div>
              <div className="Skeleton__lists">
                <Skeleton circle={true} height={150} width={150} />
                <Skeleton height={25} width={200} />
                <Skeleton height={25} width={200} />
                <Skeleton height={25} width={200} />
              </div>
            </div>
            <Skeleton />
          </div>
        </>
      );
    }
    // console.log("getcomparecookie.finalcompareproductcookie");
    // console.log(getcomparecookie.finalcompareproductcookie);
    if (gettabname === "compare" && loadcomparedata === true) {
      return (
        <>
          <div>
            <Helmet>
              <title>{window.initData.data["0"].diamond_meta_title}</title>
              <meta
                name="description"
                content={window.initData.data["0"].diamond_meta_description}
              />
            </Helmet>
          </div>

          <div className="gf-tool-container">
            <LoadingOverlay className="_gfloading_overlay_wrapper">
              <Loader fullPage loading={loaded} />
            </LoadingOverlay>

            <Topheader></Topheader>

            <div className="gf-diamond-filter">
              <Filter
                shapeName={getshapeselected}
                selectedCut={getSelectedCut}
                selectedColor={getSelectedColor}
                selectedClarity={getSelectedClarity}
                caratmin={getCaratmin}
                caratmax={getCaratmax}
                pricemin={getPricemin}
                pricemax={getPricemax}
                selectedpagecount={getselectedpageno}
                orderbytype={getpageordertypeelected}
                orderType={getascdescordertypeelected}
                searchvalue={getfilledsearch}
                selectedminDept={getDepthmin}
                selectedmaxDept={getDepthmax}
                selectedmintable={getTablemin}
                selectedmaxtable={getTablemax}
                selectedPolish={getSelectedpolish}
                selectedFlour={getSelectedfluore}
                selectedSymmetry={getSelectedsymmetry}
                selectedfancyColor={getSelectedfancyColor}
                selectedfancyIntensity={getSelectedintensity}
                callBack={saveSearch}
                callbacktab={tabvalue}
                getMinedNavigation={getminedsetting}
                getLabNavigation={getlabsetting}
                getFancyNavigation={getfcsetting}
                getCompareNavigation={getcomparesetting}
              />
            </div>
            {getcomparecookie.finalcompareproductcookie !== undefined && (
              <div className="gf-compareitems">
                <Table responsive>
                  <thead>
                    <tr>
                      {/* {console.log(getfinalcomparedata)} */}
                      {/* {console.log(getcomparecookie.finalcompareproductcookie)} */}
                      <th> &nbsp; </th>
                      {getcomparecookie.finalcompareproductcookie.map(
                        (item) => (
                          <th key={`product-image-${item.diamondId}`}>
                            <img
                              src={item.defaultDiamondImage}
                              alt={item.mainHeader}
                              style={{
                                width: "150px",
                                height: "150px",
                              }}
                            ></img>
                          </th>
                        )
                      )}
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <th>Shape </th>
                      {getcomparecookie.finalcompareproductcookie.map(
                        (item) => (
                          <td key={`product-shape-${item.diamondId}`}>
                            {item.shape ? item.shape : "NA"}
                          </td>
                        )
                      )}
                    </tr>

                    <tr>
                      <th>#Sku </th>
                      {getcomparecookie.finalcompareproductcookie.map(
                        (item) => (
                          <td key={`product-id-${item.diamondId}`}>
                            {item.diamondId ? item.diamondId : "NA"}
                          </td>
                        )
                      )}
                    </tr>

                    <tr>
                      <th>Carat </th>
                      {getcomparecookie.finalcompareproductcookie.map(
                        (item) => (
                          <td key={`product-carat-${item.diamondId}`}>
                            {item.caratWeight ? item.caratWeight : "NA"}
                          </td>
                        )
                      )}
                    </tr>

                    <tr>
                      <th>Table </th>
                      {getcomparecookie.finalcompareproductcookie.map(
                        (item) => (
                          <td key={`product-table-${item.diamondId}`}>
                            {item.table ? item.table : "NA"}
                          </td>
                        )
                      )}
                    </tr>

                    <tr>
                      <th>Color </th>
                      {getcomparecookie.finalcompareproductcookie.map(
                        (item) => (
                          <td key={`product-color-${item.diamondId}`}>
                            {item.color ? item.color : "NA"}
                          </td>
                        )
                      )}
                    </tr>

                    <tr>
                      <th>Polish </th>
                      {getcomparecookie.finalcompareproductcookie.map(
                        (item) => (
                          <td key={`product-polish-${item.diamondId}`}>
                            {item.polish ? item.polish : "NA"}
                          </td>
                        )
                      )}
                    </tr>

                    <tr>
                      <th>Symmetry </th>
                      {getcomparecookie.finalcompareproductcookie.map(
                        (item) => (
                          <td key={`product-symmetry-${item.diamondId}`}>
                            {item.symmetry ? item.symmetry : "NA"}
                          </td>
                        )
                      )}
                    </tr>

                    <tr>
                      <th>Clarity </th>
                      {getcomparecookie.finalcompareproductcookie.map(
                        (item) => (
                          <td key={`product-clarity-${item.diamondId}`}>
                            {item.clarity ? item.clarity : "NA"}
                          </td>
                        )
                      )}
                    </tr>

                    <tr>
                      <th>Fluorescence </th>
                      {getcomparecookie.finalcompareproductcookie.map(
                        (item) => (
                          <td key={`product-fluorescence-${item.diamondId}`}>
                            {item.fluorescence ? item.fluorescence : "NA"}
                          </td>
                        )
                      )}
                    </tr>

                    <tr>
                      <th>Depth </th>
                      {getcomparecookie.finalcompareproductcookie.map(
                        (item) => (
                          <td key={`product-depth-${item.diamondId}`}>
                            {item.depth ? item.depth : "NA"}
                          </td>
                        )
                      )}
                    </tr>

                    <tr>
                      <th>Measurement </th>
                      {getcomparecookie.finalcompareproductcookie.map(
                        (item) => (
                          <td key={`product-measurement-${item.diamondId}`}>
                            {item.measurement ? item.measurement : "NA"}
                          </td>
                        )
                      )}
                    </tr>

                    <tr>
                      <th>Cert </th>
                      {getcomparecookie.finalcompareproductcookie.map(
                        (item) => (
                          <td key={`product-certificate-${item.diamondId}`}>
                            {item.certificate ? item.certificate : "NA"}
                          </td>
                        )
                      )}
                    </tr>

                    <tr>
                      <th>Cut </th>
                      {getcomparecookie.finalcompareproductcookie.map(
                        (item) => (
                          <td key={`product-cut-${item.diamondId}`}>
                            {item.cut ? item.cut : "NA"}{" "}
                          </td>
                        )
                      )}
                    </tr>

                    <tr>
                      <th>Price </th>
                      {getcomparecookie.finalcompareproductcookie.map(
                        (item) => (
                          <td key={`product-price-${item.diamondId}`}>
                            {item.fltPrice === "Call for Price"
                              ? "Call"
                              : window.initData.data[0].price_row_format === "1"
                              ? window.currencyFrom === "USD"
                                ? window.currency +
                                  Number(item.fltPrice).toLocaleString(
                                    undefined,
                                    {
                                      maximumFractionDigits: 0,
                                    }
                                  )
                                : window.currencyFrom +
                                  "  " +
                                  window.currency +
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
                                window.currency +
                                "  " +
                                window.currencyFrom}
                          </td>
                        )
                      )}
                    </tr>
                  </tbody>

                  <tfoot>
                    <tr>
                      <td> &nbsp; </td>

                      {getcomparecookie.finalcompareproductcookie.map(
                        (item) => (
                          <td key={item.diamondId}>
                            <a
                              href="#"
                              onClick={(e) => handleSetBackValue(item, e)}
                              title="View Diamond"
                            >
                              <span>
                                <i className="fas fa-eye"></i>
                              </span>
                            </a>
                            &nbsp;
                            <a
                              href="#"
                              id={item.diamondId}
                              onClick={onClickDelete}
                            >
                              <span>
                                <i
                                  id={item.diamondId}
                                  className="fas fa-trash-alt"
                                ></i>
                              </span>
                            </a>
                          </td>
                        )
                      )}
                    </tr>
                  </tfoot>
                </Table>
              </div>
            )}
            {getcomparecookie.finalcompareproductcookie !== undefined && (
              <div className="gf-mobile-compare-view">
                {getcomparecookie.finalcompareproductcookie.map((item) => (
                  <div
                    className="gf-compare-mob-items"
                    key={`compare-mob-items-${item.diamondId}`}
                  >
                    <div className="lists">
                      <div className="list-items">
                        <span className="item-image">
                          <img
                            src={item.defaultDiamondImage}
                            alt={item.mainHeader}
                          ></img>
                        </span>
                        <h5 className="item-name">
                          {item.shape ? item.shape : "NA"}
                        </h5>
                      </div>
                    </div>
                    <div className="lists">
                      <div className="list-items">
                        <h5 className="item-value">
                          {item.caratWeight ? item.caratWeight : "NA"}
                        </h5>
                        <span className="item-name">Carat</span>
                      </div>
                      <div className="list-items">
                        <h5 className="item-value">
                          {item.clarity ? item.clarity : "NA"}
                        </h5>
                        <span className="item-name">Clarity</span>
                      </div>
                    </div>
                    <div className="lists">
                      <div className="list-items">
                        <h5 className="item-value">
                          {item.color ? item.color : "NA"}
                        </h5>
                        <span className="item-name">Color</span>
                      </div>
                      <div className="list-items">
                        <h5 className="item-value">
                          {item.cut ? item.cut : "NA"}
                        </h5>
                        <span className="item-name">Cut</span>
                      </div>
                    </div>
                    <div className="lists">
                      <div className="list-items">
                        <h5 className="item-value">
                          {item.fltPrice === "Call for Price"
                            ? "Call for Price"
                            : window.initData.data[0].price_row_format === "1"
                            ? window.currencyFrom === "USD"
                              ? window.currency +
                                Number(item.fltPrice).toLocaleString(
                                  undefined,
                                  {
                                    maximumFractionDigits: 0,
                                  }
                                )
                              : window.currencyFrom +
                                "  " +
                                window.currency +
                                "  " +
                                Number(item.fltPrice).toLocaleString(
                                  undefined,
                                  {
                                    maximumFractionDigits: 0,
                                  }
                                )
                            : window.currencyFrom === "USD"
                            ? window.currency +
                              Number(item.fltPrice).toLocaleString(undefined, {
                                maximumFractionDigits: 0,
                              })
                            : Number(item.fltPrice).toLocaleString(undefined, {
                                maximumFractionDigits: 0,
                              }) +
                              "  " +
                              window.currency +
                              "  " +
                              window.currencyFrom}
                        </h5>
                        <span className="item-name">Price</span>
                      </div>
                      <div className="list-items">
                        <h5 className="item-value">
                          <a
                            href="#"
                            onClick={(e) => handleSetBackValue(item, e)}
                            title="View Diamond"
                          >
                            <span>
                              <i className="fas fa-eye"></i>
                            </span>
                          </a>
                        </h5>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      );
    } else {
      return (
        <>
          <style>
            {`
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
            .gf-btn{
              background-color: ${window.initData["data"][0].button_colour};
           }
            .ellipsis-data:hover .icon-hover i:hover{
              background-color: ${window.initData["data"][0].hover_colour};
              // color: ${window.initData["data"][0].link_colour};                  
              border-radius: 5px;
            }
            .ellipsis-data:hover .icon-hover i{
              color: ${window.initData["data"][0].header_colour};
            }

            .gf-product-list-viewdata .gf-table tbody td.ellipsis-data{
              color: ${window.initData["data"][0].header_colour};
            }

             .gf-btn:hover{
               background-color: ${window.initData["data"][0].hover_colour} !important;
            }
            @media screen and (max-width: 991px) { 
                .shapes ul .shapes_lists .shape_box:hover {
                    background-color: inherit;
                }
            }
            .gf-search-product-listing .gf-product-grid-view li.gf-product-listing a.gf-slidebutton{
              color:${window.initData["data"][0].header_colour};
            }
            
            .gf-search-product-listing .gf-product-grid-view li.gf-product-listing a.gf-video-popup{
              color:${window.initData["data"][0].header_colour};
            }
           
            .noUi-horizontal .noUi-tooltip{
              background-color:${window.initData["data"][0].button_colour};
            }
            .advance-slider .advance-heading span i{
              background-color:${window.initData["data"][0].button_colour};
            }
            .advance-slider .advance-heading-div span i{
              background-color:${window.initData["data"][0].button_colour};
            }
            .gf-tool-container .f_heading .f_popup i{
              color:${window.initData["data"][0].button_colour};
            }
            .react-responsive-modal-root .react-responsive-modal-closeButton{
              background-color:${window.initData["data"][0].button_colour};
            }
            .react-responsive-modal-root .react-responsive-modal-closeButton:hover{
              background-color:${window.initData["data"][0].hover_colour};
            }
            .noUi-horizontal .noUi-tooltip:after{
              border-top-color: ${window.initData["data"][0].button_colour};
            }
            

            `}
          </style>
          <div>
            <Helmet>
              <title>{window.initData.data["0"].diamond_meta_title}</title>
              <meta
                name="description"
                content={window.initData.data["0"].diamond_meta_description}
              />
            </Helmet>
          </div>
          <div className="gf-tool-container">
            <LoadingOverlay className="_gfloading_overlay_wrapper">
              <Loader fullPage loading={loaded} />
            </LoadingOverlay>

            <Topheader></Topheader>

            <div className="gf-diamond-filter">
              {/* {console.log('getCaratmin')}
              {console.log(getCaratmin)} */}
              <Filter
                shapeName={getshapeselected}
                selectedCut={getSelectedCut}
                selectedColor={getSelectedColor}
                selectedClarity={getSelectedClarity}
                caratmin={getCaratmin}
                caratmax={getCaratmax}
                pricemin={getPricemin}
                pricemax={getPricemax}
                selectedpagecount={getselectedpageno}
                orderbytype={getpageordertypeelected}
                orderType={getascdescordertypeelected}
                searchvalue={getfilledsearch}
                selectedminDept={getDepthmin}
                selectedmaxDept={getDepthmax}
                selectedmintable={getTablemin}
                selectedmaxtable={getTablemax}
                selectedPolish={getSelectedpolish}
                selectedFlour={getSelectedfluore}
                selectedSymmetry={getSelectedsymmetry}
                selectedfancyColor={getSelectedfancyColor}
                selectedfancyIntensity={getSelectedintensity}
                callBack={saveSearch}
                callbacktab={tabvalue}
                getMinedNavigation={getminedsetting}
                getLabNavigation={getlabsetting}
                getFancyNavigation={getfcsetting}
                getCompareNavigation={getcomparesetting}
              />
            </div>
            <div className="gf-filter-main-div">
              <div className="gf-shapes">
                <DiamondShape
                  shapeData={shape}
                  callBack={shapeName}
                  selectedShape={getshapeselected}
                />
              </div>
              {gettabname !== "fancycolor" && (
                <div className="rangeSlider ui-sliders">
                  <CutSlider
                    cutSliderData={getDiamondCut}
                    callBack={cutName}
                    defaultCut={inticutname}
                    setSelectedCutData={getSelectedCut}
                  />
                  <ColorSlider
                    colorSliderData={getDiamondColor}
                    callBack={colorName}
                    defaultColor={inticolorname}
                    setSelectedColorData={getSelectedColor}
                  />
                </div>
              )}
              {gettabname === "fancycolor" && getFancyStatus === true && (
                <div className="rangeSlider ui-sliders">
                  <FancyColorSlider
                    fancycolorSliderData={getFancyColor}
                    callBack={fancyColorName}
                    setSelectedFancyColorData={getSelectedfancyColor}
                  />
                  <FancyIntensity
                    getIntensityData={getIntensity}
                    callBack={fancyintensityname}
                    setSelectedIntensityData={getSelectedintensity}
                  />
                </div>
              )}
              <div className="rangeSlider ui-sliders">
                <ClaritySlider
                  claritySliderData={getDiamondClarity}
                  callBack={clarityName}
                  defaultClarity={inticlarityname}
                  setSelectedClarityData={getSelectedClarity}
                />
                <div className="slider__diamond">
                  <div className="slide_left slider-div">
                    {/* {console.log('getsettingcookies._shopify_ringsetting')}
                    {console.log(getsettingcookies._shopify_ringsetting)}
                    {console.log(gettabname)} */}
                    <CaratSlider
                      caratSliderData={getDiamondCarat}
                      minCarat={
                        getsettingcookies._shopify_ringsetting
                          ? getsettingcookies._shopify_ringsetting[0]
                              .ringmincarat
                          : getCaratmin
                      }
                      maxCarat={
                        getsettingcookies._shopify_ringsetting
                          ? getsettingcookies._shopify_ringsetting[0]
                              .ringmaxcarat
                          : getCaratmax
                      }
                      callBack={caratSliderValue}
                      callbacktab={gettabname}
                    />
                  </div>
                  <div className="slide_right slider-div">
                    {getShowPriceFilter === true && (
                      <PriceSlider
                        pricerangeData={getpriceRange}
                        pricemindata={getPricemin}
                        pricemaxdata={getPricemax}
                        callBack={priceSliderValue}
                        callbacktab={gettabname}
                      />
                    )}
                  </div>
                </div>

                {window.initData.data[0]
                  .show_Advance_options_as_Default_in_Diamond_Search ===
                  "1" && (
                  <div className="advance-slider">
                    <div
                      className={`advance-heading ${
                        getgrid === true ? "gf-active" : ""
                      }`}
                    >
                      <div className="heading" onClick={onOpenGrid}>
                        <span>
                          <i className="fas fa-plus"></i>
                        </span>
                        Advance Search
                      </div>
                    </div>
                    <div
                      className={`advance-search-sliders ${
                        getlist === true ? "gf-active" : ""
                      }`}
                    >
                      <div className="advance-heading-div" onClick={onOpenList}>
                        <div className="heading">
                          <span>
                            <i className="fas fa-minus"></i>
                          </span>
                          Advance Search
                        </div>
                      </div>
                      <div className="slider__diamond">
                        <div className="slide_left slider-div">
                          <DepthSlider
                            depthSliderData={getDepth}
                            depthmin={getDepthmin}
                            depthmax={getDepthmax}
                            callBack={depthSliderValue}
                            callbacktab={gettabname}
                          />
                        </div>
                        <div className="slide_right slider-div">
                          <TableSlider
                            tableSliderData={getTable}
                            tablemin={getTablemin}
                            tablemax={getTablemax}
                            callBack={tableSliderValue}
                            callbacktab={gettabname}
                          />
                        </div>
                      </div>
                      <PolishSlider
                        polishSliderData={getPolish}
                        callBack={polishName}
                        defaultCut={intpolishname}
                        setSelectedPolishData={getSelectedpolish}
                      />
                      <FluorescenceSlider
                        fluorescenceSliderData={getfluorescenceRangeData}
                        callBack={fluoreName}
                        defaultCut={intfluore}
                        setSelectedFluoreData={getSelectedfluore}
                      />
                      <SymmetrySlider
                        symmetrySliderData={getsymmetry}
                        callBack={symmetryName}
                        defaultCut={initsymmetry}
                        setSelectedSymData={getSelectedsymmetry}
                      />
                      {window.initData.data[0]
                        .show_Certificate_in_Diamond_Search === "1" &&
                        getcertificate && (
                          <Certificates
                            certificateData={getcertificate}
                            onChangeOrderType={handleOrderTypeChange}
                          />
                        )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            {skeltonLoad === false && (
              <div className="gf-tool-container">
                <div className="s_gridview">
                  <div className="Skeleton__lists">
                    <Skeleton circle={true} height={150} width={150} />
                    <Skeleton height={25} width={200} />
                    <Skeleton height={25} width={200} />
                    <Skeleton height={25} width={200} />
                  </div>
                  <div className="Skeleton__lists">
                    <Skeleton circle={true} height={150} width={150} />
                    <Skeleton height={25} width={200} />
                    <Skeleton height={25} width={200} />
                    <Skeleton height={25} width={200} />
                  </div>
                  <div className="Skeleton__lists">
                    <Skeleton circle={true} height={150} width={150} />
                    <Skeleton height={25} width={200} />
                    <Skeleton height={25} width={200} />
                    <Skeleton height={25} width={200} />
                  </div>
                  <div className="Skeleton__lists">
                    <Skeleton circle={true} height={150} width={150} />
                    <Skeleton height={25} width={200} />
                    <Skeleton height={25} width={200} />
                    <Skeleton height={25} width={200} />
                  </div>
                  <div className="Skeleton__lists">
                    <Skeleton circle={true} height={150} width={150} />
                    <Skeleton height={25} width={200} />
                    <Skeleton height={25} width={200} />
                    <Skeleton height={25} width={200} />
                  </div>
                  <div className="Skeleton__lists">
                    <Skeleton circle={true} height={150} width={150} />
                    <Skeleton height={25} width={200} />
                    <Skeleton height={25} width={200} />
                    <Skeleton height={25} width={200} />
                  </div>
                  <div className="Skeleton__lists">
                    <Skeleton circle={true} height={150} width={150} />
                    <Skeleton height={25} width={200} />
                    <Skeleton height={25} width={200} />
                    <Skeleton height={25} width={200} />
                  </div>
                  <div className="Skeleton__lists">
                    <Skeleton circle={true} height={150} width={150} />
                    <Skeleton height={25} width={200} />
                    <Skeleton height={25} width={200} />
                    <Skeleton height={25} width={200} />
                  </div>
                </div>
                <Skeleton />
              </div>
            )}
            {skeltonLoad === true && (
              <div className="gf-SettingsContainer" id="ringbuilderScrollUp">
                <DiamondSettingsProducts
                  checkboxcount={getCompareCount}
                  getDataSettingProductData={getDataSettingProduct}
                  productCount={getProductCount}
                  pagesize={pagesizevalue}
                  currentpageno={currentpagevalue}
                  totalPages={getTotalPage}
                  startPage={getStartPage}
                  endPage={getEndPage}
                  orderbytype={pageorderbytype}
                  orderType={ascdesctype}
                  searchvalue={searchValueCurrent}
                  tabvalue={gettabname}
                  shapeName={getshapeselected}
                  selectedCut={getSelectedCut}
                  selectedColor={getSelectedColor}
                  selectedClarity={getSelectedClarity}
                  caratmin={getCaratmin}
                  caratmax={getCaratmax}
                  pricemin={getPricemin}
                  pricemax={getPricemax}
                  selectedpagecount={getselectedpageno}
                  selectedminDept={getDepthmin}
                  selectedmaxDept={getDepthmax}
                  selectedmintable={getTablemin}
                  selectedmaxtable={getTablemax}
                  selectedPolish={getSelectedpolish}
                  selectedFlour={getSelectedfluore}
                  selectedSymmetry={getSelectedsymmetry}
                  selectedfancyColor={getSelectedfancyColor}
                  selectedfancyIntensity={getSelectedintensity}
                  diamondFilterRange={getFilterData}
                  diamondFilterRangeResponse={diamondFilterRangeOfInHouse}
                />
              </div>
            )}
          </div>
        </>
      );
    }
  }
};

export default DiamondtoolSetting;
