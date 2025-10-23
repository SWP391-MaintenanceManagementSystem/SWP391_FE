import { useNavigate } from "react-router-dom";

export interface CalendarEvent {
  title: string;
  start: Date;
  end: Date;
  status: string;
}

export const CustomEvent = ({ event }: { event: CalendarEvent }) => {
  const navigate = useNavigate();

  const handleDetailClick = () => {
    navigate(`/booking/${event.title}`);
  };

  return (
    <div
      className="text-xs flex flex-col justify-center"
      onClick={handleDetailClick}
    >
      {event.status && <span>{event.status}</span>}
    </div>
  );
};
