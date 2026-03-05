import React from "react";
import { Spin } from "antd";
import './Loading.scss';

export default function Loading() {
  return (
    <div className="loading" data-testid="loading">
      <Spin size="large" />
    </div>
  );
}