import React from "react";

export interface CommonComponentsProps extends React.PropsWithChildren {
  name: string;
  id: number;
  [key: string]: any;
}
