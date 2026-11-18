"use client";

import React, { Component } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

export class WebGLErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("3D WebGL Canvas Error Caught:", error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="relative w-full h-full min-h-[460px] lg:min-h-[640px] 2xl:min-h-[860px] bg-gradient-to-b from-[#FAF6F0] via-[#F4ECE1] to-[#EBE0D2] overflow-hidden rounded-[32px] border border-[#C5A059]/35 shadow-lg flex flex-col items-center justify-center p-8 text-center">
          <div className="w-14 h-14 rounded-full bg-[#C86D51]/15 text-[#C86D51] flex items-center justify-center mb-4">
            <AlertCircle className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-[#2C1E18] font-serif-editorial mb-2">
            3D Studio Fallback
          </h3>
          <p className="text-xs sm:text-sm text-[#6B574F] max-w-md leading-relaxed mb-6">
            WebGL acceleration encountered a device or memory constraint. Your custom selections remain completely active and recorded in your order.
          </p>
          <button
            type="button"
            onClick={this.handleRetry}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full terracotta-gradient-btn text-xs font-semibold uppercase tracking-wider shadow-sm hover:scale-105 active:scale-95 transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reload 3D Atelier</span>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

