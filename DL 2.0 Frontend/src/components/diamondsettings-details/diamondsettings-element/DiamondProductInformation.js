import React, { useEffect, useState } from "react";
import { Modal } from "react-responsive-modal";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Print from "../../../images/print_icon.gif";
import { useLocation } from "react-router-dom";
import { LoadingOverlay, Loader } from "react-overlay-loader";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";
// import ReactFBLike from "react-fb-like";
// import InputLabel from "@mui/material/InputLabel";
import { FacebookProvider, Like } from "react-facebook";
import ReCAPTCHA from "react-google-recaptcha";
import TimelineItem from "rsuite/esm/Timeline/TimelineItem";

// import { useNavigate } from "react-router-dom";

function formatprice(finalprice) {
  finalprice = finalprice.toString();
  var lastThree = finalprice.substring(finalprice.length - 3);
  var otherNumbers = finalprice.substring(0, finalprice.length - 3);
  if (otherNumbers != "") lastThree = "," + lastThree;
  return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
}

const DiamondProductInformation = (props) => {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [cookies, setCookie] = useCookies(["_shopify_diamondsetting"]);
  const [getsettingcookies, setsettingcookies] = useCookies([
    "_shopify_ringsetting",
  ]);
  const [getDiamondCookie, setDiamondCookie] = useState(false);
  const [getsettingcookie, setsettingcookie] = useState(false);
  const navigate = useNavigate();
  let errors = {};
  let formIsValid = true;
  const locationurl = useLocation();

  const onOpenModal = (e) => {
    e.preventDefault();
    setOpen(true);
  };
  const onCloseModal = () => setOpen(false);
  const [openSecond, setOpenSecond] = useState(false);
  const [openThird, setOpenThird] = useState(false);
  const [openFour, setOpenFour] = useState(false);
  const [openFive, setOpenFive] = useState(false);
  const [openSix, setOpenSix] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [isRecaptchaVerified, setIsRecaptchaVerified] = useState(false);
  const currentDate = new Date().toISOString().split("T")[0];

  const addressList = props.productDetailsData.retailerInfo.addressList;

  const timingList = props.productDetailsData.retailerInfo.timingList;

  // Extract the day names, start times, and end times
  const days = [
    {
      name: "Sunday",
      start: timingList ? timingList[0].sundayStart : "NA",
      end: timingList ? timingList[0].sundayEnd : "NA",
    },
    {
      name: "Monday",
      start: timingList ? timingList[0].mondayStart : "NA",
      end: timingList ? timingList[0].mondayEnd : "NA",
    },
    {
      name: "Tuesday",
      start: timingList ? timingList[0].tuesdayStart : "NA",
      end: timingList ? timingList[0].tuesdayEnd : "NA",
    },
    {
      name: "Wednesday",
      start: timingList ? timingList[0].wednesdayStart : "NA",
      end: timingList ? timingList[0].wednesdayEnd : "NA",
    },
    {
      name: "Thursday",
      start: timingList ? timingList[0].thursdayStart : "NA",
      end: timingList ? timingList[0].thursdayEnd : "NA",
    },
    {
      name: "Friday",
      start: timingList ? timingList[0].fridayStart : "NA",
      end: timingList ? timingList[0].fridayEnd : "NA",
    },
    {
      name: "Saturday",
      start: timingList ? timingList[0].saturdayStart : "NA",
      end: timingList ? timingList[0].saturdayEnd : "NA",
    },
  ];

  // Filter days with available slots
  const daysWithSlots = days.filter((day) => day.start);

  const [missingDays, setMissingDays] = useState([]);

  useEffect(() => {
    const foundDays = daysWithSlots.map((day) => day.name);
    const allDays = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    const missing = allDays.filter((day) => !foundDays.includes(day));
    setMissingDays(missing);
  }, []);

  const handleRecaptchaChange = (response) => {
    setRecaptchaToken(response);
    setIsRecaptchaVerified(true); // Set verification status
  };

  const onOpenSecondModal = (e) => {
    e.preventDefault();
    setyourname("");
    setyouremail("");
    setrecipientname("");
    setrecipientemail("");
    setgiftreason("");
    sethintmessage("");
    setgiftdeadline("");
    setOpenSecond(true);
  };
  const onOpenThirdModal = (e) => {
    e.preventDefault();
    setreqname("");
    setreqemail("");
    setreqphone("");
    setreqmsg("");
    setreqcp("");
    setOpenThird(true);
  };
  const onOpenFourthModal = (e) => {
    e.preventDefault();
    setname("");
    setemail("");
    setfrndname("");
    setfrndemail("");
    setfrndmessage("");
    setOpenFour(true);
  };
  const onOpenFifthModal = (e) => {
    e.preventDefault();
    setschdname("");
    setschdemail("");
    setschdphone("");
    setschdmsg("");
    setschddate("");
    setschdtime("");
    setLocation("");
    setOpenFive(true);
  };

  //DROP HINT SUBMIT BUTTON
  const [getyourname, setyourname] = useState("");
  const [getyouremail, setyouremail] = useState("");
  const [getrecipientname, setrecipientname] = useState("");
  const [getrecipientemail, setrecipientemail] = useState("");
  const [getgiftreason, setgiftreason] = useState("");
  const [gethintmessage, sethintmessage] = useState("");
  const [getgiftdeadline, setgiftdeadline] = useState("");

  const [geterror, seterror] = useState([""]);

  const handleYourname = (event) => {
    setyourname(event.target.value);
  };
  const handleYouremail = (event) => {
    setyouremail(event.target.value);
  };
  const handleRecipientname = (event) => {
    setrecipientname(event.target.value);
  };
  const handleRecipientemail = (event) => {
    setrecipientemail(event.target.value);
  };
  const handleGiftreason = (event) => {
    setgiftreason(event.target.value);
  };
  const handleHintmessage = (event) => {
    sethintmessage(event.target.value);
  };
  const handleGiftdeadline = (event) => {
    setgiftdeadline(event.target.value);
  };

  const handledrophintSubmit = async (e) => {
    e.preventDefault();
    setLoaded(true);

    //Validation

    //Name
    if (getyourname === "") {
      errors["yourname"] = "Please enter your name";
      formIsValid = false;
    }
    if (getrecipientname === "") {
      errors["yourrpname"] = "Please enter your recipient name";
      formIsValid = false;
    }

    //Email
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (regex.test(getyouremail) === false) {
      errors["youremail"] = "Please enter valid email";
      formIsValid = false;
    }
    if (regex.test(getrecipientemail) === false) {
      errors["youremail"] = "Please enter valid email";
      formIsValid = false;
    }

    //Reason
    if (getgiftreason === "") {
      errors["yourreason"] = "Please enter your reason";
      formIsValid = false;
    }

    //Message
    if (gethintmessage === "") {
      errors["yourmsg"] = "Please enter your message";
      formIsValid = false;
    }

    //Deadline
    if (getgiftdeadline === "") {
      errors["yourdeadline"] = "Please enter your deadline";
      formIsValid = false;
    }

    if (
      window.initData.data[0].site_key &&
      window.initData.data[0].secret_key
    ) {
      if (recaptchaToken === "") {
        errors["yourrecaptcha"] = "The recaptcha token field is required.";
        formIsValid = false;
      }
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
        name: getyourname,
        email: getyouremail,
        hint_Recipient_name: getrecipientname,
        hint_Recipient_email: getrecipientemail,
        reason_of_gift: getgiftreason,
        hint_message: gethintmessage,
        deadline: getgiftdeadline,
        diamondurl: window.location.href,
        diamondid: props.productDetailsData.diamondId,
        diamondtype: props.productDetailsData.isLabCreated,
        shopurl: window.initData.data[0].shop,
        currency: window.currency,
        recaptchaToken: recaptchaToken,
      }),
    };
    try {
      const res = await fetch(
        `${window.serverurl}/api/dlDropHintApi`,
        requestOptions
      );
      const hintData = await res.json();
      if (hintData.success === true) {
        toast(hintData.message);
      } else {
        toast(hintData.message);
      }
      setOpenSecond(false);
      // toast("Thanks for your submission.");
      setLoaded(false);
      setyourname("");
      setyouremail("");
      setrecipientname("");
      setrecipientemail("");
      setgiftreason("");
      sethintmessage("");
      setgiftdeadline("");
      seterror("");
    } catch (error) {
      console.log(error);
    }
  };

  //REQUEST MORE INFORMATION SUBMIT BUTTON

  const [getreqname, setreqname] = useState("");
  const [getreqemail, setreqemail] = useState("");
  const [getreqphone, setreqphone] = useState("");
  const [getreqmsg, setreqmsg] = useState("");
  const [getreqcp, setreqcp] = useState("");

  const [getreqerror, setreqerror] = useState([""]);

  const handleReqname = (event) => {
    setreqname(event.target.value);
  };
  const handleReqemail = (event) => {
    setreqemail(event.target.value);
  };
  const handleReqphone = (event) => {
    setreqphone(event.target.value);
  };
  const handleReqmsg = (event) => {
    setreqmsg(event.target.value);
  };
  const handleReqcp = (event) => {
    setreqcp(event.target.value);
  };

  const handlereginfoSubmit = async (e) => {
    e.preventDefault();
    setLoaded(true);

    //Validation

    //Name
    if (getreqname === "") {
      errors["yourname"] = "Please enter your name";
      formIsValid = false;
    }

    //Email
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (regex.test(getreqemail) === false) {
      errors["youremail"] = "Please enter valid email";
      formIsValid = false;
    }

    //Phone no.
    var pattern = new RegExp(/^[0-9\b]+$/);
    if (!pattern.test(getreqphone)) {
      errors["yourphone"] = "Please enter only number";
      formIsValid = false;
    } else if (getreqphone.length != 10) {
      errors["yourphone"] = "Please enter valid phone number.";
      formIsValid = false;
    }

    //Message
    if (getreqmsg === "") {
      errors["yourmsg"] = "Please enter your message";
      formIsValid = false;
    }

    //Contact Preference
    if (getreqcp === "") {
      errors["yourcp"] = "Please select contact preference";
      formIsValid = false;
    }

    if (
      window.initData.data[0].site_key &&
      window.initData.data[0].secret_key
    ) {
      if (recaptchaToken === "") {
        errors["yourreqrecaptcha"] = "The recaptcha token field is required.";
        formIsValid = false;
      }
    }

    if (formIsValid == false) {
      console.log(errors);
      setreqerror(errors);
      setLoaded(false);
      return;
    }

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: getreqname,
        email: getreqemail,
        phone_no: getreqphone,
        message: getreqmsg,
        contact_preference: getreqcp,
        diamondurl: window.location.href,
        diamondid: props.productDetailsData.diamondId,
        diamondtype: props.productDetailsData.isLabCreated,
        shopurl: window.initData.data[0].shop,
        currency: window.currency,
        recaptchaToken: recaptchaToken,
      }),
    };
    try {
      const res = await fetch(
        `${window.serverurl}/api/dlReqInfoApi`,
        requestOptions
      );
      const reqData = await res.json();
      setOpenThird(false);
      if (reqData.success === true) {
        toast(reqData.message);
      } else {
        toast(reqData.message);
      }
      //toast("Thanks for your submission.");
      setLoaded(false);
      setreqname("");
      setreqemail("");
      setreqphone("");
      setreqmsg("");
      setreqcp("");
      setreqerror("");
    } catch (error) {
      console.log(error);
    }
  };

  //EMAIL A FRIENDS SUBMIT BUTTON
  const [getname, setname] = useState("");
  const [getemail, setemail] = useState("");
  const [getfrndname, setfrndname] = useState("");
  const [getfrndemail, setfrndemail] = useState("");
  const [getfrndmessage, setfrndmessage] = useState("");

  const [getfrnderror, setfrnderror] = useState([""]);

  const handleName = (event) => {
    setname(event.target.value);
  };
  const handleEmail = (event) => {
    setemail(event.target.value);
  };
  const handleFrndname = (event) => {
    setfrndname(event.target.value);
  };
  const handleFrndemail = (event) => {
    setfrndemail(event.target.value);
  };
  const handleFrndmessage = (event) => {
    setfrndmessage(event.target.value);
  };

  const handleemailfrndSubmit = async (e) => {
    e.preventDefault();
    setLoaded(true);

    //Validation

    //Name
    if (getname === "") {
      errors["yourname"] = "Please enter your name";
      formIsValid = false;
    }
    if (getfrndname === "") {
      errors["yourfrnname"] = "Please enter your friend name";
      formIsValid = false;
    }

    //Email
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (regex.test(getemail) === false) {
      errors["youremail"] = "Please enter valid email";
      formIsValid = false;
    }
    if (regex.test(getfrndemail) === false) {
      errors["youremail"] = "Please enter valid email";
      formIsValid = false;
    }

    //Message
    if (getfrndmessage === "") {
      errors["yourmsg"] = "Please enter your message";
      formIsValid = false;
    }

    if (
      window.initData.data[0].site_key &&
      window.initData.data[0].secret_key
    ) {
      if (recaptchaToken === "") {
        errors["yourfrndrecaptcha"] = "The recaptcha token field is required.";
        formIsValid = false;
      }
    }

    if (formIsValid == false) {
      console.log(errors);
      setfrnderror(errors);
      setLoaded(false);
      return;
    }

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: getname,
        email: getemail,
        frnd_name: getfrndname,
        frnd_email: getfrndemail,
        frnd_message: getfrndmessage,
        diamondurl: window.location.href,
        diamondid: props.productDetailsData.diamondId,
        diamondtype: props.productDetailsData.isLabCreated,
        shopurl: window.initData.data[0].shop,
        currency: window.currency,
        recaptchaToken: recaptchaToken,
      }),
    };
    try {
      const res = await fetch(
        `${window.serverurl}/api/dlEmailFriendApi`,
        requestOptions
      );
      const frndData = await res.json();
      setOpenFour(false);
      if (frndData.success === true) {
        toast(frndData.message);
      } else {
        toast(frndData.message);
      }
      //toast("Thanks for your submission.");
      setLoaded(false);
      setname("");
      setemail("");
      setfrndname("");
      setfrndemail("");
      setfrndmessage("");
      setfrnderror("");
    } catch (error) {
      console.log(error);
    }
  };
  //SCHEDULE VIWING SUBMIT BUTTON

  const [getschdname, setschdname] = useState("");
  const [getschdemail, setschdemail] = useState("");
  const [getschdphone, setschdphone] = useState("");
  const [getschdmsg, setschdmsg] = useState("");
  const [getschddate, setschddate] = useState(currentDate);
  const [getschdtime, setschdtime] = useState("");
  const [location, setLocation] = useState("");

  const [getschderror, setschderror] = useState([""]);
  const [errorMessage, setErrorMessage] = useState("");

  const [getblankvalue, setblankvalue] = useState([""]);

  const handleSchdname = (event) => {
    setschdname(event.target.value);
  };
  const handleSchdemail = (event) => {
    setschdemail(event.target.value);
  };
  const handleSchdphone = (event) => {
    setschdphone(event.target.value);
  };
  const handleSchdmsg = (event) => {
    setschdmsg(event.target.value);
  };
  const handleSchddate = (event) => {
    // setschddate(event.target.value);

    const selectedDate = event.target.value;
    // Parse the selected date to a JavaScript Date object
    const selectedDateObj = new Date(selectedDate);

    const selectedDay = selectedDateObj.toLocaleDateString("en-US", {
      weekday: "long",
    });

    if (missingDays.includes(selectedDay)) {
      setErrorMessage("Slots not available on selected date");
      setschddate("");
    } else {
      setErrorMessage("");
      setschddate(selectedDate);
    }
  };

  const handleSchdtime = (event) => {
    setschdtime(event.target.value);
  };
  const handleChange = (event) => {
    setLocation(event.target.value);
  };

  const handleschdSubmit = async (e) => {
    e.preventDefault();
    setLoaded(true);

    //Validation

    //Name
    if (getschdname === "") {
      errors["yourname"] = "Please enter your name";
      formIsValid = false;
    }

    //Email
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (regex.test(getschdemail) === false) {
      errors["youremail"] = "Please enter valid email";
      formIsValid = false;
    }

    //Phone no.
    var pattern = new RegExp(/^[0-9\b]+$/);
    if (!pattern.test(getschdphone)) {
      errors["yourphone"] = "Please enter only number";
      formIsValid = false;
    } else if (getschdphone.length != 10) {
      errors["yourphone"] = "Please enter valid phone number.";
      formIsValid = false;
    }

    //Message
    if (getschdmsg === "") {
      errors["yourmsg"] = "Please enter your message";
      formIsValid = false;
    }

    //Location
    if (location === "") {
      errors["yourlocation"] = "Please select your location";
      formIsValid = false;
    }

    //Availibilty Date
    if (getschddate === "") {
      errors["yourdate"] = "Please select your availibility date";
      formIsValid = false;
    }

    if (getschdtime === "") {
      errors["yourtime"] = "Please Select Timing list";
      formIsValid = false;
    }

    if (getschdtime.includes("NA")) {
      errors["yourtime"] = "Timing list is Not Applicable";
      formIsValid = false;
    }

    if (
      window.initData.data[0].site_key &&
      window.initData.data[0].secret_key
    ) {
      if (recaptchaToken === "") {
        errors["yourscrecaptcha"] = "The recaptcha token field is required.";
        formIsValid = false;
      }
    }

    if (formIsValid == false) {
      console.log(errors);
      setschderror(errors);
      setLoaded(false);
      return;
    }

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: getschdname,
        email: getschdemail,
        phone_no: getschdphone,
        schl_message: getschdmsg,
        location: location,
        availability_date: getschddate,
        appnt_time: getschdtime,
        diamondurl: window.location.href,
        diamondid: props.productDetailsData.diamondId,
        diamondtype: props.productDetailsData.isLabCreated,
        shopurl: window.initData.data[0].shop,
        currency: window.currency,
        recaptchaToken: recaptchaToken,
      }),
    };
    try {
      const res = await fetch(
        `${window.serverurl}/api/dlScheViewApi`,
        requestOptions
      );
      const schdData = await res.json();
      setOpenFive(false);
      if (schdData.success === true) {
        toast(schdData.message);
      } else {
        toast(schdData.message);
      }
      //toast("Thanks for your submission.");
      setLoaded(false);
      setschdname("");
      setschdemail("");
      setschdphone("");
      setschdmsg("");
      setschddate("");
      setschdtime("");
      setLocation("");
      setschderror("");
    } catch (error) {
      console.log(error);
    }
  };

  //Add To Cart
  const handleAddToCart = async (e) => {
    e.preventDefault();
    setLoaded(true);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        shop_domain: window.initData.data[0].shop,
        diamond_id: props.productDetailsData.diamondId,
        dealer_id: window.initData.data[0].dealerid,
        is_lab: props.productDetailsData.isLabCreated,
      }),
    };
    try {
      const res = await fetch(
        `${window.serverurl}/api/addToCart`,
        requestOptions
      );
      const addtocartData = await res.json();
      setLoaded(false);
      window.location.href = addtocartData;
    } catch (error) {
      console.log(error);
    }
  };

  // console.log("props.productDetailsData");
  // console.log(props.productDetailsData);

  //Print API
  const handlePrintDetails = async (e) => {
    e.preventDefault();
    // setLoaded(true);

    var url =
      `${window.serverurl}/api/printDiamond/` +
      window.initData.data[0].shop +
      "/" +
      props.productDetailsData.diamondId +
      "/" +
      props.productDetailsData.isLabCreated;

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `Diamond-${props.productDetailsData.diamondId}.pdf`
    );

    // Append to html link element page
    document.body.appendChild(link);
    // Start download
    link.click();
    link.parentNode.removeChild(link);
    setLoaded(false);

    // const requestOptions = {
    //   method: "GET",
    //   responseType: "blob",
    //   mode: "no-cors",
    // };
    // try {
    //   const res = await fetch(
    //     "https://rb-advance-dev.partners.gemfind.com/api/printDiamond/" +
    //       window.initData.data[0].shop +
    //       "/" +
    //       props.productDetailsData.diamondId +
    //       "/" +
    //       props.productDetailsData.isLabCreated,
    //     requestOptions
    //   )
    //     .then((response) => response.blob())
    //     .then((blob) => {
    //       // Create blob link to download
    //       const url = window.URL.createObjectURL(new Blob([blob]));
    //       const link = document.createElement("a");
    //       link.href = url;
    //       link.setAttribute(
    //         "download",
    //         `Diamond-${props.productDetailsData.diamondId}.pdf`
    //       );

    //       // Append to html link element page
    //       document.body.appendChild(link);

    //       // Start download
    //       link.click();

    //       // Clean up and remove the link
    //       link.parentNode.removeChild(link);
    //       setLoaded(false);
    //     });
    //   // const printData = await res.json();
    // } catch (error) {
    //   console.log(error);
    // }
  };

  useEffect(() => {
    if (
      cookies._shopify_diamondsetting &&
      cookies._shopify_diamondsetting[0].diamondId
    ) {
      setDiamondCookie(true);
    }
    if (
      getsettingcookies._shopify_ringsetting &&
      getsettingcookies._shopify_ringsetting[0].setting_id
    ) {
      setsettingcookie(true);
    }
  });

  // console.log("props.productDetailsData");
  // console.log(props.productDetailsData);

  return (
    <>
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

      <div className="gf-ring-descreption">
        <LoadingOverlay className="_gfloading_overlay_wrapper">
          <Loader fullPage loading={loaded} />
        </LoadingOverlay>
        <div className="gf-product-info__title">
          <h2>{props.productDetailsData.mainHeader}</h2>
          <h4 className="gf-ring-spacifacation">
            <a href="#" onClick={onOpenModal}>
              <span>
                <i className="far fa-edit"></i>
              </span>
              Diamond Specification
            </a>
          </h4>
          <Modal
            open={open}
            onClose={onCloseModal}
            center
            classNames={{
              overlay: "popup_Overlay",
              modal: "popup_diamond-product",
            }}
          >
            <div className="popup_content">
              <div className="diamond-information">
                <div className="spacification-info">
                  <h2>Diamond Details</h2>
                </div>
                <ul className="diamond-spacification-list">
                  <li>
                    <div className="diamonds-details-title">
                      <p>Stock Number</p>
                    </div>
                    <div className="diamonds-info">
                      <p>
                        {props.productDetailsData.stockNumber
                          ? props.productDetailsData.stockNumber
                          : "-"}
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="diamonds-details-title">
                      <p>Price</p>
                    </div>
                    <div className="diamonds-info">
                      <p>
                        {props.productDetailsData.fltPrice === "Call for Price"
                          ? "Call For Price"
                          : window.initData.data[0].price_row_format === "1"
                          ? props.productDetailsData.currencyFrom === "USD"
                            ? window.currency +
                              Number(
                                props.productDetailsData.fltPrice
                              ).toLocaleString(undefined, {
                                maximumFractionDigits: 0,
                              })
                            : props.productDetailsData.currencyFrom +
                              "  " +
                              props.productDetailsData.currencySymbol +
                              "  " +
                              Number(
                                props.productDetailsData.fltPrice
                              ).toLocaleString(undefined, {
                                maximumFractionDigits: 0,
                              })
                          : props.productDetailsData.currencyFrom === "USD"
                          ? window.currency +
                            Number(
                              props.productDetailsData.fltPrice
                            ).toLocaleString(undefined, {
                              maximumFractionDigits: 0,
                            })
                          : Number(
                              props.productDetailsData.fltPrice
                            ).toLocaleString(undefined, {
                              maximumFractionDigits: 0,
                            }) +
                            "  " +
                            props.productDetailsData.currencySymbol +
                            "  " +
                            props.productDetailsData.currencyFrom}
                        {/* {props.productDetailsData.fltPrice !== "Call for Price"
                          ? Number(
                              props.productDetailsData.fltPrice
                            ).toLocaleString(undefined, {
                              maximumFractionDigits: 0,
                            })
                          : "Call for Price"} */}
                      </p>
                    </div>
                  </li>
                  {/* <li>
                    <div className="diamonds-details-title">
                      <p>Price Per Carat</p>
                    </div>
                    <div className="diamonds-info">
                      <p>
                        {props.productDetailsData.fltPrice === "Call for Price"
                          ? "Call For Price"
                          : window.initData.data[0].price_row_format === "1"
                          ? props.productDetailsData.currencyFrom === "USD"
                            ? window.currency +
                              props.productDetailsData.costPerCarat
                            : props.productDetailsData.currencyFrom +
                              "  " +
                              props.productDetailsData.currencySymbol +
                              "  " +
                              props.productDetailsData.costPerCarat
                          : props.productDetailsData.currencyFrom === "USD"
                          ? window.currency +
                            props.productDetailsData.costPerCarat
                          : props.productDetailsData.costPerCarat +
                            "  " +
                            props.productDetailsData.currencySymbol +
                            "  " +
                            props.productDetailsData.currencyFrom}
                      </p>
                    </div>
                  </li> */}
                  <li>
                    <div className="diamonds-details-title">
                      <p>Carat Weight</p>
                    </div>
                    <div className="diamonds-info">
                      <p>
                        {props.productDetailsData.caratWeight
                          ? props.productDetailsData.caratWeight
                          : "-"}
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="diamonds-details-title">
                      <p>Cut</p>
                    </div>
                    <div className="diamonds-info">
                      <p>
                        {props.productDetailsData.cut
                          ? props.productDetailsData.cut
                          : "-"}
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="diamonds-details-title">
                      <p>Clarity</p>
                    </div>
                    <div className="diamonds-info">
                      <p>
                        {props.productDetailsData.clarity
                          ? props.productDetailsData.clarity
                          : "-"}
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="diamonds-details-title">
                      <p>Depth %</p>
                    </div>
                    <div className="diamonds-info">
                      <p>
                        {props.productDetailsData.depth
                          ? props.productDetailsData.depth
                          : "-"}
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="diamonds-details-title">
                      <p>Table %</p>
                    </div>
                    <div className="diamonds-info">
                      <p>
                        {props.productDetailsData.table
                          ? props.productDetailsData.table
                          : "-"}
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="diamonds-details-title">
                      <p>Polish</p>
                    </div>
                    <div className="diamonds-info">
                      <p>
                        {props.productDetailsData.polish
                          ? props.productDetailsData.polish
                          : "-"}
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="diamonds-details-title">
                      <p>Symmetry</p>
                    </div>
                    <div className="diamonds-info">
                      <p>
                        {props.productDetailsData.symmetry
                          ? props.productDetailsData.symmetry
                          : "-"}
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="diamonds-details-title">
                      <p>Origin</p>
                    </div>
                    <div className="diamonds-info">
                      <p>
                        {props.productDetailsData.origin
                          ? props.productDetailsData.origin
                          : "-"}
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="diamonds-details-title">
                      <p>Girdle</p>
                    </div>
                    <div className="diamonds-info">
                      <p>
                        {props.productDetailsData.girdleThick
                          ? props.productDetailsData.girdleThick
                          : "-"}
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="diamonds-details-title">
                      <p>Culet</p>
                    </div>
                    <div className="diamonds-info">
                      <p>
                        {props.productDetailsData.culet
                          ? props.productDetailsData.culet
                          : "-"}
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="diamonds-details-title">
                      <p>Fluorescence</p>
                    </div>
                    <div className="diamonds-info">
                      <p>
                        {props.productDetailsData.fluorescence
                          ? props.productDetailsData.fluorescence
                          : "-"}
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="diamonds-details-title">
                      <p>Measurement</p>
                    </div>
                    <div className="diamonds-info">
                      <p>
                        {props.productDetailsData.measurement
                          ? props.productDetailsData.measurement
                          : "-"}
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </Modal>
        </div>
        <div className="gf-product-info__descreption">
          <p>{props.productDetailsData.subHeader}</p>
        </div>
        <div className="gf-diamond-intro-field">
          <ul>
            <li>
              <strong>Report:</strong>
              {props.productDetailsData.certificate !== "" && (
                <p>{props.productDetailsData.certificate}</p>
              )}
              {props.productDetailsData.certificate === "" && <p>None</p>}
            </li>
            <li>
              <strong>Cut:</strong>
              {props.productDetailsData.cut !== "" && (
                <p>{props.productDetailsData.color}</p>
              )}
              {props.productDetailsData.cut === "" && <p>NA</p>}
            </li>
          </ul>
          <ul>
            <li>
              <strong>Color:</strong>
              <p>
                {props.productDetailsData.color
                  ? props.productDetailsData.color
                  : "NA"}
              </p>
            </li>
            <li>
              <strong>Clarity:</strong>
              <p>
                {props.productDetailsData.clarity
                  ? props.productDetailsData.clarity
                  : "NA"}
              </p>
            </li>
          </ul>
        </div>
        <div className="gf-product-controller">
          <ul>
            {window.initData.data[0].enable_hint === "1" && (
              <li>
                <a href="javascript:;" onClick={onOpenSecondModal}>
                  <span>
                    <i className="fas fa-gift"></i>
                  </span>
                  Drop A Hint
                </a>
                <Modal
                  open={openSecond}
                  onClose={() => setOpenSecond(false)}
                  center
                  classNames={{
                    overlay: "popup_Overlay",
                    modal: "popup-form",
                  }}
                >
                  <LoadingOverlay className="_gfloading_overlay_wrapper">
                    <Loader fullPage loading={loaded} />
                  </LoadingOverlay>

                  <div className="Diamond-form">
                    <div className="gf-requested-form">
                      <h2>Drop A Hint</h2>
                      <p>Because you deserve this.</p>
                    </div>
                    <form
                      onSubmit={handledrophintSubmit}
                      className="drop-hint-form"
                    >
                      <div className="gf-form-field">
                        <TextField
                          id="drophint_name"
                          label="Your Name"
                          focused
                          variant="outlined"
                          value={getyourname}
                          onChange={handleYourname}
                        />
                        <p> {geterror.yourname} </p>
                        <TextField
                          id="drophint_email"
                          type="email"
                          label="Your E-mail"
                          focused
                          variant="outlined"
                          value={getyouremail}
                          onChange={handleYouremail}
                        />
                        <p> {geterror.youremail} </p>
                        <TextField
                          id="drophint_rec_name"
                          label="Hint Recipient's Name"
                          focused
                          variant="outlined"
                          value={getrecipientname}
                          onChange={handleRecipientname}
                        />
                        <p> {geterror.yourrpname} </p>
                        <TextField
                          id="drophint_rec_email"
                          type="email"
                          label="Hint Recipient's E-mail"
                          focused
                          variant="outlined"
                          value={getrecipientemail}
                          onChange={handleRecipientemail}
                        />
                        <p> {geterror.youremail} </p>
                        <TextField
                          id="dgift_reason"
                          label="Reason For This Gift"
                          focused
                          variant="outlined"
                          value={getgiftreason}
                          onChange={handleGiftreason}
                        />
                        <p> {geterror.yourreason} </p>
                        <TextField
                          id="drophint_message"
                          multiline
                          rows={3}
                          label="Add A Personal Message Here.."
                          focused
                          variant="outlined"
                          value={gethintmessage}
                          onChange={handleHintmessage}
                        />
                        <p> {geterror.yourmsg} </p>
                        <TextField
                          label="Gift Deadline"
                          focused
                          id="date"
                          type="date"
                          inputformat="MM/dd/yyyy"
                          variant="outlined"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={getgiftdeadline}
                          onChange={handleGiftdeadline}
                          inputProps={{
                            min: currentDate,
                          }}
                        />
                        <p> {geterror.yourdeadline} </p>

                        <div className="prefrence-action">
                          <div className="prefrence-action action moveUp">
                            {window.initData.data[0].site_key &&
                              window.initData.data[0].secret_key && (
                                <div className="gf-grecaptcha">
                                  <ReCAPTCHA
                                    sitekey={window.initData.data[0].site_key}
                                    onChange={handleRecaptchaChange}
                                  />

                                  <p> {geterror.yourrecaptcha} </p>
                                </div>
                              )}
                            <button
                              type="submit"
                              title="Submit"
                              className="gf-btn preference-btn"
                            >
                              <span>Drop Hint</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </Modal>
              </li>
            )}
            {window.initData.data[0].enable_more_info === "1" && (
              <li>
                <a href="javascript:;" onClick={onOpenThirdModal}>
                  <span>
                    <i className="fas fa-info"></i>
                  </span>
                  Request More Info
                </a>
                <Modal
                  open={openThird}
                  onClose={() => setOpenThird(false)}
                  center
                  classNames={{
                    overlay: "popup_Overlay",
                    modal: "popup-form",
                  }}
                >
                  <LoadingOverlay className="_gfloading_overlay_wrapper">
                    <Loader fullPage loading={loaded} />
                  </LoadingOverlay>

                  <div className="Diamond-form--small">
                    <div className="gf-requested-form">
                      <h2> REQUEST MORE INFORMATION</h2>
                      <p>Our specialists will contact you.</p>
                    </div>
                    <form
                      onSubmit={handlereginfoSubmit}
                      className="request-form"
                    >
                      <div className="gf-form-field">
                        <TextField
                          id="request_name"
                          label="Your Name"
                          focused
                          variant="outlined"
                          value={getreqname}
                          onChange={handleReqname}
                        />
                        <p> {getreqerror.yourname} </p>

                        <TextField
                          id="request_email"
                          type="email"
                          label="Your E-mail"
                          focused
                          variant="outlined"
                          value={getreqemail}
                          onChange={handleReqemail}
                        />
                        <p> {getreqerror.youremail} </p>

                        <TextField
                          id="request_phone"
                          label="Your Phone Number"
                          focused
                          variant="outlined"
                          value={getreqphone}
                          onChange={handleReqphone}
                        />
                        <p> {getreqerror.yourphone} </p>

                        <TextField
                          id="req_message"
                          multiline
                          rows={3}
                          label="Add A Personal Message Here.."
                          focused
                          variant="outlined"
                          value={getreqmsg}
                          onChange={handleReqmsg}
                        />
                        <p> {getreqerror.yourmsg} </p>

                        <div className="contact-prefrtence">
                          <span>Contact Preference:</span>
                          <div className="pref_container">
                            <FormControl>
                              <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="female"
                                name="radio-buttons-group"
                                value={getreqcp}
                                onChange={handleReqcp}
                              >
                                <FormControlLabel
                                  value="By Email"
                                  name="contact_pref"
                                  control={<Radio />}
                                  label="By Email"
                                />
                                <FormControlLabel
                                  value="By Phone"
                                  name="contact_pref"
                                  control={<Radio />}
                                  label="By Phone"
                                />
                              </RadioGroup>
                            </FormControl>
                          </div>
                          <p> {getreqerror.yourcp}</p>
                        </div>
                        <div className="prefrence-action">
                          <div className="prefrence-action action moveUp">
                            {window.initData.data[0].site_key &&
                              window.initData.data[0].secret_key && (
                                <div className="gf-grecaptcha">
                                  <ReCAPTCHA
                                    sitekey={window.initData.data[0].site_key}
                                    onChange={handleRecaptchaChange}
                                  />
                                  <p> {getreqerror.yourreqrecaptcha} </p>
                                </div>
                              )}
                            <button
                              type="submit"
                              title="Submit"
                              className="gf-btn preference-btn"
                            >
                              <span>Request</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </Modal>
              </li>
            )}
            {window.initData.data[0].enable_email_friend === "1" && (
              <li>
                <a href="javascript:;" onClick={onOpenFourthModal}>
                  <span>
                    <i className="fas fa-envelope"></i>
                  </span>
                  E-Mail A Friend
                </a>
                <Modal
                  open={openFour}
                  onClose={() => setOpenFour(false)}
                  center
                  classNames={{
                    overlay: "popup_Overlay",
                    modal: "popup-form-extra-small",
                  }}
                >
                  <LoadingOverlay className="_gfloading_overlay_wrapper">
                    <Loader fullPage loading={loaded} />
                  </LoadingOverlay>

                  <div className="Diamond-form--small Diamond-form--xx-small">
                    <div className="gf-requested-form">
                      <h2> E-MAIL A FRIEND</h2>
                    </div>
                    <form
                      onSubmit={handleemailfrndSubmit}
                      className="email-form"
                    >
                      <div className="gf-form-field">
                        <TextField
                          id="your_name"
                          label="Your Name"
                          focused
                          variant="outlined"
                          value={getname}
                          onChange={handleName}
                        />
                        <p> {getfrnderror.yourname} </p>

                        <TextField
                          id="your_email"
                          type="email"
                          label="Your E-mail"
                          focused
                          variant="outlined"
                          value={getemail}
                          onChange={handleEmail}
                        />
                        <p> {getfrnderror.youremail} </p>

                        <TextField
                          id="fri_name"
                          label="Your Friend's Name"
                          variant="outlined"
                          focused
                          value={getfrndname}
                          onChange={handleFrndname}
                        />
                        <p> {getfrnderror.yourfrnname} </p>

                        <TextField
                          id="f_email"
                          type="email"
                          label="Your Friend's E-mail"
                          focused
                          variant="outlined"
                          value={getfrndemail}
                          onChange={handleFrndemail}
                        />
                        <p> {getfrnderror.youremail} </p>

                        <TextField
                          id="email-fri_message"
                          multiline
                          rows={3}
                          label="Add A Personal Message Here.."
                          focused
                          variant="outlined"
                          value={getfrndmessage}
                          onChange={handleFrndmessage}
                        />

                        <p> {getfrnderror.yourmsg} </p>

                        <div className="prefrence-action">
                          <div className="prefrence-action action moveUp">
                            {window.initData.data[0].site_key &&
                              window.initData.data[0].secret_key && (
                                <div className="gf-grecaptcha">
                                  <ReCAPTCHA
                                    sitekey={window.initData.data[0].site_key}
                                    onChange={handleRecaptchaChange}
                                  />

                                  <p> {getfrnderror.yourfrndrecaptcha} </p>
                                </div>
                              )}
                            <button
                              type="submit"
                              title="Submit"
                              className="gf-btn preference-btn"
                            >
                              <span>Send To Friend</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </Modal>
              </li>
            )}
            {window.initData.data[0].enable_print === "1" && (
              <li>
                <a href="javascript:;" onClick={handlePrintDetails}>
                  <span>
                    <i className="fas fa-print"></i>
                  </span>
                  Print Details
                </a>
              </li>
            )}
            {window.initData.data[0].enable_schedule_viewing === "1" && (
              <li>
                <a href="javascript:;" onClick={onOpenFifthModal}>
                  <span>
                    <i className="far fa-calendar-alt"></i>
                  </span>
                  Schedule Viewing
                </a>
                <Modal
                  open={openFive}
                  onClose={() => setOpenFive(false)}
                  center
                  classNames={{
                    overlay: "popup_Overlay",
                    modal: "popup-form",
                  }}
                >
                  <LoadingOverlay className="_gfloading_overlay_wrapper">
                    <Loader fullPage loading={loaded} />
                  </LoadingOverlay>

                  <div className="Diamond-form">
                    <div className="gf-requested-form">
                      <h2>SCHEDULE A VIEWING</h2>
                      <p>See This Item And More In Our Store.</p>
                    </div>
                    <form onSubmit={handleschdSubmit} className="schedule-form">
                      <div className="gf-form-field">
                        <TextField
                          id="schedule_name"
                          label="Your Name"
                          focused
                          variant="outlined"
                          value={getschdname}
                          onChange={handleSchdname}
                        />
                        <p> {getschderror.yourname} </p>

                        <TextField
                          id="schedule_email"
                          type="email"
                          label="Your E-mail Address"
                          focused
                          variant="outlined"
                          value={getschdemail}
                          onChange={handleSchdemail}
                        />
                        <p> {getschderror.youremail} </p>

                        <TextField
                          id="schedule_num"
                          label="Your Phone Number"
                          focused
                          variant="outlined"
                          value={getschdphone}
                          onChange={handleSchdphone}
                        />
                        <p> {getschderror.yourphone} </p>

                        <TextField
                          id="drophint_message"
                          multiline
                          rows={3}
                          label="Add A Personal Message Here.."
                          focused
                          variant="outlined"
                          value={getschdmsg}
                          onChange={handleSchdmsg}
                        />
                        <p> {getschderror.yourmsg} </p>

                        <Select
                          labelId="demo-simple-select-standard-label"
                          id="select_schedule"
                          value={location}
                          onChange={handleChange}
                          label="Location"
                          focused
                          variant="outlined"
                        >
                          {addressList.map((addressList, index) => (
                            <MenuItem
                              key={index}
                              value={addressList.locationName}
                            >
                              {addressList.locationName}
                            </MenuItem>
                          ))}
                        </Select>
                        <p> {getschderror.yourlocation} </p>

                        <TextField
                          label="When are you available?"
                          focused
                          id="date"
                          type="date"
                          inputformat="MM/dd/yyyy"
                          variant="outlined"
                          value={getschddate}
                          onChange={handleSchddate}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          inputProps={{
                            min: currentDate,
                          }}
                        />
                        <p> {getschderror.yourdate} </p>
                        {errorMessage && <p>{errorMessage}</p>}

                        <Select
                          labelId="demo-simple-select-standard-label"
                          id="select_time"
                          value={getschdtime}
                          onChange={handleSchdtime}
                          label="Time"
                          focused
                          variant="outlined"
                        >
                          {daysWithSlots.map((day, index) => (
                            <MenuItem
                              key={index}
                              value={`${day.name}: ${day.start} - ${day.end}`}
                            >
                              {`${day.name}: ${day.start} - ${day.end}`}
                            </MenuItem>
                          ))}
                        </Select>

                        <p> {getschderror.yourtime} </p>

                        <div className="prefrence-action">
                          <div className="prefrence-action action moveUp">
                            {window.initData.data[0].site_key &&
                              window.initData.data[0].secret_key && (
                                <div className="gf-grecaptcha">
                                  <ReCAPTCHA
                                    sitekey={window.initData.data[0].site_key}
                                    onChange={handleRecaptchaChange}
                                  />

                                  <p> {getschderror.yourscrecaptcha} </p>
                                </div>
                              )}
                            <button
                              type="submit"
                              title="Submit"
                              className="gf-btn preference-btn"
                            >
                              <span>Request</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </Modal>
              </li>
            )}
          </ul>
        </div>
        <div className="gf-diamond-tryon">
          <span>
            {props.productDetailsData.fltPrice === "Call for Price"
              ? "Call for Price"
              : props.productDetailsData.fltPrice === "Call for Price"
              ? "Call for Price"
              : window.initData.data[0].price_row_format === "1"
              ? props.productDetailsData.currencyFrom === "USD"
                ? window.currency +
                  Number(props.productDetailsData.fltPrice).toLocaleString(
                    undefined,
                    {
                      maximumFractionDigits: 0,
                    }
                  )
                : props.productDetailsData.currencyFrom +
                  "  " +
                  props.productDetailsData.currencySymbol +
                  "  " +
                  Number(props.productDetailsData.fltPrice).toLocaleString(
                    undefined,
                    {
                      maximumFractionDigits: 0,
                    }
                  )
              : props.productDetailsData.currencyFrom === "USD"
              ? window.currency +
                Number(props.productDetailsData.fltPrice).toLocaleString(
                  undefined,
                  {
                    maximumFractionDigits: 0,
                  }
                )
              : Number(props.productDetailsData.fltPrice).toLocaleString(
                  undefined,
                  {
                    maximumFractionDigits: 0,
                  }
                ) +
                "  " +
                props.productDetailsData.currencySymbol +
                "  " +
                props.productDetailsData.currencyFrom}
            {/* {props.productDetailsData.fltPrice === "Call for Price"
              ? "Call for Price"
              : Number(props.productDetailsData.fltPrice).toLocaleString(
                  undefined,
                  { maximumFractionDigits: 2 }
                )} */}
          </span>

          <div className="gf-diamond-btn">
            {props.productDetailsData.fltPrice !== "Call for Price" &&
              props.productDetailsData.dsEcommerce !== false && (
                <button
                  type="submit"
                  title="Submit"
                  onClick={handleAddToCart}
                  className="gf-btn btn-diamond"
                >
                  Add To Cart
                </button>
              )}
          </div>
        </div>
        <div className="gf-social-icons">
          <ul className="gf-social-share">
            {window.initData.data[0].show_Pinterest_Share === "1" && (
              <li>
                <a
                  target="_blank"
                  href={`https://www.pinterest.com/pin/create/button/?url=${window.location.href}&media=${props.productDetailsData.mainImageURL}&description=${props.productDetailsData.description}`}
                  className="red"
                >
                  <i className="fab fa-pinterest-p"></i>
                  <span>Save</span>
                </a>
              </li>
            )}
            {window.initData.data[0].show_Twitter_Share === "1" && (
              <li>
                <a
                  target="_blank"
                  href={`https://twitter.com/share?ref_src=${window.location.href}`}
                  className="sky-blue"
                >
                  <i className="fab fa-twitter"></i>
                  <span>Twitter</span>
                </a>
              </li>
            )}
            {window.initData.data[0].show_Facebook_Share === "1" && (
              <li>
                <a
                  target="_blank"
                  href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
                  className="blue"
                >
                  <i className="fab fa-facebook-f"></i>
                  <span>share</span>
                </a>
              </li>
            )}
            {window.initData.data[0].show_Facebook_Like === "1" && (
              <li>
                <FacebookProvider appId="2069310279975989">
                  <Like
                    language="en_US"
                    href={window.location.href}
                    colorScheme="dark"
                    layout="button_count"
                  />
                </FacebookProvider>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default DiamondProductInformation;
