// import { useEffect, useState, useRef } from "react"
// import api from "../api/axios"
// import {
//   ResponsiveContainer,
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid
// } from "recharts"

// /* ─── Inject Google Fonts + custom CSS once ─── */
// const StyleBlock = () => (
//   <style>{`
//     @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

//     *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

//     .calmo-root {
//       font-family: 'DM Sans', sans-serif;
//       min-height: 100vh;
//       background: #060912;
//       color: #e8eaf0;
//       overflow-x: hidden;
//       position: relative;
//     }

//     /* ── Aurora background ── */
//     .calmo-aurora {
//       position: fixed;
//       inset: 0;
//       z-index: 0;
//       pointer-events: none;
//       overflow: hidden;
//     }
//     .calmo-aurora::before {
//       content: '';
//       position: absolute;
//       width: 900px; height: 900px;
//       top: -300px; left: -200px;
//       background: radial-gradient(ellipse, rgba(14,165,233,0.08) 0%, transparent 70%);
//       animation: auroraMove1 18s ease-in-out infinite alternate;
//     }
//     .calmo-aurora::after {
//       content: '';
//       position: absolute;
//       width: 800px; height: 800px;
//       bottom: -200px; right: -150px;
//       background: radial-gradient(ellipse, rgba(99,102,241,0.07) 0%, transparent 70%);
//       animation: auroraMove2 22s ease-in-out infinite alternate;
//     }
//     .aurora-orb3 {
//       position: absolute;
//       width: 600px; height: 600px;
//       top: 40%; left: 50%;
//       transform: translate(-50%, -50%);
//       background: radial-gradient(ellipse, rgba(20,184,166,0.05) 0%, transparent 70%);
//       animation: auroraMove3 26s ease-in-out infinite alternate;
//     }
//     @keyframes auroraMove1 {
//       0%   { transform: translate(0, 0) scale(1); }
//       100% { transform: translate(120px, 80px) scale(1.15); }
//     }
//     @keyframes auroraMove2 {
//       0%   { transform: translate(0, 0) scale(1); }
//       100% { transform: translate(-80px, -60px) scale(1.2); }
//     }
//     @keyframes auroraMove3 {
//       0%   { transform: translate(-50%, -50%) scale(1); }
//       100% { transform: translate(-50%, -50%) scale(1.3); }
//     }

//     /* ── Content wrapper ── */
//     .calmo-content {
//       position: relative;
//       z-index: 1;
//       max-width: 1400px;
//       margin: 0 auto;
//       padding: 0 24px 80px;
//     }

//     /* ── Navbar ── */
//     .calmo-nav {
//       display: flex;
//       align-items: center;
//       justify-content: space-between;
//       padding: 20px 32px;
//       background: rgba(255,255,255,0.03);
//       border-bottom: 1px solid rgba(255,255,255,0.06);
//       backdrop-filter: blur(20px);
//       -webkit-backdrop-filter: blur(20px);
//       position: sticky;
//       top: 0;
//       z-index: 100;
//     }
//     .calmo-logo-text {
//       font-family: 'Cormorant Garamond', serif;
//       font-size: 28px;
//       font-weight: 700;
//       letter-spacing: 6px;
//       background: linear-gradient(135deg, #7dd3fc, #38bdf8, #67e8f9);
//       -webkit-background-clip: text;
//       -webkit-text-fill-color: transparent;
//       background-clip: text;
//     }
//     .calmo-logo-sub {
//       font-size: 10px;
//       letter-spacing: 3px;
//       text-transform: uppercase;
//       color: rgba(125,211,252,0.5);
//       margin-top: 1px;
//     }
//     .calmo-nav-right {
//       display: flex;
//       align-items: center;
//       gap: 14px;
//     }
//     .calmo-status-pill {
//       display: flex;
//       align-items: center;
//       gap: 8px;
//       background: rgba(16,185,129,0.08);
//       border: 1px solid rgba(16,185,129,0.2);
//       padding: 7px 16px;
//       border-radius: 100px;
//     }
//     .calmo-status-dot {
//       width: 7px; height: 7px;
//       border-radius: 50%;
//       background: #10b981;
//       box-shadow: 0 0 8px rgba(16,185,129,0.8);
//       animation: pulse 2s ease-in-out infinite;
//     }
//     @keyframes pulse {
//       0%, 100% { opacity: 1; transform: scale(1); }
//       50%       { opacity: 0.6; transform: scale(0.85); }
//     }
//     .calmo-status-text {
//       font-size: 12px;
//       color: #6ee7b7;
//       letter-spacing: 0.5px;
//     }
//     .calmo-profile-chip {
//       display: flex;
//       align-items: center;
//       gap: 10px;
//       background: rgba(255,255,255,0.04);
//       border: 1px solid rgba(255,255,255,0.08);
//       padding: 6px 16px 6px 6px;
//       border-radius: 100px;
//     }
//     .calmo-avatar {
//       width: 38px; height: 38px;
//       border-radius: 50%;
//       background: linear-gradient(135deg, #0ea5e9, #6366f1);
//       display: flex; align-items: center; justify-content: center;
//       font-family: 'Cormorant Garamond', serif;
//       font-size: 16px; font-weight: 600;
//       color: #fff;
//       flex-shrink: 0;
//     }
//     .calmo-profile-name { font-size: 13px; font-weight: 500; }
//     .calmo-profile-email { font-size: 11px; color: rgba(232,234,240,0.4); margin-top: 1px; }
//     .calmo-logout-btn {
//       background: rgba(239,68,68,0.12);
//       border: 1px solid rgba(239,68,68,0.25);
//       color: #fca5a5;
//       padding: 8px 20px;
//       border-radius: 100px;
//       font-size: 13px;
//       font-family: 'DM Sans', sans-serif;
//       font-weight: 500;
//       cursor: pointer;
//       transition: all 0.25s ease;
//       letter-spacing: 0.3px;
//     }
//     .calmo-logout-btn:hover {
//       background: rgba(239,68,68,0.22);
//       border-color: rgba(239,68,68,0.45);
//       color: #fecaca;
//     }

