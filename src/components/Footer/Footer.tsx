import React from "react";
import { Layout } from "antd";

import "./Footer.scss";

export default function Footer() {
  const { Footer } = Layout;

  return (
    <Footer className="footer">
      <p>React Movies created by Xavier Palacín Ayuso. All rights reserved.</p>
    </Footer>
  );
}
