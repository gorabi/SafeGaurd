import React, { useState } from 'react';
import {
  Shield, Camera, Search, Users, Lock, AlertTriangle,
  CheckCircle, UserCheck, Settings, Flag, FileText, MapPin, Clock
} from 'lucide-react';

/**
 * SafeGuardApp - Single-file main component (split later إذا أحببت)
 * تم تبسيط الشاشات والحفاظ على الوظائف الأساسية
 */

const SafeGuardApp = () => {
  const [currentScreen, setCurrentScreen] = useState('home'); // home, verify, check, report, results, settings
  const [isVerified, setIsVerified] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const screens = {
    home: <HomeScreen onNavigate={setCurrentScreen} isVerified={isVerified} darkMode={darkMode} />,
    verify: <VerificationScreen onNavigate={setCurrentScreen} onVerify={setIsVerified} darkMode={darkMode} />,
    check: <CheckPersonScreen onNavigate={setCurrentScreen} darkMode={darkMode} />,
    report: <ReportScreen onNavigate={setCurrentScreen} darkMode={darkMode} />,
    results: <ResultsScreen onNavigate={setCurrentScreen} darkMode={darkMode} />,
    settings: <SettingsScreen onNavigate={setCurrentScreen} darkMode={darkMode} setDarkMode={setDarkMode} />
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : 'light'}`} style={{ padding: 12 }}>
      <div className="container" style={{ maxWidth: 680 }}>
        {screens[currentScreen]}
      </div>
    </div>
  );
};

/* -------------------- Home -------------------- */
const HomeScreen = ({ onNavigate, isVerified }) => {
  return (
    <div className="card">
      <div className="text-center mb-4">
        <div className="w-20 rounded-full" style={{ background: 'linear-gradient(90deg,#7c3aed,#4f46e5)', display:'inline-flex', alignItems:'center', justifyContent:'center', height:80 }}>
          <Shield style={{ color: 'white' }} />
        </div>
        <h1 className="mb-2" style={{ fontSize: 24, fontWeight: 700 }}>SafeGuard</h1>
        <p className="small">Your safety, our priority</p>
      </div>

      <div style={{ marginTop: 12 }}>
        <div style={{ marginBottom: 12 }}>
          <strong>Status: </strong>
          {isVerified ? (
            <span style={{ color: '#047857' }}><CheckCircle /> Verified Member</span>
          ) : (
            <span style={{ color: '#b45309' }}><AlertTriangle /> Verification Required</span>
          )}
        </div>

        <div className="flex gap-4" style={{ flexWrap: 'wrap' }}>
          {!isVerified && (
            <button className="btn btn-primary" onClick={() => onNavigate('verify')}>
              <UserCheck /> Verify Account
            </button>
          )}

          <button className="btn btn-ghost" onClick={() => onNavigate('check')}>
            <Search /> Check Person
          </button>

          <button
            className="btn"
            onClick={() => onNavigate('report')}
            style={{ background: '#ef4444', color: 'white' }}
          >
            <Flag /> Report Experience
          </button>

          <button className="btn btn-ghost" onClick={() => onNavigate('results')}>
            <FileText /> Results
          </button>

          <button className="btn btn-ghost" onClick={() => onNavigate('settings')}>
            <Settings /> Settings
          </button>
        </div>
      </div>
    </div>
  );
};

/* -------------------- Verification -------------------- */
const VerificationScreen = ({ onNavigate, onVerify }) => {
  const [step, setStep] = useState(1);
  const [selfieUploaded, setSelfieUploaded] = useState(false);
  const [idUploaded, setIdUploaded] = useState(false);

  const submitVerification = () => {
    // هنا تكون نقطة الاتصال للخادم في التطبيق الكامل
    // سأتظاهر بأنها ناجحة
    onVerify(true);
    onNavigate('home');
  };

  return (
    <div className="card">
      <h2 style={{ fontSize: 18, marginBottom: 8 }}>Account Verification</h2>

      {step === 1 && (
        <div>
          <p className="small">Step 1: Upload your ID</p>
          <div style={{ marginTop: 8 }}>
            <button className="btn btn-ghost" onClick={() => setIdUploaded(true)}>
              Upload ID
            </button>
            {idUploaded && <span style={{ marginLeft: 8, color: '#059669' }}>ID Ready</span>}
          </div>

          <div style={{ marginTop: 12 }}>
            <button className="btn btn-primary" onClick={() => setStep(2)}>Continue</button>
            <button className="btn btn-ghost" onClick={() => onNavigate('home')} style={{ marginLeft: 8 }}>Cancel</button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <p className="small">Step 2: Take a selfie</p>
          <div style={{ marginTop: 8 }}>
            <button className="btn btn-ghost" onClick={() => setSelfieUploaded(true)}>
              Take Selfie
            </button>
            {selfieUploaded && <span style={{ marginLeft: 8, color: '#059669' }}>Selfie Ready</span>}
          </div>

          <div style={{ marginTop: 12 }}>
            <button
              className="btn btn-primary"
              onClick={submitVerification}
              disabled={!(selfieUploaded && idUploaded)}
              style={{ opacity: selfieUploaded && idUploaded ? 1 : 0.6 }}
            >
              Finish Verification
            </button>
            <button className="btn btn-ghost" onClick={() => setStep(1)} style={{ marginLeft: 8 }}>Back</button>
          </div>
        </div>
      )}
    </div>
  );
};

/* -------------------- Check Person -------------------- */
const CheckPersonScreen = ({ onNavigate }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);

  const doSearch = () => {
    // محاكاة بحث
    setResults({
      name: query || 'Unknown',
      safetyScore: Math.floor(Math.random() * 100)
    });
  };

  return (
    <div className="card">
      <h2 style={{ fontSize: 18 }}>Check Person</h2>
      <div style={{ marginTop: 8 }}>
        <input
          type="text"
          placeholder="اسم أو تفاصيل"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ width: '100%', padding: 8, borderRadius: 8, border: '1px solid #e5e7eb' }}
        />
        <div style={{ marginTop: 8 }}>
          <button className="btn btn-primary" onClick={doSearch}><Search /> Search</button>
          <button className="btn btn-ghost" onClick={() => onNavigate('home')} style={{ marginLeft: 8 }}>Back</button>
        </div>

        {results && (
          <div style={{ marginTop: 12 }}>
            <div><strong>Name:</strong> {results.name}</div>
            <div><strong>Safety score:</strong> {results.safetyScore}%</div>
          </div>
        )}
      </div>
    </div>
  );
};

/* -------------------- Report -------------------- */
const ReportScreen = ({ onNavigate }) => {
  const [text, setText] = useState('');
  const submit = () => {
    // محاكاة إرسال تقرير - في التطبيق الحقيقي سترسل للخادم
    alert('تم إرسال التقرير — شكراً لمشاركتك (تمت المحاكاة)');
    setText('');
    onNavigate('home');
  };

  return (
    <div className="card">
      <h2 style={{ fontSize: 18 }}>Report Experience</h2>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="اكتب ما حدث (يمكنك البقاء مجهول الهوية)"
        style={{ width: '100%', minHeight: 120, padding: 8, borderRadius: 8, marginTop: 8, border: '1px solid #e5e7eb' }}
      />
      <div style={{ marginTop: 8 }}>
        <button className="btn btn-primary" onClick={submit} disabled={!text.trim()}>
          Submit Report
        </button>
        <button className="btn btn-ghost" onClick={() => onNavigate('home')} style={{ marginLeft: 8 }}>Cancel</button>
      </div>
    </div>
  );
};

/* -------------------- Results -------------------- */
const ResultsScreen = ({ onNavigate }) => {
  return (
    <div className="card">
      <h2 style={{ fontSize: 18 }}>Results</h2>
      <p className="small">لم يتم ربط هذا القسم بعد بقاعدة بيانات حقيقية. يمكن عرض إحصاءات أو تقارير هنا.</p>
      <div style={{ marginTop: 12 }}>
        <button className="btn btn-ghost" onClick={() => onNavigate('home')}>Back</button>
      </div>
    </div>
  );
};

/* -------------------- Settings -------------------- */
const SettingsScreen = ({ onNavigate, darkMode, setDarkMode }) => {
  return (
    <div className="card">
      <h2 style={{ fontSize: 18 }}>Settings</h2>
      <div style={{ marginTop: 12 }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div className="switch">
            <input type="checkbox" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
            <span className="slider" />
          </div>
          <span>Enable Dark Mode</span>
        </label>
      </div>

      <div style={{ marginTop: 12 }}>
        <button className="btn btn-ghost" onClick={() => onNavigate('home')}>Back</button>
      </div>
    </div>
  );
};

export default SafeGuardApp;