import React, { useEffect, useState } from 'react'

const VerifyNgoRegistrations = ({ role }) => {
    const [pendingRegistrations, setPendingRegistrations] = useState([]);
    const [counter, setCounter] = useState(0);
    const [loadingPercentage, setLoadingPercentage] = useState(0);

    useEffect(() => {
        if (role !== "admin") {
          return;
        }
      
        const fetchPendingRegistrations = async () => {
          try {
            setLoadingPercentage(30); // Set loading percentage to 30%
      
            const response = await fetch("http://localhost:4000/registerOrg/pending");
            if (!response.ok) {
              throw new Error("Problem fetching the Pending NGO Registrations");
            }
            const data = await response.json();
            setPendingRegistrations(data);
      
            setLoadingPercentage(70); // Set loading percentage to 70%
          } catch (error) {
            console.log("Error fetching registrations ", error);
          } finally {
            setLoadingPercentage(100); // Set loading percentage to 100%
          }
        };
      
        fetchPendingRegistrations();
      }, [role, counter]);
      

    if (role !== "admin") {
        return (<h1>You are not allowed to access this page</h1>);
    }

    const handleDelete = async (registrationID) => {
        try {
            const response = await fetch(`http://localhost:4000/registerOrg/delete/${registrationID}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (response.ok) {
                window.alert("The registration has been deleted successfully");
                setCounter((counter + 1) / 10)
            }
            else {
                throw new Error("Failed to delete the registration")
            }
        }
        catch (error) {
            console.log("Error deleting registration ", error);
        }
    }

    const handleApprove = async (registrationID) => {
        try {
            const response = await fetch(`http://localhost:4000/registerOrg/approve/${registrationID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (response.ok) {
                window.alert("The registration has been approved successfully");
                setCounter((counter + 1) / 10)
            }
            else {
                throw new Error("Failed to approve the registration")
            }
        }
        catch (error) {
            console.log("Error approving registration ", error);
        }
    }

    if (loadingPercentage < 100) {
        // console.log('Loading percentage:', loadingPercentage); // Log loading percentage to console
        return <div>Loading... {loadingPercentage}%</div>;
      }

    return (
        <div style={{ marginTop: '100px',display:"flex" }}>
            <h2>Pending NGO Registrations</h2>
            <ul>
                {pendingRegistrations.map(registration => (
                    <div key={registration._id}>
                        <div style={{ marginBottom: '10px',border:"2px solid black"}}>
                            <p>Organization Name: {registration.orgName}</p>
                            <p>Email: {registration.email}</p>
                            <p>Contact Number: {registration.contactNumber}</p>
                            <p>Motive: {registration.motive}</p>
                            <p>Point of Contact: {registration.poc}</p>
                            <p>POC Designation: {registration.pocDesignation}</p>
                            <p>Address: {registration.address}, {registration.city}, {registration.pincode}, {registration.state}</p>
                        </div>
                        <div style={{ marginTop: '10px' }}>
                            <button style={{ marginRight: '10px', padding: '5px 10px', borderRadius: '3px', cursor: 'pointer', backgroundColor: 'red', color: '#fff' }}  onClick={() => handleDelete(registration._id)}>
                                Delete
                            </button>
                            <button style={{ marginRight: '10px', padding: '5px 10px', borderRadius: '3px', cursor: 'pointer', backgroundColor: 'green', color: '#fff' }} onClick={() => handleApprove(registration._id)}>
                                Approve
                            </button>
                        </div>
                    </div>
                ))}
            </ul>
        </div>
    );
}

export default VerifyNgoRegistrations;