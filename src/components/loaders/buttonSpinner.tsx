function Spinner() {
  return <div className="relative h-4 w-4">
    <div
      className=" inline-block h-4 w-4 animate-spin rounded-full border-t-2 border-[inherit]"
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  </div>
}
export default Spinner;
