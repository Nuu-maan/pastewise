"use client";

import { Component, type ReactNode } from "react";

export class ToolBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (this.state.failed) {
      return <p className="text-sm text-muted-foreground">This looks right, but it couldn&apos;t be parsed.</p>;
    }
    return this.props.children;
  }
}
