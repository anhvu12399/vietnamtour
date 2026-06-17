'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function EnquiryPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    destinations: [] as string[],
    travelMonth: '',
    duration: '',
    adults: '2',
    children: '0',
    budgetPerPerson: '5000',
    style: '',
    name: '',
    email: '',
    phone: '',
    notes: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState('');
  const [errors, setErrors] = useState({ name: '', email: '', phone: '' });

  const handleDestinationToggle = (dest: string) => {
    if (formData.destinations.includes(dest)) {
      setFormData({
        ...formData,
        destinations: formData.destinations.filter((d) => d !== dest),
      });
    } else {
      setFormData({
        ...formData,
        destinations: [...formData.destinations, dest],
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateStep = () => {
    if (step === 3) {
      const newErrors = { name: '', email: '', phone: '' };
      let isValid = true;

      if (!formData.name.trim()) {
        newErrors.name = 'Name is required';
        isValid = false;
      }
      if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'A valid email is required';
        isValid = false;
      }
      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required';
        isValid = false;
      }

      setErrors(newErrors);
      return isValid;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep()) return;

    setIsLoading(true);
    setServerError('');

    try {
      const response = await fetch('/api/enquire', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitted(true);
      } else {
        setServerError(result.error || 'Failed to submit enquiry. Please try again.');
      }
    } catch (err: any) {
      console.error('Submission error:', err);
      setServerError('An error occurred during submission. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const destinationOptions = ['Hanoi & The North', 'Central Coast (Hoi An/Hue)', 'Mekong Delta & South', 'Phu Quoc Island', 'Not sure yet'];
  const travelStyles = ['Romantic / Honeymoon', 'Family Holiday', 'Culinary & Wine', 'Cultural Expedition', 'Active & Wilderness', 'Pure Relaxation'];

  return (
    <>
      <Navbar />

      <main className="min-h-screen pt-28 pb-20 bg-luxury-slate flex flex-col justify-center">
        <div className="max-w-3xl w-full mx-auto px-6 lg:px-8">
          
          {/* Form Container */}
          <div className="bg-luxury-moss border border-luxury-moss p-8 md:p-12 shadow-2xl animate-fade-in">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Header */}
                <div className="text-center space-y-3">
                  <span className="text-xs uppercase tracking-[0.3em] font-semibold text-luxury-gold">
                    Bespoke Planning
                  </span>
                  <h1 className="font-serif text-3xl md:text-4xl text-luxury-linen font-medium">
                    Start Your Enquiry
                  </h1>
                  <div className="h-[1px] w-12 bg-luxury-gold mx-auto" />
                  <p className="text-xs sm:text-sm text-luxury-linen/60 font-light">
                    Step {step} of 3: {step === 1 && 'Destinations & Styles'} {step === 2 && 'Party Size & Budget'} {step === 3 && 'Contact Details'}
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="relative w-full h-[2px] bg-luxury-slate">
                  <div
                    className="absolute top-0 left-0 h-full bg-luxury-gold transition-all duration-500"
                    style={{ width: `${(step / 3) * 100}%` }}
                  />
                </div>

                {/* Server error banner */}
                {serverError && (
                  <div className="p-4 bg-red-950/50 border border-red-800 text-red-200 text-sm text-center">
                    {serverError}
                  </div>
                )}

                {/* STEP 1: Destinations & Travel Style */}
                {step === 1 && (
                  <div className="space-y-8 animate-fade-in">
                    {/* Destination Selection */}
                    <div className="space-y-4">
                      <label className="font-serif text-base text-luxury-linen font-medium block">
                        Which areas in Vietnam are you interested in?
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {destinationOptions.map((dest) => {
                          const isSelected = formData.destinations.includes(dest);
                          return (
                            <button
                              key={dest}
                              type="button"
                              onClick={() => handleDestinationToggle(dest)}
                              className={`p-3.5 border text-xs tracking-wider uppercase font-medium text-left transition-all duration-200 rounded-none bg-luxury-slate ${
                                isSelected
                                  ? 'border-luxury-gold bg-luxury-gold/10 text-luxury-gold'
                                  : 'border-luxury-moss hover:border-luxury-gold/60 text-luxury-linen/70'
                              }`}
                            >
                              {dest}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Travel Style */}
                    <div className="space-y-4">
                      <label className="font-serif text-base text-luxury-linen font-medium block">
                        What is your preferred style of travel?
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {travelStyles.map((style) => {
                          const isSelected = formData.style === style;
                          return (
                            <button
                              key={style}
                              type="button"
                              onClick={() => setFormData({ ...formData, style })}
                              className={`p-3.5 border text-xs tracking-wider uppercase font-medium text-left transition-all duration-200 rounded-none bg-luxury-slate ${
                                isSelected
                                  ? 'border-luxury-gold bg-luxury-gold/10 text-luxury-gold'
                                  : 'border-luxury-moss hover:border-luxury-gold/60 text-luxury-linen/70'
                              }`}
                            >
                              {style}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 2: Party Size, Budget, and Duration */}
                {step === 2 && (
                  <div className="space-y-8 animate-fade-in">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Adults */}
                      <div className="space-y-2">
                        <label htmlFor="adults" className="text-xs uppercase tracking-wider text-luxury-linen/60 font-semibold block">
                          Number of Adults
                        </label>
                        <select
                          id="adults"
                          name="adults"
                          value={formData.adults}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-luxury-slate bg-luxury-slate text-luxury-linen focus:outline-none focus:border-luxury-gold text-sm rounded-none"
                        >
                          {[1, 2, 3, 4, 5, 6, '7+'].map((num) => (
                            <option key={num} value={num}>
                              {num}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Children */}
                      <div className="space-y-2">
                        <label htmlFor="children" className="text-xs uppercase tracking-wider text-luxury-linen/60 font-semibold block">
                          Number of Children
                        </label>
                        <select
                          id="children"
                          name="children"
                          value={formData.children}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-luxury-slate bg-luxury-slate text-luxury-linen focus:outline-none focus:border-luxury-gold text-sm rounded-none"
                        >
                          {[0, 1, 2, 3, 4, '5+'].map((num) => (
                            <option key={num} value={num}>
                              {num}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Duration */}
                      <div className="space-y-2">
                        <label htmlFor="duration" className="text-xs uppercase tracking-wider text-luxury-linen/60 font-semibold block">
                          Preferred Duration
                        </label>
                        <select
                          id="duration"
                          name="duration"
                          value={formData.duration}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-luxury-slate bg-luxury-slate text-luxury-linen focus:outline-none focus:border-luxury-gold text-sm rounded-none"
                          required
                        >
                          <option value="">Please Select</option>
                          <option value="1-7 Days">1 - 7 Days</option>
                          <option value="8-12 Days">8 - 12 Days</option>
                          <option value="13-16 Days">13 - 16 Days</option>
                          <option value="17+ Days">17+ Days</option>
                        </select>
                      </div>

                      {/* Travel Month */}
                      <div className="space-y-2">
                        <label htmlFor="travelMonth" className="text-xs uppercase tracking-wider text-luxury-linen/60 font-semibold block">
                          When do you plan to travel?
                        </label>
                        <select
                          id="travelMonth"
                          name="travelMonth"
                          value={formData.travelMonth}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-luxury-slate bg-luxury-slate text-luxury-linen focus:outline-none focus:border-luxury-gold text-sm rounded-none"
                          required
                        >
                          <option value="">Please Select</option>
                          <option value="As soon as possible">As soon as possible</option>
                          <option value="Next 3 months">Next 3 months</option>
                          <option value="Next 6 months">Next 6 months</option>
                          <option value="Next year">Next year</option>
                        </select>
                      </div>
                    </div>

                    {/* Budget slider */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <label htmlFor="budgetPerPerson" className="text-xs uppercase tracking-wider text-luxury-linen/60 font-semibold">
                          Budget Per Person (£ GBP)
                        </label>
                        <span className="text-base font-semibold text-luxury-gold">
                          £{parseInt(formData.budgetPerPerson).toLocaleString('en-GB')}+
                        </span>
                      </div>
                      <input
                        id="budgetPerPerson"
                        type="range"
                        name="budgetPerPerson"
                        min="3000"
                        max="15000"
                        step="500"
                        value={formData.budgetPerPerson}
                        onChange={handleInputChange}
                        className="w-full accent-luxury-gold cursor-pointer"
                      />
                      <p className="text-[11px] text-luxury-linen/50 font-light">
                        Note: As a bespoke luxury travel operator, our custom journeys typically start at £3,000 per person, excluding international flights.
                      </p>
                    </div>
                  </div>
                )}

                {/* STEP 3: Contact details & Notes */}
                {step === 3 && (
                  <div className="space-y-6 animate-fade-in">
                    {/* Name */}
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-xs uppercase tracking-wider text-luxury-linen/60 font-semibold block">
                        Full Name *
                      </label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. John Smith"
                        className={`w-full p-3 border text-sm focus:outline-none bg-luxury-slate text-luxury-linen rounded-none ${
                          errors.name ? 'border-red-500 focus:border-red-500' : 'border-luxury-slate focus:border-luxury-gold'
                        }`}
                      />
                      {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Email */}
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-xs uppercase tracking-wider text-luxury-linen/60 font-semibold block">
                          Email Address *
                        </label>
                        <input
                          id="email"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="e.g. john@example.com"
                          className={`w-full p-3 border text-sm focus:outline-none bg-luxury-slate text-luxury-linen rounded-none ${
                            errors.email ? 'border-red-500 focus:border-red-500' : 'border-luxury-slate focus:border-luxury-gold'
                          }`}
                        />
                        {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                      </div>

                      {/* Phone */}
                      <div className="space-y-2">
                        <label htmlFor="phone" className="text-xs uppercase tracking-wider text-luxury-linen/60 font-semibold block">
                          Contact Phone Number *
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="e.g. +44 7911 123456"
                          className={`w-full p-3 border text-sm focus:outline-none bg-luxury-slate text-luxury-linen rounded-none ${
                            errors.phone ? 'border-red-500 focus:border-red-500' : 'border-luxury-slate focus:border-luxury-gold'
                          }`}
                        />
                        {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
                      </div>
                    </div>

                    {/* Notes */}
                    <div className="space-y-2">
                      <label htmlFor="notes" className="text-xs uppercase tracking-wider text-luxury-linen/60 font-semibold block">
                        Tell us about your dream trip (preferred pacing, locations, key experiences)
                      </label>
                      <textarea
                        id="notes"
                        name="notes"
                        rows={4}
                        value={formData.notes}
                        onChange={handleInputChange}
                        placeholder="e.g. We want to celebrate our 10th anniversary. We love fresh local food, private boats, and want a very relaxing pace with lots of spa treatments..."
                        className="w-full p-3 border border-luxury-slate bg-luxury-slate text-luxury-linen rounded-none focus:outline-none focus:border-luxury-gold"
                      />
                    </div>
                  </div>
                )}

                {/* Form Navigation Buttons */}
                <div className="pt-6 border-t border-luxury-slate flex justify-between items-center gap-4">
                  {step > 1 ? (
                    <button
                      type="button"
                      disabled={isLoading}
                      onClick={handleBack}
                      className="px-6 py-2.5 border border-luxury-slate text-luxury-linen/70 font-semibold text-xs tracking-widest uppercase transition-all duration-300 hover:bg-luxury-slate/40 rounded-none disabled:opacity-50"
                    >
                      Back
                    </button>
                  ) : (
                    <div />
                  )}

                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="px-8 py-3 bg-luxury-gold hover:bg-luxury-gold/90 text-luxury-slate font-semibold text-xs tracking-widest uppercase transition-all duration-300 rounded-none shadow-md"
                    >
                      Next Step
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="px-8 py-3 bg-luxury-gold hover:bg-luxury-gold/90 text-luxury-slate font-semibold text-xs tracking-widest uppercase transition-all duration-300 rounded-none shadow-md disabled:opacity-50 flex items-center space-x-2"
                    >
                      {isLoading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-luxury-slate" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <span>Submit Enquiry</span>
                      )}
                    </button>
                  )}
                </div>
              </form>
            ) : (
              /* Success Screen */
              <div className="text-center py-12 space-y-6 animate-fade-in">
                {/* Success Icon */}
                <div className="w-16 h-16 bg-luxury-gold/10 text-luxury-gold rounded-full flex items-center justify-center mx-auto border border-luxury-gold/20">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="space-y-3">
                  <span className="text-xs uppercase tracking-[0.3em] font-semibold text-luxury-gold">
                    Enquiry Received
                  </span>
                  <h2 className="font-serif text-3xl text-luxury-linen font-medium">
                    Thank You, {formData.name.split(' ')[0]}
                  </h2>
                  <div className="h-[1px] w-12 bg-luxury-gold mx-auto" />
                  <p className="text-sm text-luxury-linen/80 font-light max-w-md mx-auto leading-relaxed">
                    Your bespoke travel enquiry has been registered and saved. An automatic confirmation email has been dispatched, and our lead Vietnam Specialist, **Alice Mercer**, will contact you within 24 hours.
                  </p>
                </div>
                <div className="pt-6 space-y-2 text-xs text-luxury-linen/50">
                  <p>A copy of your enquiry details was sent to: <span className="font-medium text-luxury-gold">{formData.email}</span></p>
                  <p>Direct UK assistance: <span className="font-medium text-luxury-gold font-semibold">+44 (0) 20 7845 9200</span></p>
                </div>
                <div className="pt-8">
                  <Link
                    href="/"
                    className="px-8 py-3 bg-luxury-moss hover:bg-luxury-moss/95 text-luxury-gold font-semibold text-xs tracking-widest uppercase transition-all duration-300 rounded-none shadow-md inline-block border border-luxury-gold/20"
                  >
                    Return to Homepage
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
