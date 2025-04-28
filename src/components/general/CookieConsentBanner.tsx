import React from "react";
import CookieConsent from "react-cookie-consent";

const CookieBanner: React.FC = () => {
  const handleAccept = () => {
    console.log("Cookies Accepted");
    localStorage.setItem("cookieConsent", "accepted");
  };

  const handleDecline = () => {
    console.log("Cookies Declined");
    localStorage.setItem("cookieConsent", "declined");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        margin: "0 20px",
        left: "0",
        right: "0",
      }}
    >
      <CookieConsent
        location="bottom"
        buttonText="Accept Cookies"
        declineButtonText="Reject"
        enableDeclineButton
        onAccept={handleAccept}
        onDecline={handleDecline}
        style={{
          background: "#000",
          color: "#fff",
          fontSize: "15px",
          maxWidth: "900px", // Optional max width for the banner
          margin: "0 auto", // Center horizontally
          left: "50%",
          transform: "translate(-50%, -50%)", // Center the banner
          borderRadius: "10px", // Optional for rounded corners
        }}
        buttonStyle={{
          background: "#007BFF",
          color: "#fff",
          borderRadius: "5px",
          padding: "8px 16px",
          cursor: "pointer",
          marginRight: "10px",
        }}
        declineButtonStyle={{
          background: "#555",
          color: "#fff",
          borderRadius: "5px",
          padding: "8px 16px",
          cursor: "pointer",
        }}
      >
        <h2 style={{ margin: "0 0 10px" }}>Notice</h2>
        <p style={{ margin: "0 0 10px" }}>
          Marenauta and selected third parties use cookies or similar
          technologies for technical purposes and, with your consent, for{" "}
          <strong>functionality, experience, measurement, and marketing</strong>{" "}
          as specified in the{" "}
          <a
            href="/en/w?section=cookies"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#00BFFF", textDecoration: "underline" }}
          >
            Cookie Information
          </a>
          .
        </p>
        <p style={{ margin: 0 }}>
          You can freely give, deny, or withdraw your consent at any time.
        </p>
      </CookieConsent>
    </div>
  );
};

export default CookieBanner;
