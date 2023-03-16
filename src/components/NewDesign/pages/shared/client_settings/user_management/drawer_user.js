import { Button, Drawer, DatePicker, Space } from "antd"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
const DrawerUser = ({ isUserDrawer, setUserDrawer, title }) => {
  const formDataInit = {
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    department: "",
    location: "",
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: formDataInit })

  return (
    <>
      <Drawer
        className="filter_drawer small right_filter"
        title=""
        placement={"right"}
        onClose={() => setUserDrawer(false)}
        visible={isUserDrawer}
      >
        <form className="n_drawer_body">
          <button
            onClick={() => setUserDrawer(false)}
            className="drawer__close"
          >
            <span className="cxv-close-l-icn"></span>
          </button>

          <h3 className="mb-4">{title}</h3>
          <div className="row">
            <div className="col-lg-12">
              <div className="n__form_control">
                <label className="n__form_label">
                  <span>First name</span>
                  <input
                    type="text"
                    name="firstName"
                    className={`n__form_input ${
                      errors.firstName?.type === "required" && "border-danger"
                    }`}
                    {...register("firstName", { required: "true" })}
                    aria-invalid={errors.firstName ? "true" : "false"}
                  />
                  {errors.firstName?.type === "required" && (
                    <small className="text-danger">
                      First name field is required
                    </small>
                  )}
                </label>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="n__form_control">
                <label className="n__form_label">
                  <span>Last name</span>
                  <input
                    type="text"
                    name="lastName"
                    className={`n__form_input`}
                    {...register("lastName", { required: "true" })}
                    aria-invalid={errors.lastName ? "true" : "false"}
                  />
                  {errors.lastName?.type === "required" && (
                    <small className="text-danger">
                      Last name field is required
                    </small>
                  )}
                </label>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="n__form_control">
                <label className="n__form_label">
                  <span>Email</span>
                  <input
                    type="email"
                    name="email"
                    className={`n__form_input ${
                      errors.email?.type === "required" && "border-danger"
                    }`}
                    aria-invalid={errors.email ? "true" : "false"}
                  />
                  {errors.firstName?.type === "required" && (
                    <small className="text-danger">
                      Email field is required
                    </small>
                  )}
                </label>
              </div>
            </div>

            <div className="col-lg-12">
              <div className="n__form_control">
                <label className="n__form_label">
                  <span>Role</span>
                  <div className="n__form_select">
                    <select name="role" id="role">
                      <option value="Option 1...">Option 1...</option>
                      <option value="Option 2...">Option 2...</option>
                      <option value="Option 3...">Option 3...</option>
                    </select>
                    <div className="icn cxv-expand-more-l-icn"></div>
                  </div>
                </label>
              </div>
            </div>

            <div className="col-lg-12">
              <div className="n__form_control">
                <label className="n__form_label">
                  <span>Department</span>
                  <div className="n__form_select">
                    <select name="department" id="department">
                      <option value="Option 1...">Option 1...</option>
                      <option value="Option 2...">Option 2...</option>
                      <option value="Option 3...">Option 3...</option>
                    </select>
                    <div className="icn cxv-expand-more-l-icn"></div>
                  </div>
                </label>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="n__form_control">
                <label className="n__form_label">
                  <span>Location</span>
                  <div className="n__form_select">
                    <select name="location" id="location">
                      <option value="Option 1...">Option 1...</option>
                      <option value="Option 2...">Option 2...</option>
                      <option value="Option 3...">Option 3...</option>
                    </select>
                    <div className="icn cxv-expand-more-l-icn"></div>
                  </div>
                </label>
              </div>
            </div>
          </div>
          <div className="bottom_side">
            <button
              type="button"
              onClick={() => setUserDrawer(false)}
              className="btn-dash outline float-left tt"
            >
              Cancel
            </button>
            <button type="submit" className="btn-dash dark float-right tt">
              Apply
            </button>
          </div>
        </form>
      </Drawer>
    </>
  )
}

export default DrawerUser
