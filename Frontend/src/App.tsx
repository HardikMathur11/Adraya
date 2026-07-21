import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/ui/Navbar';
import { Footer } from './components/ui/Footer';
import { CartDrawer } from './components/ui/CartDrawer';
import { FloatingThreadsCanvas } from './components/three/FloatingThreadsCanvas';
import { GlobalAIChatbot } from './components/ui/GlobalAIChatbot';
import { Home } from './pages/Home';
import { CollectionDetail } from './pages/CollectionDetail';
import { ProductDetail } from './pages/ProductDetail';
import { WeaverProfile } from './pages/WeaverProfile';
import { WeaversList } from './pages/WeaversList';
import { MoodsExplore } from './pages/MoodsExplore';
import { B2BWholesale } from './pages/B2BWholesale';
import { PassportDetail } from './pages/PassportDetail';
import { Visits } from './pages/Visits';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { CustomerOrders } from './pages/CustomerOrders';
import { Onboard } from './pages/Onboard';
import { WeaverDashboard } from './pages/WeaverDashboard';
import { CreateProduct } from './pages/CreateProduct';
import { AIAssistant } from './pages/AIAssistant';
import { Learn } from './pages/Learn';

export function App() {
  return (
    <Router>
      <div className="bg-[#F7F1E6] text-[#2B2320] font-sans antialiased min-h-screen flex flex-col selection:bg-[#C9A227] selection:text-[#3F0F17] relative">
        <FloatingThreadsCanvas />
        <Navbar />
        <CartDrawer />
        <GlobalAIChatbot />
        <main className="flex-1 relative z-10">
          <Routes>
            {/* Customer Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/moods" element={<MoodsExplore />} />
            <Route path="/weavers" element={<WeaversList />} />
            <Route path="/b2b" element={<B2BWholesale />} />
            <Route path="/collections/:mood" element={<CollectionDetail />} />
            <Route path="/product/:slug" element={<ProductDetail />} />
            <Route path="/weaver/:id" element={<WeaverProfile />} />
            <Route path="/passport/:qrId" element={<PassportDetail />} />
            <Route path="/visits" element={<Visits />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/account/orders" element={<CustomerOrders />} />

            {/* Weaver Workspace Routes */}
            <Route path="/onboard" element={<Onboard />} />
            <Route path="/weaver-dashboard" element={<WeaverDashboard />} />
            <Route path="/weaver-dashboard/products/new" element={<CreateProduct />} />
            <Route path="/assistant" element={<AIAssistant />} />
            <Route path="/learn" element={<Learn />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