//     /* ── Hero ── */
//     .calmo-hero {
//       text-align: center;
//       padding: 72px 0 56px;
//       animation: fadeSlideUp 0.9s ease both;
//     }
//     @keyframes fadeSlideUp {
//       from { opacity: 0; transform: translateY(24px); }
//       to   { opacity: 1; transform: translateY(0); }
//     }
//     .calmo-hero-badge {
//       display: inline-flex;
//       align-items: center;
//       gap: 8px;
//       background: rgba(255,255,255,0.04);
//       border: 1px solid rgba(255,255,255,0.08);
//       padding: 8px 20px;
//       border-radius: 100px;
//       margin-bottom: 28px;
//       backdrop-blur: 12px;
//     }
//     .calmo-hero-badge-dot {
//       width: 6px; height: 6px;
//       border-radius: 50%;
//       background: #38bdf8;
//     }
//     .calmo-hero-badge-text {
//       font-size: 12px;
//       letter-spacing: 2px;
//       text-transform: uppercase;
//       color: rgba(232,234,240,0.5);
//     }
//     .calmo-hero-h1 {
//       font-family: 'Cormorant Garamond', serif;
//       font-size: clamp(44px, 8vw, 82px);
//       font-weight: 600;
//       line-height: 1.08;
//       letter-spacing: -1px;
//       background: linear-gradient(160deg, #e2e8f0 30%, #94a3b8 100%);
//       -webkit-background-clip: text;
//       -webkit-text-fill-color: transparent;
//       background-clip: text;
//       margin-bottom: 20px;
//     }
//     .calmo-hero-h1 span {
//       background: linear-gradient(135deg, #38bdf8, #818cf8);
//       -webkit-background-clip: text;
//       -webkit-text-fill-color: transparent;
//       background-clip: text;
//     }
//     .calmo-hero-sub {
//       max-width: 560px;
//       margin: 0 auto;
//       font-size: 15px;
//       line-height: 1.75;
//       color: rgba(232,234,240,0.45);
//       font-weight: 300;
//       letter-spacing: 0.2px;
//     }

//     /* ── Stats Row ── */
//     .calmo-stats-row {
//       display: grid;
//       grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
//       gap: 16px;
//       margin-bottom: 40px;
//       animation: fadeSlideUp 0.9s ease 0.15s both;
//     }
//     .calmo-stat-card {
//       background: rgba(255,255,255,0.03);
//       border: 1px solid rgba(255,255,255,0.07);
//       border-radius: 20px;
//       padding: 24px 28px;
//       position: relative;
//       overflow: hidden;
//       transition: border-color 0.3s ease, transform 0.3s ease;
//     }
//     .calmo-stat-card:hover {
//       border-color: rgba(255,255,255,0.14);
//       transform: translateY(-2px);
//     }
//     .calmo-stat-card::before {
//       content: '';
//       position: absolute;
//       top: 0; left: 0; right: 0;
//       height: 1px;
//       background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
//     }
//     .calmo-stat-label {
//       font-size: 11px;
//       letter-spacing: 2px;
//       text-transform: uppercase;
//       color: rgba(232,234,240,0.35);
//       margin-bottom: 10px;
//     }
//     .calmo-stat-value {
//       font-family: 'Cormorant Garamond', serif;
//       font-size: 52px;
//       font-weight: 500;
//       line-height: 1;
//       color: #e2e8f0;
//     }
//     .calmo-stat-value.cyan { color: #38bdf8; }
//     .calmo-stat-value.green { color: #34d399; font-size: 36px; letter-spacing: 1px; }

//     /* ── Main Grid ── */
//     .calmo-grid {
//       display: grid;
//       grid-template-columns: 420px 1fr;
//       gap: 24px;
//       animation: fadeSlideUp 0.9s ease 0.3s both;
//     }
//     @media (max-width: 1100px) {
//       .calmo-grid { grid-template-columns: 1fr; }
//     }

//     /* ── Glass Card ── */
//     .glass-card {
//       background: rgba(255,255,255,0.03);
//       border: 1px solid rgba(255,255,255,0.07);
//       border-radius: 28px;
//       padding: 32px;
//       position: relative;
//       overflow: hidden;
//       backdrop-filter: blur(16px);
//       -webkit-backdrop-filter: blur(16px);
//     }
//     .glass-card::before {
//       content: '';
//       position: absolute;
//       top: 0; left: 0; right: 0;
//       height: 1px;
//       background: linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent);
//     }

//     /* ── Card Header ── */
//     .card-header { margin-bottom: 28px; }
//     .card-title {
//       font-family: 'Cormorant Garamond', serif;
//       font-size: 26px;
//       font-weight: 600;
//       color: #e2e8f0;
//       letter-spacing: -0.3px;
//     }
//     .card-sub {
//       font-size: 13px;
//       color: rgba(232,234,240,0.35);
//       margin-top: 4px;
//       font-weight: 300;
//     }

//     /* ── Form ── */
//     .calmo-form { display: flex; flex-direction: column; gap: 12px; }
//     .calmo-input-wrap { position: relative; }
//     .calmo-input-label {
//       display: block;
//       font-size: 10px;
//       letter-spacing: 2px;
//       text-transform: uppercase;
//       color: rgba(232,234,240,0.35);
//       margin-bottom: 6px;
//       padding-left: 2px;
//     }
//     .calmo-input {
//       width: 100%;
//       background: rgba(255,255,255,0.04);
//       border: 1px solid rgba(255,255,255,0.08);
//       border-radius: 14px;
//       padding: 14px 18px;
//       font-size: 14px;
//       font-family: 'DM Sans', sans-serif;
//       color: #e2e8f0;
//       outline: none;
//       transition: border-color 0.25s ease, background 0.25s ease;
//       -webkit-appearance: none;
//       -moz-appearance: textfield;
//     }
//     .calmo-input::placeholder { color: rgba(232,234,240,0.2); }
//     .calmo-input:focus {
//       border-color: rgba(56,189,248,0.4);
//       background: rgba(56,189,248,0.04);
//     }
//     .calmo-input::-webkit-outer-spin-button,
//     .calmo-input::-webkit-inner-spin-button { -webkit-appearance: none; }
//     .calmo-submit-btn {
//       width: 100%;
//       margin-top: 8px;
//       background: linear-gradient(135deg, #0ea5e9, #6366f1);
//       border: none;
//       border-radius: 14px;
//       padding: 15px;
//       font-size: 14px;
//       font-family: 'DM Sans', sans-serif;
//       font-weight: 600;
//       color: #fff;
//       cursor: pointer;
//       letter-spacing: 0.5px;
//       transition: opacity 0.25s ease, transform 0.2s ease;
//       position: relative;
//       overflow: hidden;
//     }
//     .calmo-submit-btn:hover { opacity: 0.9; transform: translateY(-1px); }
//     .calmo-submit-btn:active { transform: translateY(0); opacity: 1; }
//     .calmo-submit-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
//     .calmo-submit-btn::before {
//       content: '';
//       position: absolute;
//       top: 0; left: -100%;
//       width: 100%; height: 100%;
//       background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
//       transition: left 0.5s ease;
//     }
//     .calmo-submit-btn:not(:disabled):hover::before { left: 100%; }

//     /* ── Right column ── */
//     .calmo-right { display: flex; flex-direction: column; gap: 24px; }

