 import React, { useState } from 'react';
import {
  Shield,
  Camera,
  Search,
  Users,
  Lock,
  AlertTriangle,
  CheckCircle,
  UserCheck,
  Settings,
  Flag,
  FileText,
  MapPin,
  Clock,
  User
} from 'lucide-react';

const SafeGuardApp = () => {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [isVerified, setIsVerified] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const screens = {
    home: (
      <HomeScreen
        onNavigate={setCurrentScreen}
        isVerified={isVerified}
        darkMode={darkMode}
      />
    ),
    verify: (
      <VerificationScreen
        onNavigate={setCurrentScreen}
        onVerify={setIsVerified}
        darkMode={darkMode}
      />
    ),
    check: (
      <CheckPersonScreen
        onNavigate={setCurrentScreen}
        darkMode={darkMode}
      />
    ),
    report: (
      <ReportScreen
        onNavigate={setCurrentScreen}
        darkMode={darkMode}
      />
    ),
    results: (
      <ResultsScreen
        onNavigate={setCurrentScreen}
        darkMode={darkMode}
      />
    ),
    settings: (
      <SettingsScreen
        onNavigate={setCurrentScreen}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
    )
  };

  const bgClass = darkMode
    ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
    : 'bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900';

  return (
    <div className={`min-h-screen ${bgClass}`}>
      <div
        className={`container mx-auto max-w-md min-h-screen ${
          darkMode ? 'bg-gray-800 text-white' : 'bg-white shadow-2xl'
        }`}
      >
        {screens[currentScreen]}
      </div>
    </div>
  );
};

