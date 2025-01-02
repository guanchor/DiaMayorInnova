import "./Spinner.css"

const Spinner = ({ state = "" }) => {

  //Use danger, success, error or "" on the state params

  if (state == "success") {
    return (<div className="loader success"></div>)
  }

  if (state == "danger") {
    return (<div className="loader danger"></div>)
  }

  if (state == "error") {
    return (<div className="loader error"></div>)
  }

  return (
    <div className="loader neutral"></div>
  )
}

export default Spinner