//     /* ── Stress Score Display ── */
//     .score-display {
//       background: linear-gradient(135deg, rgba(14,165,233,0.1), rgba(99,102,241,0.07));
//       border: 1px solid rgba(56,189,248,0.15);
//       border-radius: 20px;
//       padding: 28px;
//       display: flex;
//       align-items: center;
//       gap: 24px;
//     }
//     .score-number {
//       font-family: 'Cormorant Garamond', serif;
//       font-size: 80px;
//       font-weight: 600;
//       line-height: 1;
//       background: linear-gradient(135deg, #38bdf8, #818cf8);
//       -webkit-background-clip: text;
//       -webkit-text-fill-color: transparent;
//       background-clip: text;
//       flex-shrink: 0;
//     }
//     .score-meta { flex: 1; }
//     .score-meta-label {
//       font-size: 10px;
//       letter-spacing: 2.5px;
//       text-transform: uppercase;
//       color: rgba(56,189,248,0.5);
//       margin-bottom: 8px;
//     }
//     .score-bar-track {
//       width: 100%;
//       height: 4px;
//       background: rgba(255,255,255,0.06);
//       border-radius: 100px;
//       overflow: hidden;
//     }
//     .score-bar-fill {
//       height: 100%;
//       border-radius: 100px;
//       background: linear-gradient(90deg, #38bdf8, #818cf8);
//       transition: width 0.8s cubic-bezier(0.4,0,0.2,1);
//     }
//     .score-range-labels {
//       display: flex;
//       justify-content: space-between;
//       margin-top: 6px;
//       font-size: 10px;
//       color: rgba(232,234,240,0.25);
//     }

//     /* ── Motivation ── */
//     .motivation-box {
//       background: rgba(255,255,255,0.02);
//       border: 1px solid rgba(255,255,255,0.06);
//       border-radius: 16px;
//       padding: 20px;
//     }
//     .motivation-box-label {
//       font-size: 10px;
//       letter-spacing: 2px;
//       text-transform: uppercase;
//       color: rgba(232,234,240,0.3);
//       margin-bottom: 10px;
//     }
//     .motivation-text {
//       font-size: 14px;
//       line-height: 1.7;
//       color: rgba(232,234,240,0.7);
//       font-style: italic;
//       font-weight: 300;
//     }

//     /* ── Recommendations ── */
//     .rec-grid { display: flex; flex-direction: column; gap: 8px; }
//     .rec-item {
//       display: flex;
//       align-items: flex-start;
//       gap: 12px;
//       background: rgba(255,255,255,0.03);
//       border: 1px solid rgba(255,255,255,0.06);
//       border-radius: 14px;
//       padding: 14px 16px;
//       transition: border-color 0.25s ease;
//     }
//     .rec-item:hover { border-color: rgba(56,189,248,0.18); }
//     .rec-icon {
//       width: 28px; height: 28px;
//       border-radius: 8px;
//       background: rgba(56,189,248,0.1);
//       border: 1px solid rgba(56,189,248,0.15);
//       display: flex; align-items: center; justify-content: center;
//       flex-shrink: 0;
//       font-size: 14px;
//     }
//     .rec-text { font-size: 13px; line-height: 1.5; color: rgba(232,234,240,0.65); }

//     /* ── Empty State ── */
//     .calmo-empty {
//       height: 280px;
//       display: flex;
//       flex-direction: column;
//       align-items: center;
//       justify-content: center;
//       text-align: center;
//       gap: 12px;
//       border: 1px dashed rgba(255,255,255,0.08);
//       border-radius: 20px;
//     }
//     .calmo-empty-icon {
//       font-size: 32px;
//       opacity: 0.2;
//     }
//     .calmo-empty-title {
//       font-family: 'Cormorant Garamond', serif;
//       font-size: 22px;
//       font-weight: 500;
//       color: rgba(232,234,240,0.35);
//     }
//     .calmo-empty-sub {
//       font-size: 12px;
//       color: rgba(232,234,240,0.2);
//       max-width: 280px;
//       line-height: 1.6;
//     }

//     /* ── Chart ── */
//     .calmo-chart-wrap { height: 280px; }

//     /* ── Analysis AI badge ── */
//     .ai-badge {
//       display: flex;
//       align-items: center;
//       gap: 6px;
//       background: rgba(56,189,248,0.08);
//       border: 1px solid rgba(56,189,248,0.15);
//       padding: 5px 12px;
//       border-radius: 100px;
//     }
//     .ai-badge-dot {
//       width: 5px; height: 5px;
//       border-radius: 50%;
//       background: #38bdf8;
//       animation: pulse 2s ease-in-out infinite;
//     }
//     .ai-badge-text { font-size: 11px; color: #7dd3fc; letter-spacing: 0.5px; }

//     /* ── Divider ── */
//     .calmo-divider {
//       font-size: 10px;
//       letter-spacing: 2px;
//       text-transform: uppercase;
//       color: rgba(232,234,240,0.25);
//       margin-bottom: 14px;
//     }

//     /* ── Loading Shimmer ── */
//     .calmo-loading-bar {
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       gap: 12px;
//       padding: 40px;
//       color: rgba(232,234,240,0.4);
//       font-size: 13px;
//     }
//     .shimmer-dot {
//       width: 6px; height: 6px;
//       border-radius: 50%;
//       background: #38bdf8;
//       animation: shimmerBounce 1.4s ease-in-out infinite;
//     }
//     .shimmer-dot:nth-child(2) { animation-delay: 0.2s; }
//     .shimmer-dot:nth-child(3) { animation-delay: 0.4s; }
//     @keyframes shimmerBounce {
//       0%, 80%, 100% { transform: scale(0.6); opacity: 0.3; }
//       40%            { transform: scale(1);   opacity: 1; }
//     }

//     /* ── Tooltip override ── */
//     .recharts-tooltip-wrapper { outline: none !important; }

//     /* ── Responsive ── */
//     @media (max-width: 768px) {
//       .calmo-nav { padding: 16px 20px; }
//       .calmo-status-pill, .calmo-profile-email { display: none; }
//       .calmo-content { padding: 0 16px 60px; }
//       .calmo-hero { padding: 48px 0 40px; }
//       .glass-card { padding: 24px 20px; }
//     }
//     @media (max-width: 480px) {
//       .calmo-logo-text { font-size: 22px; }
//       .score-number { font-size: 60px; }
//     }
//   `}</style>
// )

// /* ─── Recommendation icons ─── */
// const recIcons = ["✦", "◈", "◉", "◎", "◆", "◇"]

// /* ─── Custom Tooltip ─── */
// const CustomTooltip = ({ active, payload, label }) => {
//   if (active && payload?.length) {
//     return (
//       <div style={{
//         background: "rgba(6,9,18,0.95)",
//         border: "1px solid rgba(56,189,248,0.2)",
//         borderRadius: 12,
//         padding: "10px 16px",
//         fontSize: 12,
//         color: "#e2e8f0"
//       }}>
//         <p style={{ color: "rgba(232,234,240,0.4)", marginBottom: 4, letterSpacing: 1, fontSize: 10, textTransform: "uppercase" }}>{label}</p>
//         <p style={{ color: "#38bdf8", fontWeight: 600, fontSize: 18 }}>{payload[0].value.toFixed(2)}</p>
//         <p style={{ color: "rgba(232,234,240,0.35)", fontSize: 10 }}>Stress Level</p>
//       </div>
//     )
//   }
//   return null
// }

