type CalendarHeaderProps = {
  weekday: string;
};

export default function CalendarHeader({ weekday }: CalendarHeaderProps) {
  return (
    <div className="border-solid border-black border md:border-2 w-1/7 h-10 flex justify-center text-center">
      <h1 className="m-auto font-bold text-black text-lg capitalize">
        {weekday}
      </h1>
    </div>
  );
}
