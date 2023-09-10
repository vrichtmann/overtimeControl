import Calendar from "../components/PublicLayout/home/Calendar";
import CalendarEditPopup from "../components/PublicLayout/home/CalendarEditPopup";
import HomeHeader from "../components/PublicLayout/home/Header";

export default function Home() {
  return (
    <div className="relative flex flex-col">
      <CalendarEditPopup />
      <HomeHeader />
      <Calendar />
    </div>
  );
}
