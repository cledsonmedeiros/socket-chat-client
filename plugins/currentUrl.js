export default ({ app }, inject) => {
  inject("currentUrl", () => {
    return `${app.context.env.APP_URL}${app.context.route.fullPath}`;
  });
};
