import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { toast, ToastContainer } from "react-toastify";
import { data, NavLink, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../../redux/user/userSlice";
import axios from "axios";

const Auth = ({ mode }) => {
  const formState = mode == "Sign Up" ? "Sign Up" : "Sign In";
  const [isLoading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [error, setError] = useState("")

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (value) => {
    if (formState == "Sign Up") {
      try {
        const res = await axios.post("https://noteplus-backend.vercel.app/api/auth/signup",
          {username: value.fullname, email: value.email, password: value.password},
          {withCredentials: true}
        );

        if (res.data.success === false) {
          setError(res.data);
          return
        }

        setError("");
        navigate('/signin')

      } catch (error) {
        setError(error.message)
      }
      form.resetFields();
    } else if (formState == "Sign In") {
      try {
        dispatch(signInStart());
        const res = await axios.post(
          "https://noteplus-backend.vercel.app/api/auth/signin",
           {email: value.email, password: value.password},
          { withCredentials: true }
        );
        if (res.data.success == false) {
          console.log("resp",res.data);
          dispatch(signInFailure(res.data.message));
        }
        dispatch(signInSuccess(res.data));
        navigate("/");
      } catch (error) {
        console.log(error);
        dispatch(signInFailure(error.message));
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white shadow-lg rounded-md my-20">
      <ToastContainer position="top-right" />
      <h2 className="text-2xl font-bold text-center mb-6 uppercase">
        {formState}
      </h2>
      <Form
        form={form}
        name="signup"
        onFinish={onFinish}
        layout="vertical"
        autoComplete="off"
      >
        {formState == "Sign Up" && (
          <Form.Item
            name="fullname"
            label="Full Name"
            rules={[
              { required: true, message: "Please input your full name!" },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Full Name"
              className="py-2"
            />
          </Form.Item>
        )}

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
        >
          <Input
            prefix={<MailOutlined />}
            placeholder="Email"
            className="py-2"
          />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Please input your password!" }]}
          hasFeedback
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Password"
            className="py-2"
          />
        </Form.Item>

        {formState == "Sign Up" && (
          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject("Passwords do not match!");
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Confirm Password"
              className="py-2"
            />
          </Form.Item>
        )}

        <div className="text-sm flex pb-4 gap-2">
          {formState === "Sign Up" ? (
            <p className="text-sm">
              Already have an account?{" "}
              <NavLink
                to="/signin"
                className="text-blue-600 font-semibold hover:underline"
              >
                Sign In
              </NavLink>
            </p>
          ) : (
            <p className="text-sm">
              Don't have an account?{" "}
              <NavLink
                to="/signup"
                className="text-blue-600 font-semibold hover:underline"
              >
                Sign Up
              </NavLink>
            </p>
          )}
        </div>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            className="bg-blue-600 hover:bg-blue-700"
            loading={isLoading}
          >
            {formState}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Auth;
