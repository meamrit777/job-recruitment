import axios from "axios";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
import ConfirmModal from "../ConfirmModal";
import ResumeModal from "./ResumeModal";

const MyApplications = () => {
  const { user, isAuthorized } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isAuthorized) {
      navigateTo("/");
    }
  }, [isAuthorized, navigateTo]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        if (user && user.role === "Employer") {
          const res = await axios.get(
            `${import.meta.env.VITE_APP_API_URL}/application/employer/getall`,
            { withCredentials: true }
          );
          setApplications(res.data.applications);
        } else {
          const res = await axios.get(
            `${import.meta.env.VITE_APP_API_URL}/application/jobseeker/getall`,
            { withCredentials: true }
          );
          setApplications(res.data.applications);
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to fetch applications");
      }
    };

    fetchApplications();
  }, [isAuthorized, user]);

  const askDeleteConfirmation = (id) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_APP_API_URL}/application/delete/${deleteId}`,
        {
          withCredentials: true,
        }
      );
      toast.success(res.data.message);
      setApplications((prev) => prev.filter((app) => app._id !== deleteId));
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete application");
    } finally {
      setConfirmOpen(false);
      setDeleteId(null);
    }
  };

  const handleCancelDelete = () => {
    setConfirmOpen(false);
    setDeleteId(null);
  };

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <section className="my_applications page">
      {user && user.role === "Job Seeker" ? (
        <div className="container">
          <center>
            <h3>My Applications</h3>
          </center>
          {applications.length <= 0 ? (
            <center>
              <h4>No Applications Found</h4>
            </center>
          ) : (
            applications.map((element) => (
              <JobSeekerCard
                key={element._id}
                element={element}
                deleteApplication={askDeleteConfirmation}
                openModal={openModal}
              />
            ))
          )}
        </div>
      ) : (
        <div className="container">
          <center>
            <h3>Applications From Job Seekers</h3>
          </center>
          {applications.length <= 0 ? (
            <center>
              <h4>No Applications Found</h4>
            </center>
          ) : (
            applications.map((element) => (
              <EmployerCard key={element._id} element={element} openModal={openModal} />
            ))
          )}
        </div>
      )}
      {modalOpen && <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />}
      {confirmOpen && (
        <ConfirmModal
          message="Are you sure you want to delete this application?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </section>
  );
};

export default MyApplications;

const JobSeekerCard = ({ element, deleteApplication, openModal }) => (
  <div className="application-card glassy">
    <div className="application-info">
      <h3>{element.name}</h3>
      <p>
        <strong>Email:</strong> {element.email}
      </p>
      <p>
        <strong>Phone:</strong> {element.phone}
      </p>
      <p>
        <strong>Address:</strong> {element.address}
      </p>
      <p>
        <strong>Cover Letter:</strong> {element.coverLetter}
      </p>
    </div>
    <div className="application-actions">
      <img
        src={element.resume.url}
        alt="Resume"
        className="resume-img"
        onClick={() => openModal(element.resume.url)}
      />
      <button className="btn-delete" onClick={() => deleteApplication(element._id)}>
        🗑 Delete
      </button>
    </div>
  </div>
);

const EmployerCard = ({ element, openModal }) => (
  <div className="application-card glassy">
    <div className="application-info">
      <h3>{element.name}</h3>
      <p>
        <strong>Email:</strong> {element.email}
      </p>
      <p>
        <strong>Phone:</strong> {element.phone}
      </p>
      <p>
        <strong>Address:</strong> {element.address}
      </p>
      <p>
        <strong>Cover Letter:</strong> {element.coverLetter}
      </p>
    </div>
    <div className="application-actions">
      <img
        src={element.resume.url}
        alt="Resume"
        className="resume-img"
        onClick={() => openModal(element.resume.url)}
      />
    </div>
  </div>
);
