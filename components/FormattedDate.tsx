import { formatDate } from 'pliny/utils/formatDate'
const FormattedDate = ({ date, locale }) => {
  return (
    <dl>
      <dt className="sr-only">Published on</dt>
      <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
        <time dateTime={date}>{formatDate(date, locale)}</time>
      </dd>
    </dl>
  )
}

export default FormattedDate