// /* ═══════════════════════════════ DASHBOARD ══════════════════════════════ */
// const Dashboard = () => {
//   const [user, setUser] = useState(null)
//   const [loading, setLoading] = useState(false)
//   const [analysis, setAnalysis] = useState(null)
//   const [chartData, setChartData] = useState([])
//   const [formData, setFormData] = useState({
//     sleepDuration: "",
//     physical_activity_level: "",
//     quality_of_sleep: "",
//     heart_rate: "",
//     daily_steps: ""
//   })
//   const analysisRef = useRef(null)

//   useEffect(() => { fetchProfile() }, [])

//   const fetchProfile = async () => {
//     try {
//       const res = await api.get("/profile")
//       setUser(res.data)
//     } catch (e) { console.error(e) }
//   }

//   const handleChange = (e) =>
//     setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     try {
//       setLoading(true)
//       const res = await api.post("/stress/createstressentries", {
//         sleepDuration: Number(formData.sleepDuration),
//         physical_activity_level: Number(formData.physical_activity_level),
//         quality_of_sleep: Number(formData.quality_of_sleep),
//         heart_rate: Number(formData.heart_rate),
//         daily_steps: Number(formData.daily_steps)
//       })
//       setAnalysis(res.data)
//       setChartData(prev => [...prev, {
//         name: `Day ${prev.length + 1}`,
//         stress: res.data.stress_score
//       }])
//       setLoading(false)
//       setTimeout(() => analysisRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100)
//     } catch (err) {
//       console.error(err)
//       setLoading(false)
//       alert("Failed to generate report. Please try again.")
//     }
//   }


//   const logout = async () => {
//   try {
//     // Tell the backend to blacklist this token
//     await api.post("/user/logout")
//   } catch (err) {
//     // Even if the request fails, clear locally and redirect
//     console.error("Logout error:", err)
//   } finally {
//     localStorage.removeItem("token")
//     window.location.replace("/login")
//   }
// }
 
//   const stressPercent = analysis
//     ? Math.min(Math.round((analysis.stress_score / 10) * 100), 100)
//     : 0

//   const initials = user?.name
//     ? user.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
//     : "U"

//   return (
//     <>
//       <StyleBlock />
//       <div className="calmo-root">

//         {/* ── Aurora background ── */}
//         <div className="calmo-aurora">
//           <div className="aurora-orb3" />
//         </div>

//         {/* ── Navbar ── */}
//         <nav className="calmo-nav">
//           <div>
//             <div className="calmo-logo-text">CALMO</div>
//             <div className="calmo-logo-sub">Smarter Wellness</div>
//           </div>

//           <div className="calmo-nav-right">
//             <div className="calmo-status-pill">
//               <div className="calmo-status-dot" />
//               <span className="calmo-status-text">AI Monitoring Active</span>
//             </div>

//             <div className="calmo-profile-chip">
//               <div className="calmo-avatar">{initials}</div>
//               <div>
//                 <div className="calmo-profile-name">{user?.name || "User"}</div>
//                 <div className="calmo-profile-email">{user?.email || ""}</div>
//               </div>
//             </div>

//             <button className="calmo-logout-btn" onClick={logout}>
//               Logout
//             </button>
//           </div>
//         </nav>

//         {/* ── Main content ── */}
//         <div className="calmo-content">

//           {/* ── Hero ── */}
//           <div className="calmo-hero">
//             <div className="calmo-hero-badge">
//               <div className="calmo-hero-badge-dot" />
//               <span className="calmo-hero-badge-text">Trusted AI Mental Wellness</span>
//             </div>
//             <h1 className="calmo-hero-h1">
//               Understand Your<br />
//               <span>Stress Patterns</span>
//             </h1>
//             <p className="calmo-hero-sub">
//               Intelligent biometric analysis powered by machine learning.
//               Track sleep, heart rate, and daily habits to reveal your wellness story.
//             </p>
//           </div>

//           {/* ── Stats ── */}
//           <div className="calmo-stats-row">
//             <div className="calmo-stat-card">
//               <div className="calmo-stat-label">Total Reports</div>
//               <div className="calmo-stat-value">{chartData.length}</div>
//             </div>
//             <div className="calmo-stat-card">
//               <div className="calmo-stat-label">Latest Stress Score</div>
//               <div className="calmo-stat-value cyan">
//                 {analysis ? analysis.stress_score.toFixed(1) : "—"}
//               </div>
//             </div>
//             <div className="calmo-stat-card">
//               <div className="calmo-stat-label">AI Engine Status</div>
//               <div className="calmo-stat-value green">● Active</div>
//             </div>
//           </div>

//           {/* ── Main Grid ── */}
//           <div className="calmo-grid">

//             {/* LEFT — Form */}
//             <div className="glass-card">
//               <div className="card-header">
//                 <div className="card-title">Wellness Inputs</div>
//                 <div className="card-sub">Enter your daily biometric data</div>
//               </div>

//               <form className="calmo-form" onSubmit={handleSubmit}>
//                 {[
//                   { name: "sleepDuration",             label: "Sleep Duration",          placeholder: "Hours (e.g. 7.5)" },
//                   { name: "physical_activity_level",   label: "Physical Activity Level", placeholder: "Minutes of activity" },
//                   { name: "quality_of_sleep",          label: "Quality of Sleep",        placeholder: "Score 1–10" },
//                   { name: "heart_rate",                label: "Resting Heart Rate",      placeholder: "BPM (e.g. 72)" },
//                   { name: "daily_steps",               label: "Daily Steps",             placeholder: "Steps taken today" }
//                 ].map(({ name, label, placeholder }) => (
//                   <div key={name} className="calmo-input-wrap">
//                     <label className="calmo-input-label">{label}</label>
//                     <input
//                       type="number"
//                       name={name}
//                       placeholder={placeholder}
//                       value={formData[name]}
//                       onChange={handleChange}
//                       required
//                       className="calmo-input"
//                     />
//                   </div>
//                 ))}

//                 <button
//                   type="submit"
//                   className="calmo-submit-btn"
//                   disabled={loading}
//                 >
//                   {loading ? "Analysing your data…" : "Generate AI Report"}
//                 </button>
//               </form>
//             </div>

//             {/* RIGHT */}
//             <div className="calmo-right">

//               {/* AI Analysis */}
//               <div className="glass-card" ref={analysisRef}>
//                 <div className="card-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
//                   <div>
//                     <div className="card-title">AI Analysis</div>
//                     <div className="card-sub">Personalised wellness insights</div>
//                   </div>
//                   <div className="ai-badge">
//                     <div className="ai-badge-dot" />
//                     <span className="ai-badge-text">Smart Engine</span>
//                   </div>
//                 </div>

//                 {loading && (
//                   <div className="calmo-loading-bar">
//                     <div className="shimmer-dot" />
//                     <div className="shimmer-dot" />
//                     <div className="shimmer-dot" />
//                     <span>Generating your analysis…</span>
//                   </div>
//                 )}

//                 {!loading && analysis && (
//                   <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

