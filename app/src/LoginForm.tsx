import React, { useState } from "react";
import { useLogin } from "react-admin";
import { Button, CardActions, CircularProgress } from "@mui/material";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const login = useLogin();

  const handleLogin = () => {
    setLoading(true);
    login({}); // Do not provide code, just trigger the redirection
  };

  return (
    <div>
      <CardActions>
        <Button
          type="submit"
          color="primary"
          onClick={handleLogin}
          disabled={loading}
          fullWidth
        >
          {loading && (
            <CircularProgress sx={{ marginRight: 1 }} size={18} thickness={2} />
          )}
          Login With Google
        </Button>
      </CardActions>
    </div>
  );
};

export default LoginForm;
