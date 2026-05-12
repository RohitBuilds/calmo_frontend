import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/authService";
import { saveToken } from "../utils/token";

const StyleBlock = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    .login-root {
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

    /* Aurora background */
    .login-aurora {
      position: fixed;
      inset: 0;
      z-index: 0;
      pointer-events: none;
    }
    .login-aurora::before {
      content: '';
      position: absolute;
      width: 700px; height: 700px;
      top: -200px; left: -150px;
      background: radial-gradient(ellipse, rgba(14,165,233,0.09) 0%, transparent 70%);
      animation: aMove1 18s ease-in-out infinite alternate;
    }
    .login-aurora::after {
      content: '';
      position: absolute;
      width: 600px; height: 600px;
      bottom: -150px; right: -100px;
      background: radial-gradient(ellipse, rgba(99,102,241,0.08) 0%, transparent 70%);
      animation: aMove2 22s ease-in-out infinite alternate;
    }
    @keyframes aMove1 {
      0%   { transform: translate(0,0) scale(1); }
      100% { transform: translate(100px,60px) scale(1.2); }
    }
    @keyframes aMove2 {
      0%   { transform: translate(0,0) scale(1); }
      100% { transform: translate(-80px,-50px) scale(1.15); }
    }

    /* Card */
    .login-card {
      position: relative;
      z-index: 1;
      width: 100%;
      max-width: 440px;
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 32px;
      padding: 48px 40px;
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      animation: fadeUp 0.7s ease both;
    }
    .login-card::before {
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
    .login-logo {
      text-align: center;
      margin-bottom: 36px;
    }
    .login-logo-text {
      font-family: 'Cormorant Garamond', serif;
      font-size: 36px;
      font-weight: 700;
      letter-spacing: 8px;
      background: linear-gradient(135deg, #7dd3fc, #38bdf8, #67e8f9);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .login-logo-sub {
      font-size: 10px;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: rgba(125,211,252,0.45);
      margin-top: 4px;
    }

    /* Heading */
    .login-heading {
      font-family: 'Cormorant Garamond', serif;
      font-size: 30px;
      font-weight: 600;
      color: #e2e8f0;
      text-align: center;
      margin-bottom: 6px;
      letter-spacing: -0.3px;
    }
    .login-subheading {
      font-size: 13px;
      color: rgba(232,234,240,0.35);
      text-align: center;
      margin-bottom: 32px;
      font-weight: 300;
    }

    /* Form */
    .login-form { display: flex; flex-direction: column; gap: 14px; }
    .login-field { display: flex; flex-direction: column; gap: 6px; }
    .login-label {
      font-size: 10px;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: rgba(232,234,240,0.35);
      padding-left: 2px;
    }
    .login-input {
      width: 100%;
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 14px;
      padding: 14px 18px;
      font-size: 14px;
      font-family: 'DM Sans', sans-serif;
      color: #e2e8f0;
      outline: none;
      transition: border-color 0.25s ease, background 0.25s ease;
    }
    .login-input::placeholder { color: rgba(232,234,240,0.2); }
    .login-input:focus {
      border-color: rgba(56,189,248,0.45);
      background: rgba(56,189,248,0.04);
    }

    /* Error message */
    .login-error {
      background: rgba(239,68,68,0.08);
      border: 1px solid rgba(239,68,68,0.2);
      border-radius: 12px;
      padding: 12px 16px;
      font-size: 13px;
      color: #fca5a5;
      text-align: center;
    }

    /* Submit button */
    .login-btn {
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
    .login-btn:hover:not(:disabled) { opacity: 0.88; transform: translateY(-1px); }
    .login-btn:active:not(:disabled) { transform: translateY(0); }
    .login-btn:disabled { opacity: 0.45; cursor: not-allowed; }
    .login-btn::before {
      content: '';
      position: absolute;
      top: 0; left: -100%;
      width: 100%; height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
      transition: left 0.5s ease;
    }
    .login-btn:not(:disabled):hover::before { left: 100%; }

    /* Divider */
    .login-divider {
      display: flex;
      align-items: center;
      gap: 12px;
      margin: 8px 0;
    }
    .login-divider-line {
      flex: 1;
      height: 1px;
      background: rgba(255,255,255,0.06);
    }
    .login-divider-text {
      font-size: 11px;
      color: rgba(232,234,240,0.2);
      letter-spacing: 1px;
    }

    /* Footer link */
    .login-footer {
      text-align: center;
      margin-top: 24px;
      font-size: 13px;
      color: rgba(232,234,240,0.35);
    }
    .login-footer a {
      color: #38bdf8;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.2s ease;
    }
    .login-footer a:hover { color: #7dd3fc; }

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

    @media (max-width: 480px) {
      .login-card { padding: 36px 24px; }
      .login-logo-text { font-size: 28px; }
    }
  `}</style>
)

function Login() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({ email: "", password: "" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e) => {
    setError("")
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    try {
      setLoading(true)

      const data = await loginUser(formData)

      // ✅ FIXED: backend returns { token: "..." } not { access_token: "..." }
      saveToken(data.token)

      navigate("/dashboard")

    } catch (err) {
      setError(err.response?.data?.detail || "Login failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <StyleBlock />
      <div className="login-root">

        <div className="login-aurora" />

        <div className="login-card">

          {/* Logo */}
          <div className="login-logo">
            <div className="login-logo-text">CALMO</div>
            <div className="login-logo-sub">Smarter Wellness</div>
          </div>

          {/* Heading */}
          <h1 className="login-heading">Welcome Back</h1>
          <p className="login-subheading">Sign in to your wellness dashboard</p>

          {/* Error */}
          {error && <div className="login-error" style={{ marginBottom: 16 }}>{error}</div>}

          {/* Form */}
          <form className="login-form" onSubmit={handleSubmit}>

            <div className="login-field">
              <label className="login-label">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="login-input"
              />
            </div>

            <div className="login-field">
              <label className="login-label">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                className="login-input"
              />
            </div>

            <button
              type="submit"
              className="login-btn"
              disabled={loading}
            >
              {loading ? (
                <div className="loading-dots">
                  <div className="loading-dot" />
                  <div className="loading-dot" />
                  <div className="loading-dot" />
                </div>
              ) : "Sign In"}
            </button>

          </form>

          <div className="login-divider" style={{ marginTop: 24 }}>
            <div className="login-divider-line" />
            <span className="login-divider-text">OR</span>
            <div className="login-divider-line" />
          </div>

          <p className="login-footer">
            Don't have an account?{" "}
            <Link to="/signup">Create one</Link>
          </p>

        </div>
      </div>
    </>
  )
}

export default Login