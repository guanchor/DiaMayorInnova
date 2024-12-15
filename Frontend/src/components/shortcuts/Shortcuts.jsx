import React, { useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { scRoutes } from "../../services/ShortcutRoutes";
import Shortcut from "../../components/shortcuts/shortcut/Shortcut"
import { navContext } from '../../context/nav-menu/navMenuContext';


const Shortcuts = () => {
  const { rol } = useContext(navContext);
  const navigate = useNavigate();


  return (
    <section className="top">
      <p className="shortcut__tittle">Accesos Rápidos</p>
      <div className="shortcut__wrapper">
        {scRoutes.map((route) => {
          if (route.rol.includes(rol)) {
            /* return <Shortcut key={route.to} icon={route.icon} name={route.name} url={route.to} />
          } else return null;
        }
        )} */
            const onClick =
              route.to === "/tasks"
                ? () => navigate("/tasks", { state: { createTask: true } })
                : null;

            return (
              <Shortcut
                key={route.to}
                icon={route.icon}
                name={route.name}
                url={route.to}
                onClick={onClick}
              />
            );
          }
        })}
      </div>
    </section>
  )
}

export default Shortcuts
