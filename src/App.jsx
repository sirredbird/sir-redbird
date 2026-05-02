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

const tabs = ["Dashboard", "AI Command", "Pricing", "Agents", "Proposals", "Activity"];

export default function App() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [facilityType, setFacilityType] = useState("office");
  const [hours, setHours] = useState(4);
  const [visits, setVisits] = useState(5);
  const [tier, setTier] = useState("standard");
  const [supplies, setSupplies] = useState(35);

  const result = useMemo(() => {
    const hourlyRate = rates[facilityType];
    const tierMultiplier = multipliers[tier];
    const perVisit = hourlyRate * Number(hours) * tierMultiplier + Number(supplies);
    const monthly = perVisit * Number(visits);
    const laborCost = hourlyRate * Number(hours) * Number(visits) * 0.45;
    const supplyCost = Number(supplies) * Number(visits);
    const profit = monthly - laborCost - supplyCost;
    const margin = monthly > 0 ? (profit / monthly) * 100 : 0;

    return { perVisit, monthly, laborCost, supplyCost, profit, margin };
  }, [facilityType, hours, visits, tier, supplies]);

  function PricingCalculator() {
    return (
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
          <div><span>Per Visit</span><strong>${result.perVisit.toFixed(2)}</strong></div>
          <div><span>Monthly</span><strong>${result.monthly.toFixed(2)}</strong></div>
          <div><span>Profit</span><strong>${result.profit.toFixed(2)}</strong></div>
          <div><span>Margin</span><strong>{result.margin.toFixed(1)}%</strong></div>
        </div>
      </div>
    );
  }

  function renderTab() {
    if (activeTab === "Dashboard") {
      return (
        <>
          <section className="stats">
            <div className="stat"><span>Active Agents</span><strong>6</strong></div>
            <div className="stat"><span>Pending Approvals</span><strong>3</strong></div>
            <div className="stat"><span>Pricing Runs</span><strong>12</strong></div>
            <div className="stat"><span>System Status</span><strong>Live</strong></div>
          </section>

          <section className="grid">
            <PricingCalculator />
            <div className="panel">
              <div className="panel-head">
                <h2>AI Command Panel</h2>
                <p>Sir Redbird is standing by.</p>
              </div>
              <div className="chat-box">
                <p>“Give me a facility type, hours, frequency, and service tier. I’ll turn it into pricing logic, proposal language, and closing strategy.”</p>
              </div>
              <input className="command-input" placeholder="Ask Sir Redbird..." />
              <button className="primary full">Send Command</button>
            </div>
          </section>
        </>
      );
    }

    if (activeTab === "AI Command") {
      return (
        <div className="panel large">
          <h2>AI Command</h2>
          <p>Ask Sir Redbird for sales scripts, follow-ups, proposals, marketing ideas, and closing strategy.</p>
          <textarea className="textarea" placeholder="Type your command here..." />
          <button className="primary">Run Command</button>
        </div>
      );
    }

    if (activeTab === "Pricing") return <PricingCalculator />;

    if (activeTab === "Agents") {
      return (
        <div className="agents">
          <h2>Agent Command Center</h2>
          <div className="agent-grid">
            {["Sales Agent", "Appointment Setter", "Marketing Agent", "Proposal Generator", "Hiring Gatekeeper", "Operations Agent"].map((agent) => (
              <div className="agent-card" key={agent}>
                <div><h3>{agent}</h3><p>Ready for deployment</p></div>
                <span>Active</span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (activeTab === "Proposals") {
      return (
        <div className="panel large">
          <h2>Proposal Generator</h2>
          <p>Create branded Redbird cleaning proposals from pricing calculations and walkthrough notes.</p>
          <textarea className="textarea" placeholder="Enter client name, facility type, scope, and notes..." />
          <button className="primary">Generate Proposal</button>
        </div>
      );
    }

    if (activeTab === "Activity") {
      return (
        <div className="panel large">
          <h2>Activity Feed</h2>
          <p>System Online</p>
          <p>Pricing calculator loaded</p>
          <p>Agent Command Center initialized</p>
        </div>
      );
    }
  }

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
          {tabs.map((tab) => (
            <button
              key={tab}
              className={activeTab === tab ? "active" : ""}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </nav>
      </aside>

      <section className="main">
        <header className="header">
          <div>
            <p className="eyebrow">Redbird Cleaning Solutions</p>
            <h1>{activeTab}</h1>
            <p className="subtitle">
              Sir Redbird OS is live and ready for pricing, sales, proposals, workflows, and executive support.
            </p>
          </div>
          <button className="primary">System Online</button>
        </header>

        {renderTab()}
      </section>
    </main>
  );
}
