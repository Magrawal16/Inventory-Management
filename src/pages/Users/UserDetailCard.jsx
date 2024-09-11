import React, { useState } from "react";
// import Modal from "@mui/material/Modal";
// import Paper from "@mui/material/Paper";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import "./UserDetailCard.css";

const UserDetailCard = ({ user, open, onClose }) => {
    return (
        <div className="user-detail-card-wrapper row d-flex justify-content-center align-items-center">
            <div className="row d-flex justify-content-center width-limiter">
                <div className="col-md-10 mt-5 pt-5">
                    <div className="row z-depth-3">
                        <div className="col-sm-4 bg-info rounded-left">
                        <div className="card-block text-center text-white">
                            <i className="fas fa-user-tie fa-7x mt-5"></i>
                            <h2 className="font-weight-bold mt-4">{user.name}</h2>
                            <p>Verified Level: {user.verifiedLevel}</p>
                            <i className="far fa-edit fa-2x mb-4"></i>
                        </div>
                        </div>
                        <div className="col-sm-8 bg-white rounded-right">
                        <h3 className="mt-3 text-center">Information <IconButton className="float-right" onClick={() => {onClose();}}><CloseIcon /></IconButton></h3>
                        <hr className="bg-primary mt-0 w-25" />
                        <div className="row">
                            <div className="col-sm-6">
                            <p className="font-weight-bold">Email:</p>
                            <h6 className=" text-muted">{user.email}</h6>
                            </div>
                            <div className="col-sm-6">
                            <p className="font-weight-bold">Phone:</p>
                            <h6 className="text-muted">{user.phone}</h6>
                            </div>
                        </div>
                        <h4 className="mt-3">Authentication</h4>
                        <hr className="bg-primary" />
                        <div className="row">
                            <div className="col-sm-6">
                            <p className="font-weight-bold">Recent</p>
                            <h6 className="text-muted">School Web</h6>
                            </div>
                            <div className="col-sm-6">
                            <p className="font-weight-bold">Most Viewed</p>
                            <h6 className="text-muted">Dinoter husainm</h6>
                            </div>
                        </div>
                        <hr className="bg-primary" />
                        <ul className="list-unstyled d-flex justify-content-center mt-4">
                            <li>
                            <a href="#!">
                                <i className="fab fa-facebook-f px-3 h4 text-info"></i>
                            </a>
                            </li>
                            <li>
                            <a href="#!">
                                <i className="fab fa-youtube px-3 h4 text-info"></i>
                            </a>
                            </li>
                            <li>
                            <a href="#!">
                                <i className="fab fa-twitter px-3 h4 text-info"></i>
                            </a>
                            </li>
                        </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

)
}

export default UserDetailCard;
