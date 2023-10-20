const organizationQuery = 'SELECT child.orgName AS childOrgName, parent.orgName AS parentOrgName, child.orgID AS orgID, parent.orgID AS parentID FROM Organizations AS child LEFT JOIN Organizations AS parent ON child.parentOrg = parent.orgID ORDER BY child.orgType ASC,  parentID ASC'

const queryOrgId = (id) => {
  return `SELECT child.orgName AS childOrgName, parent.orgName AS parentOrgName, child.orgID AS orgID, parent.orgID AS parentID FROM Organizations AS child LEFT JOIN Organizations AS parent ON child.parentOrg = parent.orgID WHERE child.orgID = '${id}' ORDER BY child.orgType ASC,  parentID ASC`
}

module.exports = { organizationQuery, queryOrgId }
