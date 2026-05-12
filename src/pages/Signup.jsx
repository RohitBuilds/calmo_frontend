import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import api from "../api/axios"

const StyleBlock = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    .signup-root {
      font-family: 'DM Sans', sans-serif;
      min-height: 100vh;
      background: #060912;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
      position: relative;
      overflow: hidden;
    }

    .signup-aurora {
      position: fixed;
      inset: 0;
      z-index: 0;
      pointer-events: none;
    }
    .signup-aurora::before {
      content: '';
      position: absolute;
      width: 700px; height: 700px;
      top: -200px; right: -100px;
      background: radial-gradient(ellipse, rgba(99,102,241,0.09) 0%, transparent 70%);
      animation: aMove1 20s ease-in-out infinite alternate;
    }
    .signup-aurora::after {
      content: '';
      position: absolute;
      width: 650px; height: 650px;
      bottom: -150px; left: -100px;
      background: radial-gradient(ellipse, rgba(14,165,233,0.08) 0%, transparent 70%);
      animation: aMove2 24s ease-in-out infinite alternate;
    }
    .signup-aurora-mid {
      position: absolute;
      width: 500px; height: 500px;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      background: radial-gradient(ellipse, rgba(20,184,166,0.05) 0%, transparent 70%);
      animation: aMove3 28s ease-in-out infinite alternate;
    }
    @keyframes aMove1 {
      0%   { transform: translate(0,0) scale(1); }
      100% { transform: translate(-80px, 70px) scale(1.2); }
    }
    @keyframes aMove2 {
      0%   { transform: translate(0,0) scale(1); }
      100% { transform: translate(90px,-60px) scale(1.15); }
    }
    @keyframes aMove3 {
      0%   { transform: translate(-50%,-50%) scale(1); }
      100% { transform: translate(-50%,-50%) scale(1.25); }
    }

    /* Card */
    .signup-card {
      position: relative;
      z-index: 1;
      width: 100%;
      max-width: 460px;
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 32px;
      padding: 44px 40px;
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      animation: fadeUp 0.7s ease both;
    }
    .signup-card::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 1px;
      border-radius: 32px 32px 0 0;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent);
    }
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(28px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    /* Logo */
    .signup-logo {
      text-align: center;
      margin-bottom: 30px;
    }
    .signup-logo-text {
      font-family: 'Cormorant Garamond', serif;
      font-size: 34px;
      font-weight: 700;
      letter-spacing: 8px;
      background: linear-gradient(135deg, #7dd3fc, #38bdf8, #67e8f9);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .signup-logo-sub {
      font-size: 10px;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: rgba(125,211,252,0.45);
      margin-top: 4px;
    }

    /* Heading */
    .signup-heading {
      font-family: 'Cormorant Garamond', serif;
      font-size: 28px;
      font-weight: 600;
      color: #e2e8f0;
      text-align: center;
      margin-bottom: 6px;
      letter-spacing: -0.3px;
    }
    .signup-subheading {
      font-size: 13px;
      color: rgba(232,234,240,0.35);
      text-align: center;
      margin-bottom: 28px;
      font-weight: 300;
    }

    /* Form */
    .signup-form { display: flex; flex-direction: column; gap: 12px; }
    .signup-field { display: flex; flex-direction: column; gap: 6px; }
    .signup-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }
    .signup-label {
      font-size: 10px;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: rgba(232,234,240,0.35);
      padding-left: 2px;
    }
    .signup-input {
      width: 100%;
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 14px;
      padding: 13px 18px;
      font-size: 14px;
      font-family: 'DM Sans', sans-serif;
      color: #e2e8f0;
      outline: none;
      transition: border-color 0.25s ease, background 0.25s ease;
    }
    .signup-input::placeholder { color: rgba(232,234,240,0.2); }
    .signup-input:focus {
      border-color: rgba(56,189,248,0.45);
      background: rgba(56,189,248,0.04);
    }

    /* Error */
    .signup-error {
      background: rgba(239,68,68,0.08);
      border: 1px solid rgba(239,68,68,0.2);
      border-radius: 12px;
      padding: 12px 16px;
      font-size: 13px;
      color: #fca5a5;
      text-align: center;
      margin-bottom: 4px;
    }

    /* Success */
    .signup-success {
      background: rgba(16,185,129,0.08);
      border: 1px solid rgba(16,185,129,0.2);
      border-radius: 12px;
      padding: 12px 16px;
      font-size: 13px;
      color: #6ee7b7;
      text-align: center;
      margin-bottom: 4px;
    }

    /* Submit button */
    .signup-btn {
      width: 100%;
      margin-top: 6px;
      background: linear-gradient(135deg, #0ea5e9, #6366f1);
      border: none;
      border-radius: 14px;
      padding: 15px;
      font-size: 14px;
      font-family: 'DM Sans', sans-serif;
      font-weight: 600;
      color: #fff;
      cursor: pointer;
      letter-spacing: 0.5px;
      transition: opacity 0.25s ease, transform 0.2s ease;
      position: relative;
      overflow: hidden;
    }
    .signup-btn:hover:not(:disabled) { opacity: 0.88; transform: translateY(-1px); }
    .signup-btn:active:not(:disabled) { transform: translateY(0); }
    .signup-btn:disabled { opacity: 0.45; cursor: not-allowed; }
    .signup-btn::before {
      content: '';
      position: absolute;
      top: 0; left: -100%;
      width: 100%; height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
      transition: left 0.5s ease;
    }
    .signup-btn:not(:disabled):hover::before { left: 100%; }

    /* Divider */
    .signup-divider {
      display: flex;
      align-items: center;
      gap: 12px;
      margin: 8px 0;
    }
    .signup-divider-line {
      flex: 1;
      height: 1px;
      background: rgba(255,255,255,0.06);
    }
    .signup-divider-text {
      font-size: 11px;
      color: rgba(232,234,240,0.2);
      letter-spacing: 1px;
    }

    /* Footer */
    .signup-footer {
      text-align: center;
      margin-top: 22px;
      font-size: 13px;
      color: rgba(232,234,240,0.35);
    }
    .signup-footer a {
      color: #38bdf8;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.2s ease;
    }
    .signup-footer a:hover { color: #7dd3fc; }

    /* Loading dots */
    .loading-dots {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
    }
    .loading-dot {
      width: 5px; height: 5px;
      border-radius: 50%;
      background: #fff;
      animation: dotBounce 1.4s ease-in-out infinite;
    }
    .loading-dot:nth-child(2) { animation-delay: 0.2s; }
    .loading-dot:nth-child(3) { animation-delay: 0.4s; }
    @keyframes dotBounce {
      0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
      40%            { transform: scale(1);   opacity: 1; }
    }

    /* Responsive */
    @media (max-width: 480px) {
      .signup-card { padding: 36px 20px; }
      .signup-logo-text { font-size: 28px; }
      .signup-row { grid-template-columns: 1fr; }
    }
  `}</style>
)

function Signup() {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [error, setError]   = useState("")
  const [success, setSuccess] = useState("")

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    setError("")
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    try {
      setLoading(true)

      await api.post("/users/create", {
        name:     formData.name,
        username: formData.username,
        email:    formData.email,
        password: formData.password
      })

      setSuccess("Account created! Redirecting to login…")

      setTimeout(() => navigate("/login"), 1500)

    } catch (err) {
      setError(err?.response?.data?.detail || "Signup failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <StyleBlock />
      <div className="signup-root">

        <div className="signup-aurora">
          <div className="signup-aurora-mid" />
        </div>

        <div className="signup-card">

          {/* Logo */}
          <div className="signup-logo">
            <div className="signup-logo-text">CALMO</div>
            <div className="signup-logo-sub">Smarter Wellness</div>
          </div>

          {/* Heading */}
          <h1 className="signup-heading">Create Account</h1>
          <p className="signup-subheading">Begin your wellness journey today</p>

          {/* Feedback */}
          {error   && <div className="signup-error">{error}</div>}
          {success && <div className="signup-success">{success}</div>}

          {/* Form */}
          <form className="signup-form" onSubmit={handleSubmit}>

            {/* Name + Username side by side on wide screens */}
            <div className="signup-row">
              <div className="signup-field">
                <label className="signup-label">Full Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="signup-input"
                />
              </div>

              <div className="signup-field">
                <label className="signup-label">Username</label>
                <input
                  type="text"
                  name="username"
                  placeholder="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="signup-input"
                />
              </div>
            </div>

            <div className="signup-field">
              <label className="signup-label">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="signup-input"
              />
            </div>

            <div className="signup-field">
              <label className="signup-label">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Create a strong password"
                value={formData.password}
                onChange={handleChange}
                required
                className="signup-input"
              />
            </div>

            <button
              type="submit"
              className="signup-btn"
              disabled={loading}
            >
              {loading ? (
                <div className="loading-dots">
                  <div className="loading-dot" />
                  <div className="loading-dot" />
                  <div className="loading-dot" />
                </div>
              ) : "Create Account"}
            </button>

          </form>

          <div className="signup-divider" style={{ marginTop: 22 }}>
            <div className="signup-divider-line" />
            <span className="signup-divider-text">OR</span>
            <div className="signup-divider-line" />
          </div>

          <p className="signup-footer">
            Already have an account?{" "}
            <Link to="/login">Sign in</Link>
          </p>

        </div>
      </div>
    </>
  )
}

export default Signup