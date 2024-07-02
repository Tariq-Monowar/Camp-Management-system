import "./DelegateAnalysis.css";
import Chart from "react-apexcharts";
import { useState, useEffect } from "react";
import { IoAnalyticsSharp } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
import { UseCampFirebase } from "../../../context/CampManagement";

const AnalysisChart = () => {
  const campFirebase = UseCampFirebase();
  const naviget = useNavigate();
  const [allDeligate, setAllDeligate] = useState([]);
  const [setLiading, setSetLiading] = useState(false);

  //   const [ogrophotikh, setOgrophotikh] = useState(0)
  //   const [dhiman, setDhiman] = useState(0)
  //   const [ovijatri, setOvijatri] = useState(0)
  //   const [dhiman_ogrophotikh, setDhiman_ogrophotikh] = useState(0)
  //   const [ovijatri_ogrophotikh, setovijatri_ogrophotikh] = useState(0)
  const screenWidth = window.screen.width;

  useEffect(() => {
    const getAllData = async () => {
      try {
        const data = await campFirebase.deleget_Data;

        // Filter the array to keep only objects where isHedeleget is "true"
        const filteredData = data.filter((item) => item.isHedeleget === "true");
        setAllDeligate(filteredData);
        setSetLiading(false);
      } catch (error) {
        console.error("Error fetching regiments:", error.message);
      }
    };

    getAllData();
  }, [campFirebase, campFirebase.forceByUpdate]);
  console.log(allDeligate);

  const chocos = allDeligate?.filter(
    (deleget) => deleget.organizationalvalues === "চৌকস"
  );
  const ogrophotikh = allDeligate?.filter(
    (deleget) => deleget.organizationalvalues === "অগ্রপথিক"
  );

  const suvasito = allDeligate?.filter(
    (deleget) => deleget.senOrganizationalvalues === "সুবাসিত"
  );
  const bikosito = allDeligate?.filter(
    (deleget) => deleget.senOrganizationalvalues === "বিকশিত"
  );
  const dhiman = allDeligate?.filter(
    (deleget) => deleget.senOrganizationalvalues === "ধীমান"
  );
  const ovijathri = allDeligate?.filter(
    (deleget) => deleget.senOrganizationalvalues === "অভিযাত্রী"
  );

  const dhiman_ogrophotikh = allDeligate?.filter(
    (deleget) =>
      deleget.senOrganizationalvalues === "ধীমান" &&
      deleget.organizationalvalues === "অগ্রপথিক"
  );
  const ovijathri_ogrophotikh = allDeligate?.filter(
    (deleget) =>
      deleget.senOrganizationalvalues === "অভিযাত্রী" &&
      deleget.organizationalvalues === "অগ্রপথিক"
  );

  const _noCamp = allDeligate?.filter(
    (deleget) => deleget.previousCampNumber === "০টি"
  );
  const _1camp = allDeligate?.filter(
    (deleget) => deleget.previousCampNumber === "১টি"
  );
  const _2camp = allDeligate?.filter(
    (deleget) => deleget.previousCampNumber === "২টি"
  );
  const _3camp = allDeligate?.filter(
    (deleget) => deleget.previousCampNumber === "৩টি"
  );
  const _4camp = allDeligate?.filter(
    (deleget) => deleget.previousCampNumber === "৪টি"
  );
  const _4plusCamp = allDeligate?.filter(
    (deleget) =>
      deleget.previousCampNumber === "৫টি" ||
      deleget.previousCampNumber === "৬টি"
  );

  // console.log(_4plusCamp)

  // console.log(_noCamp)

  console.log(chocos);
  return (
    <div className="analysisContainner">
      <div style={{ margin: "0 auto" }}>
        <Chart
          type="bar"
          height={500}
          width={screenWidth < 500 ? screenWidth - 20 : screenWidth - 200}
          series={[
            {
              name: "",
              data: [
                chocos.length,
                ogrophotikh.length,
                suvasito.length,
                bikosito.length,
                dhiman.length,
                ovijathri.length,
                dhiman_ogrophotikh.length,
                ovijathri_ogrophotikh.length,
                _noCamp.length,
                _1camp.length,
                _2camp.length,
                _3camp.length,
                _4camp.length,
                _4plusCamp.length,
              ],
            },
          ]}
          options={{
            title: {
              text: "অংশগ্রহণকারীদের তথ্য",
              style: {
                fontSize: 22,
              },
            },
            colors: ["#2984a9"],
            xaxis: {
              // tickPlacement: "on",
              categories: [
                "চৌকস",
                "অগ্রপথিক",
                "সুবাসিত",
                "বিকশিত",
                "ধীমান",
                "অভিযাত্রী",
                "ধীমান/অগ্রপথিক",
                "অভিযাত্রী/অগ্রপথিক",
                "ক্যাম্প করেনি",
                "একটি ক্যাম্প করেছে",
                "দুইটি ক্যাম্প করেছে",
                "তিনটি ক্যাম্প করেছে",
                "চারটি ক্যাম্প করেছে",
                "চারের অধিক ক্যাম্প করেছে",
              ],
            },
          }}
        />
      </div>
    </div>
  );
};

export default AnalysisChart;
