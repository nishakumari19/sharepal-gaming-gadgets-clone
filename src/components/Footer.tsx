import React, { useState } from 'react';
import { Phone, Mail, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const [isSeoExpanded, setIsSeoExpanded] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050B1B] text-slate-300 text-xs pt-16 pb-24 border-t border-slate-800">
      <div className="max-w-[1520px] mx-auto px-4 lg:px-8 space-y-12">
        {/* Category Links Columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-8">
          {/* Col 1 */}
          <div className="space-y-2.5">
            <h4 className="text-white font-bold text-sm tracking-wide">Action Cameras</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a className="hover:text-white transition" href="#">Action Cameras</a></li>
              <li><a className="hover:text-white transition" href="#">Pocket Cameras</a></li>
              <li><a className="hover:text-white transition" href="#">GoPro Cameras</a></li>
              <li><a className="hover:text-white transition" href="#">DJI Cameras</a></li>
              <li><a className="hover:text-white transition" href="#">DJI Drones</a></li>
              <li><a className="hover:text-white transition" href="#">360 Cameras</a></li>
            </ul>
          </div>

          {/* Col 2 */}
          <div className="space-y-2.5">
            <h4 className="text-white font-bold text-sm tracking-wide">Cameras</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a className="hover:text-white transition" href="#">DSLR Cameras</a></li>
              <li><a className="hover:text-white transition" href="#">Cameras</a></li>
              <li><a className="hover:text-white transition" href="#">iPhones</a></li>
              <li><a className="hover:text-white transition" href="#">DSLR Gimbal Combos</a></li>
              <li><a className="hover:text-white transition" href="#">Wildlife Photography</a></li>
              <li><a className="hover:text-white transition" href="#">Tripods & Accessories</a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-2.5">
            <h4 className="text-white font-bold text-sm tracking-wide">Trekking Gear</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a className="hover:text-white transition" href="#">Trekking Gear</a></li>
              <li><a className="hover:text-white transition" href="#">Trekking Jackets</a></li>
              <li><a className="hover:text-white transition" href="#">Trek/Snow Pants</a></li>
              <li><a className="hover:text-white transition" href="#">Trekking Shoes</a></li>
              <li><a className="hover:text-white transition" href="#">Trek Accessories</a></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="space-y-2.5">
            <h4 className="text-white font-bold text-sm tracking-wide">Riding Gear</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a className="hover:text-white transition" href="#">Riding Gear</a></li>
              <li><a className="hover:text-white transition" href="#">Riding Luggage</a></li>
              <li><a className="hover:text-white transition" href="#">Riding Jackets</a></li>
              <li><a className="hover:text-white transition" href="#">Riding Essentials</a></li>
              <li><a className="hover:text-white transition" href="#">Riding Boots</a></li>
              <li><a className="hover:text-white transition" href="#">Binoculars</a></li>
            </ul>
          </div>

          {/* Col 5 */}
          <div className="space-y-2.5">
            <h4 className="text-white font-bold text-sm tracking-wide">Creator Gear</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a className="hover:text-white transition" href="#">Wireless Mics</a></li>
              <li><a className="hover:text-white transition" href="#">Professional Cameras</a></li>
              <li><a className="hover:text-white transition" href="#">Mirrorless Cameras</a></li>
              <li><a className="hover:text-white transition" href="#">UNLMTD Vlogging</a></li>
              <li><a className="hover:text-white transition" href="#">Mobile Gimbals</a></li>
              <li><a className="hover:text-white transition" href="#">Vlogging Kits</a></li>
            </ul>
          </div>

          {/* Col 6 */}
          <div className="space-y-2.5">
            <h4 className="text-white font-bold text-sm tracking-wide text-purple-400">Gaming Console</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a className="hover:text-white font-semibold text-white transition" href="#">PS5 Console</a></li>
              <li><a className="hover:text-white transition" href="#">VR Headsets</a></li>
              <li><a className="hover:text-white transition" href="#">Racing Wheel</a></li>
              <li><a className="hover:text-white transition" href="#">Big Screen Gaming</a></li>
              <li><a className="hover:text-white transition" href="#">Xbox Console</a></li>
            </ul>
          </div>

          {/* Col 7 */}
          <div className="space-y-2.5">
            <h4 className="text-white font-bold text-sm tracking-wide">Camping Gear</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a className="hover:text-white transition" href="#">Camping Gear</a></li>
              <li><a className="hover:text-white transition" href="#">Camping Stools</a></li>
              <li><a className="hover:text-white transition" href="#">Camping Tents</a></li>
              <li><a className="hover:text-white transition" href="#">Sleeping Bags & Mats</a></li>
            </ul>
          </div>

          {/* Col 8 */}
          <div className="space-y-2.5">
            <h4 className="text-white font-bold text-sm tracking-wide">Audio Visual</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a className="hover:text-white transition" href="#">Projectors</a></li>
              <li><a className="hover:text-white transition" href="#">Meta Quest VR</a></li>
              <li><a className="hover:text-white transition" href="#">Microphones</a></li>
              <li><a className="hover:text-white transition" href="#">JBL Speakers</a></li>
            </ul>
          </div>
        </div>

        {/* SEO Context Description Block */}
        <div className="border-t border-slate-800/80 pt-8 text-slate-400 text-xs space-y-3 leading-relaxed">
          <h5 className="font-bold text-slate-200 uppercase tracking-wider">
            Renting from SharePal in Bangalore
          </h5>
          <p className={isSeoExpanded ? '' : 'line-clamp-3'}>
            Discover the convenience of renting from SharePal, your trusted partner in Bangalore for all your rental needs.
            Whether you're exploring the vibrant streets of Koramangala, setting up a shoot in Indiranagar, hosting a LAN party
            in HSR Layout, or planning a weekend road trip from Whitefield, SharePal has you covered. We offer a wide range of
            products, including PlayStation 5 consoles, Xbox Series X, Meta Quest 3 VR headsets, cameras, action cameras, projectors,
            speakers, trekking gear, riding gear, and creator gear. With free doorstep delivery and pickup services across Bangalore,
            flexible rental tenures, transparent pricing without hidden security deposits, and an easy-to-use booking platform,
            renting has never been easier. Experience the freedom to rent what you need, when you need it, without the commitment of buying.
          </p>
          <button
            type="button"
            onClick={() => setIsSeoExpanded(!isSeoExpanded)}
            className="text-purple-400 font-bold hover:underline flex items-center gap-1 focus:outline-none"
          >
            {isSeoExpanded ? 'Read Less ▴' : 'Read More ▾'}
          </button>
        </div>

        {/* Bottom Columns (Company, Policies, Support) */}
        <div className="border-t border-slate-800/80 pt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          <div>
            <div className="text-lg font-black text-white italic tracking-tight mb-3">
              Share<span className="text-[#00D1FF]">Pal</span>
            </div>
            <ul className="space-y-2 text-slate-400">
              <li><a className="hover:text-white transition" href="#">About Us</a></li>
              <li><a className="hover:text-white transition" href="#">Why SharePal</a></li>
              <li><a className="hover:text-white transition" href="#">Sitemap</a></li>
              <li><a className="hover:text-white transition" href="#">CarePal</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-bold mb-3">Become a Pal</h5>
            <ul className="space-y-2 text-slate-400">
              <li><a className="hover:text-white transition" href="#">SharePal for Creators</a></li>
              <li><a className="hover:text-white transition" href="#">Careers</a></li>
              <li><a className="hover:text-white transition" href="#">SharePal for Brands</a></li>
              <li>
                <a className="hover:text-white flex items-center gap-1.5 transition" href="#">
                  Asset Funding Program <span className="bg-[#B6F500] text-slate-900 text-[9px] font-black px-1 rounded">New</span>
                </a>
              </li>
              <li>
                <a className="hover:text-white flex items-center gap-1.5 transition" href="#">
                  Rent Your Gear <span className="bg-[#B6F500] text-slate-900 text-[9px] font-black px-1 rounded">New</span>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-bold mb-3">Information</h5>
            <ul className="space-y-2 text-slate-400">
              <li><a className="hover:text-white transition" href="#">How it works?</a></li>
              <li><a className="hover:text-white transition" href="#">FAQs</a></li>
              <li><a className="hover:text-white transition" href="#">Verification</a></li>
              <li><a className="hover:text-white transition" href="#">Cancellation Policy</a></li>
              <li><a className="hover:text-white transition" href="#">Life at SharePal</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-bold mb-3">Policies</h5>
            <ul className="space-y-2 text-slate-400">
              <li><a className="hover:text-white transition" href="#">Terms & Conditions</a></li>
              <li><a className="hover:text-white transition" href="#">Shipping Policy</a></li>
              <li><a className="hover:text-white transition" href="#">Damage Policy</a></li>
              <li><a className="hover:text-white transition" href="#">Terms of Use</a></li>
              <li><a className="hover:text-white transition" href="#">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-bold mb-3">Need Help</h5>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a className="hover:text-white flex items-center gap-1.5 transition" href="#">
                  <Phone className="w-3.5 h-3.5" /> Contact Support
                </a>
              </li>
              <li><a className="hover:text-white transition" href="#">Contact Us</a></li>
              <li className="pt-1 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-purple-400" />
                <a className="text-purple-400 hover:underline" href="mailto:care@sharepal.in">care@sharepal.in</a>
              </li>
            </ul>

            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-4 text-slate-400">
              <a className="hover:text-white transition" href="#" aria-label="Facebook">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path></svg>
              </a>
              <a className="hover:text-white transition" href="#" aria-label="Instagram">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path></svg>
              </a>
              <a className="hover:text-white transition" href="#" aria-label="LinkedIn">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright row */}
        <div className="border-t border-slate-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between text-slate-500 gap-4">
          <div>© 2026, SWNAC E-Kraya Services Pvt Ltd</div>
          <div className="flex items-center gap-1">
            <span>Made with</span>
            <span className="text-red-500" aria-label="love">❤️</span>
            <span>for India</span>
          </div>
          <button
            type="button"
            onClick={scrollToTop}
            className="text-slate-400 hover:text-white flex items-center gap-1.5 transition underline-offset-4 hover:underline focus:outline-none"
          >
            <span>Go up</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
