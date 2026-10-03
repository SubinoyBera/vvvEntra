import React, { useState } from 'react';
import { useApp, formatMemberSince, getInitials } from '../context/AppContext';
import { 
  Camera, 
  Check, 
  MapPin, 
  Edit3, 
  Eye, 
  ShieldCheck, 
  Linkedin, 
  Sparkles, 
  TrendingUp, 
  Award, 
  FileText, 
  Briefcase,
  X
} from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { 
    role, 
    stage, 
    userName, 
    setUserName, 
    joinDate, 
    setActiveRoute, 
    addToast 
  } = useApp();

  const isArchitect = role === 'architect';
  const themeColor = isArchitect ? '#16A34A' : '#E2571B';

  // Profile Information State synced with context
  const [headline, setHeadline] = useState('');
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState(
    'Private equity operator focused on workflow intelligence, high-margin software acquisitions, and modular intellectual property.'
  );
  const [isEditing, setIsEditing] = useState(false);
  const [isPublicView, setIsPublicView] = useState(false);
  const [avatarImage, setAvatarImage] = useState<string | null>(null);

  // Form states during editing
  const [tempName, setTempName] = useState(userName);
  const [tempHeadline, setTempHeadline] = useState(headline);
  const [tempLocation, setTempLocation] = useState(location);
  const [tempBio, setTempBio] = useState(bio);

  const initials = getInitials(userName);
  const memberSinceFormatted = formatMemberSince(joinDate);

  const handleOpenEdit = () => {
    setTempName(userName);
    setTempHeadline(headline);
    setTempLocation(location);
    setTempBio(bio);
    setIsEditing(true);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = tempName.trim() || userName || 'Verified Operator';
    setUserName(finalName);
    setHeadline(tempHeadline.trim());
    setLocation(tempLocation.trim());
    setBio(tempBio.trim());
    setIsEditing(false);
    addToast('Profile updated successfully', 'success');
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setAvatarImage(event.target?.result as string);
        addToast('Profile picture uploaded', 'success');
      };
      reader.readAsDataURL(file);
    }
  };

  // Profile strength calculation
  const strengthPoints = [
    true, // Account created
    true, // LinkedIn verified
    Boolean(headline.trim()),
    Boolean(location.trim()),
    Boolean(avatarImage),
    Boolean(bio.trim() && bio.length > 30),
    false, // Education added
  ];
  const strengthPercentage = Math.round(
    (strengthPoints.filter(Boolean).length / strengthPoints.length) * 100
  );

  return (
    <div className="min-h-screen text-neutral-900 dark:text-white transition-colors duration-300 pb-28">
      
      {/* ======================================================== */}
      {/* 1. TOP HERO GRADIENT BANNER                              */}
      {/* ======================================================== */}
      <div 
        className="w-full h-36 sm:h-44 md:h-52 relative transition-all duration-500 overflow-hidden"
        style={{
          background: isArchitect
            ? 'linear-gradient(135deg, #0A3D1E 0%, #15803D 50%, #16A34A 100%)'
            : 'linear-gradient(135deg, #99320C 0%, #C2410C 45%, #E2571B 100%)'
        }}
      >
        {/* Subtle geometric grid overlay */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/30 via-transparent to-black/40 pointer-events-none" />
      </div>

      {/* ======================================================== */}
      {/* 2. MAIN PROFILE CONTENT WRAPPER                          */}
      {/* ======================================================== */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-20 relative z-20 space-y-6 sm:space-y-8">
        
        {/* ---------------------------------------------------- */}
        {/* PROFILE HEADER CARD                                  */}
        {/* ---------------------------------------------------- */}
        <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-[#FAF8F5] dark:bg-[#0D0B0A] p-5 sm:p-7 shadow-lg transition-colors">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            
            {/* Left: Avatar with Initials + Identity Info */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              
              {/* Circular Avatar with Camera Upload Icon */}
              <div className="relative group shrink-0">
                <div 
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center text-white font-serif font-semibold text-3xl sm:text-4xl shadow-xl border-4 border-[#FAF8F5] dark:border-[#0D0B0A] overflow-hidden select-none"
                  style={{
                    backgroundColor: avatarImage ? 'transparent' : themeColor,
                  }}
                >
                  {avatarImage ? (
                    <img src={avatarImage} alt={userName} className="w-full h-full object-cover" />
                  ) : (
                    <span>{initials}</span>
                  )}
                </div>

                {/* Camera upload badge button */}
                <label 
                  htmlFor="avatar-file-input"
                  className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-white dark:bg-[#1A1816] border border-neutral-300 dark:border-white/20 shadow-md flex items-center justify-center text-neutral-700 dark:text-neutral-200 hover:text-[var(--role)] cursor-pointer transition-all hover:scale-105"
                  title="Upload profile picture"
                >
                  <Camera className="w-4 h-4" />
                  <input 
                    id="avatar-file-input" 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleAvatarChange} 
                  />
                </label>
              </div>

              {/* Name, Verified Badge, Headline, Location */}
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-neutral-900 dark:text-white tracking-tight">
                    {userName || 'Verified Operator'}
                  </h1>

                  {/* Verified Pill Badge */}
                  <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/25">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>Verified</span>
                  </span>
                </div>

                {/* Headline (Click to Edit) */}
                <div 
                  onClick={handleOpenEdit}
                  className="cursor-pointer group flex items-center gap-1.5 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                >
                  <p className="italic font-normal">
                    {headline || 'Add a headline that says what you do'}
                  </p>
                  <Edit3 className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Location */}
                <div 
                  onClick={handleOpenEdit}
                  className="cursor-pointer group flex items-center gap-1 text-xs text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors pt-0.5"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{location || 'Add your location'}</span>
                </div>
              </div>

            </div>

            {/* Right: Action Buttons */}
            <div className="flex items-center gap-3 shrink-0 pt-2 md:pt-0">
              {/* See Public View Button */}
              <button
                type="button"
                onClick={() => setIsPublicView(!isPublicView)}
                className="px-4 py-2 sm:py-2.5 rounded-lg border border-neutral-300 dark:border-white/15 bg-white/70 dark:bg-white/5 hover:bg-neutral-100 dark:hover:bg-white/10 text-xs sm:text-[13px] font-medium text-neutral-800 dark:text-white transition-all cursor-pointer shadow-xs select-none flex items-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{isPublicView ? 'Exit public view' : 'See public view'}</span>
              </button>

              {/* Edit Profile Button (3D styled matching theme) */}
              <button
                type="button"
                onClick={handleOpenEdit}
                className="px-5 py-2 sm:py-2.5 rounded-lg text-xs sm:text-[13px] font-semibold text-white transition-all duration-200 cursor-pointer shadow-md select-none flex items-center gap-1.5 active:translate-y-[1px]"
                style={{
                  backgroundColor: themeColor,
                  boxShadow: isArchitect
                    ? 'inset 0 1px 1px rgba(255,255,255,0.4), 0 3px 0 #0E622B, 0 6px 14px rgba(22,163,74,0.35)'
                    : 'inset 0 1px 1px rgba(255,255,255,0.4), 0 3px 0 #9A3412, 0 6px 14px rgba(234,88,12,0.35)'
                }}
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit profile</span>
              </button>
            </div>

          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* 3. STATISTICS GRID (Proper Month & Year for Member Since) */}
        {/* ---------------------------------------------------- */}
        <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-[#FAF8F5] dark:bg-[#0D0B0A] p-6 sm:p-7 shadow-sm transition-colors">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-y md:divide-y-0 md:divide-x divide-neutral-200 dark:divide-white/10">
            
            {/* Stat 1: Opportunities Unlocked */}
            <div className="pt-2 md:pt-0 pr-4">
              <div className="font-serif text-3xl sm:text-4xl text-neutral-900 dark:text-white font-normal">
                0
              </div>
              <div className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mt-1 font-medium">
                OPPORTUNITIES UNLOCKED
              </div>
            </div>

            {/* Stat 2: Identity Verified */}
            <div className="pt-4 md:pt-0 md:pl-6 pr-4">
              <div className="font-serif text-3xl sm:text-4xl text-neutral-900 dark:text-white font-normal">
                100%
              </div>
              <div className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mt-1 font-medium">
                IDENTITY VERIFIED
              </div>
            </div>

            {/* Stat 3: Avg. Response */}
            <div className="pt-4 md:pt-0 md:pl-6 pr-4">
              <div className="font-serif text-3xl sm:text-4xl text-neutral-900 dark:text-white font-normal">
                &lt; 24h
              </div>
              <div className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mt-1 font-medium">
                AVG. RESPONSE
              </div>
            </div>

            {/* Stat 4: Member Since (Dynamic Month & Year of Joining) */}
            <div className="pt-4 md:pt-0 md:pl-6">
              <div className="font-serif text-3xl sm:text-4xl text-neutral-900 dark:text-white font-normal">
                {memberSinceFormatted}
              </div>
              <div className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mt-1 font-medium">
                MEMBER SINCE
              </div>
            </div>

          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* 4. VERIFICATION BADGES ROW                           */}
        {/* ---------------------------------------------------- */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Badge 1: Identity verified */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-black/10 dark:border-white/10 bg-[#FAF8F5] dark:bg-[#0D0B0A] text-xs font-medium text-neutral-800 dark:text-neutral-200 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Identity verified</span>
          </div>

          {/* Badge 2: LinkedIn confirmed */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-black/10 dark:border-white/10 bg-[#FAF8F5] dark:bg-[#0D0B0A] text-xs font-medium text-neutral-800 dark:text-neutral-200 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>LinkedIn confirmed</span>
          </div>

          {/* Role Indicator Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-black/10 dark:border-white/10 bg-[#FAF8F5] dark:bg-[#0D0B0A] text-xs font-medium shadow-xs">
            <span 
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: themeColor }}
            />
            <span style={{ color: themeColor }}>
              {isArchitect ? 'Architect Tier Clearance' : 'Buyer Tier Clearance'}
            </span>
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* 5. PROFILE STRENGTH CARD                             */}
        {/* ---------------------------------------------------- */}
        <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-[#FAF8F5] dark:bg-[#0D0B0A] p-6 sm:p-7 shadow-sm transition-colors">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm sm:text-base font-medium text-neutral-900 dark:text-white">
              Profile strength
            </h3>
            <span 
              className="font-serif text-base sm:text-lg font-semibold"
              style={{ color: themeColor }}
            >
              {strengthPercentage}%
            </span>
          </div>

          {/* Progress Track */}
          <div className="w-full h-1.5 bg-neutral-200 dark:bg-white/10 rounded-full overflow-hidden mb-3.5">
            <div 
              className="h-full rounded-full transition-all duration-700 ease-out"
              style={{ 
                width: `${Math.max(14, strengthPercentage)}%`,
                backgroundColor: themeColor 
              }}
            />
          </div>

          <p className="text-xs sm:text-[13px] text-neutral-500 dark:text-neutral-400 leading-relaxed font-normal">
            A complete profile earns more trust. Add a photo, headline, about, expertise, experience, and education.
          </p>
        </div>

        {/* ---------------------------------------------------- */}
        {/* 6. ABOUT SECTION / OPERATIONAL THESIS                */}
        {/* ---------------------------------------------------- */}
        <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-[#FAF8F5] dark:bg-[#0D0B0A] p-6 sm:p-7 shadow-sm transition-colors space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg sm:text-xl text-neutral-900 dark:text-white font-normal">
              About &amp; Operational Thesis
            </h3>
            <button
              onClick={handleOpenEdit}
              className="text-xs font-mono font-medium hover:underline flex items-center gap-1 cursor-pointer"
              style={{ color: themeColor }}
            >
              <Edit3 className="w-3 h-3" />
              <span>Edit thesis</span>
            </button>
          </div>

          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal">
            {bio}
          </p>

          <div className="pt-2 flex flex-wrap gap-2">
            {(isArchitect 
              ? ['Full-Stack Systems', 'PostgreSQL / Supabase', 'Turnkey IP Architecture', 'Regulatory Compliance', 'Escrow Clean Code']
              : ['SaaS Acquisition', 'B2B Workflow AI', 'EBITDA Expansion', 'IP Stacking', 'Institutional Escrow']
            ).map((tag) => (
              <span 
                key={tag}
                className="px-3 py-1 rounded-lg text-xs font-mono bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 text-neutral-700 dark:text-neutral-300"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

      </div>

      {/* ======================================================== */}
      {/* 7. EDIT PROFILE MODAL                                    */}
      {/* ======================================================== */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div 
            className="w-full max-w-lg rounded-2xl border border-black/15 dark:border-white/15 bg-[#FAF8F5] dark:bg-[#12100E] p-6 sm:p-7 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-white/10">
              <div>
                <h3 className="font-serif text-xl sm:text-2xl text-neutral-900 dark:text-white font-normal">
                  Edit Profile
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                  Update your public operator identity on vvEntra
                </p>
              </div>
              <button 
                onClick={() => setIsEditing(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Edit Form */}
            <form onSubmit={handleSaveProfile} className="space-y-4 pt-4">
              <div>
                <label className="block text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300 mb-1.5 uppercase">
                  Full Name
                </label>
                <input 
                  type="text"
                  value={tempName}
                  placeholder="e.g. John Doe or Jane Smith"
                  onChange={(e) => setTempName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 dark:border-white/15 bg-white dark:bg-[#070605] text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-1"
                  style={{ outlineColor: themeColor }}
                />
                <p className="text-[11px] text-neutral-500 mt-1 font-mono">
                  Navbar profile button will automatically update to initials ({getInitials(tempName || userName || 'JD')})
                </p>
              </div>

              <div>
                <label className="block text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300 mb-1.5 uppercase">
                  Headline / Role Title
                </label>
                <input 
                  type="text"
                  value={tempHeadline}
                  placeholder="e.g. Managing Partner · AI Infrastructure & SaaS Acquisitions"
                  onChange={(e) => setTempHeadline(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 dark:border-white/15 bg-white dark:bg-[#070605] text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-1"
                  style={{ outlineColor: themeColor }}
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300 mb-1.5 uppercase">
                  Location
                </label>
                <input 
                  type="text"
                  value={tempLocation}
                  placeholder="e.g. San Francisco, CA · London, UK"
                  onChange={(e) => setTempLocation(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 dark:border-white/15 bg-white dark:bg-[#070605] text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-1"
                  style={{ outlineColor: themeColor }}
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300 mb-1.5 uppercase">
                  About &amp; Operational Thesis
                </label>
                <textarea 
                  rows={4}
                  value={tempBio}
                  onChange={(e) => setTempBio(e.target.value)}
                  placeholder="Describe your capital deployment thesis, target industries, or technical expertise..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 dark:border-white/15 bg-white dark:bg-[#070605] text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-1 resize-none"
                  style={{ outlineColor: themeColor }}
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-200 dark:border-white/10">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded-lg text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg text-xs font-semibold text-white cursor-pointer shadow-md transition-all active:translate-y-[1px]"
                  style={{ backgroundColor: themeColor }}
                >
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
