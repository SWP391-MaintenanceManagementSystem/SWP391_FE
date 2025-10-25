

export interface CalendarEvent {
  title: string;
  start: Date;
  end: Date;
  status: string;
}

export const CustomEvent = ({ event }: { event: CalendarEvent }) => {
 
  return (
    <div
      className="text-xs flex flex-col justify-center"
    >
      {event.status && <span>{event.status}</span>}
    </div>
  );
};
