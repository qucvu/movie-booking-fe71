import {
  Alert,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import {
  useStyles,
  Copyright,
  handleMouseDownPassword,
} from "Pages/Login/Login";
import LockIcon from "@mui/icons-material/Lock";
import { NavLink } from "react-router-dom";
import { RegisterValues } from "Interfaces/Register";
import { FieldErrors, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { schemaRegister } from "./schemaRegister";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "configStore";
import { registerUser } from "Slices/auth";
import SweetAlertSuccess from "Components/SweetAlert/SweetAlertSuccess";
import SweetAlertError from "Components/SweetAlert/SweetAlertError";

type Props = {};

const Register = (props: Props) => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [showPassWordConfirm, setShowPassWordConfirm] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalErrorOpen, setModalErrorOpen] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const { errorRegister, isLoading } = useSelector(
    (state: RootState) => state.auth
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      hoTen: "",
      soDt: "",
      passwordConfirm: "",
    },
    mode: "onTouched",
    resolver: yupResolver(schemaRegister),
  });
  const onSubmit = async (values: RegisterValues) => {
    delete values["passwordConfirm"];
    setModalErrorOpen(false);
    try {
      // await dispatch(registerUser(values)).unwrap();
      await dispatch(registerUser({ ...values, maNhom: "GP01" })).unwrap();
      setModalOpen(true);
    } catch (error) {
      setModalErrorOpen(true);
      console.log(error);
    }
  };

  const onError = (error: FieldErrors<RegisterValues>) => {
    console.log(error);
  };

  useEffect(() => {
    document.title = "????ng k??";
  }, []);
  return (
    <Container component="main" maxWidth="sm">
      <SweetAlertSuccess
        show={modalOpen}
        navigateDestination={"/form/sign-in"}
        title="????ng k?? th??nh c??ng"
        text="????ng nh???p ngay!"
      />
      <Box
        className={classes.paper}
        sx={{ marginTop: { xs: "2rem", md: "0" } }}
      >
        <Avatar className={classes.avatar}>
          <LockIcon sx={{ color: "#fff", borderRadius: "50%" }}></LockIcon>
        </Avatar>
        <Typography component="h1" variant="h5" fontWeight="bold">
          ????ng k??
        </Typography>

        <form
          className={classes.form}
          onSubmit={handleSubmit(onSubmit, onError)}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="account"
            label="T??i kho???n"
            autoComplete="account"
            autoFocus
            color={errors.taiKhoan && "warning"}
            {...register("taiKhoan")}
          />
          {errors.taiKhoan && (
            <Typography className={classes.warning}>
              {errors.taiKhoan.message}
            </Typography>
          )}

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="M???t kh???u"
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            color={errors.matKhau && "warning"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            {...register("matKhau")}
          />
          {errors.matKhau && (
            <Typography className={classes.warning}>
              {errors.matKhau.message}
            </Typography>
          )}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Nh???p l???i m???t kh???u"
            type={showPassWordConfirm ? "text" : "password"}
            id="passwordConfirm"
            autoComplete="password-confirm"
            color={errors.matKhau && "warning"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassWordConfirm(!showPassWordConfirm)}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassWordConfirm ? (
                      <VisibilityIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            {...register("passwordConfirm")}
          />
          {errors.passwordConfirm && (
            <Typography className={classes.warning}>
              {errors.passwordConfirm.message}
            </Typography>
          )}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="fullName"
            label="H??? t??n"
            autoComplete="fullName"
            color={errors.hoTen && "warning"}
            {...register("hoTen")}
          />
          {errors.hoTen && (
            <Typography className={classes.warning}>
              {errors.hoTen.message}
            </Typography>
          )}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="phone"
            label="S??? ??i???n tho???i"
            autoComplete="phone"
            color={errors.soDt && "warning"}
            {...register("soDt")}
          />
          {errors.soDt && (
            <Typography className={classes.warning}>
              {errors.soDt.message}
            </Typography>
          )}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            type="email"
            color={errors.email && "warning"}
            {...register("email")}
          />
          {errors.email && (
            <Typography className={classes.warning}>
              {errors.email.message}
            </Typography>
          )}
          {errorRegister && (
            <SweetAlertError show={modalErrorOpen} title={errorRegister} />
          )}

          <Button
            fullWidth
            variant="contained"
            className={classes.submit}
            type="submit"
          >
            {isLoading ? (
              <CircularProgress color="inherit" size={"1.5rem"} />
            ) : (
              " ????NG K??"
            )}
          </Button>

          <Box textAlign="right">
            <NavLink to={"/form/sign-in"} className={classes.navLink}>
              {"B???n ???? c?? t??i kho???n? ????ng nh???p"}
            </NavLink>
          </Box>
        </form>
        <Box mt={3}>
          <Copyright />
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