const HomeScreen = ({ onNavigate, isVerified, darkMode }) => (
  <div
    className={`p-6 min-h-screen ${
      darkMode ? 'bg-gray-800' : 'bg-gradient-to-b from-purple-50 to-white'
    }`}
  >
    <div className="text-center mb-8 pt-8">
      <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
        <Shield className="w-10 h-10 text-white" />
      </div>
      <h1
        className={`text-3xl font-bold ${
          darkMode ? 'text-white' : 'text-gray-800'
        } mb-2`}
      >
        SafeGuard
      </h1>
      <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
        Your safety, our priority
      </p>
    </div>

    <div
      className={`p-4 rounded-lg mb-6 ${
        isVerified
          ? 'bg-green-50 border border-green-200'
          : 'bg-orange-50 border border-orange-200'
      } ${darkMode ? 'bg-opacity-20' : ''}`}
    >
      <div className="flex items-center">
        {isVerified ? (
          <>
            <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
            <span className="text-green-800 font-medium">
              Verified Member
            </span>
          </>
        ) : (
          <>
            <AlertTriangle className="w-5 h-5 text-orange-600 mr-2" />
            <span className="text-orange-800 font-medium">
              Verification Required
            </span>
          </>
        )}
      </div>
    </div>

    <div className="space-y-4">
      {!isVerified && (
        <button
          onClick={() => onNavigate('verify')}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-lg flex items-center shadow-lg hover:shadow-xl transition-all"
        >
          <UserCheck className="w-6 h-6 mr-3" />
          <div className="text-left">
            <div className="font-semibold">Verify Identity</div>
            <div className="text-sm opacity-90">
              Secure your account with ID verification
            </div>
          </div>
        </button>
      )}

      <button
        onClick={() => isVerified && onNavigate('check')}
        disabled={!isVerified}
        className={`w-full p-4 rounded-lg flex items-center shadow-lg transition-all ${
          isVerified
            ? 'bg-gradient-to-r from-blue-500 to-teal-500 text-white hover:shadow-xl'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        }`}
      >
        <Search className="w-6 h-6 mr-3" />
        <div className="text-left">
          <div className="font-semibold">Check Someone</div>
          <div className="text-sm opacity-90">Search for safety reports</div>
        </div>
      </button>

      <button
        onClick={() => isVerified && onNavigate('report')}
        disabled={!isVerified}
        className={`w-full p-4 rounded-lg flex items-center shadow-lg transition-all ${
          isVerified
            ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white hover:shadow-xl'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        }`}
      >
        <AlertTriangle className="w-6 h-6 mr-3" />
        <div className="text-left">
          <div className="font-semibold">Report Experience</div>
          <div className="text-sm opacity-90">
            Share anonymously to help others
          </div>
        </div>
      </button>
    </div>

    <div
      className={`mt-8 rounded-lg p-4 shadow-lg ${
        darkMode ? 'bg-gray-700' : 'bg-white'
      }`}
    >
      <h3
        className={`font-semibold ${
          darkMode ? 'text-white' : 'text-gray-800'
        } mb-3`}
      >
        Community Impact
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">12.4K</div>
          <div
            className={`text-sm ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            Verified Users
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">3.2K</div>
          <div
            className={`text-sm ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            Safety Checks
          </div>
        </div>
      </div>
    </div>

    <div
      className={`mt-6 p-4 rounded-lg border ${
        darkMode ? 'bg-gray-700 border-gray-600' : 'bg-blue-50 border-blue-200'
      }`}
    >
      <div className="flex items-start">
        <Lock className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />
        <div
          className={`text-sm ${
            darkMode ? 'text-blue-300' : 'text-blue-800'
          }`}
        >
          Privacy First: All data is encrypted and anonymous. Your identity is
          never shared with others.
        </div>
      </div>
    </div>

    <div className="mt-6 text-center">
      <button
        onClick={() => onNavigate('settings')}
        className="text-gray-500 hover:text-gray-700"
      >
        <Settings className="w-6 h-6 mx-auto" />
        <span className="text-sm">Settings</span>
      </button>
    </div>
  </div>
);

const VerificationScreen = ({ onNavigate, onVerify, darkMode }) => {
  const [step, setStep] = useState(1);
  const [idUploaded, setIdUploaded] = useState(false);
  const [selfieUploaded, setSelfieUploaded] = useState(false);

  const handleSubmit = () => {
    if (idUploaded && selfieUploaded) {
      onVerify(true);
      onNavigate('home');
    }
  };

  return (
    <div
      className={`p-6 min-h-screen ${
        darkMode ? 'bg-gray-800' : 'bg-gradient-to-b from-purple-50 to-white'
      }`}
    >
      <div className="mb-6">
        <button
          onClick={() => onNavigate('home')}
          className={
            darkMode
              ? 'text-purple-400 hover:text-purple-300'
              : 'text-purple-600 hover:text-purple-800'
          }
        >
          ← Back
        </button>
        <h2
          className={`text-2xl font-bold mt-2 ${
            darkMode ? 'text-white' : 'text-gray-800'
          }`}
        >
          Identity Verification
        </h2>
        <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
          This ensures our community stays safe and authentic
        </p>
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
            Step {step} of 3
          </span>
          <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
            {Math.round((step / 3) * 100)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-purple-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      </div>

      {step === 1 && (
        <div className="space-y-6">
          <div className="text-center">
            <Camera className="w-16 h-16 text-purple-500 mx-auto mb-4" />
            <h3
              className={`text-xl font-semibold mb-2 ${
                darkMode ? 'text-white' : ''
              }`}
            >
              Upload ID Document
            </h3>
            <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
              We need to verify you're a real person. Your ID will be deleted
              after verification.
            </p>
          </div>

          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center ${
              darkMode ? 'border-gray-600' : 'border-purple-300'
            }`}
          >
            {idUploaded ? (
              <div className="text-green-600">
                <CheckCircle className="w-12 h-12 mx-auto mb-2" />
                <p>ID Document Uploaded</p>
              </div>
            ) : (
              <>
                <Camera className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p
                  className={`mb-4 ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  Take a photo of your ID
                </p>
                <button
                  onClick={() => setIdUploaded(true)}
                  className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600"
                >
                  Take Photo
                </button>
              </>
            )}
          </div>

          {idUploaded && (
            <button
              onClick={() => setStep(2)}
              className="w-full bg-purple-500 text-white p-3 rounded-lg hover:bg-purple-600"
            >
              Continue
            </button>
          )}
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <div className="text-center">
            <Users className="w-16 h-16 text-purple-500 mx-auto mb-4" />
            <h3
              className={`text-xl font-semibold mb-2 ${
                darkMode ? 'text-white' : ''
              }`}
            >
              Take a Selfie
            </h3>
            <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
              Hold your ID next to your face so we can verify it's really you.
            </p>
          </div>

          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center ${
              darkMode ? 'border-gray-600' : 'border-purple-300'
            }`}
          >
            {selfieUploaded ? (
              <div className="text-green-600">
                <CheckCircle className="w-12 h-12 mx-auto mb-2" />
                <p>Selfie Uploaded</p>
              </div>
            ) : (
              <>
                <Camera className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p
                  className={`mb-4 ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  Take a selfie with your ID
                </p>
                <button
                  onClick={() => setSelfieUploaded(true)}
                  className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600"
                >
                  Take Selfie
                </button>
              </>
            )}
          </div>

          {selfieUploaded && (
            <button
              onClick={() => setStep(3)}
              className="w-full bg-purple-500 text-white p-3 rounded-lg hover:bg-purple-600"
            >
              Continue
            </button>
          )}
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6">
          <div className="text-center">
            <Shield className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3
              className={`text-xl font-semibold mb-2 ${
                darkMode ? 'text-white' : ''
              }`}
            >
              Review & Submit
            </h3>
            <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
              Your verification will be processed within 24 hours.
            </p>
          </div>

          <div
            className={`rounded-lg p-4 space-y-3 ${
              darkMode ? 'bg-gray-700' : 'bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span>ID Document</span>
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
            <div className="flex items-center justify-between">
              <span>Selfie with ID</span>
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
          </div>

          <div
            className={`rounded-lg p-4 border ${
              darkMode ? 'bg-gray-700 border-gray-600' : 'bg-blue-50 border-blue-200'
            }`}
          >
            <h4
              className={`font-semibold mb-2 ${
                darkMode ? 'text-blue-300' : 'text-blue-800'
              }`}
            >
              Privacy Promise
            </h4>
            <ul
              className={`text-sm space-y-1 ${
                darkMode ? 'text-blue-200' : 'text-blue-700'
              }`}
            >
              <li>• Your ID will be deleted after verification</li>
              <li>• Your personal data is never shared</li>
              <li>• All reports remain completely anonymous</li>
            </ul>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600"
          >
            Submit for Verification
          </button>
        </div>
      )}
    </div>
  );
};

const CheckPersonScreen = ({ onNavigate, darkMode }) => {
  const [photoUploaded, setPhotoUploaded] = useState(false);

  const handleCheck = () => {
    if (photoUploaded) {
      onNavigate('results');
    }
  };

  return (
    <div
      className={`p-6 min-h-screen ${
        darkMode ? 'bg-gray-800' : 'bg-gradient-to-b from-blue-50 to-white'
      }`}
    >
      <div className="mb-6">
        <button
          onClick={() => onNavigate('home')}
          className={
            darkMode
              ? 'text-blue-400 hover:text-blue-300'
              : 'text-blue-600 hover:text-blue-800'
          }
        >
          ← Back
        </button>
        <h2
          className={`text-2xl font-bold mt-2 ${
            darkMode ? 'text-white' : 'text-gray-800'
          }`}
        >
          Check Someone
        </h2>
        <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
          Upload a photo to check for safety reports
        </p>
      </div>

      <div className="space-y-6">
        <div
          className={`rounded-lg p-4 border ${
            darkMode ? 'bg-gray-700 border-gray-600' : 'bg-yellow-50 border-yellow-200'
          }`}
        >
          <div className="flex items-start">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2 mt-0.5" />
            <div className={darkMode ? 'text-yellow-300' : 'text-yellow-800'}>
              <strong>Important:</strong> Only upload photos with clear consent.
              This feature is for safety verification only.
            </div>
          </div>
        </div>

        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center ${
            darkMode ? 'border-gray-600' : 'border-blue-300'
          }`}
        >
          {photoUploaded ? (
            <div className="text-green-600">
              <CheckCircle className="w-12 h-12 mx-auto mb-2" />
              <p>Photo Uploaded</p>
              <p
                className={`text-sm mt-2 ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                Ready to check
              </p>
            </div>
          ) : (
            <>
              <Camera className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p
                className={`mb-4 ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                Upload a clear photo
              </p>
              <button
                onClick={() => setPhotoUploaded(true)}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
              >
                Choose Photo
              </button>
            </>
          )}
        </div>

        {photoUploaded && (
          <button
            onClick={handleCheck}
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
          >
            Check for Reports
          </button>
        )}
      </div>
    </div>
  );
};

const ReportScreen = ({ onNavigate, darkMode }) => {
  const [incidentType, setIncidentType] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const incidentTypes = [
    'Verbal Harassment',
    'Physical Harassment',
    'Stalking',
    'Threat',
    'Online Harassment',
    'Inappropriate Behavior',
    'Other'
  ];

  const handleSubmit = () => {
    setIsSubmitted(true);
    setTimeout(() => onNavigate('home'), 3000);
  };

  if (isSubmitted) {
    return (
      <div
        className={`p-6 min-h-screen flex flex-col items-center justify-center ${
          darkMode ? 'bg-gray-800' : 'bg-green-50'
        }`}
      >
        <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
        <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : ''}`}>
          Report Submitted
        </h2>
        <p className={`text-center mb-6 ${darkMode ? 'text-gray-300' : ''}`}>
          Thank you for making our community safer.
          Your report will be reviewed by our team.
        </p>
        <button
          onClick={() => onNavigate('home')}
          className="w-full bg-green-500 text-white py-3 rounded-lg"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div
      className={`p-6 min-h-screen ${
        darkMode ? 'bg-gray-800' : 'bg-gradient-to-b from-red-50 to-white'
      }`}
    >
      <div className="mb-6">
        <button
          onClick={() => onNavigate('home')}
          className={
            darkMode
              ? 'text-red-400 hover:text-red-300'
              : 'text-red-600 hover:text-red-800'
          }
        >
          ← Back
        </button>
        <h2
          className={`text-2xl font-bold mt-2 ${
            darkMode ? 'text-white' : 'text-gray-800'
          }`}
        >
          Report Incident
        </h2>
        <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
          Your information is confidential and helps others stay safe
        </p>
      </div>

      <div className="space-y-4">
        <div
          className={`rounded-lg p-4 border ${
            darkMode ? 'bg-gray-700 border-gray-600' : 'bg-red-50 border-red-200