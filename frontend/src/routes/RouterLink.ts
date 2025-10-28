const ROUTE_LINK = {
  ENTRYPOINT: { path: "/", link: "/" },
  SIGNIN: { path: "signin", link: "/signin" },
  SIGNUP: { path: "signup", link: "/signup" },
  USER: { path: "user", link: "/user" },
  CHOOSECHAR: { path: "choosechar", link: "/choosechar" },
  CHAT: {
    path: "/chat/:charId",
    link: (id: string) => `/chat/${id}`,
  },
  MANAGE: { path: "manage", link: "/manage" },
  ADD_CHARACTER: { path: "addchar", link: "/addchar" },
};

export default ROUTE_LINK;
