import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
// redux
import { connect } from "react-redux";
import * as ProfileActions from "../../../store/actions/profileActions";
// moment
import Moment from "react-moment";
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

const DashViewEdu = ({ eduList, removeEdu, setEdu }) => {
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
    { id: "school", label: "School" },
    { id: "degree", label: "Degree" },
    { id: "years", label: "Years" },
    { id: "del", label: "Del." },
  ];

  const renderExpTable = () => {
    return eduList
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((edu) => {
        return (
          <TableRow key={edu._id}>
            <TableCellSM variant="body" align="center">
              <FABSmall
                component={RouterLink}
                to="/dashboard/edu"
                color="primary"
                onClick={() => setEdu(edu)}
              >
                <PageviewIcon fontSize="small" />
              </FABSmall>
            </TableCellSM>
            <TableCellSM variant="body">{edu.school}</TableCellSM>
            <TableCellSM variant="body">{edu.degree}</TableCellSM>
            <TableCellSM variant="body">
              <Moment format="YYYY/MM/DD">{edu.from}</Moment>
              {" - "}
              {edu.current ? (
                "Now"
              ) : (
                <Moment format="YYYY/MM/DD">{edu.to}</Moment>
              )}
            </TableCellSM>
            <TableCellEnd variant="body" align="center">
              <FABSmall color="secondary" onClick={() => removeEdu(edu._id)}>
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
        {eduList.length > 0
          ? "Education credentials"
          : "No education added yet"}
      </TextPrimary>
      {eduList.length > 0 && (
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
            count={eduList.length}
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

DashViewEdu.propTypes = {
  eduList: PropTypes.array.isRequired,
  removeEdu: PropTypes.func.isRequired,
  setEdu: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeEdu: (id) => {
      dispatch(ProfileActions.deleteEdu(id));
    },
    setEdu: (data) => {
      dispatch(ProfileActions.setEducationData(data))
    }
  };
};

export default connect(null, mapDispatchToProps)(DashViewEdu);
