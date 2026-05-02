import React, { useMemo, useState } from "react";

const rates = {
  office: 35,
  medical: 45,
  daycare: 38,
  retail: 32,
  restaurant: 40,
};

const multipliers = {
  standard: 1,
  premium: 1.25,
  whiteGlove: 1.5,
};

export default function App() {
  const [facilityType, setFacilityType] = useState("office");
  const [hours, setHours] = useState(4);
  const [visits, setVisits] = useState(5);
  const [tier, setTier] = useState("standard");
  const [supplies, setSupplies] = useState(35);

  const result = useMemo(() => {
    const hourlyRate = rates[facilityType];
    const tierMultiplier = multipliers[tier];
    const perVisit = hourlyRate * hours * tierMultiplier + Number(supplies);
    const monthly = perVisit * visits;
    const laborCost = hourlyRate * hours * visits * 0.45;
    const supplyCost = Number(supplies) * visits;
    const profit = monthly - laborCost - supplyCost;
    const margin = monthly > 0 ? (profit / monthly) * 100 : 0;

    return {
      hourlyRate,
      perVisit,
      monthly,
      laborCost,
      supplyCost,
      profit,
      margin,
    };
  }, [facilityType, hours, visits, tier, supplies]);

  return (
    <main className="app">
      <aside className="sidebar">
        <div className="brand">
          <div className="logo">SR</div>
          <div>
            <h2>Sir Redbird</h2>
            <p>Command OS</p>
          </div>
        </div>

        <nav>
          <a className="active">Dashboard</a>
          <a>AI Command</a>
          <a>Pricing</a>
          <a>Agents</a>
          <a>Proposals</a>
          <a>Activity</a>
        </nav>
      </aside>

      <section className="main">
        <header className="header">
          <div>
            <p className="eyebrow">Redbird Cleaning Solutions</p>
            <h1>Sir Redbird Command Center</h1>
            <p className="subtitle">
              AI-powered business operating system for pricing, sales,
              proposals, workflows, and executive decision support.
            </p>
          </div>
          <button className="primary">System Online</button>
        </header>

        <section className="stats">
          <div className="stat">
            <span>Active Agents</span>
            <strong>6</strong>
          </div>
          <div className="stat">
            <span>Pending Approvals</span>
            <strong>3</strong>
          </div>
          <div className="stat">
            <span>Pricing Runs</span>
            <strong>12</strong>
          </div>
          <div className="stat">
            <span>System Status</span>
            <strong>Live</strong>
          </div>
        </section>

        <section className="grid">
          <div className="panel large">
            <div className="panel-head">
              <h2>Pricing Calculator</h2>
              <p>Walkthrough-ready pricing engine.</p>
            </div>

            <div className="form-grid">
              <label>
                Facility Type
                <select value={facilityType} onChange={(e) => setFacilityType(e.target.value)}>
                  <option value="office">Office</option>
                  <option value="medical">Medical</option>
                  <option value="daycare">Daycare</option>
                  <option value="retail">Retail</option>
                  <option value="restaurant">Restaurant</option>
                </select>
              </label>

              <label>
                Estimated Hours Per Visit
                <input type="number" value={hours} onChange={(e) => setHours(e.target.value)} />
              </label>

              <label>
                Visits Per Month
                <input type="number" value={visits} onChange={(e) => setVisits(e.target.value)} />
              </label>

              <label>
                Service Tier
                <select value={tier} onChange={(e) => setTier(e.target.value)}>
                  <option value="standard">Standard</option>
                  <option value="premium">Premium</option>
                  <option value="whiteGlove">White Glove</option>
                </select>
              </label>

              <label>
                Supplies Per Visit
                <input type="number" value={supplies} onChange={(e) => setSupplies(e.target.value)} />
              </label>
            </div>

            <div className="results">
              <div>
                <span>Per Visit</span>
                <strong>${result.perVisit.toFixed(2)}</strong>
              </div>
              <div>
                <span>Monthly Price</span>
                <strong>${result.monthly.toFixed(2)}</strong>
              </div>
              <div>
                <span>Gross Profit</span>
                <strong>${result.profit.toFixed(2)}</strong>
              </div>
              <div>
                <span>Margin</span>
                <strong>{result.margin.toFixed(1)}%</strong>
              </div>
            </div>
          </div>

          <div className="panel">
            <div className="panel-head">
              <h2>AI Command Panel</h2>
              <p>Sir Redbird is standing by.</p>
            </div>

            <div className="chat-box">
              <p>
                “Give me a facility type, hours, frequency, and service tier. I’ll
                turn it into pricing logic, proposal language, and closing strategy.”
              </p>
            </div>

            <input className="command-input" placeholder="Ask Sir Redbird..." />
            <button className="primary full">Send Command</button>
          </div>
        </section>

        <section className="agents">
          <h2>Agent Command Center</h2>

          <div className="agent-grid">
            {[
              "Sales Agent",
              "Appointment Setter",
              "Marketing Agent",
              "Proposal Generator",
              "Hiring Gatekeeper",
              "Operations Agent",
            ].map((agent) => (
              <div className="agent-card" key={agent}>
                <div>
                  <h3>{agent}</h3>
                  <p>Ready for deployment</p>
                </div>
                <span>Active</span>
              </div>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
