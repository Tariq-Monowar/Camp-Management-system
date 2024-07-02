import "./eknojoreRegimentInfo.css";

import { useNavigate, NavLink } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { BsPencilSquare } from "react-icons/bs";

import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";

import { SiMicrosoftexcel } from "react-icons/si";
import { FaFilePdf } from "react-icons/fa6";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const SingleRegimentList = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="homePageContainer">
      <div className="regimentLest">
          <h1 className="regimentTitle">
            রেজিমেন্ট: বীরশ্রেষ্ঠ মতিউর রহমান রেজিমেন্ট
          </h1>
          <div className="downloadeShoit">
            <FaFilePdf className="pdfDownloade" />
            <SiMicrosoftexcel className="excelDownloade" />
          </div>
          <table className="regimentTable">
            <tr>
              <th>ক্রম</th>
              <th>নাম</th>
              <th>পিতার নাম</th>
              <th>শ্রেণী</th>
              <th>শাখা</th>
              <th>ডেলিগেট কোড</th>
              <th>অ্যাকশন</th>
            </tr>
            <tr>
              <td className="listNumber">01</td>
              <td className="deligateName">তারেক মনোয়ার হোসাইন</td>
              <td className="fathersName">মোঃ মর্সেদ আলম</td>
              <td className="classname">পঞ্চদশ শ্রেনি</td>
              <td className="branceName">লক্ষ্মীপুর</td>
              <td className="deligateCode">4552.5454.54</td>
              <td className="actionud">
                <BsPencilSquare className="updateBtn" />{" "}
                <MdDelete className="deleteBtn" />
              </td>
            </tr>

            <tr>
              <td className="listNumber">01</td>
              <td className="deligateName">তারেক মনোয়ার হোসাইন</td>
              <td className="fathersName">মোঃ মর্সেদ আলম</td>
              <td className="classname">পঞ্চদশ শ্রেনি</td>
              <td className="branceName">লক্ষ্মীপুর</td>
              <td className="deligateCode">4552.5454.54</td>
              <td className="actionud">
                <BsPencilSquare className="updateBtn" />{" "}
                <MdDelete className="deleteBtn" />
              </td>
            </tr>

            <tr>
              <td className="listNumber">01</td>
              <td className="deligateName">তারেক মনোয়ার হোসাইন</td>
              <td className="fathersName">মোঃ মর্সেদ আলম</td>
              <td className="classname">পঞ্চদশ শ্রেনি</td>
              <td className="branceName">লক্ষ্মীপুর</td>
              <td className="deligateCode">4552.5454.54</td>
              <td className="actionud">
                <BsPencilSquare className="updateBtn" />{" "}
                <MdDelete className="deleteBtn" />
              </td>
            </tr>
          </table>
        </div>
      </div>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Update Profile
        </DialogTitle>
      </BootstrapDialog>
    </>
  );
};

export default SingleRegimentList;
