import styles from "./App.module.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const fieldScheme = yup.object().shape({
  email: yup.string().email("Введите email. Пример: user@email.com"),
  password: yup.string(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Пароли не совпадают"),
});

export const App = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(fieldScheme),
  });

  const emailError = errors.email?.message;
  const confirmPasswordError = errors.confirmPassword?.message;

  const onSubmit = (formData) => {
    console.log(formData);
  };

  return (
    <form className={styles.Form} onSubmit={handleSubmit(onSubmit)}>
      {emailError && <div className={styles.Error}>{emailError}</div>}
      {confirmPasswordError && (
        <div className={styles.Error}>{confirmPasswordError}</div>
      )}
      <input
        className={styles.input}
        type="text"
        name="email"
        placeholder="Почта"
        {...register("email")}
      />
      <input
        className={styles.input}
        type="password"
        name="password"
        placeholder="Пароль"
        {...register("password")}
      />
      <input
        className={styles.input}
        type="password"
        name="confirmPassword"
        placeholder="Повтор пароля"
        {...register("confirmPassword")}
      />
      <button
        className={styles.button}
        type="submit"
        disabled={!!emailError || !!confirmPasswordError}
      >
        Зарегистрироваться
      </button>
      <button className={styles.button} type="button" onClick={() => reset()}>
        Очитстить
      </button>
    </form>
  );
};

export default App;
