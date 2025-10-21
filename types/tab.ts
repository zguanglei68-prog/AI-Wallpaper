import { Url } from "next/dist/shared/lib/router/router";

export interface Tab {
  name: string;
  title: string;
  url: Url;
}