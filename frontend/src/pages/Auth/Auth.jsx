import { useState } from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { NavLink, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../../redux/user/userSlice";
import axios from "axios";
import { showError } from "../../utils/toast";
const apiUrl = import.meta.env.VITE_API_URL;

const Auth = ({ mode }) => {
  const formState = mode == "signup" ? "signup" : "signin";
  const [isLoading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (value) => {
    setLoading(true);
    if (formState == "signup") {
      try {
        const res = await axios.post(
          `${apiUrl}/auth/signup`,
          {
            username: value.fullname,
            email: value.email,
            password: value.password,
          },
          {
            withCredentials: true,
            validateStatus: (status) => status >= 200 && status < 500,
          }
        );

        if (res.data.success === false) {
          return showError(res.data.message);
        }
        form.resetFields();
        navigate("/signin");
      } catch (error) {
        showError(error.message);
      } finally {
        setLoading(false);
      }
    } else if (formState == "signin") {
      try {
        dispatch(signInStart());
        const res = await axios.post(
          `${apiUrl}/auth/signin`,
          { email: value.email, password: value.password },
          {
            withCredentials: true,
            validateStatus: (status) => status >= 200 && status < 500,
          }
        );
        if (res.data.success == false) {
          dispatch(signInFailure(res.data.message));
          return showError(res.data.message);
        }
        dispatch(signInSuccess(res.data));
        navigate("/");
      } catch (error) {
        dispatch(signInFailure(error.message));
        showError(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row mx-4 lg:mx-auto p-4 lg:p-18 bg-white shadow-xl rounded-2xl my-20 max-w-4xl">
      <div className="md:w-1/2 w-full flex items-center justify-center mb-8 md:mb-0">
        <img
          src="/signin.gif"
          alt="Signup Illustration"
          className="w-72 h-auto"
        />
      </div>

      <div className="md:w-1/2 w-full px-4">
        <h2 className="text-3xl font-extrabold text-center text-[#1677ff] mb-6 uppercase tracking-wide">
          {formState}
        </h2>

        <Form
          form={form}
          name="signup"
          onFinish={onFinish}
          layout="vertical"
          autoComplete="off"
        >
          {formState === "signup" && (
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

          {formState === "signup" && (
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

          <div className="text-sm flex justify-center pb-4 gap-1">
            {formState === "signup" ? (
              <p>
                Already have an account?{" "}
                <NavLink
                  to="/signin"
                  className="text-[#1677ff] font-semibold hover:underline"
                >
                  Sign In
                </NavLink>
              </p>
            ) : (
              <p>
                Don’t have an account?{" "}
                <NavLink
                  to="/signup"
                  className="text-[#1677ff] font-semibold hover:underline"
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
              className="bg-[#1677ff] hover:bg-[#155bcc] py-2 text-white font-medium rounded-md"
              loading={isLoading}
            >
              {formState}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Auth;