//                     {/* Score */}
//                     <div className="score-display">
//                       <div className="score-number">{analysis.stress_score.toFixed(1)}</div>
//                       <div className="score-meta">
//                         <div className="score-meta-label">Stress Score · /10</div>
//                         <div className="score-bar-track">
//                           <div className="score-bar-fill" style={{ width: `${stressPercent}%` }} />
//                         </div>
//                         <div className="score-range-labels">
//                           <span>Low</span><span>Moderate</span><span>High</span>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Motivation */}
//                     <div className="motivation-box">
//                       <div className="motivation-box-label">Insight</div>
//                       <p className="motivation-text">"{analysis.motivation}"</p>
//                     </div>

//                     {/* Recommendations */}
//                     <div>
//                       <div className="calmo-divider">Recommendations</div>
//                       <div className="rec-grid">
//                         {analysis.recommendations?.map((item, i) => (
//                           <div key={i} className="rec-item">
//                             <div className="rec-icon">{recIcons[i % recIcons.length]}</div>
//                             <div className="rec-text">{item}</div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>

//                   </div>
//                 )}

//                 {!loading && !analysis && (
//                   <div className="calmo-empty">
//                     <div className="calmo-empty-icon">◎</div>
//                     <div className="calmo-empty-title">No Analysis Yet</div>
//                     <div className="calmo-empty-sub">
//                       Complete the wellness form to receive your personalised AI-powered stress report.
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Trend Chart */}
//               <div className="glass-card">
//                 <div className="card-header">
//                   <div className="card-title">Stress Trends</div>
//                   <div className="card-sub">Visual history of your wellness scores</div>
//                 </div>

//                 {chartData.length === 0 ? (
//                   <div className="calmo-empty" style={{ height: 200 }}>
//                     <div className="calmo-empty-icon">◇</div>
//                     <div className="calmo-empty-sub">Submit your first report to start tracking trends.</div>
//                   </div>
//                 ) : (
//                   <div className="calmo-chart-wrap">
//                     <ResponsiveContainer width="100%" height="100%">
//                       <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
//                         <defs>
//                           <linearGradient id="stressGrad" x1="0" y1="0" x2="0" y2="1">
//                             <stop offset="5%"  stopColor="#38bdf8" stopOpacity={0.25} />
//                             <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.01} />
//                           </linearGradient>
//                         </defs>
//                         <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
//                         <XAxis
//                           dataKey="name"
//                           tick={{ fill: "rgba(232,234,240,0.3)", fontSize: 11 }}
//                           axisLine={false}
//                           tickLine={false}
//                         />
//                         <YAxis
//                           tick={{ fill: "rgba(232,234,240,0.3)", fontSize: 11 }}
//                           axisLine={false}
//                           tickLine={false}
//                           domain={[0, 10]}
//                         />
//                         <Tooltip content={<CustomTooltip />} />
//                         <Area
//                           type="monotone"
//                           dataKey="stress"
//                           stroke="#38bdf8"
//                           strokeWidth={2}
//                           fill="url(#stressGrad)"
//                           dot={{ r: 4, fill: "#38bdf8", strokeWidth: 0 }}
//                           activeDot={{ r: 6, fill: "#7dd3fc", strokeWidth: 0 }}
//                         />
//                       </AreaChart>
//                     </ResponsiveContainer>
//                   </div>
//                 )}
//               </div>

//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

// export default Dashboard



import { useEffect, useState, useRef } from "react"
import api from "../api/axios"
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts"

