import { Typography } from "@mui/material";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";

import { useState } from "react";
import { Link } from "react-router-dom";

import { QRCodeSVG } from "qrcode.react";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";


function getUserData() {
  let user = localStorage.getItem("userdata");
  if (user) {
    user = JSON.parse(user);
  } else {
    user = null;
  }
  return user;
}

const QRpage = () => {

     const [user, setUser] = useState(getUserData());

       const [loader, setLoader] = useState(false);

       const downloadPDF = () => {
         const capture = document.querySelector(".actual-receipt");
         setLoader(true);
         html2canvas(capture).then((canvas) => {
           const imgData = canvas.toDataURL("img/png");
           const doc = new jsPDF("p", "mm", "a4");
           const componentWidth = doc.internal.pageSize.getWidth();
           const componentHeight = doc.internal.pageSize.getHeight();
           doc.addImage(imgData, "PNG", 0, 0, componentWidth, componentHeight);
           setLoader(false);
           doc.save(`${user.user.hospital_clinic_name} QR Code.pdf`);
         });
       };

  return (
    <>
      {user ? (
        <>
          <Card sx={{ minWidth: 275 }} className="actual-receipt">
            <CardContent sx={{ marginLeft: "auto", marginRight: "auto" }}>
              <Typography sx={{ marginBottom: 5 }} variant="h6" gutterBottom>
                QR code for Doctors to Scan.
              </Typography>

              <QRCodeSVG value={user.user._id} size={256}></QRCodeSVG>
            </CardContent>
            <CardActions>
              <Button onClick={downloadPDF} disabled={!(loader === false)}>
                {loader ? (
                  <span>Downloading PDF</span>
                ) : (
                  <span>Download PDF</span>
                )}
              </Button>
            </CardActions>
          </Card>
        </>
      ) : (
        <Link to={"/login"}>To Login</Link>
      )}
    </>
  );
};

export default QRpage;
