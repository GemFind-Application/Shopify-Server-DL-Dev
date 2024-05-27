import React, { useEffect, useState } from "react";
import Breadcumb from "../elements/Breadcumb";
import Topheader from "../elements/Topheader";
import Data from "../elements/data";
import { useLocation } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { useCookies } from "react-cookie";

const Compare = () => {
    return (
        <>
            <div className="gf-tool-container">
                <div className="breadCumbs">
                    {/* {Data.map((item) => (
            <Breadcumb Data={item} key={item.key} />
          ))} */}
                </div>
                <div className="gf-product-info"></div>
            </div>
        </>
    );
};

export default Compare;
