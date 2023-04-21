export default function Info(props) {
  return (
    <p className="dark:text-white font-semibold">{props.name}: <span className="dark:text-gray font-normal">{props.data}</span>
    </p>
  )
}