const tokens = {
  admin: {
    token: "admin-token",
  },
  editor: {
    token: "editor-token",
  },
};

export default [
  {
    url: "/api/user/login",
    method: "post",
    template: {
      code: 0,
      message: "ok",
      data: {
        token: "asldfjl",
      },
    },
  },
];
