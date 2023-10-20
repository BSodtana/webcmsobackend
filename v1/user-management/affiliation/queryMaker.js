function GetUserAffiliationData (sID) {
  return `SELECT affiliatedOrg, org.orgName FROM user_affiliation uaf JOIN organizations org ON org.orgID = uaf.affiliatedOrg WHERE student_id = ${sID}`
}

module.exports = { GetUserAffiliationData }
