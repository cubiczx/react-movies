import React from "react";
import { Result } from "antd";

import './Error.scss';

interface ErrorProps {
  message?: string;
}

export default function Error({ message = "Ha ocurrido un error inesperado." }: ErrorProps) {
  return (
    <div className="error">
      <Result
        status="error"
        title="Error"
        subTitle={message}
      />
    </div>
  );
}
