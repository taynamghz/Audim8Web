'use client';

import React, { useEffect, useState } from 'react';
import './styles.css';

const profileData = {
  facialAnalysis: {
    ageGroup: ['Child', 'Teen', 'YoungAdult', 'MiddleAged', 'Senior'],
    faceShape: ['Oval', 'Round', 'Square', 'Heart', 'Diamond'],
    symmetryLevel: ['HighSymmetry', 'ModerateSymmetry', 'LowSymmetry'],
    featureProminence: ['HighCheekbones', 'StrongJawline', 'SoftJawline', 'PronouncedBrow'],
    skinTone: ['Fair', 'Medium', 'Olive', 'Brown', 'Dark'],
  },
  emotionRecognition: {
    basicEmotion: ['Happiness', 'Sadness', 'Anger', 'Fear', 'Surprise', 'Disgust', 'Neutral'],
    compoundEmotion: ['Contempt', 'Embarrassment', 'Awe', 'Amusement'],
    intensity: ['Subtle', 'Moderate', 'Intense'],
    temporalPattern: ['Flash', 'Sustained', 'Evolving'],
  },
  voiceProfile: {
    toneType: ['SoftSpoken', 'Commanding', 'Warm', 'Stern', 'Breathless'],
    pitchRange: ['Low', 'Mid', 'High'],
    rhythmPattern: ['Steady', 'Erratic', 'Hesitant', 'Staccato'],
    volumeLevel: ['Whisper', 'Conversational', 'Projected', 'Shouted'],
    timbreQuality: ['Bright', 'Dark', 'Nasal', 'Resonant'],
  },
  visualTags: {
    apparentAgeStyle: ['Youthful', 'Mature', 'Aged'],
    wardrobeTag: ['Casual', 'Formal', 'Period — Historical', 'Futuristic'],
    styling: ['Minimalist', 'Dramatic', 'Bohemian', 'Edgy'],
    grooming: ['Clean‑shaven', 'Beard', 'Stubble', 'NaturalHair', 'StyledHair'],
    accessoryPresence: ['Glasses', 'Hat', 'Jewelry', 'Props'],
  },
  bodyLanguage: {
    postureType: ['Upright', 'Slouched', 'LeaningForward', 'OpenChest'],
    gestureStyle: ['OpenGestures', 'ClosedGestures', 'EmphaticGestures'],
    movementEnergy: ['Energetic', 'Reserved', 'Fluid'],
    spatialUse: ['Centered', 'WideStance', 'ShiftingWeight'],
    eyeContactPattern: ['Direct', 'Averted', 'Flickering', 'Steady'],
  },
};

const formatName = (str: string) => str.replace(/([A-Z])/g, ' $1').replace(/\-/g, ' ').trim();

export default function Demo() {
  const [selectedProfile, setSelectedProfile] = useState<any>({});
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [page, setPage] = useState('profile-builder');
  const [processingProgress, setProcessingProgress] = useState(0);

  useEffect(() => {
    if (page === 'processing') {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setProcessingProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          setPage('analysis-results');
        }
      }, 300);
    }
  }, [page]);

  const handleOptionSelect = (category: string, trait: string, value: string) => {
    setSelectedProfile((prev: any) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [trait]: value,
      },
    }));
  };

  const handleFileUpload = (files: FileList) => {
    setUploadedFiles(Array.from(files));
  };

  const renderProfileBuilder = () => (
    <section className="page">
      <div className="section">
        <h2>Build Your Ideal Profile</h2>
        <div className="categories">
          {Object.entries(profileData).map(([category, traits]) => (
            <div className="category" key={category}>
              <h3>{formatName(category)}</h3>
              {Object.entries(traits).map(([trait, options]) => (
                <div className="trait-group" key={trait}>
                  <h4>{formatName(trait)}</h4>
                  <div className="options">
                    {options.map((option) => (
                      <div
                        key={option}
                        className={`option ${selectedProfile[category]?.[trait] === option ? 'selected' : ''}`}
                        onClick={() => handleOptionSelect(category, trait, option)}
                      >
                        {formatName(option)}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="navigation-buttons">
          <button className="primary-button" onClick={() => setPage('profile-review')}>Save Profile</button>
        </div>
      </div>
    </section>
  );

  const renderProfileReview = () => (
    <section className="page">
      <div className="section">
        <h2>Review Your Ideal Profile</h2>
        <div className="profile-summary">
          {Object.entries(selectedProfile).map(([category, traits]: any) => (
            <div className="summary-category" key={category}>
              <h3>{formatName(category)}</h3>
              {Object.entries(traits).map(([trait, value]) => (
                <div className="summary-trait" key={trait}>
                  <h4>{formatName(trait)}</h4>
                  <div className="summary-value">{formatName(value)}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="navigation-buttons">
          <button className="secondary-button" onClick={() => setPage('profile-builder')}>Edit Profile</button>
          <button className="primary-button" onClick={() => setPage('video-upload')}>Confirm Profile</button>
        </div>
      </div>
    </section>
  );

  const renderVideoUpload = () => (
    <section className="page">
      <div className="section">
        <h2>Upload Audition Videos</h2>
        <div className="upload-area">
          <div className="drop-zone" onClick={() => document.getElementById('fileInput')?.click()}>
            <p>Drag and drop videos here</p>
            <p>or</p>
            <button className="upload-btn">Browse Files</button>
            <input
              type="file"
              id="fileInput"
              multiple
              accept="video/*"
              style={{ display: 'none' }}
              onChange={(e) => handleFileUpload(e.target.files!)}
            />
          </div>
        </div>
        <div className="uploaded-videos">
          {uploadedFiles.map((file, idx) => (
            <div key={idx}>{file.name}</div>
          ))}
        </div>
        <div className="navigation-buttons">
          <button
            className="primary-button"
            disabled={uploadedFiles.length === 0}
            onClick={() => setPage('processing')}
          >
            Start Analysis
          </button>
        </div>
      </div>
    </section>
  );

  const renderProcessing = () => (
    <section className="page">
      <div className="section">
        <h2>Analyzing Videos</h2>
        <div className="processing-content">
          <div className="spinner"></div>
          <p>Processing your videos...</p>
          <div className="progress-container">
            <div className="progress-bar">
              <div className="progress" style={{ width: `${processingProgress}%` }}></div>
            </div>
            <span>{processingProgress}%</span>
          </div>
        </div>
      </div>
    </section>
  );

  const renderResults = () => (
    <section className="page">
      <div className="section">
        <h2>Analysis Results</h2>
        <div className="results-container">
          {/* Results logic */}
        </div>
        <div className="navigation-buttons">
          <button className="secondary-button" onClick={() => {
            setPage('profile-builder');
            setSelectedProfile({});
            setUploadedFiles([]);
            setProcessingProgress(0);
          }}>Start New Analysis</button>
        </div>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-[#0A0F1C] relative overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/videos/background.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#0A0F1C]/80" />
      </div>

      <div className="container relative z-10">
        <header>
          <h1>Audimate</h1>
          <p className="subtitle">Audition Filtering System</p>
        </header>
        <main>
          {page === 'profile-builder' && renderProfileBuilder()}
          {page === 'profile-review' && renderProfileReview()}
          {page === 'video-upload' && renderVideoUpload()}
          {page === 'processing' && renderProcessing()}
          {page === 'analysis-results' && renderResults()}
        </main>
      </div>
    </div>
  );
} 