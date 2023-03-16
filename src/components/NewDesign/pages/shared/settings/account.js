import React, { useState } from "react"
import CustomSelect from "../../../elements/custom_select"

const EditProfileSettings = ({ data_options }) => {
  return (
    <>
      <div className="n__card mt-0">
        <div className="n__body">
          <h3 className="">Edit profile</h3>
          <div className="row">
            <div className="col-lg-4 mr-5">
              <div className="row">
                <div className="col-lg-6">
                  <div className="n__form_control">
                    <label className="n__form_label">
                      <span>First name</span>
                      <input
                        type="text"
                        name="name"
                        className="n__form_input"
                      />
                    </label>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="n__form_control">
                    <label className="n__form_label">
                      <span>Last name</span>
                      <input
                        type="text"
                        name="name"
                        className="n__form_input"
                      />
                    </label>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="n__form_control">
                    <div className="labeled_custom_select">
                      <label>Department</label>
                      {data_options.map((item, i, arr) => (
                        <CustomSelect item={item} i={i} arr={arr} />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="n__form_control">
                    <div className="labeled_custom_select">
                      <label>Age</label>
                      {data_options.map((item, i, arr) => (
                        <CustomSelect item={item} i={i} arr={arr} />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="n__form_control">
                    <div className="labeled_custom_select">
                      <label>Gender</label>
                      {data_options.map((item, i, arr) => (
                        <CustomSelect item={item} i={i} arr={arr} />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="n__form_control">
                    <div className="labeled_custom_select">
                      <label>Role</label>
                      {data_options.map((item, i, arr) => (
                        <CustomSelect item={item} i={i} arr={arr} />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="n__form_control">
                    <div className="labeled_custom_select">
                      <label>Employment type</label>
                      {data_options.map((item, i, arr) => (
                        <CustomSelect item={item} i={i} arr={arr} />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="n__form_control">
                    <div className="labeled_custom_select">
                      <label>Time with organisation</label>
                      {data_options.map((item, i, arr) => (
                        <CustomSelect item={item} i={i} arr={arr} />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="n__form_control">
                    <div className="labeled_custom_select">
                      <label>Time with organisation</label>
                      {data_options.map((item, i, arr) => (
                        <CustomSelect item={item} i={i} arr={arr} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="row">
                <div className="col-lg-6">
                  {/* ACTIVITIES */}
                  <div className="col-lg-12">
                    <h5 className="d_sub_title">
                      When working from home, who is usually present?
                    </h5>
                  </div>

                  {/* Item */}
                  <div className="col-lg-12">
                    <div className="n__form_control">
                      <label className="n__form_label dashboard_check">
                        <input
                          type="checkbox"
                          name="A partner or other family member(s)"
                          value="A partner or other family member(s)"
                        />
                        <span className="label-_text">
                          A partner or other family member(s)
                        </span>
                        <span className="checkmark"></span>
                      </label>
                    </div>
                  </div>
                  {/* Item */}

                  <div className="col-lg-12">
                    <div className="n__form_control">
                      <label className="n__form_label dashboard_check">
                        <input
                          type="checkbox"
                          name="Friend(s) or flatmate(s)"
                          value="Friend(s) or flatmate(s)"
                        />
                        <span className="label-_text">
                          Friend(s) or flatmate(s)
                        </span>
                        <span className="checkmark"></span>
                      </label>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="n__form_control">
                      <label className="n__form_label dashboard_check">
                        <input
                          type="checkbox"
                          name="I never work from home"
                          value="I never work from home"
                        />
                        <span className="label-_text">
                          I never work from home
                        </span>
                        <span className="checkmark"></span>
                      </label>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="n__form_control">
                      <label className="n__form_label dashboard_check">
                        <input type="checkbox" name="No one" value="No one" />
                        <span className="label-_text">No one</span>
                        <span className="checkmark"></span>
                      </label>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="n__form_control">
                      <label className="n__form_label dashboard_check">
                        <input
                          type="checkbox"
                          name="One or more children or dependents"
                          value="One or more children or dependents"
                        />
                        <span className="label-_text">
                          One or more children or dependents
                        </span>
                        <span className="checkmark"></span>
                      </label>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="n__form_control">
                      <label className="n__form_label dashboard_check">
                        <input
                          type="checkbox"
                          name="Other person(s)"
                          value="Other person(s)"
                        />
                        <span className="label-_text">Other person(s)</span>
                        <span className="checkmark"></span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="col-lg-6">
                  {/* ACTIVITIES */}
                  <div className="col-lg-12">
                    <h5 className="d_sub_title">Important activities</h5>
                  </div>

                  {/* Item */}
                  <div className="col-lg-12">
                    <div className="n__form_control">
                      <label className="n__form_label dashboard_check">
                        <input
                          type="checkbox"
                          name="Audio conferences"
                          value="Audio conferences"
                        />
                        <span className="label-_text">Audio conferences</span>
                        <span className="checkmark"></span>
                      </label>
                    </div>
                  </div>
                  {/* Item */}

                  <div className="col-lg-12">
                    <div className="n__form_control">
                      <label className="n__form_label dashboard_check">
                        <input
                          type="checkbox"
                          name="Business confidential discussions"
                          value="Business confidential discussions"
                        />
                        <span className="label-_text">
                          Business confidential discussions
                        </span>
                        <span className="checkmark"></span>
                      </label>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="n__form_control">
                      <label className="n__form_label dashboard_check">
                        <input
                          type="checkbox"
                          name="Collaborating on creative work"
                          value="Collaborating on creative work"
                        />
                        <span className="label-_text">
                          Collaborating on creative work
                        </span>
                        <span className="checkmark"></span>
                      </label>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="n__form_control">
                      <label className="n__form_label dashboard_check">
                        <input
                          type="checkbox"
                          name="Collaborating on focused work"
                          value="Collaborating on focused work"
                        />
                        <span className="label-_text">
                          Collaborating on focused work
                        </span>
                        <span className="checkmark"></span>
                      </label>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="n__form_control">
                      <label className="n__form_label dashboard_check">
                        <input
                          type="checkbox"
                          name="Hosting visitors, clients or customers"
                          value="Hosting visitors, clients or customers"
                        />
                        <span className="label-_text">
                          Hosting visitors, clients or customers
                        </span>
                        <span className="checkmark"></span>
                      </label>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="n__form_control">
                      <label className="n__form_label dashboard_check">
                        <input
                          type="checkbox"
                          name="Individual focused work away from your desk"
                          value="Individual focused work away from your desk"
                        />
                        <span className="label-_text">
                          Individual focused work away from your desk
                        </span>
                        <span className="checkmark"></span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditProfileSettings
