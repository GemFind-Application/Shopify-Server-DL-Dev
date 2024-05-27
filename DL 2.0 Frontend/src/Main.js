import React, { useEffect, useState } from "react";
import { Routes, Route, Router, Redirect, useLocation } from "react-router-dom";
import DiamondtoolSetting from "./components/diamondtoolsettings/DiamondtoolSetting";
import DiamondSettingDetails from "./components/diamondsettings-details/DiamondSettingDetails";
import Skeleton from "react-loading-skeleton";
import NotFound from "./components/NotFound";

const Main = () => {
  const [skeltonLoad, setskeltonLoad] = useState(false);
  const { pathname } = useLocation();

  const getInitTool = async (storename) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ shop_domain: storename }),
    };

    try {
      const res = await fetch(
        `${process.env.REACT_APP_URL}` + "/initToolApi",
        requestOptions
      );
      const initData = await res.json();
      window.initData = initData;
      // console.log(window.initData);
      window.currency = window.initData["data"][0].currency;
      window.currencyFrom = window.initData["data"][0].currencyFrom;
      window.compareproduct = [];
      window.compareProductDiamondType = [];

      window.miniprice = 0;
      window.serverurl = window.initData.data[0].server_url;
      window.maxprice = 0;
      window.spinloader = "true";
      setskeltonLoad(true);
      if (window.initData["data"][0].show_powered_by === "1") {
        // console.log('window.initData["data"][0].show_powered_by');
        // console.log(window.initData["data"][0].show_powered_by);
        document.getElementById(
          "gemfind_diamondtool_powered_by"
        ).style.display = "block";
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // console.log("coming here for test");
    // console.log(window.initData.data[0].show_powered_by);

    // Append the div to the body of the page
    document.body.classList.add("gf_dl_tool");
    //getInitTool(document.getElementById("shop_domain").value);
    // console.log("coming back ");
    if (window.location.href.indexOf("localhost") > -1) {
      getInitTool("gemfind-app-store.myshopify.com");
    } else {
      getInitTool(document.getElementById("shop_domain").value);
    }
  }, []);

  if (skeltonLoad === true) {
    return (
      <Routes basename={"/diamondtools"}>
        <Route
          path={`${process.env.PUBLIC_URL}/`}
          element={<DiamondtoolSetting />}
        ></Route>

        <Route
          path={`${process.env.PUBLIC_URL}/*`}
          element={<DiamondtoolSetting />}
        ></Route>

        <Route
          path={`${process.env.PUBLIC_URL}/diamonds`}
          element={<DiamondtoolSetting />}
        ></Route>
        <Route
          path={`${process.env.PUBLIC_URL}/diamondtype/navlabgrown`}
          element={<DiamondtoolSetting />}
        ></Route>

        <Route
          path={`${process.env.PUBLIC_URL}/diamondtype/navfancycolored`}
          element={<DiamondtoolSetting />}
        ></Route>

        <Route
          path={`${process.env.PUBLIC_URL}/navlabgrown`}
          element={<DiamondtoolSetting />}
        ></Route>
        <Route
          path={`${process.env.PUBLIC_URL}/compare`}
          element={<DiamondtoolSetting />}
        ></Route>
        <Route
          path={`${process.env.PUBLIC_URL}/navfancycolored`}
          element={<DiamondtoolSetting />}
        ></Route>
        <Route
          path={`${process.env.PUBLIC_URL}/product/*`}
          element={<DiamondSettingDetails />}
        ></Route>
        <Route
          path={`${process.env.PUBLIC_URL}/product/*/*`}
          element={<DiamondSettingDetails />}
        ></Route>
        <Route path="*" element={<NotFound />}></Route>

        <Route
          path={`${process.env.PUBLIC_URL}/shape/:shape`}
          element={<DiamondtoolSetting />}
        ></Route>

        <Route
          path={`${process.env.PUBLIC_URL}/diamondtype/navlabgrown/shape/:shape`}
          element={<DiamondtoolSetting />}
        ></Route>

        <Route
          path={`${process.env.PUBLIC_URL}/navlabgrown/shape/:shape`}
          element={<DiamondtoolSetting />}
        ></Route>

        <Route
          path={`${process.env.PUBLIC_URL}/diamondtype/navfancycolored/shape/:shape`}
          element={<DiamondtoolSetting />}
        ></Route>

        <Route
          path={`${process.env.PUBLIC_URL}/navfancycolored/shape/:shape`}
          element={<DiamondtoolSetting />}
        ></Route>
      </Routes>
    );
  } else {
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
};

export default Main;
