'use client';

import { useEffect, useRef, useState } from 'react';
import { track } from '@vercel/analytics';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Plus, Minus, Phone, Mail, Award, Check } from 'lucide-react';
import { detectTrafficSource } from '@/lib/trafficDetector';
import { emailAcknowledged } from '@/lib/enquiryDelivery';

export default function EnquiryPage() {
  const [formData, setFormData] = useState({
    destination: 'Vietnam Tours (All Regions)',
    travelMonth: 'Any month',
    travelYear: 'Any year',
    adults: 2,
    teens: 0,
    children: 0,
    budgetPerPerson: '',
    firstName: '',
    lastName: '',
    phoneCode: '+44',
    phone: '',
    email: '',
    availableTime: 'Any time',
    notes: '',
  });

  const submissionId = useRef('');
  const formStarted = useRef(false);
  const [interest, setInterest] = useState('');
  useEffect(() => {
    submissionId.current = crypto.randomUUID();
    setInterest((new URLSearchParams(window.location.search).get('interest') || '').slice(0, 300));
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState('');
  const [errors, setErrors] = useState({ firstName: '', lastName: '', email: '', phone: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCounterChange = (type: 'adults' | 'teens' | 'children', action: 'inc' | 'dec') => {
    const val = formData[type];
    if (action === 'dec' && val === 0) return;
    if (action === 'dec' && type === 'adults' && val === 1) return; // At least 1 adult
    setFormData({
      ...formData,
      [type]: action === 'inc' ? val + 1 : val - 1,
    });
  };

  const validateForm = () => {
    const newErrors = { firstName: '', lastName: '', email: '', phone: '' };
    let isValid = true;

    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'A valid email is required';
      isValid = false;
    }
    if (formData.phone.trim() && formData.phone.replace(/\D/g, '').length < 7) {
      newErrors.phone = 'Enter at least 7 digits, or leave this field blank';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      // Scroll to the first error
      window.scrollTo({ top: 400, behavior: 'smooth' });
      return;
    }

    setIsLoading(true);
    setServerError('');

    try {
      const urlParams = new URLSearchParams(window.location.search);
      let ref = '';
      let land = '';
      let utmSrc = '';
      let utmMed = '';
      let utmCam = '';

      try {
        ref = sessionStorage.getItem('vpt_initial_referrer') || '';
        land = sessionStorage.getItem('vpt_landing_page') || '';
        utmSrc = sessionStorage.getItem('vpt_utm_source') || '';
        utmMed = sessionStorage.getItem('vpt_utm_medium') || '';
        utmCam = sessionStorage.getItem('vpt_utm_campaign') || '';
      } catch {}

      if (!ref) ref = document.referrer || '';
      if (!land) land = window.location.pathname || '/enquire';
      if (!utmSrc) utmSrc = urlParams.get('utm_source') || '';
      if (!utmMed) utmMed = urlParams.get('utm_medium') || '';
      if (!utmCam) utmCam = urlParams.get('utm_campaign') || '';
      const attribution = detectTrafficSource(ref, utmSrc, formData.notes, land, utmMed);
      const displayName = `${formData.firstName} ${formData.lastName}`.trim() || formData.email.trim();
      const formattedPhone = formData.phone.trim() ? `${formData.phoneCode} ${formData.phone.trim()}` : '';
      const leadReference = `enquiry-${submissionId.current || (submissionId.current = crypto.randomUUID())}`;

      const response = await fetch('https://formsubmit.co/ajax/mywaytravelinc@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: displayName,
          email: formData.email.trim(),
          phone: formattedPhone,
          destination: formData.destination,
          travelMonth: formData.travelMonth,
          travelYear: formData.travelYear,
          travellers: `${formData.adults} adults, ${formData.teens} teens, ${formData.children} children`,
          budgetPerPerson: formData.budgetPerPerson,
          availableTime: formData.availableTime,
          interest,
          notes: formData.notes,
          source: attribution.source,
          channel: attribution.channel,
          aiTraffic: attribution.isAi ? 'YES' : 'No',
          sourceEvidence: attribution.evidence,
          sourceSignals: attribution.signals.join('; '),
          contentHints: attribution.contentHints.join('; '),
          landingPage: land,
          referrer: ref,
          utmSource: utmSrc,
          utmMedium: utmMed,
          utmCampaign: utmCam,
          leadReference,
          _subject: `New Tailor-Made Enquiry from ${displayName}`,
          _template: 'table',
        }),
      });

      const receipt: { success?: boolean | string; message?: string } | null = await response.json().catch(() => null);
      if (!emailAcknowledged(response.ok, receipt)) {
        throw new Error(receipt?.message || 'An error occurred during submission. Please try again.');
      }

      track('lead_accepted', {
        form: 'enquiry',
        channel: attribution.channel,
        ai_source: attribution.isAi,
        evidence: attribution.evidence,
      });
      if (typeof window !== 'undefined' && typeof (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag === 'function') {
        (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('event', 'conversion', {
          send_to: 'AW-414204624/ZL87CM30hq0dENCFwcUB',
        });
      }
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error: unknown) {
      setServerError(error instanceof Error ? error.message : 'An error occurred during submission. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const destinationOptions = [
    'Vietnam Tours (All Regions)',
    'Hanoi & The North (Sapa, Ha Long Bay)',
    'Central Heritage (Hoi An, Hue, Phong Nha)',
    'Mekong Delta & Southern Pulse',
    'Luxury Beach Escape (Phu Quoc, Nha Trang)',
    'Indochina Multi-country Journey',
  ];

  const budgetOptions = [
    '£3,000 - £5,000 per person',
    '£5,000 - £8,000 per person',
    '£8,000 - £12,000 per person',
    '£12,000+ per person',
  ];

  return (
    <>
      <Navbar />

      <main className="min-h-screen pt-36 pb-24 bg-paper text-ink">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          {/* Header */}
          <div className="mb-12 space-y-4">
            <span className="text-xs uppercase tracking-[0.30em] font-bold text-gold block">
              Bespoke Trip Designer
            </span>
            <h1 className="font-serif text-4xl md:text-5xl text-[#0e1628] font-light tracking-wide">
              Create Your Tailor-Made Journey
            </h1>
            <p className="text-sm text-ink-soft max-w-2xl font-light leading-relaxed">
              Tell us your travel ideas and preferences. Our luxury travel specialists will craft a bespoke itinerary tailored exclusively for you.
            </p>
          </div>

          {interest && !submitted && <p className="mb-6 border border-line bg-white p-4 text-sm text-ink">Planning enquiry: {interest}</p>}
          {!submitted ? (
            <form onFocus={() => {
              if (!formStarted.current) { formStarted.current = true; track('form_start', { form: 'enquiry' }); }
            }} onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
              
              {/* Left Side: Form Fields (Takes 2 columns) */}
              <div className="lg:col-span-2 space-y-8">
                
                {/* Server Error Banner */}
                {serverError && (
                  <div role="alert" aria-live="polite" className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm font-medium">
                    {serverError}
                  </div>
                )}

                {/* Section 1: Travel Plan */}
                <div className="bg-white border border-line p-6 sm:p-8 shadow-xs space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* Destination Selection */}
                    <div className="space-y-2">
                      <label className="font-sans text-sm font-semibold text-[#0e1628] block">
                        Where would you like to go?
                      </label>
                      <div className="relative">
                        <select
                          name="destination"
                          value={formData.destination}
                          onChange={handleInputChange}
                          className="w-full bg-[#f3f4f6]/60 border border-gray-300 px-4 py-3.5 text-sm focus:outline-none focus:border-[#0e1628] focus:bg-white rounded-none appearance-none cursor-pointer"
                        >
                          {destinationOptions.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                          <svg className="fill-current h-4 w-4" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                      </div>
                    </div>

                    {/* Guests Counters */}
                    <div className="space-y-2">
                      <label className="font-sans text-sm font-semibold text-[#0e1628] block">
                        Guests
                      </label>
                      
                      <div className="grid grid-cols-3 gap-2">
                        {/* Adults */}
                        <div className="flex flex-col items-center p-2 bg-[#f3f4f6]/40 border border-gray-200">
                          <span className="text-[10px] font-bold text-gray-500 uppercase">Adults</span>
                          <span className="text-[9px] text-gray-400 mb-1">(18+)</span>
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() => handleCounterChange('adults', 'dec')}
                              className="w-6 h-6 rounded-full bg-white border border-gray-300 flex items-center justify-center text-gray-600 hover:border-gold hover:text-gold transition-colors"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="text-sm font-bold text-[#0e1628] w-4 text-center">{formData.adults}</span>
                            <button
                              type="button"
                              onClick={() => handleCounterChange('adults', 'inc')}
                              className="w-6 h-6 rounded-full bg-white border border-gray-300 flex items-center justify-center text-gray-600 hover:border-gold hover:text-gold transition-colors"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Teens */}
                        <div className="flex flex-col items-center p-2 bg-[#f3f4f6]/40 border border-gray-200">
                          <span className="text-[10px] font-bold text-gray-500 uppercase">Teens</span>
                          <span className="text-[9px] text-gray-400 mb-1">(13-17)</span>
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() => handleCounterChange('teens', 'dec')}
                              className="w-6 h-6 rounded-full bg-white border border-gray-300 flex items-center justify-center text-gray-600 hover:border-gold hover:text-gold transition-colors"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="text-sm font-bold text-[#0e1628] w-4 text-center">{formData.teens}</span>
                            <button
                              type="button"
                              onClick={() => handleCounterChange('teens', 'inc')}
                              className="w-6 h-6 rounded-full bg-white border border-gray-300 flex items-center justify-center text-gray-600 hover:border-gold hover:text-gold transition-colors"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Children */}
                        <div className="flex flex-col items-center p-2 bg-[#f3f4f6]/40 border border-gray-200">
                          <span className="text-[10px] font-bold text-gray-500 uppercase">Children</span>
                          <span className="text-[9px] text-gray-400 mb-1">(0-12)</span>
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() => handleCounterChange('children', 'dec')}
                              className="w-6 h-6 rounded-full bg-white border border-gray-300 flex items-center justify-center text-gray-600 hover:border-gold hover:text-gold transition-colors"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="text-sm font-bold text-[#0e1628] w-4 text-center">{formData.children}</span>
                            <button
                              type="button"
                              onClick={() => handleCounterChange('children', 'inc')}
                              className="w-6 h-6 rounded-full bg-white border border-gray-300 flex items-center justify-center text-gray-600 hover:border-gold hover:text-gold transition-colors"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Travel Dates */}
                    <div className="space-y-2">
                      <label className="font-sans text-sm font-semibold text-[#0e1628] block">
                        When would you like to go?
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="relative">
                          <select
                            name="travelMonth"
                            value={formData.travelMonth}
                            onChange={handleInputChange}
                            className="w-full bg-[#f3f4f6]/60 border border-gray-300 px-4 py-3.5 text-sm focus:outline-none focus:border-[#0e1628] focus:bg-white rounded-none appearance-none cursor-pointer"
                          >
                            <option value="Any month">Any month</option>
                            <option value="January">January</option>
                            <option value="February">February</option>
                            <option value="March">March</option>
                            <option value="April">April</option>
                            <option value="May">May</option>
                            <option value="June">June</option>
                            <option value="July">July</option>
                            <option value="August">August</option>
                            <option value="September">September</option>
                            <option value="October">October</option>
                            <option value="November">November</option>
                            <option value="December">December</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                            <svg className="fill-current h-4 w-4" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                          </div>
                        </div>
                        <div className="relative">
                          <select
                            name="travelYear"
                            value={formData.travelYear}
                            onChange={handleInputChange}
                            className="w-full bg-[#f3f4f6]/60 border border-gray-300 px-4 py-3.5 text-sm focus:outline-none focus:border-[#0e1628] focus:bg-white rounded-none appearance-none cursor-pointer"
                          >
                            <option value="Any year">Any year</option>
                            <option value="2026">2026</option>
                            <option value="2027">2027</option>
                            <option value="2028">2028</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                            <svg className="fill-current h-4 w-4" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Budget Selection */}
                    <div className="space-y-2">
                      <label className="font-sans text-sm font-semibold text-[#0e1628] block">
                        How much are you looking to spend? *
                      </label>
                      <div className="relative">
                        <select
                          name="budgetPerPerson"
                          value={formData.budgetPerPerson}
                          onChange={handleInputChange}
                          className="w-full bg-[#f3f4f6]/60 border border-gray-300 px-4 py-3.5 text-sm focus:outline-none focus:border-[#0e1628] focus:bg-white rounded-none appearance-none cursor-pointer"
                          required
                        >
                          <option value="">Select your budget *</option>
                          {budgetOptions.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                          <svg className="fill-current h-4 w-4" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 2: Contact Details */}
                <div className="space-y-4">
                  <h3 className="font-serif text-2xl text-[#0e1628] font-light tracking-wide">
                    Your Details
                  </h3>
                  <p className="text-sm text-ink-soft">A valid email is enough to get started. Your name and phone number are optional.</p>
                  
                  <div className="bg-white border border-line p-6 sm:p-8 shadow-xs space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* First Name */}
                      <div className="space-y-1">
                        <input
                          type="text"
                          name="firstName"
                          autoComplete="given-name"
                          aria-label="First name, optional"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          placeholder="First name (optional)"
                          className={`w-full bg-[#f3f4f6]/20 border px-4 py-3 text-sm focus:outline-none focus:border-[#0e1628] focus:bg-white rounded-none transition-all ${
                            errors.firstName ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.firstName && <span className="text-red-500 text-xs">{errors.firstName}</span>}
                      </div>

                      {/* Last Name */}
                      <div className="space-y-1">
                        <input
                          type="text"
                          name="lastName"
                          autoComplete="family-name"
                          aria-label="Last name, optional"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          placeholder="Last name (optional)"
                          className={`w-full bg-[#f3f4f6]/20 border px-4 py-3 text-sm focus:outline-none focus:border-[#0e1628] focus:bg-white rounded-none transition-all ${
                            errors.lastName ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.lastName && <span className="text-red-500 text-xs">{errors.lastName}</span>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Phone Code + Number */}
                      <div className="space-y-1">
                        <div className="flex gap-2">
                          <select
                            name="phoneCode"
                            value={formData.phoneCode}
                            onChange={handleInputChange}
                            className="bg-[#f3f4f6]/60 border border-gray-300 px-3 py-3 text-sm focus:outline-none focus:border-[#0e1628] rounded-none cursor-pointer w-20 shrink-0"
                          >
                            <option value="+44">+44</option>
                            <option value="+1">+1</option>
                            <option value="+61">+61</option>
                            <option value="+84">+84</option>
                          </select>
                          <input
                            type="tel"
                            name="phone"
                            autoComplete="tel-national"
                            aria-label="Phone number, optional"
                            aria-invalid={Boolean(errors.phone)}
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="Phone number (optional)"
                            className={`w-full bg-[#f3f4f6]/20 border px-4 py-3 text-sm focus:outline-none focus:border-[#0e1628] focus:bg-white rounded-none transition-all ${
                              errors.phone ? 'border-red-500' : 'border-gray-300'
                            }`}
                          />
                        </div>
                        {errors.phone && <span className="text-red-500 text-xs">{errors.phone}</span>}
                      </div>

                      {/* Email */}
                      <div className="space-y-1">
                        <input
                          type="email"
                          name="email"
                          autoComplete="email"
                          aria-label="Email address"
                          aria-invalid={Boolean(errors.email)}
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Email address *"
                          className={`w-full bg-[#f3f4f6]/20 border px-4 py-3 text-sm focus:outline-none focus:border-[#0e1628] focus:bg-white rounded-none transition-all ${
                            errors.email ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
                      </div>
                    </div>

                    {/* Contact Availability */}
                    <div className="space-y-2">
                      <label className="font-sans text-sm font-semibold text-[#0e1628] block">
                        When are you available?
                      </label>
                      <div className="relative">
                        <select
                          name="availableTime"
                          value={formData.availableTime}
                          onChange={handleInputChange}
                          className="w-full bg-[#f3f4f6]/60 border border-gray-300 px-4 py-3.5 text-sm focus:outline-none focus:border-[#0e1628] focus:bg-white rounded-none appearance-none cursor-pointer"
                        >
                          <option value="Any time">Any time</option>
                          <option value="Morning (9am - 12pm)">Morning (9am - 12pm)</option>
                          <option value="Afternoon (12pm - 5pm)">Afternoon (12pm - 5pm)</option>
                          <option value="Evening (5pm - 8pm)">Evening (5pm - 8pm)</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                          <svg className="fill-current h-4 w-4" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                      </div>
                      <p className="text-[11px] text-ink-soft font-light pt-1">
                        Tell us your preferred contact window and time zone.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Section 3: Notes */}
                <div className="space-y-4">
                  <h3 className="font-serif text-2xl text-[#0e1628] font-light tracking-wide">
                    Tell Us More
                  </h3>
                  
                  <div className="bg-white border border-line p-6 sm:p-8 shadow-xs">
                    <textarea
                      name="notes"
                      rows={5}
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="Share details of your ideal itinerary (preferred hotels, travel pace, specific sites, interests, or special occasions)..."
                      className="w-full bg-[#f3f4f6]/20 border border-gray-300 px-4 py-3.5 text-sm focus:outline-none focus:border-[#0e1628] focus:bg-white rounded-none transition-all"
                    />
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full sm:w-auto px-12 py-4 bg-[#0e1628] text-white hover:bg-gold transition-colors duration-300 font-bold text-xs tracking-widest uppercase rounded-none shadow-md disabled:opacity-50 flex items-center justify-center space-x-2"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>SENDING REQUEST...</span>
                      </>
                    ) : (
                      <span>SUBMIT EXPEDITION ENQUIRY</span>
                    )}
                  </button>
                </div>
              </div>

              {/* Right Side: Sidebar (Takes 1 column) */}
              <div className="space-y-6 lg:sticky lg:top-32">
                
                {/* Can We Help Card */}
                <div className="bg-[#0e1628] text-white p-8 text-center space-y-4 shadow-sm border border-gray-800">
                  <h3 className="font-serif text-2xl font-light tracking-wide">
                    Can We Help?
                  </h3>
                  <p className="text-xs text-gray-300 leading-relaxed font-light">
                    Our team of specialist travel consultants is on hand to design your perfect bespoke Vietnam itinerary.
                  </p>
                  <div className="pt-4 border-t border-gray-800 flex flex-col items-center justify-center gap-2">
                    <div className="flex items-center gap-1.5 text-gold text-xs font-semibold uppercase tracking-wider">
                      <Phone className="w-4 h-4" />
                      <span>Phone & WhatsApp</span>
                    </div>
                    <a href="tel:+84988600388" className="text-xl md:text-2xl font-bold font-sans tracking-wide hover:text-gold transition-colors block">
                      +84 988600388
                    </a>

                    <div className="flex items-center gap-1.5 text-gold text-xs font-semibold uppercase tracking-wider mt-2">
                      <Mail className="w-4 h-4" />
                      <span>Direct Email</span>
                    </div>
                    <a href="mailto:info@vietnamtours.co.uk" className="text-sm font-sans text-gray-200 hover:text-gold transition-colors block underline underline-offset-4">
                      info@vietnamtours.co.uk
                    </a>
                  </div>
                </div>

                <div className="bg-white border border-line p-6 text-center space-y-3 shadow-xs">
                  <h4 className="text-sm font-bold text-ink">A proposal built around your priorities</h4>
                  <p className="text-xs leading-relaxed text-ink-soft">Share your dates, preferred pace and budget. Confirm the itinerary and inclusions before booking.</p>
                </div>

                {/* Trust Badges */}
                <div className="bg-white border border-line p-6 space-y-6 shadow-xs">
                  <h4 className="text-xs uppercase tracking-widest text-[#0e1628] font-bold text-center border-b border-gray-100 pb-3">
                    Personal planning
                  </h4>

                  <div className="flex flex-col items-center justify-center">
                    {/* Condé Nast */}
                    <div className="flex flex-col items-center text-center p-4 border border-gray-100 w-full max-w-xs h-28 justify-center">
                      <Award className="w-8 h-8 text-gold mb-2" />
                      <span className="text-[11px] font-bold text-[#0e1628] uppercase tracking-wider leading-none">Tailored proposal</span>
                      <span className="text-[8px] text-ink-soft mt-1.5 uppercase tracking-wider">Personal trip planning</span>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          ) : (
            
            /* Success Screen */
            <div className="max-w-xl mx-auto bg-white border border-line p-8 md:p-12 text-center space-y-6 shadow-sm">
              <div className="w-16 h-16 bg-gold/10 text-gold rounded-full flex items-center justify-center mx-auto border border-gold/20">
                <Check className="w-8 h-8" />
              </div>
              
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-[0.25em] font-bold text-gold block">
                  Enquiry Received
                </span>
                <h2 className="font-serif text-3xl text-[#0e1628] font-light">
                  {formData.firstName.trim() ? `Thank You, ${formData.firstName.trim()}` : 'Thank You'}
                </h2>
                <div className="h-[1px] w-12 bg-gold mx-auto" />
                <p className="text-sm text-ink-soft font-light leading-relaxed">
                  Your request has been received. An email confirmation has been sent, and the travel team will contact you to discuss possible next steps.
                </p>
              </div>

              <div className="pt-6 border-t border-gray-100 space-y-2 text-xs text-ink-soft">
                <p>Enquiry copy dispatched to: <span className="font-medium text-[#0e1628]">{formData.email}</span></p>
                <p>Direct UK Assistance: <span className="font-semibold text-[#0e1628]">+84 988600388</span> · <a href="mailto:info@vietnamtours.co.uk" className="underline text-gold hover:text-gold/80">info@vietnamtours.co.uk</a></p>
              </div>

              <div className="pt-6">
                <Link
                  href="/"
                  className="px-8 py-3 bg-[#0e1628] text-white hover:bg-gold transition-colors duration-300 text-xs tracking-widest font-bold uppercase rounded-none inline-block shadow-sm"
                >
                  Return to Homepage
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