/* ─── Inject Google Fonts + custom CSS once ─── */
const StyleBlock = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    .calmo-root {
      font-family: 'DM Sans', sans-serif;
      min-height: 100vh;
      background: #060912;
      color: #e8eaf0;
      overflow-x: hidden;
      position: relative;
    }

    /* ── Aurora background ── */
    .calmo-aurora {
      position: fixed;
      inset: 0;
      z-index: 0;
      pointer-events: none;
      overflow: hidden;
    }
    .calmo-aurora::before {
      content: '';
      position: absolute;
      width: 900px; height: 900px;
      top: -300px; left: -200px;
      background: radial-gradient(ellipse, rgba(14,165,233,0.08) 0%, transparent 70%);
      animation: auroraMove1 18s ease-in-out infinite alternate;
    }
    .calmo-aurora::after {
      content: '';
      position: absolute;
      width: 800px; height: 800px;
      bottom: -200px; right: -150px;
      background: radial-gradient(ellipse, rgba(99,102,241,0.07) 0%, transparent 70%);
      animation: auroraMove2 22s ease-in-out infinite alternate;
    }
    .aurora-orb3 {
      position: absolute;
      width: 600px; height: 600px;
      top: 40%; left: 50%;
      transform: translate(-50%, -50%);
      background: radial-gradient(ellipse, rgba(20,184,166,0.05) 0%, transparent 70%);
      animation: auroraMove3 26s ease-in-out infinite alternate;
    }
    @keyframes auroraMove1 {
      0%   { transform: translate(0, 0) scale(1); }
      100% { transform: translate(120px, 80px) scale(1.15); }
    }
    @keyframes auroraMove2 {
      0%   { transform: translate(0, 0) scale(1); }
      100% { transform: translate(-80px, -60px) scale(1.2); }
    }
    @keyframes auroraMove3 {
      0%   { transform: translate(-50%, -50%) scale(1); }
      100% { transform: translate(-50%, -50%) scale(1.3); }
    }

    /* ── Content wrapper ── */
    .calmo-content {
      position: relative;
      z-index: 1;
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 24px 80px;
    }

    /* ── Navbar ── */
    .calmo-nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px 32px;
      background: rgba(255,255,255,0.03);
      border-bottom: 1px solid rgba(255,255,255,0.06);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      position: sticky;
      top: 0;
      z-index: 100;
    }
    .calmo-logo-text {
      font-family: 'Cormorant Garamond', serif;
      font-size: 28px;
      font-weight: 700;
      letter-spacing: 6px;
      background: linear-gradient(135deg, #7dd3fc, #38bdf8, #67e8f9);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .calmo-logo-sub {
      font-size: 10px;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: rgba(125,211,252,0.5);
      margin-top: 1px;
    }
    .calmo-nav-right {
      display: flex;
      align-items: center;
      gap: 14px;
    }
    .calmo-status-pill {
      display: flex;
      align-items: center;
      gap: 8px;
      background: rgba(16,185,129,0.08);
      border: 1px solid rgba(16,185,129,0.2);
      padding: 7px 16px;
      border-radius: 100px;
    }
    .calmo-status-dot {
      width: 7px; height: 7px;
      border-radius: 50%;
      background: #10b981;
      box-shadow: 0 0 8px rgba(16,185,129,0.8);
      animation: pulse 2s ease-in-out infinite;
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50%       { opacity: 0.6; transform: scale(0.85); }
    }
    .calmo-status-text {
      font-size: 12px;
      color: #6ee7b7;
      letter-spacing: 0.5px;
    }
    .calmo-profile-chip {
      display: flex;
      align-items: center;
      gap: 10px;
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.08);
      padding: 6px 16px 6px 6px;
      border-radius: 100px;
    }
    .calmo-avatar {
      width: 38px; height: 38px;
      border-radius: 50%;
      background: linear-gradient(135deg, #0ea5e9, #6366f1);
      display: flex; align-items: center; justify-content: center;
      font-family: 'Cormorant Garamond', serif;
      font-size: 16px; font-weight: 600;
      color: #fff;
      flex-shrink: 0;
    }
    .calmo-profile-name { font-size: 13px; font-weight: 500; }
    .calmo-profile-email { font-size: 11px; color: rgba(232,234,240,0.4); margin-top: 1px; }
    .calmo-logout-btn {
      background: rgba(239,68,68,0.12);
      border: 1px solid rgba(239,68,68,0.25);
      color: #fca5a5;
      padding: 8px 20px;
      border-radius: 100px;
      font-size: 13px;
      font-family: 'DM Sans', sans-serif;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.25s ease;
      letter-spacing: 0.3px;
    }
    .calmo-logout-btn:hover {
      background: rgba(239,68,68,0.22);
      border-color: rgba(239,68,68,0.45);
      color: #fecaca;
    }

    /* ── Hero ── */
    .calmo-hero {
      text-align: center;
      padding: 72px 0 56px;
      animation: fadeSlideUp 0.9s ease both;
    }
    @keyframes fadeSlideUp {
      from { opacity: 0; transform: translateY(24px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .calmo-hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.08);
      padding: 8px 20px;
      border-radius: 100px;
      margin-bottom: 28px;
      backdrop-blur: 12px;
    }
    .calmo-hero-badge-dot {
      width: 6px; height: 6px;
      border-radius: 50%;
      background: #38bdf8;
    }
    .calmo-hero-badge-text {
      font-size: 12px;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: rgba(232,234,240,0.5);
    }
    .calmo-hero-h1 {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(44px, 8vw, 82px);
      font-weight: 600;
      line-height: 1.08;
      letter-spacing: -1px;
      background: linear-gradient(160deg, #e2e8f0 30%, #94a3b8 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 20px;
    }
    .calmo-hero-h1 span {
      background: linear-gradient(135deg, #38bdf8, #818cf8);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .calmo-hero-sub {
      max-width: 560px;
      margin: 0 auto;
      font-size: 15px;
      line-height: 1.75;
      color: rgba(232,234,240,0.45);
      font-weight: 300;
      letter-spacing: 0.2px;
    }

    /* ── Stats Row ── */
    .calmo-stats-row {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
      margin-bottom: 40px;
      animation: fadeSlideUp 0.9s ease 0.15s both;
    }
    .calmo-stat-card {
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.07);
      border-radius: 20px;
      padding: 24px 28px;
      position: relative;
      overflow: hidden;
      transition: border-color 0.3s ease, transform 0.3s ease;
    }
    .calmo-stat-card:hover {
      border-color: rgba(255,255,255,0.14);
      transform: translateY(-2px);
    }
    .calmo-stat-card::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
    }
    .calmo-stat-label {
      font-size: 11px;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: rgba(232,234,240,0.35);
      margin-bottom: 10px;
    }
    .calmo-stat-value {
      font-family: 'Cormorant Garamond', serif;
      font-size: 52px;
      font-weight: 500;
      line-height: 1;
      color: #e2e8f0;
    }
    .calmo-stat-value.cyan { color: #38bdf8; }
    .calmo-stat-value.green { color: #34d399; font-size: 36px; letter-spacing: 1px; }

    /* ── Main Grid ── */
    .calmo-grid {
      display: grid;
      grid-template-columns: 420px 1fr;
      gap: 24px;
      animation: fadeSlideUp 0.9s ease 0.3s both;
    }
    @media (max-width: 1100px) {
      .calmo-grid { grid-template-columns: 1fr; }
    }

    /* ── Glass Card ── */
    .glass-card {
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.07);
      border-radius: 28px;
      padding: 32px;
      position: relative;
      overflow: hidden;
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
    }
    .glass-card::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent);
    }

    /* ── Card Header ── */
    .card-header { margin-bottom: 28px; }
    .card-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: 26px;
      font-weight: 600;
      color: #e2e8f0;
      letter-spacing: -0.3px;
    }
    .card-sub {
      font-size: 13px;
      color: rgba(232,234,240,0.35);
      margin-top: 4px;
      font-weight: 300;
    }

    /* ── Form ── */
    .calmo-form { display: flex; flex-direction: column; gap: 12px; }
    .calmo-input-wrap { position: relative; }
    .calmo-input-label {
      display: block;
      font-size: 10px;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: rgba(232,234,240,0.35);
      margin-bottom: 6px;
      padding-left: 2px;
    }
    .calmo-input {
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
      -webkit-appearance: none;
      -moz-appearance: textfield;
    }
    .calmo-input::placeholder { color: rgba(232,234,240,0.2); }
    .calmo-input:focus {
      border-color: rgba(56,189,248,0.4);
      background: rgba(56,189,248,0.04);
    }
    .calmo-input::-webkit-outer-spin-button,
    .calmo-input::-webkit-inner-spin-button { -webkit-appearance: none; }
    .calmo-submit-btn {
      width: 100%;
      margin-top: 8px;
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
    .calmo-submit-btn:hover { opacity: 0.9; transform: translateY(-1px); }
    .calmo-submit-btn:active { transform: translateY(0); opacity: 1; }
    .calmo-submit-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
    .calmo-submit-btn::before {
      content: '';
      position: absolute;
      top: 0; left: -100%;
      width: 100%; height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
      transition: left 0.5s ease;
    }
    .calmo-submit-btn:not(:disabled):hover::before { left: 100%; }

    /* ── Right column ── */
    .calmo-right { display: flex; flex-direction: column; gap: 24px; }

    /* ── Stress Score Display ── */
    .score-display {
      background: linear-gradient(135deg, rgba(14,165,233,0.1), rgba(99,102,241,0.07));
      border: 1px solid rgba(56,189,248,0.15);
      border-radius: 20px;
      padding: 28px;
      display: flex;
      align-items: center;
      gap: 24px;
    }
    .score-number {
      font-family: 'Cormorant Garamond', serif;
      font-size: 80px;
      font-weight: 600;
      line-height: 1;
      background: linear-gradient(135deg, #38bdf8, #818cf8);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      flex-shrink: 0;
    }
    .score-meta { flex: 1; }
    .score-meta-label {
      font-size: 10px;
      letter-spacing: 2.5px;
      text-transform: uppercase;
      color: rgba(56,189,248,0.5);
      margin-bottom: 8px;
    }
    .score-bar-track {
      width: 100%;
      height: 4px;
      background: rgba(255,255,255,0.06);
      border-radius: 100px;
      overflow: hidden;
    }
    .score-bar-fill {
      height: 100%;
      border-radius: 100px;
      background: linear-gradient(90deg, #38bdf8, #818cf8);
      transition: width 0.8s cubic-bezier(0.4,0,0.2,1);
    }
    .score-range-labels {
      display: flex;
      justify-content: space-between;
      margin-top: 6px;
      font-size: 10px;
      color: rgba(232,234,240,0.25);
    }

    /* ── Motivation ── */
    .motivation-box {
      background: rgba(255,255,255,0.02);
      border: 1px solid rgba(255,255,255,0.06);
      border-radius: 16px;
      padding: 20px;
    }
    .motivation-box-label {
      font-size: 10px;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: rgba(232,234,240,0.3);
      margin-bottom: 10px;
    }
    .motivation-text {
      font-size: 14px;
      line-height: 1.7;
      color: rgba(232,234,240,0.7);
      font-style: italic;
      font-weight: 300;
    }

    /* ── Recommendations ── */
    .rec-grid { display: flex; flex-direction: column; gap: 8px; }
    .rec-item {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.06);
      border-radius: 14px;
      padding: 14px 16px;
      transition: border-color 0.25s ease;
    }
    .rec-item:hover { border-color: rgba(56,189,248,0.18); }
    .rec-icon {
      width: 28px; height: 28px;
      border-radius: 8px;
      background: rgba(56,189,248,0.1);
      border: 1px solid rgba(56,189,248,0.15);
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
      font-size: 14px;
    }
    .rec-text { font-size: 13px; line-height: 1.5; color: rgba(232,234,240,0.65); }

    /* ── Empty State ── */
    .calmo-empty {
      height: 280px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      gap: 12px;
      border: 1px dashed rgba(255,255,255,0.08);
      border-radius: 20px;
    }
    .calmo-empty-icon {
      font-size: 32px;
      opacity: 0.2;
    }
    .calmo-empty-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: 22px;
      font-weight: 500;
      color: rgba(232,234,240,0.35);
    }
    .calmo-empty-sub {
      font-size: 12px;
      color: rgba(232,234,240,0.2);
      max-width: 280px;
      line-height: 1.6;
    }

    /* ── Chart ── */
    .calmo-chart-wrap { height: 280px; }

    /* ── Analysis AI badge ── */
    .ai-badge {
      display: flex;
      align-items: center;
      gap: 6px;
      background: rgba(56,189,248,0.08);
      border: 1px solid rgba(56,189,248,0.15);
      padding: 5px 12px;
      border-radius: 100px;
    }
    .ai-badge-dot {
      width: 5px; height: 5px;
      border-radius: 50%;
      background: #38bdf8;
      animation: pulse 2s ease-in-out infinite;
    }
    .ai-badge-text { font-size: 11px; color: #7dd3fc; letter-spacing: 0.5px; }

    /* ── Divider ── */
    .calmo-divider {
      font-size: 10px;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: rgba(232,234,240,0.25);
      margin-bottom: 14px;
    }

    /* ── Loading Shimmer ── */
    .calmo-loading-bar {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      padding: 40px;
      color: rgba(232,234,240,0.4);
      font-size: 13px;
    }
    .shimmer-dot {
      width: 6px; height: 6px;
      border-radius: 50%;
      background: #38bdf8;
      animation: shimmerBounce 1.4s ease-in-out infinite;
    }
    .shimmer-dot:nth-child(2) { animation-delay: 0.2s; }
    .shimmer-dot:nth-child(3) { animation-delay: 0.4s; }
    @keyframes shimmerBounce {
      0%, 80%, 100% { transform: scale(0.6); opacity: 0.3; }
      40%            { transform: scale(1);   opacity: 1; }
    }

    /* ── Tooltip override ── */
    .recharts-tooltip-wrapper { outline: none !important; }

    /* ── Responsive ── */
    @media (max-width: 768px) {
      .calmo-nav { padding: 16px 20px; }
      .calmo-status-pill, .calmo-profile-email { display: none; }
      .calmo-content { padding: 0 16px 60px; }
      .calmo-hero { padding: 48px 0 40px; }
      .glass-card { padding: 24px 20px; }
    }
    @media (max-width: 480px) {
      .calmo-logo-text { font-size: 22px; }
      .score-number { font-size: 60px; }
    }
  `}</style>
)

/* ─── Recommendation icons ─── */
const recIcons = ["✦", "◈", "◉", "◎", "◆", "◇"]

/* ─── Custom Tooltip ─── */
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div style={{
        background: "rgba(6,9,18,0.95)",
        border: "1px solid rgba(56,189,248,0.2)",
        borderRadius: 12,
        padding: "10px 16px",
        fontSize: 12,
        color: "#e2e8f0"
      }}>
        <p style={{ color: "rgba(232,234,240,0.4)", marginBottom: 4, letterSpacing: 1, fontSize: 10, textTransform: "uppercase" }}>{label}</p>
        <p style={{ color: "#38bdf8", fontWeight: 600, fontSize: 18 }}>{payload[0].value.toFixed(2)}</p>
        <p style={{ color: "rgba(232,234,240,0.35)", fontSize: 10 }}>Stress Level</p>
      </div>
    )
  }
  return null
}

/* ═══════════════════════════════ DASHBOARD ══════════════════════════════ */
const Dashboard = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [analysis, setAnalysis] = useState(null)
  const [chartData, setChartData] = useState([])
  const [formData, setFormData] = useState({
    sleepDuration: "",
    physical_activity_level: "",
    quality_of_sleep: "",
    heart_rate: "",
    daily_steps: ""
  })
  const analysisRef = useRef(null)

  useEffect(() => { fetchProfile(); fetchEntries() }, [])

  const fetchProfile = async () => {
    try {
      const res = await api.get("/users/profile")
      setUser(res.data)
    } catch (e) { console.error(e) }
  }

  const fetchEntries = async () => {
    try {
      const res = await api.get("/stress/getallentries")
      const entries = res.data
      if (!entries || entries.length === 0) return

      setChartData(
        entries.map((entry, index) => ({
          name: `Day ${index + 1}`,
          stress: entry.stress_score
        }))
      )

      const latest = entries[entries.length - 1]
      setAnalysis({
        stress_score: latest.stress_score,
        recommendations: latest.recommendations,
        motivation: latest.motivation
      })
    } catch (e) {
      console.error("Failed to fetch entries:", e)
    }
  }

  const handleChange = (e) =>
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const res = await api.post("/stress/createstressentries", {
        sleepDuration: Number(formData.sleepDuration),
        physical_activity_level: Number(formData.physical_activity_level),
        quality_of_sleep: Number(formData.quality_of_sleep),
        heart_rate: Number(formData.heart_rate),
        daily_steps: Number(formData.daily_steps)
      })
      setAnalysis(res.data)
      setChartData(prev => [...prev, {
        name: `Day ${prev.length + 1}`,
        stress: res.data.stress_score
      }])
      setLoading(false)
      setTimeout(() => analysisRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100)
    } catch (err) {
      console.error(err)
      setLoading(false)
      alert("Failed to generate report. Please try again.")
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    window.location.href = "/login"
  }

  const stressPercent = analysis
    ? Math.min(Math.round((analysis.stress_score / 10) * 100), 100)
    : 0

  const initials = user?.name
    ? user.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
    : "U"

  return (
    <>
      <StyleBlock />
      <div className="calmo-root">

        {/* ── Aurora background ── */}
        <div className="calmo-aurora">
          <div className="aurora-orb3" />
        </div>

        {/* ── Navbar ── */}
        <nav className="calmo-nav">
          <div>
            <div className="calmo-logo-text">CALMO</div>
            <div className="calmo-logo-sub">Smarter Wellness</div>
          </div>

          <div className="calmo-nav-right">
            <div className="calmo-status-pill">
              <div className="calmo-status-dot" />
              <span className="calmo-status-text">AI Monitoring Active</span>
            </div>

            <div className="calmo-profile-chip">
              <div className="calmo-avatar">{initials}</div>
              <div>
                <div className="calmo-profile-name">{user?.name || "User"}</div>
                <div className="calmo-profile-email">{user?.email || ""}</div>
              </div>
            </div>

            <button className="calmo-logout-btn" onClick={logout}>
              Logout
            </button>
          </div>
        </nav>

        {/* ── Main content ── */}
        <div className="calmo-content">

          {/* ── Hero ── */}
          <div className="calmo-hero">
            <div className="calmo-hero-badge">
              <div className="calmo-hero-badge-dot" />
              <span className="calmo-hero-badge-text">Trusted AI Mental Wellness</span>
            </div>
            <h1 className="calmo-hero-h1">
              Understand Your<br />
              <span>Stress Patterns</span>
            </h1>
            <p className="calmo-hero-sub">
              Intelligent biometric analysis powered by machine learning.
              Track sleep, heart rate, and daily habits to reveal your wellness story.
            </p>
          </div>

          {/* ── Stats ── */}
          <div className="calmo-stats-row">
            <div className="calmo-stat-card">
              <div className="calmo-stat-label">Total Reports</div>
              <div className="calmo-stat-value">{chartData.length}</div>
            </div>
            <div className="calmo-stat-card">
              <div className="calmo-stat-label">Latest Stress Score</div>
              <div className="calmo-stat-value cyan">
                {analysis ? analysis.stress_score.toFixed(1) : "—"}
              </div>
            </div>
            <div className="calmo-stat-card">
              <div className="calmo-stat-label">AI Engine Status</div>
              <div className="calmo-stat-value green">● Active</div>
            </div>
          </div>

          {/* ── Main Grid ── */}
          <div className="calmo-grid">

            {/* LEFT — Form */}
            <div className="glass-card">
              <div className="card-header">
                <div className="card-title">Wellness Inputs</div>
                <div className="card-sub">Enter your daily biometric data</div>
              </div>

              <form className="calmo-form" onSubmit={handleSubmit}>
                {[
                  { name: "sleepDuration",             label: "Sleep Duration",          placeholder: "Hours (e.g. 7.5)" },
                  { name: "physical_activity_level",   label: "Physical Activity Level", placeholder: "Minutes of activity" },
                  { name: "quality_of_sleep",          label: "Quality of Sleep",        placeholder: "Score 1–10" },
                  { name: "heart_rate",                label: "Resting Heart Rate",      placeholder: "BPM (e.g. 72)" },
                  { name: "daily_steps",               label: "Daily Steps",             placeholder: "Steps taken today" }
                ].map(({ name, label, placeholder }) => (
                  <div key={name} className="calmo-input-wrap">
                    <label className="calmo-input-label">{label}</label>
                    <input
                      type="number"
                      name={name}
                      placeholder={placeholder}
                      value={formData[name]}
                      onChange={handleChange}
                      required
                      className="calmo-input"
                    />
                  </div>
                ))}

                <button
                  type="submit"
                  className="calmo-submit-btn"
                  disabled={loading}
                >
                  {loading ? "Analysing your data…" : "Generate AI Report"}
                </button>
              </form>
            </div>

            {/* RIGHT */}
            <div className="calmo-right">

              {/* AI Analysis */}
              <div className="glass-card" ref={analysisRef}>
                <div className="card-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div className="card-title">AI Analysis</div>
                    <div className="card-sub">Personalised wellness insights</div>
                  </div>
                  <div className="ai-badge">
                    <div className="ai-badge-dot" />
                    <span className="ai-badge-text">Smart Engine</span>
                  </div>
                </div>

                {loading && (
                  <div className="calmo-loading-bar">
                    <div className="shimmer-dot" />
                    <div className="shimmer-dot" />
                    <div className="shimmer-dot" />
                    <span>Generating your analysis…</span>
                  </div>
                )}

                {!loading && analysis && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

                    {/* Score */}
                    <div className="score-display">
                      <div className="score-number">{analysis.stress_score.toFixed(1)}</div>
                      <div className="score-meta">
                        <div className="score-meta-label">Stress Score · /10</div>
                        <div className="score-bar-track">
                          <div className="score-bar-fill" style={{ width: `${stressPercent}%` }} />
                        </div>
                        <div className="score-range-labels">
                          <span>Low</span><span>Moderate</span><span>High</span>
                        </div>
                      </div>
                    </div>

                    {/* Motivation */}
                    <div className="motivation-box">
                      <div className="motivation-box-label">Insight</div>
                      <p className="motivation-text">"{analysis.motivation}"</p>
                    </div>

                    {/* Recommendations */}
                    <div>
                      <div className="calmo-divider">Recommendations</div>
                      <div className="rec-grid">
                        {analysis.recommendations?.map((item, i) => (
                          <div key={i} className="rec-item">
                            <div className="rec-icon">{recIcons[i % recIcons.length]}</div>
                            <div className="rec-text">{item}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                )}

                {!loading && !analysis && (
                  <div className="calmo-empty">
                    <div className="calmo-empty-icon">◎</div>
                    <div className="calmo-empty-title">No Analysis Yet</div>
                    <div className="calmo-empty-sub">
                      Complete the wellness form to receive your personalised AI-powered stress report.
                    </div>
                  </div>
                )}
              </div>

              {/* Trend Chart */}
              <div className="glass-card">
                <div className="card-header">
                  <div className="card-title">Stress Trends</div>
                  <div className="card-sub">Visual history of your wellness scores</div>
                </div>

                {chartData.length === 0 ? (
                  <div className="calmo-empty" style={{ height: 200 }}>
                    <div className="calmo-empty-icon">◇</div>
                    <div className="calmo-empty-sub">Submit your first report to start tracking trends.</div>
                  </div>
                ) : (
                  <div className="calmo-chart-wrap">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="stressGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%"  stopColor="#38bdf8" stopOpacity={0.25} />
                            <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.01} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                        <XAxis
                          dataKey="name"
                          tick={{ fill: "rgba(232,234,240,0.3)", fontSize: 11 }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <YAxis
                          tick={{ fill: "rgba(232,234,240,0.3)", fontSize: 11 }}
                          axisLine={false}
                          tickLine={false}
                          domain={[0, 10]}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Area
                          type="monotone"
                          dataKey="stress"
                          stroke="#38bdf8"
                          strokeWidth={2}
                          fill="url(#stressGrad)"
                          dot={{ r: 4, fill: "#38bdf8", strokeWidth: 0 }}
                          activeDot={{ r: 6, fill: "#7dd3fc", strokeWidth: 0 }}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard