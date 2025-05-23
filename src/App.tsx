
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import CheckIn from "./pages/CheckIn";
import NotFound from "./pages/NotFound";
import TenantAdmin from "./pages/TenantAdmin";
import { TenantProvider } from "./context/TenantContext";

// Create the query client
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TenantProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard/*" element={<Dashboard />} />
              <Route path="/checkin/:sitePath?" element={<CheckIn />} />
              <Route path="/admin/tenants" element={<TenantAdmin />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </TenantProvider>
    </QueryClientProvider>
  );
};

export default App;
