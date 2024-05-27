import { elementAcceptingRef } from "@mui/utils";
import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Modal } from "react-responsive-modal";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { LoadingOverlay, Loader } from "react-overlay-loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Filter = (props) => {
  // console.log('props');
  // console.log(props);
  // const location = useLocation();
  // var productUrl = location.pathname;
  // var url = productUrl.substring(productUrl.lastIndexOf("/") + 1);

  // if (url === "") {
  //   var getpart = productUrl.substring(productUrl.lastIndexOf("diamondtype"));
  //   var getpartUrl = getpart.split("/");
  //   var part = getpartUrl[1];
  //   // console.log("part");
  //   // console.log(part);
  // } else {
  //   var part = url;
  //   // console.log("part simple");
  //   // console.log(part);
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

  const [openFirsts, setOpenFirsts] = useState(false);
  const [openSeconds, setOpenSeconds] = useState(false);
  const [openThirds, setOpenThirds] = useState(false);
  const [openResetModal, setOpenResetModal] = React.useState(false);

  const [cookies, setCookie, removeCookie] = useCookies(["cookie-name"]);

  const [loaded, setLoaded] = useState(false);
  const [getTab, setTab] = useState("");
  const navigate = useNavigate();
  const [getcomparecookies, setcomparecookies] = useCookies([
    "_wpsavedcompareproductcookie",
  ]);
  const [getCPDiamondTypecookie, setCPDiamondTypecookie] = useCookies([
    "compareProductDiamondTypeCookie",
  ]);

  const [skeletoncomparedata, setskeletoncomparedata] = useState(false);
  const [loadcomparedata, setloadcomparedata] = useState(false);
  const [getfinalcomparedata, setfinalcomparedata] = useState([]);
  const [getlabsetting, setlabsetting] = useState(props.getLabNavigation);
  const [getminedsetting, setminedsetting] = useState(props.getMinedNavigation);
  const [getfcsetting, setfcsetting] = useState(props.getFancyNavigation);
  const [getcomparesetting, setcomparesetting] = useState(
    props.getCompareNavigation
  );

  // const getNavigationData = async () => {
  //   try {
  //     var url =
  //       `${window.initData.data[0].navigationapi}DealerID=` +
  //       window.initData.data[0].dealerid;

  //     const res = await fetch(url);

  //     console.log("navigation url");
  //     console.log(url);

  //     const acrualRes = await res.json();
  //     setminedsetting(acrualRes[0].navStandard);
  //     setlabsetting(acrualRes[0].navLabGrown);
  //     setfcsetting(acrualRes[0].navFancyColored);
  //     setcomparesetting(acrualRes[0].navCompare);

  //     // console.log(acrualRes[0].navLabGrown);
  //     // console.log(acrualRes[0].navStandard);
  //     // console.log(acrualRes[0].navFancyColored);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const onChange = (e) => {
    e.preventDefault();
    props.callBack(false);
    //console.log(getTab);
    // console.log(props);
    if (getTab === "mined" || getTab === "") {
      setCookie("_wpsavediamondfiltercookie", props, {
        path: "/",
        maxAge: 604800,
      });
    }
    if (getTab === "labgrown") {
      setCookie("_wpsavedlabgowndiamondfiltercookie", props, {
        path: "/",
        maxAge: 604800,
      });
    }
    if (getTab === "fancycolor") {
      setCookie("_wpsavedfancydiamondfiltercookie", props, {
        path: "/",
        maxAge: 604800,
      });
    }
  };

  const setOpenConfirm = (e) => {
    e.preventDefault();
    props.callBack(false);
    setLoaded(true);

    //console.log(getTab);
    removeCookie("shopify_diamondbackvalue", { path: "/" });
    removeCookie("_wpsaveringfiltercookie", { path: "/" });
    removeCookie("_wpsavediamondfiltercookie", { path: "/" });
    removeCookie("_wpsavedcompareproductcookie", { path: "/" });
    removeCookie("_shopify_diamondsetting", { path: "/" });
    removeCookie("shopify_ringbackvalue", { path: "/" });
    removeCookie("_shopify_ringsetting", { path: "/" });
    //if (getTab === "mined") {
    //console.log("mined selected");
    removeCookie("_wpsavediamondfiltercookie", { path: "/" });
    removeCookie("_wpsavedcompareproductcookie", { path: "/" });
    //}
    // if (getTab === "labgrown") {
    removeCookie("_wpsavedlabgowndiamondfiltercookie", { path: "/" });
    removeCookie("_wpsavedcompareproductcookie", { path: "/" });
    //}
    //if (getTab === "fancycolor") {
    removeCookie("_wpsavedcompareproductcookie", { path: "/" });
    removeCookie("_wpsavedfancydiamondfiltercookie", { path: "/" });
    removeCookie("compareproductcookie", { path: "/" });
    removeCookie("compareProductDiamondTypeCookie", { path: "/" });
    removeCookie("finalcompareproductcookie", { path: "/" });

    //}

    setTimeout(() => {
      navigate(`${process.env.PUBLIC_URL}`);
      window.location.reload();
    }, 3000);
  };

  const handleresetpopup = (e) => {
    e.preventDefault();
    setLoaded(false);
    setOpenResetModal(true);
  };

  //console.log(props);
  const handletab = (e) => {
    console.log("coming inside handletab");
    //e.preventDefault();
    if (window.compareproduct.length < 2 && e.target.id === "compare") {
      toast.error("Please select minimum 2 diamonds to compare.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      // console.log(e.target.id);

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

      if (e.target.id === "compare") {
        setTab(e.target.id);
        // console.log("loaded");
        // console.log(loaded);
        setLoaded(true);
        // console.log(JSON.stringify(window.compareproduct));
        if (window.compareproduct !== "") {
          setCookie(
            "_wpsavedcompareproductcookie",
            JSON.stringify(window.compareproduct),
            { path: "/", maxAge: 604800 }
          );
        }

        if (window.compareproduct) {
          var finalCompareData = [];
          var compareProductdata = "";
          var compareProductdata1 = "";
          var compareProductdata2 = "";

          var cookielength = window.compareproduct.length;
          const subFetch = async (element) => {
            // console.log(element + "   element");
            // console.log(window.compareProductDiamondType);
            const diamondTypeInfo = window.compareProductDiamondType.find(
              (item) => item.diamondId === element
            );
            // console.log(diamondTypeInfo);

            if (diamondTypeInfo && diamondTypeInfo.diamondType) {
              var diamondType = diamondTypeInfo.diamondType;
            }

            const res = await fetch(
              `${process.env.REACT_APP_URL}` +
                "/getDiamondDetailsApi/" +
                element +
                "/" +
                diamondType +
                "/" +
                window.initData.data[0].shop +
                "/" +
                false
            );

            const compareProductdata = await res.json();

            // const res = await fetch(
            //   `${window.initData.data[0].diamonddetailapi}DealerID=${window.initData.data[0].dealerid}&DID=${element}&IsLabGrown=false`
            // );
            // compareProductdata1 = await res.json();
            // if (
            //   compareProductdata1.diamondId === null ||
            //   compareProductdata1.diamondId === 0
            // ) {
            //   const res1 = await fetch(
            //     `${window.initData.data[0].diamonddetailapi}DealerID=${window.initData.data[0].dealerid}&DID=${element}&IsLabGrown=true`
            //   );
            //   compareProductdata2 = await res1.json();
            //   compareProductdata = compareProductdata2;
            // } else {
            //   compareProductdata = compareProductdata1;
            // }

            // console.log(compareProductdata);
            // console.log("compareProductdata1.diamondId");
            // console.log(compareProductdata1.diamondI);

            return compareProductdata;
          };
          // console.log(window.compareproduct.length);
          var i = 0;
          window.compareproduct.forEach((element) => {
            subFetch(element).then((compareProductdata) => {
              finalCompareData.push({
                shape: compareProductdata.shape,
                diamondId: compareProductdata.diamondId,
                caratWeight: compareProductdata.caratWeight,
                table: compareProductdata.table,
                color: compareProductdata.color,
                polish: compareProductdata.polish,
                symmetry: compareProductdata.symmetry,
                clarity: compareProductdata.clarity,
                fluorescence: compareProductdata.fluorescence,
                measurement: compareProductdata.measurement,
                certificate: compareProductdata.certificate,
                cut: compareProductdata.cut,
                mainHeader: compareProductdata.mainHeader,
                defaultDiamondImage: compareProductdata.defaultDiamondImage,
                fltPrice: compareProductdata.fltPrice,
                isLabCreated: compareProductdata.isLabCreated,
                isfancy: compareProductdata.fancyColorIntensity,
              });
              i++;
              if (i === window.compareproduct.length) {
                setTimeout(() => {
                  setLoaded(false);
                  navigate(`${process.env.PUBLIC_URL}/compare`);
                  window.location.reload();
                }, 6000);
              }
            });
          });

          setfinalcomparedata(finalCompareData);
          // console.log(finalCompareData.length);
        }
        setTimeout(() => {
          setCookie("finalcompareproductcookie", finalCompareData, {
            path: "/",
            maxAge: 604800,
          });
        }, 5000);

        // setTimeout(() => {
        //   setLoaded(false);
        //   navigate(`${process.env.PUBLIC_URL}/compare`);
        //   window.location.reload();
        // }, 6000);
      }

      if (e.target.id === "mined") {
        setTab(e.target.id);
        setLoaded(true);
        props.callbacktab(e.target.id);
        navigate(`${process.env.PUBLIC_URL}`);
        //window.location.reload();
      }
      if (e.target.id === "labgrown") {
        setTab(e.target.id);
        setLoaded(true);
        props.callbacktab(e.target.id);
        navigate(`${process.env.PUBLIC_URL}/navlabgrown`);
        //window.location.reload();
      }
      if (e.target.id === "fancycolor") {
        setTab(e.target.id);
        setLoaded(true);
        props.callbacktab(e.target.id);
        navigate(`${process.env.PUBLIC_URL}/navfancycolored`);
        //window.location.reload();
      }
    }
  };

  useEffect(() => {
    if (loaded === false) {
      // console.log(part);

      if (part === "navlabgrown") {
        setTab("labgrown");
        setLoaded(true);
      }
      if (part === "navfancycolored") {
        setTab("fancycolor");
        setLoaded(true);
      }
      if (part === "compare") {
        setTab("compare");
        //setLoaded(true);
      }
      if (window.compareproduct.length < 1 && part === "compare") {
        window.location.href = "diamondtools";
        navigate(`diamontools`);
        navigate(`${process.env.PUBLIC_URL}`);
        window.location.reload();
      }

      // if (getminedsetting !== "" && getminedsetting !== null) {
      //   setTab("mined");
      // }
      // if (getlabsetting !== "" && getlabsetting !== null) {
      //   setTab("labgrown");
      // }
      // if (getfcsetting !== "" && getfcsetting !== null) {
      //   setTab("fancycolor");
      // }
      // if (getcomparesetting !== "" && getcomparesetting !== null) {
      //   setTab("compare");
      // }
    }
    // console.log(getTab);
    // getNavigationData();
  }, [getTab, getminedsetting, getlabsetting, getfcsetting, getcomparesetting]);

  return (
    <>
      <style>
        {`.gf-diamond-filter{
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
            .gf-diamond-filter .gf-save-reset-filter .gf-navigation_right li a:hover svg{
                fill: #fff;
                stroke: #fff;
            }
            .gf-compareitems table tfoot tr td a{
              background-color:${window.initData["data"][0].button_colour}; 
            }
             .gf-compareitems table tfoot tr td a:hover{
              background-color:${window.initData["data"][0].hover_colour}; 
              color: #fff;
            }
            .gf-mobile-compare-view .gf-compare-mob-items .lists a{
              background-color:${window.initData["data"][0].button_colour}; 
            }
            .gf-mobile-compare-view .gf-compare-mob-items .lists a:hover{
              background-color:${window.initData["data"][0].hover_colour}; 
            }
            `}
      </style>
      <div className="gf-navigation_filter_left ">
        {getTab === "compare" && (
          <LoadingOverlay className="_gfloading_overlay_wrapper">
            <Loader fullPage loading={loaded} />
          </LoadingOverlay>
        )}
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <ul className="n_filter_left">
          {getminedsetting !== "" && getminedsetting !== null && (
            <li
              className={`${
                getTab === "mined" || getTab === "" ? "gf-active" : ""
              }`}
            >
              <a href="javascript:;" onClick={handletab} id="mined">
                {getminedsetting}
              </a>
              {window.initData.data[0].show_filter_info === "1" && (
                <span onClick={() => setOpenFirsts(true)}>
                  <i className="fas fa-info-circle"></i>{" "}
                </span>
              )}
              <Modal
                open={openFirsts}
                onClose={() => setOpenFirsts(false)}
                center
                classNames={{
                  overlay: "popup_Overlay",
                  modal: "popup_Modal",
                }}
              >
                <div className="popup_content">
                  <p>
                    Formed over billions of years, natural diamonds are mined
                    from the earth. Diamonds are the hardest mineral on earth,
                    which makes them an ideal material for daily wear over a
                    lifetime. Our natural diamonds are conflict-free and GIA
                    certified.
                  </p>{" "}
                </div>
              </Modal>
            </li>
          )}
          {getlabsetting !== "" && getlabsetting !== null && (
            <li className={`${getTab === "labgrown" ? "gf-active" : ""}`}>
              <a href="javascript:;" onClick={handletab} id="labgrown">
                {getlabsetting}
              </a>
              {window.initData.data[0].show_filter_info === "1" && (
                <span onClick={() => setOpenSeconds(true)}>
                  <i className="fas fa-info-circle"></i>{" "}
                </span>
              )}
              <Modal
                open={openSeconds}
                onClose={() => setOpenSeconds(false)}
                center
                classNames={{
                  overlay: "popup_Overlay",
                  modal: "popup_Modal",
                }}
              >
                <div className="popup_content">
                  <p>
                    Lab-grown diamonds are created in a lab by replicating the
                    high heat and high pressure environment that causes a
                    natural diamond to form. They are compositionally identical
                    to natural mined diamonds (hardness, density, light
                    refraction, etc), and the two look exactly the same. A
                    lab-grown diamond is an attractive alternative for those
                    seeking a product with less environmental footprint.
                  </p>{" "}
                </div>
              </Modal>
            </li>
          )}
          {getfcsetting !== "" && getfcsetting !== null && (
            <li className={`${getTab === "fancycolor" ? "gf-active" : ""}`}>
              <a href="javascript:;" onClick={handletab} id="fancycolor">
                {getfcsetting}
              </a>
              {window.initData.data[0].show_filter_info === "1" && (
                <span onClick={() => setOpenThirds(true)}>
                  <i className="fas fa-info-circle"></i>{" "}
                </span>
              )}
              <Modal
                open={openThirds}
                onClose={() => setOpenThirds(false)}
                center
                classNames={{
                  overlay: "popup_Overlay",
                  modal: "popup_Modal",
                }}
              >
                <div className="popup_content">
                  <p>
                    Also known as fancy color diamonds, these are diamonds with
                    colors that extend beyond GIA’s D-Z color grading scale.
                    They fall all over the color spectrum, with a range of
                    intensities and saturation. The most popular colors are pink
                    and yellow.
                  </p>
                </div>
              </Modal>
            </li>
          )}
          {getcomparesetting !== "" && getcomparesetting !== null && (
            <li className={`${getTab === "compare" ? "gf-active" : ""}`}>
              <a href="javascript:;" onClick={handletab} id="compare">
                {getcomparesetting}
              </a>
            </li>
          )}
        </ul>
      </div>

      <div className="gf-save-reset-filter">
        <ul className="gf-navigation_right">
          <li>
            <a href="javascript:;" onClick={onChange} className="gf-save-icon">
              <svg
                stroke="#fff"
                fill="#fff"
                stroke-width="0"
                viewBox="0 0 24 24"
                height="20px"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20.901 10.566A1.001 1.001 0 0 0 20 10h-4V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v7H4a1.001 1.001 0 0 0-.781 1.625l8 10a1 1 0 0 0 1.562 0l8-10c.24-.301.286-.712.12-1.059z"></path>
              </svg>
              Save Search
            </a>
          </li>
          <li>
            <a
              href="javascript:;"
              onClick={handleresetpopup}
              className="gf-reset-icon"
            >
              <svg
                stroke="#fff"
                fill="#fff"
                stroke-width="0"
                viewBox="0 0 512 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M464 440l-28.12-32.11c-22.48-25.65-43.33-45.45-72.08-58.7-26.61-12.26-60-18.65-104.27-19.84V432L48 252 259.53 72v103.21c72.88 3 127.18 27.08 161.56 71.75C449.56 284 464 335.19 464 399.26z"></path>
              </svg>
              Reset
            </a>

            <Modal
              open={openResetModal}
              onClose={() => setOpenResetModal(false)}
              center
              classNames={{
                overlay: "popup_Overlay",
                modal: "popup__reset",
              }}
            >
              <LoadingOverlay className="_gfloading_overlay_wrapper">
                <Loader fullPage loading={loaded} />
              </LoadingOverlay>
              <p>Are you sure you want to reset data?</p>
              <div className="reset_popup-btn">
                <button
                  className="button gf-btn btn_left"
                  onClick={setOpenConfirm}
                >
                  OK
                </button>
                <button
                  className="button gf-btn"
                  onClick={() => setOpenResetModal(false)}
                >
                  CANCEL
                </button>
              </div>
            </Modal>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Filter;
