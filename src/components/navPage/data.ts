export interface NavLink {
  title: string;
  path: string;
  highlight?: boolean;
}

export const navLinks1: NavLink[] = [
  { title: "About", path: "/about" },
  { title: "Contact", path: "/contact" },
  { title: "Career", path: "/career" },
];
export const navLinks2: NavLink[] = [
  { title: "Work", path: "/work" },
  { title: "Playground", path: "/playground" }
];
export const logoText: NavLink = {
  title: "Plancy",
  path: "/",
}
