import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { Bounce, ToastContainer } from 'react-toastify';
import { DocumentationView } from './view/DocumentationView.tsx';
import { ProjectView } from './view/ProjectView.tsx';
import App from './App.tsx';


createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <Routes>
        <Route path="/" element={<App />} />

        <Route path="/project/:id" element={<ProjectView />} />
        <Route path="/docs" element={<DocumentationView />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <ToastContainer position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="dark"
        transition={Bounce} />
    </StrictMode>
  </BrowserRouter>
);
