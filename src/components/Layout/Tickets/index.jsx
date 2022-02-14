import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../../features/auth/reducers/authSlice";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Container,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Button,
  Modal,
  Divider,
  Avatar,
  Grid,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { useNavigate } from "react-router-dom";
import { formatLongDate } from "../../../utils/formatDate";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DialogStyled from "../../Common/Dialog";
const Ticket = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.auth);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const rows = currentUser?.thongTinDatVe || [];
  const [ticket, setTicket] = useState({});

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleViewDetail = (ticketInfo) => {
    setOpen(true);
    setTicket(ticketInfo);
  };

  useEffect(() => {
    dispatch(authActions.getInfoUser());
  }, [dispatch]);
  useEffect(() => {
    if (!currentUser) {
      setOpenDialog(true);
    }
  }, [currentUser]);

  return (
    <Box display="flex" justifyContent="center" alignItems="center" py={8}>
      <Container maxWidth="md">
        {!currentUser && (
          <Box minHeight="100vh">
            <DialogStyled open={openDialog} handleOpen={setOpenDialog}>
              <DialogTitle>
                <Typography textTransform={"uppercase"} fontWeight={600}>
                  Join with us
                </Typography>
              </DialogTitle>
              <Divider />
              <DialogContent>
                You're not login. Please login & try again!
              </DialogContent>
              <DialogActions>
                <Button variant="outlined" onClick={() => setOpenDialog(false)}>
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => navigate("/login")}
                >
                  Go to login
                </Button>
              </DialogActions>
            </DialogStyled>
          </Box>
        )}
        {!rows.length && currentUser && (
          <Box textAlign="center">
            <img
              src="./images/empty.svg"
              alt="no-data"
              style={{
                maxWidth: 300,
              }}
            />
            <Typography variant="h6" color="error" gutterBottom>
              Oops! Your ticket is empty!
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Look like yout haven't added anything to your ticket yet.
            </Typography>
            <Button
              variant="outlined"
              color="error"
              onClick={() => navigate("/movies")}
            >
              Book now
            </Button>
          </Box>
        )}
        {!!rows.length && (
          <>
            <Typography
              variant="h6"
              textTransform="uppercase"
              fontWeight="600"
              mb={2}
            >
              My Tickets
            </Typography>
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 500 }}
                aria-label="custom pagination table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>STT</TableCell>
                    <TableCell>Ticket ID</TableCell>
                    <TableCell> Movie Name</TableCell>
                    <TableCell>Booking Date</TableCell>
                    <TableCell>Time</TableCell>
                    <TableCell>Total Seat</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                    ? rows.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : rows
                  ).map((row, i) => (
                    <TableRow key={row.maVe}>
                      <TableCell component="th" scope="row">
                        {i + 1}
                      </TableCell>
                      <TableCell style={{ width: 160 }}>{row.maVe}</TableCell>
                      <TableCell style={{ width: 160 }}>
                        {row.tenPhim}
                      </TableCell>
                      <TableCell style={{ width: 160 }}>
                        {formatLongDate(row.ngayDat).date}
                      </TableCell>
                      <TableCell style={{ width: 160 }}>
                        {row.thoiLuongPhim}'
                      </TableCell>
                      <TableCell style={{ width: 160 }}>
                        {row?.danhSachGhe?.length}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          title="View detail"
                          onClick={() => handleViewDetail(row)}
                        >
                          <VisibilityIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}

                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={7} />
                    </TableRow>
                  )}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[
                        5,
                        10,
                        25,
                        { label: "All", value: -1 },
                      ]}
                      colSpan={7}
                      count={rows.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      SelectProps={{
                        inputProps: {
                          "aria-label": "rows per page",
                        },
                        native: true,
                      }}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      ActionsComponent={TablePaginationActions}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
            <Modal
              open={open}
              onClose={() => setOpen(false)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  maxWidth: 600,
                  width: "calc(100vw - 32px)",
                  backgroundColor: "background.paper",
                  boxShadow: 24,
                  pt: 2,
                  px: 4,
                  pb: 3,
                  borderRadius: 2,
                }}
              >
                <Box>
                  <Typography
                    mt={1}
                    mb={2}
                    textTransform={"uppercase"}
                    fontWeight="600"
                    textAlign={"center"}
                  >
                    Ticket Detail
                  </Typography>
                  <Divider />
                  <Grid mt={2} container rowSpacing={2} columnSpacing={2}>
                    <Grid item xs={12}>
                      <Typography gutterBottom>
                        <b>Ticket ID:&nbsp;</b> {ticket?.maVe}
                      </Typography>
                    </Grid>

                    <Grid item xs={6}>
                      <Typography gutterBottom>
                        <b>Booking Date:&nbsp;</b>
                        {formatLongDate(ticket?.ngayDat).date}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      {" "}
                      <Typography gutterBottom>
                        <b>Movie Name:&nbsp;</b>
                        {ticket?.tenPhim}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography gutterBottom>
                        <b>Theater:&nbsp;</b>
                        {ticket?.danhSachGhe &&
                          ticket?.danhSachGhe[0]?.tenHeThongRap}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      {" "}
                      <Typography gutterBottom>
                        <b>Theater Number:&nbsp;</b>
                        {ticket?.danhSachGhe && ticket?.danhSachGhe[0]?.tenRap}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      {" "}
                      <Typography gutterBottom>
                        <b>Seats:&nbsp;</b>
                        {ticket?.danhSachGhe
                          ?.map((item) => item.tenGhe)
                          .join(", ")}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Modal>
          </>
        )}
      </Container>
    </Box>
  );
};
export default Ticket;

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

// TablePaginationActions.propTypes = {
//   count: PropTypes.number.isRequired,
//   onPageChange: PropTypes.func.isRequired,
//   page: PropTypes.number.isRequired,
//   rowsPerPage: PropTypes.number.isRequired,
// };
