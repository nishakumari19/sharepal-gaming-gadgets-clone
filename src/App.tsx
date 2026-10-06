import React from 'react';
import { RentalProvider } from './context/RentalContext';
import { Header } from './components/Header';
import { CategoryTabs } from './components/CategoryTabs';
import { Sidebar } from './components/Sidebar';
import { HeroBanner } from './components/HeroBanner';
import { FilterBar } from './components/FilterBar';
import { ProductGrid } from './components/ProductGrid';
import { FAQ } from './components/FAQ';
import { Breadcrumb } from './components/Breadcrumb';
import { Testimonials } from './components/Testimonials';
import { Stats } from './components/Stats';
import { Footer } from './components/Footer';
import { DateModal } from './components/DateModal';
import { FloatingDatePill } from './components/FloatingDatePill';
import { ChatButton } from './components/ChatButton';
import { CartDrawer } from './components/CartDrawer';
import { ToastNotification } from './components/ToastNotification';

export default function App() {
  return (
    <RentalProvider>
      <div className="bg-[#F7F7F9] text-slate-800 antialiased font-sans min-h-screen flex flex-col relative selection:bg-purple-100 selection:text-purple-900">
        {/* Sticky Header */}
        <Header />

        {/* Category Navigation Bar */}
        <CategoryTabs />

        {/* Main Content Area */}
        <main className="max-w-[1520px] w-full mx-auto px-4 lg:px-8 py-6 flex-1 flex flex-col gap-8">
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            {/* Category Sidebar */}
            <Sidebar />

            {/* Catalog Section */}
            <section
              className="flex-1 w-full flex flex-col gap-6"
              data-purpose="product-view"
              aria-label="Gaming Catalog View"
            >
              <HeroBanner />
              <FilterBar />
              <ProductGrid />
            </section>
          </div>

          {/* FAQs */}
          <FAQ />

          {/* Breadcrumbs */}
          <Breadcrumb />

          {/* Customer Reviews & Testimonials */}
          <Testimonials />

          {/* Impact Stats */}
          <Stats />
        </main>

        {/* Footer */}
        <Footer />

        {/* Sticky Action Elements */}
        <FloatingDatePill />
        <ChatButton />

        {/* Modals & Drawers */}
        <DateModal />
        <CartDrawer />
        <ToastNotification />
      </div>
    </RentalProvider>
  );
}
