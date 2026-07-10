import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { authService } from "../../services/authService";
import {
    FaUser,
    FaEnvelope,
    FaPhone,
    FaUserTag,
    FaEdit,
    FaSave,
    FaTimes
} from "react-icons/fa";

import {
    validateEmail,
    validatePhone
} from "../../utils/validators";

const Profile = () => {

    const { user } = useAuth();

    const [editing, setEditing] = useState(false);

    const [formData, setFormData] = useState({

        full_name: user?.full_name || "",

        email: user?.email || "",

        phone: user?.phone || "",

        role: user?.role || ""

    });

    const [errors, setErrors] = useState({});

    const [saving, setSaving] = useState(false);

    // -----------------------------
    // Password Modal
    // -----------------------------

    const [showPasswordModal, setShowPasswordModal] = useState(false);

    const [passwordData, setPasswordData] = useState({

        currentPassword: "",

        newPassword: "",

        confirmPassword: ""

    });

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

        if (errors[e.target.name]) {

            setErrors({

                ...errors,

                [e.target.name]: ""

            });

        }

    };

    const handlePasswordChange = (e) => {

        setPasswordData({

            ...passwordData,

            [e.target.name]: e.target.value

        });

    };

    const validateForm = () => {

        const newErrors = {};

        if (!formData.full_name.trim()) {

            newErrors.full_name = "Full name is required";

        }

        if (!formData.email.trim()) {

            newErrors.email = "Email is required";

        }

        else if (!validateEmail(formData.email)) {

            newErrors.email = "Invalid email";

        }

        if (

            formData.phone &&

            !validatePhone(formData.phone)

        ) {

            newErrors.phone =

                "Invalid phone number";

        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;

    };

    const handleSave = async () => {

        if (!validateForm()) return;

        setSaving(true);

        try {

            await new Promise(resolve =>

                setTimeout(resolve,1500)

            );

            setEditing(false);

            alert("Profile updated successfully.");

        }

        catch(error){

            alert("Unable to update profile.");

        }

        finally{

            setSaving(false);

        }

    };

    const handleCancel = () => {

        setFormData({

            full_name: user?.full_name || "",

            email: user?.email || "",

            phone: user?.phone || "",

            role: user?.role || ""

        });

        setErrors({});

        setEditing(false);

    };

    const handlePasswordSubmit = async () => {

        if (

            !passwordData.currentPassword ||

            !passwordData.newPassword ||

            !passwordData.confirmPassword

        ) {

            return alert("Please fill all fields.");

        }

        if (

            passwordData.newPassword !==

            passwordData.confirmPassword

        ) {

            return alert("Passwords do not match.");

        }

        try {

            await authService.changePassword(

                passwordData.currentPassword,

                passwordData.newPassword

            );

            alert(

                "Password changed successfully.\nPlease login again."

            );

            localStorage.removeItem("token");

            window.location.href="/login";

        }

        catch(err){

            alert(

                err.response?.data?.message ||

                "Unable to change password."

            );

        }

    };

    const InfoRow = ({

        icon,

        label,

        value,

        name,

        editable=false,

        type="text"

    }) => (

        <div className="row mb-3">

            <div className="col-md-3">

                <label className="fw-bold text-muted">

                    {icon} {label}

                </label>

            </div>

            <div className="col-md-9">

                {

                    editing && editable ?

                    <>

                        <input

                            type={type}

                            className={`form-control ${errors[name] ? "is-invalid" : ""}`}

                            name={name}

                            value={formData[name]}

                            onChange={handleChange}

                        />

                        {

                            errors[name] &&

                            <div className="invalid-feedback">

                                {errors[name]}

                            </div>

                        }

                    </>

                    :

                    <p className="mb-0">

                        {value || "Not Provided"}

                    </p>

                }

            </div>

        </div>

    );

    return (
      <div className="container-fluid">

    <div className="d-flex justify-content-between align-items-center mb-4">

        <h2>My Profile</h2>

        {

            !editing ?

            <button
                className="btn btn-primary"
                onClick={() => setEditing(true)}
            >
                <FaEdit className="me-2" />
                Edit Profile
            </button>

            :

            <>

                <button
                    className="btn btn-success me-2"
                    onClick={handleSave}
                    disabled={saving}
                >
                    <FaSave className="me-2" />
                    {
                        saving
                        ?
                        "Saving..."
                        :
                        "Save"
                    }
                </button>

                <button
                    className="btn btn-secondary"
                    onClick={handleCancel}
                >
                    <FaTimes className="me-2" />
                    Cancel
                </button>

            </>

        }

    </div>

    <div className="row">

        <div className="col-md-4 mb-4">

            <div className="card shadow">

                <div className="card-body text-center">

                    <div className="profile-avatar mx-auto mb-3">

                        {

                            user?.full_name

                            ?

                            user.full_name.charAt(0).toUpperCase()

                            :

                            "U"

                        }

                    </div>

                    <h5 className="fw-bold">

                        {formData.full_name}

                    </h5>

                    <p className="text-muted">

                        {formData.email}

                    </p>

                    <span className="badge bg-success">

                        {formData.role}

                    </span>

                </div>

            </div>

        </div>

        <div className="col-md-8">

            <div className="card shadow">

                <div className="card-body">

                    <h5 className="mb-4">

                        Personal Information

                    </h5>

                    <InfoRow

                        icon={<FaUser />}

                        label="Full Name"

                        value={formData.full_name}

                        name="full_name"

                        editable

                    />

                    <InfoRow

                        icon={<FaEnvelope />}

                        label="Email"

                        value={formData.email}

                        name="email"

                        editable

                        type="email"

                    />

                    <InfoRow

                        icon={<FaPhone />}

                        label="Phone"

                        value={formData.phone}

                        name="phone"

                        editable

                    />

                    <InfoRow

                        icon={<FaUserTag />}

                        label="Role"

                        value={formData.role}

                    />

                </div>

            </div>

            <div className="card shadow mt-4">

                <div className="card-body">

                    <h5 className="mb-3">

                        Account Settings

                    </h5>

                    <button

                        className="btn btn-outline-danger me-2"

                        onClick={() => setShowPasswordModal(true)}

                    >

                        Change Password

                    </button>

                    <button

                        className="btn btn-outline-secondary"

                    >

                        Notification Settings

                    </button>

                </div>

            </div>

        </div>

    </div>

    {

        showPasswordModal &&

        <div
            className="modal fade show"
            style={{
                display: "block",
                backgroundColor: "rgba(0,0,0,0.5)"
            }}
        >

            <div className="modal-dialog">

                <div className="modal-content">

                    <div className="modal-header">

                        <h5>

                            Change Password

                        </h5>

                        <button

                            className="btn-close"

                            onClick={() => {

                                setShowPasswordModal(false);

                                setPasswordData({

                                    currentPassword: "",

                                    newPassword: "",

                                    confirmPassword: ""

                                });

                            }}

                        />

                    </div>

                    <div className="modal-body">

                        <div className="mb-3">

                            <label>

                                Current Password

                            </label>

                            <input

                                type="password"

                                className="form-control"

                                name="currentPassword"

                                value={passwordData.currentPassword}

                                onChange={handlePasswordChange}

                            />

                        </div>

                        <div className="mb-3">

                            <label>

                                New Password

                            </label>

                            <input

                                type="password"

                                className="form-control"

                                name="newPassword"

                                value={passwordData.newPassword}

                                onChange={handlePasswordChange}

                            />

                        </div>

                        <div className="mb-3">

                            <label>

                                Confirm Password

                            </label>

                            <input

                                type="password"

                                className="form-control"

                                name="confirmPassword"

                                value={passwordData.confirmPassword}

                                onChange={handlePasswordChange}

                            />

                        </div>

                    </div>

                    <div className="modal-footer">

                        <button

                            className="btn btn-secondary"

                            onClick={() => setShowPasswordModal(false)}

                        >

                            Cancel

                        </button>

                        <button

                            className="btn btn-success"

                            onClick={handlePasswordSubmit}

                        >

                            Update Password

                        </button>

                    </div>

                </div>

            </div>

        </div>

    }

    <style>{`

        .profile-avatar{

            width:90px;

            height:90px;

            border-radius:50%;

            background:linear-gradient(135deg,#2E7D32,#4CAF50);

            color:white;

            display:flex;

            align-items:center;

            justify-content:center;

            font-size:36px;

            font-weight:bold;

        }

    `}</style>

</div>

);

};

export default Profile;