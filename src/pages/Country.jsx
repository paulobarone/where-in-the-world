import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

export default function Country() {
  return (
    <>
      <div className="px-5 md:px-24 py-10 sm:flex-row sm:justify-between">
        <button className='bg-white flex items-center gap-3 cursor-pointer shadow-lg py-3 px-8 rounded-lg dark:bg-darkModeElements dark:text-white'>
          <KeyboardBackspaceIcon />
          Back
        </button>
      </div>
    </>
  )
}