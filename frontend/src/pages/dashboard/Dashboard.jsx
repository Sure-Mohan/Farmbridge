import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Loader from "../../components/common/Loader";
import SmartAlerts from "../../components/dashboard/SmartAlerts";

import CropPieChart from "../../components/charts/CropPieChart";
import LivestockChart from "../../components/charts/LivestockChart";
import EquipmentChart from "../../components/charts/EquipmentChart";
import MonthlyTrendChart from "../../components/charts/MonthlyTrendChart";

import { analyticsService } from "../../services/analyticsService";
import { smartAlertService } from "../../services/smartAlertService";

import {
  FaSeedling,
  FaPaw,
  FaTools,
  FaBell,
  FaCloudSun,
  FaDollarSign
} from "react-icons/fa";

const Dashboard = () => {

  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    totalCrops: 0,
    totalLivestock: 0,
    totalEquipment: 0,
    cropStatus: {
      growing: 0,
      planted: 0,
      harvested: 0
    }
  });

  const [monthlyTrend, setMonthlyTrend] = useState([]);

  const [livestock, setLivestock] = useState([]);

  const [equipment, setEquipment] = useState([]);

  const [alerts, setAlerts] = useState([]);

  const [error, setError] = useState("");

  useEffect(() => {

    loadDashboard();

  }, []);

  const loadDashboard = async () => {

    try {

      setLoading(true);

      setError("");

      const analytics =
        await analyticsService.getDashboardAnalytics();

      setStats(
        analytics.stats || {
          totalCrops: 0,
          totalLivestock: 0,
          totalEquipment: 0,
          cropStatus: {
            growing: 0,
            planted: 0,
            harvested: 0
          }
        }
      );

      setMonthlyTrend(
        analytics.monthlyTrend || []
      );

      setLivestock(
        analytics.livestock || []
      );

      setEquipment(
        analytics.equipment || []
      );

      try {

        const response =
          await smartAlertService.getAlerts();

        setAlerts(
          response.notifications || []
        );

      }

      catch (err) {

        console.log("Alert service unavailable");

      }

    }

    catch (err) {

      console.error(err);

      setError("Unable to load dashboard.");

    }

    finally {

      setLoading(false);

    }

  };

  if (loading) {

    return <Loader />;

  }

  if (error) {

    return (

      <div className="container mt-5">

        <div className="alert alert-danger">

          {error}

        </div>

      </div>

    );

  }

  return (

    <div className="container-fluid py-4">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

          <h2 className="fw-bold">

            🌱 FarmBridge Dashboard

          </h2>

          <p className="text-muted">

            Welcome to your smart farming platform

          </p>

        </div>

        <Link
          to="/alerts"
          className="btn btn-success"
        >

          <FaBell className="me-2" />

          Alerts ({alerts.length})

        </Link>

      </div>

      {/* Statistics */}

      <div className="row">

        <div className="col-lg-3 col-md-6 mb-4">

          <div className="card shadow h-100">

            <div className="card-body text-center">

              <FaSeedling
                size={40}
                className="text-success"
              />

              <h5 className="mt-3">

                Crops

              </h5>

              <h2>

                {stats.totalCrops}

              </h2>

            </div>

          </div>

        </div>

        <div className="col-lg-3 col-md-6 mb-4">

          <div className="card shadow h-100">

            <div className="card-body text-center">

              <FaPaw
                size={40}
                className="text-primary"
              />

              <h5 className="mt-3">

                Livestock

              </h5>

              <h2>

                {stats.totalLivestock}

              </h2>

            </div>

          </div>

        </div>

        <div className="col-lg-3 col-md-6 mb-4">

          <div className="card shadow h-100">

            <div className="card-body text-center">

              <FaTools
                size={40}
                className="text-warning"
              />

              <h5 className="mt-3">

                Equipment

              </h5>

              <h2>

                {stats.totalEquipment}

              </h2>

            </div>

          </div>

        </div>

        <div className="col-lg-3 col-md-6 mb-4">

          <div className="card shadow h-100">

            <div className="card-body text-center">

              <FaDollarSign
                size={40}
                className="text-success"
              />

              <h5 className="mt-3">

                Market

              </h5>

              <Link
                to="/market"
                className="btn btn-success mt-2"
              >

                Open

              </Link>

            </div>

          </div>

        </div>

      </div>

      {/* Alerts */}

      <div className="row mb-4">

        <div className="col-12">

          <SmartAlerts
            alerts={alerts}
          />

        </div>

      </div>

      {/* Charts */}

      <div className="row">

        <div className="col-lg-6 mb-4">

          <CropPieChart
            cropStatus={stats.cropStatus}
          />

        </div>

        <div className="col-lg-6 mb-4">

          <LivestockChart
            livestock={livestock}
          />

        </div>

      </div>

      <div className="row">

        <div className="col-lg-6 mb-4">

          <EquipmentChart
            equipment={equipment}
          />

        </div>

        <div className="col-lg-6 mb-4">

          <MonthlyTrendChart
            monthlyTrend={monthlyTrend}
          />

        </div>

      </div>

      {/* Weather Card */}

      <div className="card shadow">

        <div className="card-body">

          <h4>

            <FaCloudSun className="me-2 text-warning" />

            Weather

          </h4>

          <p>

            Check the latest weather forecast and farming recommendations.

          </p>

          <Link
            to="/weather"
            className="btn btn-success"
          >

            Open Weather

          </Link>

        </div>

      </div>

    </div>

  );

};

export default Dashboard;