import { AxiosError } from "axios";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router";
import useEndPoints from "../../hooks/useEndPoint";
import useLocalStorage from "../../hooks/useLocalStorage";

import "./login.scss";
export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { setLocalStorage } = useLocalStorage();
  const { login } = useEndPoints();

  const submitLogin = async () => {
    if (username && password) {
      try {
        const { data } = await login({ username, password });
        data.username = username;
        setLocalStorage("auth-cakes", data);
        navigate("/admin/dashboard");
      } catch (error:any) {
        console.error(error)
        setError(true)
      }
    }
  };
  return (
    <div className="page-login">
      <Form className="login">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="email"
            placeholder="Inserisci un username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Digita password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <div className="button-login">
          <Button variant="outline-primary" onClick={() => submitLogin()}>
            Login
          </Button>{" "}
        </div>
      </Form>
    </div>
  );
};
