const express = require("express");
const router = express.Router();
const db = require("../../config/db");

// PATH: /projects/list

router.get("/:page", async (req, res) => {
  let token = req.header("Authorization");
  let { page } = req.params;
  let query_from = page === 1 ? 1 * 20 : (page - 1) * 20;
  let query_until = 20;
  try {
    let count = await db.query(
      "SELECT COUNT(project_id) AS COUNT FROM projects"
    );
    let list = await db.query(
      "SELECT project_id, division_id, name, info_brief, allow_register, register_date_from, register_date_until, participant FROM projects ORDER BY register_date_until ASC LIMIT ? OFFSET ?",
      [query_until, query_from]
    );
    res.status(200).json({
      success: true,
      page_no: page,
      number_of_project: parseInt(count[0].COUNT),
      number_of_page:
        Math.ceil(parseInt(count[0].COUNT) / 20) === 0
          ? 1
          : Math.ceil(parseInt(count[0].COUNT) / 20),
      payload: list,
    });
  } catch (err) {
    res.status(500).json({ success: false, payload: err });
  }
});

module.exports = router;
