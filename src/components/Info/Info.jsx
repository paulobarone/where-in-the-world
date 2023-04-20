export default function Info(props) {
  return (
    <p className="dark:text-white">{props.name}: <span className="dark:text-gray">{props.data}</span>
    </p>
  )
}