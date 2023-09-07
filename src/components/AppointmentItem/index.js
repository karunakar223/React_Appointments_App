// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {toggleIsStarred, appointmentDetails} = props
  const {id, title, date, isStarred} = appointmentDetails

  const imgUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickBtn = () => {
    toggleIsStarred(id)
  }

  return (
    <li className="li-container">
      <div className="container">
        <p className="title">{title}</p>
        <button
          type="button"
          className="data"
          data-testid="star"
          onClick={onClickBtn}
        >
          <img src={imgUrl} alt="star" className="img" />
        </button>
      </div>
      <p className="paragraph">{date}</p>
    </li>
  )
}

export default AppointmentItem
