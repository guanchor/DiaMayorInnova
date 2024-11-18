export const routes = [];

routes.push({
  to: "/home",
  icon: "fi fi-rr-home",
  name: "home",
  rol: ["teacher", "admin", "student"],
})

routes.push({
  to: "/modes",
  icon: "fi fi-rr-bank",
  name: "modos",
  rol: ["teacher", "admin", "student"],
})

routes.push({
  to: "/task",
  icon: "fi fi-rr-graduation-cap",
  name: "tareas",
  rol: ["teacher", "admin", "student"],
})

routes.push({
  to: "/calendar",
  icon: "fi fi-rr-calendar",
  name: "calendario",
  rol: ["teacher", "admin", "student"],
})

routes.push({
  to: "/schools",
  icon: "fi fi-rr-school",
  name: "gestión escuelas",
  rol: ["admin"],
})

routes.push({
  to: "/accounting-plans",
  icon: "fi fi-rr-book",
  name: "gestión planes contables",
  rol: ["teacher", "admin"],
})

routes.push({
  to: "/class-list",
  icon: "fi fi-rr-book",
  name: "gestión clases",
  student: false,
  rol: ["teacher", "admin"],
})
