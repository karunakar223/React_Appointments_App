// Write your code here
import {Component} from 'react'

import {v4} from 'uuid'

import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {titleInput: '', dateInput: '', appointmentsList: [], isActive: false}

  onChangeTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeDateInput = event => {
    this.setState({dateInput: event.target.value})
  }

  toggleIsStarred = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (eachAppointment.id === id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  isOnClickStarred = () => {
    this.setState(prevState => ({isActive: !prevState.isActive}))
  }

  getFilteredAppointments = () => {
    const {appointmentsList, isActive} = this.state

    if (isActive) {
      return appointmentsList.filter(
        eachAppointment => eachAppointment.isStarred === true,
      )
    }
    return appointmentsList
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state

    const formattedDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''

    const newAppointment = {
      id: v4(),
      title: titleInput,
      date: formattedDate,
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  render() {
    const {titleInput, dateInput, isActive} = this.state
    const setClassName = isActive ? 'btn active' : 'btn'
    const getStarredAppointments = this.getFilteredAppointments()

    return (
      <div className="bg-container">
        <div className="card-container">
          <div className="appointment-container">
            <div className="input-container">
              <h1 className="main-heading">Add Appointment</h1>
              <form className="form" onSubmit={this.onAddAppointment}>
                <label htmlFor="text">TITLE</label>
                <br />
                <input
                  type="text"
                  id="text"
                  placeholder="Title"
                  className="text"
                  onChange={this.onChangeTitleInput}
                  value={titleInput}
                />
                <br />
                <label htmlFor="value">DATE</label>
                <br />
                <input
                  type="date"
                  className="date"
                  placeholder="dd/mm/yyyy"
                  id="value"
                  onChange={this.onChangeDateInput}
                  value={dateInput}
                />
                <br />
                <button type="submit" className="button">
                  Add
                </button>
              </form>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="image"
            />
          </div>
          <hr className="line" />
          <div className="star-list-container">
            <h1 className="sub-heading">Appointments</h1>
            <button
              type="button"
              onClick={this.isOnClickStarred}
              className={setClassName}
            >
              Starred
            </button>
          </div>
          <ul className="ul-list">
            {getStarredAppointments.map(eachAppointment => (
              <AppointmentItem
                key={eachAppointment.id}
                appointmentDetails={eachAppointment}
                toggleIsStarred={this.toggleIsStarred}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
