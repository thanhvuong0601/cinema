import axiosClient from "./axiosClient";
const movieApi = {
  getBanner: () => {
    return axiosClient.get("/QuanLyPhim/LayDanhSachBanner");
  },
  getAllMovies: (params) => {
    return params
      ? axiosClient.get("/QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=GP07", {
          params,
        })
      : axiosClient.get("/QuanLyPhim/LayDanhSachPhim?maNhom=GP07");
  },
  getMovieById: (id) => {
    return axiosClient.get(`/QuanLyPhim/LayThongTinPhim?MaPhim=${id}`);
  },
  getShowTimes: (id) => {
    return axiosClient.get(`/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${id}`);
  },
  getSeatById: (id) => {
    return axiosClient.get(`QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${id}`);
  },
  login: (data) => {
    return axiosClient.post("/QuanLyNguoiDung/DangNhap", data);
  },
  registerUser: (userInfo) => {
    return axiosClient.post("/QuanLyNguoiDung/DangKy", userInfo);
  },
  getInfoUser: () => {
    return axiosClient.post("/QuanLyNguoiDung/ThongTinTaiKhoan");
  },
  booking: (data) => {
    return axiosClient.post("/QuanLyDatVe/DatVe", data);
  },
};
export default movieApi;
