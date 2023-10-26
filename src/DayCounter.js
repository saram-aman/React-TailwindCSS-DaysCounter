import React, { Component } from "react"
class DayCounter extends Component{
    constructor(props) {
        super(props);
        this.state = {
            targetDate: '',
            remainingDays: null,
            selectedDates: [],
            futureDate: null,
            numberOfDays: '',
        }
    }
    handleDateChange = (e) => this.setState({ targetDate: e.target.value })
    handleDaysChange = (e) => this.setState({ numberOfDays: e.target.value })
    calculateFutureDate = () => {
        if (this.state.numberOfDays) {
            const currentDate = new Date()
            const futureDate = new Date(currentDate)
            futureDate.setDate(currentDate.getDate() + parseInt(this.state.numberOfDays))
            this.setState({ futureDate })
        }
    }
    addDate = () => {
        if (this.state.targetDate) {
            this.setState((prevState) => ({
                selectedDates: [...prevState.selectedDates, prevState.targetDate],
                targetDate: '',
            }))
        }
    }
    calculateRemainingDays = (targetDate) => {
        const currentDate = new Date()
        targetDate = new Date(targetDate)
        const timeDiff = targetDate - currentDate
        const daysRemaining = Math.floor(timeDiff / (1000 * 3600 * 24))
        return daysRemaining
    }
    componentDidMount() {
        setInterval(() => {
            const { selectedDates } = this.state
            const remainingDays = selectedDates.map(this.calculateRemainingDays)
            this.setState({ remainingDays })
        }, 1000)
    }
    render() {
        const { targetDate, selectedDates, remainingDays, futureDate, numberOfDays } = this.state
        const today = new Date()
        return (
            <div className="day-counter">
                <div className="bg-gray-100 p-6 rounded-lg shadow-lg text-center">
                    <h1 className="text-3xl font-bold text-blue-500 mb-4">Date Counter</h1>
                    <div className="mb-4">
                        <input type="date" value={targetDate} onChange={this.handleDateChange} className="border rounded-lg p-2" />
                        <button onClick={this.addDate} className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg">Add Date</button>
                    </div>
                    <div className="mb-4">
                        <input type="number" value={numberOfDays} onChange={this.handleDaysChange} className="border rounded-lg p-2" />
                        <button onClick={this.calculateFutureDate} className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg">Calculate Future Date</button>
                    </div>
                    <div>
                        {selectedDates.map((date, index) => (
                            <p key={index} className="text-lg text-gray-700 mt-4 break-words">
                                <li className="list-none my-4 p-2 bg-gray-100 rounded-md shadow-md overflow-hidden relative">
                                    {date}: <span className="text-red-500">{remainingDays[index] > 0 ? remainingDays[index] + " days remaining!" : Math.abs(remainingDays[index]) + " days gone!"} </span>
                                </li>
                            </p>
                        ))}
                    </div>
                    {futureDate && (
                        <p className="text-lg text-green-600 mt-4 break-words">
                            <li className="list-none my-4 p-2 bg-gray-100 rounded-md shadow-md overflow-hidden relative">
                                {today < futureDate ? "Future Date " : today == futureDate ? "Today " : "Past Date "} {futureDate.toDateString()}
                            </li>
                        </p>
                    )}
                </div>
            </div>
        )
    }
}
export default DayCounter