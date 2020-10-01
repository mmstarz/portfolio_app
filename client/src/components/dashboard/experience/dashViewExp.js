import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
// moment
import Moment from "react-moment";
// redux
import { connect } from "react-redux";
import * as ProfileActions from "../../../store/actions/profileActions";
// icons
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import PageviewIcon from "@material-ui/icons/Pageview";
// mui els
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
// with styles
import {
  TextPrimary,
  TableCellSM,
  TableCellEnd,
  FABSmall,
} from "../../../widgets/withStyles/withStyles";

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    maxHeight: 440,
    margin: "8px 0",
    filter: "drop-shadow(0px 0px 2px currentColor)",
  },
  shadow: {
    filter: "drop-shadow(0px 1px 2px black)",
  },
}));

const DashViewExp = ({ expList, removeExp, setExp }) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const columns = [
    { id: "view", label: "View" },
    { id: "company", label: "Company" },
    { id: "title", label: "Title" },
    { id: "years", label: "Years" },
    { id: "del", label: "Del." },
  ];

  const renderExpTable = () => {
    return expList
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((exp) => {
        return (
          <TableRow key={exp._id}>
            <TableCellSM variant="body" align="center">
              <FABSmall
                component={RouterLink}
                to="/dashboard/exp"
                color="primary"
                onClick={() => setExp(exp)}
              >
                <PageviewIcon fontSize="small" />
              </FABSmall>
            </TableCellSM>
            <TableCellSM variant="body">{exp.company}</TableCellSM>
            <TableCellSM variant="body">{exp.title}</TableCellSM>
            <TableCellSM variant="body">
              <Moment format="YYYY/MM/DD">{exp.from}</Moment>
              {" - "}
              {exp.current ? (
                "Now"
              ) : (
                <Moment format="YYYY/MM/DD">{exp.to}</Moment>
              )}
            </TableCellSM>
            <TableCellEnd variant="body" align="center">
              <FABSmall color="secondary" onClick={() => removeExp(exp._id)}>
                <RemoveCircleIcon />
              </FABSmall>
            </TableCellEnd>
          </TableRow>
        );
      });
  };

  const renderHeadings = () => {
    return columns.map((col) => {
      switch (col.id) {
        case "view":
          return (
            <TableCellSM key={col.id} variant="head">
              {col.label}
            </TableCellSM>
          );
        case "del":
          return (
            <TableCellEnd key={col.id} variant="head">
              {col.label}
            </TableCellEnd>
          );
        default:
          return (
            <TableCellSM key={col.id} variant="head" align="left">
              {col.label}
            </TableCellSM>
          );
      }
    });
  };

  return (
    <div>
      <TextPrimary variant="h6" color="primary" gutterBottom={true}>
        {expList.length > 0
          ? "Experience credentials"
          : "No expereince added yet"}
      </TextPrimary>
      {expList.length > 0 && (
        <Fragment>
          <TableContainer className={classes.tableContainer}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead className={classes.shadow}>
                <TableRow>{renderHeadings()}</TableRow>
              </TableHead>
              <TableBody>{renderExpTable()}</TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 20]}
            component="div"
            count={expList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Fragment>
      )}
    </div>
  );
};

DashViewExp.propTypes = {
  expList: PropTypes.array.isRequired,
  removeExp: PropTypes.func.isRequired,
  setExp: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeExp: (id) => {
      dispatch(ProfileActions.deleteExp(id));
    },
    setExp: (data) => {
      dispatch(ProfileActions.setExperienceData(data));
    },
  };
};

export default connect(null, mapDispatchToProps)(DashViewExp);
