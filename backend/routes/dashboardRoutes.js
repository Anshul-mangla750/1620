const express = require("express");
const router = express.Router();

const Bed  = require("../models/Bed");
const {Inventory} = require("../models/inventory");
const Doctor = require("../models/Doctors");
const Patient = require("../models/Patient");
// const OPDQueue = require("../models/Opd");



router.get("/", async (req, res) => {
  try {
    // Only allow admins or doctors
    // if (req.user.role !== "admin" && req.user.role !== "doctor") {
    //   return res.redirect("/api/auth/login");
    // }

    // discharge data

const recentDischarges = await Bed.find({
  dischargeDate: { $ne: null }
}).sort({ dischargeDate: -1 }).limit(10).select('patient id name ward dischargeDate');



    // Beds summary
    const beds = await Bed.find({});
    const totalBeds = beds.length;
    const occupiedBeds = beds.filter((b) => b.status === "occupied").length;
    const availableBeds = totalBeds - occupiedBeds;

    // Bed Occupancy Trends - last 7 days
    const today = new Date();
    let bedOccupancyData = [];

    for (let i = 6; i >= 0; i--) {
      let day = new Date(today);
      day.setHours(0, 0, 0, 0); // Set to start of day
      day.setDate(today.getDate() - i);

      // Count occupied beds on this day
      const occupiedCount = await Bed.countDocuments({
        admitDate: { $lte: day },
        $or: [{ dischargeDate: { $gte: day } }, { dischargeDate: null }],
        status: "occupied",
      });

      bedOccupancyData.push({
        date: day.toISOString().slice(0, 10), // 'YYYY-MM-DD'
        occupied: occupiedCount,
        available: totalBeds - occupiedCount,
      });
    }

    // Inventory summary
    const inventoryItems = await Inventory.find({})
      .sort({ last_updated: -1 })
      .limit(10);

    // Doctors list
    const doctors = await Doctor.find({}).sort({ name: 1 });

    // OPD Queue Breakdown - patients by department (waiting)
    const opdAggregation = await Patient.aggregate([
      { $match: { status: "waiting" } }, // only patients in queue
      { $group: { _id: "$department", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    // Format for frontend chart
    const opdBreakdownLabels = opdAggregation.map((d) => d._id);
    const opdBreakdownData = opdAggregation.map((d) => d.count);

    // Pass all to EJS
    res.set("Cache-Control", "no-store");
    res.render("dashboard", {
      title: "Admin Dashboard",
      user: req.user,
      dashboardStats: {
        totalBeds,
        occupiedBeds,
        availableBeds,
      },
      bedOccupancyData, // last 7 days data for bed occupancy
      inventoryData: inventoryItems,
      doctorsData: doctors,
      recentDischarges,
      // New data for OPD breakdown
      //   opdBreakdownLabels,
      //   opdBreakdownData

      opdBreakdownLabels: [
        "General Medicine",
        "Pediatrics",
        "Orthopedics",
        "Cardiology",
      ], // ya dynamically Mongo se
      opdBreakdownData: [35, 25, 20, 20], // same length as labels
    });
  } catch (err) {
    console.error("Dashboard error:", err);
    res.status(500).send("Server Error");
  }
});


module.exports = router;