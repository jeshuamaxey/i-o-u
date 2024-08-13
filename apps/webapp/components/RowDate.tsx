const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
]

const RowDate = ({date} : {date: Date}) => {
  const day = date.getDate()
  const month = MONTHS[date.getMonth()]

  return <div className="flex flex-col text-center w-10">
    <p>{month}</p>
    <p className="text-lg">{day}</p>
  </div>
}

export default RowDate